import { type HealthsharePlan } from '@/types/plans'
import { type QuestionnaireResponse } from '../../lib/types'

export interface RecommendationsProps {
  recommendations: PlanRecommendation[]
  selectedPlanId?: string
  questionnaire: QuestionnaireResponse
}

export interface PlanRecommendation {
  plan: HealthsharePlan
  score: number
  ranking: number
  explanation: string[]
  factors: Array<{
    factor: string
    impact: number
  }>
  coverage_highlights?: Array<{
    title: string
    description: string
  }>
}

export interface PlanCosts {
  monthly: number
  incident: number
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