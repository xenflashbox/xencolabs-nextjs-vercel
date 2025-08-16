import React from 'react';
import { ArrowRight, CheckCircle, Star, Users, Zap, Code, Database, Rocket, Globe, BarChart3, Briefcase, DollarSign, Clock, TrendingUp, Shield, ArrowUpRight, Play, Building, Target, Award, Phone } from 'lucide-react';
import { MarketingLayout } from '@/components/layout/marketing-layout';
import { Button } from '@/components/ui/button';

export default function EnterprisePage() {
  return (
    <MarketingLayout>
      {/* Hero Section - Enterprise Problem Focus */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-8">
              🏢 For Enterprise Leaders
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Replace Your
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
                $2M Marketing Team
              </span>
              with AI
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              While your competitors hire 15-person marketing teams and wait 8 months for results, 
              <span className="font-bold text-blue-600 dark:text-blue-400"> Fortune 500 executives</span> are using our AI suite to achieve 10x output at 1/20th the cost.
            </p>
            
            {/* Enterprise Pain Points */}
            <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
                <div className="text-red-500 text-2xl mb-2">💰</div>
                <h3 className="font-bold text-red-700 dark:text-red-300 mb-2">$150K-2M/year</h3>
                <p className="text-sm text-red-600 dark:text-red-400">Average cost of enterprise marketing teams with inconsistent ROI</p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-6">
                <div className="text-orange-500 text-2xl mb-2">⏰</div>
                <h3 className="font-bold text-orange-700 dark:text-orange-300 mb-2">6-12 months</h3>
                <p className="text-sm text-orange-600 dark:text-orange-400">To hire, onboard, and see results from new marketing talent</p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
                <div className="text-yellow-500 text-2xl mb-2">⚠️</div>
                <h3 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">60% failure</h3>
                <p className="text-sm text-yellow-600 dark:text-yellow-400">Rate of enterprise marketing initiatives that don't meet targets</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Button variant="enterprise" size="xl" className="flex items-center gap-2">
                Schedule Executive Demo
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="xl" className="flex items-center gap-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                <Play className="w-5 h-5" />
                Watch ROI Calculator
              </Button>
            </div>
            
            {/* Enterprise Social Proof */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                <span>450+ Enterprise Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span>297% Average ROI in Year 1</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>SOC2 & GDPR Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Solution Stack */}
      <section id="solutions" className="py-20 px-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Enterprise AI Marketing Suite
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto">
            Fully managed AI solutions that replace entire departments while maintaining enterprise-grade security and compliance.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Enterprise BlogCraft */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mr-4">
                  <Code className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Enterprise BlogCraft</h3>
                  <p className="text-green-600 dark:text-green-400 font-medium">Replaces: Content Team (8-15 people)</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-left">
                <span className="font-bold">Enterprise Features:</span> Multi-brand content management, compliance workflows, approval chains, and custom AI training on your brand voice.
                <br/><br/>
                <span className="font-bold">Results:</span> 100+ high-quality articles monthly across all brands with guaranteed compliance.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <span className="font-semibold">Fully Managed:</span> $15K-50K/mo
                  <br />
                  <span className="font-semibold">Replaces:</span> $120K-400K annual salaries
                </div>
                <Button variant="app" size="sm">
                  Learn More
                </Button>
              </div>
            </div>

            {/* Enterprise PromptMarketer */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mr-4">
                  <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Enterprise PromptMarketer</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">Replaces: Marketing Ops Team (12-20 people)</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-left">
                <span className="font-bold">Enterprise Features:</span> Advanced attribution modeling, multi-channel campaign orchestration, and real-time performance optimization.
                <br/><br/>
                <span className="font-bold">Results:</span> 40% increase in qualified leads with 60% reduction in cost per acquisition.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <span className="font-semibold">Fully Managed:</span> $25K-75K/mo
                  <br />
                  <span className="font-semibold">Replaces:</span> $200K-600K annual salaries
                </div>
                <Button variant="app" size="sm">
                  Learn More
                </Button>
              </div>
            </div>

            {/* Custom AI Development */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mr-4">
                  <Database className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Custom AI Solutions</h3>
                  <p className="text-purple-600 dark:text-purple-400 font-medium">Replaces: AI/ML Team (6-12 people)</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-left">
                <span className="font-bold">What we build:</span> Custom AI agents for your specific enterprise workflows, integrated with your existing systems and data.
                <br/><br/>
                <span className="font-bold">Results:</span> 75% reduction in manual processes with enterprise-grade security.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <span className="font-semibold">Custom Projects:</span> $50K-200K
                  <br />
                  <span className="font-semibold">Replaces:</span> $150K-400K development costs
                </div>
                <Button variant="app" size="sm">
                  Schedule Consultation
                </Button>
              </div>
            </div>

            {/* Strategic Consulting */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">AI Strategy Consulting</h3>
                  <p className="text-orange-600 dark:text-orange-400 font-medium">Replaces: Strategy Consultants (McKinsey, BCG)</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-left">
                <span className="font-bold">What we deliver:</span> Complete AI transformation roadmap, change management, and executive training programs.
                <br/><br/>
                <span className="font-bold">Results:</span> Clear 18-month plan to achieve 50%+ operational efficiency gains.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <span className="font-semibold">Strategic Engagement:</span> $100K-500K
                  <br />
                  <span className="font-semibold">Replaces:</span> $2M+ consulting fees
                </div>
                <Button variant="app" size="sm">
                  Schedule Strategy Call
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section id="roi" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Calculate Your ROI
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See exactly how much you'll save by replacing traditional teams with our AI solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-red-700 dark:text-red-300">Traditional Approach</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Marketing Director</span>
                  <span className="font-bold">$150K/year</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Content Team (5 people)</span>
                  <span className="font-bold">$400K/year</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Marketing Ops (3 people)</span>
                  <span className="font-bold">$300K/year</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Benefits & Overhead (40%)</span>
                  <span className="font-bold">$340K/year</span>
                </div>
                <div className="border-t border-red-200 dark:border-red-800 pt-4">
                  <div className="flex justify-between items-center text-xl font-bold text-red-700 dark:text-red-300">
                    <span>Total Annual Cost</span>
                    <span>$1.19M</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-green-700 dark:text-green-300">Xenco Labs AI Suite</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Enterprise BlogCraft</span>
                  <span className="font-bold">$180K/year</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Enterprise PromptMarketer</span>
                  <span className="font-bold">$300K/year</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Strategic Consulting</span>
                  <span className="font-bold">$100K/year</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Implementation & Training</span>
                  <span className="font-bold">$50K/year</span>
                </div>
                <div className="border-t border-green-200 dark:border-green-800 pt-4">
                  <div className="flex justify-between items-center text-xl font-bold text-green-700 dark:text-green-300">
                    <span>Total Annual Cost</span>
                    <span>$630K</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold mb-4">Annual Savings: $560,000</h3>
              <p className="text-xl text-green-100 mb-6">
                Plus 3x faster execution and 10x more consistent output
              </p>
              <Button variant="secondary" size="xl">
                Get Custom ROI Analysis
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="cases" className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Enterprise Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See how industry leaders are using our AI suite to transform their operations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Case Study 1 */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mr-4">
                  <Building className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Fortune 500 Tech Company</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">Software & Cloud Services</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                "We replaced our 12-person content team with Xenco Labs' Enterprise BlogCraft. Now we produce 5x more content at 80% lower cost, with better SEO results."
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">500%</div>
                  <div className="text-sm text-gray-500">Content Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">80%</div>
                  <div className="text-sm text-gray-500">Cost Reduction</div>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Award className="w-4 h-4 mr-2" />
                <span>Results in 6 months</span>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mr-4">
                  <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Global Financial Services</h3>
                  <p className="text-purple-600 dark:text-purple-400 font-medium">Banking & Investment</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                "PromptMarketer's enterprise suite helped us achieve a 300% increase in qualified leads while reducing our marketing spend by 40%."
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">300%</div>
                  <div className="text-sm text-gray-500">Lead Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">40%</div>
                  <div className="text-sm text-gray-500">Spend Reduction</div>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Award className="w-4 h-4 mr-2" />
                <span>Results in 4 months</span>
              </div>
            </div>

            {/* Case Study 3 */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center mr-4">
                  <Rocket className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Healthcare Conglomerate</h3>
                  <p className="text-orange-600 dark:text-orange-400 font-medium">Medical Devices & Services</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                "Our custom AI solution from Xenco Labs automated 75% of our regulatory compliance documentation, saving 20+ hours per week."
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">75%</div>
                  <div className="text-sm text-gray-500">Process Automation</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">20h</div>
                  <div className="text-sm text-gray-500">Weekly Savings</div>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Award className="w-4 h-4 mr-2" />
                <span>Results in 8 months</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Enterprise Implementation Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our proven methodology ensures smooth deployment with minimal disruption to your operations.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Discovery & Planning</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Deep dive into your current processes, systems, and goals. Create custom implementation roadmap.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Pilot Program</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Start with a controlled pilot to demonstrate value and refine the approach before full deployment.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Full Deployment</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Roll out across all departments with comprehensive training and change management support.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">4</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Optimization & Scale</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Continuous monitoring, optimization, and expansion to maximize ROI and performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section id="demo" className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Enterprise?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Schedule a private demo with our enterprise team and see how Fortune 500 companies are achieving 297% ROI with our AI suite.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button variant="secondary" size="xl" className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Schedule Executive Demo
            </Button>
            <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-blue-600">
              Download Enterprise Brief
            </Button>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-blue-200 mb-4">
              Trusted by 450+ enterprise clients worldwide
            </p>
            <div className="flex justify-center items-center gap-8 text-blue-200">
              <span>SOC2 Compliant</span>
              <span>•</span>
              <span>GDPR Ready</span>
              <span>•</span>
              <span>24/7 Enterprise Support</span>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}