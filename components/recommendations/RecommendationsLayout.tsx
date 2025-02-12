'use client'

import { type RecommendationsProps, type PlanRecommendation } from './types'
import { HeroRecommendation } from './HeroRecommendation'
import { getPlanCost } from '@/lib/utils/plan-costs'
import { type QuestionnaireResponse } from '../../lib/types'
import { useState } from 'react'
import { toast } from 'sonner'
import { useSelectedPlans } from './SelectedPlansContext'
import { PlanComparisonGrid } from './PlanComparisonGrid'
import { PlanComparisonTable } from './PlanComparisonTable'
import { PlanDetailsModal } from './PlanDetailsModal'
import { TrustElements } from './TrustElements'

export function RecommendationsLayout({ 
  recommendations, 
  questionnaire 
}: RecommendationsProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<string | undefined>()
  const { selectedPlans, removePlan } = useSelectedPlans()
  const [isLoading, setIsLoading] = useState(false)
  const [detailsPlan, setDetailsPlan] = useState<PlanRecommendation | null>(null)

  // Add debugging
  console.log('Received recommendations:', recommendations)
  console.log('First recommendation:', recommendations[0])

  // Get the top plan (highest scoring)
  const topPlan = recommendations[0]
  
  // Enhanced safety check
  if (!topPlan || !topPlan.plan) {
    console.error('Invalid recommendation data:', topPlan)
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900">
          No recommendations available
        </h2>
        <p className="mt-2 text-gray-600">
          Please try adjusting your preferences or contact support if this persists.
        </p>
      </div>
    )
  }

  // Move function declarations before any usage
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

  const topPlanCosts = () => {
    if (!topPlan?.plan?.id) {
      console.error('Invalid plan data:', topPlan)
      return { monthlyPremium: 0, initialUnsharedAmount: 0 }
    }

    try {
      const costs = getPlanCost(
        topPlan.plan.id,
        questionnaire.age,
        questionnaire.coverage_type,
        questionnaire.iua_preference as '1000' | '2500' | '5000'
      )
      return costs || { monthlyPremium: 0, initialUnsharedAmount: 0 }
    } catch (error) {
      console.error('Error getting plan costs:', error)
      return { monthlyPremium: 0, initialUnsharedAmount: 0 }
    }
  }

  const alternativePlans = recommendations.slice(1, 4)

  const handleViewDetails = (planId: string) => {
    const plan = recommendations.find(r => r.plan.id === planId)
    if (plan) {
      setDetailsPlan(plan)
    }
  }

  const handleGetPlan = async (planId: string) => {
    setIsLoading(true)
    try {
      // Track analytics event
      if (window.gtag) {
        window.gtag('event', 'select_plan', {
          plan_id: planId,
          plan_provider: recommendations.find(r => r.plan.id === planId)?.plan.providerName
        })
      }

      // Validate plan exists
      const selectedPlan = recommendations.find(r => r.plan.id === planId)
      if (!selectedPlan) {
        throw new Error('Selected plan not found')
      }

      // Redirect to enrollment
      window.location.href = `/enroll/${planId}`
    } catch (error) {
      console.error('Error selecting plan:', error)
      toast.error('Unable to select plan. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-12 py-12">
        <HeroRecommendation 
          recommendation={topPlan}
          badges={{
            topReason: getTopReason(topPlan),
            matchScore: Math.round(topPlan.score)
          }}
          costs={topPlanCosts()}
          onViewDetails={() => handleViewDetails(topPlan.plan.id)}
          onGetPlan={() => handleGetPlan(topPlan.plan.id)}
          isLoading={isLoading}
        />
        <TrustElements recommendation={topPlan} />
        <PlanComparisonGrid 
          topPlan={topPlan}
          alternativePlans={alternativePlans}
          onPlanSelect={handleViewDetails}
        />
        
        {detailsPlan && (
          <PlanDetailsModal
            plan={detailsPlan}
            isOpen={!!detailsPlan}
            onClose={() => setDetailsPlan(null)}
          />
        )}
      </div>
    </div>
  )
} 