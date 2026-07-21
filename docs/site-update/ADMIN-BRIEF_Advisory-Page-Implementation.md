# ADMIN BRIEF — /advisory Page Implementation (xencolabs.com)
**Priority: ship before Tuesday 07:00 ET. Companion document: `XencoLabs_Advisory-Page-Brief.md` (design + full copy — authoritative for content). This brief is the implementation contract.**

---

## 1. SYSTEM MAP — ⚠ GROUND TRUTH REQUIRED (Xenophon fills before handoff)

- **Repo/project owning xencolabs.com:** `[REPO NAME]` — framework: `[Next.js / other]` — hosting: `[Vercel project name]`
- **CMS involvement:** `[none / Payload at (URL) — which collections drive pages?]`
- **Shared header/nav component path:** `[e.g. components/Header.tsx]`
- **Static asset convention:** `[public/ dir / CMS media / Vercel blob / docs.xencolabs.com]`

*Per the seven questions: do not start work with any bracket unfilled. "The site" is not a system name.*

## 2. AS-BUILT FACTS (verify before writing code)

- An **orphaned draft data-center/advisory page may already exist** (started previously, unlinked, possibly unpublished in CMS). ⚠ Xenophon: locate and state its path/status here: `[PATH or "does not exist"]`. If it exists: **this brief supersedes it** — harvest nothing but delete/unpublish it as part of this PR so two advisory pages never coexist.
- Live homepage positions the company as "AI Product Studio" with product/services nav. **Homepage content is out of scope** except the single nav addition below.
- Brand tokens are defined in `xencolabs-branding` skill / the Advisory Page Brief. Fonts: Inter. Colors: #0B1F3A, #1F3864, #E8A33D, #94A3B8, #3B5C8F.

## 3. THE CHANGE — PRESCRIBED

**Frontend admin (single repo, single PR):**

1. **Create route `/advisory`** implementing the eight sections of `XencoLabs_Advisory-Page-Brief.md` exactly — hero (with video embed), problem strip, four service tiers (NO prices except origination success-fee line), sample download, method, principals (BOTH bios), how-we-work, final CTA. Copy is final; do not rewrite it.
2. **Page chrome:** self-contained header — Advisory lockup top-left (`XencoLabs_Advisory-Lockup_White_transparent.png`), nav = "Sample Work" (anchor) + "Request Briefing" (amber button) ONLY. Minimal footer (wordmark, ©, Privacy, Terms). **Zero links to /products, /growth, /tools, pricing, or Upwork from this page.**
3. **Video embed:** hero embeds the unlisted overview video. URL: `[FINAL VIDEO URL — Xenophon supplies]`. Poster = platform thumbnail (already set to the populated-map frame). Lazy-load below-fold sections, not the hero.
4. **Sample download:** host and link `Xenco-Labs_Sample_Site-PreQualification_Benton-County-MO.pdf` — **the Benton County anonymized version, NOT the Warsaw/Greenlight original.** The anonymized version is the canonical public sample from today forward.
5. **Assets to deploy** (all delivered in outputs): advisory lockups (white+navy), wordmark PNGs, Benton County sample PDF, `XencoLabs_US-DataCenter-Density-Map_labeled.png` (optional problem-strip background at reduced opacity), OG image (use the labeled map or lockup-on-navy at 1200×630).
6. **CTA behavior:** "Request an Executive Briefing" → `[mailto:xen@xencolabs.com?subject=Executive%20Briefing%20Request` OR existing contact form — Xenophon decides, see Open Questions]`.
7. **Meta:** title `Data Center Site Intelligence & Network Feasibility | Xenco Labs Advisory`; description per the design brief; page indexable (no noindex).
8. **Homepage nav (the ONLY homepage touch):** add nav item `Advisory` → `/advisory` in the shared header component.
9. **Responsive pass:** hero, tier cards, and bios must hold at 390px width — executives open email links on phones.

## 4. SEQUENCING

1. Build `/advisory` on a preview deployment → Xenophon reviews against the design brief.
2. Merge + production deploy → verify live.
3. Only then add the homepage nav item (a nav link to a 404 must never exist, even for minutes).

## 5. DEFINITION OF DONE (walk the checklist)

- [ ] `https://xencolabs.com/advisory` returns 200 in production, all 8 sections present, copy verbatim from the design brief
- [ ] Video plays in hero; correct poster frame
- [ ] Sample PDF downloads; file is the Benton County version (open it — zero "Warsaw"/"Greenlight" occurrences)
- [ ] Both principals' bios render with the AboveNet→Zayo lineage line
- [ ] Zero anchors on the page resolve to product/pricing/Upwork destinations (crawl the rendered page)
- [ ] Homepage shows "Advisory" nav item routing to /advisory
- [ ] Lighthouse mobile: page usable at 390px, no layout breaks in hero/tiers/bios
- [ ] OG tags render correctly in a link-preview checker
- [ ] Orphaned draft page (if it existed) is removed/unpublished

## 6. HARD RULES

- **No pricing numbers on the page** except the origination success-fee sentence. Tier prices live in sales documents only.
- **No urgency mechanics** — no countdowns, popups, scarcity banners, chat widgets. Trust register only.
- **Do not touch any other homepage content, copy, or the Upwork link** — Part 2 umbrella work is a separate future task, explicitly not this PR.
- **Do not restyle brand tokens** — colors/fonts exactly per the branding skill; wordmark never recolored or letterspaced.
- **No new dependencies** for the video embed (native iframe/embed, no player library).

## 7. OPEN QUESTIONS (answer before code)

1. Ground truth block (Section 1) — repo, framework, hosting, nav component path, asset convention. **Xenophon.**
2. Orphaned draft page — exists? where? **Xenophon.**
3. Final video URL for the embed. **Xenophon** (post-upload).
4. Briefing CTA: mailto vs. existing contact form (if a form exists, does it notify both principals?). **Xenophon.**
5. Analytics: is there an existing analytics setup on the site to inherit, and should video-play fire an event? If nothing exists, page-level analytics suffice for launch — do not add a new analytics stack in this PR.
