import type { Metadata } from 'next';
import { ProductDeckPlayer } from './product-deck-player';

// Standalone Local Service Business OS product presentation (api-xencolabs #76). Not a prospect deck: no token, no
// recipient, no enterprise shared slides. Media are static files under /public; telemetry goes to the lead-intelligence
// API's product-deck endpoint (fire-and-forget, never blocks playback).
const API_BASE = process.env.LEADINTEL_PUBLIC_API_BASE || 'https://api.xencolabs.com';
const SLUG = 'local-service-business-os';

export const metadata: Metadata = {
  title: 'Local Service Business OS — Product Presentation | Xenco Labs',
  description:
    'An eight-slide narrated walkthrough of the Xenco Labs Local Service Business OS: AI phone intake, estimating, booking, contracts, field workflow, invoicing and local acquisition, with Sonoma Wash Co. as the live reference business.',
  alternates: { canonical: `/presentations/${SLUG}` },
};

export default function LocalServiceBusinessOsPresentation() {
  return <ProductDeckPlayer eventsUrl={`${API_BASE}/v1/lead-intelligence/product-decks/${SLUG}/events`} />;
}
