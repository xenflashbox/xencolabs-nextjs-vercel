import { QuoteReview } from '@/components/local-os/os/quote-review';

export default function TenantQuoteReviewPage({ params }: { params: { id: string } }) {
  return <QuoteReview id={params.id} />;
}
