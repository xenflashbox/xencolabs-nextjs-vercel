import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Design tokens for the Xenco Labs brand system
export const DESIGN_TOKENS = {
  colors: {
    primary: "from-purple-600 to-blue-600",
    accent: {
      purple: "purple-600",
      blue: "blue-600",
      green: "green-600",
      orange: "orange-600",
      red: "red-600"
    }
  },
  audience: {
    enterprise: {
      primary: "from-blue-600 to-indigo-600",
      accent: "blue-600",
      background: "blue-50 dark:blue-900/20"
    },
    agencies: {
      primary: "from-purple-600 to-pink-600", 
      accent: "purple-600",
      background: "purple-50 dark:purple-900/20"
    },
    entrepreneurs: {
      primary: "from-orange-500 to-red-500",
      accent: "orange-600", 
      background: "orange-50 dark:orange-900/20"
    }
  },
  apps: {
    blogcraft: {
      primary: "from-green-600 to-emerald-600",
      accent: "green-600",
      background: "green-50 dark:green-900/20"
    },
    promptmarketer: {
      primary: "from-blue-600 to-cyan-600",
      accent: "blue-600",
      background: "blue-50 dark:blue-900/20"
    },
    resumecoach: {
      primary: "from-purple-600 to-indigo-600",
      accent: "purple-600",
      background: "purple-50 dark:purple-900/20"
    },
    landingcraft: {
      primary: "from-orange-600 to-red-600",
      accent: "orange-600",
      background: "orange-50 dark:orange-900/20"
    },
    mcpforge: {
      primary: "from-gray-700 to-gray-900",
      accent: "gray-700",
      background: "gray-50 dark:gray-800"
    }
  }
}

// Navigation configuration based on current route
export const getNavigationConfig = (pathname: string) => {
  // Enterprise audience navigation
  if (pathname.includes('/enterprise')) {
    return {
      items: [
        { label: 'Solutions', href: '/enterprise#solutions' },
        { label: 'ROI Calculator', href: '/enterprise#roi' },
        { label: 'Case Studies', href: '/enterprise#cases' }
      ],
      cta: { label: 'Schedule Demo', href: '/enterprise#demo' },
      variant: 'enterprise'
    }
  }
  
  // Agencies audience navigation
  if (pathname.includes('/agencies')) {
    return {
      items: [
        { label: 'Tools', href: '/agencies#tools' },
        { label: 'Pricing', href: '/agencies#pricing' },
        { label: 'Success Stories', href: '/agencies#success' }
      ],
      cta: { label: 'Start Trial', href: '/agencies#trial' },
      variant: 'agencies'
    }
  }
  
  // Entrepreneurs audience navigation
  if (pathname.includes('/entrepreneurs')) {
    return {
      items: [
        { label: 'Apps', href: '/entrepreneurs#apps' },
        { label: 'Pricing', href: '/entrepreneurs#pricing' },
        { label: 'Community', href: '/entrepreneurs#community' }
      ],
      cta: { label: 'Start Free', href: '/entrepreneurs#free' },
      variant: 'entrepreneurs'
    }
  }
  
  // App showcase navigation
  if (pathname.includes('/apps/')) {
    return {
      items: [
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Examples', href: '#examples' }
      ],
      cta: { label: 'Start Free Trial', href: '#trial' },
      backLink: { label: '← Xenco Labs', href: '/' },
      variant: 'app'
    }
  }
  
  // Default hub navigation
  return {
    items: [
      { label: 'Apps', href: '#apps' },
      { label: 'Enterprise', href: '/enterprise' },
      { label: 'Agencies', href: '/agencies' },
      { label: 'Entrepreneurs', href: '/entrepreneurs' },
      { label: 'Blog', href: '/blog' }
    ],
    cta: { label: 'Start Free Trial', href: '#trial' },
    variant: 'hub'
  }
}