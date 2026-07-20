# BayTech Pitch — Staging Instructions

**For:** Xenophon
**Goal:** Get the BayTech assessment live at `baytech.xencolabs.com` using the same pitch pattern as `aer-worldwide.com/pitch`.

---

## What this is

Not a custom build. The admin clones the existing `client-site-template`, drops in a new `site_config.ts` for BayTech, and uploads the audio and slide images to the standard `public/client/audio/` and `public/client/pitch/` folders. Same renderer as AER. Same access gate. Same HMAC magic-link system. Same auto-play with manual override.

---

## Your three jobs

### Job 1 — Rename the audio files

Your 10 ElevenLabs MP3s need to be named:

```
slide-01.mp3
slide-02.mp3
slide-03.mp3
slide-04.mp3
slide-05.mp3
slide-06.mp3
slide-07.mp3
slide-08.mp3
slide-09.mp3
slide-10.mp3
```

**Zero-padded is critical** (`slide-01` not `slide-1`). If they're already named something else, rename now.

Drop them into `baytech-assets/audio/` in your outputs folder.

### Job 2 — Add the Cloudflare CNAME

In Cloudflare, on the `xencolabs.com` zone:

- Record type: **CNAME**
- Name: **baytech**
- Target: **cname.vercel-dns.com**
- Proxy status: **DNS only** (grey cloud, not orange) — Vercel handles SSL and the orange proxy interferes

Takes 30 seconds.

### Job 3 — Hand the admin the bundle + the prompt

Zip `baytech-assets/` and send the admin:

1. **The zip** — `baytech-assets.zip`
2. **The admin prompt** — `ADMIN-baytech-pitch-deployment.md` from your outputs

Tell them: "Clone the template, write the config, deploy to `baytech.xencolabs.com`. Same pattern as AER."

They'll know what you mean.

---

## What's in the asset bundle

```
baytech-assets/
├── BayTech-Strategic-Assessment.pdf      (admin puts this at /public/client/assessment.pdf — served from the pitch page as a download link if the template supports it)
├── BayTech-Assessment-Summary.pptx       (reference only — NOT served publicly)
├── og-image.png                          (becomes /public/client/pitch/og-pitch.png for social sharing)
├── audio/
│   └── slide-01.mp3 ... slide-10.mp3     (goes into /public/client/audio/)
└── slides/
    └── slide-01.png ... slide-10.png     (reference images — the template renderer builds the actual slides from the config; these just give the admin a visual reference for how each slide should look)
```

**Important about the slide PNGs:** They're not the shipping artifact. The template's pitch renderer builds each slide from the config (title, subtitle, body, features, etc.) using its own visual language. The PNGs are for the admin to verify "does the rendered slide roughly match what we designed?" If a slide looks dramatically different, we adjust the config.

This is the right approach because every Xenco pitch uses the same visual language — AER, Nexusguard, BayTech all look like they come from the same firm. Don't try to force pixel-perfect match to the PowerPoint.

---

## After the admin confirms deploy

The admin will hand you back:

- Confirmation `https://baytech.xencolabs.com/pitch` works with code `baytech2026`
- Any config adjustments they had to make (especially slide 5, which uses the `comparison` layout and may need tweaking)

Then you generate the magic link for Abhiraj:

```bash
npx tsx scripts/generate-access-token.ts abhiraj-tangri pitch 60
```

Same script you used for Andre's AER link. Outputs a URL like `https://baytech.xencolabs.com/pitch?k=eyJ...` — paste that into the follow-up email after the BayTech call.

---

## One open question for the admin

The prompt points the "Schedule the working session" CTA at a `mailto:xen@xencolabs.com` fallback because I don't know your current scheduling tool. If you want to replace that with a Cal.com or Calendly link, tell the admin when you hand off. Otherwise the mailto ships and works fine.

---

## What the admin will NOT build

- No homepage build-out (BayTech doesn't get a full site — just the pitch route)
- No blog
- No chatbot
- No quiz
- No proposal route
- No custom pages

This is a single-purpose pitch deployment. Same as how AER started before we built out their full site.
