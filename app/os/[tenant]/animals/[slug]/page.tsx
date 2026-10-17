import { AnimalProfile } from '@/components/local-os/shelter/animal-pages';
import { requireShelter } from '@/lib/local-os/shelter/guard';

export default async function AnimalPage({ params }: { params: { tenant: string; slug: string } }) {
  await requireShelter(params.tenant);
  return <AnimalProfile slug={params.slug} />;
}
