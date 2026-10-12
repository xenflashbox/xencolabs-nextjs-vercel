'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { MediaImage, MediaVideo } from '@/lib/local-os/tenant-types';

/** A client work photo, responsive (next/image srcset), cropped by its configured focus point. */
export function TenantPhoto({ image, sizes, priority = false, className = '' }: { image: MediaImage; sizes: string; priority?: boolean; className?: string }) {
  return (
    // Callers that position it themselves (e.g. a hero background) pass `absolute`; otherwise it is the
    // positioning context for the fill image.
    <div className={`${/\babsolute\b/.test(className) ? '' : 'relative'} overflow-hidden bg-neutral-800 ${className}`}>
      {/* unoptimized: tenant media is served by the gated /os-media route (redirect to a short-lived
          signed URL), which the image optimizer must not fetch or cache; files are pre-sized. */}
      <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} unoptimized className="object-cover" style={{ objectPosition: image.focus ?? '50% 50%' }} />
    </div>
  );
}

/**
 * A short silent field clip with its matching poster.
 *   - muted, loop, playsInline, preload="metadata"
 *   - nothing is fetched until the clip nears the viewport: the video `src` and the poster are
 *     attached only then, so a page with several clips never downloads them all up front
 *   - plays only while on screen, pauses when scrolled away
 *   - prefers-reduced-motion: renders the poster image only — no video element, no download, no autoplay
 *   - until the motion preference is known (first client render), only an empty frame is rendered
 */
export function FieldVideo({ video }: { video: MediaVideo }) {
  const box = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        if (e.isIntersecting) setNear(true);
        setVisible(e.intersectionRatio >= 0.35);
      },
      { rootMargin: '400px 0px', threshold: [0, 0.35, 0.7] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = vid.current;
    if (!v || reduced !== false || !near) return;
    if (visible) v.play().catch(() => undefined);
    else v.pause();
  }, [visible, near, reduced]);

  return (
    <div ref={box} className="relative aspect-square w-full overflow-hidden bg-neutral-900">
      {reduced === null || !near ? null : reduced ? (
        // Reduced motion: the poster only. No video is created, so nothing plays or downloads.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={video.poster} alt={video.alt} decoding="async" className="h-full w-full object-cover" data-media="poster-fallback" />
      ) : (
        <video
          ref={vid}
          className="h-full w-full object-cover"
          src={video.src}
          poster={video.poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={video.alt}
          data-media="field-video"
        />
      )}
    </div>
  );
}
