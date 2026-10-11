'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FIELD } from '@/components/local-os/os/preview/type';
import type { MediaImage, MediaVideo } from '@/lib/local-os/tenant-types';

/** A client work photo, responsive (next/image srcset), cropped by its configured focus point. */
export function TenantPhoto({ image, sizes, priority = false, className = '' }: { image: MediaImage; sizes: string; priority?: boolean; className?: string }) {
  return (
    // Callers that position it themselves (e.g. a hero background) pass `absolute`; otherwise it is the
    // positioning context for the fill image.
    <div className={`${/\babsolute\b/.test(className) ? '' : 'relative'} overflow-hidden bg-neutral-800 ${className}`}>
      <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-cover" style={{ objectPosition: image.focus ?? '50% 50%' }} />
    </div>
  );
}

/**
 * A short silent field clip: poster first, video source attached only when it scrolls near the
 * viewport, plays muted inline while visible, pauses when not. With reduced motion it never
 * autoplays and shows controls instead. Never used as a hero.
 */
export function FieldVideo({ video, label }: { video: MediaVideo; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReduced(prefersReduced);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          setSrc(video.src);
          if (!prefersReduced) el.play().catch(() => undefined);
        } else {
          el.pause();
        }
      },
      { rootMargin: '200px 0px', threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [video.src]);

  return (
    <figure className="overflow-hidden border border-neutral-800 bg-neutral-900">
      <video
        ref={ref}
        className="aspect-square w-full object-cover"
        poster={video.poster}
        src={src ?? undefined}
        muted
        loop
        playsInline
        preload="none"
        controls={reduced}
        aria-label={video.caption}
      />
      <figcaption className="flex items-center justify-between gap-2 px-3 py-2 text-neutral-300">
        <span className={`${FIELD} text-[10px] text-[var(--brand)]`}>{label}</span>
        <span className="text-xs">{video.caption}</span>
      </figcaption>
    </figure>
  );
}
