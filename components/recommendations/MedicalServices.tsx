import { type PlanRecommendation } from './types'
import { CheckCircle, XCircle, Shield, DollarSign } from 'lucide-react'
import React from 'react'

interface MedicalServicesProps {
  plan: PlanRecommendation
}

export const MedicalServices: React.FC<MedicalServicesProps> = ({ plan }) => {
  return (
    <div className="space-y-8 p-6">
      {/* Coverage Limits */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Coverage Details</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Maximum Coverage</div>
            <div className="text-xl font-bold text-blue-600">{plan.plan.maxCoverage}</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Annual Unshared Amount</div>
            <div className="text-xl font-bold text-blue-600">{plan.plan.annualUnsharedAmount}</div>
          </div>
        </div>
      </section>

      {/* Provider Information */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Provider Information</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <div className="font-medium">{plan.plan.providerName}</div>
              <div className="text-sm text-gray-600">
                <a 
                  href={plan.plan.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Provider Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Structure */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Cost Structure</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <DollarSign className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <div className="font-medium">Annual Unshared Amount Structure</div>
              <div className="text-sm text-gray-600">
                {plan.plan.annualUnsharedAmount}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 