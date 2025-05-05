import { useCallback, useMemo } from 'react';
import { PricingPlan, HouseholdType } from '@/types/provider-plans';
import { findPlanCosts, calculateAnnualCost } from '@/utils/plan-utils';
import { AgeBracket } from '@/types/plans';

export function usePlanCosts(
  plan: PricingPlan,
  ageBracket: string,
  householdType: HouseholdType,
  visitFrequency?: string,
  coverageType?: string
) {
  const costs = useMemo(() => 
    findPlanCosts(plan, ageBracket as AgeBracket, householdType),
    [plan, ageBracket, householdType]
  );

  const getAnnualCost = useCallback((monthlyPremium: number, iua: number) => {
    // Check if this is a DPC plan
    const planId = plan.id || '';
    const isDpcPlan = planId.includes('dpc') || planId.includes('vpc');
    
    return calculateAnnualCost(
      monthlyPremium, 
      iua, 
      visitFrequency, 
      coverageType, 
      isDpcPlan,
      'usePlanCosts'
    );
  }, [plan, visitFrequency, coverageType]);

  return {
    costs,
    getAnnualCost
  };
} 