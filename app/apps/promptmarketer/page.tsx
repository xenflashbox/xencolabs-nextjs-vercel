"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle, Star, Zap, DollarSign, Clock, RefreshCw, Layers, BarChart3, Target, Play } from 'lucide-react';
import { MarketingLayout } from "@/components/layout/marketing-layout";
import { Button } from '@/components/ui/button';

export default function PromptMarketerPage() {
  const tools = {
    social: {
      name: 'Social Media Suite',
      tools: ['Instagram Posts', 'Twitter Threads', 'LinkedIn Articles', 'Facebook Ads', 'TikTok Scripts'],
      demo: 'Generate a week of social content in 5 minutes'
    },
    email: {
      name: 'Email Marketing',
      tools: ['Welcome Series', 'Sales Sequences', 'Newsletters', 'Cart Abandonment', 'Re-engagement'],
      demo: 'Create entire email funnels that convert'
    },
    ads: {
      name: 'Ad Copy Generator',
      tools: ['Google Ads', 'Facebook Ads', 'Display Ads', 'YouTube Scripts', 'Native Ads'],
      demo: 'A/B test 10 ad variations instantly'
    },
    content: {
      name: 'Content Marketing',
      tools: ['Blog Outlines', 'Case Studies', 'White Papers', 'eBooks', 'Webinar Scripts'],
      demo: 'Turn one idea into 20 pieces of content'
    }
  } as const;

  type ToolKey = keyof typeof tools;
  const [selectedTool, setSelectedTool] = useState<ToolKey>('social');

  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-8">
              <Zap className="w-4 h-4 mr-2" />
              40+ Marketing Tools in One Platform
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Fire Your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> $5,000/Month </span>
              Marketing Agency
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              While agencies take weeks and deliver cookie-cutter campaigns, generate professional marketing content for every channel in minutes
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="xl" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Replace Your Agency Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="xl">
                <Play className="w-5 h-5 mr-2" />
                See All 40+ Tools
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No contracts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Results in minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Marketing Agencies Are
              <span className="text-red-500"> Robbing You Blind</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-red-200 dark:border-red-900/30">
              <DollarSign className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-xl font-bold mb-3">$5,000/month for recycled templates?</h3>
              <p className="text-gray-600 dark:text-gray-400">Same strategies they use for 50 other clients. Zero originality.</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-red-200 dark:border-red-900/30">
              <Clock className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-xl font-bold mb-3">2-week turnaround for one campaign?</h3>
              <p className="text-gray-600 dark:text-gray-400">By then, the opportunity is gone and competitors won.</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-red-200 dark:border-red-900/30">
              <RefreshCw className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-xl font-bold mb-3">Need a small change? That'll be extra.</h3>
              <p className="text-gray-600 dark:text-gray-400">Nickel and dimed for every revision. Costs spiral out of control.</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-red-200 dark:border-red-900/30">
              <Layers className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-xl font-bold mb-3">Different tool for every channel?</h3>
              <p className="text-gray-600 dark:text-gray-400">Juggling 10+ subscriptions is chaos. Nothing works together.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-2xl text-gray-600 dark:text-gray-300">
              There's a better way to do marketing...
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              One Platform.
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Every Marketing Tool. </span>
              Instant Results.
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              PromptMarketer gives you 40+ AI-powered marketing tools that work together. Create entire campaigns across every channel in the time it takes to brief an agency.
            </p>
          </div>

          {/* Interactive Tool Demo */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              {(Object.entries(tools) as [ToolKey, typeof tools[ToolKey]][]).map(([key, tool]) => (
                <button
                  key={key}
                  onClick={() => setSelectedTool(key)}
                  className={`p-4 rounded-xl font-semibold transition-all ${
                    selectedTool === key
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                  }`}
                >
                  {tool.name}
                </button>
              ))}
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4">{tools[selectedTool].name}</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400">Tools Included:</h4>
                  <ul className="space-y-2">
                    {tools[selectedTool].tools.map((tool, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{tool}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400">See it in action:</h4>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-700 dark:text-gray-300">{tools[selectedTool].demo}</p>
                    <button className="mt-4 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center gap-2">
                      Watch demo <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Complete Campaigns in 10 Minutes</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>Social posts for every platform</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>Email sequences that convert</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>Ad copy that stops the scroll</span>
                </li>
              </ul>
            </div>

            <div>
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Consistency Across Every Channel</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>One message, adapted perfectly</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>Brand voice maintained</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>No more mixed messaging</span>
                </li>
              </ul>
            </div>

            <div>
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">A/B Test Everything Instantly</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>Generate 10 variations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>Test what works</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>Scale winners immediately</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Marketers Who Fired Their Agency
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">And never looked back</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
                "Replaced my $4,000/month agency with PromptMarketer. Better campaigns, instant delivery, and I keep full control. Saved $45,000 this year alone."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white">
                  JK
                </div>
                <div>
                  <p className="font-semibold">Jennifer Kim</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">E-commerce Director</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
                "Agency wanted 2 weeks for a product launch campaign. Did it myself in 30 minutes with PromptMarketer. Campaign converted at 3.2x industry average."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center font-bold text-white">
                  MD
                </div>
                <div>
                  <p className="font-semibold">Marcus Davis</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">SaaS Founder</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
                "The email sequences alone paid for the entire year. Generated $67K from one automated campaign that took 15 minutes to create."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center font-bold text-white">
                  AT
                </div>
                <div>
                  <p className="font-semibold">Amanda Torres</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Marketing Consultant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pricing That Makes Agencies
              <span className="text-blue-600"> Look Ridiculous</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Get more tools, better results, for 98% less cost
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Starter</h3>
                <div className="text-5xl font-bold text-blue-600 mb-2">$99<span className="text-lg text-gray-500">/mo</span></div>
                <p className="text-gray-500 dark:text-gray-400">Perfect for solopreneurs</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>20+ essential tools</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>1,000 generations/month</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>3 brand voices</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Basic analytics</span>
                </li>
              </ul>
              
              <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                Start Free Trial
              </Button>
            </div>

            {/* Professional */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border-2 border-blue-600 relative transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                  REPLACES $5K AGENCY
                </span>
              </div>
              
              <div className="text-center mb-8 mt-4">
                <h3 className="text-2xl font-bold mb-4">Professional</h3>
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  $299<span className="text-lg text-gray-500">/mo</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400">For growing businesses</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>All 40+ tools</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Unlimited generations</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Unlimited brand voices</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Priority support</span>
                </li>
              </ul>
              
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Start Free Trial
              </Button>
            </div>

            {/* Enterprise */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
                <div className="text-5xl font-bold text-blue-600 mb-2">Custom</div>
                <p className="text-gray-500 dark:text-gray-400">For agencies & teams</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>White-label options</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>API access</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Dedicated success manager</span>
                </li>
              </ul>
              
              <Button variant="outline" className="w-full">
                Contact Sales
              </Button>
            </div>
          </div>

          {/* Comparison */}
          <div className="mt-16 bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-8 text-center">The Math Is Simple</h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-2">Traditional Agency</p>
                <p className="text-3xl font-bold text-red-500">$5,000/mo</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">2-week delivery</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-2">Freelancer Team</p>
                <p className="text-3xl font-bold text-yellow-500">$3,000/mo</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">1-week delivery</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-2">PromptMarketer</p>
                <p className="text-3xl font-bold text-green-500">$299/mo</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">10-minute delivery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your Agency Is Praying You Don't Find This Page
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join 5,000+ marketers who've ditched agencies for AI that actually delivers
          </p>
          
          <div className="bg-white/10 rounded-2xl p-8 max-w-2xl mx-auto mb-8">
            <div className="grid md:grid-cols-3 gap-4 text-center mb-6">
              <div>
                <p className="text-3xl font-bold text-blue-200">94%</p>
                <p className="text-sm text-blue-200">Cost savings vs agency</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-200">10min</p>
                <p className="text-sm text-blue-200">Average campaign time</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-200">5,000+</p>
                <p className="text-sm text-blue-200">Happy marketers</p>
              </div>
            </div>
          </div>
          
          <Button variant="secondary" size="xl" className="mb-6">
            Replace Your Agency Now →
          </Button>
          
          <p className="text-blue-200">
            30-day money back guarantee • Cancel anytime • No contracts
          </p>
        </div>
      </section>
    </MarketingLayout>
  );
}
