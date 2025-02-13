import { describe, test, expect } from 'vitest';
import { 
  findPlanCosts, 
  findCheapestPlan, 
  calculateAnnualCost,
  getPlanComparison,
  getAllProviders,
  getPlansForProvider 
} from '@/utils/plan-utils';
import { providerPlans } from '@/data/provider-plans';

describe('Plan Utilities', () => {
  test('findPlanCosts returns correct costs for given criteria', () => {
    const plan = providerPlans[0]; // Zion Direct plan
    const costs = findPlanCosts(plan, '30-39', 'Member Only');
    expect(costs).not.toBeUndefined();
    expect(costs?.[0].monthlyPremium).toBe(251);
  });

  test('findCheapestPlan returns cheapest option', () => {
    const cheapest = findCheapestPlan('30-39', 'Member Only');
    expect(cheapest).not.toBeUndefined();
    expect(cheapest?.cost.monthlyPremium).toBeLessThan(300);
  });

  test('calculateAnnualCost computes correctly', () => {
    const annual = calculateAnnualCost(200, 1000);
    expect(annual).toBe(3400); // (200 * 12) + 1000
  });

  test('getPlanComparison returns sorted results', () => {
    const comparison = getPlanComparison('30-39', 'Member Only');
    // Verify sorting
    for (let i = 1; i < comparison.length; i++) {
      expect(comparison[i].annualCost).toBeGreaterThanOrEqual(comparison[i-1].annualCost);
    }
  });

  describe('Plan Cost Calculations', () => {
    test('calculates correct annual costs with different IUAs', () => {
      const plan = providerPlans[0]; // Zion Direct plan
      const costs = findPlanCosts(plan, '30-39', 'Member Only');
      
      if (!costs) throw new Error('Costs should be defined for Zion plan');
      
      // Test each IUA level
      costs.forEach(cost => {
        const annual = calculateAnnualCost(cost.monthlyPremium, cost.initialUnsharedAmount);
        expect(annual).toBe((cost.monthlyPremium * 12) + cost.initialUnsharedAmount);
      });
    });

    test('compares family vs individual plan costs correctly', () => {
      const familyComparison = getPlanComparison('30-39', 'Member & Family');
      const individualComparison = getPlanComparison('30-39', 'Member Only');
      
      // Family plans should be more expensive than individual plans
      expect(familyComparison[0].monthlyPremium).toBeGreaterThan(individualComparison[0].monthlyPremium);
    });
  });

  describe('Age Bracket Pricing', () => {
    it('verifies age affects pricing as expected', () => {
      const youngerPricing = getPlanComparison('18-29', 'Member Only')
        .filter(p => p.providerName === 'Zion Healthshare');
      const olderPricing = getPlanComparison('50-64', 'Member Only')
        .filter(p => p.providerName === 'Zion Healthshare');
      
      // Older age brackets should be more expensive
      expect(olderPricing[0].monthlyPremium).toBeGreaterThan(youngerPricing[0].monthlyPremium);
    });
  });

  describe('Provider Comparisons', () => {
    test('all providers have consistent IUA options', () => {
      const providers = getAllProviders();
      providers.forEach(providerName => {
        const plans = getPlansForProvider(providerName);
        plans.forEach(plan => {
          const costs = findPlanCosts(plan, '30-39', 'Member Only');
          expect(costs).not.toBeUndefined();
          expect(costs?.length).toBeGreaterThan(0);
          // Each plan should have at least one IUA option
          costs?.forEach(cost => {
            expect(cost.initialUnsharedAmount).toBeGreaterThan(0);
          });
        });
      });
    });

    test('finds cheapest plan across all providers', () => {
      const cheapest = findCheapestPlan('30-39', 'Member Only');
      const allPlans = getPlanComparison('30-39', 'Member Only');
      
      expect(cheapest).not.toBeUndefined();
      // Should match the first (cheapest) plan in comparison
      expect(cheapest?.cost.monthlyPremium).toBe(143);
    });
  });
}); 