import type { Metadata } from 'next';
import { IronMountainPitchPlayer } from './pitch-player';

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

export default function IronMountainReviewPage() {
  return <IronMountainPitchPlayer />;
}
