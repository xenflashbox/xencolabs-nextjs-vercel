# Tasks: Xenco Labs Complete Platform

## Relevant Files

- `src/pages/Home.jsx` - Main landing page showcasing Xenco Labs services and value proposition
- `src/pages/Home.test.jsx` - Unit tests for Home component
- `src/pages/Services.jsx` - Detailed services page with pricing tiers and package descriptions
- `src/pages/Services.test.jsx` - Unit tests for Services component
- `src/pages/About.jsx` - About page highlighting founder expertise and company background
- `src/pages/About.test.jsx` - Unit tests for About component
- `src/pages/Contact.jsx` - Contact forms for quotes, consultations, and general inquiries
- `src/pages/Contact.test.jsx` - Unit tests for Contact component
- `src/pages/Blog.jsx` - Blog listing and individual post pages
- `src/pages/Blog.test.jsx` - Unit tests for Blog component
- `src/components/auth/LoginForm.jsx` - Unified login component for all apps
- `src/components/auth/LoginForm.test.jsx` - Unit tests for LoginForm
- `src/components/auth/SignupForm.jsx` - Registration form with user profile fields
- `src/components/auth/SignupForm.test.jsx` - Unit tests for SignupForm
- `src/hooks/useAuth.js` - Custom hook managing authentication state across apps
- `src/hooks/useAuth.test.js` - Unit tests for useAuth hook
- `src/pages/Dashboard.jsx` - Unified user dashboard showing available apps and services
- `src/pages/Dashboard.test.jsx` - Unit tests for Dashboard component
- `src/pages/automarketer/ToolsList.jsx` - AutoMarketer tools library interface
- `src/pages/automarketer/ToolsList.test.jsx` - Unit tests for ToolsList
- `src/pages/automarketer/ToolExecution.jsx` - Individual tool execution interface
- `src/pages/automarketer/ToolExecution.test.jsx` - Unit tests for ToolExecution
- `src/components/tools/PromptForm.jsx` - Dynamic form component for AI tool inputs
- `src/components/tools/PromptForm.test.jsx` - Unit tests for PromptForm
- `src/components/tools/ResultDisplay.jsx` - Component for displaying AI-generated results
- `src/components/tools/ResultDisplay.test.jsx` - Unit tests for ResultDisplay
- `src/components/navigation/AppSwitcher.jsx` - Navigation component for switching between apps
- `src/components/navigation/AppSwitcher.test.jsx` - Unit tests for AppSwitcher
- `src/components/subscription/SubscriptionManager.jsx` - Subscription management interface
- `src/components/subscription/SubscriptionManager.test.jsx` - Unit tests for SubscriptionManager
- `src/pages/admin/AdminDashboard.jsx` - Administrative dashboard for client management
- `src/pages/admin/AdminDashboard.test.jsx` - Unit tests for AdminDashboard
- `src/pages/admin/ClientManagement.jsx` - Client management interface for service and app users
- `src/pages/admin/ClientManagement.test.jsx` - Unit tests for ClientManagement
- `api/routes/auth.py` - Authentication API endpoints
- `api/routes/auth.test.py` - Unit tests for auth routes
- `api/routes/tools.py` - AutoMarketer tool execution API endpoints
- `api/routes/tools.test.py` - Unit tests for tools routes
- `api/routes/users.py` - User management API endpoints
- `api/routes/users.test.py` - Unit tests for users routes
- `api/routes/subscriptions.py` - Subscription and payment API endpoints
- `api/routes/subscriptions.test.py` - Unit tests for subscriptions routes
- `api/services/ai_service.py` - OpenAI integration service for tool execution
- `api/services/ai_service.test.py` - Unit tests for AI service
- `api/services/email_service.py` - Email service for lead magnets and notifications
- `api/services/email_service.test.py` - Unit tests for email service
- `database/migrations/001_create_users_tables.sql` - Initial user and profile table setup
- `database/migrations/002_create_tools_tables.sql` - AutoMarketer tools and content tables
- `database/migrations/003_create_subscription_tables.sql` - Subscription and payment tables
- `database/migrations/004_create_admin_tables.sql` - Administrative and client management tables
- `lib/utils/validation.js` - Form validation utilities
- `lib/utils/validation.test.js` - Unit tests for validation utilities
- `lib/utils/formatting.js` - Content formatting and export utilities
- `lib/utils/formatting.test.js` - Unit tests for formatting utilities
- `config/supabase.js` - Supabase client configuration
- `config/stripe.js` - Stripe payment integration configuration

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.
- API tests use pytest framework: `pytest api/routes/` to run all API tests.
- Database migrations should be run in order using Supabase CLI or admin interface.

## Tasks

- [ ] 1.0 Core Website & Service Pages Development
  - [ ] 1.1 Create responsive landing page with hero section, service overview, and lead magnets
  - [ ] 1.2 Build comprehensive services page with three pricing tiers (Basic $299-399, Standard $599-799, Premium $999-1299)
  - [ ] 1.3 Develop about page highlighting founder's 24+ years experience and company expertise
  - [ ] 1.4 Implement contact page with multiple form types (quote requests, consultation booking, general inquiries)
  - [ ] 1.5 Create app showcase section with individual landing pages for each ecosystem app
  - [ ] 1.6 Build SEO-optimized blog system powered by BlogCraft with case study showcase
  - [ ] 1.7 Implement responsive design with mobile-first approach and dark/light mode toggle
  - [ ] 1.8 Add subtle scroll animations and modern UI elements following FatJoe.com design inspiration
  - [ ] 1.9 Configure proper SEO meta tags, structured data, and sitemap generation
  - [ ] 1.10 Set up Google Analytics and conversion tracking for lead generation

- [ ] 2.0 Shared Authentication & User Management System
  - [ ] 2.1 Configure Supabase authentication with email/password and social login options
  - [ ] 2.2 Create extended user profiles table with company, role, and subscription information
  - [ ] 2.3 Implement unified login/signup forms with proper validation and error handling
  - [ ] 2.4 Build password reset and email verification workflows
  - [ ] 2.5 Create user dashboard showing access to subscribed apps and services
  - [ ] 2.6 Implement role-based access control for different user types (admin, client, app user)
  - [ ] 2.7 Build cross-app navigation system with seamless app switching
  - [ ] 2.8 Set up session management and automatic token refresh
  - [ ] 2.9 Implement user profile management with company and preference settings
  - [ ] 2.10 Create audit logging for security and compliance tracking

- [ ] 3.0 AutoMarketer App Development (Priority)
  - [ ] 3.1 Design and implement tool library interface showing 20-30 available marketing tools
  - [ ] 3.2 Create dynamic prompt execution forms based on tool schema definitions
  - [ ] 3.3 Build AI service integration with OpenAI API for prompt processing
  - [ ] 3.4 Implement content generation tools (blog posts, social media, email campaigns)
  - [ ] 3.5 Create content management system for storing and organizing generated materials
  - [ ] 3.6 Build export functionality supporting PDF, DOCX, and plain text formats
  - [ ] 3.7 Implement tool categorization and search functionality
  - [ ] 3.8 Create usage tracking and quota management for subscription tiers
  - [ ] 3.9 Build result history and version management for generated content
  - [ ] 3.10 Implement sharing and collaboration features for team accounts
  - [ ] 3.11 Create tool execution queue system for handling concurrent requests
  - [ ] 3.12 Build performance monitoring and error handling for AI tool execution

- [ ] 4.0 App Ecosystem Integration & Cross-Selling
  - [ ] 4.1 Implement unified dashboard showing all available apps (AutoMarketer, BlogCraft, ReResume, LaunchCraft)
  - [ ] 4.2 Create cross-app data sharing system for authorized users
  - [ ] 4.3 Build app-to-app navigation with seamless transitions
  - [ ] 4.4 Implement cross-selling recommendations based on user behavior and subscriptions
  - [ ] 4.5 Create upgrade path notifications from app usage to managed services
  - [ ] 4.6 Build unified notification system across all apps
  - [ ] 4.7 Implement shared content library accessible from multiple apps
  - [ ] 4.8 Create app usage analytics and recommendation engine
  - [ ] 4.9 Build subdomain routing (toolkit.xencolabs.com, plan.xencolabs.com, etc.)
  - [ ] 4.10 Implement single sign-on experience across all subdomains

- [ ] 5.0 Administrative Dashboard & Client Management
  - [ ] 5.1 Create comprehensive admin dashboard with client overview and key metrics
  - [ ] 5.2 Build client management interface for both app users and managed service clients
  - [ ] 5.3 Implement service delivery tracking and project management tools
  - [ ] 5.4 Create usage analytics dashboard showing app performance and user engagement
  - [ ] 5.5 Build automated reporting system for client deliverables and progress
  - [ ] 5.6 Implement client communication tools and internal notes system
  - [ ] 5.7 Create revenue tracking dashboard across all services and apps
  - [ ] 5.8 Build user support ticket system and resolution tracking
  - [ ] 5.9 Implement data export and backup systems for client information
  - [ ] 5.10 Create performance monitoring alerts for app uptime and AI service availability

- [ ] 6.0 Payment Processing & Subscription Management
  - [ ] 6.1 Integrate Stripe payment processing with webhook handling
  - [ ] 6.2 Create subscription plan management with tiered pricing structure
  - [ ] 6.3 Implement free trial system with conversion tracking
  - [ ] 6.4 Build billing dashboard for users to manage subscriptions and payment methods
  - [ ] 6.5 Create invoice generation and automated billing cycle management
  - [ ] 6.6 Implement subscription upgrade/downgrade workflows with prorations
  - [ ] 6.7 Build enterprise quote generation system for custom managed services
  - [ ] 6.8 Create payment failure handling and dunning management
  - [ ] 6.9 Implement usage-based billing for high-volume tool execution
  - [ ] 6.10 Build revenue analytics and subscription metrics dashboard

- [ ] 7.0 Lead Generation & Marketing Systems
  - [ ] 7.1 Create lead magnet delivery system with "2024 AI SEO Toolkit Blueprint" and other resources
  - [ ] 7.2 Implement email capture forms with proper validation and spam protection
  - [ ] 7.3 Build automated email sequences for lead nurturing and onboarding
  - [ ] 7.4 Create consultation booking system with calendar integration
  - [ ] 7.5 Implement A/B testing framework for landing pages and conversion optimization
  - [ ] 7.6 Build case study showcase featuring Wine Country Corner and Fight Club Tech
  - [ ] 7.7 Create testimonial and review management system
  - [ ] 7.8 Implement referral tracking and partner program management
  - [ ] 7.9 Build social proof elements (user counts, success metrics, etc.)
  - [ ] 7.10 Create content marketing automation for blog promotion and social sharing