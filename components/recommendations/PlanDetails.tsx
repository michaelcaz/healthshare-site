import { type PlanRecommendation } from './types'
import { Building, Shield, DollarSign } from 'lucide-react'
import React from 'react'

interface PlanDetailsProps {
  plan: PlanRecommendation
}

export const PlanDetails: React.FC<PlanDetailsProps> = ({ plan }) => {
  // Get representative costs (middle tier, single member, 30-39 age bracket)
  const representativeCosts = plan.plan.planMatrix
    .find(matrix => matrix.ageBracket === '30-39' && matrix.householdType === 'Member Only')
    ?.costs.find(cost => cost.initialUnsharedAmount === 2500)
    
  console.log('PlanDetails rendering for plan:', plan.plan.id);
  console.log('Plan data:', JSON.stringify(plan.plan, null, 2));
  console.log('Representative costs:', representativeCosts);
  
  // Special logging for CrowdHealth plans
  if (plan.plan.id.includes('crowdhealth')) {
    console.log('CrowdHealth plan detected, checking all matrices:');
    plan.plan.planMatrix.forEach((matrix, i) => {
      console.log(`Matrix ${i}: ${matrix.ageBracket}/${matrix.householdType}`);
      console.log('Costs:', matrix.costs);
    });
  }

  return (
    <div className="space-y-8 p-6">
      {/* Provider Information */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Provider Information</h3>
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
          <Building className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <div className="font-medium">{plan.plan.providerName}</div>
            <div className="text-sm text-gray-600">
              Plan Name: {plan.plan.planName}
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Details */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Coverage Details</h3>
        <div className="grid gap-4">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <div className="font-medium">Maximum Coverage</div>
              <div className="text-sm text-gray-600">
                {plan.plan.maxCoverage}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
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
            <DollarSign className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <div className="font-medium">Monthly Premium</div>
              <div className="text-sm text-gray-600">
                ${representativeCosts?.monthlyPremium.toLocaleString()} (based on 30-39 age bracket, single member)
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <DollarSign className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <div className="font-medium">Initial Unshared Amount</div>
              <div className="text-sm text-gray-600">
                ${representativeCosts?.initialUnsharedAmount.toLocaleString()} per incident
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 