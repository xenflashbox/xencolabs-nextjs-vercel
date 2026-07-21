# Brief — Duplicate the ResumeCoach → Mautic form pipeline for Xenco Labs pages

**Audience:** Xenco Labs frontend team + architects
**From:** Mautic admin
**Date:** 2026-07-21
**Ask:** wire the Xenco Labs advisory-meetings form (and future page forms) into the
existing Mautic marketing-automation stack — the same architecture ResumeCoach has
run in production for months.

---

## 1. The Vercel concern is already disproven in production

The objection "we're on Vercel, we can't connect to Mautic" is empirically false,
because **resumecoach.me is a Next.js app on Vercel and it talks to this exact
Mautic instance in production today**, across five live integrations:

| Live integration (RC repo `xenflashbox/resumecoach-last`) | File |
|---|---|
| HR outplacement form → Mautic contact create | `app/api/contact/hr/route.ts` |
| Agency inquiry form → Mautic contact create | `lib/mautic.ts` (`syncAgencyInquiryToMautic`) |
| Clerk signup webhook → Mautic contact upsert | `app/api/webhooks/clerk-mautic/` |
| Lifecycle events (score/generation) → Mautic field stamps | `app/api/webhooks/rc-lifecycle/route.ts` |
| Plan upgrades/downgrades + UTM recording → Mautic | `lib/mautic.ts` |

Why it works: Mautic is **publicly reachable at `https://mautic.xencolabs.com`**
(behind Cloudflare) with a standard **REST API + OAuth2 client_credentials**.
A Vercel serverless function making an outbound HTTPS `fetch` to a public API is
the single most ordinary thing Vercel does — there is no network barrier, no VPN,
no allowlist involved. If your function can call Stripe, it can call Mautic.

Verified E2E most recently 2026-07-16: a live submission on resumecoach.me/for-hr
created a Mautic contact, routed it by field value into a segment, and triggered a
drip campaign automatically.

## 2. The proven pattern (copy it, don't reinvent it)

```
Browser form (React client component)
   │  POST JSON
   ▼
Next.js API route on Vercel  (zod validation; optionally persist to your own DB)
   │  server-side fetch, OAuth2 Bearer token
   ▼
Mautic REST  POST /api/contacts/new   (one atomic call: identity + routing field)
   ▼
Mautic cron (every 60s): segment filter on the routing field → contact enters
segment → attached campaign starts the drip. Zero further code.
```

Two files to lift from the RC repo, nearly verbatim:

- **`lib/mautic-auth.ts` (~80 lines)** — the entire transport. OAuth2
  client_credentials against `https://mautic.xencolabs.com/oauth/v2/token`,
  module-scope token cache, exactly-one forced refresh + retry on 401. This is the
  single auth surface for every Mautic call.
- **One sync function (~40 lines)** — see `syncHrInquiryToMautic` in
  `lib/mautic.ts`: builds `{ email, firstname, lastname, company, <routing
  field> }`, POSTs `/api/contacts/new`, returns the contact id. Mautic dedupes by
  email on its side.

Env contract (4 vars in Vercel project settings — values come from the Mautic
admin, see §4):

```
MAUTIC_URL=https://mautic.xencolabs.com
MAUTIC_OAUTH_TOKEN_URL=https://mautic.xencolabs.com/oauth/v2/token
MAUTIC_OAUTH_CLIENT_ID=<new XL credential>
MAUTIC_OAUTH_CLIENT_SECRET=<new XL credential>
```

Design rules that made the RC integration robust — keep them:

- **Mautic sync is best-effort, never request-fatal.** Persist to your own DB (if
  you have one) and return success to the user first; a Mautic failure is logged
  loudly but doesn't 500 the form. (RC: `contact/hr/route.ts` lines ~279-299.)
- **One atomic contact create** carrying the routing field — don't create then
  patch (a cron tick between the two calls can route the contact before the field
  lands; this bit RC once).
- **Server-side only.** The client never sees Mautic credentials; the API route is
  the only caller.

## 3. What the frontend team builds (that's the whole list)

1. The form component on the advisory page (fields: name, email, company +
   whatever qualifiers the advisory funnel needs).
2. One API route: validate → (optional own-DB insert) → `syncXlInquiryToMautic()`.
3. Add the 4 env vars in Vercel.

Estimated effort: **half a day**, most of it the form UI. The Mautic transport is
copy-paste.

**Option B — zero backend code:** Mautic can host the form itself. RC's conference
intake runs this way today (public standalone form at
`https://mautic.xencolabs.com/form/3`, phone/kiosk friendly). A Xenco Labs page can
POST to (or iframe) a Mautic-hosted form and skip the API route entirely. Trade-off:
less styling control and no own-DB copy of the lead. Good for low-stakes or interim
pages; the API-route pattern is the production-grade default.

## 4. What the Mautic admin provisions (already-solved problems)

All Mautic-side work is mine and follows the exact playbook used for the HR build
(fields → segments → campaigns → verified go-live test, documented in
`docs/HR_INTAKE_HANDOFF.md` and `README-OPS.md`):

1. **A new OAuth2 client credential pair for the Xenco Labs site.** RC's
   credentials will NOT be shared — standing one-channel-one-key policy, so a leak
   or rotation on one site never touches the other.
2. **Routing custom field** (e.g. `xl_source`) — note `source` is a reserved alias
   in Mautic, which is why RC's equivalent is `hr_source`; frontends map their
   `source` input to the prefixed name.
3. **Segment(s)** filtered on the routing value (e.g. `xl-advisory`) and a **drip
   campaign** attached, with the mandatory go-live acceptance test (test contact →
   enters campaign → first email fires, `is_failed=0`) before anything is called
   live.
4. If advisory meetings book through Calendly: the **booking-exit bridge already
   exists** (Calendly booking → webhook receiver stamps `booked_call_at` +
   removes the contact from the drip). RC's HR tracks use it in production; adding
   an XL campaign to it is configuration, not code.

## 5. Suggested prompt to hand the frontend team

> Build the advisory-meetings intake on the Xenco Labs site using the ResumeCoach →
> Mautic pattern, which runs in production on Vercel today (resumecoach.me is on
> Vercel and syncs five different flows to mautic.xencolabs.com — the "Vercel can't
> reach Mautic" concern is disproven by the running system). Copy
> `lib/mautic-auth.ts` from `xenflashbox/resumecoach-last` as the transport, and
> model the API route on `app/api/contact/hr/route.ts` / `syncHrInquiryToMautic`
> in `lib/mautic.ts`: client form → POST to a Next.js API route → zod validation →
> one atomic `POST /api/contacts/new` to Mautic carrying email, name, company, and
> the routing field the Mautic admin gives you (e.g. `xl_source: 'xl-advisory'`).
> Mautic sync must be best-effort (log loudly on failure, never fail the user's
> submission). Server-side only — credentials live in 4 Vercel env vars
> (`MAUTIC_URL`, `MAUTIC_OAUTH_TOKEN_URL`, `MAUTIC_OAUTH_CLIENT_ID`,
> `MAUTIC_OAUTH_CLIENT_SECRET`) supplied by the Mautic admin as a NEW credential
> pair (do not reuse ResumeCoach's). Segments, drip campaigns, and the booked-call
> exit are provisioned Mautic-side — your deliverable ends at the contact-create
> call. Acceptance: a test submission appears as a Mautic contact with the routing
> field set, within one minute enters the target segment, and the Mautic admin
> confirms the campaign fires.

---

*Cross-references: `docs/HR_INTAKE_HANDOFF.md` (the RC B2B form build this
mirrors), `README-OPS.md` (go-live acceptance test), Mautic API gotchas list
(Mautic-admin memory).*
