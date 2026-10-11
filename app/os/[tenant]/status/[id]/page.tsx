import { SiteStatus } from '@/components/local-os/os/site-status';

export default function TenantStatusPage({ params }: { params: { id: string } }) {
  return <SiteStatus id={params.id} />;
}
