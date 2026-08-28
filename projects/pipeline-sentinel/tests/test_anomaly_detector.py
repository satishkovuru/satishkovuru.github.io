import pandas as pd
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "models"))

from anomaly_detector import build_features, score_runs  # noqa: E402


def _sample_df() -> pd.DataFrame:
    return pd.DataFrame(
        {
            "run_id": range(1, 21),
            "conclusion": ["success"] * 18 + ["failure", "failure"],
            "duration_seconds": [120.0] * 18 + [1200.0, 5.0],
            "run_attempt": [1] * 19 + [3],
            "created_at": pd.date_range("2026-01-01", periods=20, freq="h"),
        }
    )


def test_build_features_adds_failed_column():
    df = build_features(_sample_df())
    assert "failed" in df.columns
    assert df["failed"].sum() == 2


def test_score_runs_flags_outliers():
    scored = score_runs(_sample_df(), contamination=0.1)
    assert "is_anomaly" in scored.columns
    assert scored["is_anomaly"].sum() >= 1
    # the run with the far-longer duration should be among the flagged
    longest_run = scored.loc[scored["duration_seconds"].idxmax()]
    assert longest_run["is_anomaly"]
