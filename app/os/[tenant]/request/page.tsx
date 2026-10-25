import { Suspense } from 'react';
import { SiteRequest } from '@/components/local-os/os/site-request';

export default function TenantRequestPage() {
  return (
    <Suspense>
      <SiteRequest />
    </Suspense>
  );
}
