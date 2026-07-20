# FOLLOW-UP PROMPT — Xenco Labs Homepage Admin

## Status: Redesign deployed and verified. Looking good.

The homepage redesign shipped correctly and matches the spec. The positioning, content, layout, and design system are all in place. Here are the items to verify and a few polish notes.

---

## Verification Checklist (Confirm These Work)

Test each of these in an incognito window and confirm they resolve to real, working pages:

| Link | Expected Destination | Status |
|------|---------------------|--------|
| "Explore Our Apps →" (hero CTA) | Scrolls to #products section | Verify |
| "Managed Services" (hero CTA) | Scrolls to #services section OR links to blogcraft.app/managed | Verify |
| BlogCraft "Visit App →" | blogcraft.app | Verify |
| ResumeCoach "Visit App →" | resumecoach.me | Verify |
| ImageCrafter "Visit App →" | imagecrafter.app | Verify |
| Sonoma Grove Suites "Visit App →" | sonomagrovesites.com | Verify |
| "Schedule a Call →" (managed services) | Contact form, Calendly, or email link | Verify |
| "View our work on Upwork →" | Upwork profile page | Verify |
| "View on GitHub →" | GitHub profile/org page | Verify |
| Footer: BlogCraft link | blogcraft.app | Verify |
| Footer: ResumeCoach link | resumecoach.me | Verify |
| Footer: Managed Content link | blogcraft.app/managed | Verify |
| Footer: Upwork/GitHub/LinkedIn | Correct external profiles | Verify |
| "Get Started →" (nav CTA) | Appropriate destination (app selector or sign-up) | Verify |
| "Contact" (nav) | Contact page or email | Verify |
| Apps (nav) | Scrolls to products or /apps route | Verify |
| Services (nav) | Scrolls to services or /services route | Verify |
| About (nav) | Scrolls to founder section or /about route | Verify |
| Blog (nav) | /blog page (should have content or "coming soon") | Verify |

**Any link that goes to a 404 or an empty page should be either fixed or removed.** Dead links undermine the credibility we just built. If /blog has no content yet, either add a "Coming Soon" placeholder or remove the nav link.

---

## Minor Polish Notes

These are not blockers but would improve the presentation:

1. **"Schedule a Call" CTA in the managed services section** — This should route to either a Calendly booking link or to blogcraft.app/managed (which has the audit form). If it currently goes to a contact form on xencolabs.com, that's fine too, but make sure the destination exists and works.

2. **Product card domain labels** — The screenshot shows "blogcraft.app", "resumecoach.me", etc. displayed as small text on each card. Verify these are clickable links, not just text labels.

3. **In Development products** — MCP Forge, PromptMarketer, and LandingCraft are shown correctly with gray "In Dev" badges. Make sure these cards are NOT clickable (no link to a product page that doesn't exist or shows old/fake content). If they link to sub-pages at /apps/mcpforge etc., those sub-pages should show a simple "Coming Soon" state, not old content with fake pricing.

4. **Meta tags** — Verify the page title is "Xenco Labs — AI Product Studio" (or similar) and the meta description matches the new positioning. Check that OpenGraph and Twitter card tags are set correctly for social sharing.

5. **Mobile responsiveness** — Test the page on mobile (or use Chrome DevTools responsive mode). The product grid should stack to single column, the services split should stack vertically, and the nav should collapse to a hamburger menu. The founder section's pull-quote should be readable on small screens.

---

## Coordination Note

The BlogCraft admin is working on fixing three remaining issues on blogcraft.app:
- Blog pages still using dark theme (being migrated to light)
- Navigation inconsistency across marketing pages (being unified)
- Homepage content verification at root URL

Once both sites are fully consistent, the cross-links between xencolabs.com and blogcraft.app will create a seamless experience for prospects navigating between the parent brand and the product.

---

## Assessment

The Xenco Labs redesign is a significant improvement. The site now accurately represents what the company is — a founder-led product studio with real, shipping products. The "Built by a Builder" section establishes authentic credibility. The product grid with live status indicators shows transparency. The honest copy without fabricated metrics builds trust. This is the right foundation for both Upwork prospect validation and managed services lead generation.

No further design or content changes needed. Just verify the links work and you're done.
