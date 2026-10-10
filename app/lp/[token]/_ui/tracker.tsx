'use client';

import { useCallback, useEffect } from 'react';

export type PreviewEvent = 'view' | 'page_view' | 'estimate_started' | 'estimate_completed' | 'booking_click' | 'cta_click'
  | 'video_play' | 'video_complete' | 'walkthrough_step';

export function useTrack(eventsUrl: string) {
  return useCallback((event: PreviewEvent, page?: string, detail?: Record<string, unknown>) => {
    try {
      fetch(eventsUrl, { method: 'POST', mode: 'no-cors', keepalive: true, headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ event, page, detail: detail || {} }) }).catch(() => undefined);
    } catch { /* tracking never breaks the preview */ }
  }, [eventsUrl]);
}

/** One 'view' per browser session per preview, plus a page_view for every page. */
export function PageTracker({ eventsUrl, token, page }: { eventsUrl: string; token: string; page: string }) {
  const track = useTrack(eventsUrl);
  useEffect(() => {
    let first = false;
    try { first = !sessionStorage.getItem(`lp-view-${token}`); sessionStorage.setItem(`lp-view-${token}`, '1'); } catch { first = true; }
    if (first) track('view', page);
    track('page_view', page);
  }, [track, token, page]);
  return null;
}

export function TrackedLink({ eventsUrl, href, event, page, className, children, external, style }: {
  eventsUrl: string; href: string; event: PreviewEvent; page: string; className?: string; children: React.ReactNode; external?: boolean;
  style?: React.CSSProperties;
}) {
  const track = useTrack(eventsUrl);
  return (
    <a href={href} className={className} style={style} onClick={() => track(event, page)} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
      {children}
    </a>
  );
}
