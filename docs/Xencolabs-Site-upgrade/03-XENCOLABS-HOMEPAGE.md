# XencoLabs.com — Repositioned Homepage Implementation Spec

## Overview

Xenco Labs is the parent brand — a founder-led product studio that builds AI-powered tools. The site must feel professional, credible, and founder-authentic. It connects your Upwork developer profile to your product portfolio to your managed services offering. Every visitor (Upwork prospects, managed services buyers, potential partners) should leave with the impression: "This is a serious builder with working products."

**Theme:** Light mode from design system (01-DESIGN-SYSTEM.md)  
**Framework:** Next.js + Tailwind + shadcn/ui (existing stack)  
**Fonts:** Plus Jakarta Sans (display), DM Sans (body), JetBrains Mono (metrics)  
**Mascot:** NO Quillie anywhere on this site. This is the corporate parent brand.  

---

## Page Structure (Top to Bottom)

### 1. Navigation Bar

```
Left:  "X" mark + "Xenco Labs" wordmark (Plus Jakarta Sans 700)
Center: Apps | Services | About | Blog
Right: "Contact" (text link) | "Get Started" (primary CTA → routes to app selector)
```

---

### 2. Hero Section

**Background:** White with very subtle grid pattern or dot matrix at 3% opacity. Clean, editorial feel.

```
[LABEL — uppercase, small, brand-primary color]
AI PRODUCT STUDIO • PLEASANTON, CA

[HEADLINE — 3.5rem, 800 weight, dark text]
We Build AI-Powered Products
That Ship to Production

[SUBHEADLINE — 1.25rem, regular weight, secondary text color]
Xenco Labs is a product studio founded on one principle:
build real tools, test them on our own businesses, then
offer them to everyone else. No prototypes. No demos.
Finished products with paying customers.

[CTA ROW]
[ Explore Our Apps → ]    [ Managed Services ]
(primary purple btn)      (secondary outline btn)

[TRUST STRIP — subtle, text-only]
Founded by a 20-year technology executive • UCSD • Building since 2023
```

**NO FAKE METRICS.** No "2,400+ businesses." No "Replace $180K teams." Just the honest positioning.

---

### 3. Product Portfolio

**Section headline:** "What We've Built"  
**Section subheadline:** "Live products generating revenue and serving real users."  
**Background:** Surface-secondary (#F9F8FC)

```
LAYOUT: 2x2 grid of product cards (live products)
        + 1 row below for "In Development" products

┌──────────────────────────────┐  ┌──────────────────────────────┐
│  [BlogCraft icon]            │  │  [ResumeCoach icon]          │
│                              │  │                              │
│  BlogCraft                   │  │  ResumeCoach                 │
│  AI Content Engine           │  │  AI Resume Optimization      │
│                              │  │                              │
│  End-to-end content pipeline │  │  ATS-optimized resumes using │
│  from niche research to      │  │  government O*NET data.      │
│  auto-publishing. Powers 6+  │  │  Live with paying customers. │
│  niche sites.                │  │                              │
│                              │  │  STATUS: ● Live              │
│  STATUS: ● Live              │  │  resumecoach.me              │
│  blogcraft.app               │  │                              │
│                              │  │  [ Visit App → ]             │
│  [ Visit App → ]             │  │                              │
└──────────────────────────────┘  └──────────────────────────────┘

┌──────────────────────────────┐  ┌──────────────────────────────┐
│  ImageCrafter                │  │  Sonoma Grove Suites         │
│  AI Image Generation         │  │  Vacation Rental Platform    │
│                              │  │                              │
│  Multi-provider image gen    │  │  Direct booking with Lodgify │
│  with OpenAI, Google Gemini, │  │  API, multi-channel          │
│  Stability AI.               │  │  distribution.               │
│                              │  │                              │
│  STATUS: ● Live              │  │  STATUS: ● Live              │
│  imagecrafter.app            │  │  sonomagrovesites.com        │
│                              │  │                              │
│  [ Visit App → ]             │  │  [ Visit App → ]             │
└──────────────────────────────┘  └──────────────────────────────┘

[IN DEVELOPMENT — lighter treatment, muted colors]

┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  MCP Forge       │  │  PromptMarketer  │  │  LandingCraft    │
│  API → MCP       │  │  40+ Marketing   │  │  AI Landing      │
│  Server Builder  │  │  AI Tools        │  │  Pages           │
│  ○ In Dev        │  │  ○ In Dev        │  │  ○ In Dev        │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

**Status indicators:**
- ● Green dot = Live (clickable, links to app)
- ○ Gray dot = In Development (not clickable)

**Design notes:** Live product cards should be full-featured with description, status, and CTA. In-development products are smaller, muted, clearly labeled as upcoming. Do NOT show pricing for in-dev products. Do NOT show fake metrics for any product.

---

### 4. Services Section

**Section headline:** "Self-Serve or Managed. Your Choice."  
**Background:** White

```
LAYOUT: Two-column split

┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  SELF-SERVE APPS                  │  MANAGED SERVICES            │
│                                   │                              │
│  Use our tools directly.          │  We do the work for you.     │
│  Sign up, configure, and run      │  Strategic planning,         │
│  your own workflows.              │  execution, optimization,    │
│                                   │  and reporting — powered     │
│  Starting at $29/mo               │  by our AI tools with        │
│                                   │  human oversight.            │
│  Best for:                        │                              │
│  • Solo creators                  │  Starting at $3,500/mo       │
│  • Small teams                    │                              │
│  • Technical users who want       │  Best for:                   │
│    control                        │  • Mid-market companies      │
│                                   │  • Agencies                  │
│  [ Explore Apps → ]               │  • Teams without in-house    │
│                                   │    content ops               │
│                                   │                              │
│                                   │  [ Schedule a Call → ]       │
│                                   │                              │
└──────────────────────────────────────────────────────────────────┘
```

---

### 5. Founder Section

**Section headline:** "Built by a Builder"  
**Background:** Surface-secondary

This is the section that connects your Upwork credibility to the Xenco Labs brand.

```
LAYOUT:

[Professional headshot or avatar — if available]
[Or just text-based, no image required]

Xenco Labs was founded by a technology executive with 20+ years
in enterprise tech — leading sales and engineering teams at
companies like AboveNet, NexusGuard, and Black Lotus (acquired
by Level 3). After two decades of building for other companies,
the mission became clear: build your own.

Since 2023, Xenco Labs has designed, built, and launched 10+
production web applications. Every product in our portfolio is
built with the same stack we use daily — Next.js, React,
TypeScript, Node.js, Python, PostgreSQL, Supabase, Docker — and
runs on our own infrastructure.

We don't build prototypes. We don't ship demos. We build
production AI applications with paying customers.

[Link] View our work on Upwork →  (links to Upwork profile)
[Link] View on GitHub →           (links to GitHub)
```

**Design:** This should feel editorial — clean typography, generous whitespace, no flashy graphics. The strength is in the words and the real credentials. A subtle quote/pull-quote treatment for "We don't build prototypes. We don't ship demos." could work well.

---

### 6. Tech Stack (Optional — useful for Upwork visitors)

```
A simple, subtle horizontal strip showing the tech logos:
Next.js | React | TypeScript | Node.js | Python | PostgreSQL |
Supabase | Docker | Tailwind CSS | Stripe | OpenAI | Anthropic

Keep it muted — small logos, gray-tinted, no hover effects.
This is for credibility, not spectacle.
```

---

### 7. CTA Section

**Background:** brand-navy gradient

```
[Headline — white]
"Let's Build Something"

[Subheadline — light text]
"Whether you need a self-serve AI tool or a fully managed
service, we have the platform and the team."

[Two CTAs]
[ Explore Our Apps → ]    [ Schedule a Consultation → ]
(solid white btn)         (outline white btn)
```

---

### 8. Footer

```
Column 1: Xenco Labs logo + tagline
          "Building AI-powered tools that scale businesses
          without scaling teams."

Column 2: Apps
          - BlogCraft (→ blogcraft.app)
          - ResumeCoach (→ resumecoach.me)
          - ImageCrafter (→ imagecrafter.app)
          - MCP Forge (→ mcpforge.org) — "Coming Soon" label

Column 3: Services
          - Managed Content (→ blogcraft.app/managed)
          - Consulting
          - Contact

Column 4: Connect
          - Upwork (→ profile link)
          - GitHub (→ profile link)
          - LinkedIn (→ profile link)

Bottom: © 2026 Xenco Labs. All rights reserved.
        Privacy | Terms
```

---

## Items to REMOVE from Current Site

1. ❌ "2,400+ Smart Businesses" metric
2. ❌ "Replace $180K Teams for $3K/month" messaging
3. ❌ "Your competitors are using AI. Are you?" fear-based banner
4. ❌ "$15K+/month you're spending" scare tactic
5. ❌ "73% failure rate" stat
6. ❌ "Results in 7 Days, Not 7 Months" unverifiable claim
7. ❌ "Join 2,400+ businesses already using Xenco Labs" CTA
8. ❌ PromptMarketer "Replaces: Marketing Team ($12K/mo)" — product not ready
9. ❌ LandingCraft "Replaces: Web Design Team ($6K/mo)" — product not ready
10. ❌ LaunchCraft — product not ready, remove entirely
11. ❌ "Watch 2-Min Demo" button (unless demo exists)
12. ❌ "Download AI Business Toolkit Guide" (unless guide exists)
13. ❌ All "Replaces: X Team ($Xk/mo)" framing
14. ❌ Fake pricing on BlogCraft sub-page ($49/$149/Custom tiers, "800+ Active Writers", "50K+ Articles Generated", "300% Average Traffic Increase")

---

## Messaging Rules for All Xenco Labs Pages

1. Never claim a specific number of customers/users unless verifiable
2. Never use "replace your team" or "replace departments" language
3. Never show pricing for products that aren't ready for purchase
4. Always mark in-development products clearly as such
5. Lead with what's real: working products, real sites, real data
6. The tone is confident and direct, not salesy or fear-based
7. "Built by Xenco Labs" should appear on all product sites as a trust badge
