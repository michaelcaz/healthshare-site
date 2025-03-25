import { type PlanRecommendation } from '../types'
import { Info, Building, CreditCard, Heart } from 'lucide-react'
import React from 'react'
import { getPlanCost } from '@/lib/utils/plan-costs'
import { calculateAnnualCost, getVisitFrequencyCost } from '@/utils/plan-utils'
import { planDetailsData } from '@/data/plan-details-data'
import { defaultPlanDetailsData } from '@/types/plan-details'
import { markdownToBold } from '@/lib/utils'

interface OverviewProps {
  plan: PlanRecommendation
  age?: number
  coverageType?: string
  iuaPreference?: string
  visitFrequency?: string
}

export const Overview: React.FC<OverviewProps> = ({ 
  plan,
  age = 35,
  coverageType = 'just_me',
  iuaPreference = '2500',
  visitFrequency = 'just_checkups'
}) => {
  // Get plan-specific details or fall back to default data
  const planData = planDetailsData[plan.plan.id] || defaultPlanDetailsData;
  
  // Enhanced debug logs
  console.log('Overview Component - Plan ID:', plan.plan.id);
  console.log('Overview Component - Provider Name:', plan.plan.providerName);
  console.log('Overview Component - Plan Name:', plan.plan.planName);
  console.log('Overview Component - Available Plan Detail Keys:', Object.keys(planDetailsData));
  console.log('Overview Component - Plan Data Found:', !!planDetailsData[plan.plan.id]);
  
  // Get costs using the getPlanCost function
  const costs = getPlanCost(
    plan.plan.id,
    age,
    coverageType as any,
    iuaPreference
  );
  
  // Calculate estimated annual cost
  const monthlyPremium = costs?.monthlyPremium || 0;
  const initialUnsharedAmount = costs?.initialUnsharedAmount || 0;
  
  // Get expected healthcare costs based on visit frequency and coverage type
  console.log('Overview - Visit Frequency:', visitFrequency);
  console.log('Overview - Coverage Type:', coverageType);
  
  // Log the visit frequency cost separately for debugging
  const visitFrequencyCost = getVisitFrequencyCost(visitFrequency, coverageType);
  console.log('Overview - Visit Frequency Cost:', visitFrequencyCost);
  
  // Calculate annual cost including visit frequency using the centralized function
  const isDpcPlan = plan.plan.id.includes('dpc') || plan.plan.id.includes('vpc');
  const estimatedAnnualCost = calculateAnnualCost(
    monthlyPremium,
    initialUnsharedAmount,
    visitFrequency,
    coverageType,
    isDpcPlan,
    'Overview'
  );
  
  // Log the annual cost components for debugging
  console.log('Overview - Annual Cost Components:', {
    monthlyPremium,
    annualPremium: monthlyPremium * 12,
    visitFrequencyCost,
    dpcCost: isDpcPlan ? 2000 : 0,
    totalAnnualCost: estimatedAnnualCost
  });

  return (
    <div className="space-y-8">
      {/* Why Is This Plan The Best? */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Why Is This Plan The Best?</h3>
        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
          <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-sm text-gray-700 mt-1">
              <ul className="list-disc pl-5 space-y-2">
                {plan.explanation.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
                {plan.factors.slice(0, 3).map((factor, index) => (
                  <li key={`factor-${index}`}>
                    <span className="font-medium">{factor.factor}:</span> {Math.round(factor.impact)}% impact on recommendation
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What We Love About This Company */}
      <section>
        <h3 className="text-xl font-semibold mb-4">What We Love About This Company</h3>
        <div className="flex items-start gap-3 p-4 bg-pink-50 rounded-lg">
          <Heart className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-sm text-gray-700 mt-1">
              <ul className="list-disc pl-5 space-y-2">
                {planData.overview.whatWeLove.map((item, index) => (
                  <li key={index} dangerouslySetInnerHTML={{ __html: markdownToBold(item) }} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

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
            {planData.overview.providerInfo && (
              <div className="text-sm text-gray-600 mt-2" 
                   dangerouslySetInnerHTML={{ __html: markdownToBold(planData.overview.providerInfo) }} />
            )}
          </div>
        </div>
      </section>

      {/* Estimated Annual Cost */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Estimated Annual Cost</h3>
        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <CreditCard className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
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