/**
 * Turns a sourced prospect profile into a Local OS tenant (config + trade module + fictional sample
 * workflow), rendered at the prospect's existing /lp/<token> URL. Pure and serializable: runs on the
 * server for metadata/media gating and in the browser for the sample workspace (and its reset).
 */
import type { DemoChecklistItem, DemoState } from '@/lib/local-os/demo-types'
import type { ProspectMedia, ProspectProfile } from '@/lib/local-os/prospect/types'
import { tenantAsset } from '@/lib/local-os/tenant-media'
import type { MediaImage, TenantConfig, VerticalPack } from '@/lib/local-os/tenant-types'
import { homeServicesVertical } from '@/lib/local-os/verticals/home-services'

export const PROSPECT_PREFIX = 'lp-'
export const prospectSlug = (token: string) => `${PROSPECT_PREFIX}${token}`
export const isProspectSlug = (slug: string) => slug.startsWith(PROSPECT_PREFIX)
export const tokenOf = (slug: string) => slug.slice(PROSPECT_PREFIX.length)

export interface ProspectEntryData {
  config: TenantConfig
  vertical: VerticalPack
}

export function buildProspect(token: string, p: ProspectProfile): ProspectEntryData {
  const slug = prospectSlug(token)
  const asset = (m?: ProspectMedia): string => (m ? `${tenantAsset(slug, m.key)}` : '')
  const img = (m: ProspectMedia): MediaImage => ({ src: asset(m), alt: m.alt, focus: m.focus, caption: m.caption, illustrative: m.generated || undefined })
  const vertical = homeServicesVertical(p)
  const mark = asset(p.brand.logo_mark)
  const wide = asset(p.brand.logo_wide) || mark
  const config: TenantConfig = {
    slug,
    name: p.name,
    owner: '',
    license: null,
    phone: p.phone.display,
    region: p.service_areas.summary,
    established: null,
    verticalKey: vertical.key,
    branding: {
      primary: p.brand.primary,
      primaryDark: p.brand.primary_dark,
      surface: p.brand.surface,
      light: p.brand.light,
      typography: 'brand',
      wordmarkAspect: p.brand.logo_wide ? p.brand.logo_wide_aspect ?? 4 : 1,
      markAspect: 1,
      wordmarkText: p.brand.logo_wide ? undefined : p.brand.wordmark_text ?? p.name,
      theme: {
        headingFont: p.brand.heading_font,
        bodyFont: p.brand.body_font,
        headingCase: p.brand.heading_case,
        radius: p.brand.radius,
        accent: p.brand.accent,
        heroLayout: p.brand.hero_layout,
      },
      logos: {
        wordmarkOnLight: wide, wordmarkOnDark: wide, wordmarkMonoBlack: wide, wordmarkMonoWhite: wide,
        shieldOnLight: mark || wide, shieldOnDark: mark || wide, shieldMonoBlack: mark || wide, shieldMonoWhite: mark || wide,
        favicon: asset(p.brand.favicon) || mark,
      },
      logoPlate: '#FFFFFF',
    },
    laneIds: p.services.map((s) => s.id),
    site: {
      tagline: p.hero.eyebrow,
      ctaLabel: p.cta.label,
      photoCredit: new URL(p.website).hostname.replace(/^www\./, ''),
      heroTitle: p.hero.title,
      heroSubtitle: p.hero.subtitle,
      credibility: p.facts.map((f) => f.text),
      serviceAreas: p.service_areas.list,
      emergencyLine: `Questions? ${vertical.terms?.callCta ?? 'Call'} ${p.name}:`,
      aboutTitle: p.about.title,
      aboutBody: p.about.body,
      process: [],
    },
    media: {
      hero: img(p.hero.image),
      about: p.about.image ? img(p.about.image) : img(p.hero.image),
      lanes: Object.fromEntries(p.services.filter((s) => s.image).map((s) => [s.id, img(s.image as ProspectMedia)])),
      gallery: p.gallery.map(img),
      proof: [],
      sampleJob: p.sample_job ? { laneId: p.sample_job.service_id, before: p.sample_job.before.map(img), after: p.sample_job.after.map(img) } : undefined,
    },
    tour: [
      { label: 'Website', detail: `${p.name}: branded homepage`, path: '' },
      { label: 'Service page', detail: p.services[0]?.title ?? 'Service', path: `/services/${p.services[0]?.id ?? ''}` },
      { label: 'Request a quote', detail: 'Guided request: service, property, contact', path: '/request' },
      { label: 'Customer status', detail: 'Request → estimate → approval → visit → photos → invoice', path: '/status/L-601' },
      { label: 'Estimate approval', detail: 'Customer approves a sample estimate', path: '/estimate/Q-602' },
      { label: 'Office dashboard', detail: 'Callbacks, estimates, today’s jobs', path: '/office' },
      { label: 'Request queue', detail: 'New requests and follow-ups', path: '/office/requests' },
      { label: 'Technician app', detail: 'Today’s job: checklist and before/after photos', path: '/tech/J-603' },
      { label: 'Service record', detail: 'Completed job with photos (sample)', path: '/report/R-603' },
      { label: 'Invoice', detail: 'Invoice linked to the job (sample)', path: '/invoice/I-604' },
    ],
    aiDemo: true,
    aiDemoHeading: 'Try the live AI receptionist',
    links: { status: '/status/L-601', field: '/tech/J-603' },
    website: p.website,
    previewOnly: true,
  }
  return { config, vertical }
}

function checklist(v: VerticalPack, laneId: string, done = 0): DemoChecklistItem[] {
  return (v.checklists[laneId] ?? []).map((c, i) => ({ id: `${laneId}-${i}`, section: c.section, label: c.label, done: i < done }))
}

/** Fictional sample workflow. Dates are relative to now so "today" always has work on it. */
export function seedProspect(config: TenantConfig, v: VerticalPack, now: Date = new Date()): DemoState {
  const at = (days: number, hour: number, minute = 0) => {
    const day = new Date(now.getTime() + days * 864e5).toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' })
    const guess = new Date(`${day}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00Z`)
    const pacific = new Date(guess.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }))
    const utc = new Date(guess.toLocaleString('en-US', { timeZone: 'UTC' }))
    return new Date(guess.getTime() + (utc.getTime() - pacific.getTime())).toISOString()
  }
  const day = (d: number) => at(d, 12).slice(0, 10)
  const sj = config.media.sampleJob
  // The completed sample job uses the service its before/after photos show.
  const lanes = sj && config.laneIds.includes(sj.laneId) ? [sj.laneId, ...config.laneIds.filter((l) => l !== sj.laneId)] : config.laneIds
  const L = (i: number) => lanes[i % lanes.length] as string
  const photos = sj ? [...sj.before.map((m, i) => ({ id: `sp-b${i}`, phase: 'before' as const, name: m.alt, url: m.src, sample: true, illustrative: m.illustrative })), ...sj.after.map((m, i) => ({ id: `sp-a${i}`, phase: 'after' as const, name: m.alt, url: m.src, sample: true, illustrative: m.illustrative }))] : []
  // Sample answers to the estimate questions asked for a lane (second option of each select).
  const fieldsFor = (lane: string) => Object.fromEntries(v.intakeFields.filter((f) => f.kind === 'select' && (!f.laneIds || f.laneIds.includes(lane))).map((f) => [f.key, f.options?.[1] ?? f.options?.[0] ?? '']))
  const fam = (lane: string) => v.lineItemFamilies.find((f) => f.id === lane)?.items ?? []
  const svc = (lane: string) => v.services.find((s) => s.laneId === lane)?.title ?? lane
  const city = (i: number) => config.site.serviceAreas[i % Math.max(1, config.site.serviceAreas.length)] ?? 'the service area'
  // Sample quantities that read sensibly per unit (a whole home's windows, a typical array, a patio).
  const QTY: Record<string, number> = { window: 24, panel: 20, 'sq ft': 400, hour: 2 }
  const line = (lane: string, k = 0) => { const it = fam(lane)[k] ?? fam(lane)[0]; return it ? [{ group: svc(lane), label: it.description, unit: it.unit, qty: QTY[it.unit] ?? 1, unitPrice: it.sampleUnitPrice }] : [] }
  const TECH = 'Sample Technician'
  const lead = (id: string, i: number, lane: string, extra: Partial<DemoState['leads'][number]>) => ({
    id, sample: true as const, createdAt: at(-i, 9, 10), name: `Sample Customer ${id.slice(2)}`, company: null, phone: `555-01${id.slice(-2)}`,
    email: 'customer@example.com', address: `${100 + i * 10} Sample Lane, ${city(i)}`, buildingType: 'Single-family home', laneId: lane,
    workType: svc(lane), urgency: 'routine', notes: '', fields: fieldsFor(lane), status: 'new', nextAction: 'Call back to confirm details',
    dueAt: at(0, 15, 0), source: 'website form' as const, ...extra,
  })
  const sr = (lane: string) => (v.reportTemplates[0]?.items ?? []).map((label) => ({ label, result: 'pass' as const, note: '' }))
  return {
    leads: [
      lead('L-601', 14, L(0), { status: 'won', nextAction: 'Invoice sent; payment follow-up in 7 days', dueAt: null, notes: 'Two-story home; side gate code shared by phone (sample).' }),
      lead('L-602', 2, L(1), { status: 'quoted', nextAction: 'Estimate sent: waiting for customer approval', notes: 'Wants it done before family visits (sample).' }),
      lead('L-603', 5, L(2), { status: 'won', nextAction: 'Visit today', notes: 'Dog in the backyard; text before arrival (sample).' }),
      lead('L-604', 0, L(0), { status: 'new', nextAction: 'Call back to confirm stories and access', createdAt: at(0, 7, 45) }),
      lead('L-605', 3, L(3), { status: 'follow_up', nextAction: 'Follow up: no answer on first call', source: 'phone', dueAt: at(-1, 16, 0) }),
      lead('L-606', 9, L(1), { status: 'lost', nextAction: 'None', dueAt: null, notes: 'Decided to wait until spring (sample).' }),
    ],
    quotes: [
      { id: 'Q-601', sample: true, leadId: 'L-601', number: 'EST-601 (sample)', laneId: L(0), scope: `${svc(L(0))} for a two-story home (sample).`, lines: [...line(L(0), 0), ...line(L(0), 1)], status: 'accepted', reviewedBy: 'Office (sample)', reviewNote: '', fromReportId: null, customerApproval: 'Sample Customer 601 (sample)' },
      { id: 'Q-602', sample: true, leadId: 'L-602', number: 'EST-602 (sample)', laneId: L(1), scope: `${svc(L(1))} (sample scope).`, lines: [...line(L(1), 0), ...line(L(2), 0)], status: 'sent', reviewedBy: 'Office (sample)', reviewNote: '', fromReportId: null, customerApproval: null },
      { id: 'Q-603', sample: true, leadId: 'L-603', number: 'EST-603 (sample)', laneId: L(2), scope: `${svc(L(2))} (sample scope).`, lines: line(L(2), 0), status: 'accepted', reviewedBy: 'Office (sample)', reviewNote: '', fromReportId: null, customerApproval: 'Sample Customer 603 (sample)' },
      { id: 'Q-605', sample: true, leadId: 'L-605', number: 'EST-605 (sample)', laneId: L(3), scope: `${svc(L(3))} (draft).`, lines: line(L(3), 0), status: 'draft', reviewedBy: null, reviewNote: '', fromReportId: null, customerApproval: null },
    ],
    jobs: [
      { id: 'J-601', sample: true, number: 'JOB-601 (sample)', leadId: 'L-601', quoteId: 'Q-601', reportId: 'R-603', laneId: L(0), title: svc(L(0)), scheduledStart: at(-6, 9, 0), scheduledEnd: at(-6, 12, 0), technician: TECH, status: 'report_ready', siteContact: 'Sample Customer 601 · 555-0101', accessNotes: 'Side gate; code shared by phone (sample).', scope: [svc(L(0))], checklist: checklist(v, L(0), 20), photos, techNotes: 'All areas done; customer walked through (sample).', reportApprovedBy: 'Office (sample sign-off)' },
      { id: 'J-603', sample: true, number: 'JOB-603 (sample)', leadId: 'L-603', quoteId: 'Q-603', reportId: null, laneId: L(2), title: svc(L(2)), scheduledStart: at(0, 10, 0), scheduledEnd: at(0, 12, 30), technician: TECH, status: 'confirmed', siteContact: 'Sample Customer 603 · 555-0103', accessNotes: 'Dog in the backyard; text before arrival (sample).', scope: [svc(L(2))], checklist: checklist(v, L(2), 0), photos: [], techNotes: '', reportApprovedBy: null },
    ],
    reports: [
      { id: 'R-603', sample: true, kind: 'service_record', number: 'REC-603 (sample)', jobId: 'J-601', property: { name: 'Sample Customer 601 (sample)', address: `114 Sample Lane, ${city(14)}`, occupancy: 'Residential', buildingType: 'Single-family home', details: 'Two stories (sample)' }, technician: { name: TECH, credential: 'Technician (sample)' }, systems: [], items: sr(L(0)), assemblies: [], deficiencies: [], overall: 'pass', delivery: { owner: 'sent', ahj: 'not_required' }, followUpQuoteId: null, reviewedBy: 'Office (sample review)' },
    ],
    invoices: [
      { id: 'I-604', sample: true, jobId: 'J-601', number: 'INV-604 (sample)', siteAddress: `114 Sample Lane, ${city(14)}`, billTo: 'Sample Customer 601 (sample)', issueDate: day(-5), dueDate: day(25), lines: [...line(L(0), 0), ...line(L(0), 1)].map((l) => ({ category: l.group, description: l.label, unitPrice: l.unitPrice, qty: l.qty })), amountPaid: 0, status: 'sent', reportIds: ['R-603'], followUp: 'Reminder 7 days before due (a person sends it)' },
    ],
  }
}
