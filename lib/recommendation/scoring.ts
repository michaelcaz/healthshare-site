import { getAllPlans } from '@/lib/supabase/plans'
import { type QuestionnaireResponse } from '@/types/questionnaire'
import { getPlanCost as getPlanCostUtil, getAllPlanCosts } from '@/lib/utils/plan-costs'
import { 
  type PricingPlan, 
  healthshareProviders, 
  type CoverageType,
  type HouseholdType,
  type PlanCost
} from '@/types/provider-plans'
import { calculateAnnualHealthcareCosts } from '@/lib/utils/visit-calculator'
import { getAgeBracket, isAgeInBracket } from '@/lib/plan-matching/age-brackets'

// Define the coverage type map
const COVERAGE_TYPE_MAP: Record<CoverageType, HouseholdType> = {
  'just_me': 'Member Only',
  'me_spouse': 'Member & Spouse',
  'me_kids': 'Member & Child(ren)',
  'family': 'Member & Family'
} as const;

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
  console.log(`Retrieved ${allPlanCosts.length} plan costs for comparison`);

  // Get this plan's cost
  const planCost = getPlanCostUtil(
    plan.id,
    questionnaire.age,
    questionnaire.coverage_type,
    questionnaire.iua_preference
  )
  
  // Log detailed information about the plan cost
  if (planCost) {
    console.log(`Plan ${plan.id} cost details:`, {
      monthlyPremium: planCost.monthlyPremium,
      initialUnsharedAmount: planCost.initialUnsharedAmount
    });
  } else {
    console.log(`No valid cost found for plan ${plan.id} with criteria:`, {
      age: questionnaire.age,
      coverage_type: questionnaire.coverage_type,
      iua_preference: questionnaire.iua_preference
    });
  }

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
      
      // Instead of completely overriding the user's preference, we'll use the $500 IUA
      // but apply a penalty based on how far it is from the user's preference
      const userPreferredIUA = parseInt(questionnaire.iua_preference);
      const crowdHealthIUA = 500;
      
      // Create a modified questionnaire that uses the $500 IUA but tracks the original preference
      const modifiedQuestionnaire: QuestionnaireResponse = { 
        ...questionnaire, 
        iua_preference: '500',
        original_iua_preference: questionnaire.iua_preference 
      };
      
      return calculatePlanScore(plan, modifiedQuestionnaire);
    } else {
      console.log(`Failed to find CrowdHealth plan cost even with IUA=500`);
    }
  }

  // Special handling for Knew Health plans
  if (plan.id.includes('knew-health')) {
    console.log(`Detailed analysis for Knew Health plan ${plan.id}:`);
    console.log(`- Age: ${questionnaire.age}`);
    console.log(`- Coverage type: ${questionnaire.coverage_type}`);
    console.log(`- IUA preference: ${questionnaire.iua_preference}`);
    
    // Get the age bracket
    const ageBracket = getAgeBracket(questionnaire.age, plan.ageRules);
    console.log(`- Age bracket: ${ageBracket}`);
    
    // Get the household type
    const householdType = COVERAGE_TYPE_MAP[questionnaire.coverage_type];
    console.log(`- Household type: ${householdType}`);
    
    // Log all available matrices for this plan
    console.log(`- All available matrices for plan ${plan.id}:`);
    plan.planMatrix.forEach((matrix, index) => {
      console.log(`  Matrix ${index + 1}: ${matrix.ageBracket}/${matrix.householdType} with ${matrix.costs.length} cost options`);
    });
    
    // Check all available IUAs for this plan
    const knewHealthMatrices = plan.planMatrix.filter(matrix => {
      const bracketMatches = matrix.ageBracket === ageBracket || 
                            isAgeInBracket(questionnaire.age, matrix.ageBracket);
      const householdMatches = matrix.householdType === householdType;
      
      console.log(`- Matrix ${matrix.ageBracket}/${matrix.householdType}: bracketMatches=${bracketMatches}, householdMatches=${householdMatches}`);
      
      return bracketMatches && householdMatches;
    });
    
    if (knewHealthMatrices.length > 0) {
      const availableIUAs = knewHealthMatrices.flatMap(matrix => 
        matrix.costs.map(cost => cost.initialUnsharedAmount)
      );
      console.log(`- Available IUAs for this age/coverage: ${availableIUAs.join(', ')}`);
      
      // If no matching IUA, suggest closest available
      if (!availableIUAs.includes(parseInt(questionnaire.iua_preference || '0'))) {
        console.log(`- Selected IUA ${questionnaire.iua_preference} not available for this plan`);
        console.log(`- Closest available IUAs: ${availableIUAs.join(', ')}`);
      }
    } else {
      console.log(`- No matching matrices found for age ${questionnaire.age} and coverage type ${questionnaire.coverage_type}`);
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
  
  // Updated formula: Use 0-100 scale for consistency with other factors
  const monthlyScore = Math.max(100 - (percentageAboveLowest * 70), 20)
  
  factors.push({
    factor: 'Monthly Cost',
    score: monthlyScore,
    explanation: `Monthly cost: $${currentPremium}${
      currentPremium === lowestPremium 
        ? ' (lowest available rate)'
        : ` (${Math.round(percentageAboveLowest * 100)}% more than lowest option at $${lowestPremium})`
    }`
  })

  // Initial Unshared Amount scoring (percentage-based) - SIMPLIFIED
  const incidentRankedPlans = allPlanCosts.sort((a, b) => 
    (a.cost?.initialUnsharedAmount ?? Infinity) - (b.cost?.initialUnsharedAmount ?? Infinity)
  )
  const lowestIUA = incidentRankedPlans[0].cost?.initialUnsharedAmount ?? 0
  const highestIUA = incidentRankedPlans[incidentRankedPlans.length - 1].cost?.initialUnsharedAmount ?? 10000
  const currentIUA = planCost.initialUnsharedAmount
  
  // Calculate the IUA score on a 0-100 scale where the lowest IUA gets 100 points
  // and the highest gets a minimum score (not zero)
  const minScore = 30 // Minimum score for the highest IUA
  const iuaRange = highestIUA - lowestIUA
  
  // If there's only one IUA option or all IUAs are the same, give full score
  let incidentScore = 0
  if (iuaRange === 0) {
    incidentScore = 100
  } else {
    // Linear scale from 100 (lowest IUA) to minScore (highest IUA)
    incidentScore = 100 - ((currentIUA - lowestIUA) / iuaRange) * (100 - minScore)
  }
  
  console.log(`IUA score calculation: lowest=${lowestIUA}, highest=${highestIUA}, current=${currentIUA}, score=${incidentScore.toFixed(2)}`)
  
  // Check if IUA exceeds financial capacity
  if (questionnaire.financial_capacity && currentIUA > parseInt(questionnaire.financial_capacity)) {
    incidentScore *= 0.7 // Moderately penalize plans with IUAs above stated financial capacity
  }
  
  // Adjust score based on risk preference - using consistent adjustment factor
  const riskAdjustmentFactor = 1.2 // Same factor for both risk preferences
  if (questionnaire.risk_preference === 'lower_risk' && currentIUA <= 1000) {
    // For risk-averse users, boost low IUA plans
    incidentScore *= riskAdjustmentFactor
    incidentScore = Math.min(incidentScore, 100) // Cap at 100 after adjustment
  } else if (questionnaire.risk_preference === 'higher_risk' && currentIUA >= 2500) {
    // For risk-tolerant users, boost high IUA plans
    incidentScore *= riskAdjustmentFactor
    incidentScore = Math.min(incidentScore, 100) // Cap at 100 after adjustment
  }

  factors.push({
    factor: 'Incident Cost',
    score: incidentScore,
    explanation: `Initial Unshared Amount: $${currentIUA}${
      currentIUA === lowestIUA 
        ? ' (lowest available)'
        : ` (${Math.round(((currentIUA - lowestIUA) / lowestIUA) * 100)}% more than lowest option at $${lowestIUA})`
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

  // For users planning pregnancy, evaluate waiting periods
  else if (questionnaire.pregnancy_planning === 'yes') {
    const fullPlan = healthshareProviders[plan.id.split('-')[0]]?.plans
      .find(p => p.id === plan.id);
    
    // All plans have maternity coverage, so we don't need to check if it exists
    const waitingPeriod = fullPlan.maternity.waitingPeriod.months;
    
    // Get all available plans with maternity coverage
    const allPlansWithMaternity = Object.values(healthshareProviders)
      .flatMap(provider => provider.plans);
    
    // Find the shortest waiting period among all plans
    const shortestWaitingPeriod = Math.min(
      ...allPlansWithMaternity.map(p => p.maternity.waitingPeriod.months)
    );
    
    // Find the longest waiting period among all plans
    const longestWaitingPeriod = Math.max(
      ...allPlansWithMaternity.map(p => p.maternity.waitingPeriod.months)
    );
    
    // Calculate score based on waiting period - relative to the range of available periods
    let maternityScore = 0;
    
    if (waitingPeriod === shortestWaitingPeriod) {
      // The plan with the shortest waiting period gets 100 points
      maternityScore = 100;
    } else if (longestWaitingPeriod === shortestWaitingPeriod) {
      // If all plans have the same waiting period, they all get 100 points
      maternityScore = 100;
    } else {
      // Otherwise, score on a scale from 100 (shortest) to 40 (longest)
      const waitingPeriodRange = longestWaitingPeriod - shortestWaitingPeriod;
      const relativePosition = (waitingPeriod - shortestWaitingPeriod) / waitingPeriodRange;
      maternityScore = Math.round(100 - (relativePosition * 60));
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
      explanation: `Maternity coverage available with ${waitingPeriod}-month waiting period${
        waitingPeriod === shortestWaitingPeriod 
          ? ' (shortest available waiting period)' 
          : ''
      }. Covers: ${services.join(', ')}`
    });
  }
  // For users not planning pregnancy, don't include maternity as a factor at all

  // Apply preference-based weighting - OPTIMIZED
  const weights: { [key: string]: number } = {
    'Monthly Cost': questionnaire.expense_preference === 'lower_monthly' ? 1.8 : 1.2, // Increased base weight
    'Incident Cost': questionnaire.expense_preference === 'higher_monthly' ? 1.5 : 0.8,
    'Annual Cost': 1.4, // Increased weight for annual cost
    'Maternity Coverage': questionnaire.pregnancy_planning === 'yes' ? 2.0 : 0, // Only consider maternity for those planning pregnancy
    'Maternity Note': 0 // Always zero weight for the informational note
  };
  
  // Apply additional risk preference adjustments
  if (questionnaire.risk_preference === 'higher_risk') {
    weights['Monthly Cost'] *= 1.3; // Higher risk users care more about monthly costs (increased)
    weights['Incident Cost'] *= 0.8; // Reduce importance of IUA for higher risk users
  } else if (questionnaire.risk_preference === 'lower_risk') {
    weights['Incident Cost'] *= 1.2; // Lower risk users care more about incident costs
    weights['Monthly Cost'] *= 0.9; // Slightly reduce monthly cost importance for lower risk users
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