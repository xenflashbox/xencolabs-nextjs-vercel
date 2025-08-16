import React from "react";
import { MarketingLayout } from "@/components/layout/marketing-layout";

export default function ConsultingPage() {
  return (
    <MarketingLayout>
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">
            Consulting
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Consulting page coming soon.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            This page is under development.
          </p>
        </div>
      </section>
    </MarketingLayout>
  );
}
