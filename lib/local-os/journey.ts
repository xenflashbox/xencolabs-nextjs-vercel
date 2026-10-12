/**
 * One customer's journey, computed from the linked records rather than stored, so the
 * customer status page, the office and the demo tour always agree:
 *
 *   request (lead) → job(s) → report → estimate (approved by the customer) → completion → invoice
 */
import type { DemoInvoice, DemoJob, DemoLead, DemoQuote, DemoReport, DemoState } from '@/lib/local-os/demo-types'
import type { CustomerStep, VerticalPack } from '@/lib/local-os/tenant-types'

export interface Journey {
  lead: DemoLead
  jobs: DemoJob[]
  quotes: DemoQuote[]
  reports: DemoReport[]
  invoices: DemoInvoice[]
  steps: (CustomerStep & { done: boolean; current: boolean; href: string | null })[]
}

/** Accepts a lead id or a job id. */
export function journeyFor(state: DemoState, vertical: VerticalPack, id: string): Journey | null {
  const lead = state.leads.find((l) => l.id === id) ?? state.leads.find((l) => l.id === state.jobs.find((j) => j.id === id)?.leadId)
  if (!lead) return null
  const jobs = state.jobs.filter((j) => j.leadId === lead.id).sort((a, b) => a.scheduledStart.localeCompare(b.scheduledStart))
  const quotes = state.quotes.filter((q) => q.leadId === lead.id)
  const reports = state.reports.filter((r) => jobs.some((j) => j.id === r.jobId))
  const invoices = state.invoices.filter((i) => jobs.some((j) => j.id === i.jobId))

  // Estimate-first trades (paving): the site-review visit is not "the work"; only jobs booked
  // against an estimate count as scheduled/completed work.
  const estimateFirst = vertical.flow === 'estimate-first'
  const workJobs = estimateFirst ? jobs.filter((j) => j.quoteId) : jobs
  const reviewedReport = reports.find((r) => r.reviewedBy)
  const completionReport = estimateFirst ? reports.find((r) => r.reviewedBy && workJobs.some((j) => j.id === r.jobId)) : reviewedReport
  const customerQuote = quotes.find((q) => ['sent', 'accepted', 'declined'].includes(q.status))
  const accepted = quotes.find((q) => q.status === 'accepted')
  const doneJob = estimateFirst
    ? workJobs.length > 0 && workJobs.every((j) => j.status === 'report_ready' || j.status === 'completed') ? workJobs[0] : undefined
    : jobs.find((j) => j.status === 'report_ready' || j.status === 'completed')
  const sentInvoice = invoices.find((i) => i.status !== 'draft')
  // Work that still needs doing after an approved follow-up estimate keeps "Completion" open.
  const openFollowUp = quotes.find((q) => q.fromReportId && q.status === 'accepted' && !jobs.some((j) => j.quoteId === q.id && j.status === 'report_ready'))

  const done: Record<CustomerStep['id'], boolean> = {
    received: true,
    scheduled: workJobs.length > 0,
    report: Boolean(reviewedReport || customerQuote),
    approved: Boolean(accepted),
    completed: Boolean(doneJob) && !openFollowUp,
    invoiced: Boolean(sentInvoice),
  }
  const href: Record<CustomerStep['id'], string | null> = {
    received: null,
    scheduled: null,
    report: reviewedReport ? `/report/${reviewedReport.id}` : customerQuote ? `/estimate/${customerQuote.id}` : null,
    approved: customerQuote ? `/estimate/${customerQuote.id}` : null,
    completed: completionReport ? `/report/${completionReport.id}` : null,
    invoiced: sentInvoice ? `/invoice/${sentInvoice.id}` : null,
  }
  const firstOpen = vertical.customerSteps.find((s) => !done[s.id])?.id
  return {
    lead,
    jobs,
    quotes,
    reports,
    invoices,
    steps: vertical.customerSteps.map((s) => ({ ...s, done: done[s.id], current: s.id === firstOpen, href: href[s.id] })),
  }
}

export const lineTotal = (lines: { qty: number; unitPrice: number }[]) => lines.reduce((a, l) => a + l.qty * l.unitPrice, 0)
