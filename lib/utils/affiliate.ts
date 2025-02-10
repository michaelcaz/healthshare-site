export function generateAffiliateLink(provider: AffiliateProvider, customParams?: Record<string, string>): string {
  const baseUrl = new URL(provider.baseUrl);
  
  // Add affiliate ID
  baseUrl.searchParams.set('aid', provider.affiliateId);
  
  // Add UTM parameters
  baseUrl.searchParams.set('utm_source', provider.utmParams.source);
  baseUrl.searchParams.set('utm_medium', provider.utmParams.medium);
  baseUrl.searchParams.set('utm_campaign', provider.utmParams.campaign);
  
  // Add any custom parameters
  if (customParams) {
    Object.entries(customParams).forEach(([key, value]) => {
      baseUrl.searchParams.set(key, value);
    });
  }
  
  return baseUrl.toString();
} 