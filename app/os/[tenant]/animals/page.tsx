import { AnimalSearch } from '@/components/local-os/shelter/animal-pages';
import { requireShelter } from '@/lib/local-os/shelter/guard';

export default async function AnimalsPage({ params }: { params: { tenant: string } }) {
  await requireShelter(params.tenant);
  return <AnimalSearch />;
}
