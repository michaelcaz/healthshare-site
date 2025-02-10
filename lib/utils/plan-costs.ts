import { 
  type HealthsharePlan, 
  type PlanCost, 
  type AgeBracket, 
  type HouseholdSize, 
  type IUALevel 
} from '@/types/plans'
import { samplePlans } from '@/data/sample-plans'

interface PlanCosts {
  monthly: number
  incident: number
}

export function getPlanCost(
  planId: string,
  age: number,
  householdSize: number,
  iuaLevel: string
): PlanCost | null {
  const plan = samplePlans.find(p => p.id === planId)
  if (!plan) return null

  // Convert age to bracket
  let ageBracket = '18-29'
  if (age >= 30 && age < 40) ageBracket = '30-39'
  if (age >= 40) ageBracket = '40-49'

  // Find closest matching cost
  const costs = plan.costs.filter(c => c.age_bracket === ageBracket)
  if (!costs.length) return null

  // Get closest household size
  const closestSize = costs
    .map(c => c.household_size)
    .reduce((prev, curr) => 
      Math.abs(curr - householdSize) < Math.abs(prev - householdSize) ? curr : prev
    )

  // Get closest IUA level
  const validIUAs = ['1000', '2500', '5000']
  const targetIUA = validIUAs.includes(iuaLevel) ? iuaLevel : '1000'

  const cost = costs.find(c => 
    c.household_size === closestSize &&
    c.iua_level === targetIUA
  )

  return cost || costs[0] // Fallback to first available cost
}

// Helper to get costs for all plans
export function getAllPlanCosts(
  age: number,
  householdSize: number,
  iuaLevel: string
): Array<{ plan: HealthsharePlan; cost: PlanCost | null }> {
  return samplePlans.map(plan => ({
    plan,
    cost: getPlanCost(plan.id, age, householdSize, iuaLevel)
  }))
} 