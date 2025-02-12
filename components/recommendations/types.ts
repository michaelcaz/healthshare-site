import { type HealthsharePlan } from '@/types/plans'
import { type QuestionnaireResponse } from '../../lib/types'
import { type PricingPlan } from '@/types/provider-plans'

export interface RecommendationsProps {
  recommendations: PlanRecommendation[]
  selectedPlanId?: string
  questionnaire: QuestionnaireResponse
}

export interface PlanRecommendation {
  plan: PricingPlan
  score: number
  explanation: string[]
  ranking: number
  factors: Array<{
    factor: string
    impact: number
  }>
}

export interface PlanCosts {
  monthlyPremium: number
  initialUnsharedAmount: number
}

export interface RecommendationBadges {
  topReason: string
  matchScore: number
}

export interface HeroRecommendationProps {
  recommendation: PlanRecommendation
  badges: {
    topReason: string
    matchScore: number
  }
  costs: PlanCosts
  onViewDetails: () => void
  onGetPlan: () => void
} 