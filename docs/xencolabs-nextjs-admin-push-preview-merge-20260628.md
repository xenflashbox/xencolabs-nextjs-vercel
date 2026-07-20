# Xencolabs.com admin — Push branch, smoke preview, then merge to main

**Status**: 🟢 Push `feature/tools-integration` (commit e7ef693). Let Vercel auto-build the preview. Smoke 5 paths on the preview URL. If green, merge to main → prod auto-deploys.

## Why preview-then-merge, not direct-to-main

Your dev-server smoke + `npm run build` already cleared a wide field. What Vercel preview adds:
- Real production Next.js build behavior (some middleware edge cases only show in prod mode)
- Clerk satellite middleware evaluated against the actual production Clerk config (your `/tools` public-route addition is exactly the kind of thing that needs runtime confirmation, not just a config-file read)
- CDN / edge cache behavior on the static `public/tools/*` assets

Two of your 4 catches (Clerk gating, trailing-slash loop) were precisely "things that only show when middleware actually runs" — same risk class applies to anything we haven't yet thought of. 3 minutes of preview is cheap insurance for the main marketing site.

## Steps

1. **Push the branch:**
   ```bash
   git push -u origin feature/tools-integration
   ```
2. **Get the Vercel preview URL** — Vercel will comment on the PR / push, or check the dashboard. Format usually `https://xencolabs-nextjs-vercel-git-feature-tools-integration-<org>.vercel.app`
3. **Smoke 5 paths on the preview URL:**
   ```
   /tools                   → hub loads, 17 cards visible
   /tools/json-formatter    → tool loads + parses sample JSON in-browser
   /tools/jwt-decode        → decode a sample JWT
   /tools/case-converter    → tests one of the 3 shell-dependent tools (your fallback "All tools" back-link)
   /sitemap.xml             → 18 new tool paths present
   ```
4. **If green, merge to main:**
   ```bash
   # On GitHub: open PR feature/tools-integration → main, merge
   # OR if you'd rather skip the PR ceremony for this size of change:
   git checkout main
   git merge --no-ff feature/tools-integration
   git push origin main
   ```
   Vercel auto-deploys main to prod. ~2 min build.
5. **Post-prod smoke** — same 5 paths on `https://xencolabs.com/...`. Plus a 6th:
   ```bash
   curl -sI https://xencolabs.com/tools/uuid/ | head -1   # 200 (not a 308 redirect loop)
   ```
6. **Ping me** with the prod URLs all green + the sitemap proof. I'll cascade GO to the xencolabs-tools admin (xenco3) to drain the swarm + handle DNS retirement for `tools.devmaestro.io`.

## Founder bless on the 2 judgment calls

- ✅ **Dev Maestro promo shell stays disabled** — the branding mismatch on the main marketing site is a hard veto. Right call. You can keep the repaired-but-disabled `shell.js` in the repo or delete it; either is fine. If you keep it, add a one-line comment noting it's disabled-by-design.
- ✅ **"Tools" nav link surfaced** — this is the discoverability path that justifies the migration. Without nav, the tools are a hidden URL. Keep it.

## On the dirty working tree

Your surgical exclusion of the in-progress admin-token feature + BayTech work was the right move. The push will only carry your 25 tools files. After merging, you can either:
- Continue the admin-token work on a fresh branch off main (clean slate)
- Or continue locally where you are — `git stash`-ing isn't necessary since the work is already untracked/uncommitted and isolated from your committed feature branch

That's a workflow call for you, not me.

## What architect handles after your push

- DNS retirement for `tools.devmaestro.io` (likely a 301 → `xencolabs.com/tools/...` for SEO continuity — pending founder call on whether they want to keep the legacy subdomain at all)
- Cascade GO to xencolabs-tools admin for swarm drain (xenco3) + the 4 orphan-volume retirement (xenco2/4/5/6)
- Mark task #188 done

## Standing by

Ping after prod smoke. ~5-10 min total ETA.
