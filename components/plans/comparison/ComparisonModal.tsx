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

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionnaire: QuestionnaireResponse;
  topRecommendationId: string;
}

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
        className={cn(
          'w-full max-w-5xl h-[90vh] max-h-[90vh] overflow-y-auto p-0 bg-white',
          'sm:rounded-2xl rounded-none border border-gray-200 shadow-2xl'
        )}
      >
        <DialogHeader className="bg-white/95 backdrop-blur border-b border-gray-100 px-4 py-3 flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl font-bold text-gray-900">Plan Comparison</DialogTitle>
        </DialogHeader>
        <div className="px-4 pt-2 pb-6">
          <p className="text-base text-gray-700 mb-4">
            Compare your selected plans side by side to find the best option for your needs.
          </p>
          <PlanComparisonTable selectedPlans={mappedPlans} topRecommendationId={topRecommendationId} />
        </div>
      </DialogContent>
    </Dialog>
  );
} 