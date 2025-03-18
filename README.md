# Healthshare Plan Finder

## Product Overview
A web application that helps individuals and families find the most suitable healthshare plan based on their specific needs and circumstances. The application guides users through a streamlined questionnaire process and provides personalized recommendations with direct referrals to healthshare providers.

## Core Features

### 1. Plan Discovery Questionnaire
- Interactive 10-question assessment accessible from homepage hero section
- Collects essential information:
  - Location (ZIP code, county)
  - Household details (income, size)
  - Individual member information (age, gender)
  - Health factors (smoking status)
- Mobile-responsive design
- Single-session completion design (no progress saving needed)

### 2. User Authentication
- Optional email and password registration
- Account creation for:
  - Saving final recommendations
  - Returning to view recommendations later
- Basic profile management

### 3. Plan Recommendation Engine
- Personalized plan matching algorithm
- Results display:
  - Primary recommended plan featured prominently
  - Secondary recommendations listed below
  - Up to 3 plans can be selected for side-by-side comparison
- Recommendation factors clearly explained
- Direct referral links to healthshare providers

### 4. Detailed Plan Information
- Expandable sections for each plan:
  - Plan benefits and features
  - Network information
  - Prescription coverage
  - Cost sharing details
  - Comparison with traditional insurance
- Side-by-side comparison tool for up to 3 plans
- Clear display of monthly costs and other fees

### 5. Referral Flow
- Direct links to healthshare provider enrollment pages
- Affiliate tracking integration
- Pre-enrollment educational content about healthshares
- Clear transition messaging to external provider sites

### 6. Information Architecture
Navigation structure:
- Home
- Blog
- About
- What's a Healthshare? (scrolls to homepage section)
- Get Free Quote (CTA)

### 7. Homepage Content Structure
- Hero section with "Find my plan" questionnaire CTA
- What is a Healthshare? section:
  - Clear, simple explanation
  - Key differences from traditional insurance
  - Benefits and considerations
  - Common misconceptions addressed
- Partner Healthshares section:
  - Individual cards for each provider
  - Trust score prominently displayed
  - Key features and benefits
  - Potential risks and drawbacks
  - Real user ratings and reviews
  - "What we love" highlights
  - "Watch out for" considerations
- Social proof section:
  - Verified customer reviews
  - Rating breakdown
  - Success stories
- Educational content sections
- FAQ section

## User Flows

### Primary User Flow
1. Land on homepage
2. Start questionnaire
3. Complete 10-question assessment
4. View primary recommendation
5. Explore additional options
6. Compare selected plans (optional)
7. Click through to provider site
8. Complete enrollment on provider platform

## Technical Requirements

### Core Stack
- Frontend: Next.js 14 with App Router
- Backend: Next.js API Routes
- Database: Supabase
  - PostgreSQL for structured data
  - Real-time capabilities
  - Built-in authentication
  - Row-level security
- CMS: Sanity.io
  - Real-time content editing
  - Rich text editor
  - Image optimization
  - Draft preview
  - SEO management

### Frontend Architecture
- Next.js features:
  - Server components for improved performance
  - Client components where needed for interactivity
  - Static site generation for content pages
  - Incremental Static Regeneration for blog posts
- TailwindCSS for styling
- Responsive design system
- Form handling with react-hook-form
- Client-side validation with zod

### Content Management
- Sanity Studio integration:
  - Custom blog post schema
  - WYSIWYG editor
  - Asset management
  - Content scheduling
  - SEO fields
  - Custom workflows
- Preview environment for content editors

### Admin Dashboard
- Protected admin routes
- Content management interface
- User management
- Review moderation
- Analytics dashboard (GA4 integration)
- Provider management:
  - Affiliate ID management
  - Basic provider information
  - Monthly report reconciliation

### Database Schema (Supabase)
- Users table
- Providers table
- Plans table
- Reviews table
- Questionnaire responses
- Affiliate tracking
- Analytics events

### Integration Requirements
- Simple affiliate tracking:
  - URL parameter based tracking
  - LocalStorage/cookie fallback
  - Basic attribution window
- Google Analytics 4
- ConvertKit for email marketing:
  - Newsletter signups
  - Automated email sequences
  - Subscriber management
  - Custom forms and landing pages
- Stripe (if needed for future monetization)

### Performance Requirements
- Page load time < 3 seconds
- Mobile optimization
- Image optimization
- Caching strategy
- CDN implementation
- Performance monitoring

### Security Implementation
- SSL/TLS encryption
- Data encryption at rest
- XSS protection
- CSRF protection
- Rate limiting
- Input sanitization
- Security headers implementation

### Testing Requirements
- Unit testing
- Integration testing
- End-to-end testing
- Performance testing
- Cross-browser testing
- Mobile device testing

### Development Operations
- Version control (Git)
- CI/CD pipeline
- Development, staging, and production environments
- Automated deployment process
- Error logging and monitoring
- Backup strategy

### Monitoring & Logging
- Error tracking system
- Performance monitoring
- User behavior analytics
- Server health monitoring
- API endpoint monitoring
- Custom event tracking

## Design Requirements
- Clean, trustworthy interface
- Clear hierarchy with primary recommendation highlighted
- Intuitive comparison interface
- Mobile-first design approach
- Clear CTAs throughout the process
- Engaging provider cards with consistent layout
- Visual trust indicators (badges, scores, etc.)
- Easy-to-scan review format
- Accessible typography and contrast

## Security Requirements
- Basic user data protection
- Secure handling of limited PII
- Secure affiliate link generation
- SSL/TLS encryption

## Analytics & Tracking
- Questionnaire completion rates
- Referral tracking
- Plan comparison metrics
- Click-through rates to providers
- Conversion tracking where possible

## Future Considerations
- Additional healthshare providers
- Enhanced comparison tools
- Provider reviews and ratings
- Cost calculator tools
- Mobile app version
- Social login options (Google, Facebook, etc.)

## Development Phases

### Phase 1: Foundation Setup

#### 1. Project Initialization
- [x] Create new Next.js 14 project with App Router
- [x] Install and configure TailwindCSS
- [x] Set up ESLint and Prettier
- [x] Create basic folder structure (app/, components/, lib/, etc.)
- [x] Set up .env files for different environments
- [x] Configure TypeScript
- [x] Set up Git repository

#### 2. Core Infrastructure
- [x] Set up Supabase project ✓ (we set up authentication and client)
- [x] Configure Supabase authentication ✓ (we created auth provider and middleware)
- [x] Install and configure Sanity.io ✓ (we installed and set up the client)
- [x] Create basic Sanity studio setup ✓ (we set up /admin route and studio)
- [x] Implement base layout component ✓ (we created BaseLayout)
- [x] Create header component ✓ (we created Header with navigation)
- [x] Create footer component ✓ (we created Footer with links)
- [x] Set up navigation structure ✓ (implemented in Header component)

#### 3. Data Structure
- [x] Design Supabase database schema
  - [x] Users table
  - [x] Providers table
  - [x] Plans table
  - [x] Questionnaire responses table
- [x] Create Sanity content models
  - [x] Blog posts
  - [x] FAQ items
  - [x] Educational content
  - [x] Provider information
- [x] Set up admin dashboard routes
- [x] Create basic admin UI components

### Phase 2: Core Features

#### 4. Questionnaire System
- [x] Create question data structure
- [x] Build question component
- [x] Implement form state management
- [x] Add form validation
- [x] Create progress indicator
  - [x] Build progress bar component
  - [x] Add step indicators (1-6)
  - [x] Show current step label
  - [x] Animate transitions
- [x] Build question navigation
- [x] Implement data collection logic
- [x] Add response storage

#### 5. Recommendation Engine
- [x] Design matching algorithm
- [x] Create scoring system
- [x] Build recommendation calculator
- [x] Design results page
  - [x] Top Recommendation (Hero Section)
    - [x] Large, prominent display of the best-matched plan
    - [x] Clear "Top Recommendation" badge and top reason badge
    - [x] Key stats highlighted (monthly cost, IUA, coverage)
    - [x] Details button
    - [x] Primary CTA button ("Learn More" or "Get This Plan")
    - [x] Quick summary of why this plan matches their needs

  - [x] Alternative Options (Grid/List)
    - [x] Show Top Recommendation alongside 2-3 alternative plans
    - [x] Ability to click into one of the other plans
    - [x] Clear comparison points with top recommendation
    - [x] Highlight unique benefits of each
    - [x] Secondary CTAs

  - [ ] Comparison Features (In Progress - View Details Modal)
    - [x] Cost breakdown (monthly vs. per-incident)
    - [ ] Coverage Timeline tab content
    - [ ] Coverage highlights section
    - [ ] Consider moving action buttons to left sidebar
    - [x] Waiting periods
    - [ ] Things included for FREE
    - [ ] Doctors section
    - [ ] Prescription section
    - [ ] Emergency care
    - [ ] Surgery and treatment
    - [ ] Pregnancy coverage details

  - [x] Trust Elements
    - [x] Trust score based on ratings
    - [x] Match percentage or score visualization
    - [x] "Why this matches you" explanations
    - [x] Provider logos and ratings
    - [x] Quick facts about each provider

#### 6. Plan Display & Comparison
- [x] Create terminology system (tooltips and explanations for healthcare terms)

### Phase 3: User Experience

#### 7. User Management
- [x] Set up authentication UI
  - [x] Login page
  - [x] Signup page
  - [x] Password reset flow
- [x] Create signup flow
  - [x] Email verification
  - [x] Welcome email
- [x] Build login flow
  - [x] Remember me option
- [ ] Implement authentication persistence and smart redirects:
  - [ ] Create auth state detection in navigation components
  - [ ] Add logic to all CTAs to check auth status
  - [ ] Direct authenticated users straight to questionnaire when clicking "Get Started"
  - [ ] Skip login page for authenticated users
  - [ ] Preserve questionnaire progress for returning users
  - [ ] Handle session expiration gracefully

#### 8. Provider Integration
- [x] Create affiliate link generator ✓
- [x] Set up tracking system ✓
- [x] Implement ConvertKit forms ✓
- [x] Configure email sequences ✓
- [x] Set up Google Analytics ✓
- [x] Create conversion tracking ✓
- [ ] Set up GA4 reporting views

### Phase 4: Content & Polish

#### 9. Content Implementation
- [ ] Build homepage sections
- [ ] Create educational content pages
- [ ] Implement FAQ system
- [ ] Set up blog infrastructure
- [ ] Create content preview system
- [ ] Implement SEO components
- [ ] Create sitemap

#### 10. Final Integration
- [ ] Run comprehensive testing
- [ ] Perform security audit
- [ ] Optimize performance
- [ ] Review compliance requirements
- [ ] Implement error tracking
- [ ] Add logging system
- [ ] Create backup procedures
- [ ] Document codebase

### Phase 5: Launch Preparation

#### 11. Pre-launch
- [ ] Complete cross-browser testing
- [ ] Verify mobile responsiveness
- [ ] Conduct load testing
- [ ] Review all content
- [ ] Check all forms and flows
- [ ] Verify tracking systems
- [ ] Test backup systems
- [ ] Create launch checklist
- [ ] Set up SendGrid SMTP for Supabase email confirmation:
  - [ ] Register with SendGrid using domain email
  - [ ] Configure domain verification
  - [ ] Create API key
  - [ ] Set up Supabase to use SendGrid SMTP
  - [ ] Re-enable email confirmation in Supabase
  - [ ] Test email verification flow
  - [ ] Test password reset flow

#### 12. Launch
- [ ] Deploy to production
- [ ] Set up monitoring
- [ ] Verify analytics
- [ ] Enable backup systems
- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Verify email systems
- [ ] Document launch procedures

## Pre-Integration Requirements
These items need real data/credentials before implementation:

### Provider Integration
- Healthshare affiliate program credentials:
  - Unity affiliate ID and enrollment URL
  - Altrua affiliate ID and enrollment URL
  - Additional provider IDs and URLs as needed
- Conversion tracking setup:
  - Provider reporting system access
  - Monthly conversion report format
  - Attribution window details
  - Conversion reconciliation process

### Environment Variables
- Production Supabase credentials:
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
- Provider affiliate IDs:
  - UNITY_AFFILIATE_ID
  - ALTRUA_AFFILIATE_ID
  - Additional provider IDs

### Marketing Integration
- ConvertKit API credentials
- Google Analytics 4 tracking ID
- Additional marketing tool credentials

### Content Requirements
- Provider logos and brand assets
- Marketing copy and disclaimers
- Legal documents and disclosures
- Privacy policy and terms of service
