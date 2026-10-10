'use client';

import { useEffect, useRef, useState } from 'react';
import { FileText, PenLine, ClipboardCheck, Receipt, UserCircle2, PlayCircle, Check } from 'lucide-react';
import { TEMPLATES, type TemplateKey } from '@/lib/local-os/templates';
import { useTrack } from './tracker';

const money = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const STEPS = [
  { key: 'quote', label: 'Quote', icon: FileText },
  { key: 'esign', label: 'E-sign', icon: PenLine },
  { key: 'job', label: 'Job checklist & photos', icon: ClipboardCheck },
  { key: 'invoice', label: 'Invoice & payment', icon: Receipt },
  { key: 'portal', label: 'Customer portal', icon: UserCircle2 },
  { key: 'video', label: 'Explainer video', icon: PlayCircle },
] as const;
const SAMPLE = { customer: 'Jordan Sample (sandbox customer)', address: '100 Sample Lane', number: 'Q-1042 (sample)' };

function Surface({ dirty, accent }: { dirty: boolean; accent: string }) {
  // Generic illustration, not a customer photo.
  return (
    <svg viewBox="0 0 160 100" className="h-full w-full" role="img" aria-label={dirty ? 'Illustration: before' : 'Illustration: after'}>
      <rect width="160" height="100" fill={dirty ? '#8a8577' : '#e8eef3'} />
      {Array.from({ length: 6 }).map((_, i) => <line key={i} x1="0" y1={16 * i + 8} x2="160" y2={16 * i + 8} stroke={dirty ? '#6f6a5d' : '#cfd9e2'} strokeWidth="2" />)}
      {dirty && Array.from({ length: 14 }).map((_, i) => <circle key={i} cx={(i * 37) % 160} cy={(i * 23) % 100} r={4 + (i % 5)} fill="#4d5a3a" opacity="0.55" />)}
      {!dirty && <circle cx="140" cy="18" r="10" fill={accent} opacity="0.85" />}
    </svg>
  );
}

function SignaturePad({ onSigned }: { onSigned: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [signed, setSigned] = useState(false);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d'); if (!ctx) return;
    ctx.lineWidth = 2.2; ctx.lineCap = 'round'; ctx.strokeStyle = '#0f172a';
    const pos = (e: PointerEvent) => { const r = c.getBoundingClientRect(); return [(e.clientX - r.left) * (c.width / r.width), (e.clientY - r.top) * (c.height / r.height)]; };
    const down = (e: PointerEvent) => { drawing.current = true; const [x, y] = pos(e); ctx.beginPath(); ctx.moveTo(x, y); };
    const move = (e: PointerEvent) => { if (!drawing.current) return; const [x, y] = pos(e); ctx.lineTo(x, y); ctx.stroke(); };
    const up = () => { if (drawing.current) { drawing.current = false; setSigned(true); onSigned(); } };
    c.addEventListener('pointerdown', down); c.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
    return () => { c.removeEventListener('pointerdown', down); c.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
  }, [onSigned]);
  return (
    <div>
      <canvas ref={ref} width={560} height={140} className="h-28 w-full touch-none rounded-md border border-dashed border-slate-400 bg-white" aria-label="Signature pad (sample)" />
      <p className="mt-1 text-xs text-slate-500">{signed ? 'Signed (sample agreement, not stored)' : 'Sign with your finger or mouse'}</p>
    </div>
  );
}

export function Walkthrough({ template, eventsUrl, business, bookingUrl, videoSrc }: {
  template: TemplateKey; eventsUrl: string; business: string; bookingUrl: string | null; videoSrc: string | null;
}) {
  const t = TEMPLATES[template];
  const track = useTrack(eventsUrl);
  const [step, setStep] = useState<(typeof STEPS)[number]['key']>('quote');
  const [done, setDone] = useState<Record<number, boolean>>({});
  const lines = t.estimate(Object.fromEntries(t.fields.map((f) => [f.key, f.default])));
  const total = lines.reduce((a, l) => a + l.amount, 0);
  const accent = t.accent;
  const go = (k: typeof step) => { setStep(k); track('walkthrough_step', 'system', { step: k }); };
  const src = videoSrc || t.videoSrc;

  return (
    <div className="mt-6">
      <ol className="flex gap-1 overflow-x-auto pb-2" role="tablist">
        {STEPS.map(({ key, label, icon: I }, i) => (
          <li key={key}>
            <button role="tab" aria-selected={step === key} onClick={() => go(key)}
              className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-sm ${step === key ? 'text-white' : 'bg-slate-100 text-slate-700'}`}
              style={step === key ? { background: 'var(--accent)' } : undefined}>
              <I className="h-4 w-4" /><span className="tabular-nums">{i + 1}.</span> {label}
            </button>
          </li>
        ))}
      </ol>

      <section className="mt-4 rounded-xl border border-slate-200 p-5">
        {step === 'quote' && (
          <div className="grid gap-3">
            <p className="text-sm text-slate-500">Quote {SAMPLE.number} · {SAMPLE.customer} · {SAMPLE.address}</p>
            <ul className="grid gap-2 text-sm">{lines.map((l) => <li key={l.label} className="flex justify-between"><span>{l.label}</span><span className="tabular-nums">{money(l.amount)}</span></li>)}</ul>
            <p className="flex justify-between border-t pt-2 font-semibold"><span>Total</span><span className="tabular-nums">{money(total)}</span></p>
            <p className="text-sm text-slate-600">The estimate the customer built online becomes this quote automatically; the owner confirms scope once and sends it.</p>
            <button onClick={() => go('esign')} className="justify-self-start rounded-lg px-4 py-2 font-semibold text-white" style={{ background: 'var(--accent)' }}>Send for signature</button>
          </div>
        )}
        {step === 'esign' && (
          <div className="grid gap-3">
            <div className="rounded-md bg-slate-50 p-4 text-sm leading-relaxed">
              <p className="font-semibold">Service agreement (sample document)</p>
              <p>{SAMPLE.customer} authorizes {business} to perform the services in quote {SAMPLE.number} for {money(total)}. Scope, schedule and cancellation terms as listed. This is a demonstration document and has no legal effect.</p>
            </div>
            <SignaturePad onSigned={() => undefined} />
            <button onClick={() => go('job')} className="justify-self-start rounded-lg px-4 py-2 font-semibold text-white" style={{ background: 'var(--accent)' }}>Agreement signed: schedule the job</button>
          </div>
        )}
        {step === 'job' && (
          <div className="grid gap-4 md:grid-cols-2">
            <ul className="grid content-start gap-2">
              {t.checklist.map((c, i) => (
                <li key={c}><label className="flex items-start gap-2 text-sm">
                  <input type="checkbox" checked={!!done[i]} onChange={(e) => setDone((d) => ({ ...d, [i]: e.target.checked }))} className="mt-0.5" /> {c}
                </label></li>
              ))}
            </ul>
            <div className="grid grid-cols-2 gap-2">
              {[true, false].map((dirty, i) => (
                <figure key={i} className="overflow-hidden rounded-md border border-slate-200">
                  <div className="aspect-[16/10]"><Surface dirty={dirty} accent={accent} /></div>
                  <figcaption className="px-2 py-1 text-xs text-slate-500">{t.photoLabels[i]} (illustration)</figcaption>
                </figure>
              ))}
              <p className="col-span-2 text-xs text-slate-500">The crew checks off each step and attaches photos from their phone; the record is saved with the job.</p>
            </div>
          </div>
        )}
        {step === 'invoice' && (
          <div className="grid gap-3 text-sm">
            <p className="font-semibold">Invoice INV-2207 (sample) · {SAMPLE.customer}</p>
            <ul className="grid gap-1">{lines.map((l) => <li key={l.label} className="flex justify-between"><span>{l.label}</span><span className="tabular-nums">{money(l.amount)}</span></li>)}</ul>
            <p className="flex justify-between border-t pt-2 font-semibold"><span>Balance due</span><span className="tabular-nums">{money(total)}</span></p>
            <p className="rounded bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-900">TEST MODE: the payment button below charges nothing.</p>
            <button onClick={() => go('portal')} className="justify-self-start rounded-lg px-4 py-2 font-semibold text-white" style={{ background: 'var(--accent)' }}>Pay {money(total)} (test)</button>
            <p className="text-slate-600">Completing the checklist sends this invoice automatically, with a pay-now link and a receipt.</p>
          </div>
        )}
        {step === 'portal' && (
          <div className="grid gap-3 text-sm md:grid-cols-2">
            {[['Quotes', `${SAMPLE.number}: signed`], ['Invoices', 'INV-2207: paid (test)'], ['Upcoming', t.plan + ': next visit in 3 weeks'], ['Requests', 'Reschedule or add a service anytime']].map(([h, v]) => (
              <div key={h} className="rounded-lg border border-slate-200 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{h}</p><p className="mt-1 flex items-center gap-2"><Check className="h-4 w-4" style={{ color: 'var(--accent)' }} />{v}</p></div>
            ))}
            <p className="md:col-span-2 text-slate-600">Customers find their quotes, invoices and next visit without calling the office.</p>
          </div>
        )}
        {step === 'video' && (
          <div className="grid gap-3">
            <video controls playsInline preload="metadata" className="w-full rounded-lg bg-black" src={src}
              onPlay={() => track('video_play', 'system')} onEnded={() => track('video_complete', 'system')}>
              <track kind="captions" />
            </video>
            <p className="text-sm text-slate-600">A short explainer of the full workflow (generic Xenco Labs demo).</p>
          </div>
        )}
      </section>

      <div className="mt-6 grid gap-3 rounded-xl bg-slate-900 p-5 text-white md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="font-semibold">Want to see this set up for {business}?</p>
          <p className="text-sm text-slate-300">20-minute walkthrough with Xenco Labs.</p>
        </div>
        {bookingUrl ? (
          <a href={bookingUrl} target="_blank" rel="noopener" onClick={() => track('booking_click', 'system')}
            className="rounded-lg bg-white px-4 py-2.5 text-center font-semibold text-slate-900">Book the walkthrough</a>
        ) : <p className="text-sm text-slate-400">Booking link is being set up.</p>}
      </div>
    </div>
  );
}
