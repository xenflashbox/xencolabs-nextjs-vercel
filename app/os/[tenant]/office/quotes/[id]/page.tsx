import { QuoteReview } from '@/components/local-os/os/quote-review';

export default function TenantOfficeQuotePage({ params }: { params: { id: string } }) {
  return <QuoteReview id={params.id} />;
}
