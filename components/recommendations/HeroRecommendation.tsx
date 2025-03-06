import { type PlanRecommendation, type PlanCosts, type RecommendationBadges } from './types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Shield, Star, Clock, DollarSign, CheckCircle, XCircle, Check, X, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HeroRecommendationProps {
  recommendation: PlanRecommendation
  badges: RecommendationBadges
  costs: PlanCosts
  onViewDetails: () => void
  onGetPlan: () => void
  isLoading?: boolean
}

interface KeyCoveragePoint {
  icon: React.ReactNode
  text: string
  isPositive: boolean
}

export function HeroRecommendation({ 
  recommendation, 
  badges, 
  costs,
  onViewDetails,
  onGetPlan,
  isLoading = false
}: HeroRecommendationProps) {
  const { plan, score } = recommendation

  const keyCoveragePoints = [
    {
      text: `Maximum Coverage: ${plan.maxCoverage}`,
      isPositive: true,
      icon: <Shield className="text-primary" />
    },
    {
      text: `Annual Unshared Amount: ${plan.annualUnsharedAmount}`,
      isPositive: true,
      icon: <DollarSign className="text-primary" />
    }
  ]

  return (
    <div className="max-w-3xl mx-auto fade-in">
      <div className="hero-results-card">
        {/* Top Reason Badge */}
        <div className="absolute top-4 left-4 bg-primary-light/10 text-primary-dark px-4 py-2 rounded-full text-sm font-medium">
          {badges.topReason}
        </div>
        
        {/* Match Score Badge - More prominent */}
        <div className="results-match-score">
          {badges.matchScore}%
        </div>

        {/* Plan Name and Provider */}
        <div className="mb-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-warm">{plan.planName}</h2>
          <p className="text-lg text-gray-600">{plan.providerName}</p>
        </div>

        {/* Cost Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-600 mb-2">Monthly Cost</div>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-primary-dark">${costs.monthlyPremium}</span>
              <span className="text-gray-600 ml-2">/mo</span>
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-600 mb-2">Initial Unshared Amount</div>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-primary-dark">${costs.initialUnsharedAmount}</span>
              <span className="text-gray-600 ml-2">/year</span>
            </div>
          </div>
        </div>

        {/* Key Coverage Points */}
        <div className="space-y-5 mb-8 bg-white p-6 rounded-xl border border-gray-100">
          <h3 className="font-semibold text-lg text-gray-warm mb-4">Key Plan Features</h3>
          {keyCoveragePoints.map((point, index) => (
            <div key={index} className="flex items-center gap-4 group">
              <div className="p-2 rounded-full bg-primary-light/10 group-hover:bg-primary-light/20 transition-colors">
                {point.icon}
              </div>
              <span className={cn(
                "text-gray-700 font-medium",
                point.isPositive ? "text-gray-800" : "text-gray-700"
              )}>
                {point.text}
              </span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={onGetPlan}
            disabled={isLoading}
            className="questionnaire-button-primary w-full sm:w-auto"
          >
            Get This Plan
          </Button>
          <Button
            onClick={onViewDetails}
            disabled={isLoading}
            className="questionnaire-button-secondary w-full sm:w-auto"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  )
} 