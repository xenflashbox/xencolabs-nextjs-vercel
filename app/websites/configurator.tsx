'use client';

import React, { useMemo, useState } from 'react';
import { Check, ArrowRight, Loader2 } from 'lucide-react';
import {
  PACKAGES, HOSTING, ADDONS, PRICE_MAP, dollars,
} from '@/lib/websites-catalog';

type Line = { key: string; quantity: number };

export function Configurator() {
  const [pkg, setPkg] = useState<string>('xl_web_starter');
  const [hosting, setHosting] = useState<string>('xl_hosting');
  const [addonQty, setAddonQty] = useState<Record<string, number>>({}); // addon.id -> qty (0 = off)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const toggleAddon = (id: string, on: boolean) =>
    setAddonQty((s) => ({ ...s, [id]: on ? Math.max(1, s[id] || 1) : 0 }));
  const setQty = (id: string, q: number) =>
    setAddonQty((s) => ({ ...s, [id]: Math.max(1, Math.min(20, q)) }));

  // Assemble the cart from current selections.
  const items = useMemo<Line[]>(() => {
    const out: Line[] = [{ key: pkg, quantity: 1 }, { key: hosting, quantity: 1 }];
    for (const a of ADDONS) {
      const q = addonQty[a.id] || 0;
      if (q <= 0) continue;
      for (const k of a.keys) {
        // quantity applies to the one-time item for qty-add-ons; recurring stays at 1
        const qty = a.qty && !PRICE_MAP[k].recurring ? q : 1;
        out.push({ key: k, quantity: qty });
      }
    }
    return out;
  }, [pkg, hosting, addonQty]);

  const { oneTime, monthly } = useMemo(() => {
    let o = 0, m = 0;
    for (const it of items) {
      const p = PRICE_MAP[it.key];
      if (p.recurring) m += p.amount * it.quantity;
      else o += p.amount * it.quantity;
    }
    return { oneTime: o, monthly: m };
  }, [items]);

  async function checkout() {
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/checkout/websites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Could not start checkout. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection and try again.');
    }
  }

  const radioBase =
    'text-left w-full rounded-xl border p-5 transition-all cursor-pointer';
  const selected = 'border-[var(--brand-primary)] ring-2 ring-[var(--brand-primary)]/30 bg-[var(--brand-primary)]/5';
  const unselected = 'border-[var(--border-default)] bg-[var(--surface-primary)] hover:border-[var(--brand-primary)]/50';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
      {/* ── Choices ── */}
      <div className="space-y-10">
        {/* Step 1 — Package */}
        <div>
          <p className="font-display font-bold text-xl text-[var(--text-primary)] mb-1">
            1. Choose your build
          </p>
          <p className="text-sm text-[var(--text-tertiary)] font-body mb-5">
            Pick the site that fits. You can add pages below.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PACKAGES.map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => setPkg(p.key)}
                className={`${radioBase} ${pkg === p.key ? selected : unselected}`}
                aria-pressed={pkg === p.key}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-display font-bold text-[var(--text-primary)]">{p.name}</span>
                  <span className="font-display font-bold text-[var(--text-primary)]">${p.price.toLocaleString()}</span>
                </div>
                {p.popular && (
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-1">
                    Most popular
                  </span>
                )}
                <p className="text-xs text-[var(--text-secondary)] font-body italic mb-2">{p.pain}</p>
                <p className="text-sm text-[var(--text-secondary)] font-body">{p.blurb}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 — Hosting */}
        <div>
          <p className="font-display font-bold text-xl text-[var(--text-primary)] mb-1">
            2. Keep it online
          </p>
          <p className="text-sm text-[var(--text-tertiary)] font-body mb-5">
            Every site is hosted with us — fast, secure, and handled. Pick a plan.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {HOSTING.map((h) => (
              <button
                key={h.key}
                type="button"
                onClick={() => setHosting(h.key)}
                className={`${radioBase} ${hosting === h.key ? selected : unselected}`}
                aria-pressed={hosting === h.key}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-display font-bold text-[var(--text-primary)]">{h.name}</span>
                  <span className="font-display font-bold text-[var(--text-primary)]">${h.price}<span className="text-xs font-medium text-[var(--text-tertiary)]">/mo</span></span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] font-body">{h.blurb}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Step 3 — Add-ons */}
        <div>
          <p className="font-display font-bold text-xl text-[var(--text-primary)] mb-1">
            3. Add what you need
          </p>
          <p className="text-sm text-[var(--text-tertiary)] font-body mb-5">
            Each one fixes a real problem. Skip anything you don’t need.
          </p>
          <div className="space-y-3">
            {ADDONS.map((a) => {
              const on = (addonQty[a.id] || 0) > 0;
              return (
                <div
                  key={a.id}
                  className={`rounded-xl border p-4 transition-all ${on ? selected : unselected}`}
                >
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={(e) => toggleAddon(a.id, e.target.checked)}
                      className="mt-1 w-4 h-4 accent-[var(--brand-primary)]"
                    />
                    <span className="flex-1">
                      <span className="flex items-center justify-between gap-3">
                        <span className="font-display font-semibold text-[var(--text-primary)]">{a.name}</span>
                        <span className="font-body text-sm font-semibold text-[var(--text-primary)] whitespace-nowrap">{a.priceLabel}</span>
                      </span>
                      <span className="block text-xs text-[var(--text-secondary)] font-body italic mt-0.5">{a.pain}</span>
                    </span>
                  </label>
                  {on && a.qty && (
                    <div className="flex items-center gap-2 mt-3 pl-7">
                      <span className="text-xs text-[var(--text-tertiary)] font-body">Qty</span>
                      <input
                        type="number"
                        min={1}
                        max={20}
                        value={addonQty[a.id] || 1}
                        onChange={(e) => setQty(a.id, parseInt(e.target.value || '1', 10))}
                        className="w-16 rounded-lg border border-[var(--border-default)] bg-[var(--surface-primary)] px-2 py-1 text-sm text-[var(--text-primary)]"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Summary (sticky on desktop) ── */}
      <div className="lg:sticky lg:top-24">
        <div className="card">
          <p className="font-display font-bold text-lg text-[var(--text-primary)] mb-4">
            Your build
          </p>
          <div className="space-y-2 mb-4">
            <Row label="Website build & setup" value={dollars(oneTime)} />
            <Row label="Hosting & monthly add-ons" value={`${dollars(monthly)}/mo`} muted />
          </div>
          <div className="border-t border-[var(--border-default)] pt-4 mb-1">
            <div className="flex items-baseline justify-between">
              <span className="font-display font-bold text-[var(--text-primary)]">Due today</span>
              <span className="font-display font-bold text-2xl text-[var(--text-primary)]">{dollars(oneTime + monthly)}</span>
            </div>
            <p className="text-xs text-[var(--text-tertiary)] font-body mt-1">
              One-time build plus your first month. Then {dollars(monthly)}/mo, cancel anytime.
            </p>
          </div>

          {status === 'error' && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-600 rounded-lg px-3 py-2 text-sm mt-4">
              {errorMsg}
            </div>
          )}

          <button
            type="button"
            onClick={checkout}
            disabled={status === 'loading'}
            className="btn-primary w-full px-6 py-3 rounded-lg font-semibold inline-flex items-center justify-center gap-2 mt-4 disabled:opacity-60"
          >
            {status === 'loading' ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Starting checkout…</>
            ) : (
              <>Secure Checkout <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
          <p className="text-center text-xs text-[var(--text-tertiary)] font-body mt-3">
            Secure payment by Stripe · After payment you’ll tell us about your project.
          </p>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-baseline justify-between text-sm font-body">
      <span className={muted ? 'text-[var(--text-tertiary)]' : 'text-[var(--text-secondary)]'}>{label}</span>
      <span className="font-semibold text-[var(--text-primary)]">{value}</span>
    </div>
  );
}
