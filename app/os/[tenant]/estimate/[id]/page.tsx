import { SiteEstimate } from '@/components/local-os/os/site-estimate';

export default function TenantEstimatePage({ params }: { params: { id: string } }) {
  return <SiteEstimate id={params.id} />;
}
