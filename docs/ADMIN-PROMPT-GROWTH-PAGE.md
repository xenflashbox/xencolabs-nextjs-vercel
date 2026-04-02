# ADMIN PROMPT — Xenco Labs Site: Digital Growth Strategy Page

## Context

Xenco Labs has a new productized service offering called "Digital Growth Strategy." This is our highest-value service — we research a prospect's digital presence, build them a live demo site showing what their online presence should look like, run them through an automated narrated pitch presentation, and then execute the full strategy (content, SEO, conversion optimization, ongoing operations). Active engagements are in the $10K-$20K/month range for enterprise clients and revenue-share partnerships for SMBs.

We need a new landing page at `/growth` that sells this offering, plus minor updates to the homepage and navigation.

## Task 0: Image Optimization (Do This First)

Source PNG files have been placed in `/public/images/growth/`:
```
nexusguard-before-homepage.png
nexusguard-after-homepage.png
nexusguard-before-form.png
nexusguard-after-form.png
nexusguard-before-blog.png
nexusguard-after-blog.png
cmcreative-site.png
cmcreative-products.png
```

Convert all 8 PNGs to optimized WebP using Sharp. Install Sharp if it's not already a dependency:

```bash
npm install sharp --save-dev
```

Create and run a one-time conversion script at `scripts/convert-growth-images.mjs`:

```javascript
import sharp from 'sharp';
import { readdir } from 'fs/promises';
import path from 'path';

const dir = 'public/images/growth';
const files = await readdir(dir);
const pngs = files.filter(f => f.endsWith('.png'));

for (const file of pngs) {
  const input = path.join(dir, file);
  const output = path.join(dir, file.replace('.png', '.webp'));
  await sharp(input)
    .webp({ quality: 82 })
    .toFile(output);
  console.log(`✅ ${file} → ${file.replace('.png', '.webp')}`);
}

console.log(`\nConverted ${pngs.length} files. Delete the source PNGs if desired.`);
```

Run it:
```bash
node scripts/convert-growth-images.mjs
```

After conversion, verify all 8 WebP files exist and are under 200KB each. If any exceed 200KB, re-run with `quality: 72`. Then delete the source PNGs from `/public/images/growth/` — they should not ship to production. Delete the conversion script too — it's a one-time utility.

If for any reason Sharp is unavailable or the conversion fails, use the PNGs directly — update all image `src` references in the page to use `.png` instead of `.webp`. Working page with PNGs is better than blocked on conversion. But attempt WebP first.

## Prerequisites

After image conversion, confirm before building the page:
1. All 8 WebP files exist in `/public/images/growth/`. If any are missing, create placeholder `<div>` blocks at 1200x675 with a gray background and centered text label describing what goes there — do NOT use stock images or placeholder services.
2. Transactional email service is configured. Check for `RESEND_API_KEY` in environment variables. If present, install and use the `resend` package. If not present, check for `SENDGRID_API_KEY` or any other email service. If NO email service is configured, log a warning and still store form submissions in the database — but add a prominent `// TODO: Email notification not configured — submissions are database-only` comment in the API route so we know to fix it.

## Task 1: Create `/growth` page

Create `src/app/growth/page.tsx` — a new marketing page using the existing light theme, shared Navigation and Footer components, and the existing design system (Plus Jakarta Sans display, DM Sans body). This page must match the visual quality of the current homepage.

NO Quillie mascot anywhere on this page.

### Section 1 — Hero

```tsx
// Full-width section, white background, generous padding (py-32 lg:py-40)
// Centered text layout, max-w-3xl

Label: "DIGITAL GROWTH STRATEGY BY XENCO LABS"
  — uppercase, text-sm, tracking-widest, brand accent color (use the site's existing accent)

Headline: "Your website speaks to people who already trust you."
  — Plus Jakarta Sans, font-bold, text-5xl lg:text-6xl, text-text-primary
  — "who already trust you." should NOT be a different color — keep it all one color

Subheadline: "We build the digital presence that converts everyone else — the prospects searching, comparing, and deciding right now without ever talking to your sales team."
  — DM Sans, text-lg, text-text-secondary, max-w-2xl mx-auto

Primary CTA: "Get a Free Growth Audit →"
  — Primary button style (same as existing site CTAs)
  — onClick scrolls smoothly to #audit-form

Secondary text: "No pitch. No obligation. We analyze your site, your competitors, and your search visibility — then show you the gaps."
  — text-sm, text-text-tertiary/muted
```

### Section 2 — The Problem

```tsx
// Light gray background (bg-gray-50 or equivalent), py-24

Label: "THE REALITY" — same style as hero label
Headline: "Most B2B websites are brochures, not sales tools."
  — text-3xl lg:text-4xl, font-bold

// Three columns (grid grid-cols-1 md:grid-cols-3 gap-8)
// Each card: white bg, subtle border (border border-[var(--border-default)]), rounded-xl, p-8

Card 1:
  Title: "Your forms ask for too much"
  Body: "8+ fields before a visitor can talk to you. Every field you add drops conversion by 4-6%. Your competitors have three."

Card 2:
  Title: "One path for every visitor"
  Body: "Enterprise buyers and channel partners land on the same page, see the same CTA, get the same pitch. Neither feels understood."

Card 3:
  Title: "Your content speaks to you, not them"
  Body: "Editorial blog titles that sound great internally but don't rank for the searches your buyers are actually making."
```

### Section 3 — The Reframe (Philosophy)

```tsx
// White background, py-24, centered, editorial feel
// Max-width container for text: max-w-2xl mx-auto

Headline: "The internet is the new Yellow Pages."
  — text-3xl lg:text-4xl, font-bold, mb-8

Body paragraphs (text-lg, text-text-secondary, leading-relaxed, space-y-6):

"Thirty years ago, when someone needed a plumber, they opened the phone book. They'd already self-filtered — they knew what they needed. The businesses with the best listings got the calls."

"Today, the workflow is identical. Your buyers are searching right now — for your product, your niche, your solution. They're comparing options. They're reading content. They're deciding who to contact."

"The question isn't whether to be online. It's whether you're the listing they find — or the one they skip."

// Pull quote — styled with a thick left border (4px) in brand accent color
// bg-gray-50 or subtle background, p-6, rounded-r-lg, mt-12
// italic, text-xl, font-medium

"You don't need a thousand leads. You need a hundred good ones — pre-qualified, self-directed, receptive to your message — and a close ratio that reflects it."
```

### Section 4 — The Methodology

```tsx
// White or very light background, py-24

Label: "HOW WE WORK"
Headline: "We don't start with a proposal. We start with proof."
  — text-3xl lg:text-4xl, font-bold

// Four steps in a horizontal flow on desktop (grid grid-cols-1 md:grid-cols-4 gap-8)
// Each step: numbered circle (w-10 h-10, rounded-full, bg-accent, text-white, font-bold)
// Connected by a subtle horizontal line between steps on desktop (use a border-top on the container or pseudo-elements)

Step 1 — Research
  "We analyze your current digital presence, your competitors, your search landscape, and where your buyers are going instead of coming to you."

Step 2 — Build
  "We create a working demo of what your digital presence should look like — new messaging, conversion-optimized pages, content strategy, lead capture redesign. This isn't a mockup. It's a live, deployed site."

Step 3 — Present
  "We walk your team through a guided strategy presentation showing the before-and-after, the competitive gaps, and the specific improvements — with the live demo site ready to explore."

Step 4 — Execute
  "Content strategy, SEO optimization, conversion funnels, A/B testing, AI-generated assets, and ongoing operations — powered by our proprietary content engine and delivered with monthly KPI reporting."

// Full-width callout bar below steps
// Dark background (bg-gray-900 or brand-navy), text-white, py-6 px-8, rounded-xl, text-center
// text-lg, font-medium

"The demo site is live before the first meeting. You see exactly what changes before you spend a dollar."
```

### Section 5 — Case Study (Before/After Proof)

```tsx
// Light gray background, py-24

Label: "CASE STUDY"
Headline: "What this looks like in practice."

// --- COMPARISON 1: Homepage ---
// Two columns side by side (grid grid-cols-1 lg:grid-cols-2 gap-8)
// Each side: screenshot in a browser mockup frame (rounded-xl, shadow-lg, overflow-hidden, border)
// Red "BEFORE" badge on left, Green "AFTER" badge on right
// Use next/image for all screenshots, object-cover or object-contain as appropriate

Left:
  Badge: "BEFORE" (bg-red-500/10 text-red-600 px-3 py-1 rounded-full text-xs font-semibold)
  Image: /images/growth/nexusguard-before-homepage.webp
  Caption: "Feature-first messaging. Award badge hero. 8+ field contact form. One CTA path for all visitors."

Right:
  Badge: "AFTER" (bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-xs font-semibold)
  Image: /images/growth/nexusguard-after-homepage.webp
  Caption: "Pain-point headline. Specific metrics. A/B tested CTAs. 3-question risk assessment funnel that pre-qualifies leads with intent data."

// --- COMPARISON 2: Forms ---
// Same two-column layout

Left:
  Badge: "BEFORE"
  Image: /images/growth/nexusguard-before-form.webp
  Caption: "8+ fields: name, company, title, email, phone, industry, country, message."

Right:
  Badge: "AFTER"
  Image: /images/growth/nexusguard-after-form.webp
  Caption: "3-question quiz → risk score → 3 fields: name, email, company. Captures intent data the old form never asked."

// --- COMPARISON 3: Blog/Content ---
// Same two-column layout

Left:
  Badge: "BEFORE"
  Image: /images/growth/nexusguard-before-blog.webp
  Caption: "Editorial titles, no category tags, shared hero style."

Right:
  Badge: "AFTER"
  Image: /images/growth/nexusguard-after-blog.webp
  Caption: "Keyword-rich titles targeting buyer searches. Category tags. AI-generated hero images."

// --- What was delivered ---
// Below the comparisons, a clean summary section
// Subtitle: "What we delivered:"
// Use a two-column text grid (not bullet points — use arrow → prefix and clean text rows)

Deliverables:
  → Complete demo site with conversion-optimized messaging
  → A/B testing framework with GA4 tracking per variant
  → Self-assessment quiz funnel replacing the 8-field form
  → SEO-driven blog content targeting buyer search queries
  → AI sales assistant trained on product-specific knowledge
  → AI-generated 60-second brand video ($0 production cost)
  → Revenue calculator for channel partner pages
  → Narrated strategy presentation with token-gated access

// Link to live demo
"→ See the live demo at nexusguard.dev" — link styled as text link with arrow, opens in new tab

// Disclaimer — text-xs, text-text-tertiary, mt-4
"Demo site built by Xenco Labs as a strategy demonstration. Not an official Nexusguard property."
```

### Section 6 — What's Included

```tsx
// White background, py-24

Label: "WHAT YOU GET"
Headline: "Strategy, execution, and accountability."

// Four columns (grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8)
// Each column: clean card style matching existing site cards

Column 1: STRATEGY
  — subtitle in accent color, font-semibold, text-sm, uppercase, tracking-wide
  Items (text-sm, text-text-secondary, space-y-2):
    Competitive landscape analysis
    Search visibility audit
    Buyer persona mapping
    Content gap identification
    Conversion funnel redesign

Column 2: PRODUCTION
  Items:
    Demo site — live, deployed, yours to review
    Narrated strategy presentation
    AI-generated video and imagery
    Blog content targeting buyer searches
    Landing page and form optimization

Column 3: TECHNOLOGY
  Items:
    A/B testing with GA4 tracking
    AI assistant trained on your product
    Self-assessment and quiz funnels
    Lead capture with intent scoring
    CRM-ready lead notifications

Column 4: ACCOUNTABILITY
  Items:
    Monthly KPI reporting
    Search ranking tracking
    Conversion rate optimization
    Content performance reviews
    Strategy adjustment based on data
```

### Section 7 — Who This Is For

```tsx
// Light gray background, py-24

Headline: "Built for companies with strong products and underperforming digital presence."
  — text-3xl lg:text-4xl, font-bold, text-center, max-w-3xl mx-auto

// Two cards side by side (grid grid-cols-1 lg:grid-cols-2 gap-8, max-w-5xl mx-auto)

Card 1: ENTERPRISE
  — white bg, border, rounded-xl, p-8
  — Optional: subtle accent border-top (2px solid accent)

  Label: "ENTERPRISE" — text-sm, font-semibold, accent color, uppercase
  Body: "Companies doing $20M+ that need to modernize how they generate and qualify leads online."

  "Typical engagement:"
    $10,000 – $20,000/month retainer
    3-month minimum commitment
    Full strategy, production, and reporting
    Dedicated account management

  "Industries we've worked with:"
    Cybersecurity · IT Asset Management · SaaS · Manufacturing

  CTA: "Schedule a Consultation →" — primary button, links to /contact

Card 2: GROWTH PARTNERSHIP
  — white bg, border, rounded-xl, p-8

  Label: "GROWTH PARTNERSHIP" — text-sm, font-semibold, accent color, uppercase
  Body: "Small businesses with great products that need a digital presence built from scratch."

  "Typical engagement:"
    $0 upfront cost
    Revenue share on web-generated leads
    We build and operate the digital infrastructure
    You focus on product and fulfillment

  "Best for:"
    Local businesses · Specialty manufacturers · Service providers

  CTA: "Learn About Partnerships →" — secondary/outline button, links to /contact
```

### Section 8 — Why Xenco Labs

```tsx
// White background, py-24

Headline: "This isn't a generic agency pitch."
  — text-3xl lg:text-4xl, font-bold

// Five items stacked vertically (max-w-3xl, space-y-8)
// Each item: thick left border (4px) in accent color, pl-6

Item 1:
  Title: "We built the tools." — font-semibold, text-lg
  Body: "BlogCraft, our proprietary content engine, powers every engagement. This isn't ChatGPT with a wrapper."

Item 2:
  Title: "We use them on ourselves."
  Body: "WineCountryCorner.com and ResumeCoach.me run on the same pipeline we deploy for clients."

Item 3:
  Title: "We know your industry."
  Body: "20+ years in enterprise tech — AboveNet, NexusGuard, Black Lotus (acquired by Level 3). We speak your language."

Item 4:
  Title: "AI is a tool, not a magic word."
  Body: "We use AI for production — content, video, imagery, automation. But strategy comes from experience, not algorithms."

Item 5:
  Title: "You see results before you commit."
  Body: "The demo site is live. The presentation is ready. You evaluate real work, not slide decks with promises."
```

### Section 9 — Audit Form

```tsx
// Dark background (bg-gray-900 or the brand navy used in existing CTA sections), py-24
// id="audit-form" — this is the scroll target from the hero CTA

Headline: "Get your free Digital Growth Audit." — text-white, text-3xl lg:text-4xl, font-bold
Subheadline: "We'll analyze your current website, your competitors, and your search visibility — then show you exactly where the opportunities are. No obligation. No pitch. Just data."
  — text-gray-300, text-lg, max-w-2xl mx-auto

// Form — max-w-xl mx-auto, mt-12
// Use React Hook Form + Zod validation (per Xenco production standards)
// All inputs: white bg, rounded-lg, proper label + input pairs

Fields:
  Company Name — text, required
  Website URL — url, required (validate starts with http:// or https://)
  Your Name — text, required
  Work Email — email, required
  Company Size — select dropdown, required
    Options: "Under $5M" / "$5M – $20M" / "$20M – $50M" / "$50M+" / "Rather not say"

Submit button: "Request My Audit →"
  — Full width, brand accent bg, white text, py-3, font-semibold
  — Loading state: show spinner, disable button, text "Submitting..."
  — Success state: replace form with "Thank you. We'll have your audit ready within 3-5 business days. Check your inbox for confirmation."
  — Error state: show error message above submit button, keep form populated

// Below form
"Or email us directly: xen@xencolabs.com" — text-gray-400, text-sm
"Typical audit turnaround: 3-5 business days" — text-gray-500, text-xs
```

### Section 10 — Footer

Use the existing shared Footer component. No changes to the component itself — the footer link update happens in the footer's data/config.

---

## Task 2: API Route for Audit Form

Create `src/app/api/growth-audit/route.ts`

```
POST /api/growth-audit

Request body (JSON):
{
  companyName: string (required)
  websiteUrl: string (required, valid URL)
  contactName: string (required)
  workEmail: string (required, valid email)
  companySize: string (required, one of the dropdown values)
}

Response:
  201 — { success: true, message: "Audit request received" }
  400 — { success: false, error: "Validation failed", details: [...] }
  500 — { success: false, error: "Internal server error" }
```

Implementation requirements:
1. Validate input with Zod schema
2. Store submission in database — create `growth_audit_requests` table:
   ```sql
   CREATE TABLE IF NOT EXISTS growth_audit_requests (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     company_name TEXT NOT NULL,
     website_url TEXT NOT NULL,
     contact_name TEXT NOT NULL,
     work_email TEXT NOT NULL,
     company_size TEXT NOT NULL,
     status TEXT NOT NULL DEFAULT 'new',
     created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
   );
   ```
3. Send email notification to xen@xencolabs.com with all form fields. Use Resend if `RESEND_API_KEY` is in env, otherwise check for other email services. If no email service is configured, log a clear warning but still save to database.
4. Return 201 on success.
5. No silent failures — log all errors explicitly per Xenco production standards.

---

## Task 3: Homepage Services Section Update

Find the existing "Self-Serve or Managed. Your Choice." section on the homepage.

Change the headline to: "Three ways to work with us."

Change from a two-column grid to a three-column grid (grid-cols-1 md:grid-cols-3).

Keep the existing two cards (Self-Serve Apps and Managed Services) and ADD a third card:

```
Card 3:
  Title: "Digital Growth Strategy"
  Description: "We retool your entire digital sales funnel."
  Price: "Starting at $10,000/mo"

  Items:
    • Mid-market and enterprise companies
    • Underperforming digital presence
    • Full strategy, demo site, and execution

  CTA: "See How It Works →" — links to /growth

  // Visual distinction: add a small badge "Most Impact" or "Featured"
  // at the top of this card, or give it a subtle accent border
  // to draw the eye without being aggressive
```

---

## Task 4: Navigation Update

Add "Growth" to the main navigation bar. Place it as a link:

```
Apps | Services | Growth | About | Blog
```

Route: `/growth`

If the nav uses a config array, add the entry there. If it's hardcoded, add the link in sequence.

---

## Task 5: Footer Update

Add "Growth Strategy" to the Services column in the footer, linking to `/growth`. Place it after the existing service links.

---

## Deployment

Deploy all changes together as a single commit. Suggested commit message:
```
feat(marketing): add Digital Growth Strategy page, update homepage services, update nav
```

Run the standard deploy script and health check.

## Post-Deploy Verification

After deployment, verify:
- [ ] /growth loads with all 10 sections rendering correctly
- [ ] Hero CTA smooth-scrolls to #audit-form
- [ ] Audit form submits successfully (test with a real submission)
- [ ] Email notification arrives at xen@xencolabs.com (if email service configured)
- [ ] Database has the submission in growth_audit_requests table
- [ ] All 8 screenshots display correctly as WebP (or PNG fallback if conversion wasn't possible)
- [ ] No source .png files remain in /public/images/growth/ (only .webp)
- [ ] scripts/convert-growth-images.mjs has been deleted
- [ ] Homepage shows three service cards
- [ ] "Digital Growth Strategy" card links to /growth
- [ ] Main nav includes "Growth" link
- [ ] Footer includes "Growth Strategy" link
- [ ] Mobile responsive — test at 375px and 768px widths
- [ ] No console errors
- [ ] Lighthouse performance score 90+
