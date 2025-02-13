import { type PlanRecommendation } from './types'
import { CheckCircle } from 'lucide-react'
import React from 'react'

interface CostBreakdownProps {
  plan: PlanRecommendation
}

export const CostBreakdown: React.FC<CostBreakdownProps> = ({ plan }) => {
  // Get the middle cost option (2500 IUA) for a single member in the 30-39 age bracket
  const representativeCosts = plan.plan.planMatrix
    .find(matrix => matrix.ageBracket === '30-39' && matrix.householdType === 'Member Only')
    ?.costs.find(cost => cost.initialUnsharedAmount === 2500)

  const monthlyPremium = representativeCosts?.monthlyPremium || 0
  const initialUnsharedAmount = representativeCosts?.initialUnsharedAmount || 0

  return (
    <div className="space-y-8">
      {/* Monthly Costs */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Monthly Costs</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Monthly Premium</div>
            <div className="text-3xl font-bold text-blue-600">${monthlyPremium}</div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Initial Unshared Amount</div>
            <div className="text-3xl font-bold text-blue-600">${initialUnsharedAmount}</div>
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
                  Impact: {Math.round(factor.impact)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Coverage Highlights */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Coverage Highlights</h3>
        <div className="grid gap-4">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <div className="font-medium">Maximum Coverage</div>
              <div className="text-sm text-gray-600">{plan.plan.maxCoverage}</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <div className="font-medium">Annual Unshared Amount</div>
              <div className="text-sm text-gray-600">{plan.plan.annualUnsharedAmount}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 