import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Star, Users, Zap, Code, Database, Rocket, Globe, BarChart3, Briefcase, Lightbulb, ArrowUpRight, Play, Download, ExternalLink } from 'lucide-react';

const XencoLabsLanding = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen transition-colors duration-300">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">X</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Xenco Labs
                </span>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <a href="#apps" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors">Apps</a>
                <a href="#services" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors">Services</a>
                <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors">Pricing</a>
                <a href="/blog" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors">Blog</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
              <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Pain Point Focused */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm font-medium mb-8">
              ⚠️ Your competitors are using AI. Are you?
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Stop Losing to Companies
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent block">
                With Better AI
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              While you're hiring expensive teams and waiting months for results, smart businesses are using our AI apps to 
              <span className="font-bold text-purple-600 dark:text-purple-400"> replace entire departments</span> and scale 10x faster.
            </p>
            
            {/* Problem Agitation */}
            <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
                <div className="text-red-500 text-2xl mb-2">💸</div>
                <h3 className="font-bold text-red-700 dark:text-red-300 mb-2">$15K+/month</h3>
                <p className="text-sm text-red-600 dark:text-red-400">You're spending on marketing teams that deliver inconsistent results</p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-6">
                <div className="text-orange-500 text-2xl mb-2">⏰</div>
                <h3 className="font-bold text-orange-700 dark:text-orange-300 mb-2">3-6 months</h3>
                <p className="text-sm text-orange-600 dark:text-orange-400">To hire, train, and see results from new marketing hires</p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
                <div className="text-yellow-500 text-2xl mb-2">📉</div>
                <h3 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">73% failure</h3>
                <p className="text-sm text-yellow-600 dark:text-yellow-400">Rate of businesses that can't scale their content and marketing</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl text-lg font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2">
                See The Solution
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white rounded-xl text-lg font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Watch 2-Min Demo
              </button>
            </div>
            
            {/* Social Proof */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>2,400+ Smart Businesses</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span>Replace $180K Teams for $3K/month</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <span>Results in 7 Days, Not 7 Months</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Here's How We Fix This
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto">
            Four AI-powered apps that replace expensive teams and deliver better results in days, not months.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* BlogCraft */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mr-4">
                  <Code className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">BlogCraft</h3>
                  <p className="text-green-600 dark:text-green-400 font-medium">Replaces: Content Team ($8K/mo)</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-left">
                <span className="font-bold">What it does:</span> Generates SEO-optimized blog content, researches keywords, and manages your entire content strategy with AI.
                <br/><br/>
                <span className="font-bold">Results:</span> 20+ high-quality articles per month that actually rank and drive traffic.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <span className="font-semibold">Self-service:</span> $49-299/mo
                  <br />
                  <span className="font-semibold">We do it for you:</span> $2,500/mo
                </div>
                <a href="/apps/blogcraft" className="text-green-600 hover:text-green-700 flex items-center gap-1 font-semibold">
                  Try Free <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* PromptMarketer */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mr-4">
                  <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">PromptMarketer</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">Replaces: Marketing Team ($12K/mo)</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-left">
                <span className="font-bold">What it does:</span> 40+ marketing tools for social media, email campaigns, ad copy, and automation - all powered by AI.
                <br/><br/>
                <span className="font-bold">Results:</span> Professional marketing campaigns that convert, without the agency fees.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <span className="font-semibold">Self-service:</span> $99-499/mo
                  <br />
                  <span className="font-semibold">We do it for you:</span> $3,500/mo
                </div>
                <a href="/apps/promptmarketer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 font-semibold">
                  Try Free <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* ResumeCoach */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">ResumeCoach</h3>
                  <p className="text-purple-600 dark:text-purple-400 font-medium">Replaces: HR/Recruiting ($4K/mo)</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-left">
                <span className="font-bold">What it does:</span> Creates ATS-optimized resumes using government job data to pass automated screening systems.
                <br/><br/>
                <span className="font-bold">Results:</span> 73% higher interview rate for job seekers and better candidate quality for employers.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <span className="font-semibold">Self-service:</span> $29-99/mo
                  <br />
                  <span className="font-semibold">We do it for you:</span> $1,500/mo
                </div>
                <a href="/apps/resumecoach" className="text-purple-600 hover:text-purple-700 flex items-center gap-1 font-semibold">
                  Try Free <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* LandingCraft */}
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
                  <p className="text-orange-600 dark:text-orange-400 font-medium">Replaces: Web Design Team ($6K/mo)</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-left">
                <span className="font-bold">What it does:</span> Creates high-converting landing pages in minutes with AI-generated copy and images.
                <br/><br/>
                <span className="font-bold">Results:</span> Professional landing pages that convert 47% better than DIY solutions.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <span className="font-semibold">Self-service:</span> $49-199/mo
                  <br />
                  <span className="font-semibold">We do it for you:</span> $2,500/mo
                </div>
                <button className="text-orange-600 hover:text-orange-700 flex items-center gap-1 font-semibold">
                  Join Waitlist <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Coming Soon Teasers */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* MCP Forge */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
              <div className="flex items-center justify-center mb-4">
                <Database className="w-8 h-8 mr-3" />
                <h3 className="text-2xl font-bold">MCP Forge</h3>
              </div>
              <p className="text-xl mb-4 text-purple-100">
                Transform any API into an AI-ready MCP server in 15 minutes.
              </p>
              <p className="text-purple-200 mb-6">
                <span className="font-bold">Replaces:</span> Development team for AI integrations ($20K/mo)
              </p>
              <button className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Join Waitlist
              </button>
            </div>

            {/* LaunchCraft */}
            <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white">
              <div className="flex items-center justify-center mb-4">
                <Lightbulb className="w-8 h-8 mr-3" />
                <h3 className="text-2xl font-bold">LaunchCraft</h3>
              </div>
              <p className="text-xl mb-4 text-green-100">
                AI-powered app development planning and project management.
              </p>
              <p className="text-green-200 mb-6">
                <span className="font-bold">Replaces:</span> Project management and planning consultants ($8K/mo)
              </p>
              <button className="px-6 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why Choose Xenco Labs?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Integrated Ecosystem</h3>
                    <p className="text-gray-600 dark:text-gray-300">All apps work together seamlessly with shared authentication and cross-selling opportunities.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Self-Service or Managed</h3>
                    <p className="text-gray-600 dark:text-gray-300">Choose your level of involvement - use our apps directly or let us manage everything for you.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">24+ Years of Expertise</h3>
                    <p className="text-gray-600 dark:text-gray-300">Founded by technology executives with deep experience in scaling businesses with AI.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Predictable Pricing</h3>
                    <p className="text-gray-600 dark:text-gray-300">No surprises. Transparent monthly pricing that scales with your business needs.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <Globe className="text-white w-12 h-12" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Unified Dashboard</h3>
                <p className="text-gray-600 dark:text-gray-300">Manage all your AI-powered tools from one place</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audience Segments */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Built for Different Needs
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Whether you're an enterprise, agency, or entrepreneur, we have solutions tailored for your specific challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Enterprise */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all">
              <Briefcase className="w-12 h-12 text-blue-600 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Replace entire marketing departments with AI automation. Get enterprise-level results at a fraction of the cost.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Dedicated account management</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Custom AI automations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Strategic consulting</span>
                </li>
              </ul>
              <a href="/enterprise" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
                Learn More <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Agencies */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all">
              <Users className="w-12 h-12 text-purple-600 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Agencies</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Scale your client delivery without scaling your team. Manage unlimited clients with our AI-powered tools.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Multi-client management</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">White-label options</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Bulk pricing available</span>
                </li>
              </ul>
              <a href="/agencies" className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-1">
                Learn More <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Entrepreneurs */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all">
              <Lightbulb className="w-12 h-12 text-orange-600 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Entrepreneurs</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Build and grow your business with AI-powered tools. Start small and scale as you grow.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Affordable self-service plans</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Free trials available</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Upgrade path to managed</span>
                </li>
              </ul>
              <a href="/entrepreneurs" className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1">
                Learn More <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Overview */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Transparent Pricing That Scales
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Start with self-service apps or jump straight to managed services. No hidden fees, no surprises.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Self-Service */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4">Self-Service Apps</h3>
              <div className="text-4xl font-bold text-purple-600 mb-4">$29-499<span className="text-lg text-gray-500">/mo</span></div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Use our apps directly with your team. Perfect for businesses that want to maintain control.
              </p>
              <button className="w-full px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-colors">
                Explore Apps
              </button>
            </div>

            {/* Managed Services */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Managed Services</h3>
              <div className="text-4xl font-bold mb-4">$2,500+<span className="text-lg text-purple-200">/mo</span></div>
              <p className="text-purple-100 mb-6">
                We handle everything for you. Strategic planning, execution, and optimization with human oversight.
              </p>
              <button className="w-full px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Schedule Consultation
              </button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Not sure which is right for you?
            </p>
            <button className="px-8 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              Download AI Business Toolkit Guide
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Scale with AI?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join 2,400+ businesses already using Xenco Labs to automate their operations and accelerate growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-8 py-4 bg-white text-purple-600 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Free Trial
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-xl text-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">X</span>
                </div>
                <span className="text-xl font-bold text-white">Xenco Labs</span>
              </div>
              <p className="text-gray-400 max-w-sm">
                Building the AI-powered tools that scale businesses without scaling teams.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Apps</h4>
              <ul className="space-y-2">
                <li><a href="/apps/blogcraft" className="hover:text-white transition-colors">BlogCraft</a></li>
                <li><a href="/apps/promptmarketer" className="hover:text-white transition-colors">PromptMarketer</a></li>
                <li><a href="/apps/resumecoach" className="hover:text-white transition-colors">ResumeCoach</a></li>
                <li><a href="/apps/landingcraft" className="hover:text-white transition-colors">LandingCraft (Soon)</a></li>
                <li><a href="/apps/mcpforge" className="hover:text-white transition-colors">MCP Forge (Soon)</a></li>
                <li><a href="/apps/launchcraft" className="hover:text-white transition-colors">LaunchCraft (Soon)</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="/enterprise" className="hover:text-white transition-colors">Enterprise</a></li>
                <li><a href="/agencies" className="hover:text-white transition-colors">Agencies</a></li>
                <li><a href="/entrepreneurs" className="hover:text-white transition-colors">Entrepreneurs</a></li>
                <li><a href="/consulting" className="hover:text-white transition-colors">Consulting</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="/docs" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="/case-studies" className="hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="/support" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Xenco Labs. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy</a>
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">Terms</a>
              <a href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default XencoLabsLanding;