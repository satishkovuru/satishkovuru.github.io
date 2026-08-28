# PipelineSentinel — Anomaly Detection for CI/CD Pipelines

## Problem

CI/CD pipelines fail for many different reasons — flaky tests, infrastructure
hiccups, resource spikes, dependency breaks — and most teams triage these
manually, run by run. This wastes engineering time and delays releases.
**PipelineSentinel** flags anomalous pipeline runs automatically, before they
cost the team hours of manual investigation.

## Goal

Build a lightweight, deployable anomaly-detection layer that sits on top of
existing CI/CD tooling (GitHub Actions, Jenkins, CircleCI) and answers one
question for every run: *"Does this run look unusual compared to history —
and if so, why?"*

## Why this matters (for the portfolio)

- Ties directly to 10 years of QA/SDET experience — this is a natural
  extension of test reliability and release-quality work, not a generic
  ML side project.
- Produces measurable, quantifiable impact (time saved, anomalies caught
  early, false-positive rate) — the kind of evidence that supports an
  "Original Contributions of Major Significance" case.
- Open-sourceable, demoable, and writable-about — feeds directly into
  articles, a conference talk, and adoption metrics.

## MVP Scope (V1)

1. **Data ingestion**
   - Pull historical run metadata via CI provider API (GitHub Actions API to start)
   - Fields: run duration, step-level timings, pass/fail, retries, resource
     usage (where available), triggering event, branch
2. **Baseline anomaly model**
   - Start with Isolation Forest / z-score on run duration + failure rate
     + step-timing distribution
   - Stretch: log-message clustering (TF-IDF + k-means or embeddings) to
     group failure types
3. **Alerting/dashboard**
   - Simple Streamlit dashboard: recent runs, flagged anomalies, reason
     for flag
   - Optional: Slack/webhook alert on high-confidence anomalies
4. **Deployment**
   - Run against your own team's real pipeline (with permission) to get
     real-world validation data

## Tech Stack

- Python 3.11+
- `scikit-learn` (IsolationForest), `pyod` (alternative anomaly detectors)
- `pandas` for run-data wrangling
- CI provider REST API (GitHub Actions API to start — well-documented, free)
- `streamlit` for the dashboard
- GitHub Actions as your own test CI environment if you lack access to
  production pipeline logs

## 8-Week Milestone Plan

| Week | Milestone |
|---|---|
| 1–2 | Data pipeline: pull historical runs, define working "anomaly" labels, exploratory analysis |
| 3–4 | Baseline model: Isolation Forest on run duration/failure rate/resource metrics; validate against known-bad historical runs |
| 5–6 | Dashboard + alerting integration; polish UX for "why was this flagged" explanations |
| 7–8 | Deploy on a real pipeline; collect before/after metrics; write up results |

## Success Metrics to Capture

These numbers become your evidence exhibits — capture them from day one:

- % reduction in manual triage time
- Number of anomalous runs caught before they caused downstream failures
- False positive rate (and how you tuned it down over iterations)
- Number of teams/pipelines the tool was adopted on (even 1–2 is a start)
- Time-to-detection improvement (how much earlier issues were caught)

## Repo Structure (proposed)

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

## Portfolio Conversion Checklist

- [ ] Open-source repo with clear README (this doc, refined post-build)
- [ ] Article 1: "Detecting anomalies in CI/CD pipelines with ML" (draft
      once baseline model works — see article outline)
- [ ] Deploy on real pipeline, capture metrics
- [ ] Article 2: results write-up with real numbers
- [ ] Conference talk submission once real results exist
- [ ] Track adoption (stars, forks, usage by other teams) over time
- [ ] Collect 1–2 independent letters from people who used/reviewed the tool
