'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Route } from 'next'
import { Menu, X, ArrowRight } from 'lucide-react'

const navItems = [
  { label: 'Apps', href: '/#products' as Route },
  { label: 'Services', href: '/#services' as Route },
  { label: 'Growth', href: '/growth' as Route },
  { label: 'About', href: '/#founder' as Route },
  { label: 'Blog', href: '/blog' as Route },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-[var(--border-subtle)]">
      <div className="max-w-content mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[var(--brand-primary)] rounded-lg flex items-center justify-center">
              <span className="text-white font-display font-bold text-lg">X</span>
            </div>
            <span className="text-xl font-display font-bold text-[var(--text-primary)]">
              Xenco Labs
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[var(--text-secondary)] hover:text-[var(--brand-primary)] font-body font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden sm:inline-flex text-[var(--text-secondary)] hover:text-[var(--brand-primary)] font-body font-medium transition-colors"
            >
              Contact
            </Link>
            <Link
              href={"/#products" as Route}
              className="hidden sm:inline-flex items-center gap-2 btn-primary px-5 py-2.5 rounded-lg text-sm font-semibold"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[var(--surface-secondary)] transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-[var(--border-subtle)]">
            <div className="flex flex-col gap-4 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[var(--text-secondary)] hover:text-[var(--brand-primary)] font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="text-[var(--text-secondary)] hover:text-[var(--brand-primary)] font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href={"/#products" as Route}
                className="btn-primary px-5 py-2.5 rounded-lg text-sm font-semibold text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
