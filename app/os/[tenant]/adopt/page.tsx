import { Suspense } from 'react';
import { AdoptInfo } from '@/components/local-os/shelter/shelter-flows';
import { requireShelter } from '@/lib/local-os/shelter/guard';

export default async function AdoptPage({ params }: { params: { tenant: string } }) {
  await requireShelter(params.tenant);
  return <Suspense fallback={null}><AdoptInfo /></Suspense>;
}
