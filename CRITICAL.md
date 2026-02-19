# CRITICAL (READ FIRST)

## Deployment platform
- **Vercel** (auto-deploys from `main` branch)
- Production URL: https://xencolabs.com

## Absolute rule: no guessing
Before ANY deployment or infrastructure action:
1. `./scripts/whoami.sh`
2. `./scripts/preflight.sh`

## Git workflow
- Push to `main` triggers Vercel production deploy
- All feature work on branches, merge via PR
- Never force-push to `main`

## Deployment rule
- Standard deploy: `./scripts/deploy.sh`
- Push only (no build check): `./scripts/push.sh`
- Deploy BLOCKS if git is dirty unless you pass `--force`

## Emergency only
- `./scripts/deploy.sh --force`
- If used, you MUST paste: reason + `git diff --stat` + `git rev-parse HEAD`

## Secrets
- **NEVER** commit `.env.local` or `.env.production` with real keys
- All production secrets managed in Vercel dashboard
- Use `.env.example` as the template

## Auth
- Clerk (primary domain: xencolabs.com)
- Do NOT set satellite flags on this app - it IS the primary
