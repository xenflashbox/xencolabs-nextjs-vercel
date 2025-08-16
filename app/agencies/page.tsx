import React from 'react';
import { ArrowRight, CheckCircle, Star, Users, Zap, Code, Database, Rocket, Globe, BarChart3, Briefcase, DollarSign, Clock, TrendingUp, Shield, ArrowUpRight, Play, Building, Target, Award, Phone, UserPlus, Layers, Percent, Scale } from 'lucide-react';
import { MarketingLayout } from '@/components/layout/marketing-layout';
import { Button } from '@/components/ui/button';

export default function AgenciesPage() {
  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium mb-8">
              🚨 Agency Alert: Your Margins Are Under Attack
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Scale to 100+ Clients
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent block">
                Without Hiring
              </span>
              <span className="text-4xl md:text-5xl block mt-4">a Single Employee</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Stop turning away clients because you can't scale delivery. Our AI-powered platform lets you 
              <span className="font-bold text-orange-500"> manage unlimited clients</span> with the same small team while 
              <span className="font-bold text-green-500"> increasing margins by 40%+</span>.
            </p>
            
            {/* Agency Pain Points */}
            <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
                <UserPlus className="w-8 h-8 text-red-500 mb-3 mx-auto" />
                <h3 className="font-bold text-red-700 dark:text-red-300 mb-2">Can't Scale Team</h3>
                <p className="text-sm text-red-600 dark:text-red-400">Hiring is expensive, slow, and risky. Good talent is hard to find and harder to keep.</p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-6">
                <Percent className="w-8 h-8 text-orange-500 mb-3 mx-auto" />
                <h3 className="font-bold text-orange-700 dark:text-orange-300 mb-2">Shrinking Margins</h3>
                <p className="text-sm text-orange-600 dark:text-orange-400">Client demands increase while budgets stay flat. You're doing more work for less profit.</p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
                <Clock className="w-8 h-8 text-yellow-500 mb-3 mx-auto" />
                <h3 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">Delivery Bottlenecks</h3>
                <p className="text-sm text-yellow-600 dark:text-yellow-400">Your team is maxed out. You're turning away new clients or delivering late.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Button variant="agencies" size="xl" className="flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                Start 14-Day Agency Trial
              </Button>
              <Button variant="outline" size="xl" className="flex items-center gap-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
                <Play className="w-5 h-5" />
                Watch Agency Demo
              </Button>
            </div>
            
            {/* Agency Social Proof */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>1,200+ Growing Agencies</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span>Average 40% Margin Increase</span>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5" />
                <span>3x Client Capacity on Average</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agency Solutions */}
      <section id="tools" className="py-20 px-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your Agency Scaling Arsenal
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto">
            Professional-grade AI tools designed specifically for agencies who want to scale delivery without scaling overhead.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Agency BlogCraft */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mr-4">
                  <Code className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Agency BlogCraft</h3>
                  <p className="text-green-600 dark:text-green-400 font-medium">White-label content at scale</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-left">
                <span className="font-bold">Agency Features:</span> Multi-client management, white-label branding, bulk content generation, and client approval workflows.
                <br/><br/>
                <span className="font-bold">Client Results:</span> 30+ articles per month per client with your agency branding.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <span className="font-semibold">Per Client:</span> $199-499/mo
                  <br />
                  <span className="font-semibold">Agency Margin:</span> 60-70%
                </div>
                <Button variant="app" size="sm">
                  Try Free
                </Button>
              </div>
            </div>

            {/* Agency PromptMarketer */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mr-4">
                  <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Agency PromptMarketer</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">Complete marketing automation</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-left">
                <span className="font-bold">Agency Features:</span> Multi-client dashboards, automated reporting, campaign templates, and performance tracking across all accounts.
                <br/><br/>
                <span className="font-bold">Client Results:</span> 50+ marketing assets monthly with detailed performance analytics.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <span className="font-semibold">Per Client:</span> $299-799/mo
                  <br />
                  <span className="font-semibold">Agency Margin:</span> 65-75%
                </div>
                <Button variant="app" size="sm">
                  Try Free
                </Button>
              </div>
            </div>

            {/* Client Management Hub */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mr-4">
                  <Layers className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Client Management Hub</h3>
                  <p className="text-purple-600 dark:text-purple-400 font-medium">Unified agency dashboard</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-left">
                <span className="font-bold">What you get:</span> Single dashboard to manage all clients, automated invoicing, project tracking, and performance reporting.
                <br/><br/>
                <span className="font-bold">Results:</span> 70% reduction in admin time and zero missed deliverables.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <span className="font-semibold">Agency License:</span> $199-499/mo
                  <br />
                  <span className="font-semibold">Unlimited clients included</span>
                </div>
                <Button variant="app" size="sm">
                  See Demo
                </Button>
              </div>
            </div>

            {/* White-Label Solutions */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center mr-4">
                  <Award className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">White-Label Platform</h3>
                  <p className="text-orange-600 dark:text-orange-400 font-medium">Your brand, our technology</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-left">
                <span className="font-bold">Complete rebrand:</span> Custom domain, your logo, your colors. Clients see your brand everywhere, not ours.
                <br/><br/>
                <span className="font-bold">Results:</span> Position yourself as the AI technology leader in your market.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <span className="font-semibold">White-label fee:</span> $999/mo
                  <br />
                  <span className="font-semibold">For unlimited clients</span>
                </div>
                <Button variant="app" size="sm">
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agency Growth Calculator */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              See Your Growth Potential
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Calculate how much revenue you could add without hiring anyone.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-6 text-red-700 dark:text-red-300">Current Agency Model</h3>
              <div className="space-y-4">
                <div className="text-3xl font-bold">20 Clients</div>
                <div className="text-lg text-gray-600 dark:text-gray-300">Maximum with current team</div>
                <div className="text-3xl font-bold text-red-600">$5K/month avg</div>
                <div className="text-lg text-gray-600 dark:text-gray-300">Per client revenue</div>
                <div className="border-t border-red-200 dark:border-red-800 pt-4">
                  <div className="text-4xl font-bold text-red-700 dark:text-red-300">$100K/mo</div>
                  <div className="text-lg text-gray-600 dark:text-gray-300">Total Revenue</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-6 text-green-700 dark:text-green-300">With Xenco Labs</h3>
              <div className="space-y-4">
                <div className="text-3xl font-bold">80 Clients</div>
                <div className="text-lg text-gray-600 dark:text-gray-300">Same team size</div>
                <div className="text-3xl font-bold text-green-600">$7K/month avg</div>
                <div className="text-lg text-gray-600 dark:text-gray-300">Higher value services</div>
                <div className="border-t border-green-200 dark:border-green-800 pt-4">
                  <div className="text-4xl font-bold text-green-700 dark:text-green-300">$560K/mo</div>
                  <div className="text-lg text-gray-600 dark:text-gray-300">Total Revenue</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-6 text-purple-700 dark:text-purple-300">Your Growth</h3>
              <div className="space-y-4">
                <div className="text-3xl font-bold">+60 Clients</div>
                <div className="text-lg text-gray-600 dark:text-gray-300">Additional capacity</div>
                <div className="text-3xl font-bold text-purple-600">460% ROI</div>
                <div className="text-lg text-gray-600 dark:text-gray-300">Revenue increase</div>
                <div className="border-t border-purple-200 dark:border-purple-800 pt-4">
                  <div className="text-4xl font-bold text-purple-700 dark:text-purple-300">+$460K/mo</div>
                  <div className="text-lg text-gray-600 dark:text-gray-300">Additional Revenue</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold mb-4">Average Agency Results</h3>
              <p className="text-xl text-purple-100 mb-6">
                4x client capacity + 40% higher margins = 560% revenue growth
              </p>
              <Button variant="secondary" size="xl">
                Calculate Your Growth
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Agency Success Stories */}
      <section id="success" className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Agency Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See how agencies like yours are scaling without limits.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Success Story 1 */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mr-4">
                  <Building className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Digital Marketing Agency</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">Austin, TX • 8 employees</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                "We went from 15 clients to 65 clients in 8 months without hiring anyone. Our margins increased 45% because we can offer premium AI services."
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">433%</div>
                  <div className="text-sm text-gray-500">Client Growth</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">45%</div>
                  <div className="text-sm text-gray-500">Margin Increase</div>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                <span>Results in 8 months</span>
              </div>
            </div>

            {/* Success Story 2 */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Content & SEO Agency</h3>
                  <p className="text-purple-600 dark:text-purple-400 font-medium">Seattle, WA • 12 employees</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                "BlogCraft let us produce 10x more content for our clients. We raised our prices 30% and clients are happier than ever with the quality and volume."
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">1000%</div>
                  <div className="text-sm text-gray-500">Content Output</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">30%</div>
                  <div className="text-sm text-gray-500">Price Increase</div>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                <span>Results in 6 months</span>
              </div>
            </div>

            {/* Success Story 3 */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center mr-4">
                  <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Full-Service Agency</h3>
                  <p className="text-orange-600 dark:text-orange-400 font-medium">Miami, FL • 25 employees</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                "The white-label platform made us the 'AI agency' in our market. We're booking $50K+ monthly retainers because clients see us as the future."
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">250%</div>
                  <div className="text-sm text-gray-500">Revenue Growth</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">$50K</div>
                  <div className="text-sm text-gray-500">Avg Retainer</div>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                <span>Results in 12 months</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agency Pricing */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Agency-Friendly Pricing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Transparent pricing that grows with your agency. No surprises, no hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Package */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4">Agency Starter</h3>
              <div className="text-4xl font-bold text-purple-600 mb-4">$499<span className="text-lg text-gray-500">/mo</span></div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Perfect for agencies managing 5-20 clients
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Up to 20 client accounts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>BlogCraft + PromptMarketer</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Client dashboard access</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Basic white-labeling</span>
                </li>
              </ul>
              <Button variant="agencies" size="lg" className="w-full">
                Start Free Trial
              </Button>
            </div>

            {/* Growth Package */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-white relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-4">Agency Growth</h3>
              <div className="text-4xl font-bold mb-4">$1,299<span className="text-lg text-purple-200">/mo</span></div>
              <p className="text-purple-100 mb-6">
                Scale to 50+ clients with advanced features
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Up to 50 client accounts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Full AI suite access</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Advanced reporting & analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Complete white-labeling</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Priority support</span>
                </li>
              </ul>
              <Button variant="secondary" size="lg" className="w-full">
                Start Free Trial
              </Button>
            </div>

            {/* Enterprise Package */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4">Agency Enterprise</h3>
              <div className="text-4xl font-bold text-purple-600 mb-4">Custom</div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Unlimited clients with custom solutions
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Unlimited client accounts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Custom AI development</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>24/7 priority support</span>
                </li>
              </ul>
              <Button variant="outline" size="lg" className="w-full border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Agency CTA */}
      <section id="trial" className="py-20 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Scale Your Agency?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join 1,200+ agencies who've already 4x their client capacity. Start your 14-day free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button variant="secondary" size="xl" className="flex items-center gap-2">
              <Rocket className="w-5 h-5" />
              Start 14-Day Free Trial
            </Button>
            <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-purple-600">
              Book Agency Demo
            </Button>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-purple-200 mb-4">
              Trusted by 1,200+ growing agencies worldwide
            </p>
            <div className="flex justify-center items-center gap-8 text-purple-200 text-sm">
              <span>No setup fees</span>
              <span>"</span>
              <span>Cancel anytime</span>
              <span>"</span>
              <span>White-label ready</span>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}