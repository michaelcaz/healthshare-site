'use client';

import { PlansLoader } from '../../components/questionnaire';

export default function ResultsLoading() {
  // Total number of plans available - this should match the value in results/page.tsx
  const TOTAL_AVAILABLE_PLANS = 22;
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <PlansLoader 
          totalPlans={TOTAL_AVAILABLE_PLANS}
          // No onComplete needed here as Next.js will handle the transition
        />
      </div>
    </div>
  );
} 