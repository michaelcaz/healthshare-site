import { ProviderPlan, HouseholdType, PlanCost, PricingPlan } from '../types/provider-plans';
import { HealthsharePlanCost, IUALevel, AgeBracket } from '../types/plans';
import { providerPlans } from '../data/provider-plans';

function getMatchingAgeBracket(plan: PricingPlan, ageBracket: AgeBracket): string {
  if (plan.ageRules.type === 'standard') {
    return ageBracket;
  }

  // For custom age brackets, find the matching range
  const age = parseInt(ageBracket.split('-')[0]);
  if (plan.ageRules.type === 'custom' && plan.ageRules.customBrackets) {
    const customBracket = plan.ageRules.customBrackets.ranges.find(
      range => age >= range.min && age <= range.max
    );
    return customBracket?.bracket || ageBracket;
  }
  return ageBracket;
}

export function findPlanCosts(
  plan: PricingPlan,
  ageBracket: AgeBracket,
  householdType: HouseholdType
): PlanCost[] | undefined {
  const matchingBracket = getMatchingAgeBracket(plan, ageBracket);
  const matrix = plan.planMatrix.find(
    m => m.ageBracket === matchingBracket && m.householdType === householdType
  );
  return matrix?.costs;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

export function getAllProviders(): string[] {
  return Array.from(new Set(providerPlans.map((plan: PricingPlan) => plan.providerName)));
}

export function getPlansForProvider(providerName: string): PricingPlan[] {
  return providerPlans.filter(plan => plan.providerName === providerName);
}

export function findCheapestPlan(
  ageBracket: AgeBracket,
  householdType: HouseholdType,
  maxIUA?: number
): { plan: PricingPlan; cost: PlanCost } | undefined {
  let cheapestPlan: { plan: PricingPlan; cost: PlanCost } | undefined;

  providerPlans.forEach(plan => {
    const costs = findPlanCosts(plan, ageBracket, householdType);
    if (!costs) return;

    const eligibleCosts = maxIUA 
      ? costs.filter(c => c.initialUnsharedAmount <= maxIUA)
      : costs;

    eligibleCosts.forEach(cost => {
      if (!cheapestPlan || cost.monthlyPremium < cheapestPlan.cost.monthlyPremium) {
        cheapestPlan = { plan, cost };
      }
    });
  });

  return cheapestPlan;
}

export function calculateAnnualCost(monthlyPremium: number, initialUnsharedAmount: number): number {
  return (monthlyPremium * 12) + initialUnsharedAmount;
}

export function getAvailableIUALevels(): number[] {
  const iuaSet = new Set<number>();
  
  providerPlans.forEach(plan => {
    plan.planMatrix.forEach(matrix => {
      matrix.costs.forEach(cost => {
        iuaSet.add(cost.initialUnsharedAmount);
      });
    });
  });

  return Array.from(iuaSet).sort((a, b) => a - b);
}

export function getPlanComparison(
  ageBracket: AgeBracket,
  householdType: HouseholdType,
  maxIUA?: number
): Array<{
  providerName: string;
  planName: string;
  monthlyPremium: number;
  initialUnsharedAmount: number;
  annualCost: number;
}> {
  const comparison: ReturnType<typeof getPlanComparison> = [];

  providerPlans.forEach(plan => {
    const costs = findPlanCosts(plan, ageBracket, householdType);
    if (!costs) return;

    const eligibleCosts = maxIUA 
      ? costs.filter(c => c.initialUnsharedAmount <= maxIUA)
      : costs;

    eligibleCosts.forEach(cost => {
      comparison.push({
        providerName: plan.providerName,
        planName: plan.planName,
        monthlyPremium: cost.monthlyPremium,
        initialUnsharedAmount: cost.initialUnsharedAmount,
        annualCost: calculateAnnualCost(cost.monthlyPremium, cost.initialUnsharedAmount)
      });
    });
  });

  return comparison.sort((a, b) => a.annualCost - b.annualCost);
}

/**
 * Converts a PlanCost (from provider-plans.ts) to a HealthsharePlanCost (from plans.ts).
 * This is useful when you need to convert from the recommendation engine format to the UI format.
 * 
 * @param planCost The PlanCost to convert
 * @param ageBracket The age bracket for the cost
 * @param householdSize The household size for the cost
 * @returns A HealthsharePlanCost object
 */
export function convertToHealthsharePlanCost(
  planCost: PlanCost,
  ageBracket: string,
  householdSize: 1 | 2
): HealthsharePlanCost {
  // Convert initialUnsharedAmount to a valid IUALevel
  let iuaLevel: IUALevel = '1000';
  if (planCost.initialUnsharedAmount === 2500) {
    iuaLevel = '2500';
  } else if (planCost.initialUnsharedAmount === 5000) {
    iuaLevel = '5000';
  }
  
  // Ensure ageBracket is a valid AgeBracket
  const validAgeBracket = (ageBracket === '18-29' || ageBracket === '30-39' || ageBracket === '40-49') 
    ? ageBracket 
    : '30-39'; // Default to 30-39 if not valid
  
  return {
    age_bracket: validAgeBracket as AgeBracket,
    household_size: householdSize,
    iua_level: iuaLevel,
    monthly_cost: planCost.monthlyPremium,
    incident_cost: planCost.initialUnsharedAmount
  };
}

/**
 * Converts a HealthsharePlanCost (from plans.ts) to a PlanCost (from provider-plans.ts).
 * This is useful when you need to convert from the UI format to the recommendation engine format.
 * 
 * @param healthsharePlanCost The HealthsharePlanCost to convert
 * @returns A PlanCost object
 */
export function convertToPlanCost(healthsharePlanCost: HealthsharePlanCost): PlanCost {
  return {
    monthlyPremium: healthsharePlanCost.monthly_cost,
    initialUnsharedAmount: healthsharePlanCost.incident_cost
  };
} 