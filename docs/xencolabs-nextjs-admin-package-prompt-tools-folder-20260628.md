# Xencolabs.com (Next.js Vercel) admin — Integrate xencolabs-tools as `/tools/` on the main site

**Goal**: Fold the 17 client-side utility tools currently running as a Docker Swarm static container behind `tools.devmaestro.io` into the existing xencolabs.com Next.js app, deploy via Vercel, then retire the swarm container + the legacy subdomain.

**Why**: better SEO consolidation (same origin = trust + linkjuice), zero LAN infra to maintain, edge CDN performance, source-in-git as a side effect. The tools are pure HTML/JS — no backend, no secrets, no migration risk.

**Repo**: `github.com/xenflashbox/xencolabs-nextjs-vercel` (already the canonical xencolabs.com Vercel project)
**Local working dir**: `/home/xen/docker/apps/xencolabs-nextjs-vercel/`
**Vercel project**: deploys on push to `main` (verify your branch + Vercel project auto-deploy is wired)

## Package contents (handed to you)

**Tarball**: `/home/xen/inbox/xenco-tools-payload-20260628.tar.gz` (~17KB compressed)

Contains the `tools/` folder from the swarm static site: 17 self-contained utilities (each its own folder with `index.html`), plus the hub `index.html`, `sitemap.xml`, and `assets/`. All client-side. No build step required for the tools themselves — they ship as-is.

The 17 tools (the SoU at xenco3:`/home/xen/docker/apps/xencolabs-tools/STATE-OF-THE-UNION-20260628.md` has full inventory):

```
base64, case-converter, clipboard-sanitizer, csv-json, curl-httpie, curl-to-fetch,
fetch-axios, hash, http-status, json-formatter, jwt-decode, regex-tester,
text-diff, timestamp, url-encode, uuid, yaml-json
```

Plus hub `index.html` (lists all tools).

## Integration plan

### Step 1 — Drop the tools into `public/`

```bash
cd /home/xen/docker/apps/xencolabs-nextjs-vercel
mkdir -p public/tools
tar xzf /home/xen/inbox/xenco-tools-payload-20260628.tar.gz -C public/ --strip-components=1
# Verify: ls public/tools/ — should show 17 tool dirs + assets + index.html + sitemap.xml
```

The tarball's top-level is `tools/`, so `--strip-components=1` lands the contents at `public/tools/`.

### Step 2 — Add Next.js rewrites so `/tools/{slug}/` serves the static index.html

Edit `next.config.mjs` — Next.js doesn't auto-serve `index.html` from a `public/` folder. Add a `rewrites` block to map clean URLs to the static files:

```js
const nextConfig = {
  reactStrictMode: true,
  experimental: { typedRoutes: true },

  async rewrites() {
    return [
      { source: '/tools', destination: '/tools/index.html' },
      { source: '/tools/', destination: '/tools/index.html' },
      { source: '/tools/:slug', destination: '/tools/:slug/index.html' },
      { source: '/tools/:slug/', destination: '/tools/:slug/index.html' },
    ];
  },

  // ... existing webpack config stays untouched
};
```

This preserves the SEO paths (`xencolabs.com/tools/json-formatter/`) without converting any tool to React.

### Step 3 — Add the 17 tool paths + hub to `app/sitemap.ts`

Edit `app/sitemap.ts`. The existing list has `/apps/blogcraft`, etc. Append a `tools` array and merge:

```ts
const toolRoutes = [
  '/tools',
  '/tools/base64',
  '/tools/case-converter',
  '/tools/clipboard-sanitizer',
  '/tools/csv-json',
  '/tools/curl-httpie',
  '/tools/curl-to-fetch',
  '/tools/fetch-axios',
  '/tools/hash',
  '/tools/http-status',
  '/tools/json-formatter',
  '/tools/jwt-decode',
  '/tools/regex-tester',
  '/tools/text-diff',
  '/tools/timestamp',
  '/tools/url-encode',
  '/tools/uuid',
  '/tools/yaml-json',
];

// Then merge into the routes spread in the final return:
return [...routes, ...toolRoutes].map((route) => ({ ... }));
```

(Or whatever your existing merge pattern is — the goal is all 18 entries in the final sitemap.xml output.)

### Step 4 — Header/nav link (optional but recommended)

Add a "Tools" link to your header nav (`components/layout/header.tsx`) pointing to `/tools`. This gives logged-in/out users a way to discover the utility hub from the main site. Skip if you'd rather keep tools as a hidden marketing surface.

### Step 5 — Local verify

```bash
pnpm dev  # or npm/yarn
# Browse:
#   http://localhost:3000/tools — should show the hub
#   http://localhost:3000/tools/json-formatter — should show the JSON formatter tool
#   http://localhost:3000/tools/uuid — UUID generator
# Pick 3-4 tools at random and confirm they render + work
```

If a tool fails to load: check the browser console — likely an asset path issue (some tools may reference `/assets/` which now lives at `/tools/assets/`). If so, the tarball's HTML files reference relative paths and should "just work"; absolute paths would need a sed fix.

### Step 6 — Commit + push

```bash
git checkout -b feature/tools-integration
git add public/tools next.config.mjs app/sitemap.ts components/layout/header.tsx
git status   # sanity check — should be ~20 file changes + new public/tools/ tree
git commit -m "feat(tools): integrate 17 client-side utility tools at /tools/

Migrate xencolabs-tools static site (formerly tools.devmaestro.io) into
the main xencolabs.com Next.js app. Tools serve from public/tools/ via
next.config rewrites; sitemap and SEO paths preserved.

17 tools: base64, case-converter, clipboard-sanitizer, csv-json,
curl-httpie, curl-to-fetch, fetch-axios, hash, http-status,
json-formatter, jwt-decode, regex-tester, text-diff, timestamp,
url-encode, uuid, yaml-json"

git push -u origin feature/tools-integration
```

Open a PR (or push direct to main if you prefer for this risk profile — client-side static files, no auth or DB touch).

### Step 7 — Vercel preview QA

Vercel will auto-build the preview URL. Smoke-test:
- `https://<preview>.vercel.app/tools` — hub loads
- `https://<preview>.vercel.app/tools/json-formatter` — tool loads, parses JSON in browser
- `https://<preview>.vercel.app/tools/jwt-decode` — decode a sample JWT
- `https://<preview>.vercel.app/sitemap.xml` — all 18 tool paths present

If preview is clean, merge to main. Vercel auto-deploys production.

### Step 8 — Post-deploy verification

```bash
curl -sI https://xencolabs.com/tools/ | head -1                     # 200
curl -sI https://xencolabs.com/tools/json-formatter/ | head -1      # 200
curl -s https://xencolabs.com/sitemap.xml | grep -c '/tools/'       # >= 17
```

Then ping me (architect). I'll signal to xencolabs-tools admin (xenco3) to drain the swarm container, retire the 4 orphan volumes on xenco2/4/5/6, and handle DNS retirement for `tools.devmaestro.io` (likely a 301 redirect to `xencolabs.com/tools` for SEO continuity — depends on what the founder wants for that subdomain).

## SEO continuity note

`tools.devmaestro.io` currently returns 404 at the edge (swarm Traefik broke during the 2026-06-27 drain), so there's nothing live to 301 right now. But once your `xencolabs.com/tools/` is live, a 301 from `tools.devmaestro.io/*` → `xencolabs.com/tools/*` would preserve any external backlinks pointing at the old subdomain. Architect handles the DNS / Cloudflare side of that after your deploy lands.

## What you DON'T do

- ❌ Don't convert tools to React components — they're standalone client-side HTML; the rewrites pattern keeps them lean
- ❌ Don't add any env var or secret — these tools have zero backend dependencies
- ❌ Don't touch the swarm container on xenco3 — that's the xencolabs-tools admin's scope to drain after you ship
- ❌ Don't 301-redirect the old subdomain yourself — DNS is on the architect's side
- ❌ Don't push to a new GitHub repo or fork — use the existing `xenflashbox/xencolabs-nextjs-vercel` repo. (The 17 tools are pure client-side HTML with no secrets, so no leak risk from this commit even given the org's prior incident history.)

## Standing by

Once the production deploy is verified, ping me with the production URL and the sitemap proof (`curl https://xencolabs.com/sitemap.xml | grep tools`). I'll wave the green flag to xencolabs-tools admin for swarm drain + the DNS-side cleanup.

ETA expectation: ~30 min including local verify + push + Vercel build + post-deploy smoke.
