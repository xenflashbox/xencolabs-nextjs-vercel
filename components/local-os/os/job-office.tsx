'use client';

import { useState } from 'react';
import { useDemo } from '@/components/local-os/os/demo-store';
import { Card, Guardrail, NavLink, Pill, SampleBadge, money, osHref, when } from '@/components/local-os/os/ui';

/**
 * The scheduled job as the office sees it: when, who, where, scope, live
 * checklist progress from the technician, and — once the work is complete — the
 * completion report, which the contractor must sign off before it or an invoice
 * goes anywhere.
 */
export function JobOffice({ id }: { id: string }) {
  const { tenant, vertical, state, updateJob } = useDemo();
  const [signer, setSigner] = useState('');
  const j = state.jobs.find((x) => x.id === id);
  if (!j) return <Card><p className="text-sm">No such sample job.</p></Card>;
  const s = tenant.slug;
  const lane = vertical.lanes.find((l) => l.id === j.laneId)?.label ?? j.laneId;
  const done = j.checklist.filter((c) => c.done).length;
  const invoice = state.invoices.find((i) => i.jobId === j.id);
  const quote = state.quotes.find((q) => q.id === j.quoteId);
  const before = j.photos.filter((p) => p.phase === 'before');
  const after = j.photos.filter((p) => p.phase === 'after');

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="flex items-center gap-2 text-2xl font-semibold"><SampleBadge /> {j.number}</h1>
        <Pill tone={j.status === 'report_ready' ? 'green' : j.status === 'in_progress' ? 'blue' : 'slate'}>{j.status.replace('_', ' ')}</Pill>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Schedule">
          <dl className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-1 text-sm">
            <dt className="text-slate-500">Service</dt><dd>{j.title.toLowerCase().startsWith(lane.toLowerCase()) ? j.title : `${lane}: ${j.title}`}</dd>
            <dt className="text-slate-500">When</dt><dd>{when(j.scheduledStart)} – {when(j.scheduledEnd).split(', ').pop()}</dd>
            <dt className="text-slate-500">Technician</dt><dd>{j.technician} (sample)</dd>
            <dt className="text-slate-500">Site contact</dt><dd>{j.siteContact}</dd>
            <dt className="text-slate-500">Access</dt><dd>{j.accessNotes}</dd>
            {quote ? (<><dt className="text-slate-500">Estimate</dt><dd><NavLink href={osHref(s, `/quotes/${quote.id}`)}>{quote.number}</NavLink></dd></>) : null}
          </dl>
          <div className="mt-3 flex flex-wrap gap-3">
            <NavLink href={osHref(s, `/tech/${j.id}`)}>Technician job packet →</NavLink>
            <NavLink href={osHref(s, `/status/${j.id}`)}>Customer status view →</NavLink>
          </div>
          {j.status === 'scheduled' ? (
            <button type="button" onClick={() => updateJob(j.id, { status: 'confirmed' })} className="mt-3 rounded-md bg-white px-3 py-1.5 text-sm ring-1 ring-slate-200">Customer confirmed the appointment</button>
          ) : null}
        </Card>
        <Card title={`Field progress · ${done}/${j.checklist.length} checklist items`}>
          <ul className="list-disc space-y-1 pl-5 text-sm">{j.scope.map((x) => <li key={x}>{x}</li>)}</ul>
          <p className="mt-2 text-xs text-slate-500">{before.length} before · {after.length} after photos</p>
          {j.techNotes ? <p className="mt-2 whitespace-pre-wrap rounded-lg bg-slate-50 px-3 py-2 text-sm">{j.techNotes}</p> : null}
        </Card>
      </div>

      {j.status === 'completed' || j.status === 'report_ready' ? (
        <Card title="Completion report">
          <Guardrail>{vertical.guardrails.completion} {vertical.guardrails.compliance}</Guardrail>
          <div className="mt-3 space-y-3 text-sm">
            <section><h3 className="font-semibold">{vertical.reportSections[0]}</h3><ul className="list-disc pl-5">{j.scope.map((x) => <li key={x}>{x}</li>)}</ul></section>
            <section><h3 className="font-semibold">{vertical.reportSections[1]}</h3>
              <ul className="list-disc pl-5">{j.checklist.filter((c) => c.done).map((c) => <li key={c.id}>{c.label}</li>)}</ul>
              {j.techNotes ? <p className="mt-1 whitespace-pre-wrap text-slate-700">{j.techNotes}</p> : null}
            </section>
            <section><h3 className="font-semibold">{vertical.reportSections[2]}</h3><p className="text-slate-600">{before.length} before, {after.length} after (in this browser only during the preview).</p></section>
            <section><h3 className="font-semibold">{vertical.reportSections[3]}</h3><p className="text-slate-600">Added by the contractor when signing off.</p></section>
          </div>
          {j.status === 'completed' ? (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <input value={signer} onChange={(e) => setSigner(e.target.value)} placeholder="Contractor name to sign off" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              <button type="button" disabled={signer.trim().length < 2} onClick={() => updateJob(j.id, { status: 'report_ready', reportApprovedBy: `${signer.trim()} (sample sign-off)` })} className="rounded-md bg-[var(--brand)] px-3 py-2 text-sm font-medium text-white disabled:opacity-40">Sign off report</button>
            </div>
          ) : (
            <p className="mt-3 text-sm">Signed off by {j.reportApprovedBy}. Preview: no report is sent to the customer.</p>
          )}
        </Card>
      ) : null}

      {invoice ? (
        <Card title="Invoice and payment follow-up">
          <p className="flex flex-wrap items-center gap-2 text-sm"><SampleBadge /> {invoice.number} · {money(invoice.amount)} <Pill tone={invoice.status === 'overdue' ? 'red' : 'slate'}>{invoice.status}</Pill></p>
          <p className="mt-1 text-xs text-slate-500">{invoice.followUp}. Preview: no invoice or payment link is sent, and no payment is taken.</p>
        </Card>
      ) : null}
      <NavLink href={osHref(s)}>← Dashboard</NavLink>
    </div>
  );
}
