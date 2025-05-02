'use client';

import { PlanComparisonTable } from '@/components/plans/comparison/PlanComparisonTable';
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogClose } from '@/components/ui/dialog';
import { useSelectedPlans } from '@/components/recommendations/SelectedPlansContext';
import { QuestionnaireResponse } from '@/types/questionnaire';
import { PlanRecommendation } from '@/lib/recommendation/recommendations';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionnaire: QuestionnaireResponse;
}

export function ComparisonModal({ isOpen, onClose, questionnaire }: ComparisonModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={cn(
          "max-w-7xl w-[90vw] max-h-[80vh] overflow-y-auto",
          "!translate-y-[-50%] !top-[45%]" // Finding the perfect middle ground
        )}
      >
        {/* Custom back button that replaces the X */}
        <div className="absolute right-4 top-4 z-50">
          <DialogClose asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white text-primary hover:bg-primary/5 hover:text-primary-dark border-primary/30 font-medium flex items-center gap-1 shadow-sm rounded-md px-4 py-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Recommendations
            </Button>
          </DialogClose>
        </div>
        
        <DialogHeader className="flex flex-col items-center justify-center mb-2 pt-10">
          <DialogTitle className="text-2xl font-bold text-gray-900">Plan Comparison</DialogTitle>
          <p className="text-lg text-gray-700 mt-2">
            Compare your selected plans side by side to find the best option for your needs.
          </p>
        </DialogHeader>
        <div className="p-2">
          <PlanComparisonTable questionnaire={questionnaire} />
        </div>
      </DialogContent>
    </Dialog>
  );
} 