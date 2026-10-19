import React from 'react'
import { OpenAIPixel } from '@/components/analytics/openai-pixel'
import { Header } from './header'
import { Footer } from './footer'

interface MarketingLayoutProps {
  children: React.ReactNode
}

export function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="min-h-screen">
      <OpenAIPixel />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
