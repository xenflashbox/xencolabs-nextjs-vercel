/**
 * Records a preview tenant works with. Every one carries `sample: true` and is
 * rendered with a SAMPLE badge; nothing here is a real customer, price or job.
 */

export interface DemoLead {
  id: string
  sample: true
  createdAt: string
  name: string
  company: string | null
  phone: string
  email: string | null
  address: string
  buildingType: string
  laneId: string
  workType: string
  urgency: string
  notes: string
  status: string
  nextAction: string
  /** ISO time of the scheduled callback / follow-up, if any. */
  dueAt: string | null
  source: 'website form' | 'phone' | 'referral' | 'preview intake'
}

export interface DemoQuoteLine {
  label: string
  unit: string
  qty: number
  unitPrice: number
}

export interface DemoQuote {
  id: string
  sample: true
  leadId: string
  number: string
  laneId: string
  scope: string
  lines: DemoQuoteLine[]
  /** draft → reviewed → approved_to_send → sent → accepted. Only a person moves it past draft. */
  status: 'draft' | 'reviewed' | 'approved_to_send' | 'sent' | 'accepted' | 'declined'
  reviewedBy: string | null
  reviewNote: string
}

export interface DemoChecklistItem {
  id: string
  section: 'prep' | 'work' | 'safety' | 'completion'
  label: string
  done: boolean
}

export interface DemoPhoto {
  id: string
  phase: 'before' | 'after'
  name: string
  /** Object URL in this browser only. Preview photos never leave the device. */
  url: string | null
}

export interface DemoJob {
  id: string
  sample: true
  number: string
  leadId: string
  quoteId: string | null
  laneId: string
  title: string
  scheduledStart: string
  scheduledEnd: string
  technician: string
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'report_ready'
  siteContact: string
  accessNotes: string
  scope: string[]
  checklist: DemoChecklistItem[]
  photos: DemoPhoto[]
  techNotes: string
  /** Set only when the contractor signs off the report; never automatic. */
  reportApprovedBy: string | null
}

export interface DemoInvoice {
  id: string
  sample: true
  jobId: string
  number: string
  amount: number
  status: 'draft' | 'sent' | 'paid' | 'overdue'
  followUp: string
}

export interface DemoState {
  leads: DemoLead[]
  quotes: DemoQuote[]
  jobs: DemoJob[]
  invoices: DemoInvoice[]
}
