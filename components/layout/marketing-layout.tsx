import React from 'react'
import { Header } from './header'
import { Footer } from './footer'

interface MarketingLayoutProps {
  children: React.ReactNode
}

export function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen transition-colors duration-300">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}