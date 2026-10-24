import { TechJob } from '@/components/local-os/os/tech-job';

export default function TenantTechJobPage({ params }: { params: { id: string } }) {
  return <TechJob id={params.id} />;
}
