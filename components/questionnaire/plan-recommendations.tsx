'use client'

import { useState, useEffect } from 'react'
import { type QuestionnaireResponse } from '@/types/questionnaire'
import { samplePlans } from '@/data/sample-plans'
import { getRecommendations } from '@/lib/recommendation/recommendations'
import { type PlanRecommendation } from '@/lib/recommendation/recommendations'
import { HeroRecommendation } from '@/components/recommendations/HeroRecommendation'

interface PlanRecommendationsProps {
  response: QuestionnaireResponse
}

export function PlanRecommendations({ response }: PlanRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<PlanRecommendation[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const recs = await getRecommendations(samplePlans, response)
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

  const heroCosts = {
    monthly: topPlan.plan.monthly_cost,
    incident: topPlan.plan.incident_cost
  }

  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-indigo-800">
          Recommended Plan Type: {response.expense_preference === 'lower_monthly' ? 'High-Deductible Plan' : 'Standard Coverage'}
        </h2>
        <p className="mt-2 text-sm text-indigo-700">
          Based on your responses, we recommend exploring these plan options.
        </p>
      </div>

      <HeroRecommendation
        recommendation={topPlan}
        badges={heroBadges}
        costs={heroCosts}
        onViewDetails={handleViewDetails}
        onGetPlan={handleGetPlan}
        isLoading={false}
      />

      <div className="grid gap-4 md:grid-cols-2 mt-6">
        {recommendations.slice(1).map((rec) => (
          <div key={rec.plan.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium">{rec.plan.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{rec.plan.provider}</p>
            <div className="mt-2">
              <div className="text-lg font-semibold">${rec.plan.monthly_cost}/mo</div>
              <div className="text-sm text-gray-500">
                ${rec.plan.incident_cost} per incident
              </div>
            </div>
            <div className="mt-4">
              <div className="text-sm font-medium">Match Score: {Math.round(rec.score)}%</div>
              <div className="text-sm text-gray-500 mt-1">
                {rec.explanation[0]}
              </div>
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="text-red-600">
          {error}
        </div>
      )}
    </div>
  )
}
