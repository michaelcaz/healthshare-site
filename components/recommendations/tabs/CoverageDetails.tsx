import { type PlanRecommendation } from '../types'
import { DollarSign, Globe, CheckCircle } from 'lucide-react'
import React from 'react'
import { getPlanCost } from '@/lib/utils/plan-costs'
import { planDetailsData } from '@/data/plan-details-data'
import { defaultPlanDetailsData } from '@/types/plan-details'
import { calculateAnnualCost, getVisitFrequencyCost } from '@/utils/plan-utils'
import { markdownToBold } from '@/lib/utils'

interface CoverageDetailsProps {
  plan: PlanRecommendation
  age?: number
  coverageType?: string
  iuaPreference?: string
  visitFrequency?: string
}

export const CoverageDetails: React.FC<CoverageDetailsProps> = ({ 
  plan,
  age = 35,
  coverageType = 'just_me',
  iuaPreference = '2500',
  visitFrequency = 'just_checkups'
}) => {
  // Get plan-specific details or fall back to default data
  const planData = planDetailsData[plan.plan.id] || defaultPlanDetailsData;
  
  // Get costs using the getPlanCost function
  const costs = getPlanCost(
    plan.plan.id,
    age,
    coverageType as any,
    iuaPreference
  );
  
  const monthlyPremium = costs?.monthlyPremium || 0;
  const initialUnsharedAmount = costs?.initialUnsharedAmount || 0;
  
  // Get expected healthcare costs based on visit frequency and coverage type
  const visitFrequencyCost = getVisitFrequencyCost(visitFrequency, coverageType);
  
  // Calculate annual cost including visit frequency using the centralized function
  const isDpcPlan = plan.plan.id.includes('dpc') || plan.plan.id.includes('vpc');
  const estimatedAnnualCost = calculateAnnualCost(
    monthlyPremium,
    initialUnsharedAmount,
    visitFrequency,
    coverageType,
    isDpcPlan,
    'CoverageDetails'
  );

  return (
    <div className="space-y-8">
      {/* Initial Unshared Amount (IUA) */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Initial Unshared Amount (IUA)</h3>
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
          <DollarSign className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium">How Your IUA Works</div>
            <div className="text-sm text-gray-600 mt-1">
              <p className="mb-2" dangerouslySetInnerHTML={{ __html: markdownToBold(planData.coverageDetails.iuaExplanation) }}></p>
            </div>
          </div>
        </div>
      </section>

      {/* What's the network? */}
      <section>
        <h3 className="text-xl font-semibold mb-4">What's The Network?</h3>
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
          <Globe className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium">{plan.plan.providerName} Network</div>
            <div className="text-sm text-gray-600 mt-1">
              <p className="mb-2" dangerouslySetInnerHTML={{ __html: markdownToBold(planData.coverageDetails.networkInfo) }}></p>
            </div>
          </div>
        </div>
      </section>

      {/* Included for Free */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Included For Free</h3>
        <div className="grid gap-4">
          {planData.coverageDetails.includedServices.map((service, index) => (
            <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium">{service.title}</div>
                <div className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: markdownToBold(service.description) }}>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Features */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Key Features</h3>
        <div className="bg-blue-50 p-4 rounded-lg">
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {planData.overview.keyFeatures.map((feature, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: markdownToBold(feature) }}></li>
            ))}
          </ul>
        </div>
      </section>

      {/* Estimated Annual Cost */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Estimated Annual Cost</h3>
        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <DollarSign className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium">Your Estimated Costs</div>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="text-sm text-gray-600">Monthly Premium</div>
                <div className="text-xl font-bold text-blue-600">${monthlyPremium.toLocaleString()}</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="text-sm text-gray-600">Initial Unshared Amount</div>
                <div className="text-xl font-bold text-blue-600">${initialUnsharedAmount.toLocaleString()}</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="text-sm text-gray-600">Estimated Annual Total</div>
                <div className="text-xl font-bold text-blue-600">${estimatedAnnualCost.toLocaleString()}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {isDpcPlan 
                    ? "Monthly premium × 12 + visit costs + DPC membership"
                    : "Monthly premium × 12 + visit costs"}
                </div>
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              <p>Based on {age} years old, {coverageType === 'just_me' ? 'individual' : 'family'} coverage with ${initialUnsharedAmount} IUA</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 