# Guardrails Kit v1 - Rollout Report

**Date**: 2026-02-19
**Target**: /home/xen/docker/apps/xencolabs-nextjs-vercel

## Directory Summary

| Field | Value |
|-------|-------|
| Directory | `/home/xen/docker/apps/xencolabs-nextjs-vercel` |
| Kind | `service` |
| Service ID | `xencolabs-nextjs-vercel` |
| Deploy Type | `vercel` |
| Git Remote | `https://github.com/xenflashbox/xencolabs-nextjs-vercel.git` |
| Branch | `main` |
| Production URL | `https://xencolabs.com` |
| Docker Image | N/A (Vercel deployment) |
| Swarm Service | N/A (Vercel deployment) |
| Status | **Completed** |

## Files Created

| File | Purpose | Status |
|------|---------|--------|
| `CRITICAL.md` | Top-level deployment rules and safety info | Created |
| `.xenco/meta.json` | Service identity and deploy configuration | Created |
| `scripts/whoami.sh` | Orientation check (pwd, git, meta) | Created, executable |
| `scripts/preflight.sh` | Pre-deploy safety gates (directory, git, secrets, build) | Created, executable |
| `scripts/deploy.sh` | Full deploy pipeline (preflight + push + verify) | Created, executable |
| `scripts/push.sh` | Lightweight push with safety checks (no build) | Created, executable |
| `scripts/verify.sh` | Post-deploy production URL health checks | Created, executable |
| `README-OPS.md` | Quick operations reference | Created |
| `GUARDRAILS_ROLLOUT_REPORT.md` | This report | Created |

## Guardrails Active

1. **Directory lock**: `preflight.sh` blocks if `pwd != expected_repo_root`
2. **Git safety**: Blocks deploy with uncommitted changes (unless `--force`)
3. **Branch guard**: Blocks deploy if not on `main` (unless `--force`)
4. **Secrets guard**: Blocks if `.env.production` or `.env.local` are staged for commit
5. **Build check**: `preflight.sh` runs `next build` to catch errors before push
6. **Identity check**: `whoami.sh` prints full context so agents know where they are
7. **Post-deploy verify**: `verify.sh` checks production URLs respond with 2xx

## Adaptations from Standard Kit

This project deploys via **Vercel** (not Docker Swarm/Compose), so the kit was adapted:
- `deploy.type` set to `vercel` instead of `swarm`/`compose`
- `deploy.sh` pushes to `origin/main` to trigger Vercel auto-deploy (no docker build/push)
- `push.sh` added as a lightweight alternative (safety checks without build verification)
- No swarm manager host, docker image, or swarm service references
- `verify.sh` uses HTTP HEAD requests to check production URLs
- `preflight.sh` includes `next build` as the build verification step

## Verification

`whoami.sh` output confirms correct configuration:
```
PWD: /home/xen/docker/apps/xencolabs-nextjs-vercel
GIT_ROOT: /home/xen/docker/apps/xencolabs-nextjs-vercel
BRANCH:   main
SHA:      c35d2d3
REMOTE:   https://github.com/xenflashbox/xencolabs-nextjs-vercel.git
META:
  kind: service
  service_id: xencolabs-nextjs-vercel
  deploy.type: vercel
  production_url: https://xencolabs.com
```
