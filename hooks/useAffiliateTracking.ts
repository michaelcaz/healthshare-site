import { useState } from 'react';
import { trackAffiliateClick } from '@/lib/utils/tracking';
import { useRouter } from 'next/navigation';

export function useAffiliateTracking() {
  const [isTracking, setIsTracking] = useState(false);
  const router = useRouter();

  const trackAndRedirect = async ({
    providerId,
    affiliateUrl,
    userId,
    questionnaireId,
    sourcePage = window.location.pathname,
  }: {
    providerId: string;
    affiliateUrl: string;
    userId?: string;
    questionnaireId?: string;
    sourcePage?: string;
  }) => {
    try {
      setIsTracking(true);
      
      // Parse UTM params from affiliate URL
      const url = new URL(affiliateUrl);
      const utmParams: Record<string, string> = {};
      url.searchParams.forEach((value, key) => {
        if (key.startsWith('utm_')) {
          utmParams[key] = value;
        }
      });

      // Track the click
      await trackAffiliateClick({
        providerId,
        userId,
        questionnaireId,
        sourcePage,
        utmParams,
      });

      // Redirect to affiliate URL
      window.location.href = affiliateUrl;
    } catch (error) {
      console.error('Error tracking affiliate click:', error);
      // Still redirect even if tracking fails
      window.location.href = affiliateUrl;
    } finally {
      setIsTracking(false);
    }
  };

  return {
    trackAndRedirect,
    isTracking,
  };
} 