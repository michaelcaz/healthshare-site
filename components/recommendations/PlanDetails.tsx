import { type PlanRecommendation } from './types'
import { Building, Shield } from 'lucide-react'
import React from 'react'

interface PlanDetailsProps {
  plan: PlanRecommendation
}

export const PlanDetails: React.FC<PlanDetailsProps> = ({ plan }) => {
  return (
    <div className="space-y-8 p-6">
      {/* Provider Information */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Provider Information</h3>
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
          <Building className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <div className="font-medium">{plan.plan.provider}</div>
            <div className="text-sm text-gray-600">
              Plan Name: {plan.plan.name}
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Maximums */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Coverage Maximums</h3>
        <div className="grid gap-4">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <div className="font-medium">Annual Maximum</div>
              <div className="text-sm text-gray-600">
                ${plan.plan.annual_maximum.toLocaleString()} per year
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <div className="font-medium">Per-Incident Maximum</div>
              <div className="text-sm text-gray-600">
                ${plan.plan.per_incident_maximum.toLocaleString()} per incident
              </div>
            </div>
          </div>
          {plan.plan.lifetime_maximum && (
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <div className="font-medium">Lifetime Maximum</div>
                <div className="text-sm text-gray-600">
                  ${plan.plan.lifetime_maximum.toLocaleString()}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
} 