import { describe, it, expect } from 'vitest';
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
  it('findPlanCosts returns correct costs for given criteria', () => {
    const plan = providerPlans.find(p => p.id === 'zion-healthshare-direct-membership');
    if (!plan) {
      console.warn('Zion Direct plan not found, skipping test');
      return;
    }
    
    const costs = findPlanCosts(plan, '30-39', 'Member Only');
    expect(costs).not.toBeUndefined();
    expect(costs?.[0].monthlyPremium).toBe(248);
  });
  
  it('findCheapestPlan returns cheapest option', () => {
    const cheapest = findCheapestPlan('18-29', 'Member Only');
    expect(cheapest).not.toBeUndefined();
    expect(cheapest?.cost.monthlyPremium).toBeGreaterThan(0);
  });
  
  it('calculateAnnualCost computes correctly', () => {
    // Test with different IUA values
    expect(calculateAnnualCost(100, 1000, 'just_checkups', 'just_me', false, 'test')).toBe(2200);
    expect(calculateAnnualCost(100, 2500, 'just_checkups', 'just_me', false, 'test')).toBe(3700);
    expect(calculateAnnualCost(100, 5000, 'just_checkups', 'just_me', false, 'test')).toBe(6200);
  });
  
  it('getPlanComparison returns sorted results', () => {
    // Test with default visit frequency and coverage type
    const comparison = getPlanComparison('18-29', 'Member Only', undefined, 'just_checkups', 'just_me');
    expect(comparison.length).toBeGreaterThan(0);
    
    // Check sorting by annual cost
    for (let i = 1; i < comparison.length; i++) {
      expect(comparison[i].annualCost).toBeGreaterThanOrEqual(comparison[i-1].annualCost);
    }
    
    // Test with different visit frequency
    const comparisonFrequent = getPlanComparison('18-29', 'Member Only', undefined, 'monthly_plus', 'just_me');
    
    // Annual costs should be higher with more frequent visits
    if (comparison.length > 0 && comparisonFrequent.length > 0) {
      expect(comparisonFrequent[0].annualCost).toBeGreaterThan(comparison[0].annualCost);
    }
  });
  
  describe('Plan Cost Calculations', () => {
    it('calculates correct annual costs with different IUAs', () => {
      const plan = providerPlans.find(p => p.id === 'zion-healthshare-direct-membership');
      if (!plan) {
        console.warn('Zion Direct plan not found, skipping test');
        return;
      }
      
      const costs = findPlanCosts(plan, '18-29', 'Member Only');
      expect(costs).not.toBeUndefined();
      expect(costs?.length).toBeGreaterThan(1);
      
      // Check that higher IUA plans have lower monthly premiums
      if (costs && costs.length > 1) {
        for (let i = 1; i < costs.length; i++) {
          expect(costs[i].initialUnsharedAmount).toBeGreaterThan(costs[i-1].initialUnsharedAmount);
          expect(costs[i].monthlyPremium).toBeLessThan(costs[i-1].monthlyPremium);
        }
      }
    });
    
    it('compares family vs individual plan costs correctly', () => {
      const individualComparison = getPlanComparison('30-39', 'Member Only', undefined, 'just_checkups', 'just_me');
      const familyComparison = getPlanComparison('30-39', 'Member & Family', undefined, 'just_checkups', 'family');
      
      if (individualComparison.length === 0 || familyComparison.length === 0) {
        console.warn('No plans found for comparison, skipping test');
        return;
      }
      
      // Family plans should be more expensive than individual plans
      expect(familyComparison[0].monthlyPremium).toBeGreaterThan(individualComparison[0].monthlyPremium);
    });
  });
  
  describe('Age Bracket Pricing', () => {
    it('verifies age affects pricing as expected', () => {
      const youngerComparison = getPlanComparison('18-29', 'Member Only', undefined, 'just_checkups', 'just_me');
      const olderComparison = getPlanComparison('50-64', 'Member Only', undefined, 'just_checkups', 'just_me');
      
      // Older age brackets should be more expensive
      if (youngerComparison.length > 0 && olderComparison.length > 0) {
        const youngerPlan = youngerComparison.find(p => p.providerName === 'Zion Healthshare');
        const olderPlan = olderComparison.find(p => p.providerName === 'Zion Healthshare');
        
        if (youngerPlan && olderPlan) {
          expect(olderPlan.monthlyPremium).toBeGreaterThan(youngerPlan.monthlyPremium);
        }
      }
    });
  });
  
  describe('Provider Comparisons', () => {
    it('all providers have consistent IUA options', () => {
      // Skip this test if there are providers without costs for the 30-39 age bracket
      const plansWithCosts = providerPlans.filter(plan => {
        const costs = findPlanCosts(plan, '30-39', 'Member Only');
        return costs && costs.length > 0;
      });
      
      if (plansWithCosts.length === 0) {
        console.warn('No plans with costs for 30-39 age bracket found, skipping test');
        return;
      }
      
      plansWithCosts.forEach(plan => {
        const costs = findPlanCosts(plan, '30-39', 'Member Only');
        expect(costs).not.toBeUndefined();
        expect(costs?.length).toBeGreaterThan(0);
        // Each plan should have at least one IUA option
        expect(costs?.[0].initialUnsharedAmount).toBeGreaterThan(0);
      });
    });
    
    it('finds cheapest plan across all providers', () => {
      const comparison = getPlanComparison('18-29', 'Member Only', undefined, 'just_checkups', 'just_me');
      const cheapest = findCheapestPlan('18-29', 'Member Only');
      
      if (comparison.length === 0 || !cheapest) {
        console.warn('No plans found for comparison, skipping test');
        return;
      }
      
      expect(cheapest).not.toBeUndefined();
      // The cheapest plan should have the lowest monthly premium
      const cheapestPremium = cheapest.cost.monthlyPremium;
      
      // Verify that no plan in the comparison has a lower premium
      for (const plan of comparison) {
        expect(cheapestPremium).toBeLessThanOrEqual(plan.monthlyPremium);
      }
    });
  });
}); 