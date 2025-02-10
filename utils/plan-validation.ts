import { z } from 'zod';
import { PricingPlan, AgeBracket, HouseholdType } from '@/types/provider-plans';

const planCostSchema = z.object({
  monthlyPremium: z.number().positive(),
  initialUnsharedAmount: z.number().positive()
});

const planMatrixSchema = z.object({
  ageBracket: z.enum(['18-29', '30-39', '40-49', '50-64']),
  householdType: z.enum(['Member Only', 'Member & Spouse', 'Member & Child(ren)', 'Member & Family']),
  costs: z.array(planCostSchema)
});

export const pricingPlanSchema = z.object({
  id: z.string(),
  providerName: z.string(),
  planName: z.union([z.string(), z.array(z.string())]),
  maxCoverage: z.string(),
  annualUnsharedAmount: z.string(),
  sourceUrl: z.string().url(),
  planMatrix: z.array(planMatrixSchema)
});

export function validatePlan(plan: PricingPlan) {
  return pricingPlanSchema.parse(plan);
} 