import { type HealthsharePlan } from '@/types/plans'
import { type QuestionnaireResponse } from '@/types/questionnaire'
import { type PricingPlan } from '@/types/provider-plans'
import { type PlanRecommendation } from '@/lib/recommendation/recommendations'

export type { PlanRecommendation }

export interface RecommendationsProps {
  recommendations: PlanRecommendation[]
  selectedPlanId?: string
  questionnaire: QuestionnaireResponse
}

export interface PlanCosts {
  monthlyPremium: number
  initialUnsharedAmount: number
  sourceUrl?: string
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
  isLoading?: boolean
  showMaternityNotice?: boolean
  showPreExistingNotice?: boolean
  isDpcCompatible?: boolean
} 