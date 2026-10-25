import { SiteHome } from '@/components/local-os/os/site-home';
import { ShelterHome } from '@/components/local-os/shelter/animal-pages';
import { isShelter } from '@/lib/local-os/shelter/guard';

export default async function TenantHomePage({ params }: { params: { tenant: string } }) {
  return (await isShelter(params.tenant)) ? <ShelterHome /> : <SiteHome />;
}
