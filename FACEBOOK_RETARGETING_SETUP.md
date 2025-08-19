# Facebook Retargeting Setup Guide

This guide explains how to set up Facebook retargeting capabilities on your Sharewize site.

## Overview

Facebook retargeting has been implemented with the following components:

1. **Facebook Pixel Provider** - Loads the Facebook Pixel script
2. **Event Tracking Library** - Tracks key user actions and conversions
3. **Integration with Existing Analytics** - Works alongside Google Analytics and other tracking

## Setup Steps

### 1. Get Your Facebook Pixel ID

1. Go to [Facebook Business Manager](https://business.facebook.com/)
2. Navigate to Events Manager
3. Create a new Pixel or use an existing one
4. Copy your Pixel ID (it will look like: `123456789012345`)

### 2. Add Environment Variable

Add your Facebook Pixel ID to your environment variables:

```bash
# Production
NEXT_PUBLIC_FB_PIXEL_ID=1507151933610779

# Development (optional - pixel won't load in dev mode by default)
NEXT_PUBLIC_FB_PIXEL_ID=1507151933610779
```

### 3. Verify Installation

1. Install Facebook Pixel Helper browser extension
2. Visit your site in production
3. Check that the pixel fires on page loads
4. Verify events are being tracked in Facebook Events Manager

## Tracked Events

The following events are automatically tracked:

### Standard Facebook Events

- **PageView** - Automatic on all page loads
- **ViewContent** - When users view plan details
- **Lead** - When users complete email capture or request plan quotes
- **CompleteRegistration** - When users sign up for accounts
- **Search** - When users search for plans
- **AddToWishlist** - When users show high interest in expensive plans

### Custom Healthcare Events

- **StartQuestionnaire** - When users begin the plan finder
- **CompleteQuestionnaire** - When users finish the questionnaire
- **ViewPlanRecommendations** - When users see their personalized results
- **ClickPlanDetails** - When users click on plan details
- **RequestPlanQuote** - When users click "Get This Plan" buttons
- **ScheduleConsultation** - When users book consultations
- **HealthcarePlanJourney** - Tracks user progress through the funnel

## Retargeting Audiences

You can create the following audiences in Facebook Ads Manager:

### High-Intent Audiences
- Users who completed the questionnaire
- Users who viewed plan recommendations
- Users who clicked on plan CTAs
- Users who requested quotes for expensive plans

### Re-engagement Audiences
- Users who started but didn't complete the questionnaire
- Users who viewed recommendations but didn't click any plans
- Users who visited multiple times without converting

### Lookalike Audiences
- Based on users who completed the questionnaire
- Based on users who clicked plan CTAs
- Based on users who provided email addresses

## Campaign Strategies

### 1. Abandoned Questionnaire Campaign
- Target: Users who started but didn't complete questionnaire
- Message: "Complete your personalized healthcare plan search"
- Creative: Show plan savings examples

### 2. Plan Consideration Campaign
- Target: Users who viewed recommendations but didn't click plans
- Message: "Don't miss out on 30-50% savings"
- Creative: Highlight specific plan benefits

### 3. High-Value Retargeting
- Target: Users who looked at expensive plans
- Message: "Premium healthcare coverage at affordable prices"
- Creative: Focus on value proposition and savings

### 4. Newsletter Signup Campaign
- Target: Users who engaged but didn't provide email
- Message: "Get healthcare tips and plan updates"
- Creative: Educational content about healthcare sharing

## Event Parameters

Events include relevant parameters for better targeting:

```typescript
// Example: Plan quote request
fbEvents.requestPlanQuote({
  plan_name: "Liberty HealthShare",
  provider: "liberty",
  estimated_savings: 250
});

// Example: Questionnaire completion
fbEvents.completeQuestionnaireEvent({
  questionnaire_type: 'healthcare_plan_finder',
  completion_time: 180 // seconds
});
```

## Testing and Debugging

### Facebook Pixel Helper
- Install the browser extension
- Check for pixel fires and event tracking
- Verify parameters are being passed correctly

### Facebook Events Manager
- View real-time events
- Check event quality scores
- Monitor conversion tracking

### Browser Console
In development, you can test events manually:
```javascript
// Test a custom event
window.fbq('track', 'Lead', {
  content_name: 'test_lead',
  content_category: 'healthcare'
});
```

## Privacy and Compliance

- Facebook Pixel respects user privacy settings
- Only loads in production environment
- Follows your site's privacy policy
- Compatible with cookie consent mechanisms

## Performance

- Pixel loads asynchronously after page interaction
- Minimal impact on page load times
- Events are batched for efficiency
- Includes noscript fallback for users with JavaScript disabled

## Troubleshooting

### Pixel Not Loading
- Check environment variable is set correctly
- Verify you're testing in production mode
- Check CSP headers allow Facebook domains

### Events Not Firing
- Check browser console for errors
- Verify Facebook Pixel Helper shows events
- Check Events Manager for real-time events

### Conversion Tracking Issues
- Ensure Conversions API is set up (optional but recommended)
- Check event parameters match Facebook requirements
- Verify pixel domain verification is complete

## Next Steps

1. Set up your Facebook Pixel ID in environment variables
2. Deploy to production and verify tracking
3. Create retargeting audiences in Facebook Ads Manager
4. Launch your first retargeting campaigns
5. Monitor performance and optimize based on results

For more advanced features, consider implementing:
- Facebook Conversions API for server-side tracking
- Enhanced matching for better attribution
- Custom audiences based on specific user behaviors
