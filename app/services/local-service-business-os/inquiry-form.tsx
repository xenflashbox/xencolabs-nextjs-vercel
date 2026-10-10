'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { captureFirstTouch, type Attribution } from '@/lib/attribution';
import { useFormGuard } from '@/lib/use-form-guard';

const VERTICALS = [
  'Exterior cleaning',
  'Window & gutter cleaning',
  'Pool service',
  'Landscaping & property maintenance',
  'Junk removal',
  'Mobile detailing',
  'Other field service',
];

/** Local Service OS inquiry → /api/local-os-inquiry → Neon + owner email + Mautic 'xl-local-os'. */
export function LocalOsInquiryForm({ bookingUrl }: { bookingUrl: string }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', businessName: '', phone: '', vertical: '', website: '', message: '' });
  const [consent, setConsent] = useState(false);
  const guard = useFormGuard('light');
  const attributionRef = useRef<Attribution>({});
  useEffect(() => {
    attributionRef.current = captureFirstTouch();
  }, []);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  if (status === 'success') {
    return (
      <div className="max-w-xl mx-auto rounded-xl border border-[var(--border-default)] bg-white p-8 text-left">
        <p className="font-display font-semibold text-xl text-[var(--text-primary)] mb-2">Thanks, we have it.</p>
        <p className="text-[var(--text-secondary)] mb-6">
          We will be in touch within one business day. If you would rather pick a time now, book a build consultation.
        </p>
        <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="btn-primary px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2">
          Book a Build Consultation <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      const res = await fetch('/api/local-os-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, consent, attribution: attributionRef.current, ...guard.guardFields() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || 'We could not send your inquiry. Please book a call instead.');
        setStatus('error');
        guard.reset();
        return;
      }
      setStatus('success');
    } catch {
      setError('Network error. Please book a call instead.');
      setStatus('error');
    }
  };

  const input =
    'w-full rounded-lg border border-[var(--border-default)] bg-white px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]';
  const label = 'block text-sm text-[var(--text-secondary)] mb-1.5';

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto text-left space-y-4">
      {status === 'error' && (
        <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}{' '}
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="underline">Book a call</a>.
        </div>
      )}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="los-name" className={label}>Your name</label>
          <input id="los-name" required maxLength={120} className={input} value={form.name} onChange={set('name')} />
        </div>
        <div>
          <label htmlFor="los-business" className={label}>Business name</label>
          <input id="los-business" required maxLength={200} className={input} value={form.businessName} onChange={set('businessName')} />
        </div>
        <div>
          <label htmlFor="los-email" className={label}>Email</label>
          <input id="los-email" type="email" required maxLength={200} className={input} value={form.email} onChange={set('email')} />
        </div>
        <div>
          <label htmlFor="los-phone" className={label}>Phone (optional)</label>
          <input id="los-phone" type="tel" maxLength={40} className={input} value={form.phone} onChange={set('phone')} />
        </div>
        <div>
          <label htmlFor="los-vertical" className={label}>What you do</label>
          <select id="los-vertical" className={input} value={form.vertical} onChange={set('vertical')}>
            <option value="">Select a service</option>
            {VERTICALS.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="los-website" className={label}>Website (optional)</label>
          <input id="los-website" maxLength={300} placeholder="yourbusiness.com" className={input} value={form.website} onChange={set('website')} />
        </div>
      </div>
      <div>
        <label htmlFor="los-message" className={label}>What takes up most of your office time? (optional)</label>
        <textarea id="los-message" rows={3} maxLength={2000} className={input} value={form.message} onChange={set('message')} />
      </div>

      <label className="flex items-start gap-3 text-sm text-[var(--text-secondary)] cursor-pointer">
        <input type="checkbox" className="mt-1 h-4 w-4 shrink-0" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>Email me occasional follow-ups about the Local Service OS. Optional; unsubscribe any time.</span>
      </label>

      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
        <label htmlFor="los_company_url">Company website (leave blank)</label>
        <input id="los_company_url" name="company_url" type="text" tabIndex={-1} autoComplete="off" value={guard.honeypot}
          onChange={(e) => guard.setHoneypot(e.target.value)} />
      </div>

      {guard.turnstileEnabled && <div ref={guard.turnstileElRef} />}

      <button type="submit" disabled={status === 'submitting'}
        className="btn-primary w-full py-3 rounded-lg font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-60">
        {status === 'submitting' ? 'Sending…' : <>Send my inquiry <ArrowRight className="w-4 h-4" /></>}
      </button>
    </form>
  );
}
