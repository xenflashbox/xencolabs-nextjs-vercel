#!/usr/bin/env bash
set -euo pipefail

# Lightweight push script - skips build check, still runs safety checks

FORCE="${1:-}"

fail(){ echo ":: $*" >&2; exit 1; }
ok(){ echo "++ $*"; }

echo "=== XencoLabs Git Push ==="
echo ""

# --- Verify identity ---
[[ -f ".xenco/meta.json" ]] || fail "Missing .xenco/meta.json - are you in the right directory?"

EXPECTED_ROOT="$(python3 - <<'PY'
import json
d=json.load(open(".xenco/meta.json"))
print(d.get("workspace",{}).get("expected_repo_root",""))
PY
)"

if [[ -n "${EXPECTED_ROOT}" ]]; then
  [[ "$(pwd)" == "${EXPECTED_ROOT}" ]] || fail "Wrong directory. Expected: ${EXPECTED_ROOT}"
fi
ok "Directory verified"

# --- Git checks ---
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || fail "Not a git repo"
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
SHA="$(git rev-parse --short HEAD)"

# --- Check for secrets ---
if git diff --cached --name-only 2>/dev/null | grep -qE '\.env\.production$|\.env\.local$'; then
  fail "Staged files contain secrets (.env.production or .env.local)"
fi
ok "No secrets staged"

# --- Uncommitted changes warning ---
CHANGES="$(git status --porcelain)"
if [[ -n "${CHANGES}" && "${FORCE}" != "--force" ]]; then
  echo "${CHANGES}" >&2
  fail "Uncommitted changes. Commit first or use --force."
fi

echo ""
echo "Pushing:"
echo "  branch: ${BRANCH}"
echo "  sha:    ${SHA}"
echo "  remote: origin"
echo ""

git push origin "${BRANCH}"

ok "Pushed ${BRANCH} (${SHA}) to origin"

if [[ "${BRANCH}" == "main" ]]; then
  echo ""
  echo "This push will trigger a Vercel production deploy."
  echo "Monitor at: https://vercel.com/dashboard"
fi
