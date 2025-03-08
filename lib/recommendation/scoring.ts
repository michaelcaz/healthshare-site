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
  console.log('calculatePlanScore called for plan:', plan.id);
  console.log('Questionnaire response:', JSON.stringify(questionnaire, null, 2));
  
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

  // Special handling for CrowdHealth plans which only have a $500 IUA option
  if (!planCost && plan.id.includes('crowdhealth') && questionnaire.iua_preference !== '500') {
    console.log(`Attempting to match CrowdHealth plan with IUA=500 instead of ${questionnaire.iua_preference}`);
    const crowdHealthCost = getPlanCostUtil(
      plan.id,
      questionnaire.age,
      questionnaire.coverage_type,
      '500'
    );
    
    if (crowdHealthCost) {
      console.log(`Found CrowdHealth plan cost with IUA=500:`, crowdHealthCost);
      return calculatePlanScore(plan, { ...questionnaire, iua_preference: '500' });
    }
  }

  if (!planCost) {
    console.log(`No valid cost found for plan ${plan.id} with criteria:`, {
      age: questionnaire.age,
      coverage_type: questionnaire.coverage_type,
      iua_preference: questionnaire.iua_preference
    });
    return {
      plan,
      plan_id: plan.id,
      total_score: 0,
      explanation: ['No valid cost found for your criteria'],
      factors: []
    }
  }

  console.log(`Plan ${plan.id} cost:`, planCost);

  // Calculate expected annual healthcare costs based on visit frequency
  const expectedAnnualCosts = calculateAnnualHealthcareCosts(
    questionnaire.coverage_type,
    questionnaire.visit_frequency,
    questionnaire.age,
    questionnaire.pre_existing === 'true'
  )
  
  // Note: Visit frequency affects expected annual healthcare costs,
  // but not how much importance is placed on the IUA, since IUA is per incident/need, not per visit

  // Monthly cost scoring (ranked) - OPTIMIZED
  const monthlyRankedPlans = allPlanCosts.sort((a, b) => 
    (a.cost?.monthlyPremium ?? Infinity) - (b.cost?.monthlyPremium ?? Infinity)
  )
  const lowestPremium = monthlyRankedPlans[0].cost?.monthlyPremium ?? 0
  const currentPremium = planCost.monthlyPremium
  const percentageAboveLowest = (currentPremium - lowestPremium) / lowestPremium
  // Updated formula: less severe penalty and higher minimum score
  const monthlyScore = Math.max(80 - (percentageAboveLowest * 60), 20)
  
  factors.push({
    factor: 'Monthly Cost',
    score: monthlyScore,
    explanation: `Monthly cost: $${currentPremium}${
      currentPremium === lowestPremium 
        ? ' (lowest available rate)'
        : ` (${Math.round(percentageAboveLowest * 100)}% more than lowest option at $${lowestPremium})`
    }`
  })

  // Initial Unshared Amount scoring (percentage-based) - OPTIMIZED
  const incidentRankedPlans = allPlanCosts.sort((a, b) => 
    (a.cost?.initialUnsharedAmount ?? Infinity) - (b.cost?.initialUnsharedAmount ?? Infinity)
  )
  const lowestIUA = incidentRankedPlans[0].cost?.initialUnsharedAmount ?? 0
  const currentIUA = planCost.initialUnsharedAmount
  const percentageAboveLowestIUA = (currentIUA - lowestIUA) / lowestIUA
  
  // Base score using a continuous function approach
  // This creates a more gradual and fair scoring system
  let incidentScore = 0;
  
  // Base score inversely proportional to IUA amount (higher IUA = lower base score)
  if (currentIUA <= 5000) {
    // Linear scale from 100 (for IUA=0) down to 40 (for IUA=5000)
    incidentScore = 100 - ((currentIUA / 5000) * 60);
  } else {
    incidentScore = 40 - Math.min(((currentIUA - 5000) / 5000) * 15, 15); // Minimum score of 25
  }
  
  // Add relative scoring component - reward plans that are close to the lowest available IUA
  const relativeScore = Math.max(100 - (percentageAboveLowestIUA * 70), 50);
  
  // Combine absolute and relative scoring (weighted average)
  incidentScore = (incidentScore * 0.7) + (relativeScore * 0.3);
  
  // Add continuous bonus for low IUAs
  const iuaBonus = Math.max(30 - (currentIUA / 100), 0);
  incidentScore += iuaBonus;
  
  // Cap at 100
  incidentScore = Math.min(incidentScore, 100);
  
  // Check if IUA exceeds financial capacity
  if (questionnaire.financial_capacity && currentIUA > parseInt(questionnaire.financial_capacity)) {
    incidentScore *= 0.5; // Heavily penalize plans with IUAs above stated financial capacity
  }
  
  // Adjust score based on risk preference
  if (questionnaire.risk_preference === 'lower_risk' && currentIUA <= 1000) {
    incidentScore *= 1.2; // Bonus for low IUAs when user prefers lower risk
    incidentScore = Math.min(incidentScore, 100); // Cap at 100 after adjustment
  } else if (questionnaire.risk_preference === 'higher_risk' && currentIUA >= 2500) {
    incidentScore *= 1.1; // Slight bonus for high IUAs when user prefers higher risk
    incidentScore = Math.min(incidentScore, 100); // Cap at 100 after adjustment
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

  // Calculate total annual cost for comparison - OPTIMIZED
  const annualCosts = allPlanCosts.map(p => {
    const monthlyPremium = p.cost?.monthlyPremium ?? 0;
    const annualPremium = monthlyPremium * 12;
    
    // Add $2,000 for DPC plans
    const isDpcPlan = p.plan.id.includes('dpc') || p.plan.id.includes('vpc');
    const dpcCost = isDpcPlan ? 2000 : 0;
    
    // Calculate expected healthcare costs based on plan's IUA and visit frequency
    const iua = p.cost?.initialUnsharedAmount ?? 0;
    const visitCosts = expectedAnnualCosts;
    
    // Adjust for age-based risk (simplified actuarial adjustment)
    const ageRiskFactor = questionnaire.age >= 50 ? 1.3 : 
                          questionnaire.age >= 40 ? 1.15 : 
                          questionnaire.age >= 30 ? 1.05 : 1.0;
    
    return {
      id: p.plan.id,
      totalCost: annualPremium + (visitCosts * ageRiskFactor) + dpcCost
    };
  });
  
  // Sort plans by total annual cost (lowest to highest)
  const sortedByAnnualCost = annualCosts.sort((a, b) => a.totalCost - b.totalCost);
  
  // Calculate percentage-based score for annual costs
  const lowestAnnualCost = sortedByAnnualCost[0].totalCost;
  
  // Add $2,000 for DPC plans when calculating current plan's annual cost
  const isDpcPlan = plan.id.includes('dpc') || plan.id.includes('vpc');
  const dpcCost = isDpcPlan ? 2000 : 0;
  
  // Apply age-based risk factor to current plan too
  const ageRiskFactor = questionnaire.age >= 50 ? 1.3 : 
                        questionnaire.age >= 40 ? 1.15 : 
                        questionnaire.age >= 30 ? 1.05 : 1.0;
  
  const currentAnnualCost = (planCost.monthlyPremium * 12) + (expectedAnnualCosts * ageRiskFactor) + dpcCost;
  
  const percentageAboveLowestAnnual = (currentAnnualCost - lowestAnnualCost) / lowestAnnualCost;
  // Updated formula: less severe penalty
  const annualScore = Math.max(100 - (percentageAboveLowestAnnual * 70), 50);

  factors.push({
    factor: 'Annual Cost',
    score: annualScore,
    explanation: `Total annual cost (including expected visits${isDpcPlan ? ' and $2,000 DPC membership' : ''}): $${Math.round(currentAnnualCost)}${
      currentAnnualCost === lowestAnnualCost
        ? ' (lowest available)'
        : ` (${Math.round(percentageAboveLowestAnnual * 100)}% more than lowest option at $${Math.round(lowestAnnualCost)})`
    }`
  })

  // No longer scoring pre-existing conditions since all plans have the same details
  // We'll show a notice to users with pre-existing conditions instead

  // Add maternity scoring
  if (questionnaire.pregnancy === 'true' || questionnaire.pregnancy_planning === 'yes') {
    const fullPlan = healthshareProviders[plan.id.split('-')[0]]?.plans
      .find(p => p.id === plan.id);
    
    // Calculate maternity score based on waiting period and coverage
    let maternityScore = 100;
    
    if (fullPlan?.maternity?.coverage?.services?.length) {
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
    } else {
      // If user is currently pregnant and plan has no maternity coverage, disqualify the plan
      if (questionnaire.pregnancy === 'true') {
        return {
          plan,
          plan_id: plan.id,
          total_score: 0,
          explanation: ['This plan does not offer maternity coverage for your current pregnancy'],
          factors: [{
            factor: 'Maternity Coverage',
            score: 0,
            explanation: 'No maternity coverage available for current pregnancy'
          }]
        };
      }
      
      // For those planning pregnancy but not currently pregnant, still include with low score
      factors.push({
        factor: 'Maternity Coverage',
        score: 40, // Lower score but not zero
        explanation: `Limited or no maternity coverage available`
      });
    }
  }

  // Apply preference-based weighting - OPTIMIZED
  const weights: { [key: string]: number } = {
    'Monthly Cost': questionnaire.expense_preference === 'lower_monthly' ? 1.5 : 0.8,
    'Incident Cost': questionnaire.expense_preference === 'higher_monthly' ? 1.5 : 0.8,
    'Annual Cost': 1.2, // Increased weight for annual cost since it incorporates visit frequency
    'Maternity Coverage': (questionnaire.pregnancy === 'true' || 
                          questionnaire.pregnancy_planning === 'yes') ? 2.0 : 0.5
  };
  
  // Apply additional risk preference adjustments
  if (questionnaire.risk_preference === 'higher_risk') {
    weights['Monthly Cost'] *= 1.2; // Higher risk users care more about monthly costs
  } else if (questionnaire.risk_preference === 'lower_risk') {
    weights['Incident Cost'] *= 1.2; // Lower risk users care more about incident costs
  }
  
  // Apply dynamic weighting based on plan differences
  const monthlyPremiumVariance = calculateVariance(allPlanCosts.map(p => p.cost?.monthlyPremium ?? 0));
  const iuaVariance = calculateVariance(allPlanCosts.map(p => p.cost?.initialUnsharedAmount ?? 0));
  
  // If there's high variance in one factor but low in another, adjust weights
  const varianceRatio = monthlyPremiumVariance / iuaVariance;
  if (varianceRatio > 2) {
    // Monthly premiums vary a lot more than IUAs
    weights['Monthly Cost'] *= 1.2;
  } else if (varianceRatio < 0.5) {
    // IUAs vary a lot more than monthly premiums
    weights['Incident Cost'] *= 1.2;
  }
  
  totalScore = factors.reduce((sum, f) => sum + (f.score * (weights[f.factor] || 1.0)), 0) / 
               factors.reduce((sum, f) => sum + (weights[f.factor] || 1.0), 0);

  // Apply a small non-linear adjustment to better differentiate close plans
  if (totalScore > 80) {
    // Boost high-scoring plans slightly to create more separation at the top
    totalScore = totalScore + ((100 - totalScore) * 0.2);
  }

  const result = {
    plan,
    plan_id: plan.id,
    total_score: totalScore,
    explanation: factors.map(f => f.explanation),
    factors
  };
  
  console.log(`Plan ${plan.id} final score: ${totalScore.toFixed(2)}`);
  console.log(`Plan ${plan.id} factors:`, JSON.stringify(factors, null, 2));
  
  return result;
}

// Helper function to calculate variance of an array of numbers
function calculateVariance(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  
  const mean = numbers.reduce((sum, val) => sum + val, 0) / numbers.length;
  const squaredDifferences = numbers.map(val => Math.pow(val - mean, 2));
  return squaredDifferences.reduce((sum, val) => sum + val, 0) / numbers.length;
} 