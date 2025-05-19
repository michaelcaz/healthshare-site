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

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionnaire: QuestionnaireResponse;
  topRecommendationId: string;
}

type LogoSize = 'sm' | 'md' | 'lg' | 'xl';

// Local logo component for comparison modal only
interface ComparisonProviderLogoProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}

function ComparisonProviderLogo({ src, alt, width, height, className = '', style = {} }: ComparisonProviderLogoProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-md flex items-center justify-center overflow-hidden',
        className
      )}
      style={{ width, height }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-contain p-2"
        style={style}
        priority
        unoptimized
      />
    </div>
  );
}

// Helper to get logo path and style (copied from ProviderLogo)
function getComparisonLogoProps(providerName: string, size: LogoSize = 'md') {
  const dimensions: Record<LogoSize, { width: number; height: number }> = {
    sm: { width: 40, height: 40 },
    md: { width: 100, height: 60 },
    lg: { width: 120, height: 80 },
    xl: { width: 140, height: 90 },
  };
  const { width, height } = dimensions[size];
  const normalizedName = providerName.toLowerCase();
  let src = '/images/providers/default-provider.svg';
  if (normalizedName.includes('zion')) src = '/images/logos/zion.svg';
  else if (normalizedName.includes('sedera')) src = '/images/logos/sedera.svg';
  else if (normalizedName.includes('knew')) src = '/images/logos/knew.svg';
  else if (normalizedName.includes('crowd')) src = '/images/logos/crowd-health.svg';
  let style: React.CSSProperties = { maxWidth: '100%', maxHeight: '100%' };
  if (normalizedName.includes('crowd')) {
    const scales: Record<LogoSize, number> = { sm: 0.9, md: 0.95, lg: 1.0, xl: 1.05 };
    style = {
      maxWidth: '85%',
      maxHeight: '85%',
      transform: `scale(${scales[size]})`,
      transformOrigin: 'center',
      padding: '0px',
    };
  }
  return { src, alt: `${providerName} logo`, width, height, style };
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
        style={{
          top: 'var(--announcement-bar-height, 40px)', // Offset modal below announcement bar
          position: 'fixed',
        }}
      >
        <DialogHeader 
          className="bg-white/95 backdrop-blur border-b border-gray-100 px-4 py-3 flex flex-row items-center justify-between"
          style={{
            paddingTop: 'calc(env(safe-area-inset-top, 0px) + 0.75rem)', // 0.75rem = py-3
          }}
        >
          <DialogTitle className="text-2xl font-bold text-gray-900">Plan Comparison</DialogTitle>
        </DialogHeader>
        <div className="px-4 pt-2 pb-6">
          <p className="text-base text-gray-700 mb-4">
            Compare your selected plans side by side to find the best option for your needs.
          </p>
          <PlanComparisonTable 
            selectedPlans={mappedPlans} 
            topRecommendationId={topRecommendationId}
            renderLogo={(providerName: string, size: LogoSize = 'md') => {
              const logoProps = getComparisonLogoProps(providerName, size);
              return <ComparisonProviderLogo {...logoProps} />;
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
} 