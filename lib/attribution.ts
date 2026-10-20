/**
 * First-touch attribution for inbound forms (issue api-xencolabs#111).
 *
 * The first visit that carries UTM parameters wins and is kept for 90 days;
 * later visits never overwrite it. Captured on the page that hosts the form, so
 * a visitor who lands on /growth?utm_source=... and submits later still
 * attributes to that click. Client-only (localStorage).
 */

export interface Attribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landing_page?: string;
}

const KEY = 'xl_first_touch';
const TTL_MS = 90 * 24 * 60 * 60 * 1000;
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

export function captureFirstTouch(): Attribution {
  if (typeof window === 'undefined') return {};
  try {
    const stored = JSON.parse(localStorage.getItem(KEY) || 'null') as
      | (Attribution & { at: number })
      | null;
    if (stored && Date.now() - stored.at < TTL_MS) {
      const { at: _at, ...attribution } = stored;
      return attribution;
    }
    const params = new URLSearchParams(window.location.search);
    const touch: Attribution = { landing_page: window.location.pathname };
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) touch[k] = v;
    }
    // Only persist a touch that carries a campaign; otherwise report the landing page alone.
    if (UTM_KEYS.some((k) => touch[k])) {
      localStorage.setItem(KEY, JSON.stringify({ ...touch, at: Date.now() }));
    }
    return touch;
  } catch {
    return { landing_page: window.location.pathname };
  }
}
