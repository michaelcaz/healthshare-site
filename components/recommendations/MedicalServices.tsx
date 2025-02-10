import { type PlanRecommendation } from './types'
import { CheckCircle, XCircle } from 'lucide-react'
import React from 'react'

interface MedicalServicesProps {
  plan: PlanRecommendation
}

export const MedicalServices: React.FC<MedicalServicesProps> = ({ plan }) => {
  return (
    <div className="space-y-8 p-6">
      {/* Coverage Limits */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Coverage Limits</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Annual Maximum</div>
            <div className="text-3xl font-bold text-blue-600">${plan.plan.annual_maximum.toLocaleString()}</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Per-Incident Maximum</div>
            <div className="text-3xl font-bold text-blue-600">${plan.plan.per_incident_maximum.toLocaleString()}</div>
          </div>
        </div>
      </section>

      {/* Pre-existing Conditions */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Pre-existing Conditions</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            {plan.plan.pre_existing_waiting_period > 0 ? (
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
            )}
            <div>
              <div className="font-medium">Waiting Period</div>
              <div className="text-sm text-gray-600">
                {plan.plan.pre_existing_waiting_period} months before coverage begins
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Maternity Coverage */}
      {plan.plan.maternity_coverage && (
        <section>
          <h3 className="text-xl font-semibold mb-4">Maternity Coverage</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <div className="font-medium">Waiting Period</div>
                <div className="text-sm text-gray-600">
                  {plan.plan.maternity_waiting_period} months before coverage begins
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
} 