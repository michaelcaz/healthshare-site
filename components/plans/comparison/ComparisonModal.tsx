'use client';

import { PlanComparisonTable } from '@/components/plans/comparison/PlanComparisonTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { useSelectedPlans } from '@/components/recommendations/SelectedPlansContext';
import { QuestionnaireResponse } from '@/types/questionnaire';
import { PlanRecommendation } from '@/lib/recommendation/recommendations';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { planDetailsData } from '@/data/plan-details-data';
import { getPlanDisplayData } from '@/lib/utils/plan-display';
import { BottomCTAAction } from '@/components/ui/MobileBottomCTAAction';
import Image from 'next/image';
import React from 'react';
import { ProviderLogo } from '@/components/recommendations/ProviderLogo';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionnaire: QuestionnaireResponse;
  topRecommendationId: string;
}

type LogoSize = 'sm' | 'md' | 'lg' | 'xl';

export function ComparisonModal({ isOpen, onClose, questionnaire, topRecommendationId }: ComparisonModalProps) {
  const { selectedPlans } = useSelectedPlans();

  // Map PlanRecommendation[] to PlanData[] for the table
  const mappedPlans = selectedPlans.map((rec) => {
    const plan = rec.plan;
    const displayData = getPlanDisplayData(
      rec,
      questionnaire.age,
      questionnaire.coverage_type,
      questionnaire.iua_preference,
      questionnaire.visit_frequency
    );
    return {
      id: plan.id,
      planName: plan.planName,
      providerName: plan.providerName,
      monthlyCost: displayData.monthlyPremium,
      iua: displayData.initialUnsharedAmount,
      estAnnualCost: displayData.annualCost,
      avgReviews: '4.5', // fallback, or get from planDetailsData if available
      reviewCount: 100, // fallback, or get from planDetailsData if available
      details: (planDetailsData as any)[plan.id] || {},
    };
  });

  // Get the top plan for signup action
  const topPlanId = selectedPlans[0]?.plan?.id;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        hideDefaultClose
        className={cn(
          'w-full max-w-5xl h-[90vh] max-h-[90vh] overflow-y-auto p-0 bg-white',
          'sm:rounded-2xl rounded-none border border-gray-200 shadow-2xl',
          '[&>button[data-radix-dialog-close]]:hidden'
        )}
        style={{
          paddingTop: 'calc(var(--announcement-bar-height, 40px) + 8px)',
        }}
      >
        <DialogHeader 
          className="bg-white/95 backdrop-blur border-b border-gray-100 px-4 py-3 flex flex-row items-center justify-between"
          style={{
            paddingTop: 'calc(env(safe-area-inset-top, 0px) + 0.75rem)',
          }}
        >
          <DialogTitle className="text-2xl font-bold text-gray-900">Plan Comparison</DialogTitle>
          <DialogClose asChild>
            <button
              type="button"
              aria-label="Back"
              className="ml-2 px-3 py-2 rounded-full flex items-center gap-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
              <span className="font-medium text-gray-700 block md:hidden">Back</span>
              <span className="hidden md:block sr-only">Back</span>
            </button>
          </DialogClose>
        </DialogHeader>
        <div className="px-4 pt-2 pb-6">
          <p className="text-base text-gray-700 mb-4">
            Compare your selected plans side by side to find the best option for your needs.
          </p>
          <PlanComparisonTable 
            selectedPlans={mappedPlans} 
            topRecommendationId={topRecommendationId}
            renderLogo={(providerName: string, size: LogoSize = 'md') => (
              <ProviderLogo providerName={providerName} size={size} className="mb-1 drop-shadow-md" />
            )}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
} 