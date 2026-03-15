import React from "react";
import { CheckCircle, Code, Terminal, Server } from 'lucide-react';
import { MarketingLayout } from "@/components/layout/marketing-layout";

export default function MCPForgePage() {
  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-gray-400 rounded-full mr-2" />
            In Development
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            MCP Forge
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            Transform any API into an AI-ready MCP server. Visual builder, code generation, and deployment tools for developers.
          </p>

          <p className="text-gray-500 dark:text-gray-400">
            This product is currently in development. Check back for updates.
          </p>
        </div>
      </section>

      {/* Planned Features */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Planned Capabilities
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <Code className="w-10 h-10 text-cyan-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Visual Builder</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-400" />
                  <span>Drag-and-drop MCP server design</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-400" />
                  <span>Pre-built components</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <Terminal className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Code Generation</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-400" />
                  <span>TypeScript, Python, Node.js</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-400" />
                  <span>Auto-generated tests</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <Server className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Deployment</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-400" />
                  <span>One-click cloud deploy</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-400" />
                  <span>Export for self-hosting</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
