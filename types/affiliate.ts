interface AffiliateProvider {
  id: string;
  name: string;
  baseUrl: string;
  affiliateId: string;
  utmParams: {
    source: string;
    medium: string;
    campaign: string;
  };
}

interface AffiliateLink {
  providerId: string;
  fullUrl: string;
  trackingId: string;
  createdAt: Date;
} 