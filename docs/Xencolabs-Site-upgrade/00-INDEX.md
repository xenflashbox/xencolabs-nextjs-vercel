# Xenco Labs + BlogCraft — Implementation Spec Package

## Document Index

| # | Document | Scope | Priority |
|---|----------|-------|----------|
| 01 | `01-DESIGN-SYSTEM.md` | Shared color palette, typography, component patterns, Quillie usage rules | Foundation — implement first |
| 02 | `02-BLOGCRAFT-HOMEPAGE.md` | BlogCraft.app public marketing homepage — complete redesign | HIGH — Week 1–2 |
| 03 | `03-XENCOLABS-HOMEPAGE.md` | XencoLabs.com repositioned homepage | HIGH — Week 1–2 |
| 04 | `04-QUILLIE-INTEGRATION.md` | Quillie mascot poses, component code, integration map | MEDIUM — Week 2–3 |
| 05 | `05-BLOGCRAFT-MANAGED-PAGE.md` | BlogCraft.app/managed — managed services landing page | HIGH — Week 1–2 |
| 06 | `06-DASHBOARD-COLOR-MIGRATION.md` | Dashboard accent color: pink → Quillie purple | MEDIUM — Week 2–3 |

---

## Implementation Order

### Phase 1: Immediate Cleanup (Day 1)

**Do this before anything else.**

On **blogcraft.app:**
- Remove all fake testimonials (Sarah Chen, Marcus Johnson, Emily Rodriguez, David Park, Lisa Thompson, Alex Kumar)
- Remove all fake metrics (2,500+ customers, 50K+ content, 2.5K+ users, 4.9/5 rating)
- Remove non-existent integration logos (Stripe, GA, Make.com, Zapier, Ahrefs)
- Remove SOC 2 / Enterprise Security claims
- Remove all links to non-existent pages (/integrations, /api-docs, /help, /community, /templates, /docs)
- Replace current pricing with: "Pricing coming soon. [Contact us for managed services →]"
- Remove "Watch Demo" button
- Remove "Start Free Trial" from nav (replace with "Sign In" + "Get Started")

On **xencolabs.com:**
- Remove "2,400+ Smart Businesses" 
- Remove "Replace $180K Teams" messaging
- Remove all fear-based copy (competitors, failure rates)
- Remove fake metrics on BlogCraft sub-page (800+ Writers, 50K+ Articles, 300% Traffic)
- Remove pricing for unfinished products
- Remove "Watch Demo" / "Download Toolkit" buttons that go nowhere

**This cleanup can be done in a single deployment. It's the most important thing to do first.**

### Phase 2: New Sites Build (Weeks 1–2)

Build in parallel:
1. **BlogCraft.app homepage** per `02-BLOGCRAFT-HOMEPAGE.md`
2. **BlogCraft.app/managed** per `05-BLOGCRAFT-MANAGED-PAGE.md`
3. **XencoLabs.com homepage** per `03-XENCOLABS-HOMEPAGE.md`

All three share the design system from `01-DESIGN-SYSTEM.md`.

### Phase 3: Brand Polish (Weeks 2–3)

1. **Dashboard color migration** per `06-DASHBOARD-COLOR-MIGRATION.md`
2. **Quillie integration** per `04-QUILLIE-INTEGRATION.md` — start with empty states and loading states, then expand to onboarding and marketing pages
3. **Quillie image optimization** — remove black backgrounds, generate WebP, create responsive variants

---

## Font Installation

Add to `<head>` or import in layout.tsx:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

Tailwind config:

```js
fontFamily: {
  display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
  body: ['"DM Sans"', 'system-ui', 'sans-serif'],
  mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
},
```

---

## Key Decisions Made

| Decision | Rationale |
|----------|-----------|
| Mascot name is "Quillie" (not "Owly") | "Quillie" from "quill" — unique, ownable, on-brand. "Owly" is generic and used by Hootsuite. |
| Light theme for marketing, dark for dashboard | Marketing sites need trust/credibility for B2B buyers. Dark theme is correct for power-tool dashboard. |
| Quillie on self-serve only, never managed services | B2B buyers at $5K–15K/mo expect professional presentation, not mascots. |
| Purple accent replaces hot pink | Quillie's lavender → brand purple creates cohesion. Purple reads as more sophisticated than pink. |
| No free plan | Real API costs per operation. Offer one-time trial (1 free article or audit) instead. |
| Modular pricing (à la carte + bundles) | Shows value of each capability. Lowers entry barrier. Matches 2026 hybrid pricing trends. |
| Two-track GTM (managed + self-serve) | Managed = immediate revenue. Self-serve = scalable SaaS. Different buyers, different timelines. |
| Xenco Labs = product studio parent brand | Connects Upwork credibility → product portfolio → managed services. Stops being a scare-tactic sales funnel. |
| All fake data removed, replaced with real portfolio proof | WineCountryCorner and ResumeCoach are live, verifiable proof points. More credible than any fabricated testimonial. |

---

## Assets Required

| Asset | Source | Action Needed |
|-------|--------|---------------|
| Quillie poses (8 variants) | Uploaded PNGs | Remove backgrounds, optimize to WebP, create responsive sizes |
| Dashboard screenshots | Uploaded PNGs | Crop, frame in dark mockup for marketing pages |
| WineCountryCorner screenshot | Capture from live site | For portfolio/results section |
| ResumeCoach blog screenshot | Capture from live site | For portfolio/results section |
| Founder headshot (optional) | From Xenophon | For Xenco Labs "Built by a Builder" section |
| Plus Jakarta Sans font | Google Fonts | Install via CDN |
| DM Sans font | Google Fonts | Install via CDN |
| JetBrains Mono font | Google Fonts | Install via CDN |
