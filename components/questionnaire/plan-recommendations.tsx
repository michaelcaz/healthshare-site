'use client'

import { useState, useEffect } from 'react'
import { type QuestionnaireResponse } from '@/types/questionnaire'
import { providerPlans } from '@/data/provider-plans'
import { getRecommendations } from '@/lib/recommendation/recommendations'
import { type PlanRecommendation } from '@/lib/recommendation/recommendations'
import { HeroRecommendation } from '@/components/recommendations/HeroRecommendation'
import { type PlanCosts } from '@/components/recommendations/types'
import { PlanRecommendationHeroCta } from '@/components/ui/plan-recommendation-hero-cta'

interface PlanRecommendationsProps {
  response: QuestionnaireResponse
}

export function PlanRecommendations({ response }: PlanRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<PlanRecommendation[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const recs = await getRecommendations(providerPlans, response)
        setRecommendations(recs)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load recommendations')
      }
    }
    loadRecommendations()
  }, [response])

  const handleViewDetails = () => {
    // TODO: Implement view details
    console.log('View details clicked')
  }

  const handleGetPlan = () => {
    // TODO: Implement get plan
    console.log('Get plan clicked')
  }

  if (!recommendations || recommendations.length === 0) {
    return null
  }

  const topPlan = recommendations[0]
  const heroBadges = {
    topReason: topPlan.factors[0]?.factor || 'Best Overall Match',
    matchScore: Math.round(topPlan.score)
  }

  // Get costs for the top plan
  const heroCosts: PlanCosts = {
    monthlyPremium: topPlan.plan.planMatrix[0]?.costs[0]?.monthlyPremium || 0,
    initialUnsharedAmount: topPlan.plan.planMatrix[0]?.costs[0]?.initialUnsharedAmount || 0
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Get Your<br className="block sm:hidden" />
        Personalized<br className="block sm:hidden" />
        Results
      </h1>
      
      <HeroRecommendation
        recommendation={topPlan}
        badges={heroBadges}
        costs={heroCosts}
        onViewDetails={handleViewDetails}
        onGetPlan={handleGetPlan}
        isLoading={false}
      />
      
      <PlanRecommendationHeroCta 
        phoneNumber="(737) 237-1055" 
        calendlyLink="https://calendly.com/michaelcaz/30min" 
      />
      
      <div className="space-y-6 mt-8">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-indigo-800">
            Recommended Plan Type: {response.expense_preference === 'lower_monthly' ? 'High-Deductible Plan' : 'Standard Coverage'}
          </h2>
          <p className="mt-2 text-sm text-indigo-700">
            Based on your responses, we recommend exploring these plan options.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mt-6">
          {recommendations.slice(1).map((rec) => {
            const planCosts = rec.plan.planMatrix
              .find(matrix => matrix.ageBracket === '30-39' && matrix.householdType === 'Member Only')
              ?.costs.find(cost => cost.initialUnsharedAmount === 2500)

            return (
              <div key={rec.plan.id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium">{rec.plan.planName}</h3>
                <p className="text-sm text-gray-600 mt-1">{rec.plan.providerName}</p>
                <div className="mt-2">
                  <div className="text-lg font-semibold">${planCosts?.monthlyPremium || 0}/mo</div>
                  <div className="text-sm text-gray-500">
                    ${planCosts?.initialUnsharedAmount || 0} per incident
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-sm font-medium">Match Score: {Math.round(rec.score)}%</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {rec.factors[0]?.factor || 'Good match for your needs'}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {error && (
          <div className="text-red-600">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}
