# Detecting Anomalies in CI/CD Pipelines with ML

*Draft — Article 1 in the PipelineSentinel series*

## The pipeline fails. Again.

Your CI run turns red. You open the logs, scroll through a wall of output,
and fifteen minutes later find the answer: it's that flaky test again — the
one everyone half-recognizes but nobody's fixed. You retry the job, it goes
green, you move on. Multiply that by every engineer on the team, every week,
and it adds up to real hours spent on triage that a five-second glance
shouldn't require.

The question I wanted to answer: could the pipeline tell you *this run looks
unusual* before a human has to dig in?

## Why this is harder than a red/green signal

A single pass/fail bit isn't enough to build on. Pipelines fail for
structurally different reasons — a flaky test, an infra hiccup, a dependency
break, resource exhaustion — and "unusual" is relative to *that pipeline's*
own history, not a universal threshold. A 10-minute run might be completely
normal for one workflow and a five-alarm anomaly for another that usually
finishes in 30 seconds. Fixed thresholds and simple failure-rate alerts miss
this: they treat every pipeline the same and only catch what you already
thought to watch for.

## The approach

PipelineSentinel is a small, deployable layer that sits on top of existing
CI tooling and scores each run against its own pipeline's history.

**Data.** It pulls run metadata straight from the GitHub Actions REST API —
run duration, pass/fail outcome, retry/attempt count, triggering event, and
branch. No log-parsing required for a first pass.

**Model.** The baseline model is an `IsolationForest` (scikit-learn) over
three signals: run duration, whether the run failed, and how many attempts
it took. IsolationForest is a good first choice here because it's
unsupervised — it doesn't need a hand-labeled set of "here's what an anomaly
looks like," which you don't have on day one — and it adapts to each
pipeline's own distribution instead of a fixed global cutoff.

```python
from sklearn.ensemble import IsolationForest

FEATURE_COLUMNS = ["duration_seconds", "failed", "run_attempt"]

model = IsolationForest(contamination=contamination, random_state=42)
df["is_anomaly"] = model.fit_predict(df[FEATURE_COLUMNS]) == -1
```

For each flagged run, a small rule layer explains *why* it was flagged —
unusual duration, a failure, retries required — so the output is
interpretable, not just a binary flag with no story.

**Dashboard.** A Streamlit app lists recent runs and flagged anomalies side
by side, with the reason attached, so triage starts with "here's what's odd
and why" instead of a blank log file.

```
GitHub Actions API → ingest.py → anomaly_detector.py → scored_runs.csv → Streamlit dashboard
```

## What I've actually validated so far — and what I haven't

This is the honest part, and it matters more than the demo.

I ran the full pipeline end to end against a real (if small) dataset: 12
workflow runs pulled from this repo's own GitHub Actions history. The model
flagged 3 of the 12 — a run that needed three attempts and took nearly 5
minutes (versus a normal ~30 seconds), and two genuine failed runs. The nine
ordinary single-attempt successful runs were left alone. That's a
correct-looking result, and it's real proof the ingestion → model →
dashboard path works mechanically.

But I'm not going to oversell it. **12 runs is not a validation set.**
IsolationForest's `contamination` parameter tells it what *fraction* of runs
to flag — at n=12, it's effectively forcing the most-extreme ~20% to be
flagged, whether or not they're truly anomalous. It happened to land on
exactly the right runs here, which is a good sign but not proof the model
discriminates well on its own.

So I built a second check: a labeled synthetic dataset — 400 simulated runs
with ground-truth anomaly labels across four patterns (normal runs, a
recurring flaky test that self-heals on retry, infra duration spikes, and
genuine first-attempt regressions) — specifically so I could measure real
precision and recall instead of eyeballing 12 rows. Sweeping `contamination`
against those labels:

| contamination | precision | recall | false-positive rate |
|---|---|---|---|
| 0.05 | 1.000 | 0.556 | 0.000 |
| 0.09 (true rate) | 0.972 | 0.972 | 0.003 |
| 0.15 | 0.600 | 1.000 | 0.066 |
| 0.20 | 0.450 | 1.000 | 0.121 |

The pattern is exactly what theory predicts: set `contamination` too low and
the model gets conservative and misses real anomalies; set it too high and
precision collapses under false positives. The useful number is near the
true anomaly rate — 97% precision and 97% recall at `contamination=0.09` on
this synthetic set.

To be clear about what that number is and isn't: it validates that the
*model* behaves sensibly and that `contamination` tuning matters — a real
methodology result. It is not a claim about real-world accuracy, because
synthetic data by construction has patterns cleaner than a messy real
pipeline. The real false-positive rate, and the real time-saved number,
still only come from running this against an actual team's pipeline over
weeks.

## What's next

The plan is to run this against a real, higher-volume pipeline, tune
`contamination` against an actual history instead of a guess, and capture
real before/after numbers — time saved on triage, anomalies caught early,
and a false-positive rate that means something. That's the follow-up
article, with real metrics instead of a 12-run smoke test.

The repo is open source: [`pipeline-sentinel`](../). Feedback, and
especially anyone with a similar approach on their own pipelines, is
welcome.
