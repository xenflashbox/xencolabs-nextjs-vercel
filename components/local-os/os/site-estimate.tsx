'use client';

import Link from 'next/link';
import { Fragment, useState } from 'react';
import { DocFrame } from '@/components/local-os/os/doc-frame';
import { useDemo } from '@/components/local-os/os/demo-store';
import { money, osHref } from '@/components/local-os/os/ui';
import { lineTotal } from '@/lib/local-os/journey';
import { termsOf } from '@/lib/local-os/terms';

/**
 * The customer's view of an estimate the contractor has approved and sent. The customer can
 * approve or decline it here (sample: nothing is signed, charged or scheduled automatically).
 * Drafts are never visible to the customer.
 */
export function SiteEstimate({ id }: { id: string }) {
  const { tenant, vertical, state, updateQuote, updateLead } = useDemo();
  const [name, setName] = useState('');
  const q = state.quotes.find((x) => x.id === id);
  if (!q || !['sent', 'accepted', 'declined'].includes(q.status)) return <p className="mx-auto max-w-3xl p-6 text-sm">This estimate is not available.</p>;
  const lead = state.leads.find((l) => l.id === q.leadId);
  const report = state.reports.find((r) => r.id === q.fromReportId);
  const total = lineTotal(q.lines);
  return (
    <div className="space-y-5 px-4 py-10">
      <DocFrame tenant={tenant} title={`Estimate ${q.number}`} notice={vertical.guardrails.document}>
        <div className="grid gap-4 text-sm sm:grid-cols-2">
          <div><p className="text-xs uppercase tracking-wide text-slate-500">Prepared for</p><p className="font-semibold">{lead?.company ?? lead?.name}</p><p>{lead?.address}</p></div>
          <div className="sm:text-right"><p className="text-xs uppercase tracking-wide text-slate-500">Reviewed by</p><p>{q.reviewedBy}</p>{report ? <p>{termsOf(vertical).fromReport} <Link className="underline" href={osHref(tenant.slug, `/report/${report.id}`)}>{report.number}</Link></p> : null}</div>
        </div>
        <p className="mt-4 text-sm">{q.scope}</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[460px] text-sm">
            <thead className="border-b border-slate-200 text-left text-xs text-slate-500"><tr><th className="py-2">Description</th><th className="text-right">Qty</th><th className="text-right">Unit price</th><th className="text-right">Amount</th></tr></thead>
            <tbody>{q.lines.map((l, i) => (
              <Fragment key={i}>
                {l.group && l.group !== q.lines[i - 1]?.group ? (
                  <tr className="bg-slate-50"><td colSpan={3} className="py-1.5 pl-1 text-xs font-semibold uppercase tracking-wide text-slate-600">{l.group}</td><td className="py-1.5 text-right text-xs font-semibold tabular-nums text-slate-600">{money(lineTotal(q.lines.filter((x) => x.group === l.group)))}</td></tr>
                ) : null}
                <tr className="border-b border-slate-100"><td className="py-2">{l.label}<span className="block text-xs text-slate-500">per {l.unit}</span></td><td className="text-right">{l.qty.toLocaleString('en-US')}</td><td className="text-right">{money(l.unitPrice)}</td><td className="text-right tabular-nums">{money(l.qty * l.unitPrice)}</td></tr>
              </Fragment>
            ))}</tbody>
            <tfoot><tr className="font-semibold"><td className="py-2" colSpan={3}>Total (sample prices)</td><td className="text-right tabular-nums">{money(total)}</td></tr></tfoot>
          </table>
        </div>
        <p className="mt-3 text-xs text-slate-500">{vertical.guardrails.quote} Sample prices for this preview, not {tenant.name}’s rates.</p>
        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
          {q.status === 'sent' ? (
            <div className="space-y-2 text-sm">
              <p className="font-semibold">Approve this estimate</p>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2" />
              <div className="flex flex-wrap gap-2">
                <button type="button" disabled={name.trim().length < 2} onClick={() => { updateQuote(q.id, { status: 'accepted', customerApproval: `${name.trim()} (sample)` }); if (lead) updateLead(lead.id, { nextAction: 'Customer approved repairs: schedule the work' }); }} className="rounded-lg bg-[var(--brand)] px-4 py-2 font-semibold text-white disabled:opacity-40">Approve (sample)</button>
                <button type="button" onClick={() => updateQuote(q.id, { status: 'declined' })} className="rounded-lg border border-slate-300 bg-white px-4 py-2">Decline</button>
              </div>
              <p className="text-xs text-slate-500">Preview: approving records your sample approval only. Nothing is signed, charged or scheduled automatically; the office schedules the work.</p>
            </div>
          ) : (
            <p className="text-sm">{q.status === 'accepted' ? `Approved by ${q.customerApproval ?? 'the customer'}. The office will schedule the work.` : 'Declined.'}</p>
          )}
        </div>
      </DocFrame>
      {lead ? <p className="text-center text-sm"><Link className="font-semibold text-[var(--brand-dark)] underline" href={osHref(tenant.slug, `/status/${lead.id}`)}>← Back to request status</Link></p> : null}
    </div>
  );
}
