import React from "react";
import { ArrowRight, CheckCircle, Star, Clock, DollarSign, AlertCircle, Layers, MousePointer, Zap, Code, Globe, Download, Users, BarChart3, Play } from 'lucide-react';
import { MarketingLayout } from "@/components/layout/marketing-layout";
import { Button } from '@/components/ui/button';

export default function LandingCraftPage() {
  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium mb-8">
              <Clock className="w-4 h-4 mr-2" />
              🚀 Coming Soon - AI Landing Pages That Actually Convert
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Stop Losing Customers to
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"> DIY Disasters</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              While you struggle with WordPress or pay $3,000 to agencies, your competitors are launching professional landing pages in minutes with AI. Join the waitlist for the future of landing pages.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="xl" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                Join Waitlist
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="xl">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo Preview
              </Button>
            </div>

            <div className="text-gray-500 dark:text-gray-400 text-sm">
              Early access for: 
              <span className="text-gray-700 dark:text-gray-300"> Digital Marketers • SaaS Founders • Course Creators • Consultants</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Your Competition Launched While You Were
              <span className="text-red-500"> Still Choosing Colors</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-red-200 dark:border-red-900/30 text-center">
              <DollarSign className="w-12 h-12 text-red-500 mb-4 mx-auto" />
              <h3 className="text-3xl font-bold text-red-500 mb-2">$3,000</h3>
              <p className="text-xl font-semibold mb-2">Spent on a landing page that converts at 0.5%?</p>
              <p className="text-gray-500 dark:text-gray-400">Designer made it pretty, not profitable</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-red-200 dark:border-red-900/30 text-center">
              <Clock className="w-12 h-12 text-red-500 mb-4 mx-auto" />
              <h3 className="text-3xl font-bold text-red-500 mb-2">3 Weeks</h3>
              <p className="text-xl font-semibold mb-2">WordPress nightmare?</p>
              <p className="text-gray-500 dark:text-gray-400">Lost 21 potential customers while you debugged</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-red-200 dark:border-red-900/30 text-center">
              <Users className="w-12 h-12 text-red-500 mb-4 mx-auto" />
              <h3 className="text-3xl font-bold text-red-500 mb-2">Ghosted</h3>
              <p className="text-xl font-semibold mb-2">Freelancer disappeared mid-project?</p>
              <p className="text-gray-500 dark:text-gray-400">Your launch delayed, momentum killed</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-red-200 dark:border-red-900/30 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mb-4 mx-auto" />
              <h3 className="text-3xl font-bold text-red-500 mb-2">DIY</h3>
              <p className="text-xl font-semibold mb-2">Page looks like... well, DIY?</p>
              <p className="text-gray-500 dark:text-gray-400">Visitors bounce in 3 seconds flat</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Launch Your Landing Page in
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"> 5 Minutes. </span>
              Not 5 Days.
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              AI writes your copy. Drag-and-drop builds your design. One click publishes to the web. No coding, no complexity, no creative block.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Content Wizard</h3>
              <p className="text-gray-600 dark:text-gray-400">Answer simple questions. AI generates professional copy that converts.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Image Generation</h3>
              <p className="text-gray-600 dark:text-gray-400">Stop searching stock photos. DALL-E creates custom images instantly.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MousePointer className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Drag-Drop Simplicity</h3>
              <p className="text-gray-600 dark:text-gray-400">Mix and match components like LEGOs. No coding required.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">One-Click Publishing</h3>
              <p className="text-gray-600 dark:text-gray-400">Hit publish. You're live on Vercel's lightning-fast servers.</p>
            </div>
          </div>

          {/* Interactive Builder Demo */}
          <div className="bg-gradient-to-r from-gray-50 to-orange-50 dark:from-gray-800 dark:to-orange-900/20 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Two Ways to Build. Zero Ways to Fail.</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-orange-200 dark:border-orange-500/30">
                <h4 className="text-xl font-bold mb-4 text-orange-600">Wizard Mode</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Perfect for beginners</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>AI guides every step</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Professional results in minutes</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-red-200 dark:border-red-500/30">
                <h4 className="text-xl font-bold mb-4 text-red-600">Builder Mode</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Full creative control</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Component library access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Advanced customization</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="text-center mt-8">
              <Button size="lg" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                Get Early Access
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              From Idea to Live in 3 Simple Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Choose Your Style</h3>
              <p className="text-gray-600 dark:text-gray-400">Pick from 8 premium templates optimized for conversions</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">AI Does the Heavy Lifting</h3>
              <p className="text-gray-600 dark:text-gray-400">Answer questions, AI writes copy and generates images instantly</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Customize & Launch</h3>
              <p className="text-gray-600 dark:text-gray-400">Drag-drop to perfect it, then go live with one click</p>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join the LandingCraft Waitlist
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Be among the first to access the future of landing page creation. Early adopters get lifetime discounts.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Button variant="secondary" size="xl">
              Join Waitlist
            </Button>
            <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-orange-600">
              Notify Me at Launch
            </Button>
          </div>
          
          <p className="text-orange-200">
            Coming Q2 2025 • Early access starts soon • Limited beta spots
          </p>
        </div>
      </section>
    </MarketingLayout>
  );
}
