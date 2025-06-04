import React from 'react';
import { cn } from '@/lib/utils';

interface DisclaimersProps {
  className?: string;
  variant?: 'default' | 'compact' | 'footer';
}

export function Disclaimers({ className, variant = 'default' }: DisclaimersProps) {
  // Different disclaimer content based on the variant
  const getDisclaimerContent = () => {
    switch (variant) {
      case 'compact':
        return (
          <p className="text-xs text-gray-500">
            Healthcare sharing ministries are not insurance and do not guarantee payment of medical expenses. Results may vary. See membership details for limitations, eligibility requirements, and specific coverage information.
          </p>
        );
      case 'footer':
        return (
          <div className="space-y-2 text-xs text-gray-400">
          </div>
        );
      default:
        return (
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              <strong>Not Insurance:</strong> Healthcare sharing ministries are NOT insurance companies, and their plans are NOT insurance policies. Healthcare sharing ministry plans are not governed by state insurance regulations, and membership is not guaranteed.
            </p>
            <p>
              <strong>No Guarantee of Payment:</strong> Participating in a healthcare sharing ministry does not guarantee that your medical bills will be paid by the ministry or its members. Unlike insurance, there is no contract that legally obligates the healthcare sharing ministry to pay your medical bills.
            </p>
            <p>
              <strong>Membership Requirements:</strong> Most healthcare sharing ministries require adherence to certain religious or ethical beliefs and lifestyle requirements. Please review each plan's membership guidelines carefully before enrolling.
            </p>
            <p>
              <strong>Pre-Existing Conditions:</strong> Healthcare sharing ministries generally have limitations on sharing for pre-existing conditions. Please carefully review each ministry's guidelines regarding coverage for any pre-existing conditions.
            </p>
            <p className="font-medium">
              We recommend that you thoroughly read all plan guidelines before making a decision. The information provided on this site is for informational purposes only and is not intended as legal, financial, or medical advice.
            </p>
          </div>
        );
    }
  };

  return (
    <div className={cn(
      'bg-gray-50 border border-gray-200 rounded-lg p-4',
      variant === 'compact' && 'py-2',
      variant === 'footer' && 'bg-transparent border-0 p-0',
      className
    )}>
      {getDisclaimerContent()}
    </div>
  );
} 