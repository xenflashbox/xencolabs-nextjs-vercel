import type { Metadata } from 'next';
import { TierPointPitchPlayer } from './pitch-player';

export const metadata: Metadata = {
  title: 'TierPoint Search & AI Visibility Opportunity Brief | Xenco Labs',
  description:
    'A private-by-link working analysis prepared by Xenco Labs for TierPoint: organic search equity, GEO opportunity, content architecture, operating model, and first 90 days.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'TierPoint Search & AI Visibility Opportunity Brief',
    description: 'Prepared by Xenco Labs.',
    type: 'website',
  },
};

export default function TierPointReviewPage() {
  return <TierPointPitchPlayer />;
}
