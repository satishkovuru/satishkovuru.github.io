"""Baseline anomaly model for CI/CD pipeline runs.

Scores each run with an IsolationForest over duration, failure signal, and
run-attempt count — unsupervised, so it needs no hand-labeled anomaly set,
and it's fit fresh against each pipeline's own history rather than a fixed
global threshold.

Usage:
    python anomaly_detector.py --in runs.csv --out scored_runs.csv [--contamination 0.05]
"""

import argparse

import pandas as pd
from sklearn.ensemble import IsolationForest

FEATURE_COLUMNS = ["duration_seconds", "failed", "run_attempt"]


def build_features(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df["failed"] = (df["conclusion"] == "failure").astype(int)
    df["duration_seconds"] = df["duration_seconds"].fillna(df["duration_seconds"].median())
    return df


def score_runs(df: pd.DataFrame, contamination: float) -> pd.DataFrame:
    df = build_features(df)
    model = IsolationForest(contamination=contamination, random_state=42)
    X = df[FEATURE_COLUMNS]
    df["anomaly_score"] = model.fit_predict(X)
    df["is_anomaly"] = df["anomaly_score"] == -1

    df["flag_reason"] = ""
    duration_z = (df["duration_seconds"] - df["duration_seconds"].mean()) / df["duration_seconds"].std(ddof=0)
    df.loc[df["is_anomaly"] & (duration_z.abs() > 1.5), "flag_reason"] += "unusual duration; "
    df.loc[df["is_anomaly"] & (df["failed"] == 1), "flag_reason"] += "run failed; "
    df.loc[df["is_anomaly"] & (df["run_attempt"] > 1), "flag_reason"] += "required retries; "
    df.loc[df["is_anomaly"] & (df["flag_reason"] == ""), "flag_reason"] = "unusual combination of signals; "

    return df


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--in", dest="input_path", required=True)
    parser.add_argument("--out", dest="output_path", required=True)
    parser.add_argument(
        "--contamination",
        type=float,
        default=0.09,
        help=(
            "Expected fraction of anomalous runs. Sets a hard flag rate, so it "
            "should be tuned against your own pipeline's real anomaly rate, not "
            "left at the default. See tests/evaluate_synthetic.py for how the "
            "0.09 default was chosen and to re-tune it against labeled data."
        ),
    )
    args = parser.parse_args()

    df = pd.read_csv(args.input_path, parse_dates=["created_at", "updated_at"])
    scored = score_runs(df, args.contamination)
    scored.to_csv(args.output_path, index=False)

    n_anomalies = int(scored["is_anomaly"].sum())
    print(f"scored {len(scored)} runs, flagged {n_anomalies} anomalies -> {args.output_path}")


if __name__ == "__main__":
    main()
