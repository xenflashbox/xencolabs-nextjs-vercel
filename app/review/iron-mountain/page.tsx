import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Iron Mountain Search & AI Visibility Opportunity Brief',
  description:
    'A private-by-link working analysis prepared by Xenco Labs for Iron Mountain: global SEO, AI discovery, ITAD buyer intent, CompareITAD category advantage, and the first 90 days.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Iron Mountain Search & AI Visibility Opportunity Brief',
    description: 'Prepared by Xenco Labs.',
    type: 'website',
  },
};

const videoUrl =
  'https://d2ol7oe51mr4n9.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/c8ec94ed-32f7-433f-9a92-351221b42a11.mp4';

export default function IronMountainReviewPage() {
  return (
    <div className="min-h-screen bg-[#07172c] text-white">
      <header className="border-b border-white/10 bg-[#07172c]/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
          <Link href="/" aria-label="Xenco Labs home" className="inline-flex">
            <img src="/brand/xencolabs-on-dark.svg" alt="Xenco Labs" className="h-10 w-auto" />
          </Link>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-[#E8A33D]">Prepared for Iron Mountain</p>
            <p className="text-xs text-white/50 mt-1">Search, AI Discovery &amp; ITAD Buyer Intent</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="mb-6 max-w-3xl">
          <p className="text-xs font-mono text-[#E8A33D] uppercase tracking-[0.2em] mb-3">Private working analysis</p>
          <h1 className="font-display font-bold text-3xl sm:text-4xl leading-tight mb-3">
            Iron Mountain Search &amp; AI Visibility Opportunity Brief
          </h1>
          <p className="text-white/65 leading-relaxed">
            A company-level review prepared by Xenco Labs. The presentation connects Iron Mountain’s global SEO/AEO mandate with Xenco Labs’ managed search system and CompareITAD category knowledge.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl">
          <video
            src={videoUrl}
            controls
            preload="metadata"
            playsInline
            className="w-full aspect-video object-contain bg-[#07172c]"
          />
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-white/55">
          <p>Prepared by Xenco Labs · October 2026 · Account-specific working analysis</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/compareitad" className="text-white hover:text-[#E8A33D] font-medium">
              CompareITAD →
            </Link>
            <Link href="/services/managed-search-content" className="text-white hover:text-[#E8A33D] font-medium">
              Managed Search &amp; Content →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
