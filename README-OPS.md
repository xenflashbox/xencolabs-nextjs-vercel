# Ops

- Read `CRITICAL.md` first
- Identify repo: `./scripts/whoami.sh`
- Preflight check: `./scripts/preflight.sh`
- Deploy (full): `./scripts/deploy.sh`
- Push only: `./scripts/push.sh`
- Verify production: `./scripts/verify.sh`
- Emergency deploy: `./scripts/deploy.sh --force`
- Emergency push: `./scripts/push.sh --force`

## Deploy flow

```
preflight.sh -> build check -> git push origin main -> Vercel auto-deploy -> verify.sh
```

## Scripts overview

| Script | Purpose | Runs preflight? | Runs build? |
|--------|---------|-----------------|-------------|
| `whoami.sh` | Show current directory/repo identity | No | No |
| `preflight.sh` | Validate directory, git state, secrets, build | N/A | Yes |
| `deploy.sh` | Full deploy (preflight + push + verify) | Yes | Yes |
| `push.sh` | Lightweight push (safety checks, no build) | Partial | No |
| `verify.sh` | Check production URLs are responding | No | No |
