import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '../ui/checkbox'
import { useSelectedPlans } from './SelectedPlansContext'
import { type PlanRecommendation } from './types'
import { getPlanCost } from '@/lib/utils/plan-costs'
import { CheckCircle, Award, TrendingUp, Info, ArrowRight, ChevronRight, Sparkles } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { PlanRecommendation as PlanRecommendationType } from '@/lib/recommendation/recommendations'
import { QuestionnaireResponse } from '@/types/questionnaire'
import { calculateAnnualHealthcareCosts } from '@/lib/utils/visit-calculator'

// Helper function to format currency
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

interface ComparisonMetric {
  label: string
  value: string | number
  tooltip?: string
  highlight?: boolean
  distinguishing?: boolean
}

// Helper function to get visit frequency cost
function getVisitFrequencyCost(visitFrequency?: string): number {
  if (visitFrequency === 'just_checkups') {
    return 500; // Annual checkups only
  } else if (visitFrequency === 'few_months') {
    return 1500; // Roughly 3 visits per year
  } else if (visitFrequency === 'monthly_plus') {
    return 6000; // 12 visits per year (monthly or more)
  } else {
    return 500; // Default to annual checkups if not specified
  }
}

interface PlanComparisonGridProps {
  topPlan: PlanRecommendationType
  alternativePlans: PlanRecommendationType[]
  onPlanSelect: (planId: string) => void
  questionnaire?: QuestionnaireResponse
}

export function PlanComparisonGrid({ 
  topPlan, 
  alternativePlans,
  onPlanSelect,
  questionnaire
}: PlanComparisonGridProps) {
  const { selectedPlans, togglePlanSelection, canAddMore } = useSelectedPlans()

  const isPlanSelected = (planId: string) => 
    selectedPlans.some(p => p.plan.id === planId)

  const renderCompareCheckbox = (plan: PlanRecommendationType) => {
    const isSelected = isPlanSelected(plan.plan.id)
    return (
      <div className="flex items-center space-x-2 mt-4">
        <div 
          className={cn(
            "flex items-center w-full py-2 px-4 rounded-md border transition-colors cursor-pointer",
            isSelected 
              ? "bg-primary/10 border-primary text-primary" 
              : !canAddMore && !isSelected
                ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed" 
                : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
          )}
          onClick={() => {
            if (isSelected || canAddMore) {
              togglePlanSelection(plan)
            }
          }}
        >
          <div className="flex items-center">
            <Checkbox
              id={`compare-${plan.plan.id}`}
              checked={isSelected}
              disabled={!isSelected && !canAddMore}
              onCheckedChange={() => togglePlanSelection(plan)}
            />
            <div className="w-2"></div> {/* Spacer */}
            <label 
              htmlFor={`compare-${plan.plan.id}`}
              className={cn(
                "text-sm cursor-pointer flex-1",
                isSelected ? "font-medium" : "text-gray-600"
              )}
            >
              {isSelected ? "Remove from comparison" : canAddMore ? "Add to comparison" : "Comparison limit reached"}
            </label>
          </div>
        </div>
      </div>
    )
  }

  const getComparisonMetrics = (plan: PlanRecommendationType, isTopPlan: boolean): ComparisonMetric[] => {
    // Get the lowest cost option from the plan matrix
    const lowestCost = plan.plan.planMatrix
      .flatMap(bracket => bracket.costs)
      .reduce((min, cost) => 
        cost.monthlyPremium < min.monthlyPremium ? cost : min
      );

    // Calculate annual cost
    const isDpcPlan = plan.plan.id.includes('dpc') || plan.plan.id.includes('vpc');
    const dpcCost = isDpcPlan ? 2000 : 0;
    
    // Get expected healthcare costs based on questionnaire
    const visitFrequencyCost = getVisitFrequencyCost(questionnaire?.visit_frequency);
    
    const annualCost = lowestCost.monthlyPremium * 12 + visitFrequencyCost + dpcCost;
    
    // Calculate price differential compared to lowest option
    const lowestPlanCost = [topPlan, ...alternativePlans]
      .map(p => p.plan.planMatrix
        .flatMap(bracket => bracket.costs)
        .reduce((min, cost) => cost.monthlyPremium < min.monthlyPremium ? cost : min)
      )
      .reduce((min, cost) => cost.monthlyPremium < min.monthlyPremium ? cost : min);
    
    const priceDifferential = ((lowestCost.monthlyPremium - lowestPlanCost.monthlyPremium) / lowestPlanCost.monthlyPremium) * 100;
    
    // Determine distinguishing features
    const distinguishingFeatures = getDistinguishingFeatures(plan, isTopPlan);

    return [
      {
        label: 'Match Score',
        value: `${Math.round(plan.score)}%`,
        tooltip: 'How well this plan matches your needs',
        highlight: true,
        distinguishing: plan.score > 85
      },
      {
        label: 'Monthly Cost',
        value: `$${lowestCost.monthlyPremium}`,
        tooltip: 'Starting monthly payment to maintain coverage',
        highlight: true,
        distinguishing: priceDifferential <= 0 && priceDifferential > -10
      },
      {
        label: 'Initial Unshared Amount',
        value: `$${lowestCost.initialUnsharedAmount}`,
        tooltip: 'Amount you pay before sharing begins (similar to a deductible)',
        distinguishing: lowestCost.initialUnsharedAmount < 2000
      },
      {
        label: 'Est. Annual Cost',
        value: formatCurrency(annualCost),
        tooltip: isDpcPlan 
          ? 'Includes monthly premiums, expected healthcare costs, and $2,000 for DPC membership'
          : 'Includes monthly premiums and expected healthcare costs',
        highlight: true
      },
      {
        label: 'Price Differential',
        value: priceDifferential <= 0 ? 'Lowest Price' : `+${Math.round(priceDifferential)}%`,
        tooltip: 'How this plan compares to the lowest-priced option',
        distinguishing: priceDifferential <= 0
      },
      {
        label: 'Maximum Coverage',
        value: plan.plan.maxCoverage,
        tooltip: 'Maximum amount that can be shared',
        distinguishing: plan.plan.maxCoverage.includes('No limit')
      },
      {
        label: 'Annual Unshared Amount',
        value: plan.plan.annualUnsharedAmount,
        tooltip: 'How the annual unshared amount works'
      },
      {
        label: 'Provider',
        value: plan.plan.providerName,
        tooltip: 'Healthcare sharing ministry provider'
      }
    ]
  }

  // Helper function to determine distinguishing features for a plan
  const getDistinguishingFeatures = (plan: PlanRecommendationType, isTopPlan: boolean): string[] => {
    const features = [];
    
    // Add distinguishing features based on plan properties
    if (plan.score > 90) features.push('Excellent Match');
    if (plan.plan.maxCoverage.includes('No limit')) features.push('Unlimited Coverage');
    
    // Add top reason from factors
    if (plan.factors && plan.factors.length > 0) {
      const topFactor = plan.factors.sort((a, b) => b.impact - a.impact)[0];
      if (topFactor) features.push(topFactor.factor);
    }
    
    return features;
  }

  return (
    <TooltipProvider>
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
            
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <Badge variant="primary" className="bg-primary/10 text-primary border-0">
                  Top Recommendation
                </Badge>
              </div>
              
              <h3 className="font-semibold text-lg">{topPlan.plan.planName}</h3>
              
              {/* Match Score */}
              <div className="bg-primary/10 p-4 rounded-lg flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Match Score</span>
                <span className="text-lg font-bold text-primary">{Math.round(topPlan.score)}%</span>
              </div>
              
              {/* Distinguishing Features */}
              <div className="space-y-3 mb-3">
                <p className="text-sm font-medium text-gray-700">Key Strengths:</p>
                {getDistinguishingFeatures(topPlan, true).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
              
              {/* Comparison Metrics */}
              <div className="space-y-4 mt-5">
                {getComparisonMetrics(topPlan, true).filter(metric => metric.highlight).map((metric, index) => (
                  <div key={index} className="text-sm">
                    <div className="flex items-center gap-1">
                      <p className="text-gray-500">{metric.label}</p>
                      {metric.tooltip && (
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-3.5 w-3.5 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>{metric.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                    <p className={cn(
                      "font-semibold text-gray-900",
                      metric.distinguishing && "text-green-600"
                    )}>
                      {metric.value}
                      {metric.distinguishing && (
                        <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                          Best
                        </span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Action Button */}
              <button
                onClick={() => onPlanSelect(topPlan.plan.id)}
                className="w-full mt-4 details-button"
              >
                View Details
                <ChevronRight className="h-4 w-4 ml-1 inline" />
              </button>
              
              {renderCompareCheckbox(topPlan)}
            </div>
          </Card>
          
          {/* Alternative Plans */}
          {alternativePlans.map((plan, index) => (
            <Card 
              key={plan.plan.id} 
              className="p-6 border border-gray-200 hover:border-gray-300 plan-card"
            >
              <div className="space-y-5">
                <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                  Alternative {index + 1}
                </Badge>
                
                <h3 className="font-semibold text-lg">{plan.plan.planName}</h3>
                
                {/* Match Score */}
                <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Match Score</span>
                  <span className="text-lg font-bold text-gray-900">{Math.round(plan.score)}%</span>
                </div>
                
                {/* Distinguishing Features */}
                <div className="space-y-3 mb-3">
                  <p className="text-sm font-medium text-gray-700">Key Strengths:</p>
                  {getDistinguishingFeatures(plan, false).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Comparison Metrics */}
                <div className="space-y-4 mt-5">
                  {getComparisonMetrics(plan, false).filter(metric => metric.highlight).map((metric, idx) => (
                    <div key={idx} className="text-sm">
                      <div className="flex items-center gap-1">
                        <p className="text-gray-500">{metric.label}</p>
                        {metric.tooltip && (
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-3.5 w-3.5 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p>{metric.tooltip}</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                      <p className={cn(
                        "font-semibold text-gray-900",
                        metric.distinguishing && "text-green-600"
                      )}>
                        {metric.value}
                        {metric.distinguishing && (
                          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                            Best
                          </span>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
                
                {/* Action Button */}
                <button
                  onClick={() => onPlanSelect(plan.plan.id)}
                  className="w-full mt-4 details-button"
                >
                  View Details
                  <ChevronRight className="h-4 w-4 ml-1 inline" />
                </button>
                
                {renderCompareCheckbox(plan)}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </TooltipProvider>
  )
} 