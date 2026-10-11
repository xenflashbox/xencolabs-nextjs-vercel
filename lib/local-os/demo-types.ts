/**
 * Records a preview tenant works with. Every one carries `sample: true` and is rendered with
 * a SAMPLE badge; nothing here is a real customer, price, report, filing or job.
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
  /** Trade-specific intake answers (system type, risers, assemblies, ...). */
  fields: Record<string, string>
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
  /** Set when the estimate came from an inspection finding. */
  fromReportId: string | null
  /** Name the customer typed when approving (sample). */
  customerApproval: string | null
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
  reportId: string | null
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

export type ItemResult = 'pass' | 'fail' | 'attention' | 'na' | 'pending'

export interface DemoAssembly {
  id: string
  type: string
  size: string
  make: string
  model: string
  serial: string
  location: string
  /** Readings as recorded by the tester (psid / open point), free text in the preview. */
  check1: string
  check2: string
  relief: string
  result: ItemResult
}

export interface DemoReport {
  id: string
  sample: true
  kind: string
  number: string
  jobId: string
  property: { name: string; address: string; occupancy: string; buildingType: string; details: string }
  technician: { name: string; credential: string }
  systems: { id: string; type: string; location: string; notes: string }[]
  items: { label: string; result: ItemResult; note: string }[]
  assemblies: DemoAssembly[]
  deficiencies: string[]
  overall: ItemResult
  delivery: { owner: 'not_sent' | 'sent'; ahj: 'not_submitted' | 'submitted' | 'not_required' }
  followUpQuoteId: string | null
  /** Set only when the licensed contractor reviews it; never automatic. */
  reviewedBy: string | null
}

export interface DemoInvoiceLine {
  description: string
  unitPrice: number
  qty: number
}

export interface DemoInvoice {
  id: string
  sample: true
  jobId: string
  number: string
  siteAddress: string
  billTo: string
  issueDate: string
  dueDate: string
  lines: DemoInvoiceLine[]
  amountPaid: number
  status: 'draft' | 'sent' | 'paid' | 'overdue'
  reportIds: string[]
  followUp: string
}

export interface DemoState {
  leads: DemoLead[]
  quotes: DemoQuote[]
  jobs: DemoJob[]
  reports: DemoReport[]
  invoices: DemoInvoice[]
}
