import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading.jsx';

const REPO = 'https://github.com/satishkovuru/satishkovuru.github.io/tree/master/projects/pipeline-sentinel';

export default function Article1() {
  return (
    <section className="page article-page">
      <SectionHeading
        eyebrow="Article · PipelineSentinel series, Part 1"
        title="Detecting Anomalies in CI/CD Pipelines with ML"
        subtitle="Building and honestly validating the approach — real results come in Part 2."
      />

      <article className="article-content">
        <h2>The pipeline fails. Again.</h2>
        <p>
          Your CI run turns red. You open the logs, scroll through a wall of output, and fifteen
          minutes later find the answer: it's that flaky test again — the one everyone
          half-recognizes but nobody's fixed. You retry the job, it goes green, you move on.
          Multiply that by every engineer on the team, every week, and it adds up to real hours
          spent on triage that a five-second glance shouldn't require.
        </p>
        <p>
          The question I wanted to answer: could the pipeline tell you <em>this run looks unusual</em>{' '}
          before a human has to dig in?
        </p>

        <h2>Why this is harder than a red/green signal</h2>
        <p>
          A single pass/fail bit isn't enough to build on. Pipelines fail for structurally
          different reasons — a flaky test, an infra hiccup, a dependency break, resource
          exhaustion — and "unusual" is relative to <em>that pipeline's</em> own history, not a
          universal threshold. A 10-minute run might be completely normal for one workflow and a
          five-alarm anomaly for another that usually finishes in 30 seconds. Fixed thresholds
          and simple failure-rate alerts miss this: they treat every pipeline the same and only
          catch what you already thought to watch for.
        </p>

        <h2>The approach</h2>
        <p>
          PipelineSentinel is a small, deployable layer that sits on top of existing CI tooling
          and scores each run against its own pipeline's history.
        </p>
        <p>
          <strong>Data.</strong> It pulls run metadata straight from the GitHub Actions REST API —
          run duration, pass/fail outcome, retry/attempt count, triggering event, and branch. No
          log-parsing required for a first pass.
        </p>
        <p>
          <strong>Model.</strong> The baseline model is an <code>IsolationForest</code> (scikit-learn)
          over three signals: run duration, whether the run failed, and how many attempts it
          took. IsolationForest is a good first choice here because it's unsupervised — it
          doesn't need a hand-labeled set of "here's what an anomaly looks like," which you don't
          have on day one — and it adapts to each pipeline's own distribution instead of a fixed
          global cutoff.
        </p>
        <pre>
          <code>{`from sklearn.ensemble import IsolationForest

FEATURE_COLUMNS = ["duration_seconds", "failed", "run_attempt"]

model = IsolationForest(contamination=contamination, random_state=42)
df["is_anomaly"] = model.fit_predict(df[FEATURE_COLUMNS]) == -1`}</code>
        </pre>
        <p>
          For each flagged run, a small rule layer explains <em>why</em> it was flagged — unusual
          duration, a failure, retries required — so the output is interpretable, not just a
          binary flag with no story.
        </p>
        <p>
          <strong>Dashboard.</strong> A Streamlit app lists recent runs and flagged anomalies side
          by side, with the reason attached, so triage starts with "here's what's odd and why"
          instead of a blank log file.
        </p>
        <pre>
          <code>GitHub Actions API → ingest.py → anomaly_detector.py → scored_runs.csv → Streamlit dashboard</code>
        </pre>

        <h2>What I've actually validated so far — and what I haven't</h2>
        <p>This is the honest part, and it matters more than the demo.</p>
        <p>
          I ran the full pipeline end to end against a real (if small) dataset: 12 workflow runs
          pulled from this repo's own GitHub Actions history. The model flagged 3 of the 12 — a
          run that needed three attempts and took nearly 5 minutes (versus a normal ~30 seconds),
          and two genuine failed runs. The nine ordinary single-attempt successful runs were left
          alone. That's a result consistent with what a human would flag by eye at this sample
          size, and real proof the ingestion → model → dashboard path works mechanically.
        </p>
        <p>
          But I'm not going to oversell it. <strong>12 runs is not a validation set.</strong>{' '}
          IsolationForest's <code>contamination</code> parameter tells it what <em>fraction</em>{' '}
          of runs to flag — at n=12, it's effectively forcing the most-extreme ~20% to be
          flagged, whether or not they're truly anomalous. It happened to land on exactly the
          right runs here, which is a good sign but not proof the model discriminates well on its
          own.
        </p>
        <p>
          So I built a second check: a labeled synthetic dataset — 400 simulated runs with
          ground-truth anomaly labels across four patterns (normal runs, a recurring flaky test
          that self-heals on retry, infra duration spikes, and genuine first-attempt regressions)
          — specifically so I could measure real precision and recall instead of eyeballing 12
          rows. Sweeping <code>contamination</code> against those labels:
        </p>
        <table className="article-table">
          <thead>
            <tr>
              <th>contamination</th>
              <th>precision</th>
              <th>recall</th>
              <th>false-positive rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0.05</td>
              <td>1.000</td>
              <td>0.556</td>
              <td>0.000</td>
            </tr>
            <tr>
              <td>0.09 (true rate)</td>
              <td>0.972</td>
              <td>0.972</td>
              <td>0.003</td>
            </tr>
            <tr>
              <td>0.15</td>
              <td>0.600</td>
              <td>1.000</td>
              <td>0.066</td>
            </tr>
            <tr>
              <td>0.20</td>
              <td>0.450</td>
              <td>1.000</td>
              <td>0.121</td>
            </tr>
          </tbody>
        </table>
        <p>
          The pattern is exactly what theory predicts: set <code>contamination</code> too low and
          the model gets conservative and misses real anomalies; set it too high and precision
          collapses under false positives. The useful number is near the true anomaly rate — 97%
          precision and 97% recall at <code>contamination=0.09</code> on this synthetic set.
        </p>
        <p>
          To be clear about what that number is and isn't: it validates that the <em>model</em>{' '}
          behaves sensibly and that <code>contamination</code> tuning matters — a real methodology
          result. It is not a claim about real-world accuracy, because synthetic data by
          construction has patterns cleaner than a messy real pipeline. The real false-positive
          rate, and the real time-saved number, still only come from running this against an
          actual team's pipeline over weeks.
        </p>

        <h2>What's next</h2>
        <p>
          The plan is to run this against a real, higher-volume pipeline, tune{' '}
          <code>contamination</code> against an actual history instead of a guess, and capture
          real before/after numbers — time saved on triage, anomalies caught early, and a
          false-positive rate that means something. That's Part 2 of this series, with real
          metrics instead of a 12-run smoke test.
        </p>
        <p>
          The repo is open source:{' '}
          <a href={REPO} target="_blank" rel="noreferrer">
            pipeline-sentinel
          </a>
          . Feedback, and especially anyone with a similar approach on their own pipelines, is
          welcome.
        </p>

        <p className="article-back">
          <Link to="/projects">← Back to Projects</Link>
        </p>
      </article>
    </section>
  );
}
