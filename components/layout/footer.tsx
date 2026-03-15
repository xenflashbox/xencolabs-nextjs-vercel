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
              AI product studio building tools that ship to production.
            </p>
          </div>

          {/* Apps Column */}
          <div>
            <h4 className="font-semibold text-white mb-4">Apps</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://blogcraft.app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  BlogCraft
                </a>
              </li>
              <li>
                <a href="https://resumecoach.me" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  ResumeCoach
                </a>
              </li>
              <li>
                <a href="https://imagecrafter.app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  ImageCrafter
                </a>
              </li>
              <li>
                <span className="text-gray-500">
                  MCP Forge <span className="text-xs text-gray-600">(Coming Soon)</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
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
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Xenco Labs. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
