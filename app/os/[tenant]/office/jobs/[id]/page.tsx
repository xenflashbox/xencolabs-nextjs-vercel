import { JobOffice } from '@/components/local-os/os/job-office';

export default function TenantOfficeJobPage({ params }: { params: { id: string } }) {
  return <JobOffice id={params.id} />;
}
