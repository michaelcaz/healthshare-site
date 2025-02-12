import { 
  type PricingPlan,
  type PlanCost,
  type HouseholdType 
} from '@/types/provider-plans'
import { providerPlans } from '@/data/provider-plans'
import { getAgeBracket } from '@/lib/plan-matching/age-brackets'

function getHouseholdType(size: number): HouseholdType {
  switch (size) {
    case 1: return 'Member Only';
    case 2: return 'Member & Spouse';
    case 3:
    case 4: return 'Member & Child(ren)';
    default: return 'Member & Family';
  }
}

export function getPlanCost(
  planId: string,
  age: number,
  householdSize: number,
  iuaLevel: string
): PlanCost | null {
  const plan = providerPlans.find(p => p.id === planId)
  if (!plan) return null

  const ageBracket = getAgeBracket(age, plan.ageRules)
  if (!ageBracket) return null

  const householdType = getHouseholdType(householdSize)
  
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
  householdSize: number,
  iuaLevel: string
): Array<{ plan: PricingPlan; cost: PlanCost | null }> {
  return providerPlans.map(plan => ({
    plan,
    cost: getPlanCost(plan.id, age, householdSize, iuaLevel)
  }))
} 