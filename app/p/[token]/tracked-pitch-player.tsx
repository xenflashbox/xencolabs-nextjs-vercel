'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from 'lucide-react';
import { EndState, FinalCTA, PresentationShell, useTracker } from './presentation-chrome';

export type TrackedSlide = { video: string; audio: string; title: string };

/**
 * Per-recipient presentation player: silent MP4 + narration MP3 per slide, advance on narration end, hold the final
 * animated frame. Viewport-aware shell; a dominant booking CTA from the final slide on; a designed end state.
 * Telemetry (lead-intelligence API): view · start · slide_start · slide_complete · complete · cta_impression ·
 * cta_click · presentation_replay — fire-and-forget beacons that never block playback.
 */
export function TrackedPitchPlayer({ company, slides, eventsUrl }: {
  token: string; company: string; slides: TrackedSlide[]; eventsUrl: string;
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const sentStart = useRef(false);
  const track = useTracker(eventsUrl);
  const last = slides.length - 1;

  useEffect(() => { track('view'); }, [track]);

  const onSlidePlaying = (i: number) => {
    if (!sentStart.current) {
      sentStart.current = true;
      track('start');
    }
    track('slide_start', i + 1);
  };

  const playFrom = (i: number) => {
    setIndex(i);
    setStarted(true);
    window.setTimeout(() => {
      const v = videoRef.current;
      const a = audioRef.current;
      if (!v || !a) return;
      v.currentTime = 0;
      a.currentTime = 0;
      // Narration is the clock; video is best-effort so an undecodable clip never stalls the presentation.
      v.play().catch(() => undefined);
      a.play().then(() => { setPlaying(true); onSlidePlaying(i); }).catch(() => setPlaying(false));
    }, 60);
  };

  const pause = () => {
    videoRef.current?.pause();
    audioRef.current?.pause();
    setPlaying(false);
  };

  const resume = async () => {
    videoRef.current?.play().catch(() => undefined);
    try {
      await audioRef.current?.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const goTo = (next: number) => {
    const safe = Math.max(0, Math.min(last, next));
    setCompleted(false);
    if (started) playFrom(safe);
    else setIndex(safe);
  };

  const replay = () => {
    setCompleted(false);
    playFrom(0);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const ended = () => {
      track('slide_complete', index + 1);
      if (index < last) playFrom(index + 1);
      else {
        setPlaying(false);
        setCompleted(true);
        track('complete');
      }
    };
    audio.addEventListener('ended', ended);
    return () => audio.removeEventListener('ended', ended);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const controls = (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-mono text-[#E8A33D]">
            SLIDE {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </p>
          <h1 className="font-display font-bold text-sm sm:text-lg truncate">{slides[index].title}</h1>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button type="button" onClick={() => goTo(index - 1)} disabled={index === 0}
            className="h-11 w-11 rounded-lg border border-white/15 flex items-center justify-center disabled:opacity-30 hover:bg-white/5"
            aria-label="Previous slide"><ChevronLeft className="w-5 h-5" /></button>
          {!started || !playing ? (
            <button type="button" onClick={!started ? () => playFrom(index) : completed ? replay : resume}
              className="h-11 px-4 sm:px-6 rounded-lg bg-[#E8A33D] text-[#0B1F3A] font-semibold inline-flex items-center gap-2 hover:bg-[#f0b45f]">
              <Play className="w-4 h-4 fill-current" />
              <span className="hidden sm:inline">{!started ? 'Start Presentation' : completed ? 'Replay' : 'Resume'}</span>
              <span className="sm:hidden">{!started ? 'Start' : completed ? 'Replay' : 'Resume'}</span>
            </button>
          ) : (
            <button type="button" onClick={pause}
              className="h-11 px-4 sm:px-6 rounded-lg bg-[#E8A33D] text-[#0B1F3A] font-semibold inline-flex items-center gap-2 hover:bg-[#f0b45f]">
              <Pause className="w-4 h-4 fill-current" /> <span className="hidden sm:inline">Pause</span>
            </button>
          )}
          <button type="button" onClick={() => { track('presentation_replay'); replay(); }}
            className="hidden sm:flex h-11 w-11 rounded-lg border border-white/15 items-center justify-center hover:bg-white/5"
            aria-label="Restart presentation"><RotateCcw className="w-4 h-4" /></button>
          <button type="button" onClick={() => goTo(index + 1)} disabled={index === last}
            className="h-11 w-11 rounded-lg border border-white/15 flex items-center justify-center disabled:opacity-30 hover:bg-white/5"
            aria-label="Next slide"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </div>
      <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${slides.length}, minmax(0, 1fr))` }}>
        {slides.map((slide, i) => (
          <button key={`${i}-${slide.title}`} type="button" onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-colors ${i <= index ? 'bg-[#E8A33D]' : 'bg-white/15'}`}
            aria-label={`Go to slide ${i + 1}`} />
        ))}
      </div>
    </div>
  );

  return (
    <PresentationShell company={company} subtitle="Managed Search & Content Intelligence" controls={controls}>
      <video key={slides[index].video} ref={videoRef} src={slides[index].video} muted playsInline preload="auto"
        className="absolute inset-0 w-full h-full object-contain bg-[#07172c]" />
      <audio key={slides[index].audio} ref={audioRef} src={slides[index].audio} preload="auto" />
      {completed && <EndState track={track} slide={index + 1} onReplay={replay} />}
      <FinalCTA track={track} slide={index + 1} visible={index === last && !completed} />
    </PresentationShell>
  );
}
