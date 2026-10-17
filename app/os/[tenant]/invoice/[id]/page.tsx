import { InvoiceDoc } from '@/components/local-os/os/invoice-doc';

export default function TenantInvoicePage({ params }: { params: { id: string } }) {
  return <InvoiceDoc id={params.id} mode="customer" />;
}
