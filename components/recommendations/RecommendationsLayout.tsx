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

  const topPlan = recommendations[0]
  const alternativePlans = recommendations.slice(1, 4)

  const topPlanCosts = (() => {
    const costs = getPlanCost(
      topPlan.plan.id,
      questionnaire.age,
      questionnaire.household_size,
      questionnaire.iua_preference as '1000' | '2500' | '5000'
    )
    return costs ? {
      monthly: costs.monthly_cost,
      incident: costs.incident_cost
    } : {
      monthly: topPlan.plan.monthly_cost,
      incident: topPlan.plan.incident_cost
    }
  })()

  const getTopReason = (recommendation: PlanRecommendation) => {
    try {
      const topFactor = recommendation.factors.sort((a, b) => b.impact - a.impact)[0]
      return topFactor?.factor || 'Best Overall Match'
    } catch (error) {
      console.error('Error getting top reason:', error)
      return 'Best Overall Match'
    }
  }

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
          plan_provider: recommendations.find(r => r.plan.id === planId)?.plan.provider
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
          costs={topPlanCosts}
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