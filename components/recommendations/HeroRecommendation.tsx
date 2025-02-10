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
      text: plan.maternity_coverage ? "Maternity Coverage Included" : "No Maternity Coverage",
      isPositive: plan.maternity_coverage,
      icon: plan.maternity_coverage ? <Check className="text-green-500" /> : <X className="text-red-500" />
    },
    {
      text: `Pre-existing Conditions: ${plan.pre_existing_waiting_period} month wait`,
      isPositive: plan.pre_existing_waiting_period <= 12,
      icon: <AlertCircle className={plan.pre_existing_waiting_period <= 12 ? "text-blue-500" : "text-amber-500"} />
    }
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative bg-white rounded-xl p-8 shadow-lg border border-blue-100 overflow-hidden">
        {/* Match Score Badge - More prominent */}
        <div className="absolute top-6 right-6 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full transform hover:scale-105 transition-transform">
          <Star className="h-5 w-5 fill-current" />
          <span className="text-xl font-bold">{Math.round(score)}% Match</span>
        </div>

        {/* Plan Name and Provider */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{plan.name}</h2>
          <p className="text-gray-600">{plan.provider}</p>
        </div>

        {/* Cost Comparison */}
        <div className="grid grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">Monthly Cost</h3>
            <div className="text-5xl font-bold text-blue-600">${costs.monthly}</div>
          </div>
          
          <div>
            <div className="group relative">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-1">
                IUA
                <span className="cursor-help text-gray-500 hover:text-blue-600 transition-colors">ⓘ
                  <div className="invisible group-hover:visible absolute z-10 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg -right-2 top-6">
                    Initial Unshared Amount - the portion you pay before the healthshare begins covering eligible expenses
                  </div>
                </span>
              </h3>
              <div className="text-5xl font-bold text-blue-600">${costs.incident}</div>
            </div>
          </div>
        </div>

        {/* Why This Matches You */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Why This Matches You</h3>
          <div className="grid grid-cols-2 gap-4">
            {recommendation.factors.slice(0, 4).map((factor, i) => (
              <div 
                key={i} 
                className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-blue-900">{factor.factor}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex gap-4">
          <button
            onClick={onGetPlan}
            disabled={isLoading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transform hover:scale-105 transition-all duration-200"
          >
            Get This Plan
          </button>
          <button
            onClick={onViewDetails}
            disabled={isLoading}
            className="flex-1 border-2 border-gray-200 hover:border-blue-200 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold transform hover:scale-105 transition-all duration-200"
          >
            View Details
          </button>
        </div>

        {/* Social Proof */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            🔥 <span className="font-medium">2,453 members</span> enrolled this month
          </p>
        </div>
      </div>
    </div>
  )
} 