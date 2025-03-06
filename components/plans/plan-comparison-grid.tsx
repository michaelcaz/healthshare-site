'use client'

import { PlanCard } from './plan-card'
import { BackgroundPattern } from '@/components/ui/background-pattern'
import { type PlanRecommendation } from '@/lib/recommendation/recommendations'
import { getPlanCost } from '@/lib/utils/plan-costs'
import { type QuestionnaireResponse } from '@/types/questionnaire'

interface PlanComparisonGridProps {
  recommendations: PlanRecommendation[]
  questionnaire: QuestionnaireResponse
  onViewDetails: (planId: string) => void
  onGetPlan: (planId: string) => void
  isLoading?: boolean
}

export function PlanComparisonGrid({
  recommendations,
  questionnaire,
  onViewDetails,
  onGetPlan,
  isLoading = false
}: PlanComparisonGridProps) {
  if (!recommendations || recommendations.length === 0) {
    return null
  }

  // Get the top 3 recommendations
  const topRecommendations = recommendations.slice(0, 3)
  
  // Helper function to get the top reason for a recommendation
  const getTopReason = (recommendation: PlanRecommendation) => {
    if (!recommendation?.factors?.length) {
      return 'Best Overall Match'
    }
    try {
      const topFactor = recommendation.factors.sort((a, b) => b.impact - a.impact)[0]
      return topFactor?.factor || 'Best Overall Match'
    } catch (error) {
      console.error('Error getting top reason:', error)
      return 'Best Overall Match'
    }
  }

  return (
    <BackgroundPattern pattern="dots" intensity="light" className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Compare Your Top Matches</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've analyzed your needs and found these plans to be the best fit. Compare features and costs to find your perfect match.
          </p>
        </div>
        
        <div className="plan-comparison-grid">
          {topRecommendations.map((recommendation, index) => {
            const plan = recommendation.plan
            const costs = getPlanCost(
              plan.id,
              questionnaire.age,
              questionnaire.coverage_type,
              questionnaire.iua_preference
            )
            
            // Extract common features for comparison
            // Since we don't have these properties directly on PricingPlan,
            // we'll use placeholder values that could be determined from other data
            const features = [
              {
                name: 'Maternity Coverage',
                included: index !== 2, // Example placeholder logic
                description: 'Coverage for pregnancy and childbirth expenses'
              },
              {
                name: 'Preventive Care',
                included: true, // Most plans include this
                description: 'Coverage for routine check-ups and screenings'
              },
              {
                name: 'Mental Health',
                included: index === 0, // Example placeholder logic
                description: 'Coverage for mental health services'
              },
              {
                name: 'Prescription Discounts',
                included: index !== 1, // Example placeholder logic
                description: 'Discounts on prescription medications'
              }
            ]
            
            return (
              <PlanCard
                key={plan.id}
                planName={plan.planName}
                providerName={plan.providerName}
                monthlyPrice={costs?.monthlyPremium || 0}
                initialUnsharedAmount={costs?.initialUnsharedAmount || 0}
                matchPercentage={Math.round(recommendation.score)}
                topReason={getTopReason(recommendation)}
                features={features}
                onViewDetails={() => onViewDetails(plan.id)}
                onGetPlan={() => onGetPlan(plan.id)}
                isLoading={isLoading}
                isRecommended={index === 0}
              />
            )
          })}
        </div>
      </div>
    </BackgroundPattern>
  )
} 