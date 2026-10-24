import { SiteService } from '@/components/local-os/os/site-service';

export default function TenantServicePage({ params }: { params: { slug: string } }) {
  return <SiteService slug={params.slug} />;
}
