import type { DemoPhoto } from '@/lib/local-os/demo-types';

/** Short tag on a seeded sample-job photo thumbnail. */
export function samplePhotoTag(p: DemoPhoto): string {
  return p.illustrative ? 'Illustrative concept image' : 'Portfolio photo';
}

/**
 * Says where seeded sample-job photos come from: the business's own public website (illustrative portfolio
 * photos, not taken on this fictional job) and/or AI-generated concept images (not the business's work).
 */
export function SamplePhotoNote({ photos, business }: { photos: DemoPhoto[]; business: string }) {
  const seeded = photos.filter((p) => p.sample && p.url);
  if (!seeded.length) return null;
  const sites = Array.from(new Set(seeded.filter((p) => !p.illustrative && p.credit).map((p) => p.credit as string)));
  const generated = seeded.some((p) => p.illustrative);
  return (
    <p className="mt-2 text-xs text-slate-500">
      {sites.length ? <>Illustrative portfolio photos from {business}’s public website ({sites.join(', ')}), not captured for this fictional sample job. </> : null}
      {generated ? <>Images marked “Illustrative concept image” are AI-generated and do not show {business}’s work.</> : null}
    </p>
  );
}
