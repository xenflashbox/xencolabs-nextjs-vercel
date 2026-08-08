# Brief: stop bot submissions reaching Mautic funnels

**From:** Mautic admin
**Date:** 2026-08-08
**For:** frontend / site admins (xencolabs advisory site, compareitad.com, resumecoach HR intake)
**Status:** action required before CompareITAD goes live

---

## 1. What happened

Two bot submissions hit the XL advisory form (2026-08-06 and 2026-08-07). Both created real Mautic contacts, both entered campaign 13, both fired a notify webhook to Laurie, and one escalated to Xen when nobody marked it handled. A second escalation was scheduled to hit Xen's inbox on 2026-08-10; I cancelled it manually.

The payloads:

| field | contact 4943 | contact 4946 |
|---|---|---|
| firstname | `duIfRBgeHusBImQQnUU` | `WkRRfgRpFlCeqRrutbWQoF` |
| company | `Xdzauexnf LLC` | `Vkzijo LLC` |
| email | `o.j.aw.uf.e.k.600@gmail.com` | `l.i.zobu.w.a.fu.q33@gmail.com` |
| lastname / phone / message | NULL | NULL |
| IP recorded | none | none |
| page hits before submit | none | none |

Note the email shape. Gmail ignores dots in the local part, so `o.j.aw.uf.e.k.600@gmail.com` and `ojawufek600@gmail.com` are **the same mailbox**. Dot-insertion gives one bot an unlimited supply of addresses that look unique to any naive dedupe. This is the single most useful thing to know about the attack.

**The strongest signal is the last two rows: no IP, no page views.** A human loads the page, then submits. These arrived as bare API calls with no prior session.

---

## 2. Why I cannot fix this from Mautic

These forms are **not Mautic-hosted**. The site collects the submission and calls `POST /api/contacts/new` over OAuth. By the time Mautic sees it, it is a fully-formed, authenticated, valid contact. There is nothing left to reject — Mautic's job at that point is to do exactly what it was told.

**Protection has to live at the site, in front of the API call.** That is the whole reason this brief is addressed to you and not handled internally.

---

## 3. Exposed surfaces — all of them

| surface | transport | OAuth client | state |
|---|---|---|---|
| XL advisory (xencolabs) | site form → Mautic API | 5 `xencolabs-site-advisory-2026` | **live, already being hit** |
| CompareITAD vendor-connect | site form → Mautic API | 6 `compareitad-site-funnels-2026` | wired, **pre-launch** |
| CompareITAD affiliate | site form → Mautic API | 6 | wired, **pre-launch** |
| CompareITAD launch-notify | site form → Mautic API | 6 | wired, **pre-launch** |
| ResumeCoach signup | BFF → Mautic API | 1 `resumecoach` | live (auth'd via Clerk — lower risk) |
| HR Conference Intake (Mautic form 3) | Mautic-hosted | n/a | live, publicly POST-able |
| HR Track C LinkedIn intake (Mautic form 4) | Mautic-hosted | n/a | live, publicly POST-able |

Forms 3 and 4 are **my** problem, not yours — I'll harden those separately. Everything above them is yours.

**CompareITAD is the priority.** It is wired but has taken no live traffic since acceptance testing on 2026-07-28. Fixing it now costs nothing. Fixing it after launch means triaging junk out of Laurie's inbox while she is trying to work real vendor leads.

---

## 4. What to implement

Layered, in priority order. Layers 1–3 are cheap and safe. Layer 4 needs care.

### Layer 1 — Cloudflare Turnstile (highest yield, lowest effort)

Every one of these domains is already behind Cloudflare. Turnstile is free, invisible in managed mode, and stops essentially all of this class of bot. Add the widget to each form, verify the token **server-side** in the API route before calling Mautic.

Non-negotiable detail: verify the token on the server. A client-side-only check is trivially bypassed by posting straight to your API route — which is exactly what these bots are already doing.

### Layer 2 — honeypot field

A field a human never sees and never fills. Hide with CSS (`position:absolute;left:-9999px`), not `type="hidden"` — bots read `hidden` and skip it, but they happily fill a visible-in-DOM text input.

Give it a plausible name (`company_url`, `fax`). If it arrives non-empty, drop the submission silently — return the normal success response so the bot does not learn it failed.

### Layer 3 — time-to-submit floor

Stamp a signed timestamp when the form renders. Reject if submitted in under ~3 seconds. Humans do not fill a form that fast; bots almost always do.

Sign the timestamp (HMAC) or a bot will just backdate it.

### Layer 4 — gmail dot-normalisation for rate limiting

For **rate-limiting and dedupe only**, normalise gmail addresses: strip dots and anything after `+` in the local part. `o.j.aw.uf.e.k.600@gmail.com` → `ojawufek600@gmail.com`.

This collapses the bot's infinite address space to one identity, which makes a per-identity rate limit actually work. Store the original address as the contact email — send to what the user typed, dedupe on the normalised form.

### What NOT to do

**Do not reject on name/company "randomness" heuristics.** It is tempting — `Xdzauexnf LLC` is obviously fake to a human. But the error costs are wildly asymmetric: a false negative lets one bot through and wastes a notify email, while a false positive silently rejects a real advisory lead, which is the entire point of the funnel. Real people have names your regex will not expect.

If you want content heuristics, use them to **flag for quarantine**, never to reject. Layers 1–3 are deterministic and safe; layer 4 is a lookup. Those are enough.

---

## 5. The cross-system contract — new field `form_verified`

So that this is verifiable from the Mautic side rather than taken on faith, I want a signal on the contact itself.

I will create a Mautic boolean field with alias **`form_verified`**.

**Your side:** on every contact you create via `POST /api/contacts/new`, include `form_verified: 1` **only when** the submission passed Turnstile + honeypot + timing (or, for ResumeCoach, came from an authenticated Clerk session). Omit it or send `0` otherwise.

**My side:** once I can see the field arriving on live traffic, I add `form_verified = 1` as a filter on segments 21 (xl-advisory), 22 (ci-vendor-connect), 23 (ci-launch-notify) and 24 (ci-affiliate). Unverified contacts still get stored — they just never enter a campaign, so they never generate a webhook to a human.

That gives us defence in depth: if a new form ships without protection, or a layer regresses, the blast radius is a row in the database instead of an email to Laurie.

### Deploy order — this matters, do not invert it

Segments 21–24 feed campaigns that notify humans. If I gate them before you are writing the field, **every legitimate lead stops entering its funnel** and nobody gets notified. So:

1. **You ship first.** Turnstile + honeypot + timing, and start sending `form_verified: 1`.
2. **Tell me.** I confirm the field is arriving populated on real submissions.
3. **Then I gate** the segments.
4. Only after a clean week do we consider anything stricter.

Do not skip step 2. I need to see it on live traffic, not a test payload.

---

## 6. Acceptance criteria

- [ ] Turnstile token verified **server-side** on all four site forms (XL advisory, CI vendor-connect, CI affiliate, CI launch-notify)
- [ ] Honeypot present on all four, CSS-hidden, silent drop on fill
- [ ] Signed timestamp with a ~3s floor on all four
- [ ] Gmail-normalised rate limit, ≥1 submission per normalised identity per hour
- [ ] Posting directly to the API route with a valid-looking body and **no** Turnstile token is rejected — test this explicitly, it is the exact bypass being used today
- [ ] `form_verified: 1` present on contacts created from a real browser submission
- [ ] A real submission through the browser still completes end-to-end and lands in the right segment

Ping me when 1–3 are live on CompareITAD and I will run a live submission per form and confirm routing before launch.

---

## 7. Housekeeping — unrelated but worth flagging

OAuth clients **1 (`resumecoach`)** and **2 (`compareITAD`)** are `role_id 1` — **full admin**. Clients 3, 5 and 6 are correctly `role_id 2` (API only). Client 2 has never issued a token and its provenance is unknown; I have deliberately not deleted it.

Least privilege says clients 1 and 2 should be API-only too. That is a change with real blast radius on client 1 (it is the live ResumeCoach path, currently broken for unrelated reasons — see `mautic-to-fe-syncfail-followup-20260808.md`), so I am not touching either without a decision from Xen. Raising it here so it is on the record.

— Mautic admin
