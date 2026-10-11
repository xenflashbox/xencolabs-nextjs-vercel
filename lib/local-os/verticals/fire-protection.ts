/**
 * Fire-protection vertical pack (California C16 contractors and similar).
 *
 * Reusable by any fire-protection tenant: lanes, intake vocabulary, technician
 * checklists and the guardrails a fire-protection workflow must carry. The
 * checklist lines describe what a technician records, never a conclusion: an
 * inspection certification, a code-compliance finding or a binding price is
 * always issued by the licensed contractor, on their own forms, after review.
 *
 * The NFPA references (25 for sprinkler ITM, 10 for portable extinguishers) are
 * the scopes the client already names on their public site; they label the work,
 * they do not assert compliance.
 */
import type { VerticalPack } from '@/lib/local-os/tenant-types'

export const FIRE_PROTECTION: VerticalPack = {
  key: 'fire-protection',
  label: 'Fire protection',
  lanes: [
    {
      id: 'sprinkler',
      label: 'Fire sprinkler systems',
      short: 'Sprinklers',
      workTypes: [
        'New system installation',
        'Annual inspection (NFPA 25 scope)',
        'Quarterly / semi-annual inspection',
        'Maintenance or head replacement',
        'Backflow prevention test',
        'System upgrade or modification',
      ],
    },
    {
      id: 'emergency',
      label: 'Emergency repair',
      short: 'Emergency',
      workTypes: [
        'Active leak or broken pipe',
        'System activated / needs restoration',
        'Frozen or stuck valve',
        'Corroded or damaged heads',
        'Other urgent system fault',
      ],
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
      routing: 'Phone the office now. The system never dispatches; a person decides.',
      humanOnly: true,
    },
    {
      id: 'soon',
      label: 'Soon: within a few days',
      routing: 'Office calls back the same business day.',
      humanOnly: false,
    },
    {
      id: 'routine',
      label: 'Routine: inspection or planned work',
      routing: 'Office calls back to schedule.',
      humanOnly: false,
    },
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
      { section: 'work', label: 'Note visible heads that are painted, corroded, obstructed or damaged' },
      { section: 'work', label: 'Note spare-head cabinet contents' },
      { section: 'work', label: 'Record observations for the licensed inspector’s report' },
      { section: 'safety', label: 'Return valves to normal; confirm the system is back in service' },
      { section: 'completion', label: 'Site contact told what was done and what was found' },
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
    { laneId: 'sprinkler', label: 'Annual sprinkler inspection (per riser)', unit: 'riser', sampleUnitPrice: 250 },
    { laneId: 'sprinkler', label: 'Sprinkler head replacement', unit: 'head', sampleUnitPrice: 45 },
    { laneId: 'sprinkler', label: 'Backflow prevention test', unit: 'device', sampleUnitPrice: 150 },
    { laneId: 'emergency', label: 'Emergency call-out', unit: 'visit', sampleUnitPrice: 195 },
    { laneId: 'emergency', label: 'Repair labor', unit: 'hour', sampleUnitPrice: 145 },
    { laneId: 'extinguisher', label: 'Extinguisher annual inspection', unit: 'unit', sampleUnitPrice: 12 },
    { laneId: 'extinguisher', label: 'Extinguisher recharge', unit: 'unit', sampleUnitPrice: 35 },
  ],
  guardrails: {
    quote:
      'Draft estimate for review. Not a binding quote: it becomes one only after the licensed contractor reviews the scope on site or from drawings and approves it.',
    compliance:
      'Technician observations only. Inspection results, tags and code-compliance statements are issued by the licensed contractor on their own forms, not by this system.',
    emergency:
      'Emergency requests go to a person by phone. This system never dispatches a crew or decides whether a system is safe.',
    completion:
      'The completion report is a record of work performed and photos taken. It is not an inspection certification.',
  },
  reportSections: [
    'Scope performed',
    'Technician observations',
    'Before and after photos',
    'Follow-up recommended by the contractor',
  ],
}
