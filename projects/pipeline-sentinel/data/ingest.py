"""Pull historical workflow-run metadata from the GitHub Actions REST API.

Usage:
    python ingest.py --repo owner/repo --out runs.csv [--token $GITHUB_TOKEN] [--max-runs 500]

Requires a GitHub personal access token with `actions:read` scope, passed via
--token or the GITHUB_TOKEN environment variable, to avoid the unauthenticated
rate limit.
"""

import argparse
import os
import sys

import pandas as pd
import requests

API_ROOT = "https://api.github.com"


def fetch_runs(repo: str, token: str, max_runs: int) -> list[dict]:
    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {token}" if token else "",
    }
    runs = []
    page = 1
    per_page = min(100, max_runs)
    while len(runs) < max_runs:
        resp = requests.get(
            f"{API_ROOT}/repos/{repo}/actions/runs",
            headers=headers,
            params={"per_page": per_page, "page": page},
            timeout=30,
        )
        resp.raise_for_status()
        batch = resp.json().get("workflow_runs", [])
        if not batch:
            break
        runs.extend(batch)
        page += 1
    return runs[:max_runs]


def to_dataframe(runs: list[dict]) -> pd.DataFrame:
    rows = []
    for run in runs:
        created = pd.to_datetime(run["created_at"])
        updated = pd.to_datetime(run["updated_at"])
        rows.append(
            {
                "run_id": run["id"],
                "workflow_name": run.get("name"),
                "branch": run.get("head_branch"),
                "event": run.get("event"),
                "status": run.get("status"),
                "conclusion": run.get("conclusion"),
                "run_attempt": run.get("run_attempt", 1),
                "created_at": created,
                "updated_at": updated,
                "duration_seconds": (updated - created).total_seconds(),
            }
        )
    return pd.DataFrame(rows)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo", required=True, help="owner/repo")
    parser.add_argument("--out", required=True, help="output CSV path")
    parser.add_argument("--token", default=os.environ.get("GITHUB_TOKEN", ""))
    parser.add_argument("--max-runs", type=int, default=500)
    args = parser.parse_args()

    if not args.token:
        print("warning: no token supplied, subject to unauthenticated rate limits", file=sys.stderr)

    runs = fetch_runs(args.repo, args.token, args.max_runs)
    df = to_dataframe(runs)
    df.to_csv(args.out, index=False)
    print(f"wrote {len(df)} runs to {args.out}")


if __name__ == "__main__":
    main()
