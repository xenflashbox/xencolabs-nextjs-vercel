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
  // App showcase navigation
  if (pathname.includes('/apps/')) {
    return {
      items: [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' }
      ],
      cta: { label: 'All Apps', href: '/#products' },
      backLink: { label: '← Xenco Labs', href: '/' },
      variant: 'app'
    }
  }

  // Default navigation
  return {
    items: [
      { label: 'Apps', href: '/#products' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' }
    ],
    cta: { label: 'Explore Apps', href: '/#products' },
    variant: 'hub'
  }
}