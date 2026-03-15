import React from "react";
import { ArrowRight, CheckCircle, ExternalLink, FileText, Search, Calendar } from 'lucide-react';
import { MarketingLayout } from "@/components/layout/marketing-layout";
import { Button } from '@/components/ui/button';

export default function BlogCraftPage() {
  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-8">
                AI Content Engine
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                BlogCraft
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                End-to-end AI content pipeline from niche research to auto-publishing.
                Currently powering 6+ niche content sites with SEO-optimized articles.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="https://blogcraft.app" target="_blank" rel="noopener noreferrer">
                  <Button size="xl" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 flex items-center gap-2">
                    Visit BlogCraft
                    <ExternalLink className="w-5 h-5" />
                  </Button>
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-green-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <FileText className="text-white w-12 h-12" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Content Generation</h3>
                <p className="text-gray-600 dark:text-gray-300">From keyword to published post</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What BlogCraft Does
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A complete content workflow from keyword research to published posts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
              <Search className="w-12 h-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">SEO Research</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                AI analyzes your niche and finds high-impact keywords to target.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Keyword difficulty analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Search volume insights</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Competitor gap analysis</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800">
              <FileText className="w-12 h-12 text-green-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">AI Content Creation</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Generate comprehensive, well-researched long-form articles.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Long-form articles (2000+ words)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">SEO-optimized structure</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Multi-niche support</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 border border-purple-200 dark:border-purple-800">
              <Calendar className="w-12 h-12 text-purple-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">Auto-Publishing</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Schedule and publish content automatically across your sites.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">Content calendars</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">WordPress integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">Publishing automation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            See BlogCraft in Action
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Visit blogcraft.app to explore the platform and see what AI-powered content creation looks like.
          </p>
          <a href="https://blogcraft.app" target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="xl" className="flex items-center gap-2 mx-auto">
              Visit BlogCraft
              <ExternalLink className="w-5 h-5" />
            </Button>
          </a>
        </div>
      </section>
    </MarketingLayout>
  );
}
