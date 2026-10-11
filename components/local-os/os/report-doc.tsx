'use client';

import Link from 'next/link';
import { useState } from 'react';
import { DocFrame } from '@/components/local-os/os/doc-frame';
import { useDemo } from '@/components/local-os/os/demo-store';
import { Guardrail, Pill, osHref, when } from '@/components/local-os/os/ui';
import type { ItemResult } from '@/lib/local-os/demo-types';

const RESULT: Record<ItemResult, { label: string; tone: 'green' | 'red' | 'amber' | 'slate' }> = {
  pass: { label: 'Pass', tone: 'green' },
  fail: { label: 'Fail', tone: 'red' },
  attention: { label: 'Needs attention', tone: 'amber' },
  na: { label: 'N/A', tone: 'slate' },
  pending: { label: 'Pending', tone: 'slate' },
};

/**
 * Inspection / test report from a trade-module template (five-year sprinkler inspection,
 * multi-assembly backflow test). Customer mode shows only contractor-reviewed reports.
 * Office mode adds review, delivery (owner / AHJ — sample, nothing is filed) and a follow-up
 * estimate from the deficiencies.
 */
export function ReportDoc({ id, mode }: { id: string; mode: 'customer' | 'office' }) {
  const { tenant, vertical, state, updateReport, addQuote, updateLead } = useDemo();
  const [reviewer, setReviewer] = useState('');
  const r = state.reports.find((x) => x.id === id);
  if (!r || (mode === 'customer' && !r.reviewedBy)) return <p className="mx-auto max-w-3xl p-6 text-sm">This report is not available yet.</p>;
  const t = vertical.reportTemplates.find((x) => x.kind === r.kind);
  const job = state.jobs.find((j) => j.id === r.jobId);
  const s = tenant.slug;
  const pendingReadings = r.assemblies.some((a) => a.result === 'pending');

  function followUp() {
    if (!job) return;
    const qid = `Q-${Math.floor(Math.random() * 9000 + 1000)}`;
    const parts = vertical.lineItemFamilies.find((f) => f.id === 'parts')?.items ?? [];
    addQuote({
      id: qid, sample: true, leadId: job.leadId, number: `EST-${qid.slice(2)} (sample)`, laneId: 'emergency',
      scope: `Corrections recommended in ${r!.number}: ${r!.deficiencies.join('; ')}.`,
      lines: parts.slice(0, 2).map((p) => ({ label: p.description, unit: p.unit, qty: 1, unitPrice: p.sampleUnitPrice })),
      status: 'draft', reviewedBy: null, reviewNote: '', fromReportId: r!.id, customerApproval: null,
    });
    updateReport(r!.id, { followUpQuoteId: qid });
    updateLead(job.leadId, { nextAction: 'Review the follow-up estimate from the inspection' });
    window.location.assign(`/os/${s}/office/quotes/${qid}`);
  }

  return (
    <div className="space-y-5 py-6">
      <DocFrame tenant={tenant} title={`${t?.title ?? 'Report'} · ${r.number}`} notice={vertical.guardrails.document}>
        <div className="grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Property</p>
            <p className="font-semibold">{r.property.name}</p>
            <p>{r.property.address}</p>
            <p className="text-slate-600">{r.property.buildingType} · occupancy: {r.property.occupancy}</p>
            <p className="text-slate-600">{r.property.details}</p>
          </div>
          <div className="sm:text-right">
            <p className="text-xs uppercase tracking-wide text-slate-500">Visit</p>
            <p>{job ? when(job.scheduledStart) : '—'} · {job?.number}</p>
            <p>{r.technician.name}</p>
            <p className="text-slate-600">{r.technician.credential}</p>
            <p className="mt-1"><Pill tone={RESULT[r.overall].tone}>Overall: {RESULT[r.overall].label}</Pill></p>
          </div>
        </div>

        {r.systems.length ? (
          <section className="mt-5">
            <h3 className="text-sm font-semibold">Systems / risers</h3>
            <ul className="mt-1 text-sm">{r.systems.map((x) => <li key={x.id}>{x.id}: {x.type} · {x.location}{x.notes ? ` · ${x.notes}` : ''}</li>)}</ul>
          </section>
        ) : null}

        {r.items.length ? (
          <section className="mt-5 overflow-x-auto">
            <h3 className="text-sm font-semibold">Inspection and testing</h3>
            <table className="mt-2 w-full min-w-[460px] text-sm">
              <tbody>{r.items.map((it) => (<tr key={it.label} className="border-b border-slate-100 align-top"><td className="py-2 pr-3">{it.label}{it.note ? <span className="block text-xs text-slate-600">{it.note}</span> : null}</td><td className="py-2 text-right"><Pill tone={RESULT[it.result].tone}>{RESULT[it.result].label}</Pill></td></tr>))}</tbody>
            </table>
          </section>
        ) : null}

        {r.assemblies.length ? (
          <section className="mt-5 overflow-x-auto">
            <h3 className="text-sm font-semibold">Assemblies tested</h3>
            <table className="mt-2 w-full min-w-[640px] text-xs">
              <thead className="border-b border-slate-200 text-left text-slate-500"><tr><th className="py-1.5">#</th><th>Type / size</th><th>Make / model</th><th>Serial</th><th>Location</th><th>Check 1</th><th>Check 2</th><th>Relief</th><th className="text-right">Result</th></tr></thead>
              <tbody>{r.assemblies.map((a) => (<tr key={a.id} className="border-b border-slate-100"><td className="py-2">{a.id}</td><td>{a.type} {a.size}</td><td>{a.make} {a.model}</td><td>{a.serial}</td><td>{a.location}</td><td>{a.check1 || '—'}</td><td>{a.check2 || '—'}</td><td>{a.relief || '—'}</td><td className="text-right"><Pill tone={RESULT[a.result].tone}>{RESULT[a.result].label}</Pill></td></tr>))}</tbody>
            </table>
          </section>
        ) : null}

        {r.deficiencies.length ? (
          <section className="mt-5">
            <h3 className="text-sm font-semibold">Deficiencies and notes</h3>
            <ul className="mt-1 list-disc pl-5 text-sm">{r.deficiencies.map((d) => <li key={d}>{d}</li>)}</ul>
          </section>
        ) : null}

        <section className="mt-5 grid gap-2 rounded-xl bg-slate-50 p-3 text-sm sm:grid-cols-3">
          <p>Reviewed: <strong>{r.reviewedBy ?? 'not yet'}</strong></p>
          <p>Owner copy: <strong>{r.delivery.owner === 'sent' ? 'sent (sample)' : 'not sent'}</strong></p>
          <p>AHJ / water purveyor: <strong>{r.delivery.ahj === 'submitted' ? 'submitted (sample — nothing filed)' : r.delivery.ahj === 'not_required' ? 'not required' : 'not submitted'}</strong></p>
        </section>
        {r.followUpQuoteId ? (
          <p className="mt-3 text-sm">Follow-up: <Link className="font-semibold underline" href={osHref(s, mode === 'office' ? `/office/quotes/${r.followUpQuoteId}` : `/estimate/${r.followUpQuoteId}`)}>repair estimate</Link></p>
        ) : null}
        <p className="mt-3 text-xs text-slate-500">{vertical.guardrails.compliance}</p>
      </DocFrame>

      {mode === 'office' ? (
        <div className="mx-auto max-w-3xl space-y-3 rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
          <p className="font-semibold">Office actions</p>
          {!r.reviewedBy ? (
            <div className="flex flex-wrap items-center gap-2">
              <input value={reviewer} onChange={(e) => setReviewer(e.target.value)} placeholder="Licensed contractor name" className="rounded-lg border border-slate-300 px-3 py-2" />
              <button type="button" disabled={reviewer.trim().length < 2 || pendingReadings} onClick={() => updateReport(r.id, { reviewedBy: `${reviewer.trim()} (sample review)` })} className="rounded-lg bg-[var(--brand)] px-3 py-2 font-semibold text-white disabled:opacity-40">Mark reviewed</button>
              {pendingReadings ? <span className="text-xs text-slate-500">Waiting for the technician’s readings.</span> : null}
            </div>
          ) : null}
          <div className="flex flex-wrap gap-2">
            <button type="button" disabled={!r.reviewedBy || r.delivery.owner === 'sent'} onClick={() => updateReport(r.id, { delivery: { ...r.delivery, owner: 'sent' } })} className="rounded-lg border border-slate-300 px-3 py-2 disabled:opacity-40">Mark owner copy sent (sample)</button>
            <button type="button" disabled={!r.reviewedBy || r.delivery.ahj === 'submitted'} onClick={() => updateReport(r.id, { delivery: { ...r.delivery, ahj: 'submitted' } })} className="rounded-lg border border-slate-300 px-3 py-2 disabled:opacity-40">Mark AHJ submitted (sample)</button>
            {r.deficiencies.length && !r.followUpQuoteId ? <button type="button" onClick={followUp} className="rounded-lg bg-slate-900 px-3 py-2 font-semibold text-white">Draft follow-up estimate</button> : null}
          </div>
          <Guardrail>Preview: “sent” and “submitted” only change this sample record. No email is sent and nothing is filed with any city, water district or AHJ.</Guardrail>
          {job ? <Link className="underline" href={osHref(s, `/office/jobs/${job.id}`)}>← {job.number}</Link> : null}
        </div>
      ) : job ? (
        <p className="text-center text-sm"><Link className="font-semibold text-[var(--brand-dark)] underline" href={osHref(s, `/status/${job.leadId}`)}>← Back to request status</Link></p>
      ) : null}
    </div>
  );
}
