import { 
  type PricingPlan,
  type PlanCost,
  type HouseholdType,
  type CoverageType
} from '@/types/provider-plans'
import { providerPlans } from '@/data/provider-plans'
import { getAgeBracket } from '@/lib/plan-matching/age-brackets'

const COVERAGE_TYPE_MAP: Record<CoverageType, HouseholdType> = {
  'just_me': 'Member Only',
  'me_spouse': 'Member & Spouse',
  'me_kids': 'Member & Child(ren)',
  'family': 'Member & Family'
} as const

function getHouseholdType(coverageType: string): HouseholdType {
  const mappedType = COVERAGE_TYPE_MAP[coverageType as CoverageType]
  if (!mappedType) {
    throw new Error(`Invalid coverage type: ${coverageType}`)
  }
  return mappedType
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