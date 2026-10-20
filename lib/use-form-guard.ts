'use client';

import { useEffect, useRef, useState } from 'react';

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

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
 * Client half of the form bot-hardening (FORM_BOT_HARDENING_BRIEF), same layers as
 * the /advisory briefing form: signed form-token fetched on mount (timing floor),
 * Cloudflare Turnstile when NEXT_PUBLIC_TURNSTILE_SITE_KEY is set, and a honeypot.
 * Verified server-side by lib/inbound-guard.ts.
 */
export function useFormGuard(theme: 'light' | 'dark' = 'dark') {
  const [honeypot, setHoneypot] = useState('');
  const formTokenRef = useRef('');
  const turnstileTokenRef = useRef('');
  const turnstileElRef = useRef<HTMLDivElement>(null);
  const rendered = useRef(false);

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

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || rendered.current) return;
    const SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    const render = () => {
      if (rendered.current || !window.turnstile || !turnstileElRef.current) return;
      rendered.current = true;
      window.turnstile.render(turnstileElRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme,
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
  }, [theme]);

  return {
    honeypot,
    setHoneypot,
    turnstileElRef,
    turnstileEnabled: Boolean(TURNSTILE_SITE_KEY),
    /** Fields to merge into the JSON body. */
    guardFields: () => ({
      company_url: honeypot,
      formToken: formTokenRef.current,
      turnstileToken: turnstileTokenRef.current,
    }),
    reset: () => {
      if (TURNSTILE_SITE_KEY) window.turnstile?.reset();
    },
  };
}
