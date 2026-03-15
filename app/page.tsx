import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { MarketingLayout } from '@/components/layout/marketing-layout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Page() {
  const liveProducts = [
    {
      name: 'BlogCraft',
      description: 'AI content engine. End-to-end content pipeline from niche research to auto-publishing. Powers 6+ niche sites.',
      url: 'https://blogcraft.app',
      status: 'Live',
    },
    {
      name: 'ResumeCoach',
      description: 'AI resume optimization using government O*NET data. ATS-optimized resumes that pass automated screening.',
      url: 'https://resumecoach.me',
      status: 'Live',
    },
    {
      name: 'ImageCrafter',
      description: 'Multi-provider AI image generation with OpenAI, Google Gemini, and Stability AI.',
      url: 'https://imagecrafter.app',
      status: 'Live',
    },
    {
      name: 'Sonoma Grove Suites',
      description: 'Vacation rental booking platform with Lodgify API integration and multi-channel distribution.',
      url: 'https://sonomagrovesites.com',
      status: 'Live',
    },
  ];

  const inDevProducts = [
    {
      name: 'MCP Forge',
      description: 'API to MCP server builder',
      url: 'https://mcpforge.org',
    },
    {
      name: 'PromptMarketer',
      description: '40+ marketing AI tools',
      url: 'https://promptmarketer.app',
    },
  ];

  return (
    <MarketingLayout>
      {/* Hero Section — Clean, honest positioning */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-medium tracking-wider text-purple-600 uppercase mb-6">
            AI Product Studio
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
            Xenco Labs builds AI-powered products.
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            A product studio founded on one principle: build real tools, test them on our own businesses, then offer them to everyone else.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#products">
              <Button size="xl" className="flex items-center gap-2">
                Explore Our Apps
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="xl">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Product Portfolio */}
      <section id="products" className="py-20 px-6 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We&apos;ve Built</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Live products serving real users.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {liveProducts.map((product) => (
              <a
                key={product.name}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold">{product.name}</h3>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    {product.status}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {product.description}
                </p>
                <span className="text-purple-600 dark:text-purple-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Visit App <ExternalLink className="w-4 h-4" />
                </span>
              </a>
            ))}
          </div>

          {/* In Development */}
          <div className="text-center mb-8">
            <p className="text-sm font-medium tracking-wider text-gray-500 uppercase">In Development</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {inDevProducts.map((product) => (
              <div
                key={product.name}
                className="bg-white/50 dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700 opacity-70"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{product.name}</h4>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500">
                    <span className="w-2 h-2 bg-gray-400 rounded-full" />
                    In Dev
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Interested in what we&apos;re building?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Whether you need AI-powered tools or managed services, we&apos;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
