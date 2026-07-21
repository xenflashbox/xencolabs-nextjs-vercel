'use client';

import { useState } from 'react';
import { OVERVIEW_VIDEO_ID, OVERVIEW_VIDEO_POSTER } from './config';

/**
 * Lightweight YouTube facade: shows the poster frame until the visitor clicks,
 * then swaps in the real iframe. Keeps the hero from shipping the YouTube player
 * on first paint. The video id is a one-line swap in config.ts.
 */
export function VideoEmbed() {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="relative w-full overflow-hidden rounded-xl border border-[#3B5C8F]/40 bg-black aspect-video">
        <iframe
          className="absolute inset-0 h-full w-full"
          // Burned-in captions: no caption-forcing param in the query (YouTube
          // offers no force-off, so we never force-on). autoplay=1 because the
          // facade is click-initiated.
          src={`https://www.youtube-nocookie.com/embed/${OVERVIEW_VIDEO_ID}?rel=0&playsinline=1&autoplay=1`}
          title="Xenco Labs — 60-Second Overview"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label="Play the 60-second overview video"
      className="group relative block w-full overflow-hidden rounded-xl border border-[#3B5C8F]/40 bg-[#0B1F3A] aspect-video focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33D]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={OVERVIEW_VIDEO_POSTER}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-70 transition-opacity group-hover:opacity-85"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8A33D] shadow-lg transition-transform group-hover:scale-105">
          <svg
            width="22"
            height="24"
            viewBox="0 0 22 24"
            fill="#0B1F3A"
            aria-hidden="true"
          >
            <path d="M21 12 0 24V0z" />
          </svg>
        </span>
      </span>
      <span className="absolute bottom-3 left-4 text-sm font-medium text-white/90">
        60-Second Overview
      </span>
    </button>
  );
}
