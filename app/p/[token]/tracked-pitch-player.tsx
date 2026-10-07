'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from 'lucide-react';

export type TrackedSlide = { video: string; audio: string; title: string };
type EventName = 'view' | 'start' | 'slide_start' | 'slide_complete' | 'complete' | 'cta_click';

/**
 * Per-recipient presentation player. Behaviour mirrors the golden TierPoint player (silent MP4 + narration MP3,
 * advance on narration end, hold the final animated frame) and reports telemetry to the lead-intelligence API:
 *   view            page opened            start           first play
 *   slide_start     a slide begins playing slide_complete  that slide's narration ended
 *   complete        last narration ended   cta_click       managed-program link clicked
 * Events are fire-and-forget no-cors beacons (JSON as text/plain), so they never block or break playback.
 */
export function TrackedPitchPlayer({ company, slides, eventsUrl }: {
  token: string; company: string; slides: TrackedSlide[]; eventsUrl: string;
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const sentStart = useRef(false);

  const track = useCallback((event: EventName, slide?: number) => {
    try {
      fetch(eventsUrl, {
        method: 'POST', mode: 'no-cors', keepalive: true,
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(slide ? { event, slide } : { event }),
      }).catch(() => undefined);
    } catch {
      /* telemetry must never break playback */
    }
  }, [eventsUrl]);

  useEffect(() => { track('view'); }, [track]);

  const onSlidePlaying = (i: number) => {
    if (!sentStart.current) {
      sentStart.current = true;
      track('start');
    }
    track('slide_start', i + 1);
  };

  const playSlide = async () => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio) return;
    setStarted(true);
    video.currentTime = 0;
    audio.currentTime = 0;
    try {
      await Promise.all([video.play(), audio.play()]);
      setPlaying(true);
      onSlidePlaying(index);
    } catch {
      setPlaying(false);
    }
  };

  const pause = () => {
    videoRef.current?.pause();
    audioRef.current?.pause();
    setPlaying(false);
  };

  const resume = async () => {
    try {
      await Promise.all([videoRef.current?.play(), audioRef.current?.play()]);
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const goTo = (next: number, autoplay = playing) => {
    const safe = Math.max(0, Math.min(slides.length - 1, next));
    setIndex(safe);
    setPlaying(false);
    window.setTimeout(() => {
      const v = videoRef.current;
      const a = audioRef.current;
      if (!v || !a) return;
      v.currentTime = 0;
      a.currentTime = 0;
      if (autoplay || started) {
        Promise.all([v.play(), a.play()]).then(() => { setPlaying(true); onSlidePlaying(safe); }).catch(() => setPlaying(false));
      }
    }, 60);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const ended = () => {
      track('slide_complete', index + 1);
      if (index < slides.length - 1) goTo(index + 1, true);
      else {
        setPlaying(false);
        track('complete');
      }
    };
    audio.addEventListener('ended', ended);
    return () => audio.removeEventListener('ended', ended);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <div className="min-h-screen bg-[#07172c] text-white">
      <header className="border-b border-white/10 bg-[#07172c]/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
          <Link href="/" aria-label="Xenco Labs home" className="inline-flex">
            <img src="/brand/xencolabs-on-dark.svg" alt="Xenco Labs" className="h-10 w-auto" />
          </Link>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-[#E8A33D]">Prepared for {company}</p>
            <p className="text-xs text-white/50 mt-1">Managed Search &amp; Content Intelligence</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl">
          <video
            key={slides[index].video}
            ref={videoRef}
            src={slides[index].video}
            muted
            playsInline
            preload="auto"
            className="w-full aspect-video object-contain bg-[#07172c]"
            onEnded={() => {
              // Intentionally hold the final animated frame while narration continues.
            }}
          />
          <audio key={slides[index].audio} ref={audioRef} src={slides[index].audio} preload="auto" />
        </div>

        <div className="mt-5 grid lg:grid-cols-[1fr_auto] gap-5 items-center">
          <div>
            <p className="text-xs font-mono text-[#E8A33D] mb-1">
              SLIDE {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </p>
            <h1 className="font-display font-bold text-xl sm:text-2xl">{slides[index].title}</h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(index - 1, false)}
              disabled={index === 0}
              className="h-11 w-11 rounded-lg border border-white/15 flex items-center justify-center disabled:opacity-30 hover:bg-white/5"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {!started || !playing ? (
              <button
                type="button"
                onClick={!started ? playSlide : resume}
                className="h-11 px-6 rounded-lg bg-[#E8A33D] text-[#0B1F3A] font-semibold inline-flex items-center gap-2 hover:bg-[#f0b45f]"
              >
                <Play className="w-4 h-4 fill-current" />
                {!started ? 'Start Presentation' : 'Resume'}
              </button>
            ) : (
              <button
                type="button"
                onClick={pause}
                className="h-11 px-6 rounded-lg bg-[#E8A33D] text-[#0B1F3A] font-semibold inline-flex items-center gap-2 hover:bg-[#f0b45f]"
              >
                <Pause className="w-4 h-4 fill-current" /> Pause
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setStarted(false);
                setPlaying(false);
                setIndex(0);
                window.setTimeout(() => {
                  if (videoRef.current) videoRef.current.currentTime = 0;
                  if (audioRef.current) audioRef.current.currentTime = 0;
                }, 50);
              }}
              className="h-11 w-11 rounded-lg border border-white/15 flex items-center justify-center hover:bg-white/5"
              aria-label="Restart presentation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => goTo(index + 1, false)}
              disabled={index === slides.length - 1}
              className="h-11 w-11 rounded-lg border border-white/15 flex items-center justify-center disabled:opacity-30 hover:bg-white/5"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-10 gap-1.5">
          {slides.map((slide, i) => (
            <button
              key={`${i}-${slide.title}`}
              type="button"
              onClick={() => goTo(i, false)}
              className={`h-1.5 rounded-full transition-colors ${i <= index ? 'bg-[#E8A33D]' : 'bg-white/15'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-white/55">
          <p>Prepared by Xenco Labs · October 2026 · Account-specific working analysis</p>
          <Link href="/services/managed-search-content" onClick={() => track('cta_click')} className="text-white hover:text-[#E8A33D] font-medium">
            Explore the managed program →
          </Link>
        </div>
      </main>
    </div>
  );
}
