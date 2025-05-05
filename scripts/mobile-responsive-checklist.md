# Mobile Responsiveness Checklist

## Quick Pre-Launch Validation

Use this checklist for a final verification of mobile responsiveness before launch.

### Testing Setup (15 minutes)

- [ ] Install Puppeteer: `npm install --save-dev puppeteer`
- [ ] Run automated screenshot test: `node scripts/mobile-responsive-check.js`
- [ ] Review screenshot results in `mobile-test-screenshots` directory
- [ ] Add ResponsiveDebugger to your layout for interactive testing (development only)

### Key Pages to Test (30-45 minutes)

Test these critical pages across mobile (375px), tablet (768px), and desktop (1440px):

- [ ] Homepage
- [ ] Questionnaire flow (all steps)
- [ ] Results/recommendations page
- [ ] Plan comparison view
- [ ] Login/registration pages
- [ ] About page
- [ ] Blog post page

### Critical Elements Checklist (15-30 minutes)

#### Navigation
- [ ] Mobile menu opens/closes correctly
- [ ] All nav links are accessible on mobile
- [ ] Header collapses appropriately on scroll
- [ ] Login/signup buttons are accessible

#### Content & Layout
- [ ] No horizontal scrolling on any page
- [ ] No text overflow or truncation
- [ ] Images scale proportionally
- [ ] Content maintains proper hierarchy
- [ ] Adequate spacing between tap targets
- [ ] Buttons have minimum tap size (44x44px)

#### Forms & Interactions
- [ ] Form inputs are properly sized for mobile
- [ ] Error messages display correctly
- [ ] Dropdowns and selects work on touch
- [ ] All interactive elements are easily tappable
- [ ] Scrollable areas work with touch gestures

#### Questionnaire Flow
- [ ] Progress indicator displays correctly
- [ ] Form navigation (next/back) works on mobile
- [ ] Complex inputs (like sliders) work on touch
- [ ] Validation errors show correctly on mobile

#### Plan Comparison
- [ ] Plans display properly on mobile
- [ ] Comparison data is readable at small sizes
- [ ] Detail expansion/collapse works on mobile

### Quick Fix Techniques (15-30 minutes)

For any issues found, try these quick fixes:

1. **Text overflow**: Add `overflow-wrap: break-word` or `word-break: break-word`
   ```css
   .fix-text-overflow {
     overflow-wrap: break-word;
   }
   ```

2. **Horizontal scrolling**: Check for fixed widths and replace with fluid units
   ```css
   /* Replace this */
   .container { width: 400px; }
   
   /* With this */
   .container { max-width: 100%; }
   ```

3. **Touch target size**: Ensure all buttons/links have adequate size
   ```css
   .button, .link {
     min-height: 44px;
     min-width: 44px;
     padding: 12px 16px;
   }
   ```

4. **Stacking columns**: Use Flexbox column direction for mobile
   ```css
   @media (max-width: 768px) {
     .row {
       flex-direction: column;
     }
   }
   ```

5. **Table overflow**: Make tables scrollable on mobile
   ```css
   .table-container {
     overflow-x: auto;
     -webkit-overflow-scrolling: touch;
   }
   ```

### Browser Testing (15-30 minutes)

Test on real devices or emulators:

- [ ] Safari on iOS (latest)
- [ ] Chrome on Android (latest)
- [ ] Chrome on iOS
- [ ] Samsung Internet (if targeting Android)

### Final Validation (15 minutes)

- [ ] Run Lighthouse mobile test on key pages
- [ ] Validate with Chrome DevTools responsive mode
- [ ] Test actual user flows (questionnaire completion, etc.)

## Time Estimate

Complete mobile responsiveness check: 2-3 hours total

## Post-Launch Monitoring

- Monitor Google Analytics for mobile bounce rates
- Check mobile conversion rates for form completion
- Review any user feedback specific to mobile experience 