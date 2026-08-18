'use client';

import React, { useMemo, useState } from 'react';
import { Check, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import {
  PACKAGES, HOSTING, ADDONS, PRICE_MAP, dollars,
} from '@/lib/websites-catalog';

type Line = { key: string; quantity: number };

export function Configurator() {
  const [pkg, setPkg] = useState<string | null>(null); // null = still choosing a tier
  const [hosting, setHosting] = useState<string>('xl_hosting');
  const [addonQty, setAddonQty] = useState<Record<string, number>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const choosePackage = (key: string) => { setPkg(key); setAddonQty({}); setStatus('idle'); };
  const changePackage = () => { setPkg(null); setAddonQty({}); setStatus('idle'); };
  const toggleAddon = (id: string, on: boolean) =>
    setAddonQty((s) => ({ ...s, [id]: on ? Math.max(1, s[id] || 1) : 0 }));
  const setQty = (id: string, q: number) =>
    setAddonQty((s) => ({ ...s, [id]: Math.max(1, Math.min(20, q)) }));

  const selectedPkg = PACKAGES.find((p) => p.key === pkg) || null;
  // Add-ons available for the chosen tier.
  const tierAddons = useMemo(
    () => (pkg ? ADDONS.filter((a) => !a.tiers || a.tiers.includes(pkg)) : []),
    [pkg],
  );

  const items = useMemo<Line[]>(() => {
    if (!pkg) return [];
    const out: Line[] = [{ key: pkg, quantity: 1 }, { key: hosting, quantity: 1 }];
    for (const a of tierAddons) {
      const q = addonQty[a.id] || 0;
      if (q <= 0) continue;
      for (const k of a.keys) {
        const qty = a.qty && !PRICE_MAP[k].recurring ? q : 1;
        out.push({ key: k, quantity: qty });
      }
    }
    return out;
  }, [pkg, hosting, addonQty, tierAddons]);

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
      if (res.ok && data.url) { window.location.href = data.url; }
      else { setStatus('error'); setErrorMsg(data.error || 'Could not start checkout. Please try again.'); }
    } catch {
      setStatus('error'); setErrorMsg('Network error. Please check your connection and try again.');
    }
  }

  const radioBase = 'text-left w-full rounded-xl border p-5 transition-all cursor-pointer';
  const selected = 'border-[var(--brand-primary)] ring-2 ring-[var(--brand-primary)]/30 bg-[var(--brand-primary)]/5';
  const unselected = 'border-[var(--border-default)] bg-[var(--surface-primary)] hover:border-[var(--brand-primary)]/50';

  // ── Step 1: choose a tier ──
  if (!pkg) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {PACKAGES.map((p) => (
          <div key={p.key} className={`card flex flex-col ${p.popular ? 'relative border-t-2 border-t-[var(--brand-primary)]' : ''}`}>
            {p.popular && (
              <span className="absolute -top-3 left-4 bg-[var(--cta-primary)] text-[var(--accent-amber-ink)] text-xs font-semibold px-3 py-1 rounded-full">
                Most Popular
              </span>
            )}
            <p className="text-sm font-semibold text-[var(--brand-primary)] uppercase tracking-wide mb-2 mt-2">{p.name}</p>
            <p className="font-display font-bold text-3xl text-[var(--text-primary)] mb-1">${p.price.toLocaleString()}</p>
            <p className="text-xs text-[var(--text-tertiary)] font-body mb-4">one-time · + hosting</p>
            <p className="text-sm text-[var(--text-secondary)] font-body italic mb-4">{p.pain}</p>
            <ul className="space-y-2 mb-6">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-secondary)] font-body">
                  <Check className="w-4 h-4 text-[var(--brand-primary)] flex-shrink-0 mt-0.5" /> {f}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => choosePackage(p.key)}
              className={`${p.popular ? 'btn-primary' : 'btn-secondary'} px-4 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center justify-center gap-2 mt-auto`}
            >
              Configure &amp; Buy <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    );
  }

  // ── Step 2: configure the chosen tier ──
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
      <div className="space-y-8">
        {/* Chosen package banner */}
        <div className="flex items-center justify-between gap-4 rounded-xl border border-[var(--brand-primary)] bg-[var(--brand-primary)]/5 p-5">
          <div>
            <p className="text-xs font-semibold text-[var(--brand-primary)] uppercase tracking-wide">Your build</p>
            <p className="font-display font-bold text-lg text-[var(--text-primary)]">
              {selectedPkg?.name} — ${selectedPkg?.price.toLocaleString()}
            </p>
          </div>
          <button type="button" onClick={changePackage} className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--brand-primary)] hover:underline">
            <ArrowLeft className="w-4 h-4" /> Change build
          </button>
        </div>

        {/* Hosting */}
        <div>
          <p className="font-display font-bold text-lg text-[var(--text-primary)] mb-1">Keep it online</p>
          <p className="text-sm text-[var(--text-tertiary)] font-body mb-4">Every site is hosted with us — fast, secure, handled.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {HOSTING.map((h) => (
              <button key={h.key} type="button" onClick={() => setHosting(h.key)} className={`${radioBase} ${hosting === h.key ? selected : unselected}`} aria-pressed={hosting === h.key}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-display font-bold text-[var(--text-primary)]">{h.name}</span>
                  <span className="font-display font-bold text-[var(--text-primary)]">${h.price}<span className="text-xs font-medium text-[var(--text-tertiary)]">/mo</span></span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] font-body">{h.blurb}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Tier-aware add-ons */}
        <div>
          <p className="font-display font-bold text-lg text-[var(--text-primary)] mb-1">Add what you need</p>
          <p className="text-sm text-[var(--text-tertiary)] font-body mb-4">Each one fixes a real problem. Skip anything you don’t need.</p>
          <div className="space-y-3">
            {tierAddons.map((a) => {
              const on = (addonQty[a.id] || 0) > 0;
              return (
                <div key={a.id} className={`rounded-xl border p-4 transition-all ${on ? selected : unselected}`}>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={on} onChange={(e) => toggleAddon(a.id, e.target.checked)} className="mt-1 w-4 h-4 accent-[var(--brand-primary)]" />
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
                      <input type="number" min={1} max={20} value={addonQty[a.id] || 1} onChange={(e) => setQty(a.id, parseInt(e.target.value || '1', 10))} className="w-16 rounded-lg border border-[var(--border-default)] bg-[var(--surface-primary)] px-2 py-1 text-sm text-[var(--text-primary)]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="lg:sticky lg:top-24">
        <div className="card">
          <p className="font-display font-bold text-lg text-[var(--text-primary)] mb-4">Your build</p>
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
            <div className="bg-red-500/10 border border-red-500/30 text-red-600 rounded-lg px-3 py-2 text-sm mt-4">{errorMsg}</div>
          )}

          <button type="button" onClick={checkout} disabled={status === 'loading'} className="btn-primary w-full px-6 py-3 rounded-lg font-semibold inline-flex items-center justify-center gap-2 mt-4 disabled:opacity-60">
            {status === 'loading' ? (<><Loader2 className="w-4 h-4 animate-spin" /> Starting checkout…</>) : (<>Secure Checkout <ArrowRight className="w-4 h-4" /></>)}
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
