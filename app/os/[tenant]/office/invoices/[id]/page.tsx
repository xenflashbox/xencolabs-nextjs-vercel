import { InvoiceDoc } from '@/components/local-os/os/invoice-doc';

export default function TenantOfficeInvoicePage({ params }: { params: { id: string } }) {
  return <InvoiceDoc id={params.id} mode="office" />;
}
