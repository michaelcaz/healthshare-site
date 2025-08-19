export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

// Global event deduplication to prevent React Strict Mode double firing
const firedEvents = new Set<string>();

// Facebook Pixel event tracking functions with deduplication
export const fbPixelEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    // Create a unique key for this event + params combination
    const eventKey = `${eventName}_${JSON.stringify(params || {})}`;
    
    // Skip if this exact event was already fired recently (within 1 second)
    if (firedEvents.has(eventKey)) {
      console.log(`[FB Pixel] Skipping duplicate event: ${eventName}`, params);
      return;
    }
    
    // Track the event
    firedEvents.add(eventKey);
    window.fbq('track', eventName, params);
    
    // Clear the event from the set after 1 second to allow legitimate re-fires
    setTimeout(() => {
      firedEvents.delete(eventKey);
    }, 1000);
  }
};

// Standard Facebook Pixel events for healthcare/plan comparison site
export const fbEvents = {
  // User engagement events
  viewContent: (params?: { content_type?: string; content_ids?: string[]; content_name?: string }) => {
    fbPixelEvent('ViewContent', params);
  },

  // Lead generation events
  lead: (params?: { content_name?: string; content_category?: string; value?: number; currency?: string }) => {
    fbPixelEvent('Lead', params);
  },

  // Form completion events
  completeRegistration: (params?: { content_name?: string; status?: string }) => {
    fbPixelEvent('CompleteRegistration', params);
  },

  // Search events
  search: (params?: { search_string?: string; content_category?: string }) => {
    fbPixelEvent('Search', params);
  },

  // Custom events for healthcare plan finder
  startQuestionnaireEvent: (params?: { questionnaire_type?: string }) => {
    fbPixelEvent('StartQuestionnaire', params);
  },

  completeQuestionnaireEvent: (params?: { questionnaire_type?: string; completion_time?: number }) => {
    fbPixelEvent('CompleteQuestionnaire', params);
  },

  viewPlanRecommendations: (params?: { plan_count?: number; user_type?: string }) => {
    fbPixelEvent('ViewPlanRecommendations', params);
  },

  clickPlanDetails: (params?: { plan_name?: string; provider?: string; monthly_cost?: number }) => {
    fbPixelEvent('ClickPlanDetails', params);
  },

  requestPlanQuote: (params?: { plan_name?: string; provider?: string; estimated_savings?: number }) => {
    fbPixelEvent('RequestPlanQuote', params);
  },

  scheduleConsultation: (params?: { consultation_type?: string; preferred_time?: string }) => {
    fbPixelEvent('ScheduleConsultation', params);
  },

  downloadGuide: (params?: { guide_name?: string; content_category?: string }) => {
    fbPixelEvent('DownloadGuide', params);
  },

  subscribeNewsletter: (params?: { subscription_source?: string }) => {
    fbPixelEvent('Subscribe', params);
  },

  // Purchase intent events
  addToWishlist: (params?: { content_ids?: string[]; content_name?: string; value?: number }) => {
    fbPixelEvent('AddToWishlist', params);
  },

  // Contact events
  contact: (params?: { contact_method?: string; content_name?: string }) => {
    fbPixelEvent('Contact', params);
  }
};

// Custom event for tracking user journey through the healthcare plan finder
export const trackHealthcarePlanJourney = (stage: string, additionalParams?: Record<string, any>) => {
  const baseParams = {
    journey_stage: stage,
    timestamp: new Date().toISOString(),
    ...additionalParams
  };

  fbPixelEvent('HealthcarePlanJourney', baseParams);
};

// Track conversion value for retargeting optimization
export const trackConversionValue = (value: number, currency: string = 'USD', eventName: string = 'Purchase') => {
  fbPixelEvent(eventName, {
    value,
    currency,
    content_type: 'healthcare_plan'
  });
};
