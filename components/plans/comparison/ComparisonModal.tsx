'use client';

import { PlanComparisonTable } from '@/components/plans/comparison/PlanComparisonTable';
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogClose } from '@/components/ui/dialog';
import { useSelectedPlans } from '@/components/recommendations/SelectedPlansContext';
import { QuestionnaireResponse } from '@/types/questionnaire';
import { PlanRecommendation } from '@/lib/recommendation/recommendations';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { planDetailsData } from '@/data/plan-details-data';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionnaire: QuestionnaireResponse;
}

export function ComparisonModal({ isOpen, onClose, questionnaire }: ComparisonModalProps) {
  const { selectedPlans } = useSelectedPlans();

  // Map PlanRecommendation[] to PlanData[] for the table
  const mappedPlans = selectedPlans.map((rec) => {
    const plan = rec.plan;
    // Find a representative cost (e.g., first available, or for 30-39/Member Only)
    const matrix = plan.planMatrix.find(
      m => m.ageBracket === '30-39' && m.householdType === 'Member Only'
    ) || plan.planMatrix[0];
    const costs = matrix?.costs[0] || { monthlyPremium: 0, initialUnsharedAmount: 0 };
    return {
      id: plan.id,
      planName: plan.planName,
      providerName: plan.providerName,
      monthlyCost: costs.monthlyPremium,
      iua: costs.initialUnsharedAmount,
      estAnnualCost: costs.monthlyPremium * 12,
      avgReviews: '4.5', // fallback, or get from planDetailsData if available
      reviewCount: 100, // fallback, or get from planDetailsData if available
      details: (planDetailsData as any)[plan.id] || {},
    };
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={cn(
          "w-full max-w-7xl h-[90vh] max-h-[90vh] overflow-y-auto p-0 bg-white",
          "!translate-y-[-50%] !top-[45%]",
          "sm:rounded-xl rounded-none"
        )}
      >
        {/* Back button, styled and positioned as on the old page */}
        <div className="flex items-center px-2 pt-4 pb-2 md:px-4 md:pt-8">
          <DialogClose asChild>
            <Button
              variant="outline"
              size="sm"
              className="bg-white text-primary hover:bg-primary/5 hover:text-primary-dark border-primary/30 font-medium flex items-center gap-1 shadow-sm rounded-md"
              data-testid="back-button"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="text-sm md:text-base">Back to Recommendations</span>
            </Button>
          </DialogClose>
        </div>
        {/* Title and subtitle */}
        <div className="px-2 md:px-4">
          <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">Plan Comparison</h1>
          <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-8">
            Compare your selected plans side by side to find the best option for your needs.
          </p>
        </div>
        {/* Table/content area */}
        <div className="px-0 md:px-4 pb-4 md:pb-8 overflow-x-auto">
          <PlanComparisonTable selectedPlans={mappedPlans} />
        </div>
      </DialogContent>
    </Dialog>
  );
} 