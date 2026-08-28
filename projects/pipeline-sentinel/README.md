# PipelineSentinel — Anomaly Detection for CI/CD Pipelines

CI/CD pipelines fail for many different reasons — flaky tests, infrastructure
hiccups, resource spikes, dependency breaks — and most teams triage these
manually, run by run. **PipelineSentinel** flags anomalous pipeline runs
automatically, before they cost the team hours of manual investigation.

## What it does

For every pipeline run, PipelineSentinel answers one question: *does this run
look unusual compared to history — and if so, why?*

It pulls run metadata from the GitHub Actions API (duration, step-level
timings, pass/fail, retries, triggering event, branch), scores each run with
an unsupervised anomaly model, and surfaces flagged runs — with the
contributing signals — in a lightweight dashboard.

## Approach

- **Data ingestion** (`data/ingest.py`) — pulls historical run metadata via
  the GitHub Actions REST API.
- **Baseline anomaly model** (`models/anomaly_detector.py`) — an
  `IsolationForest` over run duration, failure rate, and step-timing
  distribution. Unsupervised, so it needs no hand-labeled anomaly set to get
  started, and it adapts to each pipeline's own history rather than a fixed
  threshold.
- **Dashboard** (`dashboard/app.py`) — a Streamlit app listing recent runs,
  flagged anomalies, and the reason each run was flagged.
- **Exploration** (`notebooks/exploration.ipynb`) — EDA and model iteration.

## Tech stack

Python 3.11+, `scikit-learn` (IsolationForest), `pandas`, the GitHub Actions
REST API, and `streamlit` for the dashboard.

## Status

Early-stage build. See [`docs/results.md`](docs/results.md) for the
end-to-end smoke-test results and metrics as they're captured against a real
pipeline, [`docs/project-plan.md`](docs/project-plan.md) for the full
milestone plan, and [`docs/article1-draft.md`](docs/article1-draft.md) for
the companion article, "Detecting Anomalies in CI/CD Pipelines with ML"
*(draft, honest about current validation limits)*.

## Repo structure

```
pipeline-sentinel/
├── README.md
├── data/
│   └── ingest.py          # pulls run metadata from CI API
├── models/
│   └── anomaly_detector.py
├── dashboard/
│   └── app.py              # streamlit app
├── notebooks/
│   └── exploration.ipynb   # EDA, model iteration
├── tests/
└── docs/
    └── results.md           # metrics captured after deployment
```

## Running locally

```bash
pip install -r requirements.txt
python data/ingest.py --repo <owner/repo> --out data/runs.csv
python models/anomaly_detector.py --in data/runs.csv --out data/scored_runs.csv
streamlit run dashboard/app.py
```
