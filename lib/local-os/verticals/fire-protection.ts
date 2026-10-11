/**
 * Fire-protection trade module (California C16 contractors and similar).
 *
 * Reusable by any fire-protection tenant: lanes and service pages, intake vocabulary,
 * technician checklists, report templates (five-year sprinkler inspection, multi-assembly
 * backflow test), estimate/invoice line-item families, customer-status steps and the
 * guardrails this trade must carry.
 *
 * Checklist and report lines describe what a technician RECORDS, never a conclusion: an
 * inspection certification, a code-compliance finding, a municipal filing or a binding price
 * is always issued by the licensed contractor or certified tester, on their own forms, after
 * review. The NFPA references (25 for water-based ITM, 10 for portable extinguishers) label
 * the scope of the work; they do not assert compliance. Every price is a placeholder.
 */
import type { VerticalPack } from '@/lib/local-os/tenant-types'

export const FIRE_PROTECTION: VerticalPack = {
  key: 'fire-protection',
  label: 'Fire protection',
  lanes: [
    {
      id: 'sprinkler',
      label: 'Fire sprinkler inspection and testing',
      short: 'Sprinklers',
      workTypes: [
        'Five-year inspection (NFPA 25 scope)',
        'Annual inspection (NFPA 25 scope)',
        'Quarterly / semi-annual inspection',
        'Maintenance or head replacement',
        'New system installation',
        'System upgrade or modification',
      ],
    },
    {
      id: 'backflow',
      label: 'Backflow testing',
      short: 'Backflow',
      workTypes: ['Annual backflow test', 'Test after repair or install', 'Assembly repair or replacement'],
    },
    {
      id: 'extinguisher',
      label: 'Fire extinguisher service',
      short: 'Extinguishers',
      workTypes: [
        'Annual inspection and tagging (NFPA 10 scope)',
        '6-year maintenance',
        'Hydrostatic test',
        'Recharge after use',
        'New extinguishers / replacement',
      ],
    },
    {
      id: 'emergency',
      label: 'Repairs and emergency work',
      short: 'Repairs',
      workTypes: [
        'Active leak or broken pipe',
        'System activated / needs restoration',
        'Frozen or stuck valve',
        'Corroded or damaged heads',
        'Repair from an inspection finding',
      ],
    },
  ],
  services: [
    {
      slug: 'sprinkler-inspection',
      laneId: 'sprinkler',
      title: 'Fire sprinkler inspection and testing',
      summary:
        'Scheduled inspection and testing of water-based fire sprinkler systems, from annual visits to the five-year inspection, with a written report of what was found.',
      includes: [
        'Annual, quarterly and five-year inspections (NFPA 25 scope)',
        'Riser, control valve and gauge checks',
        'Visible sprinkler head condition and spare-head cabinet',
        'Main drain and alarm device testing where applicable',
        'A written report of observations and any recommended repairs',
      ],
      whatToExpect: [
        'We confirm the building, number of risers and access before the visit.',
        'Your monitoring company is notified before any test that could send an alarm.',
        'You receive the report after the licensed contractor reviews it.',
        'Recommended repairs come as a separate estimate for your approval.',
      ],
      reportKind: 'sprinkler_5yr',
    },
    {
      slug: 'backflow-testing',
      laneId: 'backflow',
      title: 'Backflow testing',
      summary:
        'Testing of backflow prevention assemblies by a certified tester, with readings recorded for every assembly on the property.',
      includes: [
        'Reduced pressure (RP), double check (DC/DCDA) and pressure vacuum breaker (PVB) assemblies',
        'Readings recorded per assembly: check valves and relief valve',
        'Make, model, serial and location captured for each device',
        'Test results prepared for submission to your water purveyor where required',
      ],
      whatToExpect: [
        'Tell us how many assemblies and where they are; we bring the right test kit.',
        'Water may be off briefly at each assembly during the test.',
        'Failed assemblies get a repair estimate before any work.',
      ],
      reportKind: 'backflow',
    },
    {
      slug: 'extinguisher-service',
      laneId: 'extinguisher',
      title: 'Fire extinguisher service',
      summary:
        'Inspection, maintenance, recharging and replacement of portable fire extinguishers at your location.',
      includes: [
        'Annual inspection and tagging (NFPA 10 scope)',
        '6-year maintenance and 12-year hydrostatic testing',
        'Recharge after use or pressure loss',
        'Replacement and new units',
      ],
      whatToExpect: [
        'We walk every unit with you: location, gauge, pin, seal, hose and body.',
        'Units needing service are listed before anything is replaced.',
      ],
      reportKind: null,
    },
    {
      slug: 'repairs-emergency',
      laneId: 'emergency',
      title: 'Repairs and emergency work',
      summary:
        'Repairs found during inspections, and urgent repairs when a system is leaking, has activated or is out of service.',
      includes: [
        'Leaking or broken pipe and fitting repair',
        'Corroded, painted or damaged head replacement',
        'Frozen or stuck valve repair',
        'System restoration after activation',
      ],
      whatToExpect: [
        'Emergencies: call the office directly. Online requests are not monitored for emergencies.',
        'Planned repairs are estimated and approved before work starts.',
      ],
      reportKind: null,
    },
  ],
  buildingTypes: [
    'Single-family home',
    'Multi-family / apartments',
    'Office / retail',
    'Restaurant / commercial kitchen',
    'Warehouse / industrial',
    'School / assembly',
    'Healthcare / care facility',
    'Other',
  ],
  urgency: [
    {
      id: 'emergency',
      label: 'Emergency: active leak, activation or system down',
      routing: 'Call the office now. Online requests never dispatch a crew; a person decides.',
      humanOnly: true,
    },
    { id: 'soon', label: 'Soon: within a few days', routing: 'The office calls back the same business day.', humanOnly: false },
    { id: 'routine', label: 'Routine: inspection or planned work', routing: 'The office calls back to schedule.', humanOnly: false },
  ],
  intakeFields: [
    { key: 'systemType', label: 'System type, if known', kind: 'select', options: ['Wet pipe', 'Dry pipe', 'Pre-action', 'Not sure'], laneIds: ['sprinkler', 'emergency'] },
    { key: 'risers', label: 'Number of risers, if known', kind: 'number', laneIds: ['sprinkler'] },
    { key: 'assemblies', label: 'Number of backflow assemblies', kind: 'number', laneIds: ['backflow'] },
    { key: 'extinguishers', label: 'Number of extinguishers', kind: 'number', laneIds: ['extinguisher'] },
    { key: 'units', label: 'Dwelling units (multi-family)', kind: 'number', laneIds: ['sprinkler'] },
  ],
  leadStatuses: [
    { id: 'new', label: 'New' },
    { id: 'callback', label: 'Callback scheduled' },
    { id: 'contacted', label: 'Contacted' },
    { id: 'follow_up', label: 'Follow-up due' },
    { id: 'qualified', label: 'Qualified' },
    { id: 'quoted', label: 'Estimate drafted' },
    { id: 'won', label: 'Won: job scheduled' },
    { id: 'lost', label: 'Closed: not proceeding' },
  ],
  checklists: {
    sprinkler: [
      { section: 'prep', label: 'Check in with the site contact; confirm areas and access' },
      { section: 'safety', label: 'Notify the monitoring company / fire alarm vendor before any test' },
      { section: 'safety', label: 'Confirm who to notify if the system is taken out of service' },
      { section: 'work', label: 'Record riser and control valve positions as found' },
      { section: 'work', label: 'Record gauge readings as found' },
      { section: 'work', label: 'Score each inspection item on the report (pass / fail / needs attention)' },
      { section: 'work', label: 'Photograph deficiencies for the contractor’s review' },
      { section: 'safety', label: 'Return valves to normal; confirm the system is back in service' },
      { section: 'completion', label: 'Site contact told what was done and what was found' },
    ],
    backflow: [
      { section: 'prep', label: 'Confirm assembly count and locations with the site contact' },
      { section: 'safety', label: 'Tell the site contact water will be off briefly at each assembly' },
      { section: 'work', label: 'Record make, model, serial, size and location for every assembly' },
      { section: 'work', label: 'Record test readings for every assembly on the report' },
      { section: 'work', label: 'Photograph any failed or damaged assembly' },
      { section: 'safety', label: 'Restore water service at every assembly' },
      { section: 'completion', label: 'Results reviewed with the site contact' },
    ],
    emergency: [
      { section: 'safety', label: 'Make safe first: isolate the affected zone only as needed' },
      { section: 'safety', label: 'Tell the site contact the system is impaired; follow impairment notification' },
      { section: 'work', label: 'Photograph the failure before repair' },
      { section: 'work', label: 'Repair performed (describe parts and location)' },
      { section: 'work', label: 'Restore the system; record gauge readings after' },
      { section: 'safety', label: 'Confirm the system is back in service and monitoring restored' },
      { section: 'completion', label: 'Site contact told the system status and any follow-up needed' },
    ],
    extinguisher: [
      { section: 'prep', label: 'Get the unit list / locations from the site contact' },
      { section: 'work', label: 'Per unit: location accessible and visible' },
      { section: 'work', label: 'Per unit: gauge, pin, tamper seal, hose and body condition recorded' },
      { section: 'work', label: 'Units needing recharge, maintenance or replacement listed' },
      { section: 'work', label: 'Tags updated only per the licensed inspector’s procedure' },
      { section: 'completion', label: 'Unit count and exceptions reviewed with the site contact' },
    ],
  },
  quoteLines: [
    { laneId: 'sprinkler', label: 'Five-year water-based sprinkler inspection', unit: 'system', sampleUnitPrice: 650 },
    { laneId: 'sprinkler', label: 'Annual sprinkler inspection (per riser)', unit: 'riser', sampleUnitPrice: 250 },
    { laneId: 'sprinkler', label: 'Sprinkler head replacement', unit: 'head', sampleUnitPrice: 45 },
    { laneId: 'backflow', label: 'Backflow test: RP assembly', unit: 'device', sampleUnitPrice: 125 },
    { laneId: 'backflow', label: 'Backflow test: DC / DCDA assembly', unit: 'device', sampleUnitPrice: 110 },
    { laneId: 'backflow', label: 'Water purveyor report submission', unit: 'device', sampleUnitPrice: 15 },
    { laneId: 'emergency', label: 'Emergency call-out', unit: 'visit', sampleUnitPrice: 195 },
    { laneId: 'emergency', label: 'Repair labor', unit: 'hour', sampleUnitPrice: 145 },
    { laneId: 'extinguisher', label: 'Extinguisher annual service', unit: 'unit', sampleUnitPrice: 12 },
    { laneId: 'extinguisher', label: 'Extinguisher recharge', unit: 'unit', sampleUnitPrice: 35 },
  ],
  lineItemFamilies: [
    {
      id: 'inspection',
      label: 'Inspections',
      items: [
        { description: 'Five-year water-based sprinkler inspection', unit: 'system', sampleUnitPrice: 650 },
        { description: 'Annual sprinkler inspection', unit: 'riser', sampleUnitPrice: 250 },
        { description: 'Unit inspection', unit: 'dwelling unit', sampleUnitPrice: 20 },
      ],
    },
    {
      id: 'parts',
      label: 'Parts and corrections',
      items: [
        { description: 'Gauge replacement', unit: 'gauge', sampleUnitPrice: 40 },
        { description: 'Cover plate replacement', unit: 'plate', sampleUnitPrice: 8 },
        { description: 'Sprinkler head replacement', unit: 'head', sampleUnitPrice: 45 },
        { description: 'Sprinkler head cleaning', unit: 'head', sampleUnitPrice: 10 },
      ],
    },
    {
      id: 'extinguisher',
      label: 'Extinguisher service',
      items: [
        { description: 'Extinguisher annual service', unit: 'unit', sampleUnitPrice: 12 },
        { description: 'Extinguisher recharge', unit: 'unit', sampleUnitPrice: 35 },
        { description: 'Extinguisher 6-year maintenance', unit: 'unit', sampleUnitPrice: 30 },
      ],
    },
    {
      id: 'backflow',
      label: 'Backflow testing (by device type)',
      items: [
        { description: 'Backflow test: RP assembly', unit: 'device', sampleUnitPrice: 125 },
        { description: 'Backflow test: DC / DCDA assembly', unit: 'device', sampleUnitPrice: 110 },
        { description: 'Backflow test: PVB assembly', unit: 'device', sampleUnitPrice: 95 },
      ],
    },
    {
      id: 'admin',
      label: 'Reports and submissions',
      items: [{ description: 'Water purveyor / city report submission', unit: 'device', sampleUnitPrice: 15 }],
    },
  ],
  reportTemplates: [
    {
      kind: 'sprinkler_5yr',
      title: 'Five-year fire sprinkler inspection',
      items: [
        'Control valves: position, supervision, accessibility',
        'Riser and main drain test',
        'Gauges: condition and readings',
        'Alarm devices: water-flow and tamper',
        'Fire department connection: caps, swivels, signage',
        'Visible sprinklers: condition, obstruction, corrosion, paint',
        'Spare sprinkler cabinet and wrench',
        'Internal pipe assessment (five-year)',
        'Hydraulic placard and signage',
      ],
      deliverTo: ['owner', 'ahj'],
    },
    {
      kind: 'backflow',
      title: 'Backflow assembly test',
      items: [],
      assemblyTypes: ['RP', 'DC', 'DCDA', 'PVB'],
      deliverTo: ['owner', 'ahj'],
    },
  ],
  customerSteps: [
    { id: 'received', label: 'Request received', detail: 'The office has your request and will call you.' },
    { id: 'scheduled', label: 'Inspection scheduled', detail: 'A technician visit is booked.' },
    { id: 'report', label: 'Report / estimate', detail: 'Your report or estimate is ready to review.' },
    { id: 'approved', label: 'Approved work', detail: 'You approved the recommended work.' },
    { id: 'completed', label: 'Completion', detail: 'The work is complete and reviewed by the office.' },
    { id: 'invoiced', label: 'Invoice', detail: 'Your invoice is ready.' },
  ],
  guardrails: {
    quote:
      'Draft estimate for review. Not a binding quote: it becomes one only after the licensed contractor reviews the scope and approves it.',
    compliance:
      'Technician observations only. Inspection results, tags and code-compliance statements are issued by the licensed contractor on their own forms, not by this system.',
    emergency:
      'Emergencies go to a person by phone. Online requests never dispatch a crew or decide whether a system is safe.',
    completion:
      'The completion report is a record of work performed and photos taken. It is not an inspection certification.',
    document: 'Sample preview — not a certification, invoice, or official filing.',
  },
  reportSections: ['Scope performed', 'Technician observations', 'Before and after photos', 'Follow-up recommended by the contractor'],
}
