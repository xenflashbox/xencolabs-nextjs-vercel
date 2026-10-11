'use client';

import { useRef } from 'react';
import type { DemoAssembly } from '@/lib/local-os/demo-types';
import { useDemo } from '@/components/local-os/os/demo-store';
import { Guardrail, SampleBadge, timeOnly } from '@/components/local-os/os/ui';

const SECTION_TITLE = { prep: 'Arrival', safety: 'Safety and notifications', work: 'Work and observations', completion: 'Completion' } as const;

/**
 * The technician's job packet, phone-first: one primary action, scope, access
 * notes, the fire-protection checklist, before/after photos and notes. Photos
 * stay on this device in the preview (no upload). Complete is gated on at least
 * one before photo, one after photo and the completion items.
 */
export function TechJob({ id }: { id: string }) {
  const { tenant, vertical, state, updateJob, toggleChecklist, addPhotos, updateReport } = useDemo();
  const j = state.jobs.find((x) => x.id === id);
  const inputs = { before: useRef<HTMLInputElement>(null), after: useRef<HTMLInputElement>(null) };
  if (!j) return <p className="text-sm">No such sample job.</p>;
  const report = state.reports.find((r) => r.id === j.reportId) ?? null;
  const before = j.photos.filter((p) => p.phase === 'before');
  const after = j.photos.filter((p) => p.phase === 'after');
  const openCompletion = j.checklist.filter((c) => c.section === 'completion' && !c.done).length;
  const blockers = [
    before.length < 1 && 'Add at least one before photo.',
    after.length < 1 && 'Add at least one after photo.',
    openCompletion > 0 && 'Tick the completion items.',
    report && report.assemblies.some((a) => a.result === 'pending') && 'Record readings and a result for every assembly.',
    report && report.items.some((i) => i.result === 'pending') && 'Score every inspection item.',
  ].filter(Boolean) as string[];
  const readOnly = j.status === 'completed' || j.status === 'report_ready';

  function setAssembly(aid: string, patch: Partial<DemoAssembly>) {
    if (!report) return;
    const assemblies = report.assemblies.map((a) => (a.id === aid ? { ...a, ...patch } : a));
    const failed = assemblies.filter((a) => a.result === 'fail');
    updateReport(report.id, {
      assemblies,
      overall: assemblies.some((a) => a.result === 'pending') ? 'pending' : failed.length ? 'fail' : 'pass',
      deficiencies: failed.map((a) => `Assembly ${a.id} (${a.type} ${a.size}, ${a.location}) did not pass`),
    });
  }

  function pick(phase: 'before' | 'after', files: FileList | null) {
    if (!files?.length) return;
    addPhotos(j!.id, Array.from(files).map((f, i) => ({ id: `${phase}-${Date.now()}-${i}`, phase, name: f.name, url: URL.createObjectURL(f) })));
  }

  const primary = j.status === 'scheduled' || j.status === 'confirmed'
    ? { label: 'Start job', run: () => updateJob(j.id, { status: 'in_progress' }), disabled: false }
    : j.status === 'in_progress'
      ? { label: 'Mark job complete', run: () => window.confirm('Mark complete? The office then reviews the report.') && updateJob(j.id, { status: 'completed' }), disabled: blockers.length > 0 }
      : null;

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="flex items-center gap-2 text-xs text-slate-500"><SampleBadge /> {j.number} · {timeOnly(j.scheduledStart)}–{timeOnly(j.scheduledEnd)}</p>
        <h1 className="mt-1 text-xl font-semibold">{j.title}</h1>
        <p className="mt-1 text-sm">{state.leads.find((l) => l.id === j.leadId)?.address}</p>
        <p className="text-sm text-slate-600">{j.siteContact}</p>
        <p className="mt-2 rounded-lg bg-slate-50 px-3 py-2 text-sm">{j.accessNotes}</p>
      </div>

      {primary ? (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <button type="button" onClick={primary.run} disabled={primary.disabled} className="h-12 w-full rounded-lg bg-[var(--brand)] text-base font-semibold text-white disabled:opacity-40">{primary.label}</button>
          {j.status === 'in_progress' && blockers.length ? <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">{blockers.map((b) => <li key={b}>{b}</li>)}</ul> : null}
        </div>
      ) : (
        <p className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">Job complete. The office reviews and signs off the report.</p>
      )}

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-2 text-sm font-semibold">Scope</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm">{j.scope.map((x) => <li key={x}>{x}</li>)}</ul>
      </div>

      <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold">Checklist</h2>
        <Guardrail>{vertical.guardrails.compliance}</Guardrail>
        {(['prep', 'safety', 'work', 'completion'] as const).map((sec) => {
          const items = j.checklist.filter((c) => c.section === sec);
          if (!items.length) return null;
          return (
            <section key={sec}>
              <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{SECTION_TITLE[sec]}</h3>
              <ul className="space-y-2">
                {items.map((c) => (
                  <li key={c.id}>
                    <label className="flex min-h-12 items-start gap-3 rounded-lg border border-slate-200 px-3 py-3">
                      <input type="checkbox" className="mt-0.5 size-5 accent-[var(--brand)]" checked={c.done} disabled={readOnly} onChange={() => toggleChecklist(j.id, c.id)} />
                      <span className={`text-sm ${c.done ? 'text-slate-500 line-through' : ''}`}>{c.label}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      {report ? (
        <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold">{vertical.reportTemplates.find((t) => t.kind === report.kind)?.title} · {report.number}</h2>
          <Guardrail>Readings recorded here go to the office for the certified tester’s / contractor’s review. They are not a certification or a filing.</Guardrail>
          {report.assemblies.map((a) => (
            <div key={a.id} className="rounded-lg border border-slate-200 p-3">
              <p className="text-sm font-semibold">{a.id} · {a.type} {a.size} · {a.location}</p>
              <p className="text-xs text-slate-500">{a.make} {a.model} · serial {a.serial}</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {(['check1', 'check2', 'relief'] as const).map((k) => (
                  <label key={k} className="text-xs text-slate-600">
                    {k === 'check1' ? 'Check 1' : k === 'check2' ? 'Check 2' : 'Relief'}
                    <input value={a[k]} disabled={readOnly} onChange={(e) => setAssembly(a.id, { [k]: e.target.value })} placeholder={k === 'relief' && a.type !== 'RP' ? 'n/a' : 'psid'} className="mt-0.5 w-full rounded border border-slate-300 px-2 py-2 text-base" />
                  </label>
                ))}
              </div>
              <div className="mt-2 flex gap-2">
                {(['pass', 'fail'] as const).map((r) => (
                  <button key={r} type="button" disabled={readOnly} onClick={() => setAssembly(a.id, { result: r })} className={`h-11 flex-1 rounded-lg text-sm font-semibold ${a.result === r ? (r === 'pass' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white') : 'bg-slate-100 text-slate-700'}`}>{r === 'pass' ? 'Pass' : 'Fail'}</button>
                ))}
              </div>
            </div>
          ))}
          {report.items.map((it, idx) => (
            <div key={it.label} className="rounded-lg border border-slate-200 p-3">
              <p className="text-sm">{it.label}</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {(['pass', 'attention', 'fail'] as const).map((r) => (
                  <button key={r} type="button" disabled={readOnly} onClick={() => updateReport(report.id, { items: report.items.map((x, k) => (k === idx ? { ...x, result: r } : x)) })} className={`h-10 rounded-lg text-xs font-semibold ${it.result === r ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}>{r === 'attention' ? 'Needs attention' : r === 'pass' ? 'Pass' : 'Fail'}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {(['before', 'after'] as const).map((phase) => {
        const list = phase === 'before' ? before : after;
        return (
          <div key={phase} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="mb-2 text-sm font-semibold">{phase === 'before' ? 'Before photos' : 'After photos'} · {list.length}</h2>
            {list.length ? (
              <ul className="grid grid-cols-3 gap-2">
                {list.map((p) => (
                  <li key={p.id} className="flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-slate-100 text-center text-[10px] text-slate-500">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {p.url ? <img src={p.url} alt={p.name} className="size-full object-cover" /> : <span className="px-1">{p.name}</span>}
                  </li>
                ))}
              </ul>
            ) : <p className="rounded-lg border border-dashed border-slate-300 p-4 text-center text-sm text-slate-500">No {phase} photos yet.</p>}
            {readOnly ? null : (
              <>
                <input ref={inputs[phase]} type="file" accept="image/*" multiple className="hidden" onChange={(e) => pick(phase, e.target.files)} />
                <button type="button" onClick={() => inputs[phase].current?.click()} className="mt-3 h-12 w-full rounded-lg border border-slate-300 text-sm font-semibold text-[var(--brand)]">Add {phase} photos</button>
                <p className="mt-1 text-xs text-slate-500">Preview: photos stay on this device and are not uploaded.</p>
              </>
            )}
          </div>
        );
      })}

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-2 text-sm font-semibold">Notes for the office</h2>
        <textarea value={j.techNotes} disabled={readOnly} onChange={(e) => updateJob(j.id, { techNotes: e.target.value })} rows={4} placeholder="Parts used, readings, anything the contractor should review" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base disabled:bg-slate-50" />
      </div>
      <p className="text-center text-xs text-slate-500">{tenant.name} · technician view (sample)</p>
    </div>
  );
}
