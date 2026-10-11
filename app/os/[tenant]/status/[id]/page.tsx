import { CustomerStatus } from '@/components/local-os/os/customer-status';

export default function TenantCustomerStatusPage({ params }: { params: { id: string } }) {
  return <CustomerStatus id={params.id} />;
}
