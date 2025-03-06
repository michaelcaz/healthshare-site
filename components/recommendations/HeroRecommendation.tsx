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
    <div className="max-w-3xl mx-auto">
      <div className="hero-results-card">
        {/* Match Score Badge - More prominent */}
        <div className="absolute top-6 right-6 flex items-center gap-2 bg-gradient-primary text-white px-6 py-3 rounded-full transform hover:scale-105 transition-transform">
          <Star className="w-5 h-5" />
          <span className="font-semibold">{badges.matchScore}% Match</span>
        </div>

        {/* Plan Name and Provider */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-warm">{plan.planName}</h2>
          <p className="text-lg text-gray-600">{plan.providerName}</p>
        </div>

        {/* Cost Information */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Monthly Cost</div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-warm">${costs.monthlyPremium}</span>
              <span className="text-gray-600 ml-1">/mo</span>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Initial Unshared Amount</div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-warm">${costs.initialUnsharedAmount}</span>
              <span className="text-gray-600 ml-1">/year</span>
            </div>
          </div>
        </div>

        {/* Key Coverage Points */}
        <div className="space-y-4 mb-8">
          {keyCoveragePoints.map((point, index) => (
            <div key={index} className="flex items-center gap-3">
              {point.icon}
              <span className={cn(
                "text-gray-700",
                point.isPositive ? "text-green-700" : "text-red-700"
              )}>
                {point.text}
              </span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={onGetPlan}
            disabled={isLoading}
            variant="primary"
            showArrow
            className="flex-1"
          >
            Get This Plan
          </Button>
          <Button
            onClick={onViewDetails}
            disabled={isLoading}
            variant="secondary"
            className="flex-1"
          >
            View Details
          </Button>
        </div>

        {/* Top Reason Badge */}
        <div className="mt-6 inline-flex items-center gap-2 bg-primary-light bg-opacity-10 text-primary px-4 py-2 rounded-full">
          <CheckCircle className="w-4 h-4" />
          <span className="font-medium">{badges.topReason}</span>
        </div>
      </div>
    </div>
  )
} 