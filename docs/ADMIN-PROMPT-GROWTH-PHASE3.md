# ADMIN PROMPT — Xenco Labs Site: Growth Page Updates (Phase 3)

## Context

We're sharpening the `/growth` page for outbound sales. Two changes: tighten the hero language and restructure the pricing section to include a lower-commitment sprint entry point. These are copy and layout changes only — no new sections, no new components.

---

## Task 1: Update Hero Subheadline

On `/growth`, find the current hero subheadline:

```
"We build the digital presence that converts everyone else — the prospects 
searching, comparing, and deciding right now without ever talking to your sales team."
```

Replace with:

```
"We install an AI-powered growth system that converts everyone else — the prospects 
searching, comparing, and deciding right now without ever talking to your sales team."
```

One word change: "build the digital presence" → "install an AI-powered growth system." Keep all other hero content exactly as-is.

---

## Task 2: Restructure Pricing Section

The current "Who This Is For" section has two cards: Enterprise and Growth Partnership.

Replace it with **three** cards. Keep the section headline the same ("Built for companies with strong products and underperforming digital presence.").

Change the grid from `grid-cols-1 lg:grid-cols-2` to `grid-cols-1 md:grid-cols-3`.

### Card 1: GROWTH SPRINT (NEW — this is the entry point)

```
Label: "GROWTH SPRINT" — text-sm, font-semibold, accent color, uppercase
Badge: "Start Here" — small badge at the top of this card 
  (similar style to "Most Impact" badge on homepage, but use a different label)

Body: "A fixed-fee, 30-day implementation for companies that want 
to see results before committing to a retainer."

Subheader: "What you get in 30 days:"

Items:
  • Digital presence audit and competitive analysis
  • Messaging framework aligned to buyer pain
  • 1-3 conversion-optimized landing pages
  • Lead capture redesign or self-assessment funnel
  • 90-day content strategy and roadmap
  • KPI dashboard specification
  • Recorded walkthrough for your team

Price: "$12,500" — text-3xl font-bold
Price subtitle: "Fixed fee. No retainer required."

CTA: "Get a Free Growth Audit →" — primary button, scrolls to #audit-form
```

### Card 2: ENTERPRISE (existing, updated)

```
Label: "ENTERPRISE" — same style as before
No badge on this card.

Body: "Companies doing $20M+ that need ongoing growth operations —
strategy, execution, optimization, and reporting every month."

Subheader: "Everything in the Sprint, plus:"

Items:
  • Ongoing content production via BlogCraft
  • Monthly SEO and conversion optimization
  • Automated narrated pitch presentations
  • AI-generated brand video featuring your executives
  • Monthly KPI reporting and strategy adjustment
  • Dedicated account management

Price: "$10,000 – $20,000" — text-3xl font-bold
Price subtitle: "/month · 3-month minimum"

Industries: "Cybersecurity · IT Asset Management · SaaS · Manufacturing"
  — text-xs, text-text-tertiary, mt-4

CTA: "Schedule a Consultation →" — secondary/outline button, links to /contact
```

### Card 3: GROWTH PARTNERSHIP (existing, minor update)

```
Label: "GROWTH PARTNERSHIP" — same style as before
No badge.

Body: "Small businesses with great products that need a complete 
digital presence built from scratch — at zero upfront cost."

Subheader: "What we provide:"

Items:
  • Website design, hosting, and maintenance
  • Product catalog and lead capture system
  • Blog content creation and SEO optimization
  • AI-generated product imagery
  • Analytics and conversion tracking
  • Ongoing feature development

Price: "$0 upfront" — text-3xl font-bold
Price subtitle: "Revenue share on web-generated leads"

Best for: "Local businesses · Specialty manufacturers · Service providers"
  — text-xs, text-text-tertiary, mt-4

CTA: "Learn About Partnerships →" — secondary/outline button, links to /contact
```

### Design notes:

The "Growth Sprint" card should feel like the natural entry point. Give it the "Start Here" badge and the primary-styled CTA button (filled, not outline). The Enterprise and Partnership cards get outline/secondary buttons. This visual hierarchy nudges the outbound prospect toward the sprint — the lowest-commitment entry that converts to a retainer.

All three cards should have the same height. Use `flex flex-col` with `mt-auto` on the CTA to push buttons to the bottom.

---

## Task 3: Deploy

Single commit:
```
feat(growth): add Growth Sprint tier, sharpen hero language
```

Standard deploy and health check.

## Post-Deploy Verification

- [ ] Hero subheadline says "install an AI-powered growth system"
- [ ] Pricing section shows three cards (Sprint, Enterprise, Partnership)
- [ ] Growth Sprint card has "Start Here" badge
- [ ] Growth Sprint CTA scrolls to #audit-form
- [ ] Enterprise and Partnership CTAs link to /contact
- [ ] Three cards display evenly on desktop (equal height)
- [ ] Cards stack correctly on mobile
- [ ] No console errors
