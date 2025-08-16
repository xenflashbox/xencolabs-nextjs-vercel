import React from 'react'
import { Header } from './header'
import { Footer } from './footer'

interface MarketingLayoutProps {
  children: React.ReactNode
}

export function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="bg-background text-foreground min-h-screen transition-colors duration-300">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}