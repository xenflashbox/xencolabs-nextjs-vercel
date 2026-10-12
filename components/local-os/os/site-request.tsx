'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Fragment, useState } from 'react';
import { AiDemoPanel } from '@/components/local-os/os/ai-demo-panel';
import { useDemo } from '@/components/local-os/os/demo-store';
import { Guardrail, osHref } from '@/components/local-os/os/ui';
import { termsOf } from '@/lib/local-os/terms';

const STEPS = ['Service', 'Property', 'Contact', 'Review'] as const;

/**
 * Customer-facing guided intake. In the preview, submitting adds a SAMPLE request to this
 * browser's office queue (so the prospect can watch it arrive); nothing is emailed and the live
 * website form is never used. Emergencies are turned into "call the office now".
 */
export function SiteRequest() {
  const { tenant, vertical, addLead } = useDemo();
  const params = useSearchParams();
  const lanes = vertical.lanes.filter((l) => tenant.laneIds.includes(l.id));
  const [step, setStep] = useState(0);
  const [laneId, setLaneId] = useState(params?.get('lane') && lanes.some((l) => l.id === params.get('lane')) ? (params.get('lane') as string) : lanes[0]?.id ?? '');
  const [v, setV] = useState<Record<string, string>>({ urgency: 'routine' });
  const [done, setDone] = useState<string | null>(null);
  // Site photos stay in this browser (object URLs); only their names are kept on the sample request.
  const [photos, setPhotos] = useState<{ name: string; url: string }[]>([]);
  const lane = lanes.find((l) => l.id === laneId);
  const set = (k: string, val: string) => setV((x) => ({ ...x, [k]: val }));
  const emergency = v.urgency === 'emergency' || laneId === 'emergency' && /leak|activated|frozen/i.test(v.workType ?? '');
  const extra = vertical.intakeFields.filter((f) => !f.laneIds || f.laneIds.includes(laneId));
  const field = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base';
  const can = [Boolean(laneId && (v.workType ?? lane?.workTypes[0])), Boolean(v.address && v.buildingType), Boolean(v.name && v.phone), true][step];

  function submit() {
    const id = `L-${Math.floor(Math.random() * 9000 + 1000)}`;
    addLead({
      id, sample: true, createdAt: new Date().toISOString(), name: `${v.name} (sample)`, company: v.company || null, phone: v.phone ?? '',
      email: v.email || null, address: v.address ?? '', buildingType: v.buildingType ?? '', laneId, workType: v.workType ?? lane?.workTypes[0] ?? '',
      urgency: emergency ? 'emergency' : v.urgency ?? 'routine', notes: v.notes ?? '',
      fields: Object.fromEntries(extra.map((f) => [f.key, v[f.key] ?? '']).filter(([, x]) => x)),
      photos: photos.map((p) => p.name),
      status: 'new', nextAction: emergency ? 'Emergency: call the customer now' : 'Call back to qualify',
      dueAt: new Date(Date.now() + (emergency ? 0 : 4 * 3600e3)).toISOString(), source: 'website form',
    });
    setDone(id);
  }

  const callCard = (
    <div className="rounded-xl border-2 border-[var(--brand)] bg-white p-4">
      <p className="text-lg font-bold text-[var(--brand-dark)]">This is an emergency: call {tenant.name} now</p>
      <a href={`tel:+1${tenant.phone.replace(/[^0-9]/g, '')}`} className="mt-2 inline-block rounded-lg bg-[var(--brand)] px-5 py-3 text-lg font-bold text-white">{tenant.phone}</a>
      <p className="mt-2 text-sm text-slate-600">{vertical.guardrails.emergency} You can still send details below so the office has them.</p>
    </div>
  );

  if (done) {
    return (
      <div className="mx-auto max-w-3xl space-y-5 px-4 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-emerald-700">Request received (sample)</p>
          <h1 className="mt-1 text-2xl font-bold">Thanks — the {tenant.name} office will call you back.</h1>
          <p className="mt-2 text-slate-600">Reference {done}. {emergency ? 'For an emergency, please also call the office now.' : 'You can follow your request on its status page.'}</p>
          {emergency ? <div className="mt-4">{callCard}</div> : null}
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={osHref(tenant.slug, `/status/${done}`)} className="rounded-lg bg-[var(--brand)] px-4 py-2.5 font-semibold text-white">View request status</Link>
            <Link href={osHref(tenant.slug, `/office/requests?open=${done}`)} className="rounded-lg border border-slate-300 px-4 py-2.5 font-semibold">See it arrive in the office queue →</Link>
          </div>
          <p className="mt-4 text-xs text-slate-500">Preview: nothing was emailed or texted, and the live website form was not used.</p>
        </div>
        {tenant.aiDemo ? <AiDemoPanel tenantName={tenant.name} heading={tenant.aiDemoHeading} variant="compact" /> : null}
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1.6fr_1fr]">
      <div>
        <h1 className="text-3xl font-bold">Request service</h1>
        <ol className="mt-4 flex gap-1 text-xs">
          {STEPS.map((st, i) => (
            <li key={st} className={`flex-1 rounded-full px-2 py-1 text-center ${i <= step ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-600'}`}>{i + 1}. {st}</li>
          ))}
        </ol>
        <div className="mt-6 space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          {step === 0 ? (
            <>
              <fieldset className="space-y-2">
                <legend className="font-semibold">What do you need?</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {lanes.map((l) => (
                    <button type="button" key={l.id} onClick={() => { setLaneId(l.id); set('workType', l.workTypes[0] ?? ''); }} className={`rounded-lg border px-3 py-3 text-left text-sm ${laneId === l.id ? 'border-[var(--brand)] bg-red-50 font-semibold' : 'border-slate-200'}`}>{l.label}</button>
                  ))}
                </div>
                <select value={v.workType ?? lane?.workTypes[0]} onChange={(e) => set('workType', e.target.value)} className={field}>
                  {lane?.workTypes.map((w) => <option key={w}>{w}</option>)}
                </select>
              </fieldset>
              <fieldset className="space-y-2">
                <legend className="font-semibold">How urgent?</legend>
                {vertical.urgency.map((u) => (
                  <label key={u.id} className="flex items-start gap-2 text-sm">
                    <input type="radio" checked={v.urgency === u.id} onChange={() => set('urgency', u.id)} className="mt-1" />
                    <span>{u.label}<span className="block text-xs text-slate-500">{u.routing}</span></span>
                  </label>
                ))}
              </fieldset>
              {emergency ? callCard : null}
            </>
          ) : null}
          {step === 1 ? (
            <>
              <input value={v.address ?? ''} onChange={(e) => set('address', e.target.value)} placeholder="Property address" className={field} />
              <select value={v.buildingType ?? ''} onChange={(e) => set('buildingType', e.target.value)} className={field}>
                <option value="" disabled>Property / building type</option>
                {vertical.buildingTypes.map((b) => <option key={b}>{b}</option>)}
              </select>
              {extra.map((f) =>
                f.kind === 'select' ? (
                  <select key={f.key} value={v[f.key] ?? ''} onChange={(e) => set(f.key, e.target.value)} className={field}>
                    <option value="">{f.label}</option>
                    {f.options?.map((o) => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input key={f.key} type={f.kind === 'number' ? 'number' : 'text'} min={0} value={v[f.key] ?? ''} onChange={(e) => set(f.key, e.target.value)} placeholder={f.label} className={field} />
                ),
              )}
              <div className="rounded-lg border border-dashed border-slate-300 p-3">
                <label className="block text-sm font-medium">
                  Site photos (optional)
                  <input type="file" accept="image/*" multiple onChange={(e) => setPhotos((x) => [...x, ...Array.from(e.target.files ?? []).map((f) => ({ name: f.name, url: URL.createObjectURL(f) }))])} className="mt-2 block w-full text-sm" />
                </label>
                {photos.length ? (
                  <ul className="mt-2 grid grid-cols-4 gap-2">
                    {photos.map((p) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <li key={p.url} className="aspect-square overflow-hidden rounded bg-slate-100"><img src={p.url} alt={p.name} className="size-full object-cover" /></li>
                    ))}
                  </ul>
                ) : null}
                <p className="mt-1 text-xs text-slate-500">Preview: photos stay on this device and are not uploaded.</p>
              </div>
            </>
          ) : null}
          {step === 2 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <input value={v.name ?? ''} onChange={(e) => set('name', e.target.value)} placeholder="Your name" className={field} />
              <input value={v.company ?? ''} onChange={(e) => set('company', e.target.value)} placeholder="Company / property (optional)" className={field} />
              <input value={v.phone ?? ''} onChange={(e) => set('phone', e.target.value)} type="tel" placeholder="Phone" className={field} />
              <input value={v.email ?? ''} onChange={(e) => set('email', e.target.value)} type="email" placeholder="Email (optional)" className={field} />
              <textarea value={v.notes ?? ''} onChange={(e) => set('notes', e.target.value)} rows={4} placeholder={termsOf(vertical).requestNotesPlaceholder} className={`${field} sm:col-span-2`} />
            </div>
          ) : null}
          {step === 3 ? (
            <dl className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-1.5 text-sm">
              <dt className="text-slate-500">Service</dt><dd>{lane?.label}: {v.workType ?? lane?.workTypes[0]}</dd>
              <dt className="text-slate-500">Urgency</dt><dd>{vertical.urgency.find((u) => u.id === (emergency ? 'emergency' : v.urgency))?.label}</dd>
              <dt className="text-slate-500">Property</dt><dd>{v.address} · {v.buildingType}</dd>
              {photos.length ? (<><dt className="text-slate-500">Photos</dt><dd>{photos.length} attached (kept on this device)</dd></>) : null}
              {extra.filter((f) => v[f.key]).map((f) => (<Fragment key={f.key}><dt className="text-slate-500">{f.label}</dt><dd>{v[f.key]}</dd></Fragment>))}
              <dt className="text-slate-500">Contact</dt><dd>{v.name}{v.company ? `, ${v.company}` : ''} · {v.phone}{v.email ? ` · ${v.email}` : ''}</dd>
              {v.notes ? (<><dt className="text-slate-500">Notes</dt><dd>{v.notes}</dd></>) : null}
            </dl>
          ) : null}
          <div className="flex justify-between gap-3 pt-2">
            <button type="button" disabled={step === 0} onClick={() => setStep((x) => x - 1)} className="rounded-lg border border-slate-300 px-4 py-2.5 font-medium disabled:opacity-40">Back</button>
            {step < 3 ? (
              <button type="button" disabled={!can} onClick={() => setStep((x) => x + 1)} className="rounded-lg bg-slate-900 px-5 py-2.5 font-semibold text-white disabled:opacity-40">Continue</button>
            ) : (
              <button type="button" onClick={submit} className="rounded-lg bg-[var(--brand)] px-5 py-2.5 font-semibold text-white">Send request (sample)</button>
            )}
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-500">Preview form: it adds a sample request to this browser only. Nothing is emailed, and the live website form is not used.</p>
      </div>
      <aside className="space-y-4">
        <Guardrail>{vertical.guardrails.emergency} Call {tenant.phone}.</Guardrail>
        {tenant.aiDemo ? <AiDemoPanel tenantName={tenant.name} heading={tenant.aiDemoHeading} variant="compact" /> : null}
      </aside>
    </div>
  );
}
