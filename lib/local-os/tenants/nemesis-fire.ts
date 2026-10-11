/**
 * Nemesis Fire — fire-protection reference tenant of the Local OS vertical sales preview
 * (private alpha).
 *
 * Business facts and site copy come from the client's own public site
 * (xenflashbox/nemesisfire.com: website/lib/constants.ts, components/about.tsx, hero.tsx).
 * Nothing about the business is invented. Every lead, estimate, job, report and invoice below
 * is SAMPLE data with fictional names, properties and placeholder prices — not his real
 * customers, rates, certifications or filings.
 */
import type { DemoChecklistItem, DemoState } from '@/lib/local-os/demo-types'
import type { TenantConfig } from '@/lib/local-os/tenant-types'
import { tenantAsset } from '@/lib/local-os/tenant-media'
import { FIRE_PROTECTION } from '@/lib/local-os/verticals/fire-protection'

// Logical keys only: the files live in the private tenant-media bucket (tenants/nemesis-fire/...),
// served through the gated /os-media route. No tenant media is committed to this public repo.
const BRAND = tenantAsset('nemesis-fire', 'brand')
const MEDIA = tenantAsset('nemesis-fire', 'media')

export const NEMESIS_FIRE: TenantConfig = {
  slug: 'nemesis-fire',
  name: 'Nemesis Fire',
  owner: 'Alejandro “Alex” Mendoza Ruiz',
  license: 'C16 Lic# 1036129',
  phone: '707-495-5051',
  region: 'Santa Rosa · Sonoma County · North Bay',
  established: 2020,
  verticalKey: FIRE_PROTECTION.key,
  // Brand system supplied by the founder 2026-10-11 (charcoal #111111, fire red #D10505, white #FAFAFA).
  // File names describe the ARTWORK colour, not the background: "color-light" has white letterforms
  // and belongs on dark surfaces; "color-dark" has charcoal letterforms and belongs on light ones.
  branding: {
    primary: '#D10505',
    primaryDark: '#A30404',
    surface: '#111111',
    light: '#FAFAFA',
    typography: 'industrial',
    logos: {
      wordmarkOnLight: `${BRAND}/nemesis-wordmark-color-dark.svg`,
      wordmarkOnDark: `${BRAND}/nemesis-wordmark-color-light.svg`,
      shieldOnLight: `${BRAND}/nemesis-shield-color-dark.svg`,
      shieldOnDark: `${BRAND}/nemesis-shield-color-light.svg`,
      wordmarkMonoBlack: `${BRAND}/nemesis-wordmark-1c-black.svg`,
      wordmarkMonoWhite: `${BRAND}/nemesis-wordmark-1c-white.svg`,
      shieldMonoBlack: `${BRAND}/nemesis-shield-1c-black.svg`,
      shieldMonoWhite: `${BRAND}/nemesis-shield-1c-white.svg`,
      favicon: `${BRAND}/nemesis-shield-color-dark.svg`,
    },
  },
  laneIds: ['sprinkler', 'backflow', 'extinguisher', 'emergency'],
  site: {
    tagline: 'Be Proactive. Not Reactive.',
    heroTitle: 'Fire protection for Sonoma County and the North Bay',
    heroSubtitle:
      'Professional fire protection services for residential & commercial properties in Sonoma County and the North Bay.',
    credibility: [
      'California C16 fire protection contractor · Lic# 1036129',
      'Serving Santa Rosa and the North Bay since 2020',
      'Inspection, testing, maintenance and repair for residential and commercial properties',
    ],
    serviceAreas: ['Santa Rosa', 'Sonoma County', 'the greater North Bay'],
    emergencyLine: 'Sprinkler leaking or system activated? Call the office now.',
    aboutTitle: 'Providing Solutions, Not Just Services.',
    aboutBody:
      'Nemesis Fire is a team of licensed fire protection professionals serving Santa Rosa, Sonoma County, and the greater North Bay area. We provide fire prevention solutions — from system installation to inspection, testing, maintenance and repair.',
    process: [
      { title: 'Request service', body: 'Tell us about your property and what you need.' },
      { title: 'Schedule an appointment', body: 'We come to your site at a time that works for you.' },
      { title: 'Problem solved', body: 'We diagnose and resolve the issue, with a full report and recommendations for ongoing protection.' },
    ],
  },
  // Only the client's own job photography (curated package, 2026-10-11): resized, EXIF/GPS stripped.
  // Clips are the final supplied files, losslessly remuxed only to drop container metadata
  // (decoded frames identical to the supplied files).
  media: {
    hero: { src: `${MEDIA}/hero-pump-room.jpg`, alt: 'Nemesis Fire technician recording readings beside a fire pump', focus: '62% 50%' },
    about: { src: `${MEDIA}/technician-sprinkler.jpg`, alt: 'Nemesis Fire technician working on a sprinkler riser', focus: '50% 30%' },
    lanes: {
      sprinkler: { src: `${MEDIA}/pump-room-wide-01.jpg`, alt: 'Technician servicing fire sprinkler piping in a pump room', focus: '40% 45%' },
      backflow: { src: `${MEDIA}/backflow-valve.jpg`, alt: 'Technician at a sprinkler riser and backflow assembly in the field', focus: '55% 40%' },
      extinguisher: { src: `${MEDIA}/extinguisher-truck-01.jpg`, alt: 'Fire extinguishers being serviced from the Nemesis Fire service van', focus: '50% 60%' },
      emergency: { src: `${MEDIA}/gallery-01.jpg`, alt: 'Overhead fire sprinkler pipe run', focus: '50% 40%' },
    },
    // Final tenant-approved clips + posters (2026-10-11). Copy stays in the UI; nothing is baked in.
    proof: [
      {
        id: 'field-ready',
        title: 'Field-ready response and equipment',
        body: 'Test equipment staged at the truck and hose run out to the system before work starts.',
        video: { src: `${MEDIA}/field-equipment-loop.mp4`, poster: `${MEDIA}/field-equipment-poster.png`, alt: 'Red test manifold on a service truck hitch with hoses run across a parking lot' },
        laneId: 'emergency',
        links: [
          { label: 'Request service', path: '/request?lane=emergency', view: 'customer' },
          { label: 'Job in the office', path: '/office/jobs/J-302', view: 'office' },
        ],
      },
      {
        id: 'sprinkler-inspection',
        title: 'Fire sprinkler inspection and testing',
        body: 'Sprinkler piping checked run by run; every item is recorded on the inspection report.',
        video: { src: `${MEDIA}/sprinkler-inspection-loop.mp4`, poster: `${MEDIA}/sprinkler-inspection-poster.png`, alt: 'Orange fire sprinkler pipe running through roof framing' },
        laneId: 'sprinkler',
        links: [
          { label: 'Request an inspection', path: '/request?lane=sprinkler', view: 'customer' },
          { label: 'Sample inspection report', path: '/report/R-501', view: 'customer' },
        ],
      },
      {
        id: 'riser-pump',
        title: 'Fire riser and pump service',
        body: 'Valves, hoses and riser room equipment worked on site, with readings captured on the technician’s phone.',
        video: { src: `${MEDIA}/fire-riser-service-loop.mp4`, poster: `${MEDIA}/fire-riser-service-poster.png`, alt: 'Technician working a hose and valve, then inside a riser room with red equipment cabinets' },
        laneId: 'sprinkler',
        links: [
          { label: 'Technician job packet', path: '/tech/J-301', view: 'technician' },
          { label: 'Office report review', path: '/office/reports/R-502', view: 'office' },
        ],
      },
    ],
  },
  tour: [
    { label: 'Customer website', detail: 'Branded homepage with emergency direction and request CTA', path: '' },
    { label: 'Service detail', detail: 'Fire sprinkler systems', path: '/services/fire-sprinkler-systems' },
    { label: 'Request service', detail: 'Guided intake: property, service, urgency, contact', path: '/request' },
    { label: 'Estimate approval', detail: 'Customer reviews and approves recommended repairs', path: '/estimate/Q-203' },
    { label: 'Job status', detail: 'Request → scheduled → report → approved → complete → invoice', path: '/status/L-107' },
    { label: 'Inspection report', detail: 'Five-year sprinkler inspection (sample)', path: '/report/R-501' },
    { label: 'Backflow report', detail: 'Multiple assemblies with readings (sample)', path: '/report/R-503' },
    { label: 'Invoice', detail: 'Line items, balance, linked work order and report', path: '/invoice/I-403' },
    { label: 'Office dashboard', detail: 'What needs a person today', path: '/office' },
    { label: 'Request queue', detail: 'Callbacks, follow-ups, estimates', path: '/office/requests' },
    { label: 'Technician app', detail: 'Backflow job: checklist, readings, photos', path: '/tech/J-301' },
  ],
  aiDemo: true,
  website: 'https://nemesisfire.com',
  previewOnly: true,
}

function checklist(laneId: string, doneCount = 0): DemoChecklistItem[] {
  return (FIRE_PROTECTION.checklists[laneId] ?? []).map((item, i) => ({
    id: `${laneId}-${i}`,
    section: item.section,
    label: item.label,
    done: i < doneCount,
  }))
}

const TECH = { name: 'Sample Technician', credential: 'Certified backflow tester no. SAMPLE-0000 (sample)' }

/** Dates are relative to when the preview is opened, so "today" always has work on it. */
export function seedNemesisFire(now: Date = new Date()): DemoState {
  // Wall-clock times in Pacific (where every job is), whatever time zone the viewer's browser is in.
  const at = (days: number, hour: number, minute = 0) => {
    const day = new Date(now.getTime() + days * 864e5).toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' })
    const guess = new Date(`${day}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00Z`)
    const pacific = new Date(guess.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }))
    const utc = new Date(guess.toLocaleString('en-US', { timeZone: 'UTC' }))
    return new Date(guess.getTime() + (utc.getTime() - pacific.getTime())).toISOString()
  }
  const day = (days: number) => at(days, 12).slice(0, 10)
  const five = FIRE_PROTECTION.reportTemplates[0]?.items ?? []

  return {
    leads: [
      {
        id: 'L-101', sample: true, createdAt: at(0, 7, 40), name: 'Sample Facilities Manager', company: 'Sample Cold Storage Co. (sample)',
        phone: '707-555-0101', email: 'facilities@example.com', address: '100 Sample Industrial Way, Santa Rosa, CA',
        buildingType: 'Warehouse / industrial', laneId: 'emergency', workType: 'Active leak or broken pipe', urgency: 'emergency',
        notes: 'Water dripping from a sprinkler line above the loading dock. Called the office.', fields: { systemType: 'Wet pipe' },
        status: 'contacted', nextAction: 'Emergency handled by phone: confirm technician arrival', dueAt: at(0, 9, 0), source: 'phone',
      },
      {
        id: 'L-102', sample: true, createdAt: at(-1, 15, 10), name: 'Sample Property Manager', company: 'Sample Apartments (sample)',
        phone: '707-555-0102', email: 'manager@example.com', address: '200 Sample Avenue, Rohnert Park, CA',
        buildingType: 'Multi-family / apartments', laneId: 'sprinkler', workType: 'Annual inspection (NFPA 25 scope)', urgency: 'routine',
        notes: 'Three buildings, wet systems. Last inspection over a year ago.', fields: { risers: '3', units: '36', systemType: 'Wet pipe' },
        status: 'quoted', nextAction: 'Review the draft estimate before it is sent', dueAt: at(0, 13, 0), source: 'website form',
      },
      {
        id: 'L-103', sample: true, createdAt: at(-1, 10, 5), name: 'Sample Restaurant Owner', company: 'Sample Bistro (sample)',
        phone: '707-555-0103', email: null, address: '300 Sample Street, Petaluma, CA', buildingType: 'Restaurant / commercial kitchen',
        laneId: 'extinguisher', workType: 'Annual inspection and tagging (NFPA 10 scope)', urgency: 'soon',
        notes: 'Eight extinguishers, one discharged last week.', fields: { extinguishers: '8' },
        status: 'callback', nextAction: 'Call back to confirm unit count and a time', dueAt: at(0, 11, 30), source: 'website form',
      },
      {
        id: 'L-104', sample: true, createdAt: at(-3, 9, 0), name: 'Sample Homeowner', company: null, phone: '707-555-0104',
        email: 'homeowner@example.com', address: '400 Sample Lane, Windsor, CA', buildingType: 'Single-family home', laneId: 'sprinkler',
        workType: 'Maintenance or head replacement', urgency: 'routine', notes: 'Two heads were painted over during a remodel.', fields: {},
        status: 'follow_up', nextAction: 'Follow up: no answer on first call', dueAt: at(-1, 16, 0), source: 'referral',
      },
      {
        id: 'L-105', sample: true, createdAt: at(-6, 14, 0), name: 'Sample School Office', company: 'Sample Charter School (sample)',
        phone: '707-555-0105', email: 'office@example.com', address: '500 Sample Road, Sebastopol, CA', buildingType: 'School / assembly',
        laneId: 'backflow', workType: 'Annual backflow test', urgency: 'routine', notes: 'Three assemblies; test due before term starts.',
        fields: { assemblies: '3' }, status: 'won', nextAction: 'Job scheduled', dueAt: null, source: 'website form',
      },
      {
        id: 'L-106', sample: true, createdAt: at(-8, 11, 0), name: 'Sample Office Tenant', company: 'Sample Offices (sample)',
        phone: '707-555-0106', email: null, address: '600 Sample Plaza, Santa Rosa, CA', buildingType: 'Office / retail', laneId: 'extinguisher',
        workType: 'Recharge after use', urgency: 'soon', notes: 'Decided to stay with their current vendor.', fields: {},
        status: 'lost', nextAction: 'None', dueAt: null, source: 'phone',
      },
      {
        id: 'L-107', sample: true, createdAt: at(-14, 9, 30), name: 'Sample Practice Manager', company: 'Sample Medical Offices (sample)',
        phone: '707-555-0107', email: 'practice@example.com', address: '700 Sample Medical Drive, Santa Rosa, CA',
        buildingType: 'Healthcare / care facility', laneId: 'sprinkler', workType: 'Five-year inspection (NFPA 25 scope)', urgency: 'routine',
        notes: 'Two-story medical office, one wet riser. Five-year inspection due this quarter.', fields: { risers: '1', systemType: 'Wet pipe' },
        status: 'won', nextAction: 'Waiting on customer approval of repair estimate', dueAt: at(1, 10, 0), source: 'website form',
      },
      {
        id: 'L-108', sample: true, createdAt: at(-30, 10, 0), name: 'Sample Facilities Director', company: 'Sample Senior Living (sample)',
        phone: '707-555-0108', email: 'facilities@example.org', address: '800 Sample Oaks Court, Healdsburg, CA',
        buildingType: 'Healthcare / care facility', laneId: 'backflow', workType: 'Annual backflow test', urgency: 'routine',
        notes: 'Two assemblies at the street.', fields: { assemblies: '2' }, status: 'won', nextAction: 'Complete: invoice paid', dueAt: null, source: 'referral',
      },
    ],
    quotes: [
      {
        id: 'Q-201', sample: true, leadId: 'L-102', number: 'EST-201 (sample)', laneId: 'sprinkler',
        scope: 'Annual inspection of wet sprinkler systems at three buildings; report of findings.',
        lines: [
          { label: 'Annual sprinkler inspection (per riser)', unit: 'riser', qty: 3, unitPrice: 250 },
          { label: 'Unit inspection', unit: 'dwelling unit', qty: 36, unitPrice: 20 },
        ],
        status: 'draft', reviewedBy: null, reviewNote: '', fromReportId: null, customerApproval: null,
      },
      {
        id: 'Q-202', sample: true, leadId: 'L-105', number: 'EST-202 (sample)', laneId: 'backflow',
        scope: 'Annual test of three backflow assemblies with water purveyor report submission.',
        lines: [
          { label: 'Backflow test: RP assembly', unit: 'device', qty: 1, unitPrice: 125 },
          { label: 'Backflow test: DC / DCDA assembly', unit: 'device', qty: 1, unitPrice: 110 },
          { label: 'Backflow test: PVB assembly', unit: 'device', qty: 1, unitPrice: 95 },
          { label: 'Test reports submitted to the water purveyor', unit: 'submission', qty: 1, unitPrice: 40 },
        ],
        status: 'accepted', reviewedBy: 'Alex (sample sign-off)', reviewNote: 'Confirmed assembly count by phone.', fromReportId: null,
        customerApproval: 'Sample School Office',
      },
      {
        id: 'Q-203', sample: true, leadId: 'L-107', number: 'EST-203 (sample)', laneId: 'emergency',
        scope: 'Corrections recommended in the five-year inspection report R-501: replace corroded heads, replace failed gauge, supply spare-head wrench.',
        lines: [
          { label: 'Sprinkler head replacement', unit: 'head', qty: 4, unitPrice: 45 },
          { label: 'Gauge replacement', unit: 'gauge', qty: 1, unitPrice: 40 },
          { label: 'Spare-head cabinet wrench', unit: 'each', qty: 1, unitPrice: 25 },
          { label: 'Repair labor', unit: 'hour', qty: 2, unitPrice: 145 },
        ],
        status: 'sent', reviewedBy: 'Alex (sample sign-off)', reviewNote: 'From inspection findings; heads confirmed on site.', fromReportId: 'R-501',
        customerApproval: null,
      },
      {
        id: 'Q-204', sample: true, leadId: 'L-108', number: 'EST-204 (sample)', laneId: 'backflow',
        scope: 'Annual test of two backflow assemblies with water purveyor report submission.',
        lines: [
          { label: 'Backflow test: DC / DCDA assembly', unit: 'device', qty: 2, unitPrice: 110 },
          { label: 'Test reports submitted to the water purveyor', unit: 'submission', qty: 1, unitPrice: 40 },
        ],
        status: 'accepted', reviewedBy: 'Alex (sample sign-off)', reviewNote: '', fromReportId: null, customerApproval: 'Sample Facilities Director',
      },
    ],
    jobs: [
      {
        id: 'J-301', sample: true, number: 'JOB-301 (sample)', leadId: 'L-105', quoteId: 'Q-202', reportId: 'R-502', laneId: 'backflow',
        title: 'Annual backflow test: 3 assemblies', scheduledStart: at(0, 10, 0), scheduledEnd: at(0, 11, 30), technician: TECH.name,
        status: 'confirmed', siteContact: 'Sample School Office · 707-555-0105',
        accessNotes: 'Assemblies: north gate enclosure (locked; office has the key), boiler room, irrigation by the field.',
        scope: ['Test 3 backflow assemblies and record readings', 'Prepare results for water purveyor submission'],
        checklist: checklist('backflow'), photos: [], techNotes: '', reportApprovedBy: null,
      },
      {
        id: 'J-302', sample: true, number: 'JOB-302 (sample)', leadId: 'L-101', quoteId: null, reportId: null, laneId: 'emergency',
        title: 'Emergency repair: leaking line at the loading dock', scheduledStart: at(0, 8, 30), scheduledEnd: at(0, 11, 0),
        technician: TECH.name, status: 'in_progress', siteContact: 'Sample Facilities Manager · 707-555-0101',
        accessNotes: 'Check in at the guard shack. The dock area is active; wear high-visibility gear.',
        scope: ['Make safe and stop the leak', 'Repair the failed section', 'Restore the system to service'],
        checklist: checklist('emergency', 2), photos: [], techNotes: 'Zone isolated at 8:52; site contact informed.', reportApprovedBy: null,
      },
      {
        id: 'J-303', sample: true, number: 'JOB-303 (sample)', leadId: 'L-103', quoteId: null, reportId: null, laneId: 'extinguisher',
        title: 'Extinguisher annual inspection: 8 units', scheduledStart: at(2, 14, 0), scheduledEnd: at(2, 15, 30), technician: TECH.name,
        status: 'scheduled', siteContact: 'Sample Restaurant Owner · 707-555-0103',
        accessNotes: 'Arrive before the dinner service; kitchen units are behind the line.',
        scope: ['Inspect 8 portable extinguishers', 'Recharge the discharged unit', 'List any units needing replacement'],
        checklist: checklist('extinguisher'), photos: [], techNotes: '', reportApprovedBy: null,
      },
      {
        id: 'J-304', sample: true, number: 'JOB-304 (sample)', leadId: 'L-107', quoteId: null, reportId: 'R-501', laneId: 'sprinkler',
        title: 'Five-year sprinkler inspection', scheduledStart: at(-7, 9, 0), scheduledEnd: at(-7, 12, 0), technician: TECH.name,
        status: 'report_ready', siteContact: 'Sample Practice Manager · 707-555-0107',
        accessNotes: 'Riser room off the rear corridor; arrive before patients at 8:30.',
        scope: ['Five-year inspection of one wet riser (NFPA 25 scope)', 'Report of observations and recommended corrections'],
        checklist: checklist('sprinkler', 9), photos: [], techNotes: 'Four corroded heads in the rear stairwell; system gauge reading erratic.',
        reportApprovedBy: 'Alex (sample sign-off)',
      },
      {
        id: 'J-305', sample: true, number: 'JOB-305 (sample)', leadId: 'L-108', quoteId: 'Q-204', reportId: 'R-503', laneId: 'backflow',
        title: 'Annual backflow test: 2 assemblies', scheduledStart: at(-21, 13, 0), scheduledEnd: at(-21, 14, 0), technician: TECH.name,
        status: 'report_ready', siteContact: 'Sample Facilities Director · 707-555-0108', accessNotes: 'Both assemblies at the street frontage.',
        scope: ['Test 2 backflow assemblies', 'Water purveyor report submission'], checklist: checklist('backflow', 7), photos: [],
        techNotes: 'Both assemblies passed.', reportApprovedBy: 'Alex (sample sign-off)',
      },
    ],
    reports: [
      {
        id: 'R-501', sample: true, kind: 'sprinkler_5yr', number: 'RPT-501 (sample)', jobId: 'J-304',
        property: {
          name: 'Sample Medical Offices (sample)', address: '700 Sample Medical Drive, Santa Rosa, CA', occupancy: 'Business (medical office)',
          buildingType: 'Healthcare / care facility', details: 'Two stories · approx. 14,000 sq ft (sample)',
        },
        technician: { name: TECH.name, credential: 'Technician (sample)' },
        cover: {
          occupancyClass: 'B (sample)', constructionType: 'V-B (sample)', stories: '2', yearBuilt: '2004 (sample)', jobNumber: 'SAMPLE-0501',
          systemsInspected: [
            { system: 'Automatic sprinkler system', status: 'attention' },
            { system: 'Standpipe and hose system', status: 'na' },
            { system: 'Fire pump', status: 'na' },
          ],
        },
        systems: [{ id: 'Riser 1', type: 'Wet pipe', location: 'Riser room, rear corridor', notes: 'Main drain test', staticPsi: '68', residualPsi: '61', result: 'pass' }],
        items: five.map((label) => ({
          label,
          result: /Sprinklers, pipe/.test(label) ? 'fail' : /Gauges/.test(label) ? 'attention' : /Spare sprinklers/.test(label) ? 'attention' : 'pass',
          note: /Sprinklers, pipe/.test(label)
            ? 'Four heads corroded in the rear stairwell.'
            : /Gauges/.test(label)
              ? 'System-side gauge reading erratic; recommend replacement.'
              : /Spare sprinklers/.test(label)
                ? 'Cabinet stocked; wrench missing.'
                : /alarm test/.test(label)
                  ? 'Alarm at 48 seconds (sample).'
                  : '',
        })),
        assemblies: [],
        deficiencies: ['Four corroded sprinkler heads, rear stairwell', 'System-side gauge reading erratic', 'Spare-head cabinet wrench missing'],
        overall: 'attention',
        delivery: { owner: 'sent', ahj: 'not_submitted' },
        followUpQuoteId: 'Q-203',
        reviewedBy: 'Alex (sample sign-off)',
      },
      {
        id: 'R-502', sample: true, kind: 'backflow', number: 'RPT-502 (sample)', jobId: 'J-301',
        property: {
          name: 'Sample Charter School (sample)', address: '500 Sample Road, Sebastopol, CA', occupancy: 'Educational',
          buildingType: 'School / assembly', details: 'Three assemblies (sample)',
        },
        technician: TECH,
        systems: [],
        items: [],
        assemblies: [
          { id: 'A1', type: 'RP', size: '2"', make: 'Sample Make', model: 'RP-200', serial: 'SN-SAMPLE-001', location: 'North gate enclosure', check1: '', check2: '', relief: '', result: 'pending', meterNo: 'M-SAMPLE-11', linePressure: '' },
          { id: 'A2', type: 'DCDA', size: '4"', make: 'Sample Make', model: 'DCDA-400', serial: 'SN-SAMPLE-002', location: 'Boiler room', check1: '', check2: '', relief: '', result: 'pending', meterNo: 'M-SAMPLE-12', linePressure: '' },
          { id: 'A3', type: 'PVB', size: '1"', make: 'Sample Make', model: 'PVB-100', serial: 'SN-SAMPLE-003', location: 'Irrigation, by the field', check1: '', check2: '', relief: '', result: 'pending', meterNo: 'M-SAMPLE-13', linePressure: '' },
        ],
        deficiencies: [],
        overall: 'pending',
        delivery: { owner: 'not_sent', ahj: 'not_submitted' },
        followUpQuoteId: null,
        reviewedBy: null,
      },
      {
        id: 'R-503', sample: true, kind: 'backflow', number: 'RPT-503 (sample)', jobId: 'J-305',
        property: {
          name: 'Sample Senior Living (sample)', address: '800 Sample Oaks Court, Healdsburg, CA', occupancy: 'Residential care',
          buildingType: 'Healthcare / care facility', details: 'Two assemblies (sample)',
        },
        technician: TECH,
        systems: [],
        items: [],
        assemblies: [
          { id: 'A1', type: 'DCDA', size: '6"', make: 'Sample Make', model: 'DCDA-600', serial: 'SN-SAMPLE-101', location: 'Street frontage, fire service', check1: '2.4 psid (sample)', check2: '1.6 psid (sample)', relief: 'n/a', result: 'pass', meterNo: 'M-SAMPLE-21', linePressure: '64 psi (sample)', testedBy: 'Sample Technician · cert. SAMPLE-0000' },
          { id: 'A2', type: 'DC', size: '2"', make: 'Sample Make', model: 'DC-200', serial: 'SN-SAMPLE-102', location: 'Street frontage, domestic', check1: '2.1 psid (sample)', check2: '1.4 psid (sample)', relief: 'n/a', result: 'pass', meterNo: 'M-SAMPLE-22', linePressure: '64 psi (sample)', testedBy: 'Sample Technician · cert. SAMPLE-0000' },
        ],
        deficiencies: [],
        overall: 'pass',
        delivery: { owner: 'sent', ahj: 'submitted' },
        followUpQuoteId: null,
        reviewedBy: 'Alex (sample sign-off)',
      },
    ],
    invoices: [
      {
        id: 'I-401', sample: true, jobId: 'J-301', number: 'INV-1041 (sample)', siteAddress: '500 Sample Road, Sebastopol, CA',
        billTo: 'Sample Charter School (sample)', issueDate: day(0), dueDate: day(30),
        lines: [
          { category: 'Service', description: 'Backflow test: RP assembly', unitPrice: 125, qty: 1 },
          { category: 'Service', description: 'Backflow test: DC / DCDA assembly', unitPrice: 110, qty: 1 },
          { category: 'Service', description: 'Backflow test: PVB assembly', unitPrice: 95, qty: 1 },
          { category: 'Shop time', description: 'Test reports submitted to the water purveyor', unitPrice: 40, qty: 1 },
        ],
        amountPaid: 0, status: 'draft', reportIds: ['R-502'], followUp: 'Send after the backflow report is reviewed',
      },
      {
        id: 'I-403', sample: true, jobId: 'J-304', number: 'INV-1043 (sample)', siteAddress: '700 Sample Medical Drive, Santa Rosa, CA',
        billTo: 'Sample Medical Offices (sample)', issueDate: day(-6), dueDate: day(24),
        lines: [
          { category: 'Service', description: 'Five-year water-based sprinkler inspection', unitPrice: 650, qty: 1 },
          { category: 'Service', description: 'Gauge replacement', unitPrice: 40, qty: 1 },
          { category: 'Service', description: 'Sprinkler head cleaning', unitPrice: 10, qty: 6 },
          { category: 'Service', description: 'Cover plate replacement', unitPrice: 8, qty: 2 },
          { category: 'Service', description: 'Extinguisher annual service', unitPrice: 12, qty: 4 },
        ],
        amountPaid: 0, status: 'sent', reportIds: ['R-501'], followUp: 'Due in 24 days; reminder at 7 days before due (a person sends it)',
      },
      {
        id: 'I-404', sample: true, jobId: 'J-305', number: 'INV-1038 (sample)', siteAddress: '800 Sample Oaks Court, Healdsburg, CA',
        billTo: 'Sample Senior Living (sample)', issueDate: day(-20), dueDate: day(10),
        lines: [
          { category: 'Service', description: 'Backflow test: DC / DCDA assembly', unitPrice: 110, qty: 2 },
          { category: 'Shop time', description: 'Test reports submitted to the water purveyor', unitPrice: 40, qty: 1 },
        ],
        amountPaid: 260, status: 'paid', reportIds: ['R-503'], followUp: 'Paid in full (sample)',
      },
      {
        id: 'I-398', sample: true, jobId: 'J-299', number: 'INV-1031 (sample)', siteAddress: '900 Sample Market Street, Santa Rosa, CA',
        billTo: 'Sample Market (sample)', issueDate: day(-45), dueDate: day(-15),
        lines: [{ description: 'Extinguisher annual service', unitPrice: 12, qty: 40 }],
        amountPaid: 0, status: 'overdue', reportIds: [], followUp: 'Second reminder due: a person sends it',
      },
    ],
  }
}
