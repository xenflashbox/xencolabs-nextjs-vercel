import { cache } from 'react';
import type { TemplateKey } from './templates';

const API_BASE = process.env.LEADINTEL_PUBLIC_API_BASE || 'https://api.xencolabs.com';

export type PreviewManifest = {
  token: string;
  template: TemplateKey;
  label: string;
  config: {
    business: { name: string; city: string; service_area?: string; rating?: number | null; review_count?: number | null; website?: string | null; maps_url?: string | null };
    branding: { theme_color?: string | null; og_image?: string | null; site_title?: string | null };
    services: string[];
    sandbox: { demo_phone?: string | null; notice: string };
    booking: { url?: string | null };
  };
  assets: { explainer_video?: string | null };
};

export const loadPreview = cache(async (token: string): Promise<PreviewManifest | null> => {
  if (!/^[A-Za-z0-9_-]{16,64}$/.test(token)) return null;
  const res = await fetch(`${API_BASE}/v1/lead-intelligence/local-preview/${encodeURIComponent(token)}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return (await res.json()) as PreviewManifest;
});

export const eventsUrl = (token: string) => `${API_BASE}/v1/lead-intelligence/local-preview/${encodeURIComponent(token)}/events`;
