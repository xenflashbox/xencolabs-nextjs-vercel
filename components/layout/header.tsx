'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getNavigationConfig } from '@/lib/utils'

export function Header() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const navConfig = getNavigationConfig(pathname)

  useEffect(() => {
    // Set dark mode as default and apply to document
    const root = window.document.documentElement
    root.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">X</span>
              </div>
              <span className="text-2xl font-bold gradient-text">
                Xenco Labs
              </span>
            </Link>

            {/* Back link for app pages */}
            {navConfig.backLink && (
              <Link 
                href={navConfig.backLink.href as any}
                className="text-gray-600 dark:text-gray-300 hover:text-[hsl(var(--primary))] font-medium transition-colors"
              >
                {navConfig.backLink.label}
              </Link>
            )}

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navConfig.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href as any}
                  className="text-gray-600 dark:text-gray-300 hover:text-[hsl(var(--primary))] font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* CTA Button */}
            <Button 
              variant={navConfig.variant as any}
              size="default"
              className="hidden sm:inline-flex"
            >
              {navConfig.cta.label}
            </Button>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4 pt-4">
              {navConfig.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href as any}
                  className="text-gray-600 dark:text-gray-300 hover:text-[hsl(var(--primary))] font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button 
                variant={navConfig.variant as any}
                size="default"
                className="self-start"
              >
                {navConfig.cta.label}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}