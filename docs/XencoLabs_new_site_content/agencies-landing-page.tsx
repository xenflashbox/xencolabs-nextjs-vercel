import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Star, Users, Zap, Code, Database, Rocket, Globe, BarChart3, Briefcase, DollarSign, Clock, TrendingUp, Shield, ArrowUpRight, Play, Building, Target, Award, Phone, UserPlus, Layers, Percent, Scale } from 'lucide-react';

const AgenciesLanding = () => {
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
                <a href="/entrepreneurs" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors">Entrepreneurs</a>
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
                Start Agency Trial
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
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl text-lg font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2">
                <Rocket className="w-5 h-5" />
                Start 14-Day Agency Trial
              </button>
              <button className="px-8 py-4 border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white rounded-xl text-lg font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                See Agency Case Study
              </button>
            </div>
            
            {/* Agency Social Proof */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                <span>120+ Agencies Using Daily</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span>Average 3.2x Client Capacity</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-yellow-500" />
                <span>40%+ Margin Improvement</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agency Scaling Problem */}
      <section className="py-20 px-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The Agency Scaling Trap
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Every agency hits this wall. Here's how we break through it.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* The Problem */}
            <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-8 border-2 border-red-200 dark:border-red-800">
              <h3 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-6 text-center">Traditional Agency Model</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-700 dark:text-red-300">Win New Client</h4>
                    <p className="text-sm text-red-600 dark:text-red-400">Great! Revenue goes up.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-700 dark:text-red-300">Team Gets Overwhelmed</h4>
                    <p className="text-sm text-red-600 dark:text-red-400">Quality drops, deadlines slip.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-700 dark:text-red-300">Hire More People</h4>
                    <p className="text-sm text-red-600 dark:text-red-400">Margins shrink, overhead explodes.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-700 dark:text-red-300">Management Nightmare</h4>
                    <p className="text-sm text-red-600 dark:text-red-400">You're managing people, not growing the business.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-red-100 dark:bg-red-800 rounded-lg p-4 text-center">
                <p className="text-red-700 dark:text-red-300 font-bold">Result: Stuck at 10-20 clients max</p>
              </div>
            </div>

            {/* The Solution */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-8 border-2 border-green-200 dark:border-green-800">
              <h3 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-6 text-center">Xenco Labs Agency Model</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-700 dark:text-green-300">Win New Client</h4>
                    <p className="text-sm text-green-600 dark:text-green-400">Revenue goes up, same as before.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-700 dark:text-green-300">AI Handles Delivery</h4>
                    <p className="text-sm text-green-600 dark:text-green-400">Quality stays high, speed increases.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-700 dark:text-green-300">Scale Without Hiring</h4>
                    <p className="text-sm text-green-600 dark:text-green-400">Same team, 3x more clients.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-700 dark:text-green-300">Focus on Growth</h4>
                    <p className="text-sm text-green-600 dark:text-green-400">You sell, AI delivers, profits soar.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-green-600 text-white rounded-lg p-4 text-center">
                <p className="font-bold">Result: Scale to 100+ clients with same team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agency Solutions */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Your New Agency Superpower
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Each tool handles what used to require hiring expensive specialists.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* BlogCraft for Agencies */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mr-4">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">BlogCraft Agency</h3>
                  <p className="text-green-600 dark:text-green-400 font-medium">Manage 50+ Content Clients</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-bold mb-3">What You Can Deliver:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">20+ SEO articles per client per month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Keyword research and content strategy</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Multi-client dashboard management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">White-label reporting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Bulk content generation</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-lg font-bold text-green-600">Charge: $2,000/mo</div>
                    <div className="text-sm text-gray-500">Your Cost: $299/mo</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">$1,701</div>
                    <div className="text-sm text-gray-500">profit per client</div>
                  </div>
                </div>
              </div>

              <button className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Start Content Agency Trial
              </button>
            </div>

            {/* PromptMarketer for Agencies */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">PromptMarketer Agency</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">Full-Service Marketing</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-bold mb-3">What You Can Deliver:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Social media content & scheduling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Email marketing campaigns</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Ad copy for all platforms</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Landing page copy</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Multi-channel campaign management</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-lg font-bold text-blue-600">Charge: $3,500/mo</div>
                    <div className="text-sm text-gray-500">Your Cost: $499/mo</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">$3,001</div>
                    <div className="text-sm text-gray-500">profit per client</div>
                  </div>
                </div>
              </div>

              <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Start Marketing Agency Trial
              </button>
            </div>
          </div>

          {/* Agency Math */}
          <div className="mt-16 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-6">The Agency Math That Changes Everything</h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">10 Clients</div>
                <p className="text-gray-600 dark:text-gray-300">Content + Marketing</p>
                <div className="text-xl font-bold text-green-600 mt-2">$47,010/mo profit</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">25 Clients</div>
                <p className="text-gray-600 dark:text-gray-300">Same team size</p>
                <div className="text-xl font-bold text-green-600 mt-2">$117,525/mo profit</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">50 Clients</div>
                <p className="text-gray-600 dark:text-gray-300">Still same team</p>
                <div className="text-xl font-bold text-green-600 mt-2">$235,050/mo profit</div>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mt-6">Based on average $2,750/client revenue and $199/client Xenco Labs cost</p>
          </div>
        </div>
      </section>

      {/* Agency Features */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Built for Agency Operations
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center">
              <Layers className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Multi-Client Management</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>Unified dashboard for all clients</li>
                <li>Bulk content generation</li>
                <li>Client-specific branding</li>
                <li>Automated reporting</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">White-Label Ready</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>Remove all Xenco Labs branding</li>
                <li>Custom client portals</li>
                <li>Your logo and colors</li>
                <li>Agency-branded reports</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center">
              <Scale className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Unlimited Scaling</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>No per-client limits</li>
                <li>Team collaboration tools</li>
                <li>Role-based permissions</li>
                <li>Agency-level analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Real Agency Results
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800">
              <div className="flex items-center mb-6">
                <img src="/api/placeholder/60/60" alt="Agency owner" className="w-15 h-15 rounded-full mr-4" />
                <div>
                  <h4 className="font-bold">Sarah Martinez</h4>
                  <p className="text-sm text-gray-500">Digital Marketing Agency Owner</p>
                </div>
              </div>
              <blockquote className="text-lg italic mb-6">
                "We went from 8 clients to 35 clients in 6 months without hiring anyone. Our margins increased from 35% to 72%. This literally saved our agency."
              </blockquote>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">4.4x</div>
                  <p className="text-sm text-gray-500">Client Growth</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">72%</div>
                  <p className="text-sm text-gray-500">Profit Margin</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center mb-6">
                <img src="/api/placeholder/60/60" alt="Agency owner" className="w-15 h-15 rounded-full mr-4" />
                <div>
                  <h4 className="font-bold">Mike Chen</h4>
                  <p className="text-sm text-gray-500">Content Marketing Agency</p>
                </div>
              </div>
              <blockquote className="text-lg italic mb-6">
                "I was about to hire 3 more writers. Instead, I invested in Xenco Labs and now I'm handling 10x more content with better quality. ROI was immediate."
              </blockquote>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">10x</div>
                  <p className="text-sm text-gray-500">Content Output</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">$180K</div>
                  <p className="text-sm text-gray-500">Annual Savings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agency CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Scale Past Your Competition?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join 120+ agencies already scaling to 50+ clients without hiring. Start your 14-day trial and see results in the first week.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold">14 Days</div>
              <p className="text-purple-200">Free trial</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold">3.2x</div>
              <p className="text-purple-200">Average client growth</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold">40%+</div>
              <p className="text-purple-200">Margin improvement</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-8 py-4 bg-white text-purple-600 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
              <Rocket className="w-5 h-5" />
              Start 14-Day Agency Trial
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-xl text-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              Download Agency Case Study
            </button>
          </div>
          
          <p className="text-purple-200 mt-6">
            No credit card required • Cancel anytime • White-label ready
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
                Scale your agency to 100+ clients without hiring anyone. AI-powered delivery that actually works.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Agency Tools</h4>
              <ul className="space-y-2">
                <li><a href="/agencies/content" className="hover:text-white transition-colors">Content Management</a></li>
                <li><a href="/agencies/marketing" className="hover:text-white transition-colors">Marketing Automation</a></li>
                <li><a href="/agencies/white-label" className="hover:text-white transition-colors">White-Label Solutions</a></li>
                <li><a href="/agencies/case-studies" className="hover:text-white transition-colors">Agency Case Studies</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="/agencies/pricing" className="hover:text-white transition-colors">Agency Pricing</a></li>
                <li><a href="/agencies/trial" className="hover:text-white transition-colors">14-Day Free Trial</a></li>
                <li><a href="/agencies/training" className="hover:text-white transition-colors">Training & Onboarding</a></li>
                <li><a href="/agencies/support" className="hover:text-white transition-colors">Agency Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">Agency Sales:</li>
                <li><a href="tel:+1234567890" className="hover:text-white transition-colors">(123) 456-7890</a></li>
                <li><a href="mailto:agencies@xencolabs.com" className="hover:text-white transition-colors">agencies@xencolabs.com</a></li>
                <li><a href="/agencies/demo" className="hover:text-white transition-colors">Book Agency Demo</a></li>
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
              <a href="/agencies/partnership" className="text-gray-400 hover:text-white transition-colors text-sm">Partnership</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AgenciesLanding;