'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from 'lucide-react';
import { sharedSearchPitchSlides } from '../../../lib/review/shared-search-pitch';
import type { ProspectPitchConfig } from '../../../lib/review/prospect-search-pitches';

type PitchSlide =
  | { kind: 'custom'; title: string; audio: string; customIndex: number }
  | { kind: 'shared'; title: string; audio: string; video: string };

const operatingStack = [
  'ACCOUNT + SEARCH BASELINE',
  'DEMAND + AI-ANSWER MAP',
  'TECHNICAL + STRUCTURED DATA',
  'CONTENT BRIEFS + PRODUCTION QA',
  'EXECUTIVE REPORTING + CONVERSION LOOP',
];

function SlideShell({
  config,
  slideNumber,
  running,
  children,
}: {
  config: ProspectPitchConfig;
  slideNumber: number;
  running: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`prospect-slide ${running ? 'prospect-slide--running' : ''}`}
      style={{
        background:
          'radial-gradient(circle at 82% 18%, rgba(232,163,61,.16), transparent 27%), linear-gradient(135deg,#07172c 0%,#0b203b 54%,#061322 100%)',
      }}
    >
      <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px)', backgroundSize: '42px 42px' }} />
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#E8A33D]" />
      <div className="relative z-10 h-full p-[4.2%] flex flex-col">
        <div className="flex items-center justify-between gap-5">
          <div className="slide-reveal flex items-center gap-3">
            <div className="h-7 w-7 rounded-full border border-[#E8A33D]/70 grid place-items-center text-[10px] font-mono text-[#E8A33D]">XL</div>
            <span className="text-[clamp(10px,1.1vw,15px)] font-mono tracking-[0.22em] text-white/55 uppercase">Xenco Labs · Managed Search &amp; Content Intelligence</span>
          </div>
          <span className="slide-reveal text-[clamp(10px,1vw,14px)] font-mono tracking-[0.16em] text-[#E8A33D]">{String(slideNumber).padStart(2, '0')} / 10</span>
        </div>
        <div className="flex-1 min-h-0">{children}</div>
        <div className="slide-reveal flex items-center justify-between text-[clamp(9px,.9vw,13px)] text-white/38 font-mono">
          <span>Prepared for {config.company}</span>
          <span>OCTOBER 2026 · PRIVATE WORKING ANALYSIS</span>
        </div>
      </div>
    </div>
  );
}

function CustomSlide({ config, customIndex, running }: { config: ProspectPitchConfig; customIndex: number; running: boolean }) {
  const n = customIndex + 1;

  if (customIndex === 0) {
    return (
      <SlideShell config={config} slideNumber={n} running={running}>
        <div className="h-full grid md:grid-cols-[1.08fr_.92fr] gap-[4%] items-center">
          <div className="max-w-4xl">
            <p className="slide-reveal text-[clamp(11px,1.1vw,16px)] font-mono tracking-[0.24em] text-[#E8A33D] uppercase mb-[3%]">{config.company}</p>
            <h2 className="slide-reveal text-[clamp(32px,5.3vw,76px)] leading-[.98] font-display font-bold tracking-[-.035em] text-white uppercase max-w-[14ch]">{config.briefLabel}</h2>
            <div className="slide-reveal mt-[5%] h-px w-28 bg-[#E8A33D]" />
            <p className="slide-reveal mt-[3%] text-[clamp(15px,2vw,28px)] leading-tight font-semibold text-white/78 uppercase tracking-[.05em]">{config.briefSubtitle}</p>
            <p className="slide-reveal mt-[4%] text-[clamp(11px,1.05vw,15px)] text-white/42">Prepared by Xenco Labs · October 2026</p>
          </div>
          <div className="slide-reveal relative aspect-square max-h-[76%] justify-self-center w-full max-w-[520px]">
            <div className="absolute inset-[3%] rounded-full border border-[#E8A33D]/35" />
            <div className="absolute inset-[15%] rounded-full border border-white/15" />
            <div className="absolute inset-[28%] rounded-full bg-[#E8A33D]/10 border border-[#E8A33D]/35 grid place-items-center text-center">
              <div>
                <div className="text-[clamp(13px,1.35vw,20px)] font-mono text-[#E8A33D] tracking-[.15em]">SEARCH</div>
                <div className="text-[clamp(22px,2.7vw,42px)] font-display font-bold mt-1">OPERATING<br />MODEL</div>
              </div>
            </div>
            {['SEO', 'AI SEARCH', 'CONTENT', 'TECHNICAL', 'CONVERSION', 'REPORTING'].map((x, i) => {
              const positions = [
                'top-[3%] left-1/2 -translate-x-1/2',
                'top-[23%] right-[0%]',
                'bottom-[18%] right-[3%]',
                'bottom-[3%] left-1/2 -translate-x-1/2',
                'bottom-[18%] left-[0%]',
                'top-[23%] left-[0%]',
              ];
              return <div key={x} className={`absolute slide-reveal ${positions[i]} px-3 py-2 rounded-full bg-[#0B1F3A] border border-white/15 text-[clamp(9px,.9vw,13px)] font-mono text-white/75`}>{x}</div>;
            })}
          </div>
        </div>
      </SlideShell>
    );
  }

  if (customIndex === 1) {
    return (
      <SlideShell config={config} slideNumber={n} running={running}>
        <div className="h-full flex flex-col justify-center">
          <p className="slide-reveal text-[clamp(10px,1vw,14px)] font-mono tracking-[.22em] text-[#E8A33D] mb-[2%]">THE FUNCTION</p>
          <h2 className="slide-reveal text-[clamp(28px,4.2vw,62px)] leading-[1.02] font-display font-bold tracking-[-.03em] uppercase max-w-[18ch]">{config.roleHeadline}</h2>
          <p className="slide-reveal mt-[2.2%] text-[clamp(14px,1.7vw,24px)] font-semibold text-white/62 max-w-5xl">{config.roleSubheadline}</p>
          <div className="mt-[5%] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[1.4%]">
            {config.scope.map((item, i) => (
              <div key={item} className="slide-reveal rounded-xl border border-white/12 bg-white/[.035] px-[6%] py-[9%] min-h-[74px] flex items-center">
                <span className="text-[clamp(10px,1.05vw,15px)] font-mono tracking-[.08em] text-white/82">{String(i + 1).padStart(2, '0')} · {item}</span>
              </div>
            ))}
          </div>
        </div>
      </SlideShell>
    );
  }

  if (customIndex === 2) {
    return (
      <SlideShell config={config} slideNumber={n} running={running}>
        <div className="h-full flex flex-col justify-center">
          <p className="slide-reveal text-[clamp(10px,1vw,14px)] font-mono tracking-[.22em] text-[#E8A33D] mb-[2%]">CURRENT SEARCH ASSET</p>
          <h2 className="slide-reveal text-[clamp(26px,4vw,58px)] leading-[1.02] font-display font-bold tracking-[-.03em] uppercase max-w-[20ch]">{config.metricHeadline}</h2>
          <p className="slide-reveal mt-[2%] text-[clamp(13px,1.55vw,22px)] text-white/58 font-semibold max-w-5xl">{config.metricSubheadline}</p>
          <div className="mt-[5%] grid grid-cols-2 lg:grid-cols-4 gap-[2%]">
            {config.metrics.map((m, i) => (
              <div key={m.label} className="slide-reveal rounded-2xl border border-white/12 bg-[#0A1D35]/90 p-[8%] min-h-[145px] flex flex-col justify-between">
                <div className="text-[clamp(28px,4vw,58px)] font-display font-bold text-white tracking-[-.04em]">{m.value}</div>
                <div className="mt-4 pt-3 border-t border-[#E8A33D]/45 text-[clamp(9px,.9vw,13px)] font-mono tracking-[.08em] text-[#E8A33D]">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </SlideShell>
    );
  }

  if (customIndex === 3) {
    return (
      <SlideShell config={config} slideNumber={n} running={running}>
        <div className="h-full flex flex-col justify-center">
          <p className="slide-reveal text-[clamp(10px,1vw,14px)] font-mono tracking-[.22em] text-[#E8A33D] mb-[2%]">WHERE THE LEVERAGE IS</p>
          <h2 className="slide-reveal text-[clamp(27px,4.1vw,60px)] leading-[1.02] font-display font-bold tracking-[-.03em] uppercase max-w-[20ch]">{config.opportunityHeadline}</h2>
          <p className="slide-reveal mt-[2%] text-[clamp(13px,1.55vw,22px)] text-white/58 font-semibold max-w-5xl">{config.opportunitySubheadline}</p>
          <div className="mt-[5%] grid md:grid-cols-3 gap-[2%]">
            {config.opportunityBullets.map((item, i) => (
              <div key={item} className="slide-reveal relative rounded-2xl border border-white/12 bg-white/[.035] p-[7%] min-h-[170px]">
                <div className="text-[clamp(28px,3vw,46px)] font-display font-bold text-[#E8A33D]/35">0{i + 1}</div>
                <div className="mt-3 text-[clamp(14px,1.45vw,21px)] leading-snug font-semibold text-white/86">{item}</div>
                <div className="absolute bottom-0 left-[7%] right-[7%] h-px bg-gradient-to-r from-[#E8A33D]/70 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </SlideShell>
    );
  }

  return (
    <SlideShell config={config} slideNumber={n} running={running}>
      <div className="h-full grid lg:grid-cols-[1.05fr_.95fr] gap-[5%] items-center">
        <div>
          <p className="slide-reveal text-[clamp(10px,1vw,14px)] font-mono tracking-[.22em] text-[#E8A33D] mb-[2%]">MANAGED EXECUTION LAYER</p>
          <h2 className="slide-reveal text-[clamp(29px,4.4vw,64px)] leading-[1.02] font-display font-bold tracking-[-.03em] uppercase max-w-[15ch]">WHAT XENCO LABS WOULD OPERATE</h2>
          <p className="slide-reveal mt-[4%] text-[clamp(14px,1.55vw,22px)] text-white/62 leading-relaxed max-w-2xl">{config.operatingCallout}</p>
        </div>
        <div className="space-y-[2.5%]">
          {operatingStack.map((item, i) => (
            <div key={item} className="slide-reveal flex items-center gap-4 rounded-xl border border-white/12 bg-[#0A1D35]/90 px-[5%] py-[3.8%]">
              <span className="h-8 w-8 shrink-0 rounded-full border border-[#E8A33D]/60 grid place-items-center font-mono text-[10px] text-[#E8A33D]">{i + 1}</span>
              <span className="text-[clamp(11px,1.2vw,17px)] font-mono tracking-[.07em] text-white/82">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

export function ProspectPitchPlayer({ config }: { config: ProspectPitchConfig }) {
  const slides = useMemo<PitchSlide[]>(
    () => [
      { kind: 'custom', title: `${config.company} Opportunity Brief`, audio: config.audio[0], customIndex: 0 },
      { kind: 'custom', title: 'The Search Function', audio: config.audio[1], customIndex: 1 },
      { kind: 'custom', title: 'Search Equity & Business Signal', audio: config.audio[2], customIndex: 2 },
      { kind: 'custom', title: 'Growth Architecture', audio: config.audio[3], customIndex: 3 },
      { kind: 'custom', title: 'What Xenco Labs Would Operate', audio: config.audio[4], customIndex: 4 },
      ...sharedSearchPitchSlides.map((slide) => ({ kind: 'shared' as const, title: slide.title, audio: slide.audio, video: slide.video })),
    ],
    [config]
  );

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [animationRun, setAnimationRun] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const current = slides[index];

  const startMedia = async (reset = true) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (reset) audio.currentTime = 0;
    const tasks: Promise<unknown>[] = [audio.play()];
    if (current.kind === 'shared' && videoRef.current) {
      if (reset) videoRef.current.currentTime = 0;
      tasks.push(videoRef.current.play());
    }
    try {
      await Promise.all(tasks);
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const playSlide = async () => {
    setStarted(true);
    setAnimationRun((n) => n + 1);
    await startMedia(true);
  };

  const pause = () => {
    audioRef.current?.pause();
    videoRef.current?.pause();
    setPlaying(false);
  };

  const resume = async () => {
    try {
      const tasks: Promise<unknown>[] = [];
      if (audioRef.current) tasks.push(audioRef.current.play());
      if (current.kind === 'shared' && videoRef.current) tasks.push(videoRef.current.play());
      await Promise.all(tasks);
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const goTo = (next: number, autoplay = started) => {
    const safe = Math.max(0, Math.min(slides.length - 1, next));
    setIndex(safe);
    setPlaying(false);
    setAnimationRun((n) => n + 1);
    window.setTimeout(() => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.currentTime = 0;
      const v = videoRef.current;
      if (v) v.currentTime = 0;
      if (autoplay) {
        const tasks: Promise<unknown>[] = [audio.play()];
        if (v) tasks.push(v.play());
        Promise.all(tasks).then(() => setPlaying(true)).catch(() => setPlaying(false));
      }
    }, 80);
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
  }, [index, slides.length]);

  return (
    <div className="min-h-screen bg-[#07172c] text-white">
      <header className="border-b border-white/10 bg-[#07172c]/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
          <Link href="/" aria-label="Xenco Labs home" className="inline-flex">
            <img src="/brand/xencolabs-on-dark.svg" alt="Xenco Labs" className="h-10 w-auto" />
          </Link>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-[#E8A33D]">Prepared for {config.company}</p>
            <p className="text-xs text-white/50 mt-1">{config.headerSubtitle}</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="mb-6 max-w-4xl">
          <p className="text-xs font-mono text-[#E8A33D] uppercase tracking-[0.2em] mb-3">Private working analysis</p>
          <h1 className="font-display font-bold text-3xl sm:text-4xl leading-tight mb-3">{config.pageTitle}</h1>
          <p className="text-white/65 leading-relaxed">{config.intro}</p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl">
          {current.kind === 'custom' ? (
            <div key={`${config.slug}-${current.customIndex}-${animationRun}`} className="w-full aspect-video bg-[#07172c]">
              <CustomSlide config={config} customIndex={current.customIndex} running={started} />
            </div>
          ) : (
            <video
              key={current.video}
              ref={videoRef}
              src={current.video}
              muted
              playsInline
              preload="auto"
              className="w-full aspect-video object-contain bg-[#07172c]"
            />
          )}
          <audio key={current.audio} ref={audioRef} src={current.audio} preload="auto" />
        </div>

        <div className="mt-5 grid lg:grid-cols-[1fr_auto] gap-5 items-center">
          <div>
            <p className="text-xs font-mono text-[#E8A33D] mb-1">
              SLIDE {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </p>
            <h2 className="font-display font-bold text-xl sm:text-2xl">{current.title}</h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => goTo(index - 1)} disabled={index === 0} className="h-11 w-11 rounded-lg border border-white/15 flex items-center justify-center disabled:opacity-30 hover:bg-white/5" aria-label="Previous slide">
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

            <button
              type="button"
              onClick={() => {
                setStarted(false);
                setPlaying(false);
                setIndex(0);
                setAnimationRun((n) => n + 1);
                window.setTimeout(() => {
                  if (audioRef.current) audioRef.current.currentTime = 0;
                  if (videoRef.current) videoRef.current.currentTime = 0;
                }, 50);
              }}
              className="h-11 w-11 rounded-lg border border-white/15 flex items-center justify-center hover:bg-white/5"
              aria-label="Restart presentation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button type="button" onClick={() => goTo(index + 1)} disabled={index === slides.length - 1} className="h-11 w-11 rounded-lg border border-white/15 flex items-center justify-center disabled:opacity-30 hover:bg-white/5" aria-label="Next slide">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${slides.length}, minmax(0, 1fr))` }}>
          {slides.map((slide, i) => (
            <button key={`${slide.title}-${i}`} type="button" onClick={() => goTo(i)} className={`h-1.5 rounded-full transition-colors ${i <= index ? 'bg-[#E8A33D]' : 'bg-white/15'}`} aria-label={`Go to slide ${i + 1}`} />
          ))}
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-white/55">
          <p>Prepared by Xenco Labs · October 2026 · Company-level working analysis</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/services/managed-search-content" className="text-white hover:text-[#E8A33D] font-medium">Managed Search &amp; Content →</Link>
            <Link href="/search-function-review" className="text-white hover:text-[#E8A33D] font-medium">Search Function Review →</Link>
          </div>
        </div>
      </main>

      <style jsx>{`
        .prospect-slide { position: relative; width: 100%; height: 100%; overflow: hidden; }
        .slide-reveal { opacity: 1; transform: none; }
        .prospect-slide--running .slide-reveal {
          animation: prospectRise 720ms cubic-bezier(.22,.8,.24,1) both;
        }
        .prospect-slide--running .slide-reveal:nth-child(2) { animation-delay: 90ms; }
        .prospect-slide--running .slide-reveal:nth-child(3) { animation-delay: 170ms; }
        .prospect-slide--running .slide-reveal:nth-child(4) { animation-delay: 250ms; }
        .prospect-slide--running .slide-reveal:nth-child(5) { animation-delay: 330ms; }
        @keyframes prospectRise {
          from { opacity: 0; transform: translateY(14px) scale(.992); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .prospect-slide--running .slide-reveal { animation: none; }
        }
      `}</style>
    </div>
  );
}
