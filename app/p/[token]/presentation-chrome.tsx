'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { CalendarCheck, RotateCcw } from 'lucide-react';
import { CALENDLY_URL } from '../../advisory/config';

/**
 * Shared presentation chrome for every tracked prospect deck (motion player and static brief).
 * Founder spec 2026-10-08: viewport-aware 100dvh shell (the slide shrinks before anything is pushed below the fold),
 * a dominant transactional CTA on the final slide, and a designed end state instead of an exhausted media player.
 */

export const BOOKING_URL = CALENDLY_URL;

export type PresentationEvent =
  | 'view' | 'start' | 'slide_start' | 'slide_complete' | 'complete' | 'cta_click' | 'cta_impression' | 'presentation_replay';

/** Fire-and-forget telemetry beacon (JSON as text/plain, no-cors): never blocks or breaks the presentation. */
export function useTracker(eventsUrl: string) {
  return useCallback((event: PresentationEvent, slide?: number) => {
    try {
      fetch(eventsUrl, {
        method: 'POST', mode: 'no-cors', keepalive: true, headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(slide ? { event, slide } : { event }),
      }).catch(() => undefined);
    } catch {
      /* telemetry never breaks the presentation */
    }
  }, [eventsUrl]);
}

/** 100dvh shell: compact header, a stage that sizes 16:9 media against BOTH available width and height, and a
 *  fixed-height control area. The media never crops and never pushes the controls or CTA below the fold. */
export function PresentationShell({ company, subtitle, children, controls }: {
  company: string; subtitle: string; children: React.ReactNode; controls: React.ReactNode;
}) {
  return (
    <div className="h-[100dvh] flex flex-col overflow-hidden bg-[#07172c] text-white">
      <header className="shrink-0 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <Link href="/" aria-label="Xenco Labs home" className="inline-flex shrink-0">
            <img src="/brand/xencolabs-on-dark.svg" alt="Xenco Labs" className="h-8 w-auto" />
          </Link>
          <div className="text-right min-w-0">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#E8A33D] truncate">Prepared for {company}</p>
            <p className="text-[11px] text-white/50 truncate">{subtitle}</p>
          </div>
        </div>
      </header>
      {/* The stage is a size container: the slide's width is min(stage width, stage height x 16/9). */}
      <main className="flex-1 min-h-0 px-3 sm:px-6 pt-3 sm:pt-4 flex items-center justify-center [container-type:size]">
        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl"
          style={{ width: 'min(100cqw, calc(100cqh * 16 / 9))', aspectRatio: '16 / 9' }}>
          {children}
        </div>
      </main>
      <div className="shrink-0 max-w-7xl w-full mx-auto px-3 sm:px-6 pt-3 pb-[calc(env(safe-area-inset-bottom)+12px)]">
        {controls}
      </div>
    </div>
  );
}

/** The dominant final-slide action: a real button, fixed above the bottom safe area, high contrast, pulsing until
 *  hovered/focused. Reports cta_impression the first time it is actually visible and cta_click on activation. */
export function FinalCTA({ track, slide, visible }: { track: (e: PresentationEvent, s?: number) => void; slide: number; visible: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const seen = useRef(false);
  useEffect(() => {
    if (!visible || seen.current || !ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting) && !seen.current) {
        seen.current = true;
        track('cta_impression', slide);
        io.disconnect();
      }
    }, { threshold: 0.9 });
    io.observe(el);
    return () => io.disconnect();
  }, [visible, slide, track]);
  if (!visible) return null;
  return (
    <div className="fixed z-40 inset-x-3 sm:inset-x-auto sm:right-6 bottom-[calc(env(safe-area-inset-bottom)+84px)] sm:bottom-[calc(env(safe-area-inset-bottom)+96px)] flex justify-center sm:justify-end pointer-events-none">
      <a ref={ref} href={BOOKING_URL} target="_blank" rel="noopener noreferrer" onClick={() => track('cta_click', slide)}
        className="xl-cta pointer-events-auto inline-flex items-center justify-center gap-3 min-h-[56px] px-7 sm:px-8 rounded-xl bg-[#E8A33D] text-[#0B1F3A] font-extrabold tracking-[0.06em] text-base sm:text-lg uppercase shadow-[0_10px_40px_rgba(232,163,61,0.45)] focus:outline-none focus-visible:ring-4 focus-visible:ring-white/80">
        <CalendarCheck className="w-5 h-5 shrink-0" aria-hidden="true" />
        Book a strategy review <span aria-hidden="true">→</span>
      </a>
      <CtaStyles />
    </div>
  );
}

/** Presentation-complete state: the final slide stays visible with one clear next step. On tablets/desktops it is an
 *  overlay on the slide; on phones (where the slide is short) it is a bottom sheet so nothing is clipped. */
export function EndState({ track, slide, onReplay, replayLabel = 'Replay' }: {
  track: (e: PresentationEvent, s?: number) => void; slide: number; onReplay: () => void; replayLabel?: string;
}) {
  const body = (
    <div className="text-center max-w-xl mx-auto">
      <p className="font-display font-bold text-xl sm:text-3xl leading-tight">Ready to see what this could look like for your team?</p>
      <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" onClick={() => track('cta_click', slide)}
          className="xl-cta inline-flex items-center justify-center gap-2 min-h-[56px] px-7 rounded-xl bg-[#E8A33D] text-[#0B1F3A] font-extrabold uppercase tracking-[0.06em] focus:outline-none focus-visible:ring-4 focus-visible:ring-white/80">
          <CalendarCheck className="w-5 h-5" aria-hidden="true" /> Book a strategy review <span aria-hidden="true">→</span>
        </a>
        <button type="button" onClick={() => { track('presentation_replay'); onReplay(); }}
          className="inline-flex items-center justify-center gap-2 min-h-[52px] px-6 rounded-xl border border-white/30 font-semibold hover:bg-white/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60">
          <RotateCcw className="w-4 h-4" aria-hidden="true" /> {replayLabel}
        </button>
      </div>
      <Link href="/services/managed-search-content" className="inline-block mt-3 text-sm text-white/60 hover:text-white underline-offset-4 hover:underline">
        Explore the managed program
      </Link>
    </div>
  );
  return (
    <>
      <div className="hidden sm:flex absolute inset-0 z-30 items-center justify-center bg-gradient-to-t from-[#07172c]/95 via-[#07172c]/80 to-[#07172c]/40 p-8"
        role="dialog" aria-label="Presentation complete">{body}</div>
      <div className="sm:hidden fixed inset-x-0 bottom-0 z-40 rounded-t-2xl border-t border-white/15 bg-[#0b1f3a] px-4 pt-5 pb-[calc(env(safe-area-inset-bottom)+16px)] shadow-[0_-12px_40px_rgba(0,0,0,0.5)]"
        role="dialog" aria-label="Presentation complete">{body}</div>
      <CtaStyles />
    </>
  );
}

function CtaStyles() {
  return (
    <style>{`
      @keyframes xl-cta-pulse { 0%,100% { box-shadow: 0 10px 40px rgba(232,163,61,.45), 0 0 0 0 rgba(232,163,61,.55); }
                                 50% { box-shadow: 0 10px 40px rgba(232,163,61,.55), 0 0 0 14px rgba(232,163,61,0); } }
      .xl-cta { animation: xl-cta-pulse 1.8s ease-in-out infinite; transition: transform .15s ease, background-color .15s ease; }
      .xl-cta:hover, .xl-cta:focus-visible { animation-play-state: paused; transform: scale(1.05); background-color: #f4bb5f; }
      @media (prefers-reduced-motion: reduce) { .xl-cta { animation: none; } }
    `}</style>
  );
}
