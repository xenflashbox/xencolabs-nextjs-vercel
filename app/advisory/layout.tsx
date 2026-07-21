import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// The Xenco Labs brand is Inter throughout; the global site loads Plus Jakarta /
// DM Sans, so the advisory route loads its own font and applies it via a scoped
// wrapper. This page is a self-contained cul-de-sac — no global header/footer.
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-advisory',
});

export const metadata: Metadata = {
  // absolute so the root layout's "%s | Xenco Labs" template doesn't double-append
  title: {
    absolute:
      'Data Center Site Intelligence & Network Feasibility | Xenco Labs Advisory',
  },
  description:
    'Network feasibility, site pre-qualification, and origination for data center developers. Ranked recommendations and go/no-go decisions — principal-led, 40 years on the carrier side.',
  alternates: { canonical: 'https://xencolabs.com/advisory' },
  openGraph: {
    type: 'website',
    url: 'https://xencolabs.com/advisory',
    siteName: 'Xenco Labs',
    title: 'Xenco Labs · Infrastructure Advisory',
    description:
      'Network feasibility, site pre-qualification, and origination for data center developers. Decisions, not data.',
    images: [
      {
        url: '/advisory/advisory-og.png',
        width: 1200,
        height: 630,
        alt: 'Xenco Labs Infrastructure Advisory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Xenco Labs · Infrastructure Advisory',
    description:
      'Network feasibility, site pre-qualification, and origination for data center developers.',
    images: ['/advisory/advisory-og.png'],
  },
  robots: { index: true, follow: true },
};

export default function AdvisoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.variable} font-[family-name:var(--font-advisory)]`}>
      {children}
    </div>
  );
}
