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

## Still to capture (real deployment)

These require running against a larger, real team pipeline over time — see
project plan, Weeks 7–8:

- % reduction in manual triage time
- Number of anomalous runs caught before they caused downstream failures
- False positive rate at a larger sample size, and how it's tuned down
- Number of teams/pipelines the tool was adopted on
- Time-to-detection improvement
