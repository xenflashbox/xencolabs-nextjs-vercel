'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from 'lucide-react';

const slides = [
  {
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/hf_20261006_010013_7339e191-b506-4f79-a1c1-5cd0af2ecf05.mp4',
    audio: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/6ea0bd86-f5aa-4f25-aee9-924030862e74.mp3',
    title: 'Iron Mountain Opportunity Brief',
  },
  {
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/hf_20261006_010013_3d827cdd-61ec-4229-bd1f-c93269ae1484.mp4',
    audio: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/33c09deb-288c-4a23-b59f-199a0ca0b987.mp3',
    title: 'The Global Search Function',
  },
  {
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/hf_20261006_010012_e63d4ad4-d896-4d97-9152-b43e3203aba6.mp4',
    audio: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/7aa77ef8-0653-445f-9192-ce65600a387f.mp3',
    title: 'Iron Mountain Search Equity',
  },
  {
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/hf_20261006_010013_280d1ce6-355c-48f4-a8c1-5391ab46ac7c.mp4',
    audio: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/a13975af-636d-41ad-bbf1-c2844b662e6a.mp3',
    title: 'CompareITAD Advantage',
  },
  {
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/hf_20261005_152204_77bf87f4-c549-4c8f-a5e8-58642f8134ec.mp4',
    audio: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/ff53f8b9-dac8-42a9-ad18-a8257c054a96.mp3',
    title: 'Search Beyond Google',
  },
  {
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/hf_20261005_152232_7f0e9fbc-f793-4cf9-b5b4-58802b8a5528.mp4',
    audio: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/2405d830-3311-4429-b380-e318337efff9.mp3',
    title: 'The XencoLabs Operating System',
  },
  {
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/hf_20261005_152318_2c319825-885f-4804-94e9-819bd78df20a.mp4',
    audio: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/06cb4b9d-097a-4e01-8099-66729edefbdf.mp3',
    title: 'Proof of Execution',
  },
  {
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/hf_20261005_152336_66815544-744d-49e0-bcfb-186f78e54299.mp4',
    audio: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/f92e8073-a68c-412a-99d1-e48108b9a7c9.mp3',
    title: 'The First 90 Days',
  },
  {
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/hf_20261005_152354_1b5713d4-fdd6-427a-af53-d8316e541269.mp4',
    audio: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/20d656ca-dea3-4031-993a-f22726b16417.mp3',
    title: 'Managed Function vs. One Hire',
  },
];

export function IronMountainPitchPlayer() {
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
            <p className="text-xs uppercase tracking-[0.2em] text-[#E8A33D]">Prepared for Iron Mountain</p>
            <p className="text-xs text-white/50 mt-1">Search, AI Discovery &amp; CompareITAD Advantage</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="mb-6 max-w-3xl">
          <p className="text-xs font-mono text-[#E8A33D] uppercase tracking-[0.2em] mb-3">Private working analysis</p>
          <h1 className="font-display font-bold text-3xl sm:text-4xl leading-tight mb-3">
            Iron Mountain Search &amp; AI Visibility Opportunity Brief
          </h1>
          <p className="text-white/65 leading-relaxed">
            A company-level review connecting Iron Mountain’s global search and AI-discovery mandate with Xenco Labs’ managed operating system and CompareITAD category advantage.
          </p>
        </div>

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
              // Hold the final animated frame while narration continues.
            }}
          />
          <audio key={slides[index].audio} ref={audioRef} src={slides[index].audio} preload="auto" />
        </div>

        <div className="mt-5 grid lg:grid-cols-[1fr_auto] gap-5 items-center">
          <div>
            <p className="text-xs font-mono text-[#E8A33D] mb-1">
              SLIDE {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </p>
            <h2 className="font-display font-bold text-xl sm:text-2xl">{slides[index].title}</h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => goTo(index - 1, false)} disabled={index === 0} className="h-11 w-11 rounded-lg border border-white/15 flex items-center justify-center disabled:opacity-30 hover:bg-white/5" aria-label="Previous slide">
              <ChevronLeft className="w-5 h-5" />
            </button>

            {!started || !playing ? (
              <button type="button" onClick={!started ? playSlide : resume} className="h-11 px-6 rounded-lg bg-[#E8A33D] text-[#0B1F3A] font-semibold inline-flex items-center gap-2 hover:bg-[#f0b45f]">
                <Play className="w-4 h-4 fill-current" />
                {!started ? 'Start Presentation' : 'Resume'}
              </button>
            ) : (
              <button type="button" onClick={pause} className="h-11 px-6 rounded-lg bg-[#E8A33D] text-[#0B1F3A] font-semibold inline-flex items-center gap-2 hover:bg-[#f0b45f]">
                <Pause className="w-4 h-4 fill-current" /> Pause
              </button>
            )}

            <button type="button" onClick={() => { setStarted(false); setPlaying(false); setIndex(0); window.setTimeout(() => { if (videoRef.current) videoRef.current.currentTime = 0; if (audioRef.current) audioRef.current.currentTime = 0; }, 50); }} className="h-11 w-11 rounded-lg border border-white/15 flex items-center justify-center hover:bg-white/5" aria-label="Restart presentation">
              <RotateCcw className="w-4 h-4" />
            </button>

            <button type="button" onClick={() => goTo(index + 1, false)} disabled={index === slides.length - 1} className="h-11 w-11 rounded-lg border border-white/15 flex items-center justify-center disabled:opacity-30 hover:bg-white/5" aria-label="Next slide">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${slides.length}, minmax(0, 1fr))` }}>
          {slides.map((slide, i) => (
            <button key={slide.title} type="button" onClick={() => goTo(i, false)} className={`h-1.5 rounded-full transition-colors ${i <= index ? 'bg-[#E8A33D]' : 'bg-white/15'}`} aria-label={`Go to slide ${i + 1}`} />
          ))}
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-white/55">
          <p>Prepared by Xenco Labs · October 2026 · Account-specific working analysis</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/compareitad" className="text-white hover:text-[#E8A33D] font-medium">CompareITAD →</Link>
            <Link href="/services/managed-search-content" className="text-white hover:text-[#E8A33D] font-medium">Managed Search &amp; Content →</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
