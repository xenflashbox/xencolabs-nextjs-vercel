'use client';

import { useEffect, useRef, useState } from 'react';
import { CALENDLY_URL } from './config';

const MAILTO_FALLBACK =
  'mailto:xen@xencolabs.com?cc=laurie@xencolabs.com&subject=Executive%20Briefing%20Request';

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Status = 'idle' | 'submitting' | 'success' | 'error';

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          callback: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: () => void;
          theme?: 'auto' | 'light' | 'dark';
        }
      ) => string;
      reset: (id?: string) => void;
    };
  }
}

/**
 * Briefing-request form: name + email (required), company (optional).
 * Bot-hardened (FORM_BOT_HARDENING_BRIEF): a CSS-hidden honeypot, a signed
 * form-token fetched on mount (timing floor), and Cloudflare Turnstile (when
 * NEXT_PUBLIC_TURNSTILE_SITE_KEY is set) — all verified server-side.
 */
export function BriefingCta({ id }: { id?: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', company: '' });
  const [honeypot, setHoneypot] = useState('');
  const [error, setError] = useState('');

  const formTokenRef = useRef<string>('');
  const turnstileTokenRef = useRef<string>('');
  const turnstileElRef = useRef<HTMLDivElement>(null);
  const turnstileRendered = useRef(false);

  // Fetch a signed timestamp on mount (the timing-floor artifact).
  useEffect(() => {
    let active = true;
    fetch('/api/form-token', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (active && d?.token) formTokenRef.current = d.token;
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  // Load + render Turnstile only when a site key is configured.
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || turnstileRendered.current) return;
    const SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    const render = () => {
      if (
        turnstileRendered.current ||
        !window.turnstile ||
        !turnstileElRef.current
      )
        return;
      turnstileRendered.current = true;
      window.turnstile.render(turnstileElRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: 'dark',
        callback: (t) => {
          turnstileTokenRef.current = t;
        },
        'expired-callback': () => {
          turnstileTokenRef.current = '';
        },
        'error-callback': () => {
          turnstileTokenRef.current = '';
        },
      });
    };
    if (window.turnstile) {
      render();
    } else if (!document.querySelector(`script[src="${SRC}"]`)) {
      const s = document.createElement('script');
      s.src = SRC;
      s.async = true;
      s.defer = true;
      s.onload = render;
      document.head.appendChild(s);
    } else {
      const iv = setInterval(() => {
        if (window.turnstile) {
          clearInterval(iv);
          render();
        }
      }, 200);
      return () => clearInterval(iv);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      const res = await fetch('/api/advisory-briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          company_url: honeypot, // honeypot — real users leave this empty
          formToken: formTokenRef.current,
          turnstileToken: turnstileTokenRef.current,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(
          data?.error ||
            'We could not submit your request. Please email us directly.'
        );
        setStatus('error');
        if (TURNSTILE_SITE_KEY) window.turnstile?.reset();
        return;
      }
      setStatus('success');
    } catch (err) {
      console.error('Briefing request failed:', err);
      setError('Network error. Please email us directly.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div
        id={id}
        className="mx-auto max-w-md rounded-2xl border border-[#3B5C8F]/40 bg-[#0B1F3A] p-8 text-center"
      >
        <p className="text-lg font-semibold text-white">Request received.</p>
        <p className="mt-2 text-sm text-[#94A3B8]">
          One of the principals will be in touch. Prefer to put time on the
          calendar now?
        </p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center justify-center rounded-lg bg-[#E8A33D] px-6 py-3 text-sm font-semibold text-[#0B1F3A] transition-colors hover:bg-[#f0b45f]"
        >
          Book a 30-minute briefing
        </a>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className="mx-auto max-w-md rounded-2xl border border-[#3B5C8F]/40 bg-[#0B1F3A] p-8 text-left"
    >
      <div className="space-y-4">
        <div>
          <label
            htmlFor="briefing-name"
            className="mb-1.5 block text-sm font-medium text-[#D9E2F3]"
          >
            Name
          </label>
          <input
            id="briefing-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-[#3B5C8F]/60 bg-[#0B1F3A] px-4 py-3 text-sm text-white placeholder-[#94A3B8]/60 focus:border-[#E8A33D] focus:outline-none"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label
            htmlFor="briefing-email"
            className="mb-1.5 block text-sm font-medium text-[#D9E2F3]"
          >
            Work email
          </label>
          <input
            id="briefing-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border border-[#3B5C8F]/60 bg-[#0B1F3A] px-4 py-3 text-sm text-white placeholder-[#94A3B8]/60 focus:border-[#E8A33D] focus:outline-none"
            placeholder="jane@company.com"
          />
        </div>
        <div>
          <label
            htmlFor="briefing-company"
            className="mb-1.5 block text-sm font-medium text-[#D9E2F3]"
          >
            Company{' '}
            <span className="font-normal text-[#94A3B8]">(optional)</span>
          </label>
          <input
            id="briefing-company"
            type="text"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="w-full rounded-lg border border-[#3B5C8F]/60 bg-[#0B1F3A] px-4 py-3 text-sm text-white placeholder-[#94A3B8]/60 focus:border-[#E8A33D] focus:outline-none"
            placeholder="Company"
          />
        </div>
      </div>

      {/* Honeypot — off-screen, not type=hidden. Humans never see or fill it. */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}
      >
        <label htmlFor="company_url">Company website (leave blank)</label>
        <input
          id="company_url"
          name="company_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {/* Turnstile mounts here when a site key is configured. */}
      {TURNSTILE_SITE_KEY && <div ref={turnstileElRef} className="mt-5" />}

      {status === 'error' && (
        <p className="mt-4 text-sm text-[#E8A33D]">
          {error}{' '}
          <a href={MAILTO_FALLBACK} className="underline">
            Email us directly
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-6 w-full rounded-lg bg-[#E8A33D] px-6 py-3.5 text-sm font-semibold text-[#0B1F3A] transition-colors hover:bg-[#f0b45f] disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Request Executive Briefing'}
      </button>
      <p className="mt-3 text-center text-xs text-[#94A3B8]">
        Two required fields. No sales sequence. A principal replies.
      </p>
    </form>
  );
}
