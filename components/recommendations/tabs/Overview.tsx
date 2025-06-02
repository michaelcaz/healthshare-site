import { type PlanRecommendation } from '../types'
import { Info, Building, CreditCard, Heart } from 'lucide-react'
import React from 'react'
import { getPlanCost } from '@/lib/utils/plan-costs'
import { calculateAnnualCost, getVisitFrequencyCost } from '@/utils/plan-utils'
import { getPlanDetailsData } from '@/lib/utils/plan-data'
import { markdownToBold } from '@/lib/utils'
import { type QuestionnaireResponse } from '@/types/questionnaire'
import { cn } from '@/lib/utils'

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
  // Get plan-specific details using the utility function
  const planData = getPlanDetailsData(plan.plan);
  
  // Enhanced debug logs
  console.log('Overview Component - Plan ID:', plan.plan.id);
  console.log('Overview Component - Provider Name:', plan.plan.providerName);
  console.log('Overview Component - Plan Name:', plan.plan.planName);
  console.log('Overview Component - Plan Data Found:', !!planData);
  
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
  
  // Helper function to get the ranking suffix (1st, 2nd, 3rd, etc.)
  const getRankingSuffix = (num: number): string => {
    if (num === 1) return 'st';
    if (num === 2) return 'nd';
    if (num === 3) return 'rd';
    return 'th';
  };
  
  // Create a single paragraph recommendation reason
  const getSingleRecommendationParagraph = (): string => {
    let paragraph = '';
    
    // Add explanation based on expense preference
    if (questionnaire?.expense_preference === 'lower_monthly' && hasLowestMonthlyPayment) {
      paragraph = `This plan has the lowest monthly contribution ($${monthlyPremium}) with an estimated annual cost of $${estimatedAnnualCost.toLocaleString()}.`;
    } else if (questionnaire?.expense_preference === 'higher_monthly' && hasLowestOutOfPocket) {
      paragraph = `This plan has one of the lowest Initial Unshared Amounts ($${initialUnsharedAmount}) given your preference for lower out-of-pocket costs.`;
    } else {
      paragraph = `This plan has a good balance of monthly contribution ($${monthlyPremium}) and Initial Unshared Amount ($${initialUnsharedAmount}) with an estimated annual cost of $${estimatedAnnualCost.toLocaleString()}.`;
    }
    
    // Add family coverage mention if applicable
    if (questionnaire?.coverage_type === 'family' || questionnaire?.coverage_type === 'me_kids') {
      paragraph += ' It offers comprehensive coverage for your family.';
    }
    
    // Add risk preference explanation if applicable
    if (questionnaire?.risk_preference === 'lower_risk' && hasLowestOutOfPocket) {
      paragraph += ' Based on your preference for lower risk, this plan minimizes your out-of-pocket costs for medical events.';
    } else if (questionnaire?.risk_preference === 'higher_risk' && hasLowestMonthlyPayment) {
      paragraph += ' This aligns with your comfort for higher risk in exchange for lower monthly costs.';
    }
    
    return paragraph;
  };

  const { ranking } = plan;
  const rankSuffix = getRankingSuffix(ranking);
  const recommendationParagraph = getSingleRecommendationParagraph();

  return (
    <div className="space-y-8">
      {/* Why This Is The Top Recommendation */}
      <section>
        <h3 className="text-xl font-semibold mb-4">
          {ranking === 1 
            ? "Why This Is The Top Recommendation" 
            : `Why we think this is the ${ranking}${rankSuffix} best option for you`
          }
        </h3>
        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
          <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-700 mt-1">
            <p className="font-medium mb-2">This plan best matches your priorities:</p>
            <p>{recommendationParagraph}</p>
            
            {questionnaire?.pregnancy_planning === 'yes' && (
              <p className="mt-3">
                {plan.plan.providerName.includes('Zion') 
                  ? 'Zion has the shortest waiting period for pregnancies at 6 months.'
                  : plan.plan.providerName.includes('Sedera')
                    ? 'Sedera has a 10-month waiting period for pregnancies.'
                    : 'This plan has a standard 12-month waiting period for pregnancies.'
                } Note: This means that you must wait that long from the start date of your membership to conceive for your pregnancy needs to be eligible for sharing.
              </p>
            )}
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
                  Monthly premium × 12 + visit costs
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