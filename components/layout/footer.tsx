import React from 'react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="section-purple py-16 px-6">
      <div className="max-w-content mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">X</span>
              </div>
              <span className="text-xl font-display font-bold text-white">Xenco Labs</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Building AI-powered tools that scale businesses without scaling teams.
            </p>
          </div>

          {/* Apps Column */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm tracking-wide uppercase">Apps</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="https://blogcraft.app" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors text-sm">
                  BlogCraft
                </a>
              </li>
              <li>
                <a href="https://resumecoach.me" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors text-sm">
                  ResumeCoach
                </a>
              </li>
              <li>
                <a href="https://imagecrafter.app" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors text-sm">
                  ImageCrafter
                </a>
              </li>
              <li>
                <span className="text-white/40 text-sm">
                  MCP Forge <span className="text-xs text-white/30">(Coming Soon)</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm tracking-wide uppercase">Services</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="https://blogcraft.app/managed" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors text-sm">
                  Managed Content
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-white transition-colors text-sm">
                  Consulting
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm tracking-wide uppercase">Connect</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="https://www.upwork.com/freelancers/~01fd29e6c782080051" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors text-sm">
                  Upwork
                </a>
              </li>
              <li>
                <a href="https://github.com/xenflashbox" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors text-sm">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/company/xencolabs" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors text-sm">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} Xenco Labs. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-white/50 hover:text-white/80 transition-colors text-sm">
              Privacy
            </Link>
            <Link href="/terms" className="text-white/50 hover:text-white/80 transition-colors text-sm">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
