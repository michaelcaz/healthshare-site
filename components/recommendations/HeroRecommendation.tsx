import { type PlanRecommendation, type PlanCosts, type RecommendationBadges } from './types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  Star, 
  CheckCircle, 
  Info, 
  Users, 
  TrendingUp,
  Calendar,
  Award,
  Building,
  ChevronRight,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { ProviderLogo } from './ProviderLogo'
import { useEffect, useRef, useState } from 'react'
import { PlanDetailsData, defaultPlanDetailsData } from '@/types/plan-details'
import { calculateAnnualCost, getVisitFrequencyCost } from '@/utils/plan-utils'

interface HeroRecommendationProps {
  recommendation: PlanRecommendation
  badges: RecommendationBadges
  costs: PlanCosts
  onViewDetails: () => void
  onGetPlan: () => void
  isLoading?: boolean
  showPreExistingNotice?: boolean
  isDpcCompatible?: boolean
  planDetails?: PlanDetailsData
  questionnaire?: any
}

// Add this CSS class for the dotted underline tooltips
const tooltipUnderlineStyle = "border-b border-dotted border-gray-600 cursor-pointer";

export function HeroRecommendation({ 
  recommendation, 
  badges, 
  costs,
  onViewDetails,
  onGetPlan,
  isLoading = false,
  showPreExistingNotice = false,
  isDpcCompatible = false,
  planDetails = defaultPlanDetailsData,
  questionnaire
}: HeroRecommendationProps) {
  const { plan, score } = recommendation

  // Calculate estimated savings vs traditional insurance
  const traditionalInsuranceCost = costs.monthlyPremium * 1.65; // Estimated 65% higher
  const monthlySavings = traditionalInsuranceCost - costs.monthlyPremium;
  const annualSavings = monthlySavings * 12;
  
  // Get expected healthcare costs based on questionnaire
  console.log('HeroRecommendation - Questionnaire:', questionnaire);
  console.log('HeroRecommendation - Visit Frequency:', questionnaire?.visit_frequency);
  console.log('HeroRecommendation - Coverage Type:', questionnaire?.coverage_type);
  
  // Calculate annual cost including visit frequency
  const isDpcPlan = plan.id.includes('dpc') || plan.id.includes('vpc');
  
  // Use the centralized calculateAnnualCost function
  const annualCost = calculateAnnualCost(
    costs.monthlyPremium,
    costs.initialUnsharedAmount,
    questionnaire?.visit_frequency,
    questionnaire?.coverage_type,
    isDpcPlan,
    'HeroRecommendation'
  );
  
  // Log the visit frequency cost separately for debugging
  const visitFrequencyCost = getVisitFrequencyCost(questionnaire?.visit_frequency, questionnaire?.coverage_type);
  console.log('HeroRecommendation - Visit Frequency Cost:', visitFrequencyCost);
  
  // Log the annual cost components for debugging
  console.log('HeroRecommendation - Annual Cost Components:', {
    monthlyPremium: costs.monthlyPremium,
    annualPremium: costs.monthlyPremium * 12,
    visitFrequencyCost,
    dpcCost: isDpcPlan ? 2000 : 0,
    totalAnnualCost: annualCost
  });

  // Determine if this plan has the lowest monthly payment
  const hasLowestMonthlyPayment = badges.topReason === "Monthly Cost";
  
  // Determine if this plan has the lowest out-of-pocket in case of emergency
  const hasLowestOutOfPocket = badges.topReason === "Incident Cost";

  // Get provider details from planDetails, ensuring it's not undefined
  const providerDetails = planDetails?.providerDetails || defaultPlanDetailsData.providerDetails!;

  // Custom tooltip component that matches Stride's design
  const CustomTooltip = ({ 
    id, 
    trigger, 
    content 
  }: { 
    id: string; 
    trigger: React.ReactNode; 
    content: React.ReactNode 
  }) => (
    <span className="group relative inline-block">
      <span className={tooltipUnderlineStyle}>{trigger}</span>
      <span className="invisible group-hover:visible absolute left-0 bottom-full mb-2 w-64 bg-white p-3 rounded-md shadow-lg border border-gray-200 text-sm text-gray-700 z-50">
        {content}
      </span>
    </span>
  );

  return (
    <div className="max-w-4xl mx-auto fade-in">
      <div className="bg-gradient-to-br from-white to-[#F9F7FF] rounded-2xl shadow-lg border border-gray-100/80 p-8 relative overflow-hidden plan-card">
        {/* Top Recommendation Banner - Completely Redesigned */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-gradient-to-r from-[#6366F1]/90 to-[#5A51E5]/90 text-white rounded-full px-3 py-1.5 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-white/90" />
              <span className="text-sm font-semibold">Top Recommendation</span>
            </div>
            <div className="text-xs font-medium text-gray-700 bg-gray-100/80 rounded-full px-3 py-1.5 flex items-center">
              <span>
                {hasLowestMonthlyPayment 
                  ? "Lowest Monthly Payment" 
                  : "Lowest Out of Pocket in Case of Emergency"}
              </span>
            </div>
          </div>
          <div className="text-xs font-medium text-green-700 bg-green-100/80 rounded-full px-3 py-1.5 flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 text-green-600" fill="currentColor" />
            <span>{badges.matchScore}% Match</span>
          </div>
        </div>
        
        {/* MOBILE: Plan Logo/Name, then Trust Elements */}
        <div className="block sm:hidden">
          {/* Plan Logo, Name and Provider */}
          <div className="mb-6 flex flex-col items-center">
            <ProviderLogo providerName={plan.providerName} size="xl" />
            <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-2 text-center">{plan.providerName} {plan.planName}</h2>
          </div>
          {/* Trust Elements (Ratings, Reviews, Members, Est. Date) */}
          <div className="mb-10 w-full flex flex-col items-center">
            <div className="flex items-center gap-1 mb-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-[#F0B03F]" fill="currentColor" />
                ))}
              </div>
              <span className="font-semibold text-sm text-gray-800 ml-1">{providerDetails.ratings.overall}/5</span>
            </div>
            <span className="text-sm text-gray-600">({providerDetails.ratings.reviewCount} reviews)</span>
            <div className="flex items-center gap-2 mt-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">{providerDetails.memberCount?.replace(/\*\*/g, '')} Active Members</span>
              <TrendingUp className="h-3 w-3 text-green-500" />
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="text-sm">Est. {providerDetails.yearEstablished}</span>
            </div>
          </div>
        </div>

        {/* DESKTOP: Trust Elements, then Plan Logo/Name (original order) */}
        <div className="hidden sm:block">
          {/* Trust Elements (Ratings, Reviews, Members, Est. Date) */}
          <div className="flex w-full flex-row items-center justify-between bg-gradient-to-r from-[#F0F4FF] to-[#F5F7FF] mb-10 py-5 px-8 border-y border-blue-100/30 gap-0">
            <div className="flex items-center gap-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-[#F0B03F]" fill="currentColor" />
                ))}
              </div>
              <span className="font-semibold text-sm text-gray-800 ml-1">{providerDetails.ratings.overall}/5</span>
              <span className="text-sm text-gray-600 ml-2">({providerDetails.ratings.reviewCount} reviews)</span>
              <div className="flex items-center gap-2 ml-6">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">{providerDetails.memberCount?.replace(/\*\*/g, '')} Active Members</span>
                <TrendingUp className="h-3 w-3 text-green-500" />
              </div>
              <div className="flex items-center gap-2 ml-6">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Est. {providerDetails.yearEstablished}</span>
              </div>
            </div>
          </div>
          {/* Plan Logo, Name and Provider */}
          <div className="mb-10 flex flex-row items-center gap-4">
            <div className="flex-shrink-0 flex justify-center w-auto">
              <ProviderLogo providerName={plan.providerName} size="xl" />
            </div>
            <div className="flex flex-col items-start">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 text-left">{plan.providerName} {plan.planName}</h2>
              {/* Feature badges */}
              <div className="flex flex-wrap gap-3 mt-3 justify-start w-full">
                {isDpcCompatible && (
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#ECFDF5] text-[#047857]">
                    <CustomTooltip 
                      id="dpc-compatible"
                      trigger="DPC Compatible"
                      content="This plan works well with Direct Primary Care memberships, which provide unlimited access to a primary care doctor for a low monthly fee."
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pre-existing Conditions Notice Banner */}
        {showPreExistingNotice && (
          <div className="bg-[#FEF9F1] -mx-6 mb-8 py-6 px-10 rounded-md shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-amber-100/70 mx-2">
            <div className="flex items-start gap-3.5">
              <div className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border border-amber-400/60 flex items-center justify-center">
                <span className="text-amber-500/80 text-xs font-medium">!</span>
              </div>
              <div>
                <p className="text-amber-900/90 text-[15px] leading-6">
                  <span className="font-semibold">Important:</span> Pre-existing conditions are not eligible for sharing during the first year 
                  of membership in all health sharing plans. Please review the plan details for more information.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Cost Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="cost-display">
            <div className="text-sm font-medium text-gray-600 mb-2">Monthly Cost</div>
            <div className="flex items-baseline">
              <span className="cost-amount">${costs.monthlyPremium}</span>
            </div>
            {hasLowestMonthlyPayment && (
              <div className="mt-2">
                <span className="savings-indicator">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Lowest Available
                </span>
              </div>
            )}
          </div>
          
          <div className="cost-display">
            <div className="flex items-center gap-1 text-sm font-medium text-gray-600 mb-2">
              <CustomTooltip 
                id="iua-tooltip"
                trigger="Initial Unshared Amount (IUA)"
                content="The amount you're responsible for before the community begins sharing your eligible medical expenses. Similar to a deductible in traditional insurance."
              />
            </div>
            <div className="flex items-baseline">
              <span className="cost-amount">${costs.initialUnsharedAmount}</span>
            </div>
            {hasLowestOutOfPocket && (
              <div className="mt-2">
                <span className="savings-indicator">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Lowest Available
                </span>
              </div>
            )}
          </div>
          
          <div className="cost-display bg-green-50/50 border border-green-100/70">
            <div className="text-sm font-medium text-gray-700 mb-2">
              <CustomTooltip 
                id="annual-cost-tooltip"
                trigger="Your Estimated Annual Cost"
                content={isDpcPlan 
                  ? `Includes monthly premiums × 12, expected healthcare costs based on visit frequency and family size, and $2,000 for DPC membership`
                  : `Includes monthly premiums × 12 and expected healthcare costs based on visit frequency and family size`}
              />
            </div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-green-600">${annualCost.toFixed(0)}</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${Math.min(100, (annualSavings / (annualCost + annualSavings)) * 100)}%` }}
                ></div>
              </div>
              <p className="text-xs font-medium text-gray-700">
                Save ${annualSavings.toFixed(0)} vs. traditional insurance
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => {
              console.log('Hero recommendation button clicked:', {
                planId: plan.id,
                planName: plan.planName,
                providerName: plan.providerName
              });
              onGetPlan();
            }}
            disabled={isLoading}
            className="cta-button"
          >
            Sign up now
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              console.log('Hero recommendation details button clicked:', {
                planId: plan.id,
                planName: plan.planName,
                providerName: plan.providerName
              });
              onViewDetails();
            }}
            className="details-button"
          >
            View Plan Details
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  )
} 