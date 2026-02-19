#!/usr/bin/env bash
set -euo pipefail

FORCE="${1:-}"

fail(){ echo ":: $*" >&2; exit 1; }
warn(){ echo "!!  $*" >&2; }
ok(){ echo "++ $*"; }

# --- Required files ---
[[ -f "CRITICAL.md" ]] || fail "Missing CRITICAL.md"
[[ -f ".xenco/meta.json" ]] || fail "Missing .xenco/meta.json"
[[ -d "scripts" ]] || fail "Missing scripts/"

# --- Read meta ---
DEPLOY_TYPE="$(python3 - <<'PY'
import json
d=json.load(open(".xenco/meta.json"))
print(d.get("deploy",{}).get("type","none"))
PY
)"

EXPECTED_ROOT="$(python3 - <<'PY'
import json
d=json.load(open(".xenco/meta.json"))
print(d.get("workspace",{}).get("expected_repo_root",""))
PY
)"

# --- Enforce correct directory ---
if [[ -n "${EXPECTED_ROOT}" ]]; then
  ACTUAL="$(pwd)"
  [[ "${ACTUAL}" == "${EXPECTED_ROOT}" ]] || fail "Wrong directory. expected_repo_root=${EXPECTED_ROOT} actual=${ACTUAL}"
fi
ok "Directory check passed"

# --- Git safety ---
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || fail "Not a git repo."
ROOT="$(git rev-parse --show-toplevel)"
[[ "${ROOT}" == "$(pwd)" ]] || fail "Not at git root. cd to: ${ROOT}"
ok "Git root check passed"

CHANGES="$(git status --porcelain)"
if [[ -n "${CHANGES}" && "${FORCE}" != "--force" ]]; then
  echo "${CHANGES}" >&2
  fail "Uncommitted changes. Commit/stash first (or --force for emergency only)."
fi
ok "Working tree clean"

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [[ "${BRANCH}" != "main" && "${FORCE}" != "--force" ]]; then
  fail "Not on main branch (${BRANCH}). Switch to main (or --force for emergency)."
fi
ok "On branch: ${BRANCH}"

git fetch origin main >/dev/null 2>&1 || warn "Could not fetch origin/main"

# --- Check for secrets leaks ---
if git diff --cached --name-only 2>/dev/null | grep -qE '\.env\.production$|\.env\.local$'; then
  fail "Staged files contain .env.production or .env.local - DO NOT commit secrets"
fi
ok "No secrets in staging area"

# --- Build check ---
if [[ "${DEPLOY_TYPE}" == "vercel" ]]; then
  if command -v npx >/dev/null 2>&1; then
    echo "Running build check..."
    npx next build 2>&1 | tail -5 || fail "Build failed. Fix errors before deploying."
    ok "Build check passed"
  else
    warn "npx not found - skipping build check"
  fi
fi

ok "Preflight passed."
