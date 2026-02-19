#!/usr/bin/env bash
set -euo pipefail

echo "=== XencoLabs Deploy Verification ==="
echo ""

python3 - <<'PY'
import json, urllib.request, sys

d = json.load(open(".xenco/meta.json"))
dep = d.get("deploy", {})

for key in ("health_url", "version_url", "production_url"):
    url = dep.get(key)
    if not url:
        print(f"!!  Missing {key} in .xenco/meta.json")
        continue
    try:
        req = urllib.request.Request(url, method="HEAD")
        req.add_header("User-Agent", "xenco-guardrails/1.0")
        with urllib.request.urlopen(req, timeout=15) as r:
            status = r.getcode()
        if status < 400:
            print(f"++ {key}: {url} (HTTP {status})")
        else:
            print(f"!! {key}: {url} (HTTP {status})")
    except Exception as e:
        print(f"!! {key} failed: {url} -> {e}")
PY

echo ""
echo "++ Verification complete."
