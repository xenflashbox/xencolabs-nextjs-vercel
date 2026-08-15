# FE Admin — Blog Layout Shell + Block Polish (Xenco Labs now; BlogCraft + all fleet frontends as they onboard)

**From:** Xen · **Date:** 2026-08-15
**Applies to:** www.xencolabs.com blog (immediately — your block rendering is
otherwise approved), blogcraft.app blog (build it this way from day one), and
every fleet frontend following `frontend-admin-blog-blocks-setup-v2-20260814.md`.

Your block rendering on "Best Practices for Deploying AI Web Apps" is the fleet
reference — callouts, takeaways, pull-quote, comparison table, FAQ accordion all
correct. Three items remain: the layout shell (the big one) and two small fixes.

---

## 1. Blog layout shell (required — not just a max-width)

The article must NEVER expand to the full available viewport width. Build the
article page as a proper blog scaffold, even if parts start empty:

**Desktop (≥1024px):**
```
| ← margin | ARTICLE COLUMN (65-75ch / ~720-780px) | RAIL (~300-340px) | margin → |
```
- **Article column**: centered-left content column, max-width ~720–780px
  (65–75ch). All article content — headings, paragraphs, blocks — lives here.
  Wide blocks (`comparison-table`, `table`, large images) may extend modestly
  beyond the text column ("breakout" width) but never to the viewport edge.
- **Rail (sidebar)**: a real layout region beside the article, present in the
  grid even when sparsely populated. It exists so we can add, per site, without
  layout surgery: info boxes, ad slots, search bar, recent posts, category
  browser, newsletter signup, ToC ("On this page"). Start it with whatever the
  site already has (ToC and/or recent posts are good defaults); the structure is
  the deliverable.
- Implement as a CSS grid (`article + aside`) inside a centered max-width page
  container (~1200–1280px) — NOT as an afterthought margin on the article.

**Mobile / tablet (<1024px):**
- Single column: the rail's essential widgets (search, categories, recent posts)
  stack BELOW the article or into existing mobile nav — never squeezed beside it.
- The article column takes full width minus comfortable gutters (16–20px).
- Wide blocks scroll horizontally inside their own container; the page itself
  never scrolls sideways.

**Acceptance:** at 1440px and 1920px the text column stays ~720–780px with the
rail beside it; at 390px everything stacks cleanly, no horizontal page scroll,
comparison tables scroll within themselves.

## 2. FAQ block: suppress the duplicate heading

Your test article shows "Frequently Asked Questions" (H2) immediately followed by
the FAQ block's own internal "Frequently asked questions" title. Pipeline-published
articles will NOT include the H2 (the converter consumes it), so make the FAQ
block's internal title the single source of truth — and for hand-authored docs,
don't add an H2 above a faq block. If the component's title is configurable,
prefer title-cased "Frequently Asked Questions".

## 3. Comparison-table variant: header contrast bug

In your second table ("Managed API" vs the other approaches — the transposed
variant), the non-first header cells render dark text on a dark cell: the header
row is nearly invisible. Check the CSS variable mapping for that table's header
cells (likely `--surface-elevated`/`--text-headline` or the table-header token) —
every header cell must meet contrast in both color schemes.

---

## Report back

1. Screenshots of the reference article at 1920px, 1440px, and 390px showing the
   column + rail (desktop) and clean stacking (mobile).
2. Confirmation of the FAQ heading rule and the fixed table header.
3. BlogCraft admin: confirm the blog is being built on this scaffold from the
   start (same report format when your first article renders).
