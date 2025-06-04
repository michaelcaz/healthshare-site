import React from 'react';
import { AlertTriangle, Info, Clock } from 'lucide-react';

interface PregnancyAlertProps {
  isPregnant: boolean;
}

export function PregnancyAlert({ isPregnant }: PregnancyAlertProps) {
  if (!isPregnant) return null;

  return (
    <div className="bg-amber-50 border border-amber-200 p-6 mb-8 rounded-lg shadow-sm">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-6 w-6 text-amber-500" aria-hidden="true" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-amber-800">Important Pregnancy Information</h3>
          <div className="mt-3 text-amber-700 space-y-4">
            <p className="flex items-center">
              <span className="font-medium">
                Since you indicated that you are currently pregnant, please note that <strong>no health sharing plan will cover your current pregnancy</strong> due to waiting periods.
              </span>
            </p>
            
            <div className="bg-white bg-opacity-50 p-4 rounded-md border border-amber-200 mt-2">
              <h4 className="font-medium text-amber-800 flex items-center mb-2">
                <Clock className="h-4 w-4 mr-2" />
                Typical Waiting Periods for Maternity Coverage
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Most plans require 6-12 months of membership before maternity expenses are eligible</li>
                <li>Conception must occur <em>after</em> the waiting period ends</li>
                <li>Eligible needs related to future pregnancies will be covered if you join a plan now and wait the required period before getting pregnant.</li>
              </ul>
            </div>
            
            <p>
              The recommendations below are based on your other health needs and preferences. Each plan has different waiting periods for maternity coverage, so please review the membership details carefully.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 