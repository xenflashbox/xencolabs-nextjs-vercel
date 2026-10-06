import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prospectPitchSlugs, prospectSearchPitches } from '../../../lib/review/prospect-search-pitches';
import { ProspectPitchPlayer } from './prospect-pitch-player';

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return prospectPitchSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const config = prospectSearchPitches[params.slug];
  if (!config) {
    return {
      title: 'Xenco Labs Review',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: config.pageTitle,
    description: `A private-by-link company-level search and AI discovery working analysis prepared by Xenco Labs for ${config.company}.`,
    robots: { index: false, follow: false },
    openGraph: {
      title: config.pageTitle,
      description: 'Prepared by Xenco Labs.',
      type: 'website',
    },
  };
}

export default function ProspectReviewPage({ params }: PageProps) {
  const config = prospectSearchPitches[params.slug];
  if (!config) notFound();

  return <ProspectPitchPlayer config={config} />;
}
