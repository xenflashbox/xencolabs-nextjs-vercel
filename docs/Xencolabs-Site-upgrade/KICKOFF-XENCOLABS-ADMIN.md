# KICKOFF PROMPT — Xenco Labs Homepage Admin

You are implementing a complete repositioning and redesign of the xencolabs.com homepage. This is a real production deployment for a live company site that serves as the parent brand for multiple AI-powered products.

## Context

Xenco Labs is a founder-led AI product studio based in Pleasanton, CA. Founded by a technology executive with 20+ years in enterprise tech (AboveNet, NexusGuard, Black Lotus), the company has designed, built, and launched 10+ production web applications since 2023. The founder is also active on Upwork as a freelance AI app developer — Upwork prospects frequently click through to xencolabs.com to evaluate credibility.

The current xencolabs.com site uses fear-based messaging ("Stop Losing to Companies With Better AI", "Replace $180K Teams for $3K/month"), fabricated metrics ("2,400+ Smart Businesses"), and shows pricing for products that aren't ready for purchase. This undermines credibility with every audience that visits: Upwork prospects, managed services buyers, and potential partners.

The site needs to be repositioned as a professional product studio — confident, direct, and authentic. Lead with working products, real data, and the founder's genuine credibility.

## Live Products in the Xenco Labs Portfolio

These are real, deployed, and should be featured prominently:
- **BlogCraft** (blogcraft.app) — AI content engine, end-to-end pipeline, powering 6+ niche sites
- **ResumeCoach** (resumecoach.me) — AI resume optimization with O*NET data, live with paying customers
- **ImageCrafter** (imagecrafter.app) — Multi-provider AI image generation
- **Sonoma Grove Suites** (sonomagrovesites.com) — Vacation rental booking platform with Lodgify API

These are in development and should be shown as such (muted, clearly labeled):
- **MCP Forge** (mcpforge.org) — API to MCP server builder
- **PromptMarketer** (promptmarketer.app) — Marketing AI toolkit

These should NOT appear on the site (not ready):
- LandingCraft
- LaunchCraft

## Your Spec Files

You have been provided with these implementation specifications:

1. **00-INDEX.md** — Master overview, implementation phases, key decisions
2. **01-DESIGN-SYSTEM.md** — Shared color palette, typography, component patterns (THIS IS THE FOUNDATION — read first)
3. **03-XENCOLABS-HOMEPAGE.md** — Complete homepage redesign spec with section-by-section copy, layout, and design notes

The design system in 01 is shared across all Xenco Labs properties. Use it as the foundation for all color, typography, and component decisions.

## Execution Order

### Phase 1: Immediate Cleanup (Do First)

Strip the current site of everything fake or misleading. Deploy this cleanup immediately — do not wait for the redesign.

Remove from the current site:
- "2,400+ Smart Businesses" metric
- "Replace $180K Teams for $3K/month" messaging
- "Your competitors are using AI. Are you?" fear banner
- "$15K+/month you're spending on marketing teams" scare copy
- "73% failure rate" stat
- "Results in 7 Days, Not 7 Months" claim
- "Join 2,400+ businesses already using Xenco Labs" CTA
- All "Replaces: X Team ($Xk/mo)" framing on every product card
- PromptMarketer pricing ($99-499/mo self-service, $3,500/mo managed) — product not ready for sale
- LandingCraft — remove or mark clearly as "Coming Soon" with no pricing
- LaunchCraft — remove entirely
- "Watch 2-Min Demo" button (unless a real demo video exists)
- "Download AI Business Toolkit Guide" (unless guide actually exists)
- "Schedule Demo" button (unless Calendly or booking flow is live)
- Fake pricing on the BlogCraft sub-page at /apps/blogcraft (800+ Active Writers, 50K+ Articles, 300% Traffic Increase, $49/$149/Custom tiers)

Replace the hero with something simple and honest while the redesign is built:
"Xenco Labs builds AI-powered products. Explore our apps → | Contact us →"

Deploy this cleanup as its own commit before proceeding.

### Phase 2: New Homepage Build

Build the full redesigned homepage per **03-XENCOLABS-HOMEPAGE.md**:

1. **Navigation** — Clean top bar with Apps | Services | About | Blog | Contact
2. **Hero** — Product studio positioning, honest founder narrative, no fake metrics
3. **Product Portfolio** — 2x2 grid of live products with status indicators + smaller row for in-dev products
4. **Services Section** — Two-column split: Self-Serve Apps vs. Managed Services
5. **Founder Section** — "Built by a Builder" editorial section connecting 20-year enterprise background to the product portfolio, with links to Upwork and GitHub
6. **Tech Stack Strip** — Subtle logo row (Next.js, React, TypeScript, Python, PostgreSQL, Docker, etc.)
7. **CTA Section** — "Let's Build Something" with dual CTAs
8. **Footer** — Apps links (to actual product domains), Services links, Connect links (Upwork, GitHub, LinkedIn)

## Design Specifications

From **01-DESIGN-SYSTEM.md**:

**Theme:** Light mode
**Fonts:** Plus Jakarta Sans (headlines), DM Sans (body), JetBrains Mono (metrics/technical)
**Primary color:** #7B6BA6 (Quillie purple — used for accents and highlights)
**CTA color:** #8B5CF6 (vibrant purple for buttons)
**Navy:** #1B2A4A (dark sections, footer, headings)
**Surfaces:** White (#FFFFFF) primary, #F9F8FC secondary, #F3F0F8 tertiary

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

**NO mascot (Quillie) on this site.** Quillie is the BlogCraft product mascot. Xenco Labs is the corporate parent brand and should feel professional and founder-led, not character-driven.

## Technical Stack

- Next.js + React + TypeScript
- Tailwind CSS + shadcn/ui
- Light theme throughout
- All product links should open to the actual product domains (blogcraft.app, resumecoach.me, etc.)
- Target 90+ Lighthouse performance score

## Critical Rules

1. No mock data. No placeholder metrics. Every claim must be verifiable.
2. No fear-based messaging. The tone is confident and direct, not salesy.
3. Live products get full cards with status, description, and link. In-dev products get muted treatment with clear labeling.
4. Never show pricing for products that aren't ready to sell.
5. Never claim a number of customers or users unless it's real.
6. The "Built by a Builder" section is important — it connects the Upwork freelance profile credibility to the product studio. Include links to Upwork and GitHub.
7. If a page doesn't exist (e.g., /blog, /consulting), either build a simple placeholder or don't link to it. Dead links destroy trust.

## Coordination with BlogCraft Admin

The BlogCraft admin is simultaneously building:
- The blogcraft.app marketing homepage redesign
- The blogcraft.app/managed landing page
- Dashboard color migration and Quillie integration

Both sites share the same design system (01-DESIGN-SYSTEM.md). Ensure visual consistency — same fonts, same color tokens, same component patterns. The "by Xenco Labs" badge on BlogCraft should link to xencolabs.com. The managed services link on Xenco Labs should route to blogcraft.app/managed.

## Begin

Start by reading 00-INDEX.md, 01-DESIGN-SYSTEM.md, and 03-XENCOLABS-HOMEPAGE.md in order. Execute Phase 1 cleanup immediately. Then build the new homepage.
