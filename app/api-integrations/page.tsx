import React from "react";
import { MarketingLayout } from "@/components/layout/marketing-layout";

export const metadata = {
  title: "API Integrations - Xenco Labs",
  description: "Learn how Xenco Labs uses third-party API integrations to power AI-driven freelancer tools.",
};

export default function ApiIntegrationsPage() {
  return (
    <MarketingLayout>
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">
            API Integrations
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            How Xenco Labs uses third-party APIs to power intelligent freelancer tools
          </p>

          <div className="space-y-16">
            {/* What We Do */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">What Our Platform Does</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Xenco Labs builds AI-powered productivity tools for freelancers and small businesses. Our platform helps independent professionals discover relevant job opportunities, analyze market trends, draft proposals, and manage their freelance business more efficiently.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-3">
                We integrate with third-party platforms via their official APIs to bring data into our tools, enabling intelligent automation that saves freelancers hours of manual work every week.
              </p>
            </div>

            {/* Upwork Integration */}
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <span className="text-green-500 text-xl font-bold">U</span>
                </div>
                <h2 className="text-2xl font-semibold">Upwork Integration</h2>
              </div>

              <h3 className="text-lg font-medium mt-4 mb-2">Data We Access</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li><strong>Job listings &amp; marketplace search:</strong> We query the Upwork API for job postings matching user-defined criteria such as skills, budget, and category.</li>
                <li><strong>User profile data:</strong> With user authorization, we access profile information to optimize job matching and proposal personalization.</li>
                <li><strong>Market analytics:</strong> We aggregate marketplace data to provide insights on demand trends, competitive rates, and skill valuations.</li>
              </ul>

              <h3 className="text-lg font-medium mt-6 mb-2">How We Use It</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li><strong>Automated job discovery:</strong> Our AI scans new job listings and scores them based on relevance to the freelancer&apos;s skills and preferences.</li>
                <li><strong>Intelligent scoring:</strong> Each job gets a match score based on skill alignment, budget fit, client rating, and historical success patterns.</li>
                <li><strong>Proposal drafting:</strong> We generate personalized proposal drafts that freelancers can review, edit, and submit themselves.</li>
                <li><strong>Market insights:</strong> We surface trends in job categories, average rates, and demand signals to help freelancers make data-driven decisions.</li>
              </ul>

              <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  <strong>Important:</strong> Xenco Labs does <strong>not</strong> automate proposal submission. All proposals are drafted as suggestions — the freelancer always reviews and submits manually through the Upwork platform. We believe freelancers should maintain full control over client interactions.
                </p>
              </div>
            </div>

            {/* QuickBooks Integration */}
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <span className="text-blue-500 text-xl font-bold">Q</span>
                </div>
                <h2 className="text-2xl font-semibold">QuickBooks / Intuit Integration</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                For freelancers and small businesses managing their finances, we integrate with QuickBooks to provide unified business analytics — connecting revenue data with project tracking for a complete picture of business health.
              </p>
            </div>

            {/* Data Security */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Data Security Practices</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800">
                  <h3 className="font-medium mb-2">🔐 Encrypted Storage</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    All API tokens and credentials are encrypted at rest using AES-256 encryption. Tokens are never stored in plaintext.
                  </p>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800">
                  <h3 className="font-medium mb-2">🔒 Secure Transport</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    All API communications use TLS/SSL encryption. We never transmit sensitive data over unencrypted connections.
                  </p>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800">
                  <h3 className="font-medium mb-2">🛡️ Minimal Scope</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    We request only the minimum API permissions needed. We never ask for more access than our features require.
                  </p>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800">
                  <h3 className="font-medium mb-2">🗑️ Revocable Access</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Users can disconnect integrations at any time. Upon disconnection, we delete all associated tokens and cached data.
                  </p>
                </div>
              </div>
            </div>

            {/* Compliance */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Compliance &amp; Policies</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Our API usage complies with each platform&apos;s terms of service and API usage policies. For more details on how we handle your data, please review our{" "}
                <a href="/privacy" className="text-blue-500 hover:text-blue-400 underline">Privacy Policy</a> and{" "}
                <a href="/terms" className="text-blue-500 hover:text-blue-400 underline">Terms of Service</a>.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-3">
                Questions about our integrations? Contact us at{" "}
                <a href="mailto:dev@xencolabs.com" className="text-blue-500 hover:text-blue-400 underline">dev@xencolabs.com</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
