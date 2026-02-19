import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Star, Users, Zap, Code, Database, Rocket, Globe, BarChart3, Briefcase, DollarSign, Clock, TrendingUp, Shield, ArrowUpRight, Play, Building, Target, Award, Phone } from 'lucide-react';

const EnterpriseLanding = () => {
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
                <a href="/agencies" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors">Agencies</a>
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
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm font-medium mb-8">
              ⚠️ Enterprise Alert: Your Marketing ROI is Bleeding
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Replace Your Entire
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent block">
                Marketing Department
              </span>
              <span className="text-4xl md:text-5xl block mt-4">with AI That Actually Works</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Stop burning <span className="font-bold text-red-500">$180K+ annually</span> on underperforming marketing teams. 
              Get enterprise-level results for <span className="font-bold text-green-500">90% less cost</span> with our AI-powered solution.
            </p>
            
            {/* Enterprise Pain Points */}
            <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
                <DollarSign className="w-8 h-8 text-red-500 mb-3 mx-auto" />
                <h3 className="font-bold text-red-700 dark:text-red-300 mb-2">$180K+ Annual Cost</h3>
                <p className="text-sm text-red-600 dark:text-red-400">Marketing manager ($85K) + content writer ($45K) + designer ($50K) + tools/overhead</p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-6">
                <Clock className="w-8 h-8 text-orange-500 mb-3 mx-auto" />
                <h3 className="font-bold text-orange-700 dark:text-orange-300 mb-2">6+ Month Ramp Time</h3>
                <p className="text-sm text-orange-600 dark:text-orange-400">Hiring, onboarding, training, and waiting for team productivity to scale</p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
                <TrendingUp className="w-8 h-8 text-yellow-500 mb-3 mx-auto" />
                <h3 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">Inconsistent Results</h3>
                <p className="text-sm text-yellow-600 dark:text-yellow-400">Human limitations, sick days, turnover, and varying quality output</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl text-lg font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                Schedule Executive Demo
              </button>
              <button className="px-8 py-4 border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white rounded-xl text-lg font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                See ROI Calculator
              </button>
            </div>
            
            {/* Enterprise Social Proof */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                <span>50+ Enterprise Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-500" />
                <span>Average $140K+ Annual Savings</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span>94% Executive Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Comparison */}
      <section className="py-20 px-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The Numbers Don't Lie
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See how Xenco Labs delivers enterprise-level results at a fraction of traditional costs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Traditional Team Costs */}
            <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-8 border-2 border-red-200 dark:border-red-800">
              <h3 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-6 text-center">Traditional Marketing Team</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-red-200 dark:border-red-700">
                  <span>Marketing Manager</span>
                  <span className="font-bold text-red-600">$85,000/year</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-red-200 dark:border-red-700">
                  <span>Content Writer</span>
                  <span className="font-bold text-red-600">$45,000/year</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-red-200 dark:border-red-700">
                  <span>Designer</span>
                  <span className="font-bold text-red-600">$50,000/year</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-red-200 dark:border-red-700">
                  <span>Tools & Software</span>
                  <span className="font-bold text-red-600">$12,000/year</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-red-200 dark:border-red-700">
                  <span>Benefits & Overhead</span>
                  <span className="font-bold text-red-600">$38,000/year</span>
                </div>
                <div className="flex justify-between items-center py-4 text-xl font-bold text-red-700 dark:text-red-300 border-t-2 border-red-300 dark:border-red-600">
                  <span>Total Annual Cost</span>
                  <span>$230,000</span>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-red-600 dark:text-red-400 font-medium">Plus 6+ months to hire and train</p>
              </div>
            </div>

            {/* Xenco Labs Solution */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-8 border-2 border-green-200 dark:border-green-800">
              <h3 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-6 text-center">Xenco Labs Enterprise</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-green-200 dark:border-green-700">
                  <span>AI Content Engine (BlogCraft)</span>
                  <span className="font-bold text-green-600">$5,000/month</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-green-200 dark:border-green-700">
                  <span>AI Marketing Suite (PromptMarketer)</span>
                  <span className="font-bold text-green-600">$7,500/month</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-green-200 dark:border-green-700">
                  <span>Strategic Consulting</span>
                  <span className="font-bold text-green-600">$2,500/month</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-green-200 dark:border-green-700">
                  <span>Account Management</span>
                  <span className="font-bold text-green-600">Included</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-green-200 dark:border-green-700">
                  <span>24/7 AI Operations</span>
                  <span className="font-bold text-green-600">Included</span>
                </div>
                <div className="flex justify-between items-center py-4 text-xl font-bold text-green-700 dark:text-green-300 border-t-2 border-green-300 dark:border-green-600">
                  <span>Total Annual Cost</span>
                  <span>$180,000</span>
                </div>
              </div>
              <div className="mt-6 text-center">
                <div className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
                  Save $50,000+ Annually
                </div>
                <p className="text-green-600 dark:text-green-400 font-medium mt-2">Results start in 7 days</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Solutions */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Enterprise-Grade AI Solutions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Every app is designed to replace expensive teams while delivering superior results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* BlogCraft Enterprise */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mr-4">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">BlogCraft Enterprise</h3>
                  <p className="text-green-600 dark:text-green-400 font-medium">Replaces: Content Team ($85K/year)</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-bold mb-3">What You Get:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">50+ SEO-optimized articles per month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Keyword research and strategy</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Content calendar management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Performance analytics & optimization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Dedicated account manager</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">$5,000<span className="text-lg text-gray-500">/month</span></div>
                  <p className="text-sm text-gray-500">vs. $85,000/year for content team</p>
                </div>
              </div>

              <button className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Start Enterprise Trial
              </button>
            </div>

            {/* PromptMarketer Enterprise */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">PromptMarketer Enterprise</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">Replaces: Marketing Team ($120K/year)</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-bold mb-3">What You Get:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">40+ marketing automation tools</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Multi-channel campaign management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Social media automation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Email marketing sequences</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">ROI tracking and optimization</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">$7,500<span className="text-lg text-gray-500">/month</span></div>
                  <p className="text-sm text-gray-500">vs. $120,000/year for marketing team</p>
                </div>
              </div>

              <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Start Enterprise Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Built for Enterprise Requirements
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center">
              <Shield className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Enterprise Security</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>SOC 2 Type II Compliance</li>
                <li>GDPR & CCPA Compliant</li>
                <li>Enterprise SSO Integration</li>
                <li>Data encryption at rest and transit</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">SLA Guarantees</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>99.9% Uptime SLA</li>
                <li>24/7 Priority Support</li>
                <li>Dedicated Account Manager</li>
                <li>Custom Integration Support</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center">
              <Target className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Scalable Performance</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>Unlimited content generation</li>
                <li>Multi-brand management</li>
                <li>Advanced analytics & reporting</li>
                <li>API access for custom workflows</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Cut Marketing Costs by 90%?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join 50+ enterprise clients already saving $140K+ annually while getting better results than traditional teams.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold">7 Days</div>
              <p className="text-purple-200">To see results</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold">$140K+</div>
              <p className="text-purple-200">Average annual savings</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-8 py-4 bg-white text-purple-600 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Schedule Executive Demo
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-xl text-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              Download ROI Calculator
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
                Enterprise AI solutions that replace expensive teams and deliver superior results.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Enterprise Solutions</h4>
              <ul className="space-y-2">
                <li><a href="/enterprise/content" className="hover:text-white transition-colors">Content Automation</a></li>
                <li><a href="/enterprise/marketing" className="hover:text-white transition-colors">Marketing Automation</a></li>
                <li><a href="/enterprise/consulting" className="hover:text-white transition-colors">Strategic Consulting</a></li>
                <li><a href="/enterprise/case-studies" className="hover:text-white transition-colors">Case Studies</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="/enterprise/roi-calculator" className="hover:text-white transition-colors">ROI Calculator</a></li>
                <li><a href="/enterprise/demo" className="hover:text-white transition-colors">Executive Demo</a></li>
                <li><a href="/enterprise/security" className="hover:text-white transition-colors">Security & Compliance</a></li>
                <li><a href="/support" className="hover:text-white transition-colors">Enterprise Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">Enterprise Sales:</li>
                <li><a href="tel:+1234567890" className="hover:text-white transition-colors">(123) 456-7890</a></li>
                <li><a href="mailto:enterprise@xencolabs.com" className="hover:text-white transition-colors">enterprise@xencolabs.com</a></li>
                <li><a href="/enterprise/contact" className="hover:text-white transition-colors">Request Demo</a></li>
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
              <a href="/security" className="text-gray-400 hover:text-white transition-colors text-sm">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EnterpriseLanding;