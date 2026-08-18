'use client';

import React, { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

export function PitchDeckBuyButton({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  async function buy() {
    setLoading(true);
    setErr('');
    try {
      const res = await fetch('/api/checkout/pitch-deck', { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.url) { window.location.href = data.url; }
      else { setLoading(false); setErr(data.error || 'Could not start checkout. Please try again.'); }
    } catch {
      setLoading(false);
      setErr('Network error. Please try again.');
    }
  }

  return (
    <>
      <button type="button" onClick={buy} disabled={loading} className={className}>
        {loading ? (<><Loader2 className="w-4 h-4 animate-spin" /> Starting…</>) : (<>Buy Now — $500 <ArrowRight className="w-4 h-4" /></>)}
      </button>
      {err && <p className="text-red-600 text-xs mt-2">{err}</p>}
    </>
  );
}
