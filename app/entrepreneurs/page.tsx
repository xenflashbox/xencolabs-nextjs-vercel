import React from 'react';
import { ArrowRight, CheckCircle, Star, Users, Zap, Code, Database, Rocket, Globe, BarChart3, Briefcase, DollarSign, Clock, TrendingUp, Shield, ArrowUpRight, Play, Building, Target, Award, Phone, UserPlus, Layers, Percent, Scale, Lightbulb, Coffee, Heart, Flame } from 'lucide-react';
import { MarketingLayout } from '@/components/layout/marketing-layout';
import { Button } from '@/components/ui/button';

export default function EntrepreneursPage() {
  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium mb-8">
              🔥 For Solo Builders & Startup Teams
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Build Your Business
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent block">
                Like a 100-Person Team
              </span>
              <span className="text-4xl md:text-5xl block mt-4">With Just You</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Stop competing with funded startups who have unlimited resources. Our AI tools give you 
              <span className="font-bold text-orange-500"> superhuman capabilities</span> to build, market, and scale 
              <span className="font-bold text-green-500"> faster than teams 10x your size</span>.
            </p>
            
            {/* Entrepreneur Pain Points */}
            <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
                <Coffee className="w-8 h-8 text-red-500 mb-3 mx-auto" />
                <h3 className="font-bold text-red-700 dark:text-red-300 mb-2">Working 80+ Hours</h3>
                <p className="text-sm text-red-600 dark:text-red-400">You're doing marketing, sales, development, support... everything. There's no time to actually build.</p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-6">
                <DollarSign className="w-8 h-8 text-orange-500 mb-3 mx-auto" />
                <h3 className="font-bold text-orange-700 dark:text-orange-300 mb-2">Can't Afford Teams</h3>
                <p className="text-sm text-orange-600 dark:text-orange-400">Hiring marketers, designers, writers costs $200K+/year. That's more than most startups raise.</p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
                <Flame className="w-8 h-8 text-yellow-500 mb-3 mx-auto" />
                <h3 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">Burning Out Fast</h3>
                <p className="text-sm text-yellow-600 dark:text-yellow-400">The hustle is unsustainable. You need to work smarter, not harder, or you'll quit.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Button variant="entrepreneurs" size="xl" className="flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                Start Free (No Credit Card)
              </Button>
              <Button variant="outline" size="xl" className="flex items-center gap-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">
                <Play className="w-5 h-5" />
                See 5-Min Demo
              </Button>
            </div>
            
            {/* Entrepreneur Social Proof */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                <span>4,800+ Solo Builders</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span>2x Faster Product Development</span>
              </div>
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                <span>$29/mo vs $20K+ Team</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Entrepreneur Solutions */}
      <section id="apps" className="py-20 px-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your Solo Founder Toolkit
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto">
            Everything you need to compete with well-funded teams. Start with one app, add more as you grow.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* BlogCraft for Entrepreneurs */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mr-4">
                  <Code className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">BlogCraft for Entrepreneurs</h3>
                  <p className="text-green-600 dark:text-green-400 font-medium">Replace your content team</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-left">
                <span className="font-bold">What you get:</span> SEO-optimized blog posts, keyword research, content calendar, and social media content - all automated.
                <br/><br/>
                <span className="font-bold">Results:</span> 15+ high-quality articles monthly that actually rank on Google and drive traffic.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <span className="font-semibold">Startup Plan:</span> $49/mo
                  <br />
                  <span className="font-semibold">vs Hiring writer:</span> $4K+/mo
                </div>
                <Button variant="app" size="sm">
                  Try Free
                </Button>
              </div>
            </div>

            {/* PromptMarketer for Entrepreneurs */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mr-4">
                  <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">PromptMarketer</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">Your marketing department</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-left">
                <span className="font-bold">What you get:</span> 40+ marketing tools for social media, email campaigns, ad copy, landing pages, and growth experiments.
                <br/><br/>
                <span className="font-bold">Results:</span> Professional marketing campaigns that convert, without the $200K marketing team.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <span className="font-semibold">Solo Plan:</span> $99/mo
                  <br />
                  <span className="font-semibold">vs Marketing hire:</span> $8K+/mo
                </div>
                <Button variant="app" size="sm">
                  Try Free
                </Button>
              </div>
            </div>

            {/* ResumeCoach for Entrepreneurs */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">ResumeCoach</h3>
                  <p className="text-purple-600 dark:text-purple-400 font-medium">Find the right talent</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-left">
                <span className="font-bold">What you get:</span> AI-powered resume screening, job posting optimization, and candidate matching based on government job data.
                <br/><br/>
                <span className="font-bold">Results:</span> Find quality candidates 3x faster when you're ready to hire your first employees.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <span className="font-semibold">Basic Plan:</span> $29/mo
                  <br />
                  <span className="font-semibold">vs Recruiting fee:</span> $5K+ per hire
                </div>
                <Button variant="app" size="sm">
                  Try Free
                </Button>
              </div>
            </div>

            {/* LandingCraft for Entrepreneurs */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all hover:scale-105 relative">
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                Coming Soon
              </div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center mr-4">
                  <Rocket className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">LandingCraft</h3>
                  <p className="text-orange-600 dark:text-orange-400 font-medium">Ship beautiful pages fast</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-left">
                <span className="font-bold">What you get:</span> High-converting landing pages in minutes with AI-generated copy, images, and conversion optimization.
                <br/><br/>
                <span className="font-bold">Results:</span> Professional landing pages that convert 40%+ better than DIY builders.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <span className="font-semibold">Early Bird:</span> $49/mo
                  <br />
                  <span className="font-semibold">vs Designer:</span> $5K+ per page
                </div>
                <Button variant="app" size="sm">
                  Join Waitlist
                </Button>
              </div>
            </div>
          </div>

          {/* Future Tools Preview */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* MCP Forge for Entrepreneurs */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
              <div className="flex items-center justify-center mb-4">
                <Database className="w-8 h-8 mr-3" />
                <h3 className="text-2xl font-bold">MCP Forge</h3>
              </div>
              <p className="text-xl mb-4 text-purple-100">
                Connect any API to AI in 15 minutes. No coding required.
              </p>
              <p className="text-purple-200 mb-6">
                <span className="font-bold">Perfect for:</span> Automating your business workflows without hiring developers
              </p>
              <Button variant="secondary" size="default">
                Join Waitlist
              </Button>
            </div>

            {/* LaunchCraft for Entrepreneurs */}
            <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white">
              <div className="flex items-center justify-center mb-4">
                <Lightbulb className="w-8 h-8 mr-3" />
                <h3 className="text-2xl font-bold">LaunchCraft</h3>
              </div>
              <p className="text-xl mb-4 text-green-100">
                AI-powered business planning and project management for solo founders.
              </p>
              <p className="text-green-200 mb-6">
                <span className="font-bold">Perfect for:</span> Building your roadmap and staying focused on what matters
              </p>
              <Button variant="secondary" size="default">
                Join Waitlist
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Calculator */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Could You Build?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See what becomes possible when you're not spending 80% of your time on busywork.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-red-700 dark:text-red-300">Without AI Tools</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Content Creation</span>
                  <span className="font-bold text-red-600">20 hrs/week</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Marketing & Social Media</span>
                  <span className="font-bold text-red-600">15 hrs/week</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Admin & Business Tasks</span>
                  <span className="font-bold text-red-600">10 hrs/week</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Customer Support</span>
                  <span className="font-bold text-red-600">8 hrs/week</span>
                </div>
                <div className="border-t border-red-200 dark:border-red-800 pt-4">
                  <div className="flex justify-between items-center text-xl font-bold text-red-700 dark:text-red-300">
                    <span>Time for Building</span>
                    <span>7 hrs/week</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-green-700 dark:text-green-300">With Xenco Labs AI</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Content Creation (AI)</span>
                  <span className="font-bold text-green-600">2 hrs/week</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Marketing & Social (AI)</span>
                  <span className="font-bold text-green-600">3 hrs/week</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Admin & Business (AI)</span>
                  <span className="font-bold text-green-600">2 hrs/week</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Customer Support (AI)</span>
                  <span className="font-bold text-green-600">1 hrs/week</span>
                </div>
                <div className="border-t border-green-200 dark:border-green-800 pt-4">
                  <div className="flex justify-between items-center text-xl font-bold text-green-700 dark:text-green-300">
                    <span>Time for Building</span>
                    <span>52 hrs/week</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold mb-4">700% More Building Time</h3>
              <p className="text-xl text-orange-100 mb-6">
                Focus on what only you can do - building your product and growing your business
              </p>
              <Button variant="secondary" size="xl">
                Start Building Smarter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Entrepreneur Success Stories */}
      <section id="community" className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Solo Founder Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Real entrepreneurs sharing how AI tools transformed their businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Success Story 1 */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mr-4">
                  <Rocket className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Sarah Chen</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">SaaS Founder • Solo</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                "BlogCraft helped me rank #1 for 'project management software' in 6 months. I went from 0 to 10K users without spending a penny on ads."
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">10K</div>
                  <div className="text-sm text-gray-500">Users in 6mo</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">$0</div>
                  <div className="text-sm text-gray-500">Ad Spend</div>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Heart className="w-4 h-4 mr-2" />
                <span>BlogCraft user since Day 1</span>
              </div>
            </div>

            {/* Success Story 2 */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mr-4">
                  <Lightbulb className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Marcus Rodriguez</h3>
                  <p className="text-purple-600 dark:text-purple-400 font-medium">E-commerce Founder • Solo</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                "PromptMarketer automated my entire social media strategy. I'm getting 3x more engagement and my conversion rate doubled to 8%."
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">300%</div>
                  <div className="text-sm text-gray-500">Engagement</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">8%</div>
                  <div className="text-sm text-gray-500">Conversion Rate</div>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Heart className="w-4 h-4 mr-2" />
                <span>Saved 20+ hrs/week</span>
              </div>
            </div>

            {/* Success Story 3 */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center mr-4">
                  <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Jessica Park</h3>
                  <p className="text-orange-600 dark:text-orange-400 font-medium">Consulting Business • Solo</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                "The AI tools let me scale from $5K to $25K MRR without hiring anyone. I work fewer hours but serve 5x more clients."
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">$25K</div>
                  <div className="text-sm text-gray-500">Monthly Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">5x</div>
                  <div className="text-sm text-gray-500">More Clients</div>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Heart className="w-4 h-4 mr-2" />
                <span>Works 30 hrs/week</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Entrepreneur Pricing */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Entrepreneur-Friendly Pricing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Start small, scale as you grow. No contracts, no hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Package */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4">Solo Starter</h3>
              <div className="text-4xl font-bold text-orange-600 mb-4">$29<span className="text-lg text-gray-500">/mo</span></div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Perfect for validating your idea and getting started
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>BlogCraft Basic (5 articles/mo)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>PromptMarketer Essentials</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Basic email support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>14-day free trial</span>
                </li>
              </ul>
              <Button variant="entrepreneurs" size="lg" className="w-full">
                Start Free Trial
              </Button>
            </div>

            {/* Growth Package */}
            <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl p-8 text-white relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-4">Growth</h3>
              <div className="text-4xl font-bold mb-4">$99<span className="text-lg text-orange-200">/mo</span></div>
              <p className="text-orange-100 mb-6">
                Scale your business with unlimited AI power
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>BlogCraft Pro (30 articles/mo)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>PromptMarketer Full Suite</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>ResumeCoach included</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Priority support & community</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Early access to new tools</span>
                </li>
              </ul>
              <Button variant="secondary" size="lg" className="w-full">
                Start Free Trial
              </Button>
            </div>

            {/* Scale Package */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4">Scale</h3>
              <div className="text-4xl font-bold text-orange-600 mb-4">$299<span className="text-lg text-gray-500">/mo</span></div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                For established businesses ready to dominate
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Everything in Growth</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Unlimited everything</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>White-label options</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>1-on-1 strategy sessions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Custom integrations</span>
                </li>
              </ul>
              <Button variant="outline" size="lg" className="w-full border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">
                Start Free Trial
              </Button>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Not sure? Start with the free trial and see what works for you.
            </p>
            <div className="flex justify-center items-center gap-8 text-gray-500 dark:text-gray-400 text-sm">
              <span>14-day free trial</span>
              <span>"</span>
              <span>No credit card required</span>
              <span>"</span>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Entrepreneur CTA */}
      <section id="free" className="py-20 px-6 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build Like a Team of 100?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join 4,800+ solo founders who've already 2x their productivity. Start free, no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button variant="secondary" size="xl" className="flex items-center gap-2">
              <Rocket className="w-5 h-5" />
              Start Free Trial (No Card Required)
            </Button>
            <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-orange-600">
              See 5-Minute Demo
            </Button>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-orange-200 mb-4">
              Join the community of successful solo founders
            </p>
            <div className="flex justify-center items-center gap-8 text-orange-200 text-sm">
              <span>14-day free trial</span>
              <span>"</span>
              <span>Setup in 5 minutes</span>
              <span>"</span>
              <span>Results in 24 hours</span>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}