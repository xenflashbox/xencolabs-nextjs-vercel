/**
 * Commercial paving trade module (asphalt paving, repair, sealcoating, striping, milling).
 *
 * Reusable by any paving tenant. The flow is estimate-first: a request becomes an estimator's
 * site review, the site review becomes a grouped estimate, the property manager approves it, the
 * office schedules crews (often in phases so a lot stays open), the foreman records the work, and
 * the office closes it with a completion record and an invoice.
 *
 * Checklist and record lines describe what a crew or estimator RECORDS. Final quantities, ADA
 * compliance, permits and any warranty are the contractor's and the owner's to decide, on their
 * own documents. Every price is a placeholder, not any contractor's rate.
 */
import type { VerticalPack } from '@/lib/local-os/tenant-types'

export const COMMERCIAL_PAVING: VerticalPack = {
  key: 'commercial-paving',
  label: 'Commercial paving',
  flow: 'estimate-first',
  terms: {
    field: 'Crew foreman',
    fieldView: 'Crew',
    fieldPacket: 'Crew job packet',
    sampleFieldName: 'Sample Crew Foreman',
    reviewerRole: 'Estimator',
    fromReport: 'From site review',
    followUpLabel: 'estimate',
    itemNoun: 'condition item',
    requestNotesPlaceholder: 'Problem areas, approximate lot size, hours the lot must stay open, tenant or event dates…',
    invoiceFieldLine: 'material tickets and crew hours kept with the job record',
    servicesHeading: 'What we pave, repair and maintain',
    callCta: 'Call the office',
  },
  followUp: { laneId: 'repair', familyId: 'patching' },
  lanes: [
    {
      id: 'commercial',
      label: 'Commercial asphalt paving',
      short: 'Paving',
      workTypes: ['Parking lot renewal (patch, seal, stripe)', 'New parking lot or drive', 'Overlay of an existing lot', 'Private road or long driveway'],
    },
    {
      id: 'repair',
      label: 'Pavement repair and patching',
      short: 'Repair',
      workTypes: ['Pothole or failed area', 'Remove and replace damaged asphalt', 'Utility cut patch', 'Trip hazard or edge failure'],
    },
    {
      id: 'sealcoat',
      label: 'Sealcoating and crack sealing',
      short: 'Sealcoat',
      workTypes: ['Sealcoat (two coats)', 'Crack sealing (hot pour)', 'Crack seal and sealcoat together'],
    },
    {
      id: 'striping',
      label: 'Parking lot striping',
      short: 'Striping',
      workTypes: ['Re-stripe existing layout', 'New layout', 'ADA stalls and markings', 'Fire lanes, arrows and stop bars'],
    },
    {
      id: 'milling',
      label: 'Milling and paving installs',
      short: 'Milling',
      workTypes: ['Grind and overlay', 'Full-depth removal and replacement', 'Edge grinding at transitions'],
    },
  ],
  services: [
    {
      slug: 'commercial-asphalt-paving',
      laneId: 'commercial',
      code: '01',
      title: 'Commercial asphalt paving',
      summary:
        'Parking lots, drives and private roads for property managers and owners: a site review, a written scope, phased scheduling so the property stays open, and a completion record.',
      includes: [
        'Estimator site review with measured areas and marked conditions',
        'Grouped estimate: mobilization, patching, paving, sealcoat, striping',
        'Phased schedule so tenants and customers keep access',
        'Before and after photos, quantities and a completion record',
      ],
      whatToExpect: [
        'An estimator walks the property with you and marks the problem areas.',
        'You receive a written estimate grouped by work type to approve or adjust.',
        'Closures are scheduled with you in advance; signage and barricades are set before work starts.',
        'You receive a completion record with photos, then the invoice.',
      ],
      reportKind: 'site_review',
    },
    {
      slug: 'pavement-repair',
      laneId: 'repair',
      code: '02',
      title: 'Pavement repair and patching',
      summary: 'Potholes, failed areas and utility cuts: remove the damaged section, rebuild where needed, and patch to the surrounding surface.',
      includes: ['Saw-cut, remove and replace failed asphalt', 'Base repair where the failure is below the surface', 'Edge and transition repairs', 'Temporary make-safe for open hazards'],
      whatToExpect: [
        'Open hazards in a drive lane: call the office. Online requests are not monitored for emergencies.',
        'Planned repairs are measured and estimated before any work.',
        'Patched areas are marked on the site plan in the completion record.',
      ],
      reportKind: 'site_review',
    },
    {
      slug: 'sealcoating',
      laneId: 'sealcoat',
      code: '03',
      title: 'Sealcoating and crack sealing',
      summary: 'Crack sealing and sealcoat to protect sound pavement, scheduled around weather and the hours the lot must stay open.',
      includes: ['Clean and hot-pour crack seal', 'Two-coat sealcoat application', 'Cure time and reopening plan agreed in advance', 'Re-striping after sealcoat when included'],
      whatToExpect: [
        'Work is scheduled for a dry forecast; the crew confirms conditions the day before.',
        'Sections close in phases so access is kept.',
        'You are told when each section can reopen.',
      ],
      reportKind: 'site_review',
    },
    {
      slug: 'parking-lot-striping',
      laneId: 'striping',
      code: '04',
      title: 'Parking lot striping',
      summary: 'Stall lines, arrows, stop bars, fire lanes and ADA stall markings, laid out to the agreed plan.',
      includes: ['Re-stripe to the existing layout or a new plan', 'ADA stall and access aisle markings as scoped', 'Directional arrows, stop bars and crosswalks', 'Fire lane curb and text markings where requested'],
      whatToExpect: [
        'The layout is confirmed with you before paint goes down.',
        'ADA layout questions are flagged for the owner to confirm; markings follow the approved plan.',
        'Striping is often scheduled right after sealcoat cures.',
      ],
      reportKind: 'site_review',
    },
    {
      slug: 'milling-and-paving',
      laneId: 'milling',
      code: '05',
      title: 'Milling and paving installs',
      summary: 'Grind-and-overlay and full-depth replacement where the surface is past patching.',
      includes: ['Milling to depth at the agreed areas', 'Tack coat and new asphalt surface', 'Edge grinding at curbs and transitions', 'Compaction and final rolling'],
      whatToExpect: [
        'The estimator marks areas and depths on the site plan.',
        'Truck access and staging are planned with you.',
        'Material quantities are tracked against the estimate.',
      ],
      reportKind: 'site_review',
    },
  ],
  buildingTypes: [
    'Office park / business center',
    'Retail center',
    'Multi-family / HOA',
    'Industrial / warehouse',
    'Church / school',
    'Winery / agricultural',
    'Private road / shared driveway',
    'Other',
  ],
  urgency: [
    {
      id: 'emergency',
      label: 'Safety hazard: open pothole or failed area in a drive lane',
      routing: 'Call the office now. Online requests never dispatch a crew; a person decides.',
      humanOnly: true,
    },
    { id: 'soon', label: 'Needed before a date (lease, event, season)', routing: 'The office calls back to confirm the date and schedule a site review.', humanOnly: false },
    { id: 'routine', label: 'Planning or budgeting', routing: 'The office calls back to schedule a site review.', humanOnly: false },
  ],
  intakeFields: [
    { key: 'area', label: 'Approximate paved area (sq ft), if known', kind: 'number' },
    { key: 'stalls', label: 'Number of parking stalls, if known', kind: 'number', laneIds: ['commercial', 'striping', 'sealcoat'] },
    { key: 'lastSealed', label: 'Last sealcoat', kind: 'select', options: ['Within 2 years', '3–5 years ago', 'Over 5 years / never', 'Not sure'], laneIds: ['commercial', 'sealcoat'] },
    { key: 'openHours', label: 'Hours the lot must stay open', kind: 'text' },
  ],
  leadStatuses: [
    { id: 'new', label: 'New' },
    { id: 'callback', label: 'Callback scheduled' },
    { id: 'contacted', label: 'Contacted' },
    { id: 'follow_up', label: 'Follow-up due' },
    { id: 'qualified', label: 'Site review scheduled' },
    { id: 'quoted', label: 'Estimate drafted' },
    { id: 'won', label: 'Won: work scheduled' },
    { id: 'lost', label: 'Closed: not proceeding' },
  ],
  checklists: {
    site_review: [
      { section: 'prep', label: 'Meet the property contact; confirm areas in scope and hours the lot must stay open' },
      { section: 'work', label: 'Measure each area and record approximate square footage' },
      { section: 'work', label: 'Mark cracking, failures, potholes and ponding on the site plan' },
      { section: 'work', label: 'Photograph each marked condition' },
      { section: 'work', label: 'Note existing striping, ADA stalls and signage as observed (owner confirms requirements)' },
      { section: 'work', label: 'Note truck access, staging area and phasing options' },
      { section: 'completion', label: 'Review findings and next steps with the property contact' },
    ],
    commercial: [
      { section: 'prep', label: 'Closure notice confirmed with the property manager; tenants informed' },
      { section: 'safety', label: 'Cones, barricades and closure signs set for today’s section' },
      { section: 'safety', label: 'Tailgate safety talk held; PPE and high-visibility gear on' },
      { section: 'work', label: 'Weather and surface checked before application' },
      { section: 'work', label: 'Crack seal: cracks cleaned and sealed in today’s section' },
      { section: 'work', label: 'Sealcoat: first coat applied; record start and finish time' },
      { section: 'work', label: 'Sealcoat: second coat applied; cure time recorded' },
      { section: 'work', label: 'Striping and ADA / traffic markings laid out and painted per the approved plan' },
      { section: 'work', label: 'Material tickets and quantities recorded' },
      { section: 'completion', label: 'Walk the finished section with the property contact' },
      { section: 'completion', label: 'Reopening time confirmed; barricades removed when cured' },
    ],
    repair: [
      { section: 'safety', label: 'Make the area safe: cones and barricades around the failure' },
      { section: 'work', label: 'Saw-cut and remove the failed section; photograph the base' },
      { section: 'work', label: 'Base repaired where needed; tack applied' },
      { section: 'work', label: 'Asphalt placed and compacted; tonnage ticket recorded' },
      { section: 'completion', label: 'Area reopened and the property contact informed' },
    ],
  },
  quoteLines: [
    { laneId: 'commercial', label: 'Mobilization and traffic control', unit: 'lump sum', sampleUnitPrice: 1500 },
    { laneId: 'repair', label: 'Remove and replace failed asphalt (2")', unit: 'sq ft', sampleUnitPrice: 9 },
    { laneId: 'sealcoat', label: 'Crack sealing, hot pour', unit: 'linear ft', sampleUnitPrice: 1 },
    { laneId: 'sealcoat', label: 'Sealcoat, two coats', unit: 'sq ft', sampleUnitPrice: 0.25 },
    { laneId: 'striping', label: 'Re-stripe parking stalls', unit: 'stall', sampleUnitPrice: 8 },
    { laneId: 'milling', label: 'Mill and overlay (2")', unit: 'sq ft', sampleUnitPrice: 4 },
  ],
  lineItemFamilies: [
    {
      id: 'patching',
      label: 'Patching',
      items: [
        { description: 'Remove and replace failed asphalt (2")', unit: 'sq ft', sampleUnitPrice: 9 },
        { description: 'Base repair under failed areas', unit: 'sq ft', sampleUnitPrice: 6 },
      ],
    },
    { id: 'cracks', label: 'Crack sealing', items: [{ description: 'Crack sealing, hot pour', unit: 'linear ft', sampleUnitPrice: 1 }] },
    { id: 'sealcoat', label: 'Sealcoat', items: [{ description: 'Sealcoat, two coats', unit: 'sq ft', sampleUnitPrice: 0.25 }] },
    {
      id: 'striping',
      label: 'Striping',
      items: [
        { description: 'Re-stripe parking stalls', unit: 'stall', sampleUnitPrice: 8 },
        { description: 'Directional arrows', unit: 'each', sampleUnitPrice: 30 },
      ],
    },
    {
      id: 'ada',
      label: 'ADA and traffic markings',
      items: [
        { description: 'ADA stall and access aisle markings', unit: 'stall', sampleUnitPrice: 150 },
        { description: 'Stop bars and crosswalks', unit: 'each', sampleUnitPrice: 60 },
      ],
    },
    { id: 'mobilization', label: 'Mobilization', items: [{ description: 'Mobilization and traffic control', unit: 'lump sum', sampleUnitPrice: 1500 }] },
  ],
  reportTemplates: [
    {
      kind: 'site_review',
      title: 'Estimator site review',
      itemsTitle: 'Pavement conditions observed',
      items: [
        'Longitudinal and transverse cracking',
        'Alligator (fatigue) cracking',
        'Potholes and base failures',
        'Raveling and surface wear',
        'Drainage and ponding',
        'Existing striping and markings',
        'ADA stalls, access aisles and signage (observed only)',
        'Truck access, staging and phasing',
      ],
      systemsTable: { title: 'Areas measured', id: 'Area', type: 'Surface', location: 'Location', a: 'Approx. area', b: 'Condition' },
      deliverTo: ['owner'],
      deliverToText: 'Sent to the property manager or owner with the estimate, after the estimator reviews it.',
      samplePath: '/report/R-801',
    },
    {
      kind: 'completion',
      title: 'Project completion record',
      itemsTitle: 'Work recorded',
      items: [
        'Failed areas removed and replaced as scoped',
        'Cracks cleaned and sealed',
        'Sealcoat applied (coats and cure time recorded)',
        'Stalls re-striped to the approved layout',
        'ADA and traffic markings painted as scoped',
        'Site cleaned, barricades removed, lot reopened',
      ],
      systemsTable: { title: 'Quantities by area', id: 'Area', type: 'Work', location: 'Location', a: 'Quantity', b: 'Material ticket' },
      deliverTo: ['owner'],
      deliverToText: 'Sent to the property manager with before/after photos once the office signs it off.',
      samplePath: '/report/R-803',
    },
  ],
  lifecycleName: 'Project lifecycle',
  customerSteps: [
    { id: 'received', label: 'Request', detail: 'You request a site review; the office calls back to set a time.', sample: '/request' },
    { id: 'report', label: 'Site review & estimate', detail: 'An estimator measures and marks conditions; you receive a grouped estimate.', sample: '/report/R-801' },
    { id: 'approved', label: 'Approval', detail: 'You approve the scope; nothing is scheduled until you do.', sample: '/estimate/Q-703' },
    { id: 'scheduled', label: 'Crew scheduled', detail: 'Crews, equipment, materials and closures are scheduled with you, in phases if needed.', sample: '/status/L-701' },
    { id: 'completed', label: 'Field work & completion', detail: 'The foreman records the work and photos; the office signs off the completion record.', sample: '/report/R-803' },
    { id: 'invoiced', label: 'Invoice', detail: 'One invoice per phase, linked to the work order and completion record.', sample: '/invoice/I-903' },
  ],
  guardrails: {
    quote: 'Draft estimate for review. Not a binding bid: it becomes one only after the estimator verifies the site and the owner approves the scope.',
    compliance:
      'Crew and estimator observations only. Final quantities, ADA requirements, permits and any warranty are confirmed by the contractor and the property owner on their own documents, not by this system.',
    emergency: 'Safety hazards go to a person by phone. Online requests never dispatch a crew.',
    completion: 'The completion record documents work performed, quantities and photos. It is not a warranty, inspection or acceptance certificate.',
    document: 'Sample preview — not an official estimate, invoice, work order, or project record.',
  },
  reportSections: ['Scope performed', 'Crew notes and quantities', 'Before and after photos', 'Follow-up recommended by the contractor'],
}
