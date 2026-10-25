import { Suspense } from 'react';
import { AskForm } from '@/components/local-os/shelter/shelter-flows';
import { requireShelter } from '@/lib/local-os/shelter/guard';

export default async function AskPage({ params }: { params: { tenant: string } }) {
  await requireShelter(params.tenant);
  return <Suspense fallback={null}><AskForm /></Suspense>;
}
