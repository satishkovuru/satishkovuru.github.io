"""Generate a synthetic pipeline-run dataset with ground-truth anomaly labels.

This is NOT real CI data. It exists to validate the anomaly model's
precision/recall and tune `contamination` at a sample size (hundreds of
runs) that isn't available from this repo's own real history (12 runs).
Every output file and downstream doc must keep this clearly labeled as
synthetic.

Simulates a single workflow over several months with:
  - normal runs (~90%): stable duration, mostly single-attempt successes
  - a recurring flaky test (~5%): fails intermittently, often self-heals on
    a retry (run_attempt > 1), duration close to normal
  - infra spikes (~3%): duration far above normal, single attempt, may or
    may not fail
  - genuine regressions (~2%): fail on first attempt, normal duration (a
    real bug, not flakiness)

Usage:
    python generate_synthetic.py --out runs_synthetic.csv --n 400 --seed 42
"""

import argparse

import numpy as np
import pandas as pd


def generate(n: int, seed: int) -> pd.DataFrame:
    rng = np.random.default_rng(seed)
    timestamps = pd.date_range("2026-01-01", periods=n, freq="4h")

    kind = rng.choice(
        ["normal", "flaky", "infra_spike", "regression"],
        size=n,
        p=[0.90, 0.05, 0.03, 0.02],
    )

    duration = np.empty(n)
    failed = np.empty(n, dtype=int)
    run_attempt = np.empty(n, dtype=int)
    true_label = np.empty(n, dtype=object)

    normal_mask = kind == "normal"
    duration[normal_mask] = rng.normal(120, 15, normal_mask.sum()).clip(60)
    failed[normal_mask] = 0
    run_attempt[normal_mask] = 1
    true_label[normal_mask] = "normal"

    flaky_mask = kind == "flaky"
    n_flaky = flaky_mask.sum()
    duration[flaky_mask] = rng.normal(130, 20, n_flaky).clip(60)
    # most flaky runs self-heal on retry (attempt 2), a handful stay red
    healed = rng.random(n_flaky) < 0.7
    run_attempt[flaky_mask] = np.where(healed, 2, rng.integers(2, 4, n_flaky))
    failed[flaky_mask] = np.where(healed, 0, 1)
    true_label[flaky_mask] = "anomaly"

    spike_mask = kind == "infra_spike"
    n_spike = spike_mask.sum()
    duration[spike_mask] = rng.normal(600, 150, n_spike).clip(300)
    run_attempt[spike_mask] = 1
    failed[spike_mask] = rng.choice([0, 1], n_spike, p=[0.4, 0.6])
    true_label[spike_mask] = "anomaly"

    regression_mask = kind == "regression"
    n_regression = regression_mask.sum()
    duration[regression_mask] = rng.normal(125, 15, n_regression).clip(60)
    run_attempt[regression_mask] = 1
    failed[regression_mask] = 1
    true_label[regression_mask] = "anomaly"

    df = pd.DataFrame(
        {
            "run_id": np.arange(1, n + 1),
            "workflow_name": "ci",
            "branch": "main",
            "event": "push",
            "status": "completed",
            "conclusion": np.where(failed == 1, "failure", "success"),
            "run_attempt": run_attempt,
            "created_at": timestamps,
            "updated_at": timestamps + pd.to_timedelta(duration, unit="s"),
            "duration_seconds": duration.round(1),
            "true_label": true_label,
            "synthetic_kind": kind,
        }
    )
    return df.sample(frac=1, random_state=seed).reset_index(drop=True)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--out", required=True)
    parser.add_argument("--n", type=int, default=400)
    parser.add_argument("--seed", type=int, default=42)
    args = parser.parse_args()

    df = generate(args.n, args.seed)
    df.to_csv(args.out, index=False)
    n_anom = int((df["true_label"] == "anomaly").sum())
    print(f"generated {len(df)} SYNTHETIC runs ({n_anom} true anomalies) -> {args.out}")


if __name__ == "__main__":
    main()
