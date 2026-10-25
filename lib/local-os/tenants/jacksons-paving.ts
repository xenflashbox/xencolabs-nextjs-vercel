/**
 * Jackson's Paving — commercial-paving reference tenant of the Local OS vertical sales preview
 * (private prospect demonstration).
 *
 * Business facts come only from the company's own public website (jacksonspavinginc.com: name,
 * Santa Rosa base, phone, family-owned, services offered) and its public social profile (Sonoma,
 * Napa and Marin service area). No licence, years in business, response time, financing,
 * warranty or guarantee is stated. The logo and photos are the company's public website assets,
 * held in the private tenant-media bucket — not committed here — and no photo is presented as a
 * specific Jackson's project.
 *
 * Every request, estimate, job, record and invoice below is SAMPLE data: fictional properties,
 * people and placeholder prices. It is not Jackson's customers, proposals, rates or terms, and
 * nothing here connects to Jackson's website, forms, email, calendar or billing.
 */
import type { DemoChecklistItem, DemoState } from '@/lib/local-os/demo-types'
import type { TenantConfig } from '@/lib/local-os/tenant-types'
import { tenantAsset } from '@/lib/local-os/tenant-media'
import { COMMERCIAL_PAVING } from '@/lib/local-os/verticals/commercial-paving'

const BRAND = tenantAsset('jacksons-paving', 'brand')
const MEDIA = tenantAsset('jacksons-paving', 'media')
// Mockup logo system supplied 2026-10-12 (not approved as Jackson's final logo): horizontal wordmark
// for wide placements, stacked wordmark for compact/mobile, icon for the tenant favicon. Drawn for
// light backgrounds only, so dark surfaces get a light plate (branding.logoPlate); never recoloured.
const HORIZONTAL = `${BRAND}/jacksons-paving-horizontal-wordmark.svg`
const STACKED = `${BRAND}/jacksons-paving-stacked-wordmark.svg`

export const JACKSONS_PAVING: TenantConfig = {
  slug: 'jacksons-paving',
  name: 'Jackson’s Paving',
  owner: 'Jack (owner)',
  license: null,
  phone: '(707) 843-7248',
  region: 'Santa Rosa · Sonoma County · North Bay',
  established: null,
  aiDemo: false,
  verticalKey: COMMERCIAL_PAVING.key,
  // Orange and charcoal from the public logo and website (#F76103 accent).
  branding: {
    primary: '#E85A00',
    primaryDark: '#B84700',
    surface: '#1F1F1F',
    light: '#F7F7F5',
    typography: 'industrial',
    wordmarkAspect: 4,
    markAspect: 1,
    markScale: 1.4,
    logoPlate: '#F7F7F5',
    logos: {
      wordmarkOnLight: HORIZONTAL,
      wordmarkOnDark: HORIZONTAL,
      shieldOnLight: STACKED,
      shieldOnDark: STACKED,
      wordmarkMonoBlack: HORIZONTAL,
      wordmarkMonoWhite: HORIZONTAL,
      shieldMonoBlack: STACKED,
      shieldMonoWhite: STACKED,
      favicon: `${BRAND}/jacksons-paving-icon.svg`,
    },
  },
  laneIds: ['commercial', 'repair', 'sealcoat', 'striping', 'milling'],
  site: {
    tagline: 'Commercial asphalt paving in Santa Rosa and the North Bay',
    heroTitle: 'Commercial asphalt paving for Sonoma County and the North Bay',
    heroSubtitle:
      'Paving, repair, sealcoating and striping for property managers and owners — from a site review to a written estimate, a scheduled crew and a completion record.',
    credibility: [
      'Family-owned paving company based in Santa Rosa',
      'Asphalt paving, sealcoating, parking lot striping, crack repair and milling',
      'Serving Sonoma, Napa and Marin counties',
    ],
    serviceAreas: ['Santa Rosa', 'Sonoma County', 'the North Bay'],
    emergencyLine: 'Open pothole or failed area in a drive lane? Call the office.',
    aboutTitle: 'Asphalt work, planned around your property',
    aboutBody:
      'Jackson’s Paving is a family-owned paving company in Santa Rosa, providing commercial and residential paving, sealcoating, parking lot striping, crack repair and milling.',
    process: [
      { title: 'Request a site review', body: 'Tell us about the property and what you are seeing.' },
      { title: 'Estimate and approval', body: 'An estimator measures the areas and you receive a written estimate.' },
      { title: 'Scheduled work', body: 'Crews are scheduled with you, in phases if the lot must stay open.' },
    ],
  },
  // The company's public website imagery (held privately, never committed). Shown as illustration
  // of the trade; no image is captioned as a specific Jackson's project.
  media: {
    hero: { src: `${MEDIA}/hero-paving-aerial.jpg`, alt: 'Aerial view of an asphalt paving crew with a paver and rollers', focus: '60% 50%' },
    about: { src: `${MEDIA}/about-site.jpg`, alt: 'Freshly paved asphalt beside a retaining wall', focus: '50% 60%' },
    lanes: {
      commercial: { src: `${MEDIA}/lane-commercial.jpg`, alt: 'Roller operator compacting new asphalt, seen from above', focus: '50% 50%' },
      repair: { src: `${MEDIA}/lane-repair.jpg`, alt: 'Crew patching sections of a driveway, seen from above', focus: '50% 50%' },
      sealcoat: { src: `${MEDIA}/lane-sealcoat.jpg`, alt: 'Close view of a fresh asphalt surface edge', focus: '50% 60%' },
      striping: { src: `${MEDIA}/lane-striping.jpg`, alt: 'Freshly striped parking lot lines on dark asphalt', focus: '50% 50%' },
      milling: { src: `${MEDIA}/lane-milling.jpg`, alt: 'Steel drum roller compacting hot asphalt', focus: '40% 50%' },
    },
    // Clips from Jackson's public social channel (supplied 2026-10-12): illustrative footage of the
    // trade, not a record of the sample project or of any specific customer, site or result.
    // Lossless remux only (container metadata removed); decoded frames identical to the supplied files.
    // Posters: supplied stills, except on-the-job (a clean frame at 4 s of its own clip; the supplied still
    // came from the foreman footage) and asphalt-pouring (truck plate blurred in this preview copy only).
    proofHeading: {
      eyebrow: 'On the job',
      title: 'Paving, start to finish',
      body: 'Delivery, placement and compaction — and where each step shows up: the request, the office and the crew’s phone.',
      cardLabel: 'On the job',
      note: 'Footage from Jackson’s Paving’s public channel, shown as illustration. It does not depict the sample project or a specific customer.',
    },
    proof: [
      {
        id: 'asphalt-pouring',
        title: 'Hot mix delivered to the paver',
        body: 'A truck delivers asphalt for placement; the planned tonnage sits on the crew’s job packet.',
        video: { src: `${MEDIA}/jacksons-paving-asphalt-pouring.mp4`, poster: `${MEDIA}/jacksons-paving-asphalt-pouring-poster.png`, alt: 'Dump truck backing in to deliver asphalt on a gravel road lined with trees' },
        laneId: 'commercial',
        links: [
          { label: 'Request a site review', path: '/request?lane=commercial', view: 'customer' },
          { label: 'Crew job packet', path: '/tech/J-803', view: 'technician' },
        ],
      },
      {
        id: 'foreman',
        title: 'Crew lead at the paver',
        body: 'The foreman runs the paver and the day’s checklist: closures, quantities and photos go to the office.',
        video: { src: `${MEDIA}/jacksons-paving-foreman.mp4`, poster: `${MEDIA}/jacksons-paving-foreman-poster.png`, alt: 'Crew member in a high-visibility vest at an orange asphalt paver while a truck feeds the hopper' },
        laneId: 'commercial',
        links: [
          { label: 'Crew schedule in the office', path: '/office/jobs/J-803', view: 'office' },
          { label: 'Crew job packet', path: '/tech/J-803', view: 'technician' },
        ],
      },
      {
        id: 'rolling',
        title: 'Compaction and rolling',
        body: 'Rollers compact the new mat; the completion record captures what was placed, with photos.',
        video: { src: `${MEDIA}/jacksons-paving-rolling.mp4`, poster: `${MEDIA}/jacksons-paving-rolling-poster.png`, alt: 'Double-drum roller compacting fresh asphalt beside a white barn, with a paver behind' },
        laneId: 'commercial',
        links: [
          { label: 'Sample completion record', path: '/report/R-803', view: 'customer' },
          { label: 'Sample invoice', path: '/invoice/I-903', view: 'customer' },
        ],
      },
    ],
    laneVideos: {
      commercial: {
        title: 'Finished surface',
        body: 'Rolled and finished asphalt; the completion record lists quantities and before/after photos.',
        video: { src: `${MEDIA}/jacksons-paving-finished-road.mp4`, poster: `${MEDIA}/jacksons-paving-finished-road-poster.png`, alt: 'Roller finishing a fresh asphalt drive, ending on a newly paved road beside vineyard rows' },
      },
      repair: {
        title: 'Crew on site',
        body: 'Crews working an asphalt drive and rolling it smooth.',
        video: { src: `${MEDIA}/jacksons-paving-onthe-job.mp4`, poster: `${MEDIA}/jacksons-paving-onthe-job-poster.png`, alt: 'Crew members with cones beside a freshly paved, tree-shaded drive; a roller compacts it later in the clip' },
      },
    },
  },
  tour: [
    { label: 'Customer website', detail: 'Commercial paving homepage with the site-review CTA', path: '' },
    { label: 'Service detail', detail: 'Commercial asphalt paving', path: '/services/commercial-asphalt-paving' },
    { label: 'Request a site review', detail: 'Property, service, photos, contact', path: '/request' },
    { label: 'Customer status', detail: 'North Bay Office Center: request → site review → estimate → crews → completion → invoice', path: '/status/L-701' },
    { label: 'Estimator site review', detail: 'Measured areas and marked pavement conditions (sample)', path: '/report/R-801' },
    { label: 'Estimate approval', detail: 'Grouped estimate the property manager approves', path: '/estimate/Q-703' },
    { label: 'Office dashboard', detail: 'What the office coordinator and owner see today', path: '/office' },
    { label: 'Estimator review', detail: 'Draft estimate: grouped lines, review, send', path: '/office/quotes/Q-701' },
    { label: 'Crew schedule', detail: 'Phase 2: crew, equipment, materials, weather', path: '/office/jobs/J-803' },
    { label: 'Crew job', detail: 'Foreman’s phone: checklist, quantities, photos', path: '/tech/J-803' },
    { label: 'Completion record', detail: 'Phase 1 work, quantities and tickets (sample)', path: '/report/R-803' },
    { label: 'Invoice', detail: 'Phase 1 invoice linked to the work order', path: '/invoice/I-903' },
  ],
  greetingName: 'Jack',
  links: { status: '/status/L-701', field: '/tech/J-803' },
  website: 'https://www.jacksonspavinginc.com',
  previewOnly: true,
}

function checklist(key: string, doneCount = 0): DemoChecklistItem[] {
  return (COMMERCIAL_PAVING.checklists[key] ?? []).map((item, i) => ({
    id: `${key}-${i}`,
    section: item.section,
    label: item.label,
    done: i < doneCount,
  }))
}

const ESTIMATOR = 'Sample Estimator'
const FOREMAN = 'Sample Crew Foreman'
const PROPERTY = {
  name: 'North Bay Office Center (sample)',
  address: '1200 Sample Business Park Drive, Santa Rosa, CA',
  occupancy: 'Office park (sample)',
  buildingType: 'Office park / business center',
  details: 'Three buildings · 142 stalls · approx. 38,000 sq ft paved (sample)',
}

/** Dates are relative to when the preview is opened, so "today" always has crews out. */
export function seedJacksonsPaving(now: Date = new Date()): DemoState {
  const at = (days: number, hour: number, minute = 0) => {
    const day = new Date(now.getTime() + days * 864e5).toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' })
    const guess = new Date(`${day}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00Z`)
    const pacific = new Date(guess.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }))
    const utc = new Date(guess.toLocaleString('en-US', { timeZone: 'UTC' }))
    return new Date(guess.getTime() + (utc.getTime() - pacific.getTime())).toISOString()
  }
  const day = (days: number) => at(days, 12).slice(0, 10)
  const review = COMMERCIAL_PAVING.reportTemplates[0]?.items ?? []
  const completion = COMMERCIAL_PAVING.reportTemplates[1]?.items ?? []

  return {
    leads: [
      {
        id: 'L-701', sample: true, createdAt: at(-21, 8, 15), name: 'Sample Property Manager', company: PROPERTY.name,
        phone: '707-555-0171', email: 'pm@example.com', address: PROPERTY.address, buildingType: PROPERTY.buildingType,
        laneId: 'commercial', workType: 'Parking lot renewal (patch, seal, stripe)', urgency: 'soon',
        notes: 'Lot renewal before two new tenants move in. Lot must stay open weekdays 7am–6pm; phasing is fine.',
        fields: { area: '38000', stalls: '142', lastSealed: 'Over 5 years / never', openHours: 'Weekdays 7am–6pm' },
        photos: ['entrance-drive.jpg', 'east-aisle-cracking.jpg', 'rear-lot-ponding.jpg'],
        status: 'won', nextAction: 'Phase 2 in progress: confirm reopening time with tenants', dueAt: at(0, 15, 0), source: 'website form',
      },
      {
        id: 'L-702', sample: true, createdAt: at(-2, 14, 20), name: 'Sample HOA Manager', company: 'Sample Oaks HOA (sample)',
        phone: '707-555-0172', email: 'board@example.org', address: '40 Sample Oaks Circle, Rohnert Park, CA', buildingType: 'Multi-family / HOA',
        laneId: 'sealcoat', workType: 'Crack seal and sealcoat together', urgency: 'routine',
        notes: 'Board wants pricing for next spring’s budget. Two entrances, guest parking.', fields: { area: '22000', stalls: '60', lastSealed: '3–5 years ago' },
        status: 'quoted', nextAction: 'Estimator to review the draft estimate before it goes out', dueAt: at(0, 11, 0), source: 'website form',
      },
      {
        id: 'L-703', sample: true, createdAt: at(0, 7, 5), name: 'Sample Retail Owner', company: 'Sample Plaza (sample)',
        phone: '707-555-0173', email: null, address: '300 Sample Avenue, Windsor, CA', buildingType: 'Retail center',
        laneId: 'repair', workType: 'Pothole or failed area', urgency: 'emergency',
        notes: 'Pothole opened overnight in the main drive lane by the entrance. Called the office.', fields: {},
        status: 'contacted', nextAction: 'Hazard handled by phone: crew making it safe this morning', dueAt: at(0, 9, 0), source: 'phone',
      },
      {
        id: 'L-704', sample: true, createdAt: at(-1, 16, 40), name: 'Sample Church Office', company: 'Sample Valley Church (sample)',
        phone: '707-555-0174', email: 'office@example.org', address: '410 Sample Road, Sebastopol, CA', buildingType: 'Church / school',
        laneId: 'striping', workType: 'Re-stripe existing layout', urgency: 'soon', notes: 'Faded lines; would like it done before the holiday events.', fields: { stalls: '90' },
        status: 'callback', nextAction: 'Call back to confirm stall count and a site-review time', dueAt: at(0, 13, 30), source: 'website form',
      },
      {
        id: 'L-705', sample: true, createdAt: at(-12, 9, 10), name: 'Sample Warehouse Manager', company: 'Sample Logistics (sample)',
        phone: '707-555-0175', email: 'ops@example.com', address: '500 Sample Industrial Way, Santa Rosa, CA', buildingType: 'Industrial / warehouse',
        laneId: 'milling', workType: 'Grind and overlay', urgency: 'routine', notes: 'Truck court is breaking up at the dock aprons.', fields: { area: '6200' },
        status: 'quoted', nextAction: 'Estimate sent: waiting on customer approval', dueAt: at(2, 10, 0), source: 'referral',
      },
      {
        id: 'L-706', sample: true, createdAt: at(-4, 10, 0), name: 'Sample Winery Operations', company: 'Sample Ridge Winery (sample)',
        phone: '707-555-0176', email: null, address: '600 Sample Vineyard Lane, Healdsburg, CA', buildingType: 'Winery / agricultural',
        laneId: 'repair', workType: 'Remove and replace damaged asphalt', urgency: 'routine', notes: 'Entrance apron cracked by harvest trucks.', fields: {},
        status: 'follow_up', nextAction: 'Follow up: no answer on first call', dueAt: at(-1, 16, 0), source: 'website form',
      },
      {
        id: 'L-707', sample: true, createdAt: at(-15, 11, 0), name: 'Sample Clinic Manager', company: 'Sample Clinic (sample)',
        phone: '707-555-0177', email: null, address: '700 Sample Plaza, Petaluma, CA', buildingType: 'Office park / business center',
        laneId: 'striping', workType: 'ADA stalls and markings', urgency: 'routine', notes: 'Decided to wait until next year.', fields: {},
        status: 'lost', nextAction: 'None', dueAt: null, source: 'phone',
      },
      {
        id: 'L-708', sample: true, createdAt: at(-48, 9, 0), name: 'Sample Facilities Lead', company: 'Sample Community Church (sample)',
        phone: '707-555-0178', email: 'facilities@example.org', address: '800 Sample Street, Santa Rosa, CA', buildingType: 'Church / school',
        laneId: 'striping', workType: 'Re-stripe existing layout', urgency: 'routine', notes: '80 stalls plus two ADA stalls.', fields: { stalls: '80' },
        status: 'won', nextAction: 'Complete: invoice paid', dueAt: null, source: 'referral',
      },
    ],
    quotes: [
      {
        id: 'Q-701', sample: true, leadId: 'L-702', number: 'EST-701 (sample)', laneId: 'sealcoat',
        scope: 'Crack seal and two-coat sealcoat of both entrances, drive aisles and guest parking; re-stripe 60 stalls.',
        lines: [
          { group: 'Mobilization', label: 'Mobilization and traffic control', unit: 'lump sum', qty: 1, unitPrice: 1500 },
          { group: 'Crack sealing', label: 'Crack sealing, hot pour', unit: 'linear ft', qty: 1200, unitPrice: 1 },
          { group: 'Sealcoat', label: 'Sealcoat, two coats', unit: 'sq ft', qty: 22000, unitPrice: 0.25 },
          { group: 'Striping', label: 'Re-stripe parking stalls', unit: 'stall', qty: 60, unitPrice: 8 },
        ],
        status: 'draft', reviewedBy: null, reviewNote: '', fromReportId: null, customerApproval: null,
      },
      {
        id: 'Q-702', sample: true, leadId: 'L-701', number: 'EST-702 (sample)', laneId: 'commercial',
        scope:
          'Parking lot renewal from site review RPT-801, in two phases so the lot stays open: Phase 1 patching and crack sealing; Phase 2 sealcoat, striping and ADA / traffic markings.',
        lines: [
          { group: 'Mobilization', label: 'Mobilization and traffic control (two phases)', unit: 'lump sum', qty: 1, unitPrice: 1500 },
          { group: 'Patching', label: 'Remove and replace failed asphalt (2")', unit: 'sq ft', qty: 640, unitPrice: 9 },
          { group: 'Patching', label: 'Base repair under failed areas', unit: 'sq ft', qty: 180, unitPrice: 6 },
          { group: 'Crack sealing', label: 'Crack sealing, hot pour', unit: 'linear ft', qty: 2400, unitPrice: 1 },
          { group: 'Sealcoat', label: 'Sealcoat, two coats', unit: 'sq ft', qty: 38000, unitPrice: 0.25 },
          { group: 'Striping', label: 'Re-stripe parking stalls', unit: 'stall', qty: 142, unitPrice: 8 },
          { group: 'Striping', label: 'Directional arrows', unit: 'each', qty: 12, unitPrice: 30 },
          { group: 'ADA and traffic markings', label: 'ADA stall and access aisle markings', unit: 'stall', qty: 4, unitPrice: 150 },
          { group: 'ADA and traffic markings', label: 'Stop bars and crosswalks', unit: 'each', qty: 6, unitPrice: 60 },
        ],
        status: 'accepted', reviewedBy: 'Sample Estimator (sample sign-off)', reviewNote: 'Quantities from the site review; phasing agreed with the property manager.',
        fromReportId: 'R-801', customerApproval: 'Sample Property Manager (sample signature)',
      },
      {
        id: 'Q-703', sample: true, leadId: 'L-705', number: 'EST-703 (sample)', laneId: 'milling',
        scope: 'Grind and overlay the truck court and dock aprons from site review RPT-804; edge grinding at the dock transitions.',
        lines: [
          { group: 'Mobilization', label: 'Mobilization and traffic control', unit: 'lump sum', qty: 1, unitPrice: 1500 },
          { group: 'Milling and paving', label: 'Mill and overlay (2")', unit: 'sq ft', qty: 6200, unitPrice: 4 },
          { group: 'Patching', label: 'Base repair under failed areas', unit: 'sq ft', qty: 300, unitPrice: 6 },
          { group: 'Striping', label: 'Directional arrows', unit: 'each', qty: 4, unitPrice: 30 },
        ],
        status: 'sent', reviewedBy: 'Sample Estimator (sample sign-off)', reviewNote: 'Depths marked on the site plan.', fromReportId: 'R-804', customerApproval: null,
      },
      {
        id: 'Q-704', sample: true, leadId: 'L-708', number: 'EST-704 (sample)', laneId: 'striping',
        scope: 'Re-stripe 80 stalls and repaint two ADA stalls with access aisles.',
        lines: [
          { group: 'Striping', label: 'Re-stripe parking stalls', unit: 'stall', qty: 80, unitPrice: 8 },
          { group: 'ADA and traffic markings', label: 'ADA stall and access aisle markings', unit: 'stall', qty: 2, unitPrice: 150 },
        ],
        status: 'accepted', reviewedBy: 'Sample Estimator (sample sign-off)', reviewNote: '', fromReportId: null, customerApproval: 'Sample Facilities Lead (sample signature)',
      },
    ],
    jobs: [
      {
        id: 'J-801', sample: true, number: 'JOB-801 (sample)', leadId: 'L-701', quoteId: null, reportId: 'R-801', laneId: 'commercial',
        title: 'Estimator site review: parking lot renewal', scheduledStart: at(-16, 9, 0), scheduledEnd: at(-16, 10, 30), technician: ESTIMATOR,
        status: 'report_ready', siteContact: 'Sample Property Manager · 707-555-0171',
        accessNotes: 'Meet at the leasing office; walk the main lot, east drive aisle and rear lot.',
        scope: ['Measure each area', 'Mark conditions on the site plan', 'Photograph each condition', 'Phasing options for an open lot'],
        checklist: checklist('site_review', 7), photos: [], techNotes: 'East aisle has the worst failures. Rear lot ponding is a drainage issue; noted, outside scope.',
        reportApprovedBy: 'Sample Estimator (sample sign-off)',
      },
      {
        id: 'J-802', sample: true, number: 'JOB-802 (sample)', leadId: 'L-701', quoteId: 'Q-702', reportId: 'R-803', laneId: 'repair',
        title: 'Phase 1: patching and crack sealing', scheduledStart: at(-6, 7, 0), scheduledEnd: at(-6, 15, 30), technician: FOREMAN,
        status: 'report_ready', siteContact: 'Sample Property Manager · 707-555-0171',
        accessNotes: 'East drive aisle closed 7am–3:30pm; traffic routed through the north entrance.',
        scope: ['Remove and replace 640 sq ft of failed asphalt in the east aisle', 'Base repair under the worst areas', 'Crack seal approx. 2,400 lf across all areas'],
        checklist: checklist('repair', 5), photos: [], techNotes: 'Patches compacted and open by 2:45pm. Crack seal finished across main and rear lots.',
        reportApprovedBy: 'Sample Office Coordinator (sample sign-off)',
        crew: [FOREMAN, 'Sample Crew Member A', 'Sample Crew Member B', 'Sample Equipment Operator'],
        equipment: ['Asphalt saw', 'Skid steer with breaker', 'Double-drum roller', 'Crack-seal kettle', 'Dump truck'],
        materials: [
          { item: 'Hot-mix asphalt', qty: '≈ 9 tons (sample)' },
          { item: 'Aggregate base', qty: '≈ 4 tons (sample)' },
          { item: 'Hot-pour crack sealant', qty: '≈ 1,200 lb (sample)' },
        ],
        weather: 'Dry, 61–70°F (sample)',
      },
      {
        id: 'J-803', sample: true, number: 'JOB-803 (sample)', leadId: 'L-701', quoteId: 'Q-702', reportId: null, laneId: 'commercial',
        title: 'Phase 2: sealcoat, striping and markings', scheduledStart: at(0, 7, 0), scheduledEnd: at(0, 16, 0), technician: FOREMAN,
        status: 'in_progress', siteContact: 'Sample Property Manager · 707-555-0171',
        accessNotes: 'Main lot closed in halves: east half 7am–noon, west half noon–4pm. Tenant notice went out Monday. Rear lot stays open today.',
        scope: ['Sealcoat main lot, two coats', 'Re-stripe 142 stalls and 12 directional arrows', 'Repaint 4 ADA stalls with access aisles and 6 stop bars / crosswalks'],
        checklist: checklist('commercial', 5), photos: [], techNotes: 'East half first coat finished 9:40.',
        reportApprovedBy: null,
        crew: [FOREMAN, 'Sample Crew Member A', 'Sample Crew Member B', 'Sample Striper'],
        equipment: ['Sealcoat spray rig', 'Blower and squeegees', 'Line striper', 'Arrow board, cones and barricades'],
        materials: [
          { item: 'Sealcoat emulsion', qty: '≈ 1,100 gal (sample)' },
          { item: 'Sand additive', qty: '≈ 2,200 lb (sample)' },
          { item: 'Traffic paint, white', qty: '≈ 25 gal (sample)' },
          { item: 'Traffic paint, blue (ADA)', qty: '≈ 3 gal (sample)' },
        ],
        weather: 'Dry, 66–74°F, no rain in the 24-hour forecast (sample)',
      },
      {
        id: 'J-804', sample: true, number: 'JOB-804 (sample)', leadId: 'L-705', quoteId: null, reportId: 'R-804', laneId: 'milling',
        title: 'Estimator site review: truck court', scheduledStart: at(-9, 10, 0), scheduledEnd: at(-9, 11, 0), technician: ESTIMATOR,
        status: 'report_ready', siteContact: 'Sample Warehouse Manager · 707-555-0175', accessNotes: 'Check in at the dock office; trucks run until 2pm.',
        scope: ['Measure the truck court and dock aprons', 'Mark failures and depths'], checklist: checklist('site_review', 7), photos: [],
        techNotes: 'Aprons failing at doors 3–6.', reportApprovedBy: 'Sample Estimator (sample sign-off)',
      },
      {
        id: 'J-805', sample: true, number: 'JOB-805 (sample)', leadId: 'L-703', quoteId: null, reportId: null, laneId: 'repair',
        title: 'Make safe: pothole in the main drive lane', scheduledStart: at(0, 9, 0), scheduledEnd: at(0, 10, 30), technician: FOREMAN,
        status: 'confirmed', siteContact: 'Sample Retail Owner · 707-555-0173', accessNotes: 'Entrance by the pharmacy; keep one lane open for customers.',
        scope: ['Cone off the hazard', 'Temporary cold patch', 'Measure for a permanent repair estimate'], checklist: checklist('repair', 0), photos: [],
        techNotes: '', reportApprovedBy: null,
        crew: [FOREMAN, 'Sample Crew Member B'], equipment: ['Service truck', 'Cones and barricades', 'Plate compactor'], materials: [{ item: 'Cold-patch asphalt', qty: '≈ 10 bags (sample)' }],
        weather: 'Dry (sample)',
      },
      {
        id: 'J-799', sample: true, number: 'JOB-799 (sample)', leadId: 'L-708', quoteId: 'Q-704', reportId: null, laneId: 'striping',
        title: 'Re-stripe 80 stalls and 2 ADA stalls', scheduledStart: at(-40, 7, 0), scheduledEnd: at(-40, 12, 0), technician: FOREMAN,
        status: 'report_ready', siteContact: 'Sample Facilities Lead · 707-555-0178', accessNotes: 'Lot closed Monday morning.',
        scope: ['Re-stripe 80 stalls', 'Repaint 2 ADA stalls with access aisles'], checklist: checklist('commercial', 11), photos: [],
        techNotes: 'Done by 11:30.', reportApprovedBy: 'Sample Office Coordinator (sample sign-off)',
      },
    ],
    reports: [
      {
        id: 'R-801', sample: true, kind: 'site_review', number: 'RPT-801 (sample)', jobId: 'J-801',
        property: PROPERTY,
        technician: { name: ESTIMATOR, credential: 'Estimator (sample)' },
        systems: [
          { id: 'A', type: 'Asphalt', location: 'Main lot, north', notes: '', staticPsi: '21,500 sq ft', residualPsi: 'Fair: cracking, faded striping', result: 'attention' },
          { id: 'B', type: 'Asphalt', location: 'East drive aisle', notes: '', staticPsi: '6,800 sq ft', residualPsi: 'Poor: alligator cracking, 2 potholes', result: 'fail' },
          { id: 'C', type: 'Asphalt', location: 'Rear lot', notes: '', staticPsi: '9,700 sq ft', residualPsi: 'Fair: ponding at the catch basin', result: 'attention' },
        ],
        items: review.map((label) => ({
          label,
          result: /Alligator|Potholes/.test(label) ? 'fail' : /Longitudinal|Drainage|striping|ADA|Raveling/.test(label) ? 'attention' : 'pass',
          note: /Alligator/.test(label)
            ? 'East drive aisle, approx. 640 sq ft. Remove and replace (marked area 1).'
            : /Potholes/.test(label)
              ? 'Two potholes in the east aisle (marked area 2); base failure suspected under one.'
              : /Longitudinal/.test(label)
                ? 'Throughout the main and rear lots, approx. 2,400 lf (marked area 3).'
                : /Drainage/.test(label)
                  ? 'Ponding at the rear catch basin (marked area 4). Drainage work is outside this scope; noted for the owner.'
                  : /striping/.test(label)
                    ? 'Stall lines and arrows faded (marked area 5).'
                    : /ADA/.test(label)
                      ? 'Four ADA stalls observed; markings worn. Owner to confirm layout requirements before repainting.'
                      : /Raveling/.test(label)
                        ? 'Surface wear across the main lot; sealcoat recommended after crack sealing.'
                        : /Truck access/.test(label)
                          ? 'Phase the work in halves; rear lot can carry overflow parking.'
                          : '',
        })),
        assemblies: [],
        markup: [
          { id: '1', label: 'Alligator cracking, approx. 640 sq ft — remove and replace', x: 66, y: 19, w: 22, h: 12, tone: 'red' },
          { id: '2', label: 'Two potholes in the east drive aisle', x: 70, y: 33, w: 9, h: 7, tone: 'red' },
          { id: '3', label: 'Longitudinal and transverse cracks, approx. 2,400 lf — crack seal', x: 8, y: 20, w: 52, h: 20, tone: 'amber' },
          { id: '4', label: 'Ponding at the rear catch basin (drainage outside this scope)', x: 18, y: 43, w: 16, h: 10, tone: 'blue' },
          { id: '5', label: 'Faded stall lines and ADA markings — re-stripe after sealcoat', x: 6, y: 5, w: 86, h: 12, tone: 'slate' },
        ],
        deficiencies: [
          'East drive aisle: alligator cracking and two potholes — remove and replace approx. 640 sq ft',
          'Cracking throughout the main and rear lots — crack seal approx. 2,400 lf',
          'Surface wear — two-coat sealcoat after crack sealing',
          'Faded striping and worn ADA markings — re-stripe to the owner-approved layout',
          'Rear-lot ponding at the catch basin — drainage outside this scope (owner to decide)',
        ],
        overall: 'attention',
        delivery: { owner: 'sent', ahj: 'not_required' },
        followUpQuoteId: 'Q-702',
        reviewedBy: 'Sample Estimator (sample review)',
      },
      {
        id: 'R-803', sample: true, kind: 'completion', number: 'RPT-803 (sample)', jobId: 'J-802',
        property: PROPERTY,
        technician: { name: FOREMAN, credential: 'Crew foreman (sample)' },
        systems: [
          { id: 'B-1', type: 'Remove and replace', location: 'East drive aisle', notes: '', staticPsi: '640 sq ft', residualPsi: 'Ticket SAMPLE-4471', result: 'pass' },
          { id: 'B-2', type: 'Base repair', location: 'East drive aisle', notes: '', staticPsi: '180 sq ft', residualPsi: 'Ticket SAMPLE-4472', result: 'pass' },
          { id: 'A + C', type: 'Crack seal', location: 'Main and rear lots', notes: '', staticPsi: '2,400 lf', residualPsi: 'Ticket SAMPLE-4478', result: 'pass' },
        ],
        items: completion.map((label) => ({
          label,
          result: /removed and replaced|Cracks|Site cleaned/.test(label) ? 'pass' : 'na',
          note: /Sealcoat|re-striped|ADA/.test(label) ? 'Phase 2 (scheduled).' : /Site cleaned/.test(label) ? 'East aisle reopened 2:45pm.' : '',
        })),
        assemblies: [],
        deficiencies: [],
        overall: 'pass',
        delivery: { owner: 'sent', ahj: 'not_required' },
        followUpQuoteId: null,
        reviewedBy: 'Sample Office Coordinator (sample review)',
      },
      {
        id: 'R-804', sample: true, kind: 'site_review', number: 'RPT-804 (sample)', jobId: 'J-804',
        property: {
          name: 'Sample Logistics (sample)', address: '500 Sample Industrial Way, Santa Rosa, CA', occupancy: 'Warehouse (sample)',
          buildingType: 'Industrial / warehouse', details: 'Truck court approx. 6,200 sq ft (sample)',
        },
        technician: { name: ESTIMATOR, credential: 'Estimator (sample)' },
        systems: [{ id: 'A', type: 'Asphalt', location: 'Truck court and dock aprons', notes: '', staticPsi: '6,200 sq ft', residualPsi: 'Poor: rutting and base failure at doors 3–6', result: 'fail' }],
        items: review.map((label) => ({ label, result: /Alligator|Potholes|Raveling/.test(label) ? 'fail' : 'pass', note: '' })),
        assemblies: [],
        deficiencies: ['Rutting and base failure at dock doors 3–6 — grind and overlay with base repair'],
        overall: 'fail',
        delivery: { owner: 'sent', ahj: 'not_required' },
        followUpQuoteId: 'Q-703',
        reviewedBy: 'Sample Estimator (sample review)',
      },
    ],
    invoices: [
      {
        id: 'I-903', sample: true, jobId: 'J-802', number: 'INV-2903 (sample)', siteAddress: PROPERTY.address,
        billTo: PROPERTY.name, issueDate: day(-4), dueDate: day(26),
        lines: [
          { category: 'Mobilization', description: 'Mobilization and traffic control (Phase 1 share)', unitPrice: 750, qty: 1 },
          { category: 'Patching', description: 'Remove and replace failed asphalt (2")', unitPrice: 9, qty: 640 },
          { category: 'Patching', description: 'Base repair under failed areas', unitPrice: 6, qty: 180 },
          { category: 'Crack sealing', description: 'Crack sealing, hot pour', unitPrice: 1, qty: 2400 },
        ],
        amountPaid: 0, status: 'sent', reportIds: ['R-803'], followUp: 'Phase 1 progress invoice; reminder 7 days before due (a person sends it)',
      },
      {
        id: 'I-904', sample: true, jobId: 'J-799', number: 'INV-2879 (sample)', siteAddress: '800 Sample Street, Santa Rosa, CA',
        billTo: 'Sample Community Church (sample)', issueDate: day(-39), dueDate: day(-9),
        lines: [
          { category: 'Striping', description: 'Re-stripe parking stalls', unitPrice: 8, qty: 80 },
          { category: 'ADA and traffic markings', description: 'ADA stall and access aisle markings', unitPrice: 150, qty: 2 },
        ],
        amountPaid: 940, status: 'paid', reportIds: [], followUp: 'Paid in full (sample)',
      },
    ],
  }
}
