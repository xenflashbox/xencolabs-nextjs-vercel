import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Star, Users, Zap, Code, Database, Rocket, Globe, BarChart3, Briefcase, DollarSign, Clock, TrendingUp, Shield, ArrowUpRight, Play, Building, Target, Award, Phone, UserPlus, Layers, Percent, Scale, Lightbulb, Coffee, Heart, Flame } from 'lucide-react';

const EntrepreneursLanding = () => {
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
                <a href="/" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors">Home</a>
                <a href="/enterprise" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors">Enterprise</a>
                <a href="/agencies" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors">Agencies</a>
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
                Start Free
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium mb-8">
              🔥 Entrepreneur Special: Level the Playing Field
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Compete with
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent block">
                Million-Dollar Companies
              </span>
              <span className="text-4xl md:text-5xl block mt-4">Using $49/Month AI</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Stop getting crushed by companies with huge budgets. Our AI tools give you the same superpowers as 
              <span className="font-bold text-orange-500"> enterprise marketing teams</span> for the price of 
              <span className="font-bold text-green-500"> a gym membership</span>.
            </p>
            
            {/* Entrepreneur Pain Points */}
            <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
                <DollarSign className="w-8 h-8 text-red-500 mb-3 mx-auto" />
                <h3 className="font-bold text-red-700 dark:text-red-300 mb-2">Bootstrap Budget</h3>
                <p className="text-sm text-red-600 dark:text-red-400">Can't afford $5K/month agencies or full-time marketing teams like your competitors</p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-6">
                <Clock className="w-8 h-8 text-orange-500 mb-3 mx-auto" />
                <h3 className="font-bold text-orange-700 dark:text-orange-300 mb-2">Wearing All Hats</h3>
                <p className="text-sm text-orange-600 dark:text-orange-400">You're the CEO, marketer, content creator, and everything else. No time for it all.</p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
                <TrendingUp className="w-8 h-8 text-yellow-500 mb-3 mx-auto" />
                <h3 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">David vs Goliath</h3>
                <p className="text-sm text-yellow-600 dark:text-yellow-400">Big competitors have teams of specialists. You're fighting with basic tools.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl text-lg font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2">
                <Rocket className="w-5 h-5" />
                Start Free Trial
              </button>
              <button className="px-8 py-4 border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white rounded-xl text-lg font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Watch Success Stories
              </button>
            </div>
            
            {/* Entrepreneur Social Proof */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span>1,200+ Solo Entrepreneurs</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <span>Average 5x Growth in 6 Months</span>
              </div>
              <div className="flex items-center gap-2">
                <Coffee className="w-5 h-5 text-brown-500" />
                <span>Works While You Sleep</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Unfair Advantage */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Your Unfair Advantage Against Big Companies
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              What used to require million-dollar budgets is now available for the price of lunch.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Big Company Problems */}
            <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-8 border-2 border-red-200 dark:border-red-800">
              <h3 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-6 text-center">What Your Competitors Deal With</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <DollarSign className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-red-700 dark:text-red-300">$15K+/month Marketing Teams</h4>
                    <p className="text-sm text-red-600 dark:text-red-400">Manager, writers, designers, plus overhead and benefits</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-red-700 dark:text-red-300">Slow, Bureaucratic Processes</h4>
                    <p className="text-sm text-red-600 dark:text-red-400">Meetings, approvals, revisions - everything takes forever</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <UserPlus className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-red-700 dark:text-red-300">Human Limitations</h4>
                    <p className="text-sm text-red-600 dark:text-red-400">Sick days, vacations, burnout, inconsistent quality</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-red-100 dark:bg-red-800 rounded-lg p-4 text-center">
                <p className="text-red-700 dark:text-red-300 font-bold">They're Actually Slower Than You</p>
              </div>
            </div>

            {/* Your Advantage */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-8 border-2 border-green-200 dark:border-green-800">
              <h3 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-6 text-center">Your AI-Powered Advantage</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <DollarSign className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-green-700 dark:text-green-300">$49-499/month Total Cost</h4>
                    <p className="text-sm text-green-600 dark:text-green-400">Same results as their $15K teams for 97% less money</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-green-700 dark:text-green-300">Lightning Fast Execution</h4>
                    <p className="text-sm text-green-600 dark:text-green-400">No meetings, no approvals - just instant results</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Rocket className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-green-700 dark:text-green-300">24/7 AI Team</h4>
                    <p className="text-sm text-green-600 dark:text-green-400">Never sleeps, never gets sick, always consistent quality</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-green-600 text-white rounded-lg p-4 text-center">
                <p className="font-bold">You're Actually Faster & Better</p>
              </div>
            </div>
          </div>

          {/* Success Story Teaser */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Real Entrepreneur Success</h3>
            <p className="text-xl text-purple-100 mb-6">
              "I went from losing clients to Fortune 500 companies to winning against them. 
              My content quality is now better than their $20K/month agency."
            </p>
            <div className="flex items-center justify-center gap-8">
              <div>
                <div className="text-3xl font-bold">$2K → $25K</div>
                <p className="text-purple-200">Monthly Revenue</p>
              </div>
              <div>
                <div className="text-3xl font-bold">6 months</div>
                <p className="text-purple-200">To achieve this</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Entrepreneur Tools */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Your Entrepreneur Toolkit
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Start with one app, add more as you grow. Each one replaces an expensive specialist.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* BlogCraft for Entrepreneurs */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mr-4">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">BlogCraft</h3>
                  <p className="text-green-600 dark:text-green-400 font-medium">Your Content Marketing Department</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-bold mb-3">What You Get:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">20+ SEO blog posts per month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Keyword research & strategy</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Content calendar automation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Rank higher than competitors</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">$49<span className="text-lg text-gray-500">/mo</span></div>
                    <div className="text-sm text-gray-500">vs. $3,000/mo content writer</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">98% savings</div>
                    <div className="text-sm text-gray-500">Better quality</div>
                  </div>
                </div>
              </div>

              <button className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Start Free Trial
              </button>
            </div>

            {/* PromptMarketer for Entrepreneurs */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">PromptMarketer</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">Your Marketing Team</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-bold mb-3">What You Get:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">40+ marketing tools in one app</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Social media content & automation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Email marketing campaigns</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Ad copy that converts</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">$99<span className="text-lg text-gray-500">/mo</span></div>
                    <div className="text-sm text-gray-500">vs. $5,000/mo marketing team</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">98% savings</div>
                    <div className="text-sm text-gray-500">Better results</div>
                  </div>
                </div>
              </div>

              <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Start Free Trial
              </button>
            </div>
          </div>

          {/* Growth Path */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Your Growth Path</h3>
              <p className="text-gray-600 dark:text-gray-300">Start small, add more tools as your business grows.</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">1</span>
                </div>
                <h4 className="font-bold mb-2">Start with Content</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">BlogCraft for SEO traffic</p>
                <div className="text-lg font-bold text-green-600 mt-2">$49/mo</div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h4 className="font-bold mb-2">Add Marketing</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">PromptMarketer for campaigns</p>
                <div className="text-lg font-bold text-green-600 mt-2">+$99/mo</div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h4 className="font-bold mb-2">Scale Up</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Add more tools as needed</p>
                <div className="text-lg font-bold text-green-600 mt-2">Flexible</div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">🚀</span>
                </div>
                <h4 className="font-bold mb-2">Go Premium</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">We manage everything</p>
                <div className="text-lg font-bold text-green-600 mt-2">When ready</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Real Entrepreneur Wins
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Bootstrap budgets, enterprise results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <img src="/api/placeholder/60/60" alt="Entrepreneur" className="w-15 h-15 rounded-full mr-4" />
                <div>
                  <h4 className="font-bold">Jake Thompson</h4>
                  <p className="text-sm text-gray-500">SaaS Founder</p>
                </div>
              </div>
              <blockquote className="text-lg italic mb-6">
                "I was spending $4K/month on content. Now I spend $49 and get 10x better results. My blog traffic increased 400% in 3 months."
              </blockquote>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">400%</div>
                  <p className="text-sm text-gray-500">Traffic Growth</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">$3,951</div>
                  <p className="text-sm text-gray-500">Monthly Savings</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <img src="/api/placeholder/60/60" alt="Entrepreneur" className="w-15 h-15 rounded-full mr-4" />
                <div>
                  <h4 className="font-bold">Maria Rodriguez</h4>
                  <p className="text-sm text-gray-500">E-commerce Owner</p>
                </div>
              </div>
              <blockquote className="text-lg italic mb-6">
                "I compete with Amazon sellers who have huge teams. With Xenco Labs, my product pages convert better than theirs."
              </blockquote>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">6x</div>
                  <p className="text-sm text-gray-500">Sales Growth</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">18%</div>
                  <p className="text-sm text-gray-500">Conversion Rate</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <img src="/api/placeholder/60/60" alt="Entrepreneur" className="w-15 h-15 rounded-full mr-4" />
                <div>
                  <h4 className="font-bold">David Kim</h4>
                  <p className="text-sm text-gray-500">Consultant</p>
                </div>
              </div>
              <blockquote className="text-lg italic mb-6">
                "I went from competing on price to commanding premium rates. My content quality rivals Fortune 500 companies now."
              </blockquote>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-600">3x</div>
                  <p className="text-sm text-gray-500">Higher Rates</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">25</div>
                  <p className="text-sm text-gray-500">New Clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Entrepreneur CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Punch Above Your Weight?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join 1,200+ entrepreneurs already competing with million-dollar companies using AI. 
            Start your free trial and see results in the first week.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold">$0</div>
              <p className="text-purple-200">To start</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold">7 Days</div>
              <p className="text-purple-200">To see results</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold">5x</div>
              <p className="text-purple-200">Average growth</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-8 py-4 bg-white text-purple-600 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
              <Rocket className="w-5 h-5" />
              Start Free Trial
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-xl text-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              Download Success Guide
            </button>
          </div>
          
          <p className="text-purple-200 mt-6">
            No credit card required • Cancel anytime • Start with $49/month
          </p>
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
                Level the playing field. Compete with million-dollar companies using bootstrap budgets.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">For Entrepreneurs</h4>
              <ul className="space-y-2">
                <li><a href="/entrepreneurs/getting-started" className="hover:text-white transition-colors">Getting Started</a></li>
                <li><a href="/entrepreneurs/success-stories" className="hover:text-white transition-colors">Success Stories</a></li>
                <li><a href="/entrepreneurs/pricing" className="hover:text-white transition-colors">Bootstrap Pricing</a></li>
                <li><a href="/entrepreneurs/growth-guide" className="hover:text-white transition-colors">Growth Guide</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="/entrepreneurs/free-trial" className="hover:text-white transition-colors">Free Trial</a></li>
                <li><a href="/entrepreneurs/tutorials" className="hover:text-white transition-colors">Video Tutorials</a></li>
                <li><a href="/entrepreneurs/community" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="/entrepreneurs/support" className="hover:text-white transition-colors">24/7 Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Connect</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">Entrepreneur Support:</li>
                <li><a href="mailto:entrepreneurs@xencolabs.com" className="hover:text-white transition-colors">entrepreneurs@xencolabs.com</a></li>
                <li><a href="/entrepreneurs/discord" className="hover:text-white transition-colors">Join Discord Community</a></li>
                <li><a href="/entrepreneurs/newsletter" className="hover:text-white transition-colors">Growth Newsletter</a></li>
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
              <a href="/entrepreneurs/affiliate" className="text-gray-400 hover:text-white transition-colors text-sm">Affiliate Program</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EntrepreneursLanding;