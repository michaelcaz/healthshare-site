'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '../ui/checkbox'
import { useSelectedPlans } from './SelectedPlansContext'
import { type PlanRecommendation } from './types'
import { CheckCircle, Info, ChevronRight, Sparkles, Star, StarHalf, Scale } from 'lucide-react'
import { Tooltip } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { PlanRecommendation as PlanRecommendationType } from '@/lib/recommendation/recommendations'
import { QuestionnaireResponse } from '@/types/questionnaire'
import { planDetailsData } from '@/data/plan-details-data'
import { getPlanCost } from '@/lib/utils/plan-costs'
import { calculateAnnualCost } from '@/utils/plan-utils'
import { ProviderLogo } from './ProviderLogo'

interface PlanComparisonGridProps {
  topPlan: PlanRecommendationType
  alternativePlans: PlanRecommendationType[]
  onPlanSelect: (planId: string) => void
  questionnaire?: QuestionnaireResponse
}

// Star Rating component
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="flex items-center">
      {/* Full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-primary text-primary" style={{ fill: 'currentColor' }} />
      ))}
      
      {/* Half star */}
      {hasHalfStar && <StarHalf className="w-4 h-4 fill-primary text-primary" style={{ fill: 'currentColor' }} />}
      
      {/* Empty stars */}
      {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <Star key={i + fullStars + (hasHalfStar ? 1 : 0)} className="w-4 h-4 text-primary" />
      ))}
    </div>
  );
};

export function PlanComparisonGrid({ 
  topPlan, 
  alternativePlans,
  onPlanSelect,
  questionnaire
}: PlanComparisonGridProps) {
  const { selectedPlans, togglePlanSelection, canAddMore } = useSelectedPlans()

  const isPlanSelected = (planId: string) => 
    selectedPlans.some(p => p.plan.id === planId)

  const renderCompareButton = (plan: PlanRecommendationType) => {
    const isSelected = isPlanSelected(plan.plan.id)
    const isDisabled = !isSelected && !canAddMore
    return (
      <div className="flex flex-col items-center mt-4 w-full">
        <Tooltip content="Tap to compare plans side by side." side="top" className="text-xs">
          <button
            type="button"
            aria-pressed={isSelected}
            disabled={isDisabled}
            onClick={() => {
              if (isSelected || canAddMore) {
                togglePlanSelection(plan)
              }
            }}
            className={`w-full flex items-center justify-center rounded-lg border-2 transition font-medium py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary/50
              ${isSelected ? 'border-primary bg-primary/10 text-primary' : isDisabled ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed' : 'border-gray-300 bg-white text-gray-700 hover:border-primary hover:bg-primary/5'}
            `}
          >
            <Scale className="mr-2 h-5 w-5" />
            {isSelected ? 'Added to Compare' : 'Compare'}
            {isSelected && <CheckCircle className="ml-2 h-4 w-4 text-primary" />}
          </button>
        </Tooltip>
      </div>
    )
  }

  // Get plan details and ratings
  const getPlanDetails = (planId: string, providerName?: string) => {
    if (planId?.toLowerCase().includes('knew') || providerName?.toLowerCase().includes('knew')) {
      return planDetailsData['knew-health'];
    }
    if (planId?.toLowerCase().includes('crowd') || providerName?.toLowerCase().includes('crowd')) {
      return planDetailsData['crowdhealth-membership'];
    }
    if (planId?.toLowerCase().includes('sedera-access+')) {
      return planDetailsData['sedera-access+'];
    }
    if (planId?.toLowerCase().includes('zion-healthshare-direct-membership')) {
      return planDetailsData['zion-healthshare-direct-membership'];
    }
    return planDetailsData[planId] || null;
  }
  
  // Get plan costs
  const getPlanCosts = (plan: PlanRecommendationType) => {
    if (!questionnaire) {
      return { monthlyPremium: 0, initialUnsharedAmount: 0, annualCost: 0 };
    }
    
    const planCost = getPlanCost(
      plan.plan.id,
      questionnaire.age,
      questionnaire.coverage_type,
      questionnaire.iua_preference
    );
    
    // Check if this is a DPC plan
    const isDpcPlan = plan.plan.id.includes('dpc') || plan.plan.id.includes('vpc');
    
    // Calculate annual cost
    let annualCost = 0;
    if (planCost) {
      annualCost = calculateAnnualCost(
        planCost.monthlyPremium,
        planCost.initialUnsharedAmount,
        questionnaire.visit_frequency,
        questionnaire.coverage_type,
        isDpcPlan
      );
    }
    
    return {
      monthlyPremium: planCost?.monthlyPremium || 0,
      initialUnsharedAmount: planCost?.initialUnsharedAmount || 0,
      annualCost
    };
  };

  return (
    <>
      <div className="mt-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Compare Alternative Plans</h2>
          {selectedPlans.length > 0 && (
            <p className="text-sm text-gray-600">
              {selectedPlans.length} plan{selectedPlans.length !== 1 ? 's' : ''} selected
            </p>
          )}
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {/* Top Plan Column */}
          <Card className="p-6 border-2 border-primary relative overflow-hidden plan-card">
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[80px] border-t-primary border-l-[80px] border-l-transparent"></div>
            <div className="absolute top-2 right-2 text-white font-bold text-xs rotate-45">BEST MATCH</div>
            
            <div className="space-y-5 pt-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <Badge variant="primary" className="bg-primary/10 text-primary border-0">
                  Top Recommendation
                </Badge>
              </div>
              
              <div>
                <div className="flex flex-col items-center gap-3 mb-2">
                  <div className="h-[60px] flex items-center justify-center mb-2">
                    <ProviderLogo providerName={topPlan.plan.providerName} size="md" />
                  </div>
                  {/* Always render the container div for consistent spacing, but only show text for non-Knew/Crowd plans */}
                  <div className="text-center" style={{ minHeight: '28px' }}>
                    {!topPlan.plan.id?.toLowerCase().includes('knew') && 
                     !topPlan.plan.id?.toLowerCase().includes('crowd') && (
                      <p className="text-lg font-semibold text-gray-900">{topPlan.plan.planName}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Cost Information */}
              <div className="space-y-3">
                {/* Monthly Cost */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Monthly Cost</span>
                  <span className="font-semibold text-gray-900">${getPlanCosts(topPlan).monthlyPremium}</span>
                </div>
                
                {/* IUA */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Initial Unshared Amount</span>
                  <span className="font-semibold text-gray-900">${getPlanCosts(topPlan).initialUnsharedAmount.toLocaleString()}</span>
                </div>
                
                {/* Est. Annual Cost */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Est. Annual Cost</span>
                  <span className="font-semibold text-gray-900">${getPlanCosts(topPlan).annualCost.toLocaleString()}</span>
                </div>
                
                {/* Avg. Reviews */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Avg. Reviews</span>
                  <div className="flex items-center gap-2">
                    {getPlanDetails(topPlan.plan.id, topPlan.plan.providerName)?.providerDetails?.ratings && (
                      <>
                        <StarRating rating={getPlanDetails(topPlan.plan.id, topPlan.plan.providerName)?.providerDetails?.ratings.overall || 0} />
                        <span className="font-semibold text-gray-900">
                          {getPlanDetails(topPlan.plan.id, topPlan.plan.providerName)?.providerDetails?.ratings.overall.toFixed(1)}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({getPlanDetails(topPlan.plan.id, topPlan.plan.providerName)?.providerDetails?.ratings.reviewCount})
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Action Button for Top Plan */}
              <Button 
                onClick={() => onPlanSelect(topPlan.plan.id)}
                className="w-full mt-4 details-button text-base py-2 px-4 rounded-lg font-semibold bg-white hover:bg-blue-50 transition-colors duration-150 shadow-sm border border-gray-200"
              >
                Membership Details
              </Button>
              {renderCompareButton(topPlan)}
            </div>
          </Card>
          
          {/* Alternative Plans */}
          {alternativePlans.map((plan, index) => (
            <Card 
              key={plan.plan.id} 
              className="p-6 border border-gray-200 plan-card"
            >
              <div className="space-y-5 pt-4">
                <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                  Alternative {index + 1}
                </Badge>
                
                <div>
                  <div className="flex flex-col items-center gap-3 mb-2">
                    <div className="h-[60px] flex items-center justify-center mb-2">
                      <ProviderLogo providerName={plan.plan.providerName} size="md" />
                    </div>
                    {/* Always render the container div for consistent spacing, but only show text for non-Knew/Crowd plans */}
                    <div className="text-center" style={{ minHeight: '28px' }}>
                      {!plan.plan.id?.toLowerCase().includes('knew') && 
                       !plan.plan.id?.toLowerCase().includes('crowd') && (
                        <p className="text-lg font-semibold text-gray-900">{plan.plan.planName}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Cost Information */}
                <div className="space-y-3">
                  {/* Monthly Cost */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Monthly Cost</span>
                    <span className="font-semibold text-gray-900">${getPlanCosts(plan).monthlyPremium}</span>
                  </div>
                  
                  {/* IUA */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Initial Unshared Amount</span>
                    <span className="font-semibold text-gray-900">${getPlanCosts(plan).initialUnsharedAmount.toLocaleString()}</span>
                  </div>
                  
                  {/* Est. Annual Cost */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Est. Annual Cost</span>
                    <span className="font-semibold text-gray-900">${getPlanCosts(plan).annualCost.toLocaleString()}</span>
                  </div>
                  
                  {/* Avg. Reviews */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Avg. Reviews</span>
                    <div className="flex items-center gap-2">
                      {getPlanDetails(plan.plan.id, plan.plan.providerName)?.providerDetails?.ratings && (
                        <>
                          <StarRating rating={getPlanDetails(plan.plan.id, plan.plan.providerName)?.providerDetails?.ratings.overall || 0} />
                          <span className="font-semibold text-gray-900">
                            {getPlanDetails(plan.plan.id, plan.plan.providerName)?.providerDetails?.ratings.overall.toFixed(1)}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({getPlanDetails(plan.plan.id, plan.plan.providerName)?.providerDetails?.ratings.reviewCount})
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Action Button for Alternative Plans */}
                <Button 
                  onClick={() => onPlanSelect(plan.plan.id)}
                  className="w-full mt-4 details-button text-base py-2 px-4 rounded-lg font-semibold bg-white hover:bg-blue-50 transition-colors duration-150 shadow-sm border border-gray-200"
                >
                  Membership Details
                </Button>
                {renderCompareButton(plan)}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
} 