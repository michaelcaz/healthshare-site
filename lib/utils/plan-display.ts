/**
 * plan-display.ts
 * 
 * This file provides centralized utilities for displaying plan costs consistently
 * across the application. It serves as a single source of truth for how costs
 * are formatted and displayed.
 */

import { PlanRecommendation } from '@/lib/recommendation/recommendations';
import { PlanCost } from '@/types/provider-plans';
import { getPlanCost } from './plan-costs';
import { calculateAnnualCost } from '@/utils/plan-utils';

/**
 * Formats a number as currency
 */
export function formatCurrency(amount: number | string): string {
  if (typeof amount === 'string') {
    // Try to parse the string as a number if it looks like one
    if (/^\d+(\.\d+)?$/.test(amount)) {
      amount = parseFloat(amount);
    } else {
      return amount;
    }
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Gets the plan costs for display, ensuring consistency across the application
 */
export function getDisplayCosts(
  planId: string,
  age?: number,
  coverageType?: string,
  iuaPreference?: string
): PlanCost {
  console.log(`getDisplayCosts called for ${planId} with age=${age}, coverageType=${coverageType}, iuaPreference=${iuaPreference}`);
  
  // Try to get costs from getPlanCost
  if (age && coverageType && iuaPreference) {
    const costs = getPlanCost(planId, age, coverageType as any, iuaPreference);
    if (costs) {
      console.log(`Using getPlanCost result for ${planId}:`, costs);
      // Ensure sourceUrl is included if present on the cost object
      return {
        monthlyPremium: costs.monthlyPremium,
        initialUnsharedAmount: costs.initialUnsharedAmount,
        ...(costs.sourceUrl ? { sourceUrl: costs.sourceUrl } : {})
      };
    }
  }
  
  // Fallback to default values if all else fails
  console.log(`No costs found for ${planId}, using fallback values`);
  return { monthlyPremium: 0, initialUnsharedAmount: 0 };
}

/**
 * Gets the annual cost for display
 */
export function getDisplayAnnualCost(
  planId: string,
  monthlyPremium: number,
  initialUnsharedAmount: number,
  visitFrequency?: string,
  coverageType?: string
): number {
  const isDpcPlan = planId.includes('dpc') || planId.includes('vpc');
  
  return calculateAnnualCost(
    monthlyPremium,
    initialUnsharedAmount,
    visitFrequency,
    coverageType,
    isDpcPlan,
    'getDisplayAnnualCost'
  );
}

/**
 * Gets all display costs for a plan recommendation
 */
export function getPlanDisplayData(
  plan: PlanRecommendation,
  age?: number,
  coverageType?: string,
  iuaPreference?: string,
  visitFrequency?: string
): {
  monthlyPremium: number;
  initialUnsharedAmount: number;
  annualCost: number;
  formattedMonthlyPremium: string;
  formattedInitialUnsharedAmount: string;
  formattedAnnualCost: string;
} {
  const costs = getDisplayCosts(plan.plan.id, age, coverageType, iuaPreference);
  
  const annualCost = getDisplayAnnualCost(
    plan.plan.id,
    costs.monthlyPremium,
    costs.initialUnsharedAmount,
    visitFrequency,
    coverageType
  );
  
  return {
    monthlyPremium: costs.monthlyPremium,
    initialUnsharedAmount: costs.initialUnsharedAmount,
    annualCost,
    formattedMonthlyPremium: formatCurrency(costs.monthlyPremium),
    formattedInitialUnsharedAmount: formatCurrency(costs.initialUnsharedAmount),
    formattedAnnualCost: formatCurrency(annualCost)
  };
} 