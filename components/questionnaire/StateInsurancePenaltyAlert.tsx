import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { getStateName, PenaltyState } from '@/lib/utils/zip-to-state';

interface StateInsurancePenaltyAlertProps {
  isVisible: boolean;
  state: PenaltyState;
}

// State-specific penalty information
const PENALTY_MESSAGES: Record<PenaltyState, string> = {
  'MA': 'Massachusetts requires health insurance (healthshares are not insurance). If you go without it, you\'ll pay up to 50% of the cost of the lowest-priced ConnectorCare plan you qualify for—potentially hundreds of dollars per year.',
  'CA': 'California requires health insurance (healthshares are not insurance). If you go without it, you\'ll pay the higher of 2.5% of your household income or a flat fee of $900 per adult and $450 per child.',
  'NJ': 'New Jersey requires health insurance (healthshares are not insurance). If you go without it, you\'ll pay the higher of 2.5% of your household income or a flat fee of $695 per adult and $347.50 per child.',
  'RI': 'Rhode Island requires health coverage (healthshares are not insurance). If you go without it, you\'ll pay the higher of 2.5% of your household income or a flat fee of $695 per adult and $347.50 per child.',
  'DC': 'Washington, D.C. requires health coverage (healthshares are not insurance). If you go without it, you\'ll pay the higher of 2.5% of your household income or $795 per adult and $397.50 per child, up to a family maximum of $2,385.'
};

export function StateInsurancePenaltyAlert({ isVisible, state }: StateInsurancePenaltyAlertProps) {
  if (!isVisible) return null;

  const phoneNumber = "(737) 237-1055";
  const calendlyLink = "https://calendly.com/michaelcaz/30min";

  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mt-4 mb-6 rounded-md">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-amber-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-amber-800">
            Important Information About State Insurance Requirements
          </h3>
          <div className="mt-2 text-sm text-amber-700">
            <p className="mb-4">
              {PENALTY_MESSAGES[state]}
            </p>
            <p className="mb-4 font-medium">
              Good news: We have health sharing options that can help you avoid these penalties while potentially saving you money compared to traditional insurance.
            </p>
            <div className="space-y-3">
              <p className="font-medium text-amber-800">Questions about your options?</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${phoneNumber.replace(/[^0-9]/g, '')}`}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-amber-300 rounded-md text-sm font-medium text-amber-800 bg-amber-100 hover:bg-amber-200 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Call {phoneNumber}
                </a>
                <a
                  href={calendlyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-amber-600 rounded-md text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Schedule a consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
