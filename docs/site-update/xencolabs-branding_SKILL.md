---
name: xencolabs-branding
description: The Xenco Labs corporate brand system — wordmark, colors, typography, voice, and usage rules for the parent brand and the Infrastructure Advisory practice. Load this skill for ANY work touching Xenco Labs corporate identity: documents, proposals, pitch decks, video production, ChatGPT image generation, website surfaces, email signatures, or social assets under the Xenco Labs name (as distinct from product brands like ResumeCoach, Compare ITAD, or BlogCraft, which have their own skills). Trigger whenever generating a Xenco Labs logo or wordmark, picking corporate colors, building an advisory deliverable, or writing prompts that render the Xenco Labs mark — the failure mode this prevents is the logo/color drift that occurs when each session re-derives the brand.
---

# Xenco Labs Brand System

Standardized July 2026. Before this date, usage drifted (mixed case, all-caps, letterspaced, monogram variants). This skill is the single source of truth; anything that contradicts it is legacy.

## The wordmark (master mark)

**"Xenco" in Inter Bold + "Labs" in Inter Regular. Mixed case. Single line. Single word-space gap (~0.26em).**

- The weight contrast IS the mark. Both words are always the same color.
- Never all-caps the wordmark. Never letterspace it. Never stack "Xenco" over "Labs."
- Never render the wordmark in two colors (no amber "Labs," no colored "X").
- Master asset files: `XencoLabs_Wordmark_White_transparent.png` (dark surfaces), `XencoLabs_Wordmark_Navy_transparent.png` (light surfaces).

## The X monogram (compact mark)

The infinity-X symbol survives ONLY as the compact mark: favicons, app icons, social avatars, spaces under ~48px where the wordmark can't breathe. It is never placed beside the wordmark in documents, decks, or video. Site header may pair them (legacy pattern, acceptable on web only).

## The Advisory lockup

For Infrastructure Advisory contexts (proposals, assessments, pitch video, advisory pages):

wordmark → thin divider (slate, ~42% of wordmark width, centered) → "INFRASTRUCTURE ADVISORY" in Inter Medium, all caps, tracked ~+14%, slate.

Asset files: `XencoLabs_Advisory-Lockup_White_transparent.png`, `XencoLabs_Advisory-Lockup_Navy_transparent.png`.

Document headers may use the inline form: **XENCO LABS** | Infrastructure Advisory — this is the ONE sanctioned all-caps context, only in running document headers, never as the standalone mark.

## Colors

| Role | Hex | Usage |
|---|---|---|
| Deep Navy (video/dark bg) | `#0B1F3A` | Video frames, dark surfaces, schematics |
| Document Navy | `#1F3864` | Headings, wordmark on light, tables |
| Amber (accent) | `#E8A33D` | Active/answer/motion accent ONLY — GO states, pulses, the solution side. Never body text, never the wordmark |
| Slate | `#94A3B8` | Secondary text, descriptors, dividers |
| Slate Blue | `#3B5C8F` | Line work, structure, table borders |
| Failure Red | `#8B3A3A` | Elimination/negative states, reduced opacity, sparingly |
| White | `#FFFFFF` | Primary text on dark |
| Light fill | `#D9E2F3` / `#F2F5FB` | Callout boxes / alternating table rows on light |

Color roles are assigned, not decorative: amber = the answer, slate = the commentary, navy = the ground. If amber is everywhere, it means nothing.

## Typography

- Everything is Inter. Headlines/numerals: Inter Bold. Body: Inter Regular. Descriptors/labels: Inter Medium, caps, tracked.
- Documents built in Word/docx may substitute Calibri (system constraint); web and video are always Inter.
- Big numerals are a brand behavior: lead with the number ("800", "40 YEARS", "$25,000") in Bold, label beneath in small tracked caps slate.

## Video / image-generation rules

- Video frames: Deep Navy `#0B1F3A` ground, 40–50% negative space, editorial documentary register (FT data visualization / Frontline lower-third).
- **Do NOT bake the logo into generated stills.** Generation drifts. Generate logo-free frames and overlay `XencoLabs_Video-Corner-Overlay_White.png` as a persistent layer in the edit (~4.2% of frame height, top-left, padding ≈ half the wordmark height).
- ChatGPT image prompts describe colors by hex and follow the 10-element structure in [[prompting-chatgpt-image-schematics]].
- On-screen text is baked into stills; animation passes (Kling) move camera and ambiance only — never redraw text.

## Voice

- Positioning line: **"Decisions, not data."** (Advisory contexts.)
- Register: measured, certain, briefing energy — the Frontline narrator, not the pitchman. Diagnosis before prescription.
- Signature claims (use verbatim): "Every deliverable ends in a decision, not a dataset." · "Tiered opportunity lists, not disqualification lists." · "AI-accelerated, experience-directed." · "Principal-led. No handoffs."
- Never criticize a client's internal team in writing; let the deliverable's contrast argue.

## Sub-brand boundary

Product brands (ResumeCoach, Compare ITAD, BlogCraft, Home Beauty Spa, etc.) have their own systems and skills — this skill governs only the Xenco Labs corporate/advisory surface. When a product asset needs a parent credit, use the wordmark small and neutral ("A Xenco Labs product" in Inter Regular slate); never restyle the wordmark to match the product palette.

## Known debts (update when resolved)

- xencolabs.com positions as "AI Product Studio"; the Infrastructure Advisory practice needs its own page (`/advisory`) so executive prospects land on advisory positioning, not consumer SaaS.
- Legacy assets (pre-July-2026 docs, FCT-era materials) carry non-standard marks; re-export on next touch, don't batch-fix.
