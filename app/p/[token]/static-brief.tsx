'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type BriefSlide = { image: string; title: string };
type EventName = 'view' | 'start' | 'slide_start' | 'slide_complete' | 'complete' | 'cta_click';

const DWELL_MS = 4000; // a slide counts as read after this long on screen

/**
 * Lane-B static research brief: five approved 1920x1080 stills, no motion, no narration.
 * Same telemetry vocabulary as the presentation player:
 *   view on open · start on first slide shown · slide_start per slide · slide_complete after DWELL_MS on a slide
 *   complete when the last slide has been read · cta_click on the managed-program link.
 */
export function StaticBrief({ company, slides, eventsUrl }: { company: string; slides: BriefSlide[]; eventsUrl: string }) {
  const [index, setIndex] = useState(0);
  const completed = useRef<Set<number>>(new Set());
  const finished = useRef(false);

  const track = useCallback((event: EventName, slide?: number) => {
    try {
      fetch(eventsUrl, {
        method: 'POST', mode: 'no-cors', keepalive: true, headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(slide ? { event, slide } : { event }),
      }).catch(() => undefined);
    } catch {
      /* telemetry never blocks reading */
    }
  }, [eventsUrl]);

  useEffect(() => { track('view'); track('start'); }, [track]);

  useEffect(() => {
    track('slide_start', index + 1);
    const timer = window.setTimeout(() => {
      if (!completed.current.has(index)) {
        completed.current.add(index);
        track('slide_complete', index + 1);
      }
      if (index === slides.length - 1 && !finished.current) {
        finished.current = true;
        track('complete');
      }
    }, DWELL_MS);
    return () => window.clearTimeout(timer);
  }, [index, slides.length, track]);

  const go = (next: number) => setIndex(Math.max(0, Math.min(slides.length - 1, next)));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(index + 1);
      if (e.key === 'ArrowLeft') go(index - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <div className="min-h-screen bg-[#07172c] text-white">
      <header className="border-b border-white/10 bg-[#07172c]/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
          <Link href="/" aria-label="Xenco Labs home" className="inline-flex">
            <img src="/brand/xencolabs-on-dark.svg" alt="Xenco Labs" className="h-10 w-auto" />
          </Link>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-[#E8A33D]">Prepared for {company}</p>
            <p className="text-xs text-white/50 mt-1">Search &amp; AI Visibility Research Brief</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl">
          <img src={slides[index].image} alt={slides[index].title} className="w-full aspect-video object-contain bg-[#07172c]" />
        </div>

        <div className="mt-5 grid lg:grid-cols-[1fr_auto] gap-5 items-center">
          <div>
            <p className="text-xs font-mono text-[#E8A33D] mb-1">
              PAGE {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </p>
            <h1 className="font-display font-bold text-xl sm:text-2xl">{slides[index].title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => go(index - 1)} disabled={index === 0}
              className="h-11 w-11 rounded-lg border border-white/15 flex items-center justify-center disabled:opacity-30 hover:bg-white/5"
              aria-label="Previous page"><ChevronLeft className="w-5 h-5" /></button>
            <button type="button" onClick={() => go(index + 1)} disabled={index === slides.length - 1}
              className="h-11 px-6 rounded-lg bg-[#E8A33D] text-[#0B1F3A] font-semibold inline-flex items-center gap-2 hover:bg-[#f0b45f] disabled:opacity-40"
              aria-label="Next page">Next <ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="mt-6 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${slides.length}, minmax(0, 1fr))` }}>
          {slides.map((s, i) => (
            <button key={`${i}-${s.title}`} type="button" onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-colors ${i <= index ? 'bg-[#E8A33D]' : 'bg-white/15'}`}
              aria-label={`Go to page ${i + 1}`} />
          ))}
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-white/55">
          <p>Prepared by Xenco Labs · Account-specific working analysis</p>
          <Link href="/services/managed-search-content" onClick={() => track('cta_click')} className="text-white hover:text-[#E8A33D] font-medium">
            Explore the managed program →
          </Link>
        </div>
      </main>
    </div>
  );
}
