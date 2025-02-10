import { type HealthsharePlan } from '@/types/plans'
import { calculatePlanScore } from './scoring'
import { type QuestionnaireResponse } from '@/types/questionnaire'

export interface PlanRecommendation {
  plan: HealthsharePlan
  score: number
  explanation: string[]
  ranking: number
  factors: Array<{
    factor: string
    impact: number
  }>
}

export async function getRecommendations(
  plans: HealthsharePlan[],
  questionnaire: QuestionnaireResponse
): Promise<PlanRecommendation[]> {
  // Calculate scores for all plans
  const scoredPlans = await Promise.all(
    plans.map(async (plan) => {
      const score = await calculatePlanScore(plan, questionnaire)
      return {
        plan,
        score: score.total_score,
        explanation: score.explanation,
        factors: score.factors.map(f => ({
          factor: f.factor,
          impact: f.score
        })),
        ranking: 0 // Will be set after sorting
      }
    })
  )

  // Sort by score descending and add rankings
  const rankedPlans = scoredPlans
    .sort((a, b) => b.score - a.score)
    .map((plan, index) => ({
      ...plan,
      ranking: index + 1
    }))

  // Return all plans instead of filtering
  return rankedPlans
} 