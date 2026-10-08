import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { MarketingLayout } from '@/components/layout/marketing-layout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function EntrepreneursPage() {
  return (
    <MarketingLayout>
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="label-text text-[var(--brand-primary)] mb-6">FOR ENTREPRENEURS</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Build the business, not another pile of admin work.
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
            Xenco Labs builds software products for solo operators and small teams — and now a complete
            Local Service Business OS for field-service owners who need the office workflow to run around them.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services/local-service-business-os">
              <Button size="lg" className="flex items-center gap-2">
                See Local Service Business OS
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/apps">
              <Button variant="outline" size="lg">
                Explore Self-Serve Apps
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-tinted py-20 px-6">
        <div className="max-w-content mx-auto grid md:grid-cols-2 gap-8">
          <div className="card">
            <p className="label-text text-[var(--brand-primary)] mb-3">OWNER-OPERATED SERVICE BUSINESS</p>
            <h2 className="font-display font-bold text-3xl text-[var(--text-primary)] mb-4">Install the digital back office.</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              Phone answering, estimates, booking, contracts, job workflow, before-and-after records,
              invoicing, payments and follow-up in one managed operating system.
            </p>
            <ul className="space-y-3 mb-7">
              {['Live Sonoma Wash Co. reference implementation','Founding cohort from $10,000 setup','Typical target: 2–4 weeks after intake'].map((item)=>(
                <li key={item} className="flex gap-2.5 text-sm text-[var(--text-secondary)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--brand-primary)] mt-0.5 flex-none" />{item}
                </li>
              ))}
            </ul>
            <Link href="/services/local-service-business-os" className="text-[var(--brand-primary)] font-semibold inline-flex items-center gap-2">
              See the system <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="card">
            <p className="label-text text-[var(--brand-primary)] mb-3">SOLO BUILDER / SMALL TEAM</p>
            <h2 className="font-display font-bold text-3xl text-[var(--text-primary)] mb-4">Use the tools we built for ourselves.</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              Xenco Labs also operates self-serve products for content, SEO diagnostics, image creation,
              application planning and other focused workflows.
            </p>
            <Link href="/apps" className="text-[var(--brand-primary)] font-semibold inline-flex items-center gap-2">
              Explore apps <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
