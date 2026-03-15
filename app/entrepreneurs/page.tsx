import React from 'react';
import { ArrowRight } from 'lucide-react';
import { MarketingLayout } from '@/components/layout/marketing-layout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function EntrepreneursPage() {
  return (
    <MarketingLayout>
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            For Entrepreneurs
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Xenco Labs builds AI-powered tools designed for solo builders and small teams.
            Use our self-serve apps to handle content, resumes, and image generation.
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-10">
            Explore our product portfolio to see what&apos;s available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#products">
              <Button size="lg" className="flex items-center gap-2">
                Explore Our Apps
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
