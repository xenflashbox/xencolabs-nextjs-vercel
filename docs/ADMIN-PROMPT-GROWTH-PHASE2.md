# ADMIN PROMPT — Xenco Labs Site: Growth Page Updates (Phase 2)

## Context

The `/growth` page is live. This update adds three things:
1. The Yellow Pages photo in the "internet is the new Yellow Pages" section
2. AI-produced brand video embeds (YouTube) in the case study section
3. A new Clerk-gated Pitch Showcase section where visitors can watch the full narrated pitch presentations after authenticating

The Clerk gate serves two purposes: it keeps the pitches semi-private (not fully public, not indexable), and it captures email addresses for the newsletter list. Anyone who authenticates to watch a pitch is a high-intent lead.

## Task 0: Image Optimization

A new image `yellowpages-2007.png` has been placed in `/public/images/growth/`. Convert it to WebP using Sharp (same process as the previous batch):

```bash
node -e "
const sharp = require('sharp');
sharp('public/images/growth/yellowpages-2007.png')
  .webp({ quality: 82 })
  .toFile('public/images/growth/yellowpages-2007.webp')
  .then(() => console.log('✅ Converted'))
  .catch(e => console.error('❌', e));
"
```

Delete the source PNG after conversion.

---

## Task 1: Update Section 3 — Yellow Pages Photo

The current Section 3 ("The internet is the new Yellow Pages") is a single centered column of text. Convert it to a two-column layout with the Yellow Pages photo on the left.

```tsx
// Replace the current single-column centered layout with:
// grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center
// max-w-6xl mx-auto (wider than current to accommodate two columns)

// LEFT COLUMN (lg:w-auto)
<div>
  <Image
    src="/images/growth/yellowpages-2007.webp"
    alt="Yellow Pages phone book from 2007 showing full-page and half-page ads"
    width={600}
    height={450}
    className="rounded-xl shadow-lg w-full"
  />
  <p className="text-xs text-text-tertiary italic mt-3 text-center">
    Yellow Pages, 2007. Full-page ads, half-page ads, quarter-page ads — 
    the original search engine optimization.
  </p>
</div>

// RIGHT COLUMN — move ALL existing text here (headline, paragraphs, pull quote)
// Keep all existing copy and styling exactly as-is
// Just move it from centered single-column to the right side of the grid

// On mobile (below lg breakpoint): image stacks on top, text below
// On desktop: side by side, vertically centered (items-center on the grid)
```

---

## Task 2: Add Video Embeds to Case Study Section

Add a new subsection at the bottom of the Case Study section (Section 5), after the deliverables list and the nexusguard.dev link, but before the "What You Get" section (Section 6).

```tsx
// Insert this block after the existing case study content
// Add visual separation: mt-16 pt-16 border-t border-gray-200 (or equivalent)

// Label
<p className="[same label style as other sections — uppercase, text-sm, tracking-widest, accent color]">
  AI-PRODUCED BRAND VIDEOS
</p>

// Headline
<h3 className="text-2xl lg:text-3xl font-bold mt-4">
  60-second brand videos. Zero production crew. $0 cost.
</h3>

// Subheadline
<p className="text-text-secondary text-lg mt-4 max-w-2xl">
  Every engagement includes custom video content — AI-generated with 
  voice synthesis and motion, tailored to your industry and embedded 
  directly on your site.
</p>

// Two YouTube embeds side by side
// grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10

// Video 1 — NexusGuard
<div>
  <div className="rounded-xl overflow-hidden shadow-lg aspect-video">
    <iframe
      src="https://www.youtube.com/embed/nsk2QV7zh2s"
      title="Your Network Is Under Attack — AI Brand Video for Nexusguard"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full h-full"
    />
  </div>
  <div className="mt-3">
    <p className="font-semibold text-sm">Your Network Is Under Attack</p>
    <p className="text-sm text-text-tertiary">
      Produced for Nexusguard — cybersecurity / DDoS mitigation
    </p>
  </div>
</div>

// Video 2 — AER Worldwide
<div>
  <div className="rounded-xl overflow-hidden shadow-lg aspect-video">
    <iframe
      src="https://www.youtube.com/embed/gRn403c5A6U"
      title="The Call Nobody Wants to Get — AI Brand Video for AER Worldwide"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full h-full"
    />
  </div>
  <div className="mt-3">
    <p className="font-semibold text-sm">The Call Nobody Wants to Get</p>
    <p className="text-sm text-text-tertiary">
      Produced for AER Worldwide — IT asset disposition / data security
    </p>
  </div>
</div>

// Bottom callout
<p className="text-sm text-text-tertiary italic text-center max-w-2xl mx-auto mt-8">
  Two different industries. Two different stories. Same production pipeline. 
  These videos feature AI-generated versions of each company's actual executives 
  — produced at zero cost with no film crew, no studio, no actors.
</p>
```

---

## Task 3: Pitch Showcase Section (Clerk-Gated)

This is a NEW section. Insert it between the current "Why Xenco Labs" section (the differentiators) and the Audit Form section. This showcases the three live narrated pitch presentations behind a Clerk authentication gate.

### 3A: Create the section on `/growth`

```tsx
// New section
// Background: white, py-24
// id="pitch-showcase" (for potential anchor links)

// Label
"SEE IT IN ACTION"

// Headline
"Watch a live pitch presentation."

// Subheadline — max-w-2xl mx-auto text-center
"These are real strategy presentations we built for real companies. 
Each one includes a narrated walkthrough, before-and-after comparisons, 
and a live demo site reveal. Sign in to watch."

// Three pitch cards
// grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto

// Each card structure:
// - Thumbnail image (screenshot of pitch slide 1 — the title slide)
// - Company name and industry tag
// - Brief description
// - "Watch Pitch →" button (gated)
```

**Card 1 — NexusGuard:**
```
Thumbnail: /images/growth/pitch-thumb-nexusguard.webp (see Task 3B)
Tag: "CYBERSECURITY"
Title: "Nexusguard — Content Strategy & Conversion Optimization"
Description: "15-slide narrated presentation for a $200M+ DDoS mitigation company. 
Covers homepage messaging, conversion funnels, A/B testing, blog strategy, 
AI chatbot comparison, and brand video."
Duration: "~8 min"
Button: "Watch Pitch →"
URL: https://www.nexusguard.dev/pitch?token=nexusguard2026
```

**Card 2 — C&M Creative Solutions:**
```
Thumbnail: /images/growth/pitch-thumb-cmcreative.webp (see Task 3B)
Tag: "PROMOTIONAL PRODUCTS"
Title: "C&M Creative — Growth Strategy & Partnership"
Description: "14-slide narrated presentation for a Sonoma County promotional products company. 
Covers market opportunity, competitive analysis, product catalog strategy, 
content plan, and revenue-share partnership."
Duration: "~7 min"
Button: "Watch Pitch →"
URL: https://cmcreativesolutions.xencolabs.com/pitch?token=cmcreative2026
```

**Card 3 — AER Worldwide:**
```
Thumbnail: /images/growth/pitch-thumb-aer.webp (see Task 3B)
Tag: "IT ASSET DISPOSITION"
Title: "AER Worldwide — Digital Growth & Market Expansion"
Description: "Narrated presentation for a $48M global ITAD company with 30 years 
in the industry. Covers digital presence optimization, inbound lead strategy, 
and AI-produced executive brand video."
Duration: "~8 min"
Button: "Watch Pitch →"
URL: https://aer-worldwide.com/pitch?token=aerworldwide2026
```

### 3C: Clerk Gate Implementation

The "Watch Pitch →" buttons must require Clerk authentication before redirecting to the pitch URL. Here's how to implement:

```tsx
// The button click handler — NOT a simple <a> tag

"use client";
import { useAuth, useUser, SignInButton } from "@clerk/nextjs";

function PitchCard({ title, description, tag, duration, thumbnail, pitchUrl }: PitchCardProps) {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const handleWatchPitch = () => {
    if (!isSignedIn) {
      // Clerk's SignInButton will handle this — see below
      return;
    }
    // User is authenticated — open pitch in new tab
    // The token is baked into the URL so they go straight into the presentation
    window.open(pitchUrl, '_blank');
  };

  return (
    <div className="border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Thumbnail */}
      <div className="aspect-video relative overflow-hidden">
        <Image src={thumbnail} alt={title} fill className="object-cover" />
        <div className="absolute top-3 left-3">
          <span className="text-xs font-semibold uppercase tracking-wide bg-white/90 
            text-text-primary px-2 py-1 rounded">
            {tag}
          </span>
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="text-xs bg-black/70 text-white px-2 py-1 rounded">
            {duration}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-text-secondary mt-2">{description}</p>
        
        <div className="mt-6">
          {isSignedIn ? (
            <button
              onClick={handleWatchPitch}
              className="w-full [primary button styles] py-3 rounded-lg font-semibold"
            >
              Watch Pitch →
            </button>
          ) : (
            <SignInButton mode="modal" forceRedirectUrl={null}>
              <button className="w-full [primary button styles] py-3 rounded-lg font-semibold">
                Sign in to Watch →
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </div>
  );
}
```

**IMPORTANT implementation notes:**

1. Use `SignInButton` with `mode="modal"` so the user doesn't leave the `/growth` page. They get the Clerk modal (Google, email, etc.), authenticate, modal closes, and the button state updates to "Watch Pitch →" — they click again and the pitch opens in a new tab.

2. The pitch URLs include the token as a query parameter (`?token=...`) so the user goes straight into the narrated presentation without hitting a separate gate screen on the pitch site. The authentication is on the Xenco Labs side (Clerk), not on the pitch site side.

3. After authentication, Clerk captures their email. That email is now in the Clerk user list and can be exported for the newsletter. No additional email capture logic needed — Clerk handles it.

4. Make sure `/growth` is in the Clerk public routes (it should already be from the previous deploy). The page itself is public — only the pitch buttons are gated.

5. The `PitchCard` component needs to be a client component (`"use client"`) because it uses Clerk hooks. If the rest of the `/growth` page is a server component, extract this into a separate `PitchShowcase.tsx` client component and import it.

### 3D: Below the cards, add a subtle note:

```tsx
<p className="text-sm text-text-tertiary text-center mt-8 max-w-xl mx-auto">
  These presentations include narrated audio. 
  Each pitch was custom-built for the featured company 
  as part of a Digital Growth Strategy engagement.
</p>
```

---

## Task 3B: Pitch Thumbnail Images

We need three thumbnail images for the pitch cards. These are screenshots of each pitch's title slide (slide 1).

**Option A (preferred):** If the source images already exist in the project:
- Use the existing `nexusguardpitch015.png` (the NexusGuard title slide) — this is the slide showing "Content Strategy & Conversion Optimization — A proposal for Nexusguard" with the Pause/Skip controls
- Use the existing `cmcreativepitch01.png` (the CM Creative title slide) — "Growth Strategy for C&M Creative Solutions"
- For AER, ask for a screenshot of the AER pitch title slide

Convert each to WebP, resize to 800x450 (16:9), and save as:
```
/public/images/growth/pitch-thumb-nexusguard.webp
/public/images/growth/pitch-thumb-cmcreative.webp
/public/images/growth/pitch-thumb-aer.webp
```

**Option B (if source images aren't available):** Create simple placeholder thumbnails — dark background (#0f1729), centered white text with the company name and "Content Strategy & Conversion Optimization" subtitle. These can be replaced later with real screenshots.

Use Sharp to resize and convert:
```javascript
import sharp from 'sharp';
await sharp('source.png')
  .resize(800, 450, { fit: 'cover' })
  .webp({ quality: 82 })
  .toFile('public/images/growth/pitch-thumb-nexusguard.webp');
```

---

## Task 4: Middleware Update

Ensure `/growth` remains in the Clerk public routes. The page is public — only the pitch buttons trigger the Clerk modal for authentication. No route-level protection on `/growth`.

Verify that the Clerk middleware is NOT blocking unauthenticated access to `/growth`. The page must render fully for anonymous visitors — the Clerk gate is only on the button click, not on the page load.

---

## Task 5: Deploy

Deploy all changes as a single commit:
```
feat(growth): add Yellow Pages photo, video embeds, Clerk-gated pitch showcase
```

Run standard deploy and health check.

## Post-Deploy Verification

- [ ] Section 3 now shows Yellow Pages photo on left, text on right (desktop)
- [ ] Section 3 stacks correctly on mobile (image on top, text below)
- [ ] Yellow Pages image loads as WebP, no source PNG in repo
- [ ] Two YouTube videos display in case study section with correct aspect ratio
- [ ] Videos play when clicked (not autoplaying)
- [ ] Video captions show correct titles and company names
- [ ] Pitch Showcase section displays three cards with thumbnails
- [ ] "Sign in to Watch →" button appears for unauthenticated visitors
- [ ] Clicking "Sign in to Watch →" opens Clerk modal (not a page redirect)
- [ ] After signing in, button changes to "Watch Pitch →"
- [ ] Clicking "Watch Pitch →" opens pitch URL in new tab with token in query param
- [ ] All three pitch URLs load correctly with their tokens
- [ ] Clerk captures email address of authenticated user
- [ ] /growth page still loads fully for anonymous visitors (no redirect)
- [ ] Mobile responsive at 375px and 768px
- [ ] No console errors
