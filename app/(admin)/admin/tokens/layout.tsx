import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Access Link Generator — Xenco Labs',
  robots: { index: false, follow: false },
};

export default function AdminTokensLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-950">
      {children}
    </div>
  );
}
