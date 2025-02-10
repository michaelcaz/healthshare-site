import { useCallback, useMemo } from 'react';
import { PricingPlan, AgeBracket, HouseholdType } from '@/types/provider-plans';
import { findPlanCosts, calculateAnnualCost } from '@/utils/plan-utils';

export function usePlanCosts(
  plan: PricingPlan,
  ageBracket: AgeBracket,
  householdType: HouseholdType
) {
  const costs = useMemo(() => 
    findPlanCosts(plan, ageBracket, householdType),
    [plan, ageBracket, householdType]
  );

  const getAnnualCost = useCallback((monthlyPremium: number, iua: number) => 
    calculateAnnualCost(monthlyPremium, iua),
    []
  );

  return {
    costs,
    getAnnualCost
  };
} 