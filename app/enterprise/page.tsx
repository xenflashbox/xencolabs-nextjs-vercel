import React from 'react';
import { ArrowRight } from 'lucide-react';
import { MarketingLayout } from '@/components/layout/marketing-layout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function EnterprisePage() {
  return (
    <MarketingLayout>
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Managed Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Need AI-powered content, marketing, or custom development handled for you?
            We offer managed services powered by the same tools in our product portfolio,
            with human oversight and strategic planning.
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-10">
            Contact us to discuss your needs and see if managed services are the right fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="flex items-center gap-2">
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg">
                Explore Our Apps
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
