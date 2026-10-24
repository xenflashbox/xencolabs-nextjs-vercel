import { Suspense } from 'react';
import { XencoAppointment } from '@/components/local-os/shelter/shelter-flows';
import { requireShelter } from '@/lib/local-os/shelter/guard';

export default async function XencoPage({ params }: { params: { tenant: string } }) {
  await requireShelter(params.tenant);
  return <Suspense fallback={null}><XencoAppointment /></Suspense>;
}
