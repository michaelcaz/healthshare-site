import { type PlanRecommendation, type PlanCosts, type RecommendationBadges } from './types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  Shield, 
  Star, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  Info, 
  Users, 
  TrendingUp,
  Calendar,
  Award
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface HeroRecommendationProps {
  recommendation: PlanRecommendation
  badges: RecommendationBadges
  costs: PlanCosts
  onViewDetails: () => void
  onGetPlan: () => void
  isLoading?: boolean
  showMaternityNotice?: boolean
  showPreExistingNotice?: boolean
}

interface KeyCoveragePoint {
  icon: React.ReactNode
  text: string
  isPositive: boolean
  tooltip?: string
}

export function HeroRecommendation({ 
  recommendation, 
  badges, 
  costs,
  onViewDetails,
  onGetPlan,
  isLoading = false,
  showMaternityNotice = false,
  showPreExistingNotice = false
}: HeroRecommendationProps) {
  const { plan, score } = recommendation

  const keyCoveragePoints: KeyCoveragePoint[] = [
    {
      text: `Maximum Coverage: ${plan.maxCoverage}`,
      isPositive: true,
      icon: <Shield className="text-primary" />,
      tooltip: "The maximum amount that can be shared for eligible medical expenses"
    },
    {
      text: `Annual Unshared Amount: ${plan.annualUnsharedAmount}`,
      isPositive: true,
      icon: <DollarSign className="text-primary" />,
      tooltip: "The amount you're responsible for before the community begins sharing your eligible medical expenses"
    },
    {
      text: "Processing time: 3-5 business days",
      isPositive: true,
      icon: <Clock className="text-primary" />,
      tooltip: "Average time to process eligible medical expenses for sharing"
    }
  ]

  // Calculate estimated savings vs traditional insurance
  const traditionalInsuranceCost = costs.monthlyPremium * 1.65; // Estimated 65% higher
  const monthlySavings = traditionalInsuranceCost - costs.monthlyPremium;
  const annualSavings = monthlySavings * 12;

  return (
    <TooltipProvider>
      <div className="max-w-4xl mx-auto fade-in">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 relative overflow-hidden">
          {/* Top Reason Badge */}
          <div className="absolute top-4 left-4 bg-primary-light/10 text-primary-dark px-4 py-2 rounded-full text-sm font-medium">
            {badges.topReason}
          </div>
          
          {/* Match Score Badge - More prominent */}
          <div className="absolute top-4 right-4 bg-primary px-4 py-2 rounded-full flex items-center gap-2">
            <Award className="h-4 w-4 text-white" />
            <span className="text-white font-bold">{badges.matchScore}% Match</span>
          </div>

          {/* Maternity Notice Banner */}
          {showMaternityNotice && (
            <div className="bg-amber-50 -mx-8 mt-12 mb-2 py-3 px-8 border-y border-amber-200">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-amber-600" />
                <p className="text-amber-800 font-medium">
                  <span className="font-bold">Important:</span> All health sharing plans have waiting periods for maternity coverage. 
                  Please check the specific waiting period for this plan before enrolling.
                </p>
              </div>
            </div>
          )}

          {/* Pre-existing Conditions Notice Banner */}
          {showPreExistingNotice && (
            <div className="bg-amber-50 -mx-8 mt-12 mb-2 py-3 px-8 border-y border-amber-200">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-amber-600" />
                <p className="text-amber-800 font-medium">
                  <span className="font-bold">Important:</span> Pre-existing conditions are not eligible for sharing during the first year 
                  of membership in all health sharing plans. Please review the plan details for more information.
                </p>
              </div>
            </div>
          )}

          {/* Social Proof Banner */}
          <div className="bg-blue-50 -mx-8 mt-12 mb-8 py-3 px-8 flex flex-wrap justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    className="h-4 w-4 text-yellow-400"
                    fill="currentColor"
                  />
                ))}
              </div>
              <span className="font-medium text-sm">4.8/5</span>
              <span className="text-sm text-gray-600">(246 reviews)</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">2M+ Active Members</span>
              <TrendingUp className="h-3 w-3 text-green-500" />
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="text-sm">Est. 2010</span>
            </div>
          </div>

          {/* Plan Name and Provider */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">{plan.planName}</h2>
            <p className="text-lg text-gray-600">{plan.providerName}</p>
          </div>

          {/* Cost Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-sm text-gray-600 mb-2">Monthly Cost</div>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-primary-dark">${costs.monthlyPremium}</span>
                <span className="text-gray-600 ml-2">/mo</span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                <span>Initial Unshared Amount (IUA)</span>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3.5 w-3.5 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>The Initial Unshared Amount (IUA) is similar to a deductible in traditional insurance. It's the amount you pay before the community begins sharing your eligible medical expenses.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-primary-dark">${costs.initialUnsharedAmount}</span>
                <span className="text-gray-600 ml-2">/year</span>
              </div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-green-100">
              <div className="text-sm text-green-700 mb-2">Estimated Annual Savings</div>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-green-600">${annualSavings.toFixed(0)}</span>
                <span className="text-green-700 ml-2">/year</span>
              </div>
              <p className="text-xs text-green-600 mt-1">vs. traditional insurance</p>
            </div>
          </div>

          {/* Key Coverage Points */}
          <div className="space-y-5 mb-8 bg-white p-6 rounded-xl border border-gray-100">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">Key Plan Features</h3>
            {keyCoveragePoints.map((point, index) => (
              <div key={index} className="flex items-center gap-4 group">
                <div className="p-2 rounded-full bg-primary-light/10 group-hover:bg-primary-light/20 transition-colors">
                  {point.icon}
                </div>
                <div className="flex items-center gap-1">
                  <span className={cn(
                    "text-gray-700 font-medium",
                    point.isPositive ? "text-gray-800" : "text-gray-700"
                  )}>
                    {point.text}
                  </span>
                  {point.tooltip && (
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3.5 w-3.5 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>{point.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Member Satisfaction */}
          <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">98% Member Satisfaction</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onGetPlan}
              disabled={isLoading}
              className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all w-full sm:w-auto text-base"
            >
              Get This Plan
            </Button>
            <Button
              onClick={onViewDetails}
              disabled={isLoading}
              className="bg-white hover:bg-gray-50 text-primary border border-primary font-medium py-3 px-6 rounded-lg transition-colors w-full sm:w-auto text-base"
              variant="outline"
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
} 