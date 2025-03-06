'use client'

import { useState } from 'react'
import { EnhancedButton } from '@/components/ui/enhanced-button'
import { Check, Info } from 'lucide-react'
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { Badge } from '@/components/ui/badge'

interface PlanFeature {
  name: string
  description?: string
  included: boolean
}

interface PlanCardProps {
  planName: string
  providerName: string
  monthlyPrice: number
  annualPrice?: number
  initialUnsharedAmount: number
  matchPercentage?: number
  topReason?: string
  features: PlanFeature[]
  onViewDetails: () => void
  onGetPlan: () => void
  isLoading?: boolean
  isRecommended?: boolean
}

export function PlanCard({
  planName,
  providerName,
  monthlyPrice,
  annualPrice,
  initialUnsharedAmount,
  matchPercentage,
  topReason,
  features,
  onViewDetails,
  onGetPlan,
  isLoading = false,
  isRecommended = false
}: PlanCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div 
      className="plan-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Match Percentage Badge */}
      {matchPercentage && (
        <div className="match-score-badge">
          <AnimatedCounter 
            value={matchPercentage} 
            duration={2000} 
            formatter={(val) => `${val}%`}
          />
        </div>
      )}
      
      {/* Recommended Badge */}
      {isRecommended && (
        <Badge className="absolute top-4 left-4 bg-primary bg-opacity-10 text-primary">
          Recommended
        </Badge>
      )}
      
      <div className="plan-card-header">
        <div>
          <h3 className="plan-card-title">{planName}</h3>
          <p className="plan-card-provider">{providerName}</p>
          
          {topReason && (
            <Badge variant="outline" className="mt-2">
              {topReason}
            </Badge>
          )}
        </div>
      </div>
      
      <div className="mt-6 space-y-4">
        {/* Monthly Price */}
        <div>
          <p className="plan-card-price-label">Monthly Contribution</p>
          <p className="plan-card-price">
            ${monthlyPrice}
            <span className="text-sm text-gray-500 font-normal">/mo</span>
          </p>
        </div>
        
        {/* Initial Unshared Amount */}
        <div>
          <div className="flex items-center">
            <p className="plan-card-price-label">Initial Unshared Amount</p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-gray-400 ml-1" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-sm">
                    The amount you pay before the healthshare begins to share in your medical expenses.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="plan-card-price">${initialUnsharedAmount}</p>
        </div>
      </div>
      
      {/* Features */}
      <div className="plan-card-features">
        {features.slice(0, 4).map((feature, index) => (
          <div key={index} className="plan-card-feature">
            <Check className={`plan-card-feature-icon ${!feature.included ? 'text-gray-300' : ''}`} />
            <div className="plan-card-feature-text">
              <span className={!feature.included ? 'text-gray-400' : ''}>
                {feature.name}
              </span>
              {feature.description && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-gray-400 ml-1 inline" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-sm">{feature.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Buttons */}
      <div className="mt-6 space-y-3">
        <EnhancedButton
          variant="primary"
          onClick={onGetPlan}
          isLoading={isLoading}
          showArrow={true}
          className="w-full"
        >
          Get This Plan
        </EnhancedButton>
        
        <EnhancedButton
          variant="secondary"
          onClick={onViewDetails}
          className="w-full"
        >
          View Details
        </EnhancedButton>
      </div>
    </div>
  )
} 