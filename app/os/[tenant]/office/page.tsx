import { Dashboard } from '@/components/local-os/os/dashboard';
import { ShelterOffice } from '@/components/local-os/shelter/shelter-flows';
import { isShelter } from '@/lib/local-os/shelter/guard';

export default async function TenantOfficePage({ params }: { params: { tenant: string } }) {
  return (await isShelter(params.tenant)) ? <ShelterOffice /> : <Dashboard />;
}
