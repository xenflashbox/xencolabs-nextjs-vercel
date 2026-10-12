'use client';

import Link from 'next/link';
import { termsOf } from '@/lib/local-os/terms';
import { DocFrame } from '@/components/local-os/os/doc-frame';
import { useDemo } from '@/components/local-os/os/demo-store';
import { Guardrail, Pill, money, osHref } from '@/components/local-os/os/ui';
import { lineTotal } from '@/lib/local-os/journey';

const fmt = (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

/**
 * Invoice with the structure contractors actually use: site address, number, issue and due
 * dates, lines (description, unit price, qty, amount), subtotal / total / paid / balance, the
 * technician-licensing block, and links to the work order and report packet. Office mode can
 * mark it sent or record a payment — sample only: nothing is emailed or charged.
 */
export function InvoiceDoc({ id, mode }: { id: string; mode: 'customer' | 'office' }) {
  const { tenant, vertical, state, updateInvoice } = useDemo();
  const inv = state.invoices.find((x) => x.id === id);
  if (!inv || (mode === 'customer' && inv.status === 'draft')) return <p className="mx-auto max-w-3xl p-6 text-sm">This invoice is not available.</p>;
  const job = state.jobs.find((j) => j.id === inv.jobId);
  const subtotal = lineTotal(inv.lines);
  const balance = Math.max(0, subtotal - inv.amountPaid);
  const s = tenant.slug;
  return (
    <div className="space-y-5 px-4 py-6">
      <DocFrame tenant={tenant} title={`Invoice ${inv.number}`} notice={vertical.guardrails.document}>
        <div className="grid gap-4 text-sm sm:grid-cols-3">
          <div><p className="text-xs uppercase tracking-wide text-slate-500">Bill to</p><p className="font-semibold">{inv.billTo}</p></div>
          <div><p className="text-xs uppercase tracking-wide text-slate-500">Site address</p><p>{inv.siteAddress}</p></div>
          <div className="sm:text-right">
            <p><span className="text-slate-500">Issued</span> {fmt(inv.issueDate)}</p>
            <p><span className="text-slate-500">Due</span> {fmt(inv.dueDate)}</p>
            <p className="mt-1"><Pill tone={inv.status === 'paid' ? 'green' : inv.status === 'overdue' ? 'red' : 'slate'}>{inv.status}</Pill></p>
          </div>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[460px] text-sm">
            <thead className="border-b border-slate-200 text-left text-xs text-slate-500"><tr><th className="py-2">Item</th><th>Description</th><th className="text-right">Unit price</th><th className="text-right">Qty</th><th className="text-right">Amount</th></tr></thead>
            <tbody>{inv.lines.map((l, i) => (<tr key={i} className="border-b border-slate-100 align-top"><td className="py-2 pr-2 text-slate-600">{l.category ?? 'Service'}</td><td className="py-2">{i + 1}. {l.description}</td><td className="py-2 text-right">{money(l.unitPrice)}</td><td className="py-2 text-right">{String(l.qty).padStart(2, '0')}</td><td className="py-2 text-right tabular-nums">{money(l.unitPrice * l.qty)}</td></tr>))}</tbody>
          </table>
        </div>
        <dl className="ml-auto mt-3 grid w-full max-w-xs grid-cols-2 gap-y-1 text-sm">
          <dt className="text-slate-500">Subtotal</dt><dd className="text-right tabular-nums">{money(subtotal)}</dd>
          <dt className="font-semibold">Total</dt><dd className="text-right font-semibold tabular-nums">{money(subtotal)}</dd>
          <dt className="text-slate-500">Amount paid</dt><dd className="text-right tabular-nums">{money(inv.amountPaid)}</dd>
          <dt className="font-semibold">Balance due</dt><dd className="text-right font-semibold tabular-nums">{money(balance)}</dd>
        </dl>
        <div className="mt-5 grid gap-3 border-t border-slate-200 pt-4 text-xs text-slate-600 sm:grid-cols-2">
          <div>
            <p className="font-semibold text-slate-900">{tenant.name}</p>
            <p>{tenant.license}</p>
            <p>{termsOf(vertical).field}: {job?.technician ?? '—'} (sample) · {termsOf(vertical).invoiceFieldLine}</p>
            <p className="mt-2 text-slate-500">Payment instructions appear here on live invoices.</p>
          </div>
          <div className="sm:text-right">
            <p>Work order: {job ? (mode === 'office' ? <Link className="underline" href={osHref(s, `/office/jobs/${job.id}`)}>{job.number}</Link> : job.number) : '—'}</p>
            <p>Report packet: {inv.reportIds.length ? inv.reportIds.map((rid) => <Link key={rid} className="underline" href={osHref(s, mode === 'office' ? `/office/reports/${rid}` : `/report/${rid}`)}>{state.reports.find((x) => x.id === rid)?.number ?? rid} </Link>) : '—'}</p>
            <p>Payment / follow-up: {inv.followUp}</p>
          </div>
        </div>
        <p className="mt-4 text-xs text-slate-500">Sample prices are placeholders, not {tenant.name} rates. There is no pay link: this preview never takes a payment.</p>
      </DocFrame>
      {mode === 'office' ? (
        <div className="mx-auto max-w-3xl space-y-2 rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
          <p className="font-semibold">Office actions</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" disabled={inv.status !== 'draft'} onClick={() => updateInvoice(inv.id, { status: 'sent', followUp: 'Sent (sample); reminder 7 days before due — a person sends it' })} className="rounded-lg border border-slate-300 px-3 py-2 disabled:opacity-40">Mark sent (sample)</button>
            <button type="button" disabled={inv.status === 'paid' || inv.status === 'draft'} onClick={() => updateInvoice(inv.id, { status: 'paid', amountPaid: subtotal, followUp: 'Paid in full (sample)' })} className="rounded-lg border border-slate-300 px-3 py-2 disabled:opacity-40">Record payment (sample)</button>
          </div>
          <Guardrail>Preview: no invoice is emailed, no payment link exists and no money moves.</Guardrail>
        </div>
      ) : job ? (
        <p className="text-center text-sm"><Link className="font-semibold text-[var(--brand-dark)] underline" href={osHref(s, `/status/${job.leadId}`)}>← Back to request status</Link></p>
      ) : null}
    </div>
  );
}
