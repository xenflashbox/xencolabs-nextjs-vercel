import { ReportDoc } from '@/components/local-os/os/report-doc';

export default function TenantOfficeReportPage({ params }: { params: { id: string } }) {
  return <ReportDoc id={params.id} mode="office" />;
}
