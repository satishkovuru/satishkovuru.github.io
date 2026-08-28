"""Streamlit dashboard: recent pipeline runs, flagged anomalies, and why.

Usage:
    streamlit run app.py -- --data ../data/scored_runs.csv
"""

import argparse
import sys

import pandas as pd
import streamlit as st


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--data", default="../data/scored_runs.csv")
    # Streamlit passes its own args before the `--`, so only parse known ones.
    args, _ = parser.parse_known_args(sys.argv[1:])
    return args


def main() -> None:
    args = parse_args()
    st.set_page_config(page_title="PipelineSentinel", layout="wide")
    st.title("PipelineSentinel")
    st.caption("Anomaly detection for CI/CD pipeline runs")

    try:
        df = pd.read_csv(args.data, parse_dates=["created_at", "updated_at"])
    except FileNotFoundError:
        st.error(f"No scored run data at {args.data}. Run ingest.py then anomaly_detector.py first.")
        return

    total = len(df)
    anomalies = int(df["is_anomaly"].sum()) if "is_anomaly" in df else 0

    col1, col2, col3 = st.columns(3)
    col1.metric("Runs analyzed", total)
    col2.metric("Anomalies flagged", anomalies)
    col3.metric("Flag rate", f"{(anomalies / total * 100):.1f}%" if total else "—")

    st.subheader("Flagged runs")
    if "is_anomaly" in df:
        flagged = df[df["is_anomaly"]].sort_values("created_at", ascending=False)
        st.dataframe(
            flagged[["run_id", "workflow_name", "branch", "conclusion", "duration_seconds", "flag_reason", "created_at"]],
            use_container_width=True,
        )
    else:
        st.info("Run the model first to populate anomaly flags.")

    st.subheader("All recent runs")
    st.dataframe(df.sort_values("created_at", ascending=False), use_container_width=True)


if __name__ == "__main__":
    main()
