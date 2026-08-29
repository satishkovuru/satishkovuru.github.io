# Results

## End-to-end smoke test (2026-08-28)

Ran the full pipeline against this repo's own GitHub Actions history
(`satishkovuru/satishkovuru.github.io`) as a first real, if small, dataset —
proof the ingestion → model → dashboard path works end to end, not yet a
production deployment.

- **Runs ingested:** 12 (`data/ingest.py` against the live GitHub Actions API)
- **Anomalies flagged:** 3 of 12 (contamination set to 0.2 given the small
  sample)
- **Important caveat:** `contamination` tells IsolationForest what *fraction*
  of runs to flag, so at n=12 it forces roughly the most-extreme 20% to be
  flagged regardless of whether they're genuinely anomalous. Here that
  happened to land exactly on the 3 real problem runs — but that's a
  favorable coincidence at this sample size, not proof the model
  discriminates well. A pipeline with zero real issues would still get ~20%
  of runs flagged. This needs a larger run history (100+) and either a
  lower, empirically-tuned contamination or a different threshold approach
  before the flag count means anything on its own.
- **What got flagged, and why it's correct:**
  - A 281s run that needed 3 attempts — actual retry-heavy outlier, correctly
    caught (`unusual duration; required retries;`)
  - A failed run that also needed 3 attempts (`run failed; required retries;`)
  - A second, single-attempt failed run (`run failed;`)
  - All 9 normal single-attempt successful runs (30–43s) were left unflagged
- **Unit tests:** `pytest tests/` — 2/2 passed
- **Dashboard:** `streamlit run dashboard/app.py` — started clean, health
  check returned `ok`, page served run/anomaly tables correctly

## Synthetic evaluation (2026-08-28) — NOT real data

Pulling a larger real dataset wasn't possible this round: this session can
only attach repos under one GitHub account, so a bigger public repo's real
Actions history was unreachable, and no real team pipeline was available
either. To get past the 12-run sample size honestly, I generated a labeled
**synthetic** dataset (`data/generate_synthetic.py`, `data/runs_synthetic.csv`)
— 400 simulated runs with ground-truth labels across four patterns: normal
runs (90%), a recurring flaky test that often self-heals on retry (5%),
infra duration spikes (3%), and genuine first-attempt regressions (2%).

**This is not real CI data.** It exists only to validate the model's
precision/recall and tune `contamination` at a sample size the real data
doesn't yet support. Treat every number below as "does the mechanism work,"
not "here's the tool's real-world accuracy."

`tests/evaluate_synthetic.py` sweeps `contamination` against the true labels:

| contamination | flagged | precision | recall | false-positive rate |
|---|---|---|---|---|
| 0.05 | 20 | 1.000 | 0.556 | 0.000 |
| 0.08 | 32 | 1.000 | 0.889 | 0.000 |
| 0.09 (true rate) | 36 | 0.972 | 0.972 | 0.003 |
| 0.10 | 40 | 0.900 | 1.000 | 0.011 |
| 0.15 | 60 | 0.600 | 1.000 | 0.066 |
| 0.20 | 80 | 0.450 | 1.000 | 0.121 |

The pattern is exactly what you'd expect and confirms the earlier caveat:
`contamination` set too low misses real anomalies (recall drops), set too
high floods the flagged list with false positives (precision collapses).
The sweet spot, unsurprisingly, is near the dataset's true anomaly rate —
here `contamination=0.09` gives 97% precision and 97% recall. The model's
default was updated to 0.09 based on this, with the code now stating
explicitly that it should be re-tuned against real historical data, not
trusted as a universal default.

## Still to capture (real deployment)

These require running against a larger, real team pipeline over time — see
project plan, Weeks 7–8:

- % reduction in manual triage time
- Number of anomalous runs caught before they caused downstream failures
- False positive rate at a larger sample size, and how it's tuned down
- Number of teams/pipelines the tool was adopted on
- Time-to-detection improvement
