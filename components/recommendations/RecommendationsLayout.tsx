'use client'

import { type RecommendationsProps, type PlanRecommendation } from './types'
import { HeroRecommendation } from './HeroRecommendation'
import { getPlanCost } from '@/lib/utils/plan-costs'
import { type QuestionnaireResponse } from '@/types/questionnaire'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { useSelectedPlans } from './SelectedPlansContext'
import { PlanComparisonGrid } from './PlanComparisonGrid'
import { PlanComparisonTable } from './PlanComparisonTable'
import { PlanDetailsModal } from './PlanDetailsModal'
import { TrustElements } from './TrustElements'
import { Separator } from '@/components/ui/separator'

export function RecommendationsLayout({ 
  recommendations, 
  questionnaire 
}: RecommendationsProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<string | undefined>()
  const { selectedPlans, removePlan } = useSelectedPlans()
  const [isLoading, setIsLoading] = useState(false)
  const [detailsPlan, setDetailsPlan] = useState<PlanRecommendation | null>(null)

  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
        questionnaire.iua_preference
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
    <div className="bg-gray-50 min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your Personalized Healthshare Recommendations</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Based on your needs, we've found these healthshare plans that best match your situation. 
              Compare options and choose the one that works for you.
            </p>
          </div>
          
          {/* Hero Recommendation */}
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
            showMaternityNotice={questionnaire.pregnancy === 'true' || questionnaire.pregnancy_planning === 'yes'}
            showPreExistingNotice={questionnaire.pre_existing === 'true' || (questionnaire.medical_conditions && questionnaire.medical_conditions.length > 0)}
          />
          
          <Separator className="my-16" />
          
          {/* Trust Elements */}
          <TrustElements recommendation={topPlan} />
          
          <Separator className="my-16" />
          
          {/* Plan Comparison */}
          <PlanComparisonGrid 
            topPlan={topPlan}
            alternativePlans={alternativePlans}
            onPlanSelect={handleViewDetails}
            questionnaire={questionnaire}
          />
          
          {/* Plan Details Modal */}
          {detailsPlan && (
            <PlanDetailsModal
              plan={detailsPlan}
              isOpen={!!detailsPlan}
              onClose={() => setDetailsPlan(null)}
            />
          )}
        </div>
      </div>
    </div>
  )
} 