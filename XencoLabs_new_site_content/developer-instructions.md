# Xenco Labs Website - AI Developer Implementation Guide

## 🎯 **Project Overview**
Build a conversion-optimized website for Xenco Labs, an AI automation and SEO agency with an ecosystem of interconnected apps. The site serves both as a service agency hub and individual app showcase platform.

## 📁 **File Structure & Implementation Order**

### **Phase 1: Core Infrastructure (Week 1)**
```
/app/(marketing)/
├── layout.tsx                 # Shared layout with navigation
├── page.tsx                   # Main hub landing page
├── components/
│   ├── layout/
│   │   ├── Header.tsx         # Smart navigation component
│   │   ├── Footer.tsx         # Shared footer
│   │   └── Layout.tsx         # Wrapper component
│   └── ui/
│       ├── Button.tsx         # Reusable button component
│       └── Card.tsx           # Reusable card component
└── lib/
    ├── constants.ts           # Shared config and content
    └── utils.ts               # Utility functions
```

### **Phase 2: Audience Pages (Week 2)**
```
/app/(marketing)/
├── enterprise/
│   └── page.tsx               # Enterprise landing page
├── agencies/
│   └── page.tsx               # Agencies landing page
└── entrepreneurs/
    └── page.tsx               # Entrepreneurs landing page
```

### **Phase 3: App Showcase Pages (Week 3)**
```
/app/(marketing)/apps/
├── blogcraft/
│   └── page.tsx               # BlogCraft showcase
├── promptmarketer/
│   └── page.tsx               # PromptMarketer showcase
├── resumecoach/
│   └── page.tsx               # ResumeCoach showcase
├── landingcraft/
│   └── page.tsx               # LandingCraft showcase (Coming Soon)
└── mcpforge/
    └── page.tsx               # MCP Forge pre-launch
```

### **Phase 4: Supporting Pages (Week 4)**
```
/app/(marketing)/
├── about/
│   └── page.tsx               # About Xenco Labs
├── contact/
│   └── page.tsx               # Contact & support
└── blog/
    └── page.tsx               # Blog listing (basic)
```

## 🧭 **Smart Navigation Implementation**

### **Navigation Logic**
Create a smart navigation system that adapts based on the current page:

```tsx
// lib/navigation.ts
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
```

### **Header Component Structure**
```tsx
// components/layout/Header.tsx
interface HeaderProps {
  pathname: string;
}

export function Header({ pathname }: HeaderProps) {
  const navConfig = getNavigationConfig(pathname);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default dark mode
  
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      {/* Logo adapts based on page */}
      {navConfig.variant === 'app' ? <AppLogo /> : <XencoLabsLogo />}
      
      {/* Navigation items */}
      {navConfig.items.map(item => (
        <NavigationItem key={item.href} {...item} />
      ))}
      
      {/* CTA button */}
      <Button variant={navConfig.variant}>{navConfig.cta.label}</Button>
    </nav>
  );
}
```

## 🎨 **Design System Implementation**

### **Color Schemes by Audience**
```tsx
// lib/constants.ts
export const DESIGN_TOKENS = {
  enterprise: {
    primary: 'from-blue-600 to-indigo-600',
    accent: 'blue-600',
    background: 'blue-50 dark:blue-900/20'
  },
  agencies: {
    primary: 'from-purple-600 to-pink-600', 
    accent: 'purple-600',
    background: 'purple-50 dark:purple-900/20'
  },
  entrepreneurs: {
    primary: 'from-orange-500 to-red-500',
    accent: 'orange-600', 
    background: 'orange-50 dark:orange-900/20'
  },
  apps: {
    blogcraft: {
      primary: 'from-green-600 to-emerald-600',
      accent: 'green-600'
    },
    promptmarketer: {
      primary: 'from-blue-600 to-cyan-600',
      accent: 'blue-600'
    },
    // ... other apps
  }
}
```

### **Dark Mode by Default**
All pages should default to dark mode as requested:
```tsx
// Set dark mode as default state
const [isDarkMode, setIsDarkMode] = useState(true);
```

## 📱 **Responsive Design Requirements**

### **Breakpoints**
- Mobile: 320px - 768px
- Tablet: 768px - 1024px  
- Desktop: 1024px+

### **Mobile-First Approach**
- All layouts should be mobile-first
- Text sizes should scale appropriately
- Navigation should collapse to hamburger menu on mobile
- CTAs should be easily tappable (44px minimum)

## 🔗 **URL Structure & SEO**

### **URL Patterns**
```
xencolabs.com/                    # Hub landing
xencolabs.com/enterprise          # Enterprise audience
xencolabs.com/agencies           # Agencies audience  
xencolabs.com/entrepreneurs      # Entrepreneurs audience
xencolabs.com/apps/blogcraft     # BlogCraft showcase
xencolabs.com/apps/promptmarketer # PromptMarketer showcase
xencolabs.com/apps/resumecoach   # ResumeCoach showcase
xencolabs.com/apps/landingcraft  # LandingCraft showcase
xencolabs.com/apps/mcpforge      # MCP Forge pre-launch
xencolabs.com/about              # About page
xencolabs.com/contact            # Contact page
```

### **SEO Meta Tags**
Each page needs unique meta tags:
```tsx
// Example for enterprise page
export const metadata = {
  title: 'Enterprise AI Solutions | Replace Marketing Teams | Xenco Labs',
  description: 'Replace your $180K marketing team with AI automation. Enterprise-grade solutions that deliver better results for 90% less cost.',
  keywords: 'enterprise AI, marketing automation, business AI solutions',
  canonical: 'https://xencolabs.com/enterprise'
}
```

## 🎯 **A/B Testing Implementation**

### **Testing Framework**
Use the provided A/B testing system with these test variations:

**Hero Headlines to Test:**
1. "Stop Losing to Companies With Better AI"
2. "Your Competitors Just Replaced Their $180K Marketing Team with $3K/Month AI"  
3. "While You're Hiring, Smart Businesses Are Scaling 10x Faster with AI"
4. "The AI Revolution Happened. Are You Still Paying for Human Teams?"

**Implementation:**
```tsx
// Use the A/B testing hook
const { variant } = useABTest('hero_headline');
const content = AB_TEST_CONTENT.hero_headline[variant];

return <h1>{content.headline}</h1>
```

## 📊 **Analytics & Tracking**

### **Conversion Tracking**
Track these key events:
- Page views by audience type
- CTA clicks (Start Trial, Schedule Demo, etc.)
- Form submissions
- Cross-page navigation patterns

### **Implementation**
```tsx
// Track conversions
const handleCTAClick = (ctaType: string, audience: string) => {
  analytics.track('CTA_Clicked', {
    cta_type: ctaType,
    audience_type: audience,
    page: pathname
  });
}
```

## 🚀 **Performance Requirements**

### **Core Web Vitals Targets**
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms  
- **CLS (Cumulative Layout Shift)**: < 0.1

### **Optimization Strategies**
- Use Next.js Image component for all images
- Implement code splitting by route
- Lazy load below-the-fold content
- Preload critical fonts and assets

## 🔧 **Technical Stack**

### **Required Dependencies**
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0", 
    "tailwindcss": "^3.4.0",
    "lucide-react": "^0.263.1",
    "@supabase/supabase-js": "^2.0.0"
  }
}
```

### **Folder Structure**
Follow Next.js 14 App Router conventions:
- Use `(marketing)` route group for public pages
- Keep components in `/components` directory
- Store utilities in `/lib` directory
- Use TypeScript for all files

## ✅ **Quality Assurance**

### **Testing Checklist**
- [ ] All pages render correctly on mobile/tablet/desktop
- [ ] Dark mode toggle works on all pages
- [ ] Navigation adapts correctly based on page
- [ ] All CTAs link to appropriate destinations
- [ ] Forms validate properly
- [ ] Images load with proper alt text
- [ ] Page speed meets requirements
- [ ] SEO meta tags are unique per page

### **Browser Support**
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)  
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## 📋 **Launch Checklist**

### **Pre-Launch**
- [ ] All pages implemented and tested
- [ ] SEO meta tags configured
- [ ] Analytics tracking implemented
- [ ] A/B tests configured
- [ ] Performance optimized
- [ ] Mobile responsive verified

### **Post-Launch**
- [ ] Monitor Core Web Vitals
- [ ] Track conversion rates
- [ ] Analyze A/B test results
- [ ] Gather user feedback
- [ ] Plan optimization iterations

## 🆘 **Support & Resources**

### **Documentation**
- Next.js 14 App Router: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Lucide Icons: https://lucide.dev

### **Questions & Support**
For implementation questions:
1. Check this documentation first
2. Refer to Next.js official docs
3. Ask specific questions with code examples
4. Include browser/device details for bugs

---

**Goal**: Create a high-converting, fast-loading website that effectively communicates Xenco Labs' value proposition to each target audience and drives trial signups and demo requests.

**Success Metrics**: 
- Page load speed < 2.5s
- Mobile responsiveness score 100%
- Conversion rate > 3% across all audiences
- A/B test statistical significance within 2 weeks