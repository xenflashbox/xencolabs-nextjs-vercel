import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TrackedPitchPlayer, type TrackedSlide } from './tracked-pitch-player';

// Per-recipient presentation. The token is opaque; the media carries no recipient name.
const API_BASE = process.env.LEADINTEL_PUBLIC_API_BASE || 'https://api.xencolabs.com';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Search & AI Visibility Opportunity Brief',
  description: 'A private-by-link working analysis prepared by Xenco Labs.',
  robots: { index: false, follow: false },
};

type Manifest = { company: string; slug: string; slides: TrackedSlide[] };

async function loadManifest(token: string): Promise<Manifest | null> {
  if (!/^[A-Za-z0-9_-]{16,64}$/.test(token)) return null;
  const res = await fetch(`${API_BASE}/v1/lead-intelligence/pt/${encodeURIComponent(token)}/manifest`, { cache: 'no-store' });
  if (!res.ok) return null;
  const data = (await res.json()) as Manifest;
  return Array.isArray(data.slides) && data.slides.length === 10 ? data : null;
}

export default async function TrackedPresentationPage({ params }: { params: { token: string } }) {
  const manifest = await loadManifest(params.token);
  if (!manifest) notFound();
  return (
    <TrackedPitchPlayer
      token={params.token}
      company={manifest.company}
      slides={manifest.slides}
      eventsUrl={`${API_BASE}/v1/lead-intelligence/pt/${encodeURIComponent(params.token)}/events`}
    />
  );
}
