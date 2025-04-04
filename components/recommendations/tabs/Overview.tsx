import { type PlanRecommendation } from '../types'
import { Building, CreditCard, Heart, CheckCircle, ExternalLink } from 'lucide-react'
import React from 'react'
import { getPlanCost } from '@/lib/utils/plan-costs'
import { calculateAnnualCost, getVisitFrequencyCost } from '@/utils/plan-utils'
import { planDetailsData } from '@/data/plan-details-data'
import { defaultPlanDetailsData } from '@/types/plan-details'
import { markdownToBold } from '@/lib/utils'
import { type QuestionnaireResponse } from '@/types/questionnaire'

interface OverviewProps {
  plan: PlanRecommendation
  age?: number
  coverageType?: string
  iuaPreference?: string
  visitFrequency?: string
  questionnaire?: QuestionnaireResponse
}

export const Overview: React.FC<OverviewProps> = ({ 
  plan,
  age = 35,
  coverageType = 'just_me',
  iuaPreference = '2500',
  visitFrequency = 'just_checkups',
  questionnaire
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

  // Determine if this plan has the lowest monthly payment or lowest out-of-pocket
  const hasLowestMonthlyPayment = plan.factors.some(f => f.factor === "Monthly Cost" && f.impact > 80);
  const hasLowestOutOfPocket = plan.factors.some(f => f.factor === "Incident Cost" && f.impact > 80);

  return (
    <div className="space-y-8">
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

      {/* DPC Pairing Section - Only show if the plan has this data */}
      {('dpcPairing' in planData.overview && planData.overview.dpcPairing) && (
        <section>
          <h3 className="text-xl font-semibold mb-4">{planData.overview.dpcPairing.title}</h3>
          <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-100 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm text-gray-700 mt-1">
                <p dangerouslySetInnerHTML={{ __html: markdownToBold(planData.overview.dpcPairing.description) }} />
                <p className="mt-3">
                  Click <a 
                    href={planData.overview.dpcPairing.linkUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium hover:underline inline-flex items-center"
                  >
                    {planData.overview.dpcPairing.linkText} <ExternalLink className="h-3.5 w-3.5 ml-0.5" />
                  </a> to find a DPC in your area.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Provider Information */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Provider Information</h3>
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
          <Building className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium">{plan.plan.providerName}</div>
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