import React from "react";
import { ArrowRight, CheckCircle, Star, Code, Settings, Zap, Database, Server, Globe, Shield, Puzzle, Play, Terminal, Book } from 'lucide-react';
import { MarketingLayout } from "@/components/layout/marketing-layout";
import { Button } from '@/components/ui/button';

export default function MCPForgePage() {
  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-full text-sm font-medium mb-8">
                🔥 Build Powerful MCP Servers in Minutes
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Stop Building
                <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent block">
                  MCP Servers
                </span>
                <span className="text-4xl block">From Scratch</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                The fastest way to build, test, and deploy Model Context Protocol servers. 
                Visual builder, code generation, and one-click deployment for developers who value their time.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="xl" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
                  Start Building Free
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
                  <span>Free tier included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Open source friendly</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Enterprise ready</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-cyan-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <Code className="text-white w-12 h-12" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Visual MCP Builder</h3>
                <p className="text-gray-600 dark:text-gray-300">Drag, drop, deploy. No boilerplate code.</p>
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
              Trusted by developers and AI teams worldwide
            </p>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600 mb-2">500+</div>
                <p className="text-gray-600 dark:text-gray-300">MCP Servers Built</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600 mb-2">85%</div>
                <p className="text-gray-600 dark:text-gray-300">Faster Development</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600 mb-2">10min</div>
                <p className="text-gray-600 dark:text-gray-300">Average Setup Time</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600 mb-2">4.9/5</div>
                <p className="text-gray-600 dark:text-gray-300">Developer Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need to Build MCP Servers
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From visual builders to enterprise deployment, MCP Forge handles the complexity so you can focus on building amazing AI experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Visual Builder */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
              <Puzzle className="w-12 h-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">Visual Builder</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Drag and drop components to build your MCP server. No need to write boilerplate code or configure complex setups.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Pre-built components</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Real-time preview</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Custom function builder</span>
                </li>
              </ul>
            </div>

            {/* Code Generation */}
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 rounded-2xl p-8 border border-cyan-200 dark:border-cyan-800">
              <Terminal className="w-12 h-12 text-cyan-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">Smart Code Generation</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Generate production-ready TypeScript, Python, or Node.js code that follows MCP best practices and includes comprehensive testing.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-500" />
                  <span className="text-sm">Multiple language support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-500" />
                  <span className="text-sm">Automatic test generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-500" />
                  <span className="text-sm">Documentation included</span>
                </li>
              </ul>
            </div>

            {/* Deployment */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800">
              <Server className="w-12 h-12 text-green-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">One-Click Deployment</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Deploy to cloud providers instantly or export for your own infrastructure. Includes monitoring and auto-scaling.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Multi-cloud deployment</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Auto-scaling included</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Built-in monitoring</span>
                </li>
              </ul>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-gradient-to-r from-gray-50 to-cyan-50 dark:from-gray-800 dark:to-cyan-900/20 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">How MCP Forge Works</h3>
              <p className="text-gray-600 dark:text-gray-300">From idea to production MCP server in minutes</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h4 className="font-bold mb-2">Design</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Use visual builder to design your MCP server functions</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h4 className="font-bold mb-2">Generate</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">AI generates production-ready code with tests</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h4 className="font-bold mb-2">Test</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Built-in testing environment with Claude integration</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  4
                </div>
                <h4 className="font-bold mb-2">Deploy</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">One-click deployment to your preferred cloud provider</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Experience */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Built for Developer Happiness
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Every feature designed to make MCP development faster and more enjoyable
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <Book className="w-12 h-12 text-cyan-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">Complete Documentation</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Comprehensive guides, API references, and tutorials to get you building immediately.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Getting started in 5 minutes</li>
                <li>• Advanced MCP patterns</li>
                <li>• Integration examples</li>
                <li>• Best practices guide</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <Shield className="w-12 h-12 text-green-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">Security First</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Built-in security features and compliance tools for enterprise deployment.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• OAuth 2.0 / JWT authentication</li>
                <li>• Rate limiting & DDoS protection</li>
                <li>• SOC 2 Type II compliance</li>
                <li>• GDPR ready</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <Database className="w-12 h-12 text-purple-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">Rich Integrations</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Pre-built connectors for popular databases, APIs, and services.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Database connectors (SQL, NoSQL)</li>
                <li>• REST/GraphQL API wrappers</li>
                <li>• File system operations</li>
                <li>• Third-party service integrations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Developers Love MCP Forge
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join the community building the future of AI tooling
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
                "Went from idea to deployed MCP server in 20 minutes. The visual builder is incredible - no more boilerplate hell!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center font-bold text-white">
                  AS
                </div>
                <div>
                  <p className="font-semibold">Alex Stevens</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Senior AI Engineer</p>
                  <p className="text-sm text-cyan-600">5 MCP servers deployed</p>
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
                "Finally, a tool that understands how we actually want to build MCP servers. The code generation is spot-on and saves hours."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white">
                  MR
                </div>
                <div>
                  <p className="font-semibold">Maria Rodriguez</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Full Stack Developer</p>
                  <p className="text-sm text-cyan-600">Startup CTO</p>
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
                "We use MCP Forge for all our client projects. The enterprise features and security compliance make it a no-brainer."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center font-bold text-white">
                  DL
                </div>
                <div>
                  <p className="font-semibold">David Liu</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Engineering Director</p>
                  <p className="text-sm text-cyan-600">Enterprise team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pricing for Every Developer
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              From hobby projects to enterprise deployment
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Free</h3>
                <div className="text-4xl font-bold text-cyan-600 mb-2">$0<span className="text-lg text-gray-500">/month</span></div>
                <p className="text-gray-500">Perfect for learning and prototyping</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>3 MCP servers</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Visual builder access</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Code generation</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Community support</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Basic templates</span>
                </li>
              </ul>
              
              <Button variant="outline" className="w-full border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white">
                Start Free
              </Button>
            </div>

            {/* Pro */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border-2 border-cyan-600 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-cyan-600 text-white px-4 py-2 rounded-full text-sm font-bold">Most Popular</span>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Pro</h3>
                <div className="text-4xl font-bold text-cyan-600 mb-2">$29<span className="text-lg text-gray-500">/month</span></div>
                <p className="text-gray-500">For serious developers</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Unlimited MCP servers</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Advanced templates</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Cloud deployment</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Advanced integrations</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Analytics dashboard</span>
                </li>
              </ul>
              
              <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                Start Pro Trial
              </Button>
            </div>

            {/* Enterprise */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
                <div className="text-4xl font-bold text-cyan-600 mb-2">Custom</div>
                <p className="text-gray-500">For teams and organizations</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>SSO integration</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>On-premise deployment</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>SLA guarantees</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Dedicated support</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Custom training</span>
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
      <section className="py-20 px-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build Better MCP Servers?
          </h2>
          <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
            Join 500+ developers who've revolutionized their MCP development workflow with visual builders and smart automation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Button variant="secondary" size="xl">
              Start Building Free
            </Button>
            <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-cyan-600">
              Explore Documentation
            </Button>
          </div>
          
          <p className="text-cyan-200">
            Free tier • No credit card required • Open source friendly
          </p>
        </div>
      </section>
    </MarketingLayout>
  );
}
