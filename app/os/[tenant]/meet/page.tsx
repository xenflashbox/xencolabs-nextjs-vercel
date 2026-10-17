import { Suspense } from 'react';
import { MeetForm } from '@/components/local-os/shelter/shelter-flows';
import { requireShelter } from '@/lib/local-os/shelter/guard';

export default async function MeetPage({ params }: { params: { tenant: string } }) {
  await requireShelter(params.tenant);
  return <Suspense fallback={null}><MeetForm /></Suspense>;
}
