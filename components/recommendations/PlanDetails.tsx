import { type PlanRecommendation } from './types'
import { Building, Shield, DollarSign, Info } from 'lucide-react'
import React from 'react'
import { getPlanCost } from '@/lib/utils/plan-costs'

interface PlanDetailsProps {
  plan: PlanRecommendation
  age?: number
  coverageType?: string
  iuaPreference?: string
}

export const PlanDetails: React.FC<PlanDetailsProps> = ({ 
  plan,
  age = 35, // Default to middle of 30-39 range
  coverageType = 'just_me', // Default to single coverage
  iuaPreference = '2500' // Default to middle IUA tier
}) => {
  console.log('PlanDetails rendering for plan:', plan.plan.id);
  console.log('Plan data:', JSON.stringify(plan.plan, null, 2));
  
  // Use the same getPlanCost function that the hero component uses
  const costs = getPlanCost(
    plan.plan.id,
    age,
    coverageType as any,
    iuaPreference
  );
  
  console.log('Costs from getPlanCost:', costs);
  
  // Special logging for CrowdHealth plans
  if (plan.plan.id.includes('crowdhealth')) {
    console.log('CrowdHealth plan detected, checking all matrices:');
    plan.plan.planMatrix.forEach((matrix, i) => {
      console.log(`Matrix ${i}: ${matrix.ageBracket}/${matrix.householdType}`);
      console.log('Costs:', matrix.costs);
    });
  }

  return (
    <div className="space-y-8">
      {/* Provider Information */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Provider Information</h3>
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
          <Building className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium">{plan.plan.providerName}</div>
            <div className="text-sm text-gray-600">
              Plan Name: {plan.plan.planName}
            </div>
            {plan.plan.sourceUrl && (
              <a 
                href={plan.plan.sourceUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline mt-1 inline-block"
              >
                Visit Provider Website
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Coverage Details */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Coverage Details</h3>
        <div className="grid gap-4">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <Shield className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium">Maximum Coverage</div>
              <div className="text-sm text-gray-600">
                {plan.plan.maxCoverage}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <Shield className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium">Annual Unshared Amount</div>
              <div className="text-sm text-gray-600">
                {plan.plan.annualUnsharedAmount}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Information */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Representative Costs</h3>
        <div className="grid gap-4">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <DollarSign className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium">Monthly Premium</div>
              <div className="text-sm text-gray-600">
                {costs?.monthlyPremium ? 
                  `$${costs.monthlyPremium.toLocaleString()}` :
                  `Varies based on age and household size`
                }
                <span className="block text-xs text-gray-500 mt-1">
                  Based on {age} years old, {coverageType === 'just_me' ? 'individual' : 'family'} coverage
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <DollarSign className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium">Initial Unshared Amount</div>
              <div className="text-sm text-gray-600">
                {costs?.initialUnsharedAmount ? 
                  `$${costs.initialUnsharedAmount.toLocaleString()} per incident` :
                  `Varies based on selected plan tier`
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
          <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium">Why This Plan Matches Your Needs</div>
            <div className="text-sm text-gray-600 mt-1">
              <ul className="list-disc pl-5 space-y-1">
                {plan.explanation.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 