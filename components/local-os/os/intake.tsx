'use client';

import { useState } from 'react';
import { useDemo } from '@/components/local-os/os/demo-store';
import { Card, Guardrail, NavLink, osHref } from '@/components/local-os/os/ui';

/**
 * Service-request intake with the fire-protection vocabulary. In the preview it
 * only adds a SAMPLE request to this browser's queue; it does not touch the live
 * Nemesis contact form or send email. An emergency is turned into a phone call
 * before anything else: the system never dispatches.
 */
export function Intake() {
  const { tenant, vertical, addLead } = useDemo();
  const lanes = vertical.lanes.filter((l) => tenant.laneIds.includes(l.id));
  const [laneId, setLaneId] = useState(lanes[0]?.id ?? '');
  const [urgency, setUrgency] = useState('routine');
  const [done, setDone] = useState<string | null>(null);
  const lane = lanes.find((l) => l.id === laneId);
  const emergency = urgency === 'emergency' || laneId === 'emergency';

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? '').trim();
    const id = `L-${Math.floor(Math.random() * 9000 + 1000)}`;
    addLead({
      id, sample: true, createdAt: new Date().toISOString(), name: `${v('name') || 'Preview requester'} (sample)`,
      company: v('company') || null, phone: v('phone'), email: v('email') || null, address: v('address'),
      buildingType: v('buildingType'), laneId, workType: v('workType'), urgency: emergency ? 'emergency' : urgency, notes: v('notes'),
      status: 'new', nextAction: emergency ? 'Emergency: call now' : 'Call back to qualify', dueAt: new Date(Date.now() + (emergency ? 0 : 4 * 3600e3)).toISOString(),
      source: 'preview intake',
    });
    setDone(id);
    e.currentTarget.reset();
  }

  const field = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base';
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-2xl font-semibold">New service request</h1>
      <Guardrail>Preview form: submitting adds a sample request to this browser’s queue only. Nothing is emailed, and the live nemesisfire.com contact form is not used.</Guardrail>
      {done ? (
        <Card>
          <p className="text-sm">Sample request {done} added to the queue.</p>
          <div className="mt-2 flex gap-4"><NavLink href={osHref(tenant.slug, `/requests?open=${done}`)}>Open it</NavLink><button type="button" className="text-sm underline" onClick={() => setDone(null)}>Add another</button></div>
        </Card>
      ) : (
        <form onSubmit={submit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <fieldset className="space-y-2">
            <legend className="text-sm font-semibold">Service needed</legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {lanes.map((l) => (
                <label key={l.id} className={`cursor-pointer rounded-lg border px-3 py-2 text-sm ${laneId === l.id ? 'border-[var(--brand)] bg-red-50' : 'border-slate-200'}`}>
                  <input type="radio" name="lane" className="sr-only" checked={laneId === l.id} onChange={() => setLaneId(l.id)} />
                  {l.label}
                </label>
              ))}
            </div>
            <select name="workType" required className={field}>
              {lane?.workTypes.map((w) => <option key={w}>{w}</option>)}
            </select>
          </fieldset>
          <fieldset className="space-y-2">
            <legend className="text-sm font-semibold">How urgent?</legend>
            {vertical.urgency.map((u) => (
              <label key={u.id} className="flex items-start gap-2 text-sm">
                <input type="radio" name="urgency" value={u.id} checked={urgency === u.id} onChange={() => setUrgency(u.id)} className="mt-1" />
                <span>{u.label}<span className="block text-xs text-slate-500">{u.routing}</span></span>
              </label>
            ))}
          </fieldset>
          {emergency ? (
            <div className="rounded-lg border-2 border-[var(--brand)] bg-red-50 p-3 text-sm">
              <p className="font-semibold text-[var(--brand-dark)]">Emergency? Call {tenant.name} now: <a className="underline" href={`tel:${tenant.phone}`}>{tenant.phone}</a></p>
              <p className="mt-1 text-xs text-slate-700">{vertical.guardrails.emergency} You can still log the details below.</p>
            </div>
          ) : null}
          <fieldset className="grid gap-3 sm:grid-cols-2">
            <legend className="mb-1 text-sm font-semibold sm:col-span-2">Property</legend>
            <input name="address" required placeholder="Property address" className={`${field} sm:col-span-2`} />
            <select name="buildingType" required className={`${field} sm:col-span-2`} defaultValue="">
              <option value="" disabled>Property / building type</option>
              {vertical.buildingTypes.map((b) => <option key={b}>{b}</option>)}
            </select>
          </fieldset>
          <fieldset className="grid gap-3 sm:grid-cols-2">
            <legend className="mb-1 text-sm font-semibold sm:col-span-2">Contact</legend>
            <input name="name" required placeholder="Your name" className={field} />
            <input name="company" placeholder="Company / property (optional)" className={field} />
            <input name="phone" required type="tel" placeholder="Phone" className={field} />
            <input name="email" type="email" placeholder="Email (optional)" className={field} />
          </fieldset>
          <textarea name="notes" rows={4} placeholder="What is happening? Number of buildings, extinguishers, system type, access…" className={field} />
          <button type="submit" className="h-12 w-full rounded-lg bg-[var(--brand)] font-semibold text-white">Add sample request</button>
        </form>
      )}
    </div>
  );
}
