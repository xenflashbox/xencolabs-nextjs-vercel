'use client';

import React, { useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';

export function IntakeForm({ sessionId }: { sessionId: string }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({
    businessName: '', contactName: '', email: '', existingUrl: '',
    whatYouDo: '', pitch: '', pageList: '', brandAssets: '', notes: '',
    company_url: '', // honeypot
  });

  const set = (k: string, v: string) => setForm((s) => ({ ...s, [k]: v }));

  if (status === 'success') {
    return (
      <div className="max-w-xl mx-auto bg-[var(--surface-secondary)] border border-[var(--border-default)] rounded-xl p-8 text-center">
        <CheckCircle2 className="w-10 h-10 text-[var(--brand-primary)] mx-auto mb-3" />
        <p className="font-display font-bold text-xl text-[var(--text-primary)] mb-2">Got it — thank you.</p>
        <p className="text-[var(--text-secondary)] font-body">
          We have everything we need to get started. You’ll hear from us within one business day with
          your build timeline. If anything’s missing, we’ll email you.
        </p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    try {
      const res = await fetch('/api/website-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, sessionId }),
      });
      const data = await res.json();
      if (res.ok) setStatus('success');
      else { setStatus('error'); setErrorMsg(data.error || 'Something went wrong. Please try again.'); }
    } catch {
      setStatus('error'); setErrorMsg('Network error. Please try again.');
    }
  };

  const input =
    'w-full bg-[var(--surface-primary)] border border-[var(--border-default)] rounded-lg px-4 py-3 text-[var(--text-primary)] font-body text-sm placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]';
  const label = 'block text-sm font-medium text-[var(--text-primary)] mb-1.5 font-body';

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto text-left space-y-5">
      {status === 'error' && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-600 rounded-lg px-4 py-3 text-sm">{errorMsg}</div>
      )}

      {/* honeypot */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}>
        <label>Company URL<input tabIndex={-1} autoComplete="off" value={form.company_url} onChange={(e) => set('company_url', e.target.value)} /></label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={label}>Business name *</label>
          <input className={input} required value={form.businessName} onChange={(e) => set('businessName', e.target.value)} />
        </div>
        <div>
          <label className={label}>Your name *</label>
          <input className={input} required value={form.contactName} onChange={(e) => set('contactName', e.target.value)} />
        </div>
        <div>
          <label className={label}>Email *</label>
          <input type="email" className={input} required value={form.email} onChange={(e) => set('email', e.target.value)} />
        </div>
        <div>
          <label className={label}>Current website (if any)</label>
          <input className={input} placeholder="https://" value={form.existingUrl} onChange={(e) => set('existingUrl', e.target.value)} />
        </div>
      </div>

      <div>
        <label className={label}>What does your business do? *</label>
        <textarea className={input} rows={3} required placeholder="In plain language — what you sell, who you serve, where you operate." value={form.whatYouDo} onChange={(e) => set('whatYouDo', e.target.value)} />
      </div>
      <div>
        <label className={label}>Your pitch — what makes you different?</label>
        <textarea className={input} rows={2} placeholder="Why do customers pick you over a competitor?" value={form.pitch} onChange={(e) => set('pitch', e.target.value)} />
      </div>
      <div>
        <label className={label}>Pages you want</label>
        <textarea className={input} rows={2} placeholder="e.g. Home, Services, About, Contact — or tell us and we’ll suggest." value={form.pageList} onChange={(e) => set('pageList', e.target.value)} />
      </div>
      <div>
        <label className={label}>Logo, photos & content</label>
        <textarea className={input} rows={2} placeholder="Paste a Google Drive / Dropbox link with your logo, images, and any copy — or note what you have." value={form.brandAssets} onChange={(e) => set('brandAssets', e.target.value)} />
      </div>
      <div>
        <label className={label}>Anything else?</label>
        <textarea className={input} rows={2} placeholder="Sites you like, colors, deadlines, must-haves." value={form.notes} onChange={(e) => set('notes', e.target.value)} />
      </div>

      <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full px-6 py-3 rounded-lg font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-60">
        {status === 'submitting' ? (<><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>) : 'Send My Project Details'}
      </button>
      <p className="text-center text-xs text-[var(--text-tertiary)] font-body">
        The more you give us now, the faster your site goes live — and the fewer calls we’ll need.
      </p>
    </form>
  );
}
