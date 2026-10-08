'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EndState, FinalCTA, PresentationShell, useTracker } from './presentation-chrome';

export type BriefSlide = { image: string; title: string };

const DWELL_MS = 4000; // a page counts as read after this long on screen

/**
 * Lane-B static research brief: five approved 1920x1080 stills, no motion, no narration — in the same viewport-aware
 * shell, final-page booking CTA and end state as the presentation player.
 * Telemetry: view · start · slide_start · slide_complete (after DWELL_MS) · complete (last page read) ·
 * cta_impression · cta_click · presentation_replay.
 */
export function StaticBrief({ token, company, slides, eventsUrl }: { token?: string; company: string; slides: BriefSlide[]; eventsUrl: string }) {
  const [index, setIndex] = useState(0);
  const [finishedView, setFinishedView] = useState(false);
  const completed = useRef<Set<number>>(new Set());
  const finished = useRef(false);
  const track = useTracker(eventsUrl);
  const last = slides.length - 1;

  useEffect(() => { track('view'); track('start'); }, [track]);

  useEffect(() => {
    track('slide_start', index + 1);
    const timer = window.setTimeout(() => {
      if (!completed.current.has(index)) {
        completed.current.add(index);
        track('slide_complete', index + 1);
      }
      if (index === last) {
        if (!finished.current) {
          finished.current = true;
          track('complete');
        }
        setFinishedView(true);
      }
    }, DWELL_MS);
    return () => window.clearTimeout(timer);
  }, [index, last, track]);

  const go = (next: number) => {
    setFinishedView(false);
    setIndex(Math.max(0, Math.min(last, next)));
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(index + 1);
      if (e.key === 'ArrowLeft') go(index - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const controls = (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-mono text-[#E8A33D]">
            PAGE {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </p>
          <h1 className="font-display font-bold text-sm sm:text-lg truncate">{slides[index].title}</h1>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button type="button" onClick={() => go(index - 1)} disabled={index === 0}
            className="h-11 w-11 rounded-lg border border-white/15 flex items-center justify-center disabled:opacity-30 hover:bg-white/5"
            aria-label="Previous page"><ChevronLeft className="w-5 h-5" /></button>
          <button type="button" onClick={() => go(index + 1)} disabled={index === last}
            className="h-11 px-4 sm:px-6 rounded-lg bg-[#E8A33D] text-[#0B1F3A] font-semibold inline-flex items-center gap-2 hover:bg-[#f0b45f] disabled:opacity-40"
            aria-label="Next page">Next <ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
      <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${slides.length}, minmax(0, 1fr))` }}>
        {slides.map((s, i) => (
          <button key={`${i}-${s.title}`} type="button" onClick={() => go(i)}
            className={`h-1.5 rounded-full transition-colors ${i <= index ? 'bg-[#E8A33D]' : 'bg-white/15'}`}
            aria-label={`Go to page ${i + 1}`} />
        ))}
      </div>
    </div>
  );

  return (
    <PresentationShell company={company} subtitle="Search & AI Visibility Research Brief" controls={controls}>
      <img src={slides[index].image} alt={slides[index].title} className="absolute inset-0 w-full h-full object-contain bg-[#07172c]" />
      {finishedView && <EndState track={track} slide={index + 1} onReplay={() => go(0)} replayLabel="Start over" token={token} />}
      <FinalCTA track={track} slide={index + 1} visible={index === last && !finishedView} token={token} />
    </PresentationShell>
  );
}
