#!/usr/bin/env bash
set -euo pipefail

# Load .env.local if it exists
if [ -f .env.local ]; then
  export $(grep -E '^[A-Za-z_][A-Za-z0-9_]*=' .env.local | xargs -d '\n' 2>/dev/null || true)
fi

if [ -z "${PORT:-}" ]; then
  PORT=3000
  export PORT
fi

PID=$(ss -ltnp "( sport = :$PORT )" 2>/dev/null | awk -F',' '/pid=/ {print $2}' | sed 's/.*pid=\([0-9]\+\).*/\1/' | head -n1 || true)
if [ -n "$PID" ]; then
  echo "Port $PORT used by PID $PID. Attempting graceful stop..."
  kill "$PID" 2>/dev/null || true
  sleep 0.5
  if ss -ltn "( sport = :$PORT )" | grep -q ":$PORT "; then
    echo "Force-killing PID $PID"
    kill -9 "$PID" 2>/dev/null || true
    sleep 0.2
  fi
fi

echo "▶ Starting dev server on http://localhost:$PORT AUTH_BYPASS=${AUTH_BYPASS:-0}"
if command -v pnpm >/dev/null 2>&1; then
  pnpm install --frozen-lockfile || pnpm install
  pnpm dev
else
  echo "pnpm not found. Install via volta: volta install pnpm"
  exit 2
fi
