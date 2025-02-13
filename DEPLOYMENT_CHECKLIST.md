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
- [x] Configure `next.config.mjs` with production settings
  - [x] Image optimization and domains
  - [x] Security headers
  - [x] TypeScript and ESLint settings
  - [x] Build optimization settings
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

## 6. Performance Optimization
- [ ] Enable Vercel Edge Functions (if needed)
- [ ] Configure caching strategies
- [ ] Verify image optimization
- [ ] Check bundle size optimization
- [ ] Test lazy loading implementation
- [ ] Verify API route performance

## 7. Error Handling and Monitoring
- [ ] Set up error boundaries
- [ ] Configure error logging
- [ ] Implement monitoring solution
- [ ] Set up alerting
- [ ] Test error recovery flows

## 8. Testing in Production-Like Environment
- [ ] Test all user flows
- [ ] Verify form submissions
- [ ] Check email integrations
- [ ] Test payment flows (if applicable)
- [ ] Verify analytics tracking
- [ ] Test search functionality
- [ ] Check mobile responsiveness

## 9. Content and SEO
- [ ] Verify Sanity.io integration
- [ ] Check meta tags
- [ ] Test social sharing cards
- [ ] Verify robots.txt
- [ ] Check sitemap.xml
- [ ] Test structured data

## 10. Post-Deployment
- [ ] Enable Vercel Analytics
- [ ] Set up deployment protection
- [ ] Configure preview deployments
- [ ] Document deployment process
- [ ] Create rollback plan
- [ ] Set up backup strategy

## 11. Performance Monitoring
- [ ] Set up Core Web Vitals monitoring
- [ ] Configure performance budgets
- [ ] Set up real user monitoring
- [ ] Test load handling
- [ ] Configure CDN settings

## 12. Final Verification
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