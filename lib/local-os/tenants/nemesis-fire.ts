/**
 * Nemesis Fire — first external tenant of the shared Local OS (private alpha preview).
 *
 * Business facts are copied from the client's own public site
 * (xenflashbox/nemesisfire.com, website/lib/constants.ts); nothing about the
 * business is invented here. Every lead, estimate, job and invoice below is
 * SAMPLE data, with obviously fictional names and addresses, for the owner to
 * click through before any of it is wired to his real workflow.
 */
import type { DemoChecklistItem, DemoState } from '@/lib/local-os/demo-types'
import type { TenantConfig } from '@/lib/local-os/tenant-types'
import { FIRE_PROTECTION } from '@/lib/local-os/verticals/fire-protection'

const BRAND = '/os/nemesis-fire/brand'

export const NEMESIS_FIRE: TenantConfig = {
  slug: 'nemesis-fire',
  name: 'Nemesis Fire',
  owner: 'Alejandro “Alex” Mendoza Ruiz',
  license: 'C16 Lic# 1036129',
  phone: '707-495-5051',
  region: 'Santa Rosa · Sonoma County · North Bay',
  verticalKey: FIRE_PROTECTION.key,
  // Brand system supplied by the founder 2026-10-11 (charcoal #111111, fire red #D10505, white #FAFAFA).
  // File names describe the ARTWORK colour, not the background: "color-light" has white letterforms
  // and belongs on dark surfaces; "color-dark" has charcoal letterforms and belongs on light ones.
  branding: {
    primary: '#D10505',
    primaryDark: '#A30404',
    surface: '#111111',
    light: '#FAFAFA',
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
  laneIds: ['sprinkler', 'emergency', 'extinguisher'],
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

  return {
    leads: [
      {
        id: 'L-101', sample: true, createdAt: at(0, 7, 40), name: 'Sample Facilities Manager',
        company: 'Sample Cold Storage Co. (sample)', phone: '707-555-0101', email: 'facilities@example.com',
        address: '100 Sample Industrial Way, Santa Rosa, CA', buildingType: 'Warehouse / industrial',
        laneId: 'emergency', workType: 'Active leak or broken pipe', urgency: 'emergency',
        notes: 'Water dripping from a sprinkler line above the loading dock.', status: 'contacted',
        nextAction: 'Emergency handled by phone: confirm technician arrival', dueAt: at(0, 9, 0), source: 'phone',
      },
      {
        id: 'L-102', sample: true, createdAt: at(-1, 15, 10), name: 'Sample Property Manager',
        company: 'Sample Apartments (sample)', phone: '707-555-0102', email: 'manager@example.com',
        address: '200 Sample Avenue, Rohnert Park, CA', buildingType: 'Multi-family / apartments',
        laneId: 'sprinkler', workType: 'Annual inspection (NFPA 25 scope)', urgency: 'routine',
        notes: 'Three buildings, wet systems. Last inspection over a year ago.', status: 'quoted',
        nextAction: 'Review the draft estimate before it is sent', dueAt: at(0, 13, 0), source: 'website form',
      },
      {
        id: 'L-103', sample: true, createdAt: at(-1, 10, 5), name: 'Sample Restaurant Owner',
        company: 'Sample Bistro (sample)', phone: '707-555-0103', email: null,
        address: '300 Sample Street, Petaluma, CA', buildingType: 'Restaurant / commercial kitchen',
        laneId: 'extinguisher', workType: 'Annual inspection and tagging (NFPA 10 scope)', urgency: 'soon',
        notes: 'Eight extinguishers, one discharged last week.', status: 'callback',
        nextAction: 'Call back to confirm unit count and a time', dueAt: at(0, 11, 30), source: 'website form',
      },
      {
        id: 'L-104', sample: true, createdAt: at(-3, 9, 0), name: 'Sample Homeowner',
        company: null, phone: '707-555-0104', email: 'homeowner@example.com',
        address: '400 Sample Lane, Windsor, CA', buildingType: 'Single-family home',
        laneId: 'sprinkler', workType: 'Maintenance or head replacement', urgency: 'routine',
        notes: 'Two heads were painted over during a remodel.', status: 'follow_up',
        nextAction: 'Follow up: no answer on first call', dueAt: at(-1, 16, 0), source: 'referral',
      },
      {
        id: 'L-105', sample: true, createdAt: at(-6, 14, 0), name: 'Sample School Office',
        company: 'Sample Charter School (sample)', phone: '707-555-0105', email: 'office@example.com',
        address: '500 Sample Road, Sebastopol, CA', buildingType: 'School / assembly',
        laneId: 'sprinkler', workType: 'Backflow prevention test', urgency: 'routine',
        notes: 'Annual backflow test due before term starts.', status: 'won',
        nextAction: 'Job scheduled', dueAt: null, source: 'website form',
      },
      {
        id: 'L-106', sample: true, createdAt: at(-8, 11, 0), name: 'Sample Office Tenant',
        company: 'Sample Offices (sample)', phone: '707-555-0106', email: null,
        address: '600 Sample Plaza, Santa Rosa, CA', buildingType: 'Office / retail',
        laneId: 'extinguisher', workType: 'Recharge after use', urgency: 'soon',
        notes: 'Decided to stay with their current vendor.', status: 'lost',
        nextAction: 'None', dueAt: null, source: 'phone',
      },
    ],
    quotes: [
      {
        id: 'Q-201', sample: true, leadId: 'L-102', number: 'EST-201 (sample)', laneId: 'sprinkler',
        scope: 'Annual inspection of wet sprinkler systems at three buildings; report of findings.',
        lines: [
          { label: 'Annual sprinkler inspection (per riser)', unit: 'riser', qty: 3, unitPrice: 250 },
          { label: 'Backflow prevention test', unit: 'device', qty: 1, unitPrice: 150 },
        ],
        status: 'draft', reviewedBy: null, reviewNote: '',
      },
      {
        id: 'Q-202', sample: true, leadId: 'L-105', number: 'EST-202 (sample)', laneId: 'sprinkler',
        scope: 'Annual backflow prevention test, one device.',
        lines: [{ label: 'Backflow prevention test', unit: 'device', qty: 1, unitPrice: 150 }],
        status: 'accepted', reviewedBy: 'Alex (sample sign-off)', reviewNote: 'Confirmed device size on call.',
      },
    ],
    jobs: [
      {
        id: 'J-301', sample: true, number: 'JOB-301 (sample)', leadId: 'L-105', quoteId: 'Q-202', laneId: 'sprinkler',
        title: 'Backflow prevention test', scheduledStart: at(0, 10, 0), scheduledEnd: at(0, 11, 30),
        technician: 'Sample Technician', status: 'confirmed',
        siteContact: 'Sample School Office · 707-555-0105',
        accessNotes: 'Device is in the locked enclosure by the north gate; the office has the key.',
        scope: ['Annual backflow prevention test, one device', 'Record results for the contractor’s report'],
        checklist: checklist('sprinkler'), photos: [], techNotes: '', reportApprovedBy: null,
      },
      {
        id: 'J-302', sample: true, number: 'JOB-302 (sample)', leadId: 'L-101', quoteId: null, laneId: 'emergency',
        title: 'Emergency repair: leaking line at the loading dock', scheduledStart: at(0, 8, 30), scheduledEnd: at(0, 11, 0),
        technician: 'Sample Technician', status: 'in_progress',
        siteContact: 'Sample Facilities Manager · 707-555-0101',
        accessNotes: 'Check in at the guard shack. The dock area is active; wear high-visibility gear.',
        scope: ['Make safe and stop the leak', 'Repair the failed section', 'Restore the system to service'],
        checklist: checklist('emergency', 2), photos: [], techNotes: 'Zone isolated at 8:52; site contact informed.',
        reportApprovedBy: null,
      },
      {
        id: 'J-303', sample: true, number: 'JOB-303 (sample)', leadId: 'L-103', quoteId: null, laneId: 'extinguisher',
        title: 'Extinguisher annual inspection: 8 units', scheduledStart: at(2, 14, 0), scheduledEnd: at(2, 15, 30),
        technician: 'Sample Technician', status: 'scheduled',
        siteContact: 'Sample Restaurant Owner · 707-555-0103',
        accessNotes: 'Arrive before the dinner service; kitchen units are behind the line.',
        scope: ['Inspect 8 portable extinguishers', 'Recharge the discharged unit', 'List any units needing replacement'],
        checklist: checklist('extinguisher'), photos: [], techNotes: '', reportApprovedBy: null,
      },
    ],
    invoices: [
      { id: 'I-401', sample: true, jobId: 'J-301', number: 'INV-401 (sample)', amount: 150, status: 'draft',
        followUp: 'Send after the report is approved' },
      { id: 'I-402', sample: true, jobId: 'J-399', number: 'INV-398 (sample)', amount: 480, status: 'overdue',
        followUp: 'Second reminder due: a person sends it' },
    ],
  }
}
