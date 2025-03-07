import { getAllPlans } from '@/lib/supabase/plans'
import { type QuestionnaireResponse } from '@/types/questionnaire'
import { type PlanCost } from '@/types/plans'
import { getPlanCost as getPlanCostUtil, getAllPlanCosts } from '@/lib/utils/plan-costs'
import { type PricingPlan, healthshareProviders } from '@/types/provider-plans'
import { calculateAnnualHealthcareCosts } from '@/lib/utils/visit-calculator'

interface Plan {
  id: string
  maternity_coverage: boolean
  maternity_waiting_period: number
  monthly_cost: number
  incident_cost: number
  pre_existing_conditions: boolean
  pre_existing_waiting_period: number
}

interface PlanScore {
  plan: PricingPlan
  plan_id: string
  total_score: number
  explanation: string[]
  factors: {
    factor: string
    score: number
    explanation: string
  }[]
}

export async function calculatePlanScore(
  plan: PricingPlan,
  questionnaire: QuestionnaireResponse
): Promise<PlanScore> {
  const factors = []
  let totalScore = 0

  // Get all plan costs for comparison
  const allPlanCosts = getAllPlanCosts(
    questionnaire.age,
    questionnaire.coverage_type,
    questionnaire.iua_preference
  )

  // Get this plan's cost
  const planCost = getPlanCostUtil(
    plan.id,
    questionnaire.age,
    questionnaire.coverage_type,
    questionnaire.iua_preference
  )

  if (!planCost) {
    return {
      plan,
      plan_id: plan.id,
      total_score: 0,
      explanation: ['No valid cost found for your criteria'],
      factors: []
    }
  }

  // Calculate expected annual healthcare costs based on visit frequency
  const expectedAnnualCosts = calculateAnnualHealthcareCosts(
    questionnaire.coverage_type,
    questionnaire.visit_frequency
  )

  // Monthly cost scoring (ranked)
  const monthlyRankedPlans = allPlanCosts.sort((a, b) => 
    (a.cost?.monthlyPremium ?? Infinity) - (b.cost?.monthlyPremium ?? Infinity)
  )
  const lowestPremium = monthlyRankedPlans[0].cost?.monthlyPremium ?? 0
  const currentPremium = planCost.monthlyPremium
  const percentageAboveLowest = (currentPremium - lowestPremium) / lowestPremium
  const monthlyScore = Math.max(50 - (percentageAboveLowest * 100), 10)
  
  factors.push({
    factor: 'Monthly Cost',
    score: monthlyScore,
    explanation: `Monthly cost: $${currentPremium}${
      currentPremium === lowestPremium 
        ? ' (lowest available rate)'
        : ` (${Math.round(percentageAboveLowest * 100)}% more than lowest option at $${lowestPremium})`
    }`
  })

  // Initial Unshared Amount scoring (percentage-based)
  const incidentRankedPlans = allPlanCosts.sort((a, b) => 
    (a.cost?.initialUnsharedAmount ?? Infinity) - (b.cost?.initialUnsharedAmount ?? Infinity)
  )
  const lowestIUA = incidentRankedPlans[0].cost?.initialUnsharedAmount ?? 0
  const currentIUA = planCost.initialUnsharedAmount
  const percentageAboveLowestIUA = (currentIUA - lowestIUA) / lowestIUA
  let incidentScore = Math.max(100 - (percentageAboveLowestIUA * 100), 50)
  
  // Add bonus for very low IUAs
  if (currentIUA <= 500) {
    incidentScore += 30; // Significant bonus for extremely low IUA
  } else if (currentIUA <= 1000) {
    incidentScore += 15; // Moderate bonus for low IUA
  }
  
  // Cap at 100
  incidentScore = Math.min(incidentScore, 100);
  
  // Apply visit frequency multiplier
  const visitFrequencyMultiplier = {
    'just_checkups': 0.7,    // IUA less important for infrequent users
    'few_months': 1.0,       // Balanced importance
    'monthly_plus': 1.5      // IUA very important for frequent users
  };
  
  incidentScore *= visitFrequencyMultiplier[questionnaire.visit_frequency];
  incidentScore = Math.min(incidentScore, 100); // Cap at 100 again after multiplier
  
  // Check if IUA exceeds financial capacity
  if (questionnaire.financial_capacity && currentIUA > parseInt(questionnaire.financial_capacity)) {
    incidentScore *= 0.5; // Heavily penalize plans with IUAs above stated financial capacity
  }
  
  // Adjust score based on risk preference
  if (questionnaire.risk_preference === 'lower_risk' && currentIUA <= 1000) {
    incidentScore *= 1.2; // Bonus for low IUAs when user prefers lower risk
  } else if (questionnaire.risk_preference === 'higher_risk' && currentIUA >= 2500) {
    incidentScore *= 1.1; // Slight bonus for high IUAs when user prefers higher risk
  }

  factors.push({
    factor: 'Incident Cost',
    score: incidentScore,
    explanation: `Initial Unshared Amount: $${currentIUA}${
      currentIUA === lowestIUA 
        ? ' (lowest available)'
        : ` (${Math.round(percentageAboveLowestIUA * 100)}% more than lowest option at $${lowestIUA})`
    }`
  })

  // Calculate total annual cost for comparison
  const annualCosts = allPlanCosts.map(p => ({
    id: p.plan.id,
    totalCost: (p.cost?.monthlyPremium ?? 0) * 12 + expectedAnnualCosts
  }))
  
  // Sort plans by total annual cost (lowest to highest)
  const sortedByAnnualCost = annualCosts.sort((a, b) => a.totalCost - b.totalCost)
  
  // Calculate percentage-based score for annual costs
  const lowestAnnualCost = sortedByAnnualCost[0].totalCost
  const currentAnnualCost = (planCost.monthlyPremium * 12) + expectedAnnualCosts
  const percentageAboveLowestAnnual = (currentAnnualCost - lowestAnnualCost) / lowestAnnualCost
  const annualScore = Math.max(100 - (percentageAboveLowestAnnual * 100), 50)

  factors.push({
    factor: 'Annual Cost',
    score: annualScore,
    explanation: `Total annual cost (including expected visits): $${currentAnnualCost}${
      currentAnnualCost === lowestAnnualCost
        ? ' (lowest available)'
        : ` (${Math.round(percentageAboveLowestAnnual * 100)}% more than lowest option at $${lowestAnnualCost})`
    }`
  })

  // Pre-existing Conditions (Score based on waiting period length)
  if (questionnaire.medical_conditions) {
    const fullPlan = healthshareProviders[plan.id.split('-')[0]]?.plans
      .find(p => p.id === plan.id);
    const waitingPeriodMonths = fullPlan?.preExistingConditions?.waitingPeriod ?? 0;
    let conditionScore = 0;
    let explanation = '';

    if (waitingPeriodMonths <= 12) {
      conditionScore = 100
      explanation = `12-month waiting period for pre-existing conditions (shortest available)`
    } else if (waitingPeriodMonths <= 24) {
      conditionScore = 75
      explanation = `24-month waiting period for pre-existing conditions`
    } else if (waitingPeriodMonths <= 36) {
      conditionScore = 50
      explanation = `36-month waiting period for pre-existing conditions`
    } else {
      conditionScore = 25
      explanation = `${waitingPeriodMonths}-month waiting period for pre-existing conditions`
    }
    
    // Adjust score based on pre-existing approach preference
    if (questionnaire.pre_existing_approach === 'long_term') {
      // Check long-term coverage tiers
      const tiers = fullPlan?.preExistingConditions?.tiers || [];
      const maxTierCoverage = tiers.length > 0 ? 
        tiers[tiers.length - 1].maximum : 0;
      
      if (typeof maxTierCoverage === 'number' && maxTierCoverage >= 100000) {
        conditionScore *= 1.3; // Significant bonus for high long-term coverage
      } else if (typeof maxTierCoverage === 'number' && maxTierCoverage >= 50000) {
        conditionScore *= 1.1; // Moderate bonus for decent long-term coverage
      }
    } else if (questionnaire.pre_existing_approach === 'new_needs') {
      // For users focused on new needs, the pre-existing condition score is less important
      conditionScore *= 0.7;
    }

    factors.push({
      factor: 'Pre-existing Conditions',
      score: conditionScore,
      explanation
    })
  }

  // Add maternity scoring
  if (questionnaire.pregnancy === 'true' || questionnaire.pregnancy_planning === 'yes') {
    const fullPlan = healthshareProviders[plan.id.split('-')[0]]?.plans
      .find(p => p.id === plan.id);
    
    if (!fullPlan?.maternity?.coverage?.services?.length) {
      return {
        plan,
        plan_id: plan.id,
        total_score: 0,
        explanation: ['Plan does not include maternity coverage'],
        factors: []
      };
    }

    // Calculate maternity score based on waiting period and coverage
    let maternityScore = 100;
    const waitingPeriod = fullPlan.maternity.waitingPeriod.months;
    
    // Base score on how close the waiting period is to ideal timing
    const idealWaitingPeriod = 9; // Most people want coverage sooner
    const waitingPeriodDifference = Math.abs(waitingPeriod - idealWaitingPeriod);

    if (waitingPeriodDifference <= 1) {
      maternityScore = 100; // Perfect or near-perfect timing
    } else if (waitingPeriodDifference <= 3) {
      maternityScore = 80; // Good timing
    } else {
      maternityScore = 60; // Less ideal timing
    }

    // Bonus for shorter waiting periods
    if (waitingPeriod < idealWaitingPeriod) {
      maternityScore += 10; // Bonus for earlier coverage
    }

    // Adjust score based on coverage comprehensiveness
    const services = fullPlan.maternity.coverage.services;
    const essentialServices = ['prenatal', 'delivery', 'postnatal'];
    const hasAllEssential = essentialServices.every(service => 
      services.some(s => s.toLowerCase().includes(service.toLowerCase()))
    );
    if (!hasAllEssential) maternityScore -= 30;

    factors.push({
      factor: 'Maternity Coverage',
      score: maternityScore,
      explanation: `Maternity coverage available with ${waitingPeriod}-month waiting period. Covers: ${services.join(', ')}`
    });
  }

  // Apply preference-based weighting
  const weights: { [key: string]: number } = {
    'Monthly Cost': questionnaire.risk_preference === 'higher_risk' ? 1.5 : 0.8,
    'Incident Cost': questionnaire.risk_preference === 'lower_risk' ? 1.5 : 0.8,
    'Annual Cost': 1.0,
    'Pre-existing Conditions': questionnaire.pre_existing === 'true' ? 2.0 : 0.5,
    'Maternity Coverage': (questionnaire.pregnancy === 'true' || 
                          questionnaire.pregnancy_planning === 'yes') ? 2.0 : 0.5
  };
  
  totalScore = factors.reduce((sum, f) => sum + (f.score * (weights[f.factor] || 1.0)), 0) / 
               factors.reduce((sum, f) => sum + (weights[f.factor] || 1.0), 0);

  return {
    plan,
    plan_id: plan.id,
    total_score: totalScore,
    explanation: factors.map(f => f.explanation),
    factors
  }
} 