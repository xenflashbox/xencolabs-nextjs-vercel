'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useDemo } from '@/components/local-os/os/demo-store';
import { termsOf } from '@/lib/local-os/terms';
import { Card, Guardrail, NavLink, Pill, SampleBadge, money, osHref } from '@/components/local-os/os/ui';

const STEPS = ['draft', 'reviewed', 'approved_to_send', 'sent', 'accepted'] as const;
const STEP_LABEL: Record<string, string> = {
  draft: 'Draft',
  reviewed: 'Scope reviewed',
  approved_to_send: 'Approved to send',
  sent: 'Sent (sample)',
  accepted: 'Accepted (sample)',
  declined: 'Declined',
};

/**
 * Estimate review. A draft never moves on by itself: the contractor confirms the
 * scope, then approves it by name, and only then can it be "sent" (in the
 * preview, sending does nothing). Prices shown are placeholders, not Nemesis rates.
 */
export function QuoteReview({ id }: { id: string }) {
  const { tenant, vertical, state, updateQuote, updateLead, addJob } = useDemo();
  const q = state.quotes.find((x) => x.id === id);
  const [checks, setChecks] = useState({ scope: false, site: false, exclusions: false });
  const [approver, setApprover] = useState('');
  const [date, setDate] = useState('');
  if (!q) return <Card><p className="text-sm">No such sample estimate.</p></Card>;
  const lead = state.leads.find((l) => l.id === q.leadId);
  const job = state.jobs.find((j) => j.quoteId === q.id);
  const total = q.lines.reduce((a, l) => a + l.qty * l.unitPrice, 0);
  const editable = q.status === 'draft';
  const s = tenant.slug;

  function setLine(i: number, patch: { qty?: number; unitPrice?: number }) {
    updateQuote(q!.id, { lines: q!.lines.map((l, j) => (j === i ? { ...l, ...patch } : l)) });
  }

  function schedule() {
    if (!date || !lead) return;
    const start = new Date(date);
    const jid = `J-${Math.floor(Math.random() * 9000 + 1000)}`;
    const items = (vertical.checklists[q!.laneId] ?? []).map((c, i) => ({ id: `${q!.laneId}-${i}`, section: c.section, label: c.label, done: false }));
    addJob({
      id: jid, sample: true, number: `JOB-${jid.slice(2)} (sample)`, leadId: lead.id, quoteId: q!.id, reportId: null, laneId: q!.laneId,
      title: lead.workType, scheduledStart: start.toISOString(), scheduledEnd: new Date(start.getTime() + 90 * 60e3).toISOString(),
      technician: termsOf(vertical).sampleFieldName, status: 'scheduled', siteContact: `${lead.name} · ${lead.phone}`, accessNotes: 'Confirm access with the site contact.',
      scope: [q!.scope], checklist: items, photos: [], techNotes: '', reportApprovedBy: null,
    });
    updateLead(lead.id, { status: 'won', nextAction: 'Job scheduled', dueAt: null });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="flex items-center gap-2 text-2xl font-semibold"><SampleBadge /> {q.number}</h1>
        <Pill tone={q.status === 'accepted' ? 'green' : q.status === 'draft' ? 'amber' : 'blue'}>{STEP_LABEL[q.status]}</Pill>
      </div>
      <ol className="flex flex-wrap gap-1 text-xs">
        {STEPS.map((st, i) => (
          <li key={st} className={`rounded-full px-2.5 py-1 ${STEPS.indexOf(q.status as (typeof STEPS)[number]) >= i ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-600'}`}>{i + 1}. {STEP_LABEL[st]}</li>
        ))}
      </ol>
      <Guardrail>{vertical.guardrails.quote} Sample prices for this preview, not {tenant.name}’s rates.</Guardrail>

      <Card title="Customer and property">
        <p className="text-sm">{lead?.company ?? lead?.name} · {lead?.address} · {lead?.buildingType}</p>
        <p className="mt-1 text-xs text-slate-500">{lead?.workType} · {lead?.notes}</p>
      </Card>

      <Card title="Scope and lines">
        <textarea value={q.scope} disabled={!editable} onChange={(e) => updateQuote(q.id, { scope: e.target.value })} rows={2} className="mb-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:bg-slate-50" />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-sm">
            <thead className="text-left text-xs text-slate-500"><tr><th className="py-1">Item</th><th>Qty</th><th>Unit price (sample)</th><th className="text-right">Line</th></tr></thead>
            <tbody>
              {q.lines.map((l, i) => (
                <tr key={i} className="border-t border-slate-100">
                  <td className="py-2">{l.group ? <span className="block text-[10px] font-semibold uppercase tracking-wide text-slate-500">{l.group}</span> : null}{l.label}<span className="block text-xs text-slate-500">per {l.unit}</span></td>
                  <td><input type="number" min={0} value={l.qty} disabled={!editable} onChange={(e) => setLine(i, { qty: Number(e.target.value) })} className="w-24 rounded border border-slate-300 px-2 py-1 disabled:bg-slate-50" /></td>
                  <td><input type="number" min={0} value={l.unitPrice} disabled={!editable} step="any" onChange={(e) => setLine(i, { unitPrice: Number(e.target.value) })} className="w-24 rounded border border-slate-300 px-2 py-1 disabled:bg-slate-50" /></td>
                  <td className="text-right tabular-nums">{money(l.qty * l.unitPrice)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot><tr className="border-t border-slate-200 font-semibold"><td className="py-2" colSpan={3}>Total (sample)</td><td className="text-right tabular-nums">{money(total)}</td></tr></tfoot>
          </table>
        </div>
      </Card>

      {q.status === 'draft' ? (
        <Card title="Contractor review">
          <div className="space-y-2 text-sm">
            {([
              ['scope', 'I reviewed the scope against what the customer described.'],
              ['site', 'Scope confirmed on site, from drawings, or by phone (note how below).'],
              ['exclusions', 'Exclusions and anything needing a separate permit or engineer are called out.'],
            ] as const).map(([k, text]) => (
              <label key={k} className="flex items-start gap-2"><input type="checkbox" className="mt-1" checked={checks[k]} onChange={() => setChecks((c) => ({ ...c, [k]: !c[k] }))} />{text}</label>
            ))}
            <textarea placeholder="Review note (how the scope was confirmed)" value={q.reviewNote} onChange={(e) => updateQuote(q.id, { reviewNote: e.target.value })} rows={2} className="w-full rounded-lg border border-slate-300 px-3 py-2" />
            <button type="button" disabled={!checks.scope || !checks.site || !checks.exclusions} onClick={() => updateQuote(q.id, { status: 'reviewed' })} className="rounded-md bg-slate-900 px-3 py-2 font-medium text-white disabled:opacity-40">Mark scope reviewed</button>
          </div>
        </Card>
      ) : null}

      {q.status === 'reviewed' ? (
        <Card title="Approve to send">
          <div className="space-y-2 text-sm">
            <p>Type your name to approve this estimate for sending. Until then it cannot leave the office.</p>
            <input value={approver} onChange={(e) => setApprover(e.target.value)} placeholder="Licensed contractor name" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
            <button type="button" disabled={approver.trim().length < 2} onClick={() => updateQuote(q.id, { status: 'approved_to_send', reviewedBy: `${approver.trim()} (sample sign-off)` })} className="rounded-md bg-[var(--brand)] px-3 py-2 font-medium text-white disabled:opacity-40">I approve this estimate</button>
          </div>
        </Card>
      ) : null}

      {q.status === 'approved_to_send' ? (
        <Card title="Send">
          <p className="text-sm">Approved by {q.reviewedBy}.</p>
          <button type="button" onClick={() => updateQuote(q.id, { status: 'sent' })} className="mt-2 rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white">Mark as sent (preview: nothing is emailed)</button>
        </Card>
      ) : null}

      {q.status === 'sent' ? (
        <Card title="Customer response (sample)">
          <div className="flex gap-2">
            <button type="button" onClick={() => updateQuote(q.id, { status: 'accepted' })} className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white">Customer accepted</button>
            <button type="button" onClick={() => updateQuote(q.id, { status: 'declined' })} className="rounded-md bg-white px-3 py-2 text-sm ring-1 ring-slate-200">Customer declined</button>
          </div>
        </Card>
      ) : null}

      {q.status === 'accepted' ? (
        <Card title="Schedule the job">
          {job ? (
            <p className="text-sm">Scheduled: <Link className="underline" href={osHref(s, `/office/jobs/${job.id}`)}>{job.number}</Link></p>
          ) : (
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2" />
              <button type="button" disabled={!date} onClick={schedule} className="rounded-md bg-[var(--brand)] px-3 py-2 font-medium text-white disabled:opacity-40">Create scheduled job</button>
              <span className="text-xs text-slate-500">Preview: no calendar invite is sent.</span>
            </div>
          )}
        </Card>
      ) : null}

      {['sent', 'accepted', 'declined'].includes(q.status) ? <NavLink href={osHref(s, `/estimate/${q.id}`)}>Customer’s view of this estimate →</NavLink> : null}
      <NavLink href={osHref(s, '/office/requests')}>← Requests</NavLink>
    </div>
  );
}
