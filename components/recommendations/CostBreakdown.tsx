import { type PlanRecommendation } from './types'
import { CheckCircle } from 'lucide-react'
import React from 'react'

interface CostBreakdownProps {
  plan: PlanRecommendation
}

export const CostBreakdown: React.FC<CostBreakdownProps> = ({ plan }) => {
  console.log('CostBreakdown plan:', JSON.stringify(plan, null, 2));
  return (
    <div className="space-y-8">
      {/* Monthly Costs */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Monthly Costs</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Monthly Premium</div>
            <div className="text-3xl font-bold text-blue-600">${plan.plan.monthly_cost}</div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Per-Incident Cost</div>
            <div className="text-3xl font-bold text-blue-600">${plan.plan.incident_cost}</div>
          </div>
        </div>
      </section>

      {/* Why This Plan Matches You */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Why We Chose This For You</h3>
        <div className="space-y-3">
          {plan.factors.map((factor, index) => (
            <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <div className="font-medium">{factor.factor}</div>
                <div className="text-sm text-gray-600">
                  Impact: {factor.impact}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Coverage Highlights */}
      {plan.coverage_highlights && (
        <section>
          <h3 className="text-xl font-semibold mb-4">Coverage Highlights</h3>
          <div className="grid gap-4">
            {plan.coverage_highlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <div className="font-medium">{highlight.title}</div>
                  <div className="text-sm text-gray-600">{highlight.description}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
} 