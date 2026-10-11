import { Suspense } from 'react';
import { Requests } from '@/components/local-os/os/requests';

export default function TenantOfficeRequestsPage() {
  return (
    <Suspense>
      <Requests />
    </Suspense>
  );
}
