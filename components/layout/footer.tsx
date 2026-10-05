import React from 'react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="section-purple py-16 px-6">
      <div className="max-w-content mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div>
            <Link href="/" className="inline-flex mb-4" aria-label="Xenco Labs home">
              <img
                src="/brand/xencolabs-on-dark.svg"
                alt="Xenco Labs"
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              We build the tools and operate the systems behind search, content, AI visibility, and digital growth.
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
                <a href="https://rexresume.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors text-sm">
                  RexResume
                </a>
              </li>
              <li>
                <a href="https://imagecrafter.app" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors text-sm">
                  ImageCrafter
                </a>
              </li>
              <li>
                <a href="https://scorecraft.io" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors text-sm">
                  ScoreCraft
                </a>
              </li>
              <li>
                <a href="https://mcpforge.org" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors text-sm">
                  MCP Forge
                </a>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm tracking-wide uppercase">Services</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/services/managed-search-content" className="text-white/70 hover:text-white transition-colors text-sm">
                  Managed Search &amp; Content
                </Link>
              </li>
              <li>
                <Link href="/websites" className="text-white/70 hover:text-white transition-colors text-sm">
                  Websites &amp; Landing Pages
                </Link>
              </li>
              <li>
                <Link href="/growth" className="text-white/70 hover:text-white transition-colors text-sm">
                  Growth Strategy
                </Link>
              </li>
              <li>
                <Link href="/advisory" className="text-white/70 hover:text-white transition-colors text-sm">
                  Infrastructure Advisory
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/70 hover:text-white transition-colors text-sm">
                  About Us
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
