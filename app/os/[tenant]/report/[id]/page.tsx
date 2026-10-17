import { ReportDoc } from '@/components/local-os/os/report-doc';

export default function TenantReportPage({ params }: { params: { id: string } }) {
  return <div className="px-4"><ReportDoc id={params.id} mode="customer" /></div>;
}
