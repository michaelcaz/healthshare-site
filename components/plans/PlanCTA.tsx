'use client';

import { useAffiliateTracking } from '@/hooks/useAffiliateTracking';
import { Button } from '@/components/ui/button';
import { trackPotentialConversion } from '@/lib/analytics/conversion-tracking';

interface PlanCTAProps {
  providerId: string;
  affiliateUrl: string;
  userId?: string;
  questionnaireId?: string;
  plan?: {
    monthlyPrice?: number;
  };
}

export function PlanCTA({ providerId, affiliateUrl, userId, questionnaireId, plan }: PlanCTAProps) {
  const { trackAndRedirect, isTracking } = useAffiliateTracking();

  const handleClick = () => {
    trackPotentialConversion({
      providerId,
      planId: plan?.monthlyPrice ? 'plan' : undefined,
      questionnaireId,
      monthlyPrice: plan?.monthlyPrice,
    });
    
    trackAndRedirect({
      providerId,
      affiliateUrl,
      userId,
      questionnaireId,
    });
  };

  return (
    <div>
      <Button 
        onClick={handleClick} 
        disabled={isTracking}
        className="w-full"
      >
        {isTracking ? 'Redirecting...' : 'Get This Plan'}
      </Button>
    </div>
  );
} 