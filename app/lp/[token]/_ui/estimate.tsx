'use client';

import { useMemo, useState } from 'react';
import { CalendarCheck, CreditCard, ShieldCheck } from 'lucide-react';
import { TEMPLATES, type TemplateKey } from '@/lib/local-os/templates';
import { useTrack } from './tracker';

const money = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export function EstimateFlow({ template, eventsUrl, bookingUrl, demoPhone, business }: {
  template: TemplateKey; eventsUrl: string; bookingUrl: string | null; demoPhone: string | null; business: string;
}) {
  const t = TEMPLATES[template];
  const track = useTrack(eventsUrl);
  const [values, setValues] = useState<Record<string, number | string | boolean>>(
    Object.fromEntries(t.fields.map((f) => [f.key, f.default])));
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState<'estimate' | 'book' | 'deposit' | 'done'>('estimate');
  const lines = useMemo(() => t.estimate(values), [t, values]);
  const total = lines.reduce((a, l) => a + l.amount, 0);
  const deposit = Math.max(25, Math.round(total * 0.1));

  const set = (k: string, v: number | string | boolean) => {
    if (!started) { setStarted(true); track('estimate_started', 'estimate'); }
    setValues((s) => ({ ...s, [k]: v }));
  };

  return (
    <div className="mt-6 grid gap-6 md:grid-cols-[1.2fr_1fr]">
      <form className="grid gap-4 rounded-xl border border-slate-200 p-5" onSubmit={(e) => e.preventDefault()} aria-label="Estimate questions">
        {t.fields.map((f) => (
          <div key={f.key} className="grid gap-1.5">
            <label htmlFor={`f-${f.key}`} className="text-sm font-medium">{f.label}</label>
            {f.kind === 'number' && (
              <div className="flex items-center gap-3">
                <input id={`f-${f.key}`} type="range" min={f.min} max={f.max} step={f.step} value={Number(values[f.key])}
                  onChange={(e) => set(f.key, Number(e.target.value))} className="w-full accent-[var(--accent)]" />
                <span className="w-28 shrink-0 text-right text-sm tabular-nums">{Number(values[f.key]).toLocaleString()} {f.unit}</span>
              </div>
            )}
            {f.kind === 'select' && (
              <select id={`f-${f.key}`} value={String(values[f.key])} onChange={(e) => set(f.key, e.target.value)}
                className="rounded-md border border-slate-300 px-3 py-2">
                {f.options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            )}
            {f.kind === 'toggle' && (
              <label className="inline-flex items-center gap-2 text-sm">
                <input id={`f-${f.key}`} type="checkbox" checked={Boolean(values[f.key])} onChange={(e) => set(f.key, e.target.checked)} /> Yes
              </label>
            )}
          </div>
        ))}
      </form>

      <aside className="grid content-start gap-4">
        <div className="rounded-xl border border-slate-200 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Written estimate (sample prices)</p>
          <ul className="mt-3 grid gap-2 text-sm">
            {lines.map((l) => <li key={l.label} className="flex justify-between gap-3"><span>{l.label}</span><span className="tabular-nums">{money(l.amount)}</span></li>)}
          </ul>
          <p className="mt-3 flex justify-between border-t border-slate-200 pt-3 font-semibold"><span>Estimated total</span><span className="tabular-nums">{money(total)}</span></p>
          {step === 'estimate' && (
            <button onClick={() => { track('estimate_completed', 'estimate', { total }); setStep('book'); }}
              className="mt-4 w-full rounded-lg py-3 font-semibold text-white" style={{ background: 'var(--accent)' }}>Book this</button>
          )}
        </div>

        {step === 'book' && (
          <div className="rounded-xl border border-slate-200 p-5">
            <p className="flex items-center gap-2 font-semibold"><CalendarCheck className="h-5 w-5" style={{ color: 'var(--accent)' }} /> Pick a time</p>
            <p className="mt-1 text-sm text-slate-600">In the live version customers choose from {business}&apos;s real availability. In this demo, the slots below are samples.</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              {['Tue 9:00 AM', 'Tue 1:00 PM', 'Wed 10:30 AM', 'Thu 8:00 AM'].map((s) => (
                <button key={s} onClick={() => setStep('deposit')} className="rounded-md border border-slate-300 px-3 py-2 hover:border-[var(--accent)]">{s}</button>
              ))}
            </div>
          </div>
        )}

        {step === 'deposit' && (
          <div className="rounded-xl border border-slate-200 p-5">
            <p className="flex items-center gap-2 font-semibold"><CreditCard className="h-5 w-5" style={{ color: 'var(--accent)' }} /> Hold the slot with a deposit</p>
            <p className="mt-1 rounded bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-900">TEST MODE: no card is charged, nothing is sent to a payment processor.</p>
            <div className="mt-3 grid gap-2 text-sm">
              <input aria-label="Card number (test)" readOnly value="4242 4242 4242 4242" className="rounded-md border border-slate-300 px-3 py-2 font-mono" />
              <div className="grid grid-cols-2 gap-2">
                <input aria-label="Expiry (test)" readOnly value="12 / 34" className="rounded-md border border-slate-300 px-3 py-2 font-mono" />
                <input aria-label="CVC (test)" readOnly value="123" className="rounded-md border border-slate-300 px-3 py-2 font-mono" />
              </div>
              <button onClick={() => setStep('done')} className="rounded-lg py-3 font-semibold text-white" style={{ background: 'var(--accent)' }}>
                Pay {money(deposit)} deposit (test)
              </button>
            </div>
          </div>
        )}

        {step === 'done' && (
          <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-5 text-sm">
            <p className="flex items-center gap-2 font-semibold text-emerald-900"><ShieldCheck className="h-5 w-5" /> Booked (sandbox)</p>
            <p className="mt-1 text-emerald-900">The customer gets a confirmation and reminders, and the job lands on the schedule with the estimate attached. In this demo nothing was booked or charged.</p>
          </div>
        )}

        <div className="rounded-xl bg-slate-900 p-5 text-white">
          <p className="font-semibold">Want this running for {business}?</p>
          <p className="mt-1 text-sm text-slate-300">20-minute walkthrough with Xenco Labs: your services, your prices, your calendar.</p>
          {bookingUrl ? (
            <a href={bookingUrl} target="_blank" rel="noopener" onClick={() => track('booking_click', 'estimate')}
              className="mt-3 inline-block rounded-lg bg-white px-4 py-2.5 font-semibold text-slate-900">Book the walkthrough</a>
          ) : (
            <p className="mt-3 text-sm text-slate-400">Booking link is being set up.</p>
          )}
          {demoPhone && <p className="mt-2 text-xs text-slate-400">Or call the Xenco demo line: {demoPhone}</p>}
        </div>
      </aside>
    </div>
  );
}
