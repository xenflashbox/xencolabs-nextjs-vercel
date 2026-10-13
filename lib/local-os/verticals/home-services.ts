/**
 * Home-services trade module for prospect previews (window & gutter cleaning, exterior cleaning,
 * landscaping). Unlike the fixed fire-protection and paving modules, its LANES ARE THE BUSINESS'S OWN
 * VERIFIED SERVICES (from the prospect profile); each service's `kind` selects the technician checklist
 * and the sample line items used in the fictional workflow documents.
 *
 * Nothing here is a claim about the business: service-page copy comes from the business's website, and
 * the workflow text describes how Local OS would run the request in this preview. Every price is a
 * sample price on a document marked as a fictional sample.
 */
import type { ProspectProfile, ServiceKind } from '@/lib/local-os/prospect/types'
import type { ChecklistTemplateItem, IntakeField, LineItemFamily, VerticalPack } from '@/lib/local-os/tenant-types'

const C = (section: ChecklistTemplateItem['section'], label: string): ChecklistTemplateItem => ({ section, label })

const ARRIVAL = [C('prep', 'Check in with the customer; confirm the areas in scope'), C('safety', 'Ladder and access plan checked; pets and plants protected')]
const WRAP = [C('completion', 'Walk the finished work with the customer'), C('completion', 'Before and after photos attached to the record')]

const KIND_STEPS: Record<ServiceKind, ChecklistTemplateItem[]> = {
  windows: [C('work', 'Exterior glass cleaned; frames and sills wiped'), C('work', 'Interior glass cleaned where booked'), C('work', 'Hard-water spots noted for the customer')],
  gutters: [C('work', 'Gutters cleared of leaves and debris'), C('work', 'Downspouts flushed and flow checked'), C('work', 'Debris bagged and removed from site')],
  screens: [C('work', 'Screens removed, rinsed and reinstalled'), C('work', 'Tracks vacuumed and wiped')],
  roof: [C('work', 'Roof surface cleaned with the agreed method'), C('safety', 'Fall protection in place on the roof')],
  solar: [C('work', 'Panels rinsed with pure water'), C('work', 'Array condition noted for the customer')],
  pressure: [C('work', 'Surfaces pre-treated and pressure washed'), C('work', 'Runoff managed; nearby plants rinsed')],
  softwash: [C('work', 'Low-pressure soft wash applied and rinsed'), C('work', 'Windows and fixtures rinsed after washing')],
  deck_fence: [C('work', 'Wood cleaned and prepared'), C('work', 'Stain or sealer applied; dry time recorded')],
  dryer_vent: [C('work', 'Vent line cleaned from inside to outside'), C('work', 'Airflow checked at the exterior hood')],
  landscape_build: [C('work', 'Layout confirmed against the approved plan'), C('work', 'Materials installed per plan; quantities recorded')],
  landscape_maint: [C('work', 'Mowing, edging and pruning per the visit plan'), C('work', 'Green waste removed')],
  irrigation: [C('work', 'Zones run and checked'), C('work', 'Repairs recorded with parts used')],
  turf: [C('work', 'Turf brushed and infill checked'), C('work', 'Seams and edges inspected')],
  hardscape: [C('work', 'Base prepared and compacted'), C('work', 'Pavers or stone set and joints filled')],
  other: [C('work', 'Work completed per the approved estimate')],
}

const KIND_LINES: Record<ServiceKind, { description: string; unit: string; sampleUnitPrice: number }[]> = {
  windows: [{ description: 'Exterior window cleaning', unit: 'visit', sampleUnitPrice: 240 }, { description: 'Interior window cleaning', unit: 'visit', sampleUnitPrice: 160 }],
  gutters: [{ description: 'Gutter and downspout cleaning', unit: 'visit', sampleUnitPrice: 210 }],
  screens: [{ description: 'Screen and track cleaning', unit: 'window', sampleUnitPrice: 6 }],
  roof: [{ description: 'Roof cleaning', unit: 'visit', sampleUnitPrice: 450 }],
  solar: [{ description: 'Solar panel cleaning', unit: 'panel', sampleUnitPrice: 8 }],
  pressure: [{ description: 'Pressure washing: driveway and walkways', unit: 'visit', sampleUnitPrice: 280 }],
  softwash: [{ description: 'House soft wash', unit: 'visit', sampleUnitPrice: 420 }],
  deck_fence: [{ description: 'Deck cleaning and staining', unit: 'sq ft', sampleUnitPrice: 3 }],
  dryer_vent: [{ description: 'Dryer vent cleaning', unit: 'vent', sampleUnitPrice: 140 }],
  landscape_build: [{ description: 'Landscape installation', unit: 'sq ft', sampleUnitPrice: 12 }],
  landscape_maint: [{ description: 'Landscape maintenance visit', unit: 'visit', sampleUnitPrice: 180 }],
  irrigation: [{ description: 'Irrigation repair', unit: 'hour', sampleUnitPrice: 95 }],
  turf: [{ description: 'Artificial turf installation', unit: 'sq ft', sampleUnitPrice: 11 }],
  hardscape: [{ description: 'Paver installation', unit: 'sq ft', sampleUnitPrice: 24 }],
  other: [{ description: 'Service visit', unit: 'visit', sampleUnitPrice: 200 }],
}

const SEL = (key: string, label: string, options: string[]) => ({ key, label, kind: 'select' as const, options })
const STORIES = SEL('stories', 'Number of stories', ['1', '2', '3+'])
/** Estimate questions per kind of service, asked only for the services of that kind. */
const KIND_FIELDS: Record<ServiceKind, Omit<IntakeField, 'laneIds'>[]> = {
  windows: [STORIES, SEL('window_count', 'About how many windows?', ['Under 15', '15–30', '30+', 'Not sure']), SEL('window_sides', 'Which sides?', ['Outside only', 'Inside and out'])],
  gutters: [STORIES, SEL('gutter_guards', 'Gutter guards?', ['No guards', 'Has gutter guards', 'Not sure'])],
  screens: [SEL('screen_count', 'About how many screens?', ['Under 10', '10–25', '25+', 'Not sure'])],
  roof: [STORIES, SEL('roof_type', 'Roof type', ['Composition shingle', 'Tile', 'Flat / low slope', 'Not sure'])],
  solar: [SEL('panel_count', 'About how many panels?', ['Under 15', '15–30', '30+', 'Not sure']), SEL('panel_location', 'Where are the panels?', ['Roof', 'Ground mount', 'Carport / commercial'])],
  pressure: [{ key: 'surfaces', label: 'Surfaces to wash (driveway, patio, walkways, siding…)', kind: 'text' }],
  softwash: [STORIES, SEL('siding', 'Siding', ['Stucco', 'Wood', 'Vinyl', 'Brick / stone', 'Other'])],
  deck_fence: [SEL('deck_size', 'Size of the deck or fence', ['Small', 'Medium', 'Large', 'Not sure'])],
  dryer_vent: [SEL('vent_location', 'Where does the vent exit?', ['Wall', 'Roof', 'Not sure'])],
  landscape_build: [SEL('yard_size', 'Size of the area', ['Small (under 500 sq ft)', 'Medium (500–2,000 sq ft)', 'Large (2,000+ sq ft)', 'Not sure']), SEL('design', 'Design', ['I have a plan', 'I need a design'])],
  landscape_maint: [SEL('frequency', 'How often?', ['Weekly', 'Every two weeks', 'Monthly', 'One-time cleanup'])],
  irrigation: [{ key: 'irrigation_issue', label: 'What is happening with the system?', kind: 'text' }],
  turf: [SEL('turf_area', 'Area to cover', ['Under 300 sq ft', '300–1,000 sq ft', '1,000+ sq ft', 'Not sure'])],
  hardscape: [SEL('hardscape_type', 'Project', ['Patio', 'Walkway', 'Retaining wall', 'Driveway', 'Other'])],
  other: [],
}

/** Profile override, else the questions for the business's own kinds of service, plus timing. */
function intakeFor(p: ProspectProfile): IntakeField[] {
  if (p.intake?.length) return p.intake
  const out = new Map<string, IntakeField>()
  for (const svc of p.services) {
    for (const f of KIND_FIELDS[svc.kind] ?? []) {
      const prev = out.get(f.key)
      out.set(f.key, { ...f, laneIds: [...(prev?.laneIds ?? []), svc.id] })
    }
  }
  return [...out.values(), { key: 'timing', label: 'Preferred timing', kind: 'text' }]
}

const LABEL: Record<ProspectProfile['template'], string> = {
  window_gutter: 'Window & gutter cleaning',
  exterior_cleaning: 'Exterior cleaning',
  landscaping: 'Landscaping',
  pool_service: 'Pool service',
}

export function homeServicesVertical(p: ProspectProfile): VerticalPack {
  const services = p.services.map((s, i) => ({
    slug: s.id,
    laneId: s.id,
    code: String(i + 1).padStart(2, '0'),
    title: s.title,
    summary: s.summary,
    includes: [],
    whatToExpect: [
      `Request online or call ${p.phone.display}; the request lands in the office queue.`,
      'The office confirms the details and sends a written estimate to approve.',
      'After the visit, before and after photos are attached to your record.',
    ],
    reportKind: 'service_record',
  }))
  const linesOf = (s: ProspectProfile['services'][number]) => (s.lines?.length ? s.lines : KIND_LINES[s.kind] ?? KIND_LINES.other)
  const stepsOf = (s: ProspectProfile['services'][number]) => (s.steps?.length ? s.steps.map((l) => C('work', l)) : KIND_STEPS[s.kind] ?? KIND_STEPS.other)
  const lineItemFamilies: LineItemFamily[] = p.services.map((s) => ({ id: s.id, label: s.title, items: linesOf(s) }))
  return {
    key: `home-services:${p.template}`,
    label: LABEL[p.template],
    flow: 'estimate-first',
    terms: {
      field: 'Technician',
      fieldView: 'Technician',
      fieldPacket: 'Technician job packet',
      sampleFieldName: 'Sample Technician',
      reviewerRole: 'Office',
      fromReport: 'From request',
      followUpLabel: 'estimate',
      itemNoun: 'checklist item',
      requestNotesPlaceholder: 'Number of stories, gates or pets, access notes, anything we should know…',
      invoiceFieldLine: 'job photos and notes kept with the record',
      servicesHeading: 'Services',
      callCta: p.cta.label.toLowerCase().includes('text') ? 'Call or text' : 'Call',
    },
    followUp: { laneId: p.services[0]?.id ?? 'service', familyId: p.services[0]?.id ?? 'service' },
    lanes: p.services.map((s) => ({ id: s.id, label: s.title, short: s.title, workTypes: [s.title] })),
    services,
    buildingTypes: ['Single-family home', 'Townhome / condo', 'Multi-family / HOA', 'Business / commercial', 'Other'],
    urgency: [
      { id: 'soon', label: 'As soon as possible', routing: 'The office calls back to schedule.', humanOnly: false },
      { id: 'routine', label: 'Flexible / planning ahead', routing: 'The office calls back to schedule.', humanOnly: false },
    ],
    intakeFields: intakeFor(p),
    leadStatuses: [
      { id: 'new', label: 'New' },
      { id: 'callback', label: 'Callback scheduled' },
      { id: 'contacted', label: 'Contacted' },
      { id: 'follow_up', label: 'Follow-up due' },
      { id: 'quoted', label: 'Estimate sent' },
      { id: 'won', label: 'Booked' },
      { id: 'lost', label: 'Closed: not proceeding' },
    ],
    checklists: Object.fromEntries(p.services.map((s) => [s.id, [...ARRIVAL, ...stepsOf(s), ...WRAP]])),
    quoteLines: p.services.flatMap((s) => linesOf(s).map((l) => ({ laneId: s.id, label: l.description, unit: l.unit, sampleUnitPrice: l.sampleUnitPrice }))),
    lineItemFamilies,
    reportTemplates: [
      {
        kind: 'service_record',
        title: 'Service record',
        itemsTitle: 'Work recorded',
        items: ['Areas in scope completed', 'Before and after photos attached', 'Customer walk-through done', 'Site left clean'],
        deliverTo: ['owner'],
        deliverToText: 'Sent to the customer with before/after photos once the office signs it off.',
        samplePath: '/report/R-601',
      },
    ],
    lifecycleName: 'How a job runs',
    customerSteps: [
      { id: 'received', label: 'Request', detail: 'The customer requests a quote online or by phone; it lands in the office queue.', sample: '/request' },
      { id: 'report', label: 'Estimate', detail: 'The office sends a written estimate (sample prices in this preview).', sample: '/estimate/Q-602' },
      { id: 'approved', label: 'Approval', detail: 'The customer approves online; nothing is booked until they do.', sample: '/estimate/Q-602' },
      { id: 'scheduled', label: 'Scheduled', detail: 'The visit is booked and the technician gets the job packet on their phone.', sample: '/status/L-601' },
      { id: 'completed', label: 'Service & photos', detail: 'The technician records the checklist and before/after photos; the office signs off.', sample: '/report/R-601' },
      { id: 'invoiced', label: 'Invoice', detail: 'One invoice linked to the job and its photos.', sample: '/invoice/I-601' },
    ],
    guardrails: {
      quote: 'Sample estimate for this preview.',
      compliance: 'Checklist and photos record the work done. They are not a warranty or inspection.',
      emergency: 'Urgent requests go to a person by phone. Online requests never dispatch a technician on their own.',
      completion: 'The service record documents work done and photos taken. It is not a warranty.',
      document: 'Fictional sample — not a real estimate, invoice, customer record or job.',
    },
    reportSections: ['Work done', 'Technician notes', 'Before and after photos', 'Follow-up recommended'],
  }
}
