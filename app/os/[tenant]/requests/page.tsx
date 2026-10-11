import { Suspense } from 'react';
import { Requests } from '@/components/local-os/os/requests';

export default function TenantRequestsPage() {
  return (
    <Suspense>
      <Requests />
    </Suspense>
  );
}
