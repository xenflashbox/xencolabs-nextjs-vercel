import React from "react";
import { MarketingLayout } from "@/components/layout/marketing-layout";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function LandingCraftPage() {
  return (
    <MarketingLayout>
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-gray-400 rounded-full mr-2" />
            Not Yet Available
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            LandingCraft
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            AI-powered landing page creation. This product is not yet available.
          </p>

          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2 mx-auto">
              <ArrowLeft className="w-4 h-4" />
              Back to Xenco Labs
            </Button>
          </Link>
        </div>
      </section>
    </MarketingLayout>
  );
}
