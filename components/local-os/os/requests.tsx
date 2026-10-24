'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useDemo } from '@/components/local-os/os/demo-store';
import { Card, Guardrail, NavLink, Pill, SampleBadge, leadTone, money, osHref, when } from '@/components/local-os/os/ui';
import type { DemoLead } from '@/lib/local-os/demo-types';

/**
 * Request queue with callback and follow-up status. Every status change is a
 * person's decision; drafting an estimate creates a DRAFT that still needs the
 * contractor's review before it can be sent.
 */
export function Requests() {
  const { tenant, vertical, state, updateLead, addQuote } = useDemo();
  const params = useSearchParams();
  const [open, setOpen] = useState<string | null>(params?.get('open') ?? null);
  const [filter, setFilter] = useState<'active' | 'all'>('active');
  const s = tenant.slug;
  const label = (id: string) => vertical.leadStatuses.find((x) => x.id === id)?.label ?? id;
  const lane = (id: string) => vertical.lanes.find((l) => l.id === id)?.label ?? id;
  const leads = state.leads
    .filter((l) => filter === 'all' || !['won', 'lost'].includes(l.status))
    .sort((a, b) => (a.urgency === 'emergency' ? -1 : 0) - (b.urgency === 'emergency' ? -1 : 0) || (a.dueAt ?? 'z').localeCompare(b.dueAt ?? 'z'));

  function draftEstimate(l: DemoLead) {
    const existing = state.quotes.find((q) => q.leadId === l.id);
    if (existing) return existing.id;
    const lines = vertical.quoteLines
      .filter((q) => q.laneId === l.laneId)
      .slice(0, 2)
      .map((q) => ({ label: q.label, unit: q.unit, qty: 1, unitPrice: q.sampleUnitPrice }));
    const id = `Q-${Math.floor(Math.random() * 9000 + 1000)}`;
    addQuote({ id, sample: true, leadId: l.id, number: `EST-${id.slice(2)} (sample)`, laneId: l.laneId, scope: `${l.workType} at ${l.address}.`, lines, status: 'draft', reviewedBy: null, reviewNote: '', fromReportId: null, customerApproval: null });
    updateLead(l.id, { status: 'quoted', nextAction: 'Review the draft estimate before it is sent' });
    return id;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Requests</h1>
        <div className="flex gap-2 text-sm">
          {(['active', 'all'] as const).map((f) => (
            <button key={f} type="button" onClick={() => setFilter(f)} className={`rounded-md px-3 py-1.5 ${filter === f ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 ring-1 ring-slate-200'}`}>
              {f === 'active' ? 'Open' : 'All'}
            </button>
          ))}
          <NavLink href={osHref(s, '/office/intake')}>+ New request</NavLink>
        </div>
      </div>
      <ul className="space-y-2">
        {leads.map((l) => {
          const quote = state.quotes.find((q) => q.leadId === l.id);
          const isOpen = open === l.id;
          return (
            <li key={l.id} className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <button type="button" onClick={() => setOpen(isOpen ? null : l.id)} className="flex w-full flex-wrap items-center justify-between gap-2 p-4 text-left">
                <div className="min-w-0">
                  <p className="flex flex-wrap items-center gap-2 font-medium">
                    <SampleBadge /> {l.company ?? l.name}
                    <Pill tone={leadTone(l.status)}>{label(l.status)}</Pill>
                    {l.urgency === 'emergency' ? <Pill tone="red">Emergency</Pill> : null}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">{lane(l.laneId)} · {l.workType} · {l.buildingType}</p>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <p>{l.nextAction}</p>
                  {l.dueAt ? <p>Due {when(l.dueAt)}</p> : null}
                </div>
              </button>
              {isOpen ? (
                <div className="space-y-3 border-t border-slate-100 p-4 text-sm">
                  <div className="grid gap-2 sm:grid-cols-2">
                    <p><span className="text-slate-500">Contact:</span> {l.name} · <a className="underline" href={`tel:${l.phone}`}>{l.phone}</a>{l.email ? ` · ${l.email}` : ''}</p>
                    <p><span className="text-slate-500">Property:</span> {l.address}</p>
                    <p><span className="text-slate-500">Source:</span> {l.source} · received {when(l.createdAt)}</p>
                    <p><span className="text-slate-500">Urgency:</span> {vertical.urgency.find((u) => u.id === l.urgency)?.label}</p>
                  </div>
                  <p className="rounded-lg bg-slate-50 px-3 py-2">{l.notes}</p>
                  {l.photos?.length ? <p className="text-xs text-slate-500">Site photos attached: {l.photos.join(', ')} (sample; files stay with the customer’s browser)</p> : null}
                  {l.urgency === 'emergency' ? <Guardrail>{vertical.guardrails.emergency}</Guardrail> : null}
                  <div className="flex flex-wrap gap-2">
                    <button type="button" className="rounded-md bg-white px-3 py-1.5 ring-1 ring-slate-200" onClick={() => updateLead(l.id, { status: 'contacted', nextAction: 'Qualify: confirm scope and access', dueAt: null })}>Logged a call</button>
                    <button type="button" className="rounded-md bg-white px-3 py-1.5 ring-1 ring-slate-200" onClick={() => updateLead(l.id, { status: 'callback', nextAction: 'Call back', dueAt: new Date(Date.now() + 24 * 3600e3).toISOString() })}>Callback tomorrow</button>
                    <button type="button" className="rounded-md bg-white px-3 py-1.5 ring-1 ring-slate-200" onClick={() => updateLead(l.id, { status: 'follow_up', nextAction: 'Follow up: no answer', dueAt: new Date(Date.now() + 2 * 24 * 3600e3).toISOString() })}>No answer → follow up</button>
                    <button type="button" className="rounded-md bg-white px-3 py-1.5 ring-1 ring-slate-200" onClick={() => updateLead(l.id, { status: 'qualified', nextAction: 'Draft an estimate' })}>Qualified</button>
                    <button type="button" className="rounded-md bg-white px-3 py-1.5 ring-1 ring-slate-200" onClick={() => updateLead(l.id, { status: 'lost', nextAction: 'None', dueAt: null })}>Not proceeding</button>
                    {quote ? (
                      <NavLink href={osHref(s, `/office/quotes/${quote.id}`)}>Open {quote.number} ({money(quote.lines.reduce((a, x) => a + x.qty * x.unitPrice, 0))} sample)</NavLink>
                    ) : l.urgency !== 'emergency' ? (
                      <button type="button" className="rounded-md bg-[var(--brand)] px-3 py-1.5 font-medium text-white" onClick={() => { const id = draftEstimate(l); window.location.assign(osHref(s, `/office/quotes/${id}`)); }}>Draft estimate for review</button>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
      {!leads.length ? <Card><p className="text-sm text-slate-500">No open requests.</p></Card> : null}
    </div>
  );
}
