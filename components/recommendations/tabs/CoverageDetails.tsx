import { type PlanRecommendation } from '../types'
import { DollarSign, Globe, CheckCircle } from 'lucide-react'
import React from 'react'
import { getPlanCost } from '@/lib/utils/plan-costs'
import { planDetailsData } from '@/data/plan-details-data'
import { defaultPlanDetailsData } from '@/types/plan-details'

interface CoverageDetailsProps {
  plan: PlanRecommendation
  age?: number
  coverageType?: string
  iuaPreference?: string
}

export const CoverageDetails: React.FC<CoverageDetailsProps> = ({ 
  plan,
  age = 35,
  coverageType = 'just_me',
  iuaPreference = '2500'
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
  
  const initialUnsharedAmount = costs?.initialUnsharedAmount || 0;

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
              <p className="mb-2">Your Initial Unshared Amount is ${initialUnsharedAmount.toLocaleString()} per incident.</p>
              <p className="mb-2">{planData.coverageDetails.iuaExplanation}</p>
              <p>Annual Unshared Amount Structure: {plan.plan.annualUnsharedAmount}</p>
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
              <p className="mb-2">{planData.coverageDetails.networkInfo}</p>
              <p>
                <a 
                  href={plan.plan.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Learn more about {plan.plan.providerName}'s provider options
                </a>
              </p>
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
                <div className="text-sm text-gray-600">
                  {service.description}
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
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
} 