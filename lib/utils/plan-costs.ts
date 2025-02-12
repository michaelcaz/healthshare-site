import { 
  type PricingPlan,
  type PlanCost,
  type HouseholdType 
} from '@/types/provider-plans'
import { providerPlans } from '@/data/provider-plans'
import { getAgeBracket } from '@/lib/plan-matching/age-brackets'

function getHouseholdType(coverageType: string): HouseholdType {
  switch (coverageType) {
    case 'just_me': return 'Member Only';
    case 'me_spouse': return 'Member & Spouse';
    case 'me_kids': return 'Member & Child(ren)';
    case 'family': return 'Member & Family';
    default: throw new Error('Invalid coverage type');
  }
}

export function getPlanCost(
  planId: string,
  age: number,
  coverageType: string,
  iuaLevel: string
): PlanCost | null {
  const plan = providerPlans.find(p => p.id === planId)
  if (!plan) return null

  const ageBracket = getAgeBracket(age, plan.ageRules)
  if (!ageBracket) return null

  const householdType = getHouseholdType(coverageType)
  
  const costs = plan.planMatrix
    .filter(matrix => 
      matrix.ageBracket === ageBracket && 
      matrix.householdType === householdType
    )
    .flatMap(matrix => matrix.costs)
    .filter(cost => cost.initialUnsharedAmount.toString() === iuaLevel)

  return costs[0] || null
}

// Helper to get costs for all plans
export function getAllPlanCosts(
  age: number,
  coverageType: string,
  iuaLevel: string
): Array<{ plan: PricingPlan; cost: PlanCost | null }> {
  return providerPlans.map(plan => ({
    plan,
    cost: getPlanCost(plan.id, age, coverageType, iuaLevel)
  }))
} 