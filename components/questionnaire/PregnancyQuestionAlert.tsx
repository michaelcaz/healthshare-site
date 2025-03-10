import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface PregnancyQuestionAlertProps {
  isVisible: boolean;
}

export function PregnancyQuestionAlert({ isVisible }: PregnancyQuestionAlertProps) {
  if (!isVisible) return null;

  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mt-4 mb-6 rounded-md">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-amber-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-amber-800">Important Information About Pregnancy Coverage</h3>
          <div className="mt-2 text-sm text-amber-700">
            <p>
              Please note that <strong>no health sharing plan will cover your current pregnancy</strong> due to waiting periods. 
              All health sharing plans have waiting periods for maternity coverage (typically 6-12 months).
            </p>
            <p className="mt-2">
              We'll still provide recommendations based on your other health needs, and if you join a plan now, future pregnancies may be covered after the waiting period.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 