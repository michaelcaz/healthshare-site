import { type QuestionnaireResponse } from '@/types/questionnaire'
import { type PlanRecommendation } from '@/lib/recommendation/recommendations'
import { type HealthsharePlan } from '@/types/plans'

export { RecommendationsLayout } from './RecommendationsLayout'
export { ComparisonBanner } from './ComparisonBanner'

// Main container
export interface RecommendationsProps {
  recommendations: PlanRecommendation[]
  questionnaire: QuestionnaireResponse
  selectedPlanId?: string  // For detailed view
}

// Top recommendation hero
interface HeroRecommendationProps {
  recommendation: PlanRecommendation
  badges: {
    topReason: string
    matchScore: number
  }
}

// Comparison grid
interface PlanComparisonGridProps {
  topPlan: PlanRecommendation
  alternativePlans: PlanRecommendation[]
  onPlanSelect: (planId: string) => void
}

// Coverage details section
interface CoverageDetailsProps {
  plan: HealthsharePlan
  costs: {
    monthly: number
    perIncident: number
    estimatedAnnual: number
  }
  coverage: {
    doctors: string[]
    prescriptions: string[]
    emergency: string[]
    surgery: string[]
    pregnancy?: string[]
    freeServices: string[]
  }
}

// Trust elements
interface TrustElementsProps {
  plan: HealthsharePlan
  trustScore: number
  testimonials: Array<{
    text: string
    author: string
    highlight: string
  }>
  matchReasons: string[]
} 