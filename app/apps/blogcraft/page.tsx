import React from "react";
import { ArrowRight, CheckCircle, Star, Users, Zap, Code, Calendar, TrendingUp, Search, FileText, BarChart3, Play, Download, ArrowUpRight, Clock, DollarSign, Target, Award } from 'lucide-react';
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
                🚀 #1 AI Content Engine
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Generate 20+
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent block">
                  SEO Blog Posts
                </span>
                <span className="text-4xl block">Every Month</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Stop struggling with content creation. BlogCraft's AI writes SEO-optimized articles that actually rank, 
                while you focus on growing your business.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="xl" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  Start Writing Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="xl">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-green-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <FileText className="text-white w-12 h-12" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Content Generation</h3>
                <p className="text-gray-600 dark:text-gray-300">From keyword to published post in minutes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-8">
              Trusted by content creators worldwide
            </p>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">800+</div>
                <p className="text-gray-600 dark:text-gray-300">Active Writers</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">50K+</div>
                <p className="text-gray-600 dark:text-gray-300">Articles Generated</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">300%</div>
                <p className="text-gray-600 dark:text-gray-300">Average Traffic Increase</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">4.9/5</div>
                <p className="text-gray-600 dark:text-gray-300">User Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need for Content Success
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From keyword research to published posts, BlogCraft handles your entire content workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* SEO Research */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
              <Search className="w-12 h-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">Smart SEO Research</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                AI analyzes your niche and finds high-impact, low-competition keywords that actually drive traffic.
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

            {/* Content Generation */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800">
              <FileText className="w-12 h-12 text-green-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">AI Content Creation</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Generate comprehensive, well-researched articles that read like they were written by experts.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Long-form articles (2000+ words)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Fact-checked information</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Human-like writing style</span>
                </li>
              </ul>
            </div>

            {/* Content Calendar */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 border border-purple-200 dark:border-purple-800">
              <Calendar className="w-12 h-12 text-purple-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">Content Planning</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Never run out of ideas. AI creates content calendars and maintains consistent publishing schedules.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">30-day content calendars</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">Topic ideation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">Publishing automation</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Workflow Demo */}
          <div className="bg-gradient-to-r from-gray-50 to-green-50 dark:from-gray-800 dark:to-green-900/20 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">See How It Works</h3>
              <p className="text-gray-600 dark:text-gray-300">From idea to published post in 4 simple steps</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h4 className="font-bold mb-2">Choose Topic</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">AI suggests high-impact topics for your niche</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h4 className="font-bold mb-2">Research & Outline</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">AI researches and creates detailed outlines</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h4 className="font-bold mb-2">Generate Content</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">AI writes comprehensive, SEO-optimized articles</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  4
                </div>
                <h4 className="font-bold mb-2">Publish & Track</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">One-click publishing with performance tracking</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Choose Your Content Strategy
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              From solo bloggers to content teams, we have the right plan for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Starter</h3>
                <div className="text-4xl font-bold text-green-600 mb-2">$49<span className="text-lg text-gray-500">/month</span></div>
                <p className="text-gray-500">Perfect for solo entrepreneurs</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>5 articles per month</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>SEO keyword research</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Content calendar</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>WordPress integration</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Basic analytics</span>
                </li>
              </ul>
              
              <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                Start Free Trial
              </Button>
            </div>

            {/* Professional */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border-2 border-green-600 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold">Most Popular</span>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Professional</h3>
                <div className="text-4xl font-bold text-green-600 mb-2">$149<span className="text-lg text-gray-500">/month</span></div>
                <p className="text-gray-500">For growing businesses</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>20 articles per month</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Advanced SEO optimization</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Multiple websites</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Custom content templates</span>
                </li>
              </ul>
              
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Start Free Trial
              </Button>
            </div>

            {/* Enterprise */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
                <div className="text-4xl font-bold text-green-600 mb-2">Custom</div>
                <p className="text-gray-500">For agencies and teams</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Unlimited articles</span>
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
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>SLA guarantees</span>
                </li>
              </ul>
              
              <Button variant="outline" className="w-full">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Scale Your Content?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join 800+ content creators already generating high-quality articles that rank and drive traffic.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Button variant="secondary" size="xl">
              Start Free Trial
            </Button>
            <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-green-600">
              Schedule Demo
            </Button>
          </div>
          
          <p className="text-green-200">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>
    </MarketingLayout>
  );
}
