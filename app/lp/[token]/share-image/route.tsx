import { NextResponse } from 'next/server';
import { renderShareCard } from '@/lib/local-os/og/card';
import { loadPreview } from '@/lib/local-os/preview';
import { TEMPLATES } from '@/lib/local-os/templates';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Link-preview image for a workflow-concept preview (og:image / twitter:image). */
export async function GET(_req: Request, { params }: { params: { token: string } }) {
  const m = await loadPreview(params.token);
  if (!m) return new NextResponse('Not found', { status: 404 });
  const t = TEMPLATES[m.template];
  const b = m.config.business;
  return renderShareCard(
    {
      eyebrow: [b.city, b.service_area].filter(Boolean).join(' · ') || 'Workflow concept',
      title: t.heroTitle(b.city),
      brandName: b.name,
      accent: m.config.branding?.theme_color || t.accent,
      surface: '#0f172a',
      ribbon: `Private workflow concept for ${b.name}`,
      points: t.promises,
    },
    { 'X-Robots-Tag': 'noindex, nofollow, noarchive, noimageindex' },
  );
}
