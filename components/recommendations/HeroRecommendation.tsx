import { type PlanRecommendation, type PlanCosts, type RecommendationBadges } from './types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  Star, 
  CheckCircle, 
  Info, 
  Users, 
  TrendingUp,
  Calendar,
  Award,
  Building
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import Image from 'next/image'
import { ProviderLogo } from './ProviderLogo'

interface HeroRecommendationProps {
  recommendation: PlanRecommendation
  badges: RecommendationBadges
  costs: PlanCosts
  onViewDetails: () => void
  onGetPlan: () => void
  isLoading?: boolean
  showPreExistingNotice?: boolean
  isDpcCompatible?: boolean
}

// Add this CSS class for the dotted underline tooltips
const tooltipStyle = "border-b border-dotted border-gray-600 cursor-help";

export function HeroRecommendation({ 
  recommendation, 
  badges, 
  costs,
  onViewDetails,
  onGetPlan,
  isLoading = false,
  showPreExistingNotice = false,
  isDpcCompatible = false
}: HeroRecommendationProps) {
  const { plan, score } = recommendation

  // Calculate estimated savings vs traditional insurance
  const traditionalInsuranceCost = costs.monthlyPremium * 1.65; // Estimated 65% higher
  const monthlySavings = traditionalInsuranceCost - costs.monthlyPremium;
  const annualSavings = monthlySavings * 12;
  const annualCost = costs.monthlyPremium * 12;

  // Determine if this plan has the lowest monthly payment
  const hasLowestMonthlyPayment = badges.topReason === "Monthly Cost";
  
  // Determine if this plan has the lowest out-of-pocket in case of emergency
  const hasLowestOutOfPocket = badges.topReason === "Incident Cost";

  return (
    <TooltipProvider>
      <div className="max-w-4xl mx-auto fade-in">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 relative overflow-hidden">
          {/* Top Recommendation Banner - Redesigned */}
          <div className="absolute left-0 top-6 z-10">
            <div className="bg-primary text-white font-medium py-1.5 px-4 rounded-r-md flex items-center">
              <Award className="h-3.5 w-3.5 mr-1.5" />
              <span>Top Recommendation</span>
            </div>
            <div className="mt-1 bg-primary-light text-primary-dark py-1.5 px-4 rounded-r-md text-xs font-medium">
              {hasLowestMonthlyPayment 
                ? "Lowest Monthly Payment" 
                : "Lowest Out of Pocket in Case of Emergency"}
            </div>
          </div>
          
          {/* Match Score Badge - More prominent */}
          <div className="absolute top-4 right-4 bg-primary px-4 py-2 rounded-full flex items-center gap-2">
            <Award className="h-4 w-4 text-white" />
            <span className="text-white font-bold">{badges.matchScore}% Match</span>
          </div>

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

          {/* Plan Logo, Name and Provider */}
          <div className="mb-8 flex items-center">
            <div className="mr-4 flex-shrink-0">
              <ProviderLogo providerName={plan.providerName} size="lg" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {plan.providerName} {plan.planName}
              </h2>
              
              {/* Feature badges */}
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <span className={tooltipStyle} title="You can see any provider you want. These plans encourage you to seek providers with fair prices to keep costs reasonable for everyone.">
                    No Network
                  </span>
                </div>
                
                {isDpcCompatible && (
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <span className={tooltipStyle} title="This plan works well with Direct Primary Care memberships, which provide unlimited access to a primary care doctor for a low monthly fee.">
                      DPC Compatible
                    </span>
                  </div>
                )}
              </div>
            </div>
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
                <span className={tooltipStyle} title="The Initial Unshared Amount (IUA) is similar to a deductible in traditional insurance. It's the amount you pay before the community begins sharing your eligible medical expenses.">
                  <Info className="h-3.5 w-3.5 text-gray-400" />
                </span>
              </div>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-primary-dark">${costs.initialUnsharedAmount}</span>
                <span className="text-gray-600 ml-2">/year</span>
              </div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-green-100">
              <div className="text-sm text-green-700 mb-2">Your Estimated Annual Cost</div>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-green-600">${annualCost.toFixed(0)}</span>
                <span className="text-green-700 ml-2">/year</span>
              </div>
              <p className="text-xs text-green-600 mt-1">Save ${annualSavings.toFixed(0)} vs. traditional insurance</p>
            </div>
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