import { getAllPlans } from '@/lib/supabase/plans'
import { type QuestionnaireResponse } from '@/types/questionnaire'
import { type PlanCost } from '@/types/plans'
import { getPlanCost as getPlanCostUtil, getAllPlanCosts } from '@/lib/utils/plan-costs'
import { type PricingPlan, healthshareProviders } from '@/types/provider-plans'

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

type HealthcareSpend = 'less_1000' | '1000_5000' | 'more_5000';

const expectedHealthcareCosts: Record<HealthcareSpend, number> = {
  'less_1000': 500,
  '1000_5000': 3000,
  'more_5000': 7500
};

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

  // Monthly cost scoring (ranked)
  const monthlyRankedPlans = allPlanCosts.sort((a, b) => 
    (a.cost?.monthlyPremium ?? Infinity) - (b.cost?.monthlyPremium ?? Infinity)
  )
  const monthlyPosition = monthlyRankedPlans.findIndex(p => p.plan.id === plan.id)
  const monthlyScore = Math.max(50 - (monthlyPosition * 10), 10)
  
  factors.push({
    factor: 'Monthly Cost',
    score: monthlyScore,
    explanation: `Monthly cost: $${planCost.monthlyPremium}${
      monthlyPosition === 0 
        ? ' (lowest available rate)'
        : ` ($${planCost.monthlyPremium - monthlyRankedPlans[0].cost!.monthlyPremium} more than lowest option)`
    }`
  })

  // Incident cost scoring (ranked)
  const incidentRankedPlans = allPlanCosts.sort((a, b) => 
    (a.cost?.initialUnsharedAmount ?? Infinity) - (b.cost?.initialUnsharedAmount ?? Infinity)
  )
  const incidentPosition = incidentRankedPlans.findIndex(p => p.plan.id === plan.id)
  const incidentScore = Math.max(100 - (incidentPosition * 10), 50)
  
  factors.push({
    factor: 'Incident Cost',
    score: incidentScore,
    explanation: `Incident cost: $${planCost.initialUnsharedAmount} (ranked ${incidentPosition + 1} lowest)`
  })

  // Annual Healthcare Spend Scoring
  const annualCosts = allPlanCosts.map(p => ({
    id: p.plan.id,
    totalCost: ((p.cost?.monthlyPremium ?? 0) * 12) + 
      expectedHealthcareCosts[questionnaire.annual_healthcare_spend as HealthcareSpend]
  }))
  
  // Sort plans by total annual cost (lowest to highest)
  const sortedByAnnualCost = annualCosts.sort((a, b) => a.totalCost - b.totalCost)
  
  // Find this plan's position and calculate score
  const position = sortedByAnnualCost.findIndex(p => p.id === plan.id)
  const spendScore = Math.max(100 - (position * 10), 50)

  factors.push({
    factor: 'Expected Annual Costs',
    score: spendScore,
    explanation: `Total annual cost estimate: $${(planCost.monthlyPremium * 12) + expectedHealthcareCosts[questionnaire.annual_healthcare_spend as HealthcareSpend]} (ranked ${position + 1} lowest based on your expected healthcare usage)`
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

    factors.push({
      factor: 'Pre-existing Conditions',
      score: conditionScore,
      explanation
    })
  }

  // Add maternity scoring
  if (questionnaire.pregnancy || questionnaire.pregnancy_planning === 'yes') {
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
  }

  totalScore = factors.reduce((sum, f) => sum + f.score, 0) / factors.length

  return {
    plan,
    plan_id: plan.id,
    total_score: totalScore,
    explanation: factors.map(f => f.explanation),
    factors
  }
} 