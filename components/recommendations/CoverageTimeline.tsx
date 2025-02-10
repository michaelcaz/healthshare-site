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
              <div className="font-medium">Preventive Care & Wellness</div>
              <div className="text-sm text-gray-600">
                Annual physicals, wellness visits, and preventive services
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waiting Periods */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Waiting Periods</h3>
        <div className="grid gap-4">
          {plan.plan.pre_existing_waiting_period > 0 && (
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <div className="font-medium">Pre-existing Conditions</div>
                <div className="text-sm text-gray-600">
                  {plan.plan.pre_existing_waiting_period} months waiting period
                </div>
              </div>
            </div>
          )}
          
          {plan.plan.maternity_coverage && plan.plan.maternity_waiting_period && (
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <div className="font-medium">Maternity Coverage</div>
                <div className="text-sm text-gray-600">
                  {plan.plan.maternity_waiting_period} months waiting period
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
} 