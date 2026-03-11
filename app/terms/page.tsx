import React from "react";
import { MarketingLayout } from "@/components/layout/marketing-layout";

export const metadata = {
  title: "Terms of Service - Xenco Labs",
  description: "Xenco Labs terms of service covering usage, API integrations, and user responsibilities.",
};

export default function TermsPage() {
  return (
    <MarketingLayout>
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">
            Terms of Service
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-16">
            Last updated: March 11, 2025
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-12">
            {/* Acceptance */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                By accessing or using any services provided by Xenco Labs, Inc. (&ldquo;Xenco Labs,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), including our website at xencolabs.com and our suite of applications, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </div>

            {/* Services */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">2. Description of Services</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Xenco Labs provides AI-powered software applications and tools including but not limited to: ResumeCoach (resume building and optimization), Blogcraft (content generation), Imagecrafter (prompt generation), and freelancer productivity tools. Our services may include integrations with third-party platforms to enhance functionality.
              </p>
            </div>

            {/* Account */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account. We reserve the right to suspend or terminate accounts that violate these terms.
              </p>
            </div>

            {/* API Integrations */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">4. Third-Party API Integrations</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Our services may allow you to connect third-party accounts (such as Upwork, QuickBooks/Intuit, and others) via OAuth or similar authorization mechanisms. By connecting a third-party account:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>You authorize Xenco Labs to access and use data from those platforms as described in our <a href="/privacy" className="text-blue-500 hover:text-blue-400 underline">Privacy Policy</a></li>
                <li>You represent that you have the authority to grant such access and that doing so does not violate any agreement with the third-party platform</li>
                <li>You understand that our services depend on the availability and functionality of third-party APIs, which may change without notice</li>
                <li>You may revoke access at any time through your account settings or directly on the third-party platform</li>
              </ul>

              <h3 className="text-xl font-medium mt-6 mb-3">Upwork Integration</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Our Upwork integration provides AI-powered job discovery, matching, and proposal drafting assistance. We access job listings and marketplace data to help you find relevant opportunities. We do <strong>not</strong> automatically submit proposals or take actions on your Upwork account without your explicit confirmation. You remain solely responsible for all interactions and agreements on the Upwork platform.
              </p>

              <h3 className="text-xl font-medium mt-6 mb-3">QuickBooks / Intuit Integration</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Our QuickBooks integration provides business analytics and financial reporting features. You are responsible for ensuring the accuracy of your financial data and for compliance with any applicable financial regulations.
              </p>
            </div>

            {/* Data Usage */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">5. Data Usage &amp; Limitations</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Data accessed through third-party integrations is used solely to provide and improve our services as described in our Privacy Policy. We do not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Sell your data or third-party account data to anyone</li>
                <li>Share your data with other users</li>
                <li>Use your data for purposes unrelated to the services you requested</li>
                <li>Retain data beyond what is necessary to provide our services</li>
              </ul>
            </div>

            {/* Connected Accounts */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">6. User Responsibility for Connected Accounts</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                You are solely responsible for your interactions on third-party platforms, including Upwork and QuickBooks. Xenco Labs provides tools and suggestions, but all decisions, submissions, and actions on connected platforms are your responsibility. We are not liable for any consequences arising from actions you take on third-party platforms based on our tools or recommendations.
              </p>
            </div>

            {/* AI Content */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">7. AI-Generated Content</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Our services use artificial intelligence to generate content such as resumes, blog posts, job proposals, and other text. AI-generated content is provided as a starting point and may require your review and editing. We do not guarantee the accuracy, completeness, or suitability of AI-generated content for any particular purpose. You are responsible for reviewing and approving all content before use.
              </p>
            </div>

            {/* Intellectual Property */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">8. Intellectual Property</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Content you create using our tools remains yours. Our platform, software, branding, and proprietary technology remain the property of Xenco Labs. You may not reverse-engineer, copy, or redistribute our software or services.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To the maximum extent permitted by law, Xenco Labs shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities, arising from your use of our services or any third-party integrations. Our total liability for any claim shall not exceed the amount you paid us in the 12 months preceding the claim.
              </p>
            </div>

            {/* Termination */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">10. Termination</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We may terminate or suspend your account at any time for violation of these terms. You may terminate your account at any time by contacting us. Upon termination, your right to use our services ceases immediately, and we will delete your data in accordance with our Privacy Policy.
              </p>
            </div>

            {/* Changes */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">11. Changes to These Terms</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify you of significant changes by posting a notice on our website. Your continued use of our services after changes are posted constitutes acceptance of the updated terms.
              </p>
            </div>

            {/* Governing Law */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">12. Governing Law</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any disputes arising under these terms shall be resolved in the courts located in Alameda County, California.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">13. Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                If you have questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-3 text-gray-600 dark:text-gray-300">
                <p>Xenco Labs, Inc.</p>
                <p>Email: <a href="mailto:legal@xencolabs.com" className="text-blue-500 hover:text-blue-400 underline">legal@xencolabs.com</a></p>
                <p>Website: <a href="https://xencolabs.com" className="text-blue-500 hover:text-blue-400 underline">xencolabs.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
