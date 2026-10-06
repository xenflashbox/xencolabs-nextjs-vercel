'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from 'lucide-react';
import { sharedSearchPitchSlides } from '../../../lib/review/shared-search-pitch';

const customSlides = [
  {
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/hf_20261005_152010_157151c8-4718-40bd-8347-2af84fe50d00.mp4',
    audio: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/32ebd177-cae8-45eb-afa6-10a90891c236.mp3',
    title: 'A Function, Not a Job',
  },
  {
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/hf_20261005_152041_9a4fbc2f-c4ee-4dc3-a1fe-7d69018879f6.mp4',
    audio: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/e5468817-41dc-4e93-8cc2-33b24425b196.mp3',
    title: 'The Operating Function',
  },
  {
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/hf_20261005_152102_65f1a06c-1544-4bb4-8ca9-d65fa684463c.mp4',
    audio: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/5c29f8af-f523-4bd6-9595-c73296feb2df.mp3',
    title: 'TierPoint Search Equity',
  },
  {
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/hf_20261005_152124_e6da13c7-db6c-4d15-9d4e-8d7d34075ebf.mp4',
    audio: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/fa64e3a2-775f-4ad0-aca9-d43806e2d422.mp3',
    title: 'From Publication to Buyer Path',
  },
  {
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/hf_20261005_181120_08179251-d1dc-4ff6-b69c-294a62bbffcc.mp4',
    audio: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/723a534a-47b4-4621-a7b0-a929769062fb.mp3',
    title: 'NeoCloud: SEO vs. GEO',
  },
];

const slides = [...customSlides, ...sharedSearchPitchSlides];

export function TierPointPitchPlayer() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

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
        Promise.all([v.play(), a.play()]).then(() => setPlaying(true)).catch(() => setPlaying(false));
      }
    }, 60);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const ended = () => {
      if (index < slides.length - 1) goTo(index + 1, true);
      else setPlaying(false);
    };
    audio.addEventListener('ended', ended);
    return () => audio.removeEventListener('ended', ended);
  }, [index]);

  return (
    <div className="min-h-screen bg-[#07172c] text-white">
      <header className="border-b border-white/10 bg-[#07172c]/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
          <Link href="/" aria-label="Xenco Labs home" className="inline-flex">
            <img src="/brand/xencolabs-on-dark.svg" alt="Xenco Labs" className="h-10 w-auto" />
          </Link>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-[#E8A33D]">Prepared for TierPoint</p>
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
              key={slide.title}
              type="button"
              onClick={() => goTo(i, false)}
              className={`h-1.5 rounded-full transition-colors ${i <= index ? 'bg-[#E8A33D]' : 'bg-white/15'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-white/55">
          <p>Prepared by Xenco Labs · October 2026 · Account-specific working analysis</p>
          <Link href="/services/managed-search-content" className="text-white hover:text-[#E8A33D] font-medium">
            Explore the managed program →
          </Link>
        </div>
      </main>
    </div>
  );
}
