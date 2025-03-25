import { type PlanRecommendation } from './types'
import { CheckCircle, Clock } from 'lucide-react'
import React from 'react'

interface CoverageTimelineProps {
  plan: PlanRecommendation
}

export const CoverageTimeline: React.FC<CoverageTimelineProps> = ({ plan }) => {
  return (
    <div className="space-y-8 p-6">
      {/* Immediate Coverage */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Available Immediately</h3>
        <div className="grid gap-4">
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <div className="font-medium">Initial Unshared Amount (IUA)</div>
              <div className="text-sm text-gray-600">
                {plan.plan.annualUnsharedAmount}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <div className="font-medium">Maximum Coverage</div>
              <div className="text-sm text-gray-600">
                {plan.plan.maxCoverage}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plan Details */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Plan Details</h3>
        <div className="grid gap-4">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <div className="font-medium">Provider Network</div>
              <div className="text-sm text-gray-600">
                {plan.plan.providerName} Network
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <div className="font-medium">Plan Type</div>
              <div className="text-sm text-gray-600">
                {plan.plan.planName}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
            <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <div className="font-medium">Learn More</div>
              <div className="text-sm text-gray-600">
                Additional information about your coverage timeline may be available in the plan guidelines.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 