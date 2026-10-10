'use client';

import React, { useState } from 'react';
import { TrackedPitchPlayer } from '../../p/[token]/tracked-pitch-player';
import { CALENDLY_URL } from '../../advisory/config';
import { LOCAL_OS_DECK } from '@/lib/presentations/local-service-business-os';

/** Booking link for the product deck: the live scheduling page, tagged so a booking attributes to this presentation. */
function bookingHref(): string {
  const u = new URL(CALENDLY_URL);
  u.searchParams.set('utm_source', 'xencolabs');
  u.searchParams.set('utm_medium', 'product_presentation');
  u.searchParams.set('utm_campaign', LOCAL_OS_DECK.slug);
  return u.toString();
}

/** Anonymous per-visit session id (never stored, never personal) plus the inbound `src`/`utm_source`, if any. */
function telemetryContext(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const bytes = new Uint8Array(12);
  window.crypto.getRandomValues(bytes);
  const session = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  const q = new URLSearchParams(window.location.search);
  const src = (q.get('src') || q.get('utm_source') || '').replace(/[^A-Za-z0-9_.:/-]/g, '').slice(0, 64);
  return src ? { session, src } : { session };
}

export function ProductDeckPlayer({ eventsUrl }: { eventsUrl: string }) {
  const [context] = useState(telemetryContext);
  return (
    <TrackedPitchPlayer
      company={LOCAL_OS_DECK.title}
      eyebrow="Xenco Labs · Product presentation"
      subtitle={LOCAL_OS_DECK.title}
      slides={LOCAL_OS_DECK.slides}
      eventsUrl={eventsUrl}
      telemetryContext={context}
      cta={{
        label: 'Book a Build Consultation',
        href: bookingHref(),
        headline: 'Show us how your business works today.',
        secondary: { label: 'See Sonoma Wash Co.', href: 'https://sonomawashco.com', external: true },
      }}
    />
  );
}
