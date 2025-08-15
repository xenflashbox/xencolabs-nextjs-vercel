# Product Requirements Document: Xenco Labs Complete Platform

## Introduction/Overview

Xenco Labs is a boutique AI automation and SEO agency that provides both managed services and self-service applications. The platform serves as the primary service agency website while also functioning as the central hub for an ecosystem of interconnected apps including AutoMarketer, BlogCraft, ReResume.app, and LaunchCraft.

**Problem Statement**: Businesses need comprehensive AI-powered marketing solutions but lack either the expertise to implement them or the budget for full-service agencies. Xenco Labs bridges this gap by offering both high-touch managed services for enterprise clients and self-service apps for SMBs and individuals.

**Goal**: Create a unified platform that showcases Xenco Labs' service capabilities while providing seamless access to complementary self-service applications, all connected through a shared authentication system and cross-selling opportunities.

## Goals

1. **Primary Revenue Generation**: Establish Xenco Labs as the premier destination for AI automation and SEO services, targeting $5K-$20K/month managed service contracts
2. **App Ecosystem Growth**: Drive subscriptions and free trial conversions across all connected applications
3. **Lead Generation**: Convert visitors into qualified leads through strategic lead magnets and demonstration of capabilities
4. **Cross-Selling Optimization**: Leverage shared user authentication to promote complementary services and apps
5. **Market Positioning**: Position Xenco Labs as the go-to expert for AI marketing automation and content generation
6. **Scalable Operations**: Create systems that support both high-touch enterprise services and self-service app users

## User Stories

### Enterprise/Agency Clients
- As a marketing agency owner, I want to outsource AI automation development so I can focus on client relationships while offering cutting-edge services
- As an enterprise marketing director, I want a comprehensive AI content strategy so I can reduce my team's workload while improving content quality
- As a business owner, I want custom AI automations so I can streamline my operations without hiring additional staff

### SMB/Self-Service Users
- As a small business owner, I want to access AI marketing tools so I can compete with larger companies without a big budget
- As a freelancer, I want to use professional AI tools so I can deliver better results for my clients
- As a job seeker, I want an ATS-optimized resume so I can improve my chances of getting interviews, and potentially learn about business opportunities

### Cross-Ecosystem Users
- As a BlogCraft user, I want to access marketing automation tools so I can promote my content effectively
- As an AutoMarketer user, I want content creation capabilities so I can execute my marketing strategies
- As a ReResume user interested in entrepreneurship, I want to learn about starting an AI agency so I can build my own business

## Functional Requirements

### Core Website Functionality
1. **Landing Page**: Professional service agency homepage showcasing AI automation and SEO capabilities
2. **Services Pages**: Detailed descriptions of managed services with pricing tiers (Basic $299-399, Standard $599-799, Premium $999-1299)
3. **App Showcase**: Overview pages for all ecosystem apps with individual landing pages
4. **Lead Generation**: Multiple lead magnets including "2024 AI SEO Toolkit Blueprint" and app-specific offerings
5. **Contact Forms**: Quote request forms, consultation booking, and general inquiries
6. **Blog System**: SEO-optimized blog powered by Blog Craft showcasing capabilities
7. **Case Studies**: Portfolio showcase using Wine Country Corner, Fight Club Tech, and client work

### Authentication & User Management
8. **Shared SSO**: Single sign-on across all apps using Supabase authentication
9. **User Dashboard**: Unified dashboard showing access to subscribed services and apps
10. **Cross-App Navigation**: Seamless movement between Xenco Labs and individual app interfaces
11. **Subscription Management**: Unified billing and subscription management across all services
12. **User Profiles**: Centralized user data accessible across all platforms

### AutoMarketer (Priority App)
13. **Tool Library**: 20-30 pre-built AI automation tools for marketing tasks
14. **Custom Prompts**: Interface for executing marketing-specific AI prompts
15. **Content Generation**: Blog posts, social media content, email campaigns
16. **Content Management**: Storage and organization of generated content
17. **Export Functionality**: Download content in multiple formats (PDF, DOCX, plain text)
18. **Integration Ready**: API endpoints for potential WordPress and social media integrations

### App Ecosystem Integration
19. **BlogCraft Integration**: Content creation capabilities accessible from main dashboard
20. **ReResume Access**: Resume building tools with job market data analytics
21. **LaunchCraft Integration**: App development planning tools (subdomain: plan.xencolabs.com)
22. **Data Sharing**: Cross-app data access for authorized users
23. **Upgrade Paths**: Clear progression from free trials to paid subscriptions to managed services

### Administrative Functions
24. **Admin Dashboard**: Complete client management system for both app users and service clients
25. **Service Tracking**: Project management for managed service deliverables
26. **Usage Analytics**: Monitor app usage patterns and performance metrics
27. **Client Communication**: Internal tools for managing client relationships and reporting
28. **Revenue Tracking**: Financial dashboard showing performance across all revenue streams

### Payment & Subscription System
29. **Stripe Integration**: Shared payment processing across all apps and services
30. **Tiered Pricing**: Individual app subscriptions with bundle upgrade options
31. **Enterprise Billing**: Custom quote generation and proposal system
32. **Free Trials**: Conversion tracking from trials to paid subscriptions

## Non-Goals (Out of Scope)

1. **White-Label Solutions**: Initial release will not include white-labeling capabilities for other agencies
2. **Mobile Apps**: Native mobile applications are not included in this phase
3. **Advanced Analytics**: Comprehensive business intelligence dashboards are deferred to later phases
4. **Third-Party Integrations**: External CRM, social media auto-posting, and other API integrations are future enhancements
5. **Multi-Language Support**: English-only interface for initial release
6. **Advanced Workflow Automation**: Complex multi-step automation builders are not included
7. **Real-Time Collaboration**: Live editing and collaboration features are future considerations

## Design Considerations

### Visual Design
- **Inspiration**: Modern, bright design similar to FatJoe.com with white/dark mode toggle
- **Typography**: Clean, readable fonts (Inter, Open Sans) with large headers and ample whitespace
- **Layout**: Card-based layouts for service previews with subtle scroll animations
- **Color Scheme**: Professional color palette that conveys trust and innovation
- **Responsive Design**: Mobile-first approach ensuring functionality across all devices

### User Experience
- **Navigation**: Clear distinction between service pages and app access
- **Onboarding**: Guided tours for new users accessing apps for the first time
- **Cross-Selling**: Strategic placement of related app and service recommendations
- **Lead Magnets**: Prominent placement of lead generation offers throughout the site
- **Conversion Optimization**: Clear CTAs leading to consultations, trials, and subscriptions

### App Interface Design
- **Unified Design System**: Consistent UI components across all apps while maintaining individual app identity
- **Dashboard Hierarchy**: Clear organization of available tools and services
- **Progressive Disclosure**: Advanced features revealed as users become more engaged
- **Quick Actions**: Easy access to frequently used tools and recent content

## Technical Considerations

### Architecture
- **Frontend**: React-based website and app interfaces
- **Backend**: FastAPI services for AI tool execution and data management
- **Database**: Shared Supabase database with table separation for each app
- **Authentication**: Supabase Auth for unified user management
- **Hosting**: Scalable cloud infrastructure supporting multiple subdomains

### AI Integration
- **OpenAI API**: Primary AI service for content generation and automation tools
- **Prompt Management**: Centralized prompt template system with user customization
- **Content Processing**: Efficient handling of AI-generated content with proper formatting
- **Rate Limiting**: Subscription-based usage limits and fair use policies

### Performance Requirements
- **Load Times**: Page load times under 3 seconds for all pages
- **Concurrent Users**: Support for 50+ simultaneous users across all apps
- **API Response**: AI tool execution within 30 seconds for standard requests
- **Uptime**: 99.5% availability target

### Security & Compliance
- **Data Protection**: Secure handling of user-generated content and personal information
- **Payment Security**: PCI-compliant payment processing through Stripe
- **Access Control**: Role-based permissions for different user types and subscription levels
- **Content Ownership**: Clear policies on user-generated content ownership and usage

## Success Metrics

### Revenue Metrics
- **Managed Services**: Target $50K MRR from managed service contracts within 6 months
- **App Subscriptions**: 500+ active subscribers across all apps within 3 months
- **Conversion Rates**: 
  - Lead magnet to consultation: 15%
  - Free trial to paid subscription: 25%
  - App user to managed service inquiry: 5%

### User Engagement
- **Cross-App Usage**: 30% of users access multiple apps within ecosystem
- **Content Generation**: Average 10+ AI tool executions per active user per month
- **Session Duration**: Average 8+ minutes on service pages, 15+ minutes in apps
- **Return Visits**: 60% of trial users return within 7 days

### Lead Generation
- **Organic Traffic**: 10,000+ monthly organic visitors within 6 months
- **Lead Magnets**: 1,000+ monthly lead magnet downloads
- **Consultation Bookings**: 50+ monthly consultation requests
- **Email Subscribers**: 5,000+ newsletter subscribers within 6 months

### Operational Efficiency
- **Client Onboarding**: Reduce manual onboarding time by 50% through automation
- **Content Production**: Increase content output per hour by 300% using AI tools
- **Support Tickets**: Maintain under 5% of users requiring support intervention

## Open Questions

1. **App Naming**: Final naming confirmed:
   - **AutoMarketer.app** for AI Marketing Toolkit
   - **LaunchCraft.app** for Launch Plan app

2. **Subdomain Strategy**: Confirmed subdomain structure:
   - toolkit.xencolabs.com → AutoMarketer.app
   - plan.xencolabs.com → LaunchCraft.app  
   - blog.xencolabs.com → BlogCraft.app
   - resume.xencolabs.com → ReResume.app

3. **Bundle Pricing**: Define specific pricing for cross-app bundles and upgrade paths

4. **Content Migration**: Strategy for migrating existing content and users from current development environment

5. **Launch Sequence**: Priority order for rolling out individual apps and features

6. **Partner Integration**: Timeline and requirements for Fight Club Tech partnership integration

7. **Support Structure**: Define support levels for different user types (self-service vs. managed service clients)

8. **Data Retention**: Policies for storing and managing user-generated content across apps

9. **Scaling Plan**: Resource requirements for supporting projected user growth

10. **Competitive Positioning**: Final messaging strategy against existing competitors in AI marketing space

## Implementation Priority

### Phase 1: Foundation (Weeks 1-4)
- Xenco Labs service website with core pages
- Shared authentication system
- Basic AutoMarketer with 10 core tools
- Lead generation system and forms

### Phase 2: App Integration (Weeks 5-8)
- Complete AutoMarketer (20-30 tools)
- Cross-app navigation and user dashboard
- Payment processing and subscription management
- Admin dashboard for client management

### Phase 3: Ecosystem Completion (Weeks 9-12)
- Individual app landing pages
- LaunchCraft integration
- Advanced analytics and reporting
- Case study showcase and blog system

### Phase 4: Optimization (Weeks 13-16)
- Performance optimization
- Advanced cross-selling features
- Enhanced admin capabilities
- User experience refinements based on initial feedback