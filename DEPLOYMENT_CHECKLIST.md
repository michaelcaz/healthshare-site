# Healthshare Site Deployment Checklist

## 1. Environment Variables Setup
- [ ] Create production environment variables in Vercel project settings:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - [ ] `NEXT_PUBLIC_SANITY_DATASET`
  - [ ] `CONVERTKIT_API_KEY`
  - [ ] `CONVERTKIT_WELCOME_SEQUENCE_ID`
- [ ] Verify all environment variables are using production values
- [ ] Remove any development-only environment variables

## 2. Build Configuration
- [ ] Configure `next.config.mjs` with production settings
  - [ ] Image optimization and domains
  - [ ] Security headers
  - [ ] TypeScript and ESLint settings
  - [ ] Build optimization settings
- [ ] Test production build locally:
  ```bash
  npm run build
  npm run start
  ```
- [ ] Verify no TypeScript or ESLint errors in production build

## 3. Vercel Project Setup
- [ ] Create new Vercel project
- [ ] Connect GitHub repository
- [ ] Configure build settings:
  - [ ] Build Command: `next build`
  - [ ] Output Directory: `.next`
  - [ ] Install Command: `npm install`
  - [ ] Node.js Version: 18.x (or latest LTS)
- [ ] Set up automatic deployments for main branch

## 4. Domain and SSL Configuration
- [ ] Configure custom domain (if applicable)
- [ ] Verify SSL certificate
- [ ] Set up domain redirects (if needed)
- [ ] Configure DNS settings

## 5. Security Implementation
- [ ] Verify security headers are working
- [ ] Test CORS configuration
- [ ] Check authentication flows in production
- [ ] Verify Supabase RLS policies
- [ ] Test rate limiting
- [ ] Implement CSRF protection

## 6. CSS & Styling Consistency

### 6.1 Diagnosing Production vs Development Differences
- [ ] Create non-invasive CSS diagnostic component
  ```tsx
  // components/ui/css-diagnostic.tsx
  'use client';
  
  export function CssDiagnostic() {
    if (typeof window === 'undefined') return null;
    if (!process.env.NEXT_PUBLIC_DEBUG_CSS === 'true') return null;
    
    // Log computed styles without changing layout
    console.log('CSS Diagnostic', {
      environment: process.env.NODE_ENV,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      // Add specific component measurements here
    });
    
    return null; // No visible output
  }
  ```
- [ ] Add environment attribute marker to HTML element
  ```tsx
  // app/layout.tsx
  <html lang="en" data-env={process.env.NODE_ENV}>
  ```
- [ ] Compare computed styles between environments
- [ ] Document specific differences (layout, spacing, colors, fonts)

### 6.2 Production-Only CSS Fixes
- [ ] Create production-specific override file (won't affect development)
  ```bash
  touch public/production-overrides.css
  ```
- [ ] Add production-only stylesheet link in layout
  ```tsx
  // app/layout.tsx - only loads in production
  {process.env.NODE_ENV === 'production' && (
    <link rel="stylesheet" href="/production-overrides.css" />
  )}
  ```
- [ ] Use highly specific selectors in production override file
  ```css
  /* Example of targeting specific components only in production */
  html[data-env="production"] .container {
    width: 100% !important; 
    padding: 1rem !important;
  }
  
  html[data-env="production"] .card-component {
    margin: 1rem !important;
  }
  ```
- [ ] Test each fix individually before adding more

### 6.3 CSS Fix Safety Guidelines
- [ ] ✅ DO: Use production-only stylesheets with high specificity
- [ ] ✅ DO: Target specific components rather than global styles
- [ ] ✅ DO: Test each change incrementally
- [ ] ✅ DO: Document every fix and its effects
- [ ] ❌ DON'T: Modify existing CSS variables or definitions
- [ ] ❌ DON'T: Change Tailwind configuration
- [ ] ❌ DON'T: Rearrange stylesheet import order
- [ ] ❌ DON'T: Add global styles that apply in development
- [ ] ❌ DON'T: Change font loading configuration

## 7. Performance Optimization
- [ ] Enable Vercel Edge Functions (if needed)
- [ ] Configure caching strategies
- [ ] Verify image optimization
- [ ] Check bundle size optimization
- [ ] Test lazy loading implementation
- [ ] Verify API route performance

## 8. Error Handling and Monitoring
- [ ] Set up error boundaries
- [ ] Configure error logging
- [ ] Implement monitoring solution
- [ ] Set up alerting
- [ ] Test error recovery flows

## 9. Testing in Production-Like Environment
- [ ] Test all user flows
- [ ] Verify form submissions
- [ ] Check email integrations
- [ ] Test payment flows (if applicable)
- [ ] Verify analytics tracking
- [ ] Test search functionality
- [ ] Check mobile responsiveness

## 10. Content and SEO
- [ ] Verify Sanity.io integration
- [ ] Check meta tags
- [ ] Test social sharing cards
- [ ] Verify robots.txt
- [ ] Check sitemap.xml
- [ ] Test structured data

## 11. Post-Deployment
- [ ] Enable Vercel Analytics
- [ ] Set up deployment protection
- [ ] Configure preview deployments
- [ ] Document deployment process
- [ ] Create rollback plan
- [ ] Set up backup strategy

## 12. Performance Monitoring
- [ ] Set up Core Web Vitals monitoring
- [ ] Configure performance budgets
- [ ] Set up real user monitoring
- [ ] Test load handling
- [ ] Configure CDN settings

## 13. Final Verification
- [ ] Run lighthouse audit
- [ ] Check accessibility compliance
- [ ] Verify backup systems
- [ ] Test disaster recovery
- [ ] Document known issues
- [ ] Create support runbook

## Notes
- Keep this checklist updated as new requirements are identified
- Mark items as complete using [x] syntax
- Add comments or links to relevant documentation as needed
- Track any issues or blockers in the project management system

# CSS Production vs Development Debugging Guide

This guide focuses on fixing styling differences between development and production environments without altering the working development environment.

## Core Principles

1. **Production-only, non-invasive fixes**
   - Fix production to match development, never modify working development code
   - Apply changes exclusively in the production environment
   - Make minimal, targeted changes with high CSS specificity

2. **Targeted, incremental approach**
   - First diagnose without modifying code
   - Focus on one issue at a time
   - Test thoroughly after each change

3. **Safe, environment-specific solutions**
   - Use environment detection to isolate fixes to production
   - Keep CSS variables and definitions unchanged
   - Maintain existing stylesheet ordering and structure

## Preferred Debugging Methods

1. **Production-specific CSS override file**
   ```tsx
   // In app/layout.tsx - safely load production overrides
   {process.env.NODE_ENV === 'production' && (
     <link rel="stylesheet" href="/production-overrides.css" />
   )}
   ```

2. **Environment attribute marker**
   ```tsx
   // In app/layout.tsx
   <html lang="en" data-env={process.env.NODE_ENV}>
   ```

3. **Highly specific overrides (production only)**
   ```css
   /* /public/production-overrides.css */
   html[data-env="production"] .specific-component {
     property: value !important;
   }
   ```

4. **Conditional DOM attributes**
   ```tsx
   // In components with styling differences
   <div className={className} data-env={process.env.NODE_ENV}>
     {children}
   </div>
   ```

5. **Non-invasive diagnostic component**
   ```tsx
   // components/ui/css-diagnostic.tsx
   'use client';
   
   export function CssDiagnostic() {
     if (typeof window === 'undefined') return null;
     if (!process.env.NEXT_PUBLIC_DEBUG_CSS) return null;
     
     // Log diagnostic information without affecting styles
     console.log('Diagnostic info');
     
     return null; // No visible UI, just logging
   }
   ```

## What's Known to Work

1. ✅ Adding production-specific stylesheets
2. ✅ Using environment attributes for targeted CSS
3. ✅ Highly specific CSS selectors with `!important`
4. ✅ Diagnostic tools that don't modify the DOM
5. ✅ Environment-conditional code in layout.tsx

## What to Avoid (These Broke Development)

1. ❌ Modifying existing CSS variable definitions
2. ❌ Changing Tailwind configuration
3. ❌ Rearranging stylesheet import order
4. ❌ Adding new global styles that apply in development
5. ❌ Changing core layout components
6. ❌ Modifying font loading configuration that affects development
7. ❌ Using client-side JavaScript to fix CSS issues in development

## Implementation Process

1. **Diagnose First**
   - Create a non-invasive diagnostic component
   - Compare computed styles between environments
   - Document specific CSS property differences

2. **Create Production-Only CSS**
   - Place in `/public/production-overrides.css`
   - Use highly specific selectors targeting exactly what's different
   - Only load in production environment

3. **Test Incrementally**
   - Apply one fix at a time
   - Verify it doesn't affect development
   - Confirm it improves production

4. **Document Changes**
   - Note which issues were fixed by which techniques
   - Record any components that still need attention 