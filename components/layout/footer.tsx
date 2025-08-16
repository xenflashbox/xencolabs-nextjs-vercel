import React from 'react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
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
          
          {/* Apps Column */}
          <div>
            <h4 className="font-semibold text-white mb-4">Apps</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/apps/blogcraft" className="hover:text-white transition-colors">
                  BlogCraft
                </Link>
              </li>
              <li>
                <Link href="/apps/promptmarketer" className="hover:text-white transition-colors">
                  PromptMarketer
                </Link>
              </li>
              <li>
                <Link href="/apps/resumecoach" className="hover:text-white transition-colors">
                  ResumeCoach
                </Link>
              </li>
              <li>
                <Link href="/apps/landingcraft" className="hover:text-white transition-colors">
                  LandingCraft <span className="text-xs text-orange-400">(Soon)</span>
                </Link>
              </li>
              <li>
                <Link href="/apps/mcpforge" className="hover:text-white transition-colors">
                  MCP Forge <span className="text-xs text-orange-400">(Soon)</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services Column */}
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/enterprise" className="hover:text-white transition-colors">
                  Enterprise
                </Link>
              </li>
              <li>
                <Link href="/agencies" className="hover:text-white transition-colors">
                  Agencies
                </Link>
              </li>
              <li>
                <Link href="/entrepreneurs" className="hover:text-white transition-colors">
                  Entrepreneurs
                </Link>
              </li>
              <li>
                <Link href="/consulting" className="hover:text-white transition-colors">
                  Consulting
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources Column */}
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-white transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Row */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Xenco Labs. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
              Terms
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}