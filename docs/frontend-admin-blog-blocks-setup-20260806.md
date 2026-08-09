# Frontend Admin — Wire your blog to the Xenco Editorial Block System

**From:** payload/Meilisearch admin · **Date:** 2026-08-06 · **Audience:** Xenco Labs blog admin, Vision Battery blog admin (and any future property)

## What you're wiring

Payload CMS stores article bodies as **Lexical JSON** with embedded editorial blocks — quote callouts, top-takeaways bullets, image blocks, FAQs, comparison tables, and ~30 more (38 registered slugs total). You do **not** build these components. They ship as a shared React package:

- **`@xenco/editorial-blocks`** (currently `^0.2.0`) on the private registry `https://mcpreg.xencolabs.com/` (auth required).
- The package resolves all 38 block slugs to ~22 components internally (e.g. `tip-callout`/`warning-callout` both render `Callout` with a preset). Don't special-case slugs yourself.
- Spec (authoritative): `payload-swarm/docs/01-block-system-v2-spec.md`. Divergence notes: `docs/03-sprint-b-divergences.md`.
- **Canonical reference implementation: `compareitad`** (`components/richtext/`). Also live: fiberinsider, wcc-nextjs, winecountrycorner-gh, findavibrator, resume-coach-last (`components/blog/blocks`).

## Prerequisites

1. Your site exists in Payload with a **slug** (check the Sites collection in the CMS admin — Vision Battery: confirm your slug before anything else; it must match exactly everywhere below).
2. An npm auth token for `mcpreg.xencolabs.com` (in the `verdaccio-npm` Infisical project, or ask platform).
3. Env values from the `payload-cms` Infisical vault (prod): `MEILISEARCH_HOST`, `MEILISEARCH_SEARCH_KEY`.

## Environment variables (your frontend)

| Var | Value | Notes |
|---|---|---|
| `CMS_URL` or `NEXT_PUBLIC_PAYLOAD_URL` | your CMS base URL | article fetch |
| `NEXT_PUBLIC_SITE_SLUG` | your **exact** Payload site slug | drives article queries AND the search `site` filter. Wrong slug = silent empty results |
| `MEILISEARCH_HOST` | `https://search.xencolabs.com` | blog search |
| `MEILISEARCH_API_KEY` | value of vault entry `MEILISEARCH_SEARCH_KEY` | **search-only key.** Never the admin/master key. Note the env var name differs from the vault entry name |

Do NOT add: `ADMIN_API_KEY`, any Meilisearch admin key, or any `/api/admin/meilisearch/*` routes. Index configuration, resync, and synonyms are owned by Payload — frontends are read-only consumers. (The old per-site admin routes are being deleted fleet-wide; don't copy them from an existing repo.)

## Step 1 — Install the package

`.npmrc` in your repo:
```
@xenco:registry=https://mcpreg.xencolabs.com/
```
Token goes in CI/Vercel env (`NPM_TOKEN` pattern), not committed. Then:
```
npm i @xenco/editorial-blocks
```

## Step 2 — Lexical renderer with block dispatch

Copy `compareitad/components/richtext/RichText.tsx` as your starting point. The contract:

- Walk the Lexical JSON tree (`root` → children).
- Render standard nodes yourself (paragraph, heading h1–h4, list/listitem — this is where your bullet-point styling lives, quote, link, text-format flags: bold=1, italic=2, underline=8, code=16).
- When `node.type === 'block'` → hand the whole node to the package:
  ```tsx
  import { EditorialBlock } from '@xenco/editorial-blocks'
  // ...
  case 'block':
    return <EditorialBlock key={index} node={node} />
  ```
  It dispatches on `node.fields.blockType` (the slug). That one line covers callouts, pull quotes, FAQs, tables, image blocks — everything.

## Step 3 — Media URL resolution (image blocks)

The Sprint-D `image` block carries a `mediaId` (number), not a URL. The package needs a resolver, and browsers can't hit the CMS cross-origin on Vercel previews, so use a same-origin proxy:

1. Create `app/api/media-url/[id]/route.ts` that fetches `${CMS_URL}/api/media/{id}` server-side and returns `{ url }`.
2. Copy `compareitad/components/richtext/EditorialBlocksSetup.tsx` — it calls `configureMedia({ resolveMediaUrl })` at module scope through that proxy — and mount `<EditorialBlocksSetup />` once in your root layout.

Skip this and every reformat-flow image renders broken. (`image-with-caption` blocks carry a direct `src` and work without it, but articles use both.)

## Step 4 — CSS variable contract (your branding)

Blocks style themselves **exclusively** from CSS variables — that's how one component set serves every brand. Add a `:root` block to your `globals.css` mapping the locked variable names to YOUR brand tokens. Full list + Compare ITAD's canonical mapping: spec §5 (`docs/01-block-system-v2-spec.md` lines 464–548). The names (semantics locked, values yours):

```
--brand-primary --brand-accent
--surface-base --surface-elevated
--text-headline --text-body --text-secondary
--border-subtle --border-strong
--risk-best-green --risk-amber --risk-red
--callout-info-bg --callout-info-border
--callout-warning-bg --callout-warning-border
--callout-note-bg --callout-note-border
--font-headline --font-body --font-mono
```

Every variable must be defined — an unmapped variable renders as browser-default (invisible tint, black-on-black, etc.). Vision Battery: this is your main creative task; everything else is plumbing.

## Step 5 — Article-level field renderers (not body blocks)

Two things live OUTSIDE the Lexical body:

1. **Sources**: `footer_sources` is an article-level field (the old `sources-accordion` body block was removed in Sprint D). Render it with the package's `SourcesAccordion` component below the article body.
2. **FAQ JSON-LD**: the `faq` block must emit `FAQPage` schema.org JSON-LD in the page head for SEO. Check whether your package version emits it; if not, extract `faq` blocks from the article JSON server-side and emit the `<script type="application/ld+json">` in your article page (see how the reference sites do it, and `docs/FRONTEND_BLOG_SEO_REQUIREMENTS.md`).

Template-aware article shells (spec §6.4) are optional for launch — a single article layout is fine to start.

## Verification checklist (before you call it done)

- [ ] Fetch a published article for your site slug from the CMS and render it.
- [ ] Confirm these render correctly: `callout` (all 3 variants), `pull-quote`, `top-takeaways`, standard bullet/numbered lists, `faq`, `image` (via the media proxy — check the network tab hits `/api/media-url/`), `table` and `comparison-table`.
- [ ] View page source: `FAQPage` JSON-LD present on an article containing an FAQ block.
- [ ] All CSS variables mapped — no default-black or transparent surfaces in either color scheme you support.
- [ ] Blog search returns only YOUR site's articles (proves `NEXT_PUBLIC_SITE_SLUG` matches the indexed slug — e.g. wine-country's is `wine-country-corner` with hyphens).
- [ ] No `/api/admin/meilisearch/*` routes exist in your repo.

## Report back

1. Site slug used and confirmation articles render with all checklist blocks.
2. Package version installed.
3. Anything the package didn't cover that you had to hand-roll (so we fix it in the package, not in six repos).
