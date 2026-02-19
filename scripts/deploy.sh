#!/usr/bin/env bash
set -euo pipefail

FORCE="${1:-}"

echo "=== XencoLabs Vercel Deploy ==="
echo ""

# --- Run preflight ---
./scripts/preflight.sh "${FORCE}"

DEPLOY_TYPE="$(python3 - <<'PY'
import json
d=json.load(open(".xenco/meta.json"))
print(d.get("deploy",{}).get("type","none"))
PY
)"

if [[ "${DEPLOY_TYPE}" == "none" ]]; then
  echo "deploy.type=none. This repo/folder is not deployable."
  exit 0
fi

SHA="$(git rev-parse --short HEAD)"
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
PROD_URL="$(python3 - <<'PY'
import json
d=json.load(open(".xenco/meta.json"))
print(d.get("deploy",{}).get("production_url",""))
PY
)"

echo ""
echo "Deploying:"
echo "  branch:  ${BRANCH}"
echo "  sha:     ${SHA}"
echo "  target:  Vercel (auto-deploy on push to main)"
echo "  prod:    ${PROD_URL}"
echo ""

# --- Push to origin/main to trigger Vercel deploy ---
if [[ "${BRANCH}" == "main" ]]; then
  echo "Pushing to origin/main..."
  git push origin main
  echo ""
  echo "++ Push complete. Vercel will auto-deploy."
  echo "   Monitor at: https://vercel.com/dashboard"
  echo ""
else
  if [[ "${FORCE}" == "--force" ]]; then
    echo "!! FORCE: Pushing branch ${BRANCH} to origin..."
    git push origin "${BRANCH}"
    echo "!! Branch pushed. Create a PR or merge to main for production deploy."
  else
    echo "Not on main. Push your branch and create a PR:"
    echo "  git push origin ${BRANCH}"
    echo "  gh pr create"
    exit 1
  fi
fi

# --- Post-deploy verification ---
echo "Waiting 30s for Vercel build to start..."
sleep 30
./scripts/verify.sh || true

echo "++ Deploy complete."
