'use client';

import React from 'react';
import Image from 'next/image';
import { useAuth, SignInButton } from '@clerk/nextjs';
import { ArrowRight } from 'lucide-react';

interface PitchCardProps {
  title: string;
  description: string;
  tag: string;
  duration: string;
  thumbnail: string;
  pitchUrl: string;
}

const pitches: PitchCardProps[] = [
  {
    thumbnail: '/images/growth/pitch-thumb-nexusguard.webp',
    tag: 'CYBERSECURITY',
    title: 'Nexusguard — Content Strategy & Conversion Optimization',
    description:
      '15-slide narrated presentation for a $200M+ DDoS mitigation company. Covers homepage messaging, conversion funnels, A/B testing, blog strategy, AI chatbot comparison, and brand video.',
    duration: '~8 min',
    pitchUrl: 'https://www.nexusguard.dev/pitch?token=nexusguard2026',
  },
  {
    thumbnail: '/images/growth/pitch-thumb-cmcreative.webp',
    tag: 'PROMOTIONAL PRODUCTS',
    title: 'C&M Creative — Growth Strategy & Partnership',
    description:
      '14-slide narrated presentation for a Sonoma County promotional products company. Covers market opportunity, competitive analysis, product catalog strategy, content plan, and revenue-share partnership.',
    duration: '~7 min',
    pitchUrl:
      'https://cmcreativesolutions.xencolabs.com/pitch?token=cmcreative2026',
  },
  {
    thumbnail: '/images/growth/pitch-thumb-aer.webp',
    tag: 'IT ASSET DISPOSITION',
    title: 'AER Worldwide — Digital Growth & Market Expansion',
    description:
      'Narrated presentation for a $48M global ITAD company with 30 years in the industry. Covers digital presence optimization, inbound lead strategy, and AI-produced executive brand video.',
    duration: '~8 min',
    pitchUrl: 'https://aer-worldwide.com/pitch?token=aerworldwide2026',
  },
];

function PitchCard({ title, description, tag, duration, thumbnail, pitchUrl }: PitchCardProps) {
  const { isSignedIn } = useAuth();

  const handleWatchPitch = () => {
    if (isSignedIn) {
      window.open(pitchUrl, '_blank');
    }
  };

  return (
    <div className="border border-[var(--border-subtle)] rounded-xl overflow-hidden bg-[var(--surface-primary)] shadow-sm hover:shadow-md transition-shadow">
      {/* Thumbnail */}
      <div className="aspect-video relative overflow-hidden">
        <Image src={thumbnail} alt={title} fill className="object-cover" />
        <div className="absolute top-3 left-3">
          <span className="text-xs font-semibold uppercase tracking-wide bg-white/90 text-[var(--text-primary)] px-2 py-1 rounded">
            {tag}
          </span>
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="text-xs bg-black/70 text-white px-2 py-1 rounded">
            {duration}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display font-semibold text-lg text-[var(--text-primary)]">
          {title}
        </h3>
        <p className="text-sm text-[var(--text-secondary)] font-body mt-2">
          {description}
        </p>

        <div className="mt-6">
          {isSignedIn ? (
            <button
              onClick={handleWatchPitch}
              className="w-full btn-primary py-3 rounded-lg font-semibold inline-flex items-center justify-center gap-2"
            >
              Watch Pitch <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className="w-full btn-primary py-3 rounded-lg font-semibold inline-flex items-center justify-center gap-2">
                Sign in to Watch <ArrowRight className="w-4 h-4" />
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </div>
  );
}

export function PitchShowcase() {
  return (
    <section id="pitch-showcase" className="section-light py-24 px-6">
      <div className="max-w-content mx-auto">
        <div className="text-center mb-12">
          <p className="label-text text-[var(--brand-primary)] mb-4">
            SEE IT IN ACTION
          </p>
          <h2 className="section-headline text-[var(--text-primary)] mb-4">
            Watch a live pitch presentation.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] font-body max-w-2xl mx-auto">
            These are real strategy presentations we built for real companies.
            Each one includes a narrated walkthrough, before-and-after
            comparisons, and a live demo site reveal. Sign in to watch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pitches.map((pitch) => (
            <PitchCard key={pitch.title} {...pitch} />
          ))}
        </div>

        <p className="text-sm text-[var(--text-tertiary)] text-center mt-8 max-w-xl mx-auto">
          These presentations include narrated audio. Each pitch was
          custom-built for the featured company as part of a Digital Growth
          Strategy engagement.
        </p>
      </div>
    </section>
  );
}
