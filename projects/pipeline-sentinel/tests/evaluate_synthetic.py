"""Evaluate the anomaly model against the labeled synthetic dataset.

Not a unit test — a small evaluation script to measure precision/recall/
false-positive rate at different `contamination` settings against
ground-truth labels, since the model is unsupervised at inference time and
has no labels to learn from in production.

Usage:
    python evaluate_synthetic.py --in ../data/runs_synthetic.csv
"""

import argparse
import sys
from pathlib import Path

import pandas as pd

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "models"))
from anomaly_detector import score_runs  # noqa: E402


def evaluate(df: pd.DataFrame, contamination: float) -> dict:
    scored = score_runs(df, contamination)
    true_pos = ((scored["is_anomaly"]) & (scored["true_label"] == "anomaly")).sum()
    false_pos = ((scored["is_anomaly"]) & (scored["true_label"] == "normal")).sum()
    false_neg = ((~scored["is_anomaly"]) & (scored["true_label"] == "anomaly")).sum()
    true_neg = ((~scored["is_anomaly"]) & (scored["true_label"] == "normal")).sum()

    precision = true_pos / (true_pos + false_pos) if (true_pos + false_pos) else 0.0
    recall = true_pos / (true_pos + false_neg) if (true_pos + false_neg) else 0.0
    fp_rate = false_pos / (false_pos + true_neg) if (false_pos + true_neg) else 0.0

    return {
        "contamination": contamination,
        "flagged": int(scored["is_anomaly"].sum()),
        "true_positives": int(true_pos),
        "false_positives": int(false_pos),
        "false_negatives": int(false_neg),
        "precision": round(precision, 3),
        "recall": round(recall, 3),
        "false_positive_rate": round(fp_rate, 3),
    }


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--in", dest="input_path", default="../data/runs_synthetic.csv")
    args = parser.parse_args()

    df = pd.read_csv(args.input_path, parse_dates=["created_at", "updated_at"])
    true_rate = (df["true_label"] == "anomaly").mean()
    print(f"dataset: {len(df)} runs, {true_rate:.1%} true anomaly rate\n")

    rows = [evaluate(df, c) for c in [0.05, 0.08, 0.10, 0.15, 0.20, round(true_rate, 3)]]
    results = pd.DataFrame(rows)
    print(results.to_string(index=False))


if __name__ == "__main__":
    main()
