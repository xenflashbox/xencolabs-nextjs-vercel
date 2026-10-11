# Local OS: tenants and vertical packs

The Local OS is one set of screens configured per client. A client is a **tenant**; the
trade vocabulary comes from a **vertical pack**. Adding a contractor means adding
configuration, not copying screens into their website repository.

```
lib/local-os/tenant-types.ts           shapes: TenantConfig, VerticalPack, ServiceLane, ...
lib/local-os/demo-types.ts             preview records (every one has sample: true)
lib/local-os/verticals/<vertical>.ts   reusable trade vocabulary + guardrails
lib/local-os/tenants/<tenant>.ts       branding, lanes sold, sample seed
lib/local-os/tenants/index.ts          registry + production gate
app/os/[tenant]/...                    shared screens
components/local-os/os/...             shared UI
```

## What a vertical pack holds (reusable across contractors in the trade)

| Field | Fire-protection example | Notes |
|---|---|---|
| `lanes` | sprinkler, emergency, extinguisher, each with work types | A tenant sells a subset (`laneIds`). |
| `buildingTypes` | single-family … healthcare | Drives intake and, later, pricing rules. |
| `urgency` | emergency / soon / routine, each with a routing sentence | `humanOnly` levels are routed to a phone call; the system never dispatches. |
| `leadStatuses` | new → callback → contacted → follow-up → qualified → estimate drafted → won / lost | Shared queue states. |
| `checklists` | per lane, sections prep / safety / work / completion | Lines describe what the technician *records*, never a conclusion. |
| `quoteLines` | inspection per riser, head replacement, call-out, … | `sampleUnitPrice` is a placeholder; real rates come from the client. |
| `guardrails` | quote, compliance, emergency, completion | Shown wherever the system would otherwise appear to make that statement. |
| `reportSections` | scope performed, observations, photos, follow-up | Completion report outline. |

## What a tenant holds

Name, owner, licence line exactly as the client publishes it, phone, region, branding
(primary colour, dark surface, logos from the client's own site), the lanes they sell,
a link to their public site (read-only reference), and a sample seed. `previewOnly: true`
means nothing leaves the browser.

## Guardrails every vertical must keep

1. **No binding quotes.** Estimates are drafts until the licensed contractor confirms the
   scope and approves by name. The flow is draft → scope reviewed → approved to send → sent.
2. **No compliance conclusions.** Inspection results, tags and certifications are issued by
   the licensed contractor on their own forms. Checklists record observations only.
3. **No automatic emergency dispatch.** Emergency urgency turns into "call the office now".
4. **Completion reports are records of work, not certifications,** and need sign-off.
5. **Sample data is labelled** on every record (SAMPLE badge + "(sample)" names) and every
   screen (amber band).

## Privacy and exposure

- `/os/*` is noindex, disallowed in `robots.ts`, and public only to Clerk (like `/lp/*`).
- **Production:** `tenantPreviewsEnabled()` returns false unless `LOCAL_OS_TENANT_PREVIEWS=on`,
  so merging cannot expose a tenant preview.
- **Vercel preview deployments** of this project redirect to Vercel login, which is what
  keeps the alpha private. Sharing it outside the team needs a Vercel shareable link,
  which is a deliberate step.
- The repository is public. Never put client secrets or real customer data in a tenant file.

## Converting a preview tenant to live (not done for any tenant yet)

Persistence (a tenant-scoped schema in the shared Local OS backend), auth for the owner and
technicians, the real intake source (their website form posting to the shared intake API),
photo storage (private bucket per tenant, signed URLs, the same pattern as the Sonoma Wash
field workflow), messaging, and invoicing — each only after the client answers the
conversion questions below and the founder approves.

## Nemesis Fire: questions for Alex before going live

**Intake and leads**
1. Which requests should reach this system: the website form only, or also phone calls and texts? Who enters phone requests?
2. What do you need on every request before you call back (address, building type, system type, number of risers or extinguishers, occupancy, access)?
3. What is your callback promise for routine, soon and emergency requests, and who covers emergencies after hours?
4. Should emergency web requests do anything besides telling the customer to call you? (The system will never dispatch on its own.)

**Estimates**
5. Your real line items and rates per lane (inspection per riser or per building, head replacement, call-out, hourly labour, extinguisher per unit, recharge, hydro test), and minimums or trip charges.
6. Which estimates can be priced from a phone call, and which always need a site visit or drawings?
7. Who may approve an estimate besides you? Do you need deposits, and on which jobs?
8. Your standard exclusions and terms (permits, engineering, patching, after-hours rates, warranty).

**Jobs and technicians**
9. Who are your technicians, and should each see only their own jobs?
10. The checklist you actually use for NFPA 25 sprinkler inspections, NFPA 10 extinguisher service and emergency repairs; which items are required before a job can be closed?
11. Impairment and monitoring-company notification: what is your procedure, and should the job page prompt for it?
12. Which photos are mandatory (riser, gauges, failure before and after, tags)?

**Reports, compliance and money**
13. Which official forms do you issue for inspections and tags? (The system will attach to them, not replace them.)
14. Who signs completion reports, and should customers receive them automatically after sign-off?
15. How do you invoice and take payment today (QuickBooks, Stripe, cheques)? What are the terms, and who chases overdue invoices?
16. Recurring work: should annual and semi-annual inspection reminders be created automatically for each property?

**Customers and data**
17. Do your customers want a status link by text or email, and from which number or address?
18. Do you have existing customer, property or inspection-due lists to import?
19. Which email and phone number should customer-facing messages come from?
20. Who besides you should have access to the office view?
