import React from "react";
import { MarketingLayout } from "@/components/layout/marketing-layout";

export const metadata = {
  title: "Privacy Policy - Xenco Labs",
  description: "Xenco Labs privacy policy covering data collection, API integrations, and your rights.",
};

export default function PrivacyPage() {
  return (
    <MarketingLayout>
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">
            Privacy Policy
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-16">
            Last updated: March 11, 2025
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-12">
            {/* Introduction */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Xenco Labs, Inc. (&ldquo;Xenco Labs,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website at xencolabs.com and our suite of applications, including ResumeCoach, Blogcraft, Imagecrafter, and other services we operate.
              </p>
            </div>

            {/* Information We Collect */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-medium mt-6 mb-3">Account Information</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                When you create an account, we collect your name, email address, and authentication credentials through our identity provider (Clerk). We may also collect profile information you choose to provide.
              </p>

              <h3 className="text-xl font-medium mt-6 mb-3">Usage Data</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We automatically collect certain information when you visit our site, including your IP address, browser type, operating system, referring URLs, and pages viewed. This helps us improve our services and understand how our products are used.
              </p>

              <h3 className="text-xl font-medium mt-6 mb-3">Application Data</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Depending on the Xenco Labs application you use, we may collect content you create (such as resumes, blog posts, or image prompts), preferences, and configuration settings.
              </p>
            </div>

            {/* Third-Party API Integrations */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">3. Third-Party API Integrations</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Xenco Labs integrates with third-party platforms to provide enhanced functionality. When you connect a third-party account, you explicitly authorize us to access certain data from that platform.
              </p>

              <h3 className="text-xl font-medium mt-6 mb-3">Upwork Integration</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                When you connect your Upwork account via OAuth, we may access:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Job listings and marketplace search data</li>
                <li>Your Upwork profile information (name, skills, work history)</li>
                <li>Job analytics and market trends</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-3">
                We use this data to provide AI-powered job matching, scoring, and proposal drafting assistance. We do <strong>not</strong> submit proposals or perform actions on your behalf without your explicit approval.
              </p>

              <h3 className="text-xl font-medium mt-6 mb-3">QuickBooks / Intuit Integration</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                If you connect your QuickBooks account, we may access financial data such as invoices, payments, and expense records to provide business analytics and reporting features. Access is limited to the scopes you explicitly authorize.
              </p>

              <h3 className="text-xl font-medium mt-6 mb-3">OAuth Tokens &amp; Credentials</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                When you authorize a third-party connection, we receive OAuth access tokens and refresh tokens. These tokens are:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Encrypted at rest using industry-standard encryption (AES-256)</li>
                <li>Never shared with other users or third parties</li>
                <li>Used only to access the specific data you authorized</li>
                <li>Revocable at any time by disconnecting the integration in your account settings or revoking access directly on the third-party platform</li>
              </ul>
            </div>

            {/* How We Use Your Information */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">4. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>To provide, operate, and maintain our services</li>
                <li>To personalize your experience and deliver relevant content</li>
                <li>To process transactions and send related information</li>
                <li>To send administrative information, updates, and security alerts</li>
                <li>To respond to your comments, questions, and support requests</li>
                <li>To analyze usage patterns and improve our services</li>
                <li>To detect, prevent, and address technical issues and fraud</li>
                <li>To provide AI-powered features such as job matching, content generation, and analytics</li>
              </ul>
            </div>

            {/* Data Storage & Security */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">5. Data Storage &amp; Security</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information. This includes encryption in transit (TLS/SSL), encryption at rest for sensitive data such as API tokens, regular security assessments, and access controls limiting data access to authorized personnel only.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-3">
                Our services are hosted on reputable cloud infrastructure providers. While we strive to use commercially acceptable means to protect your data, no method of transmission or storage is 100% secure.
              </p>
            </div>

            {/* Data Retention */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">6. Data Retention &amp; Deletion</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We retain your personal information only for as long as necessary to fulfill the purposes described in this policy, unless a longer retention period is required by law. API tokens for third-party integrations are retained only while the integration is active.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-3">
                You may request deletion of your account and associated data at any time by contacting us at <a href="mailto:privacy@xencolabs.com" className="text-blue-500 hover:text-blue-400 underline">privacy@xencolabs.com</a>. Upon account deletion, we will remove your personal data within 30 days, except where retention is required by law.
              </p>
            </div>

            {/* Third-Party Services */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">7. Third-Party Services</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Our services may contain links to or integrations with third-party websites and services (including Upwork, Intuit/QuickBooks, Clerk, and Vercel). We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing them with your information.
              </p>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">8. Your Rights</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                Depending on your location, you may have the following rights regarding your personal data:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Revoke consent:</strong> Disconnect any third-party integrations and revoke OAuth access at any time</li>
                <li><strong>Data portability:</strong> Request your data in a portable format</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-3">
                To exercise any of these rights, contact us at <a href="mailto:privacy@xencolabs.com" className="text-blue-500 hover:text-blue-400 underline">privacy@xencolabs.com</a>.
              </p>
            </div>

            {/* Children's Privacy */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">9. Children&apos;s Privacy</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Our services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13.
              </p>
            </div>

            {/* Changes */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">10. Changes to This Policy</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &ldquo;Last updated&rdquo; date. Your continued use of our services after any changes constitutes acceptance of the updated policy.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-3 text-gray-600 dark:text-gray-300">
                <p>Xenco Labs, Inc.</p>
                <p>Email: <a href="mailto:privacy@xencolabs.com" className="text-blue-500 hover:text-blue-400 underline">privacy@xencolabs.com</a></p>
                <p>Website: <a href="https://xencolabs.com" className="text-blue-500 hover:text-blue-400 underline">xencolabs.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
