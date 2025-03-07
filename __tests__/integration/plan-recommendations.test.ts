import { describe, it, expect } from 'vitest';
import { PlanMatchingService } from '@/lib/services/plan-matching';
import { QuestionnaireResponse } from '@/types/questionnaire';
import { EligiblePlan } from '@/types/provider-plans';
import { providerPlans } from '@/data/provider-plans';

describe('Plan Recommendations Integration', () => {
  const planMatcher = new PlanMatchingService(providerPlans);
  
  // Check if we have any plans with custom age brackets
  const plansWithCustomBrackets = providerPlans.filter(p => {
    return p.ageRules.type === 'custom' && 
      p.ageRules.customBrackets?.ranges && 
      p.ageRules.customBrackets.ranges.length > 0;
  });
  
  const hasCustomBracketPlans = plansWithCustomBrackets.length > 0;
  
  // Default questionnaire values to satisfy TypeScript
  const defaultQuestionnaire: Partial<QuestionnaireResponse> = {
    iua_preference: '1000',
    pregnancy: 'false',
    pre_existing: 'false',
    expense_preference: 'lower_monthly',
    zip_code: '12345',
    visit_frequency: 'just_checkups',
    medical_conditions: []
  };
  
  it('correctly maps custom age brackets', () => {
    // Skip test if no plans with custom age brackets
    if (!hasCustomBracketPlans) {
      console.warn('Skipping test: No plans with custom age brackets found');
      return;
    }
    
    // Get the first plan with custom brackets for testing
    const customPlan = plansWithCustomBrackets[0];
    const customRanges = customPlan.ageRules.customBrackets?.ranges;
    
    if (!customRanges || customRanges.length < 2) {
      console.warn('Skipping test: Not enough custom age brackets to test');
      return;
    }
    
    // Test with an age in the first bracket
    const youngAge = customRanges[0].min + 1;
    const youngResponse: QuestionnaireResponse = { 
      ...defaultQuestionnaire as QuestionnaireResponse,
      age: youngAge, 
      coverage_type: 'just_me' 
    };
    const youngPlans = planMatcher.findEligiblePlans(youngResponse);
    const youngCustomPlan = youngPlans.find((p: EligiblePlan) => p.id === customPlan.id);
    
    // Test with an age in the second bracket
    const olderAge = customRanges[1].min + 1;
    const olderResponse: QuestionnaireResponse = { 
      ...defaultQuestionnaire as QuestionnaireResponse,
      age: olderAge, 
      coverage_type: 'just_me' 
    };
    const olderPlans = planMatcher.findEligiblePlans(olderResponse);
    const olderCustomPlan = olderPlans.find((p: EligiblePlan) => p.id === customPlan.id);
    
    // Verify both plans are found
    expect(youngCustomPlan).toBeDefined();
    expect(olderCustomPlan).toBeDefined();
    
    // Only verify prices if they exist
    if (youngCustomPlan && olderCustomPlan && 
        youngCustomPlan.eligiblePrices?.length > 0 && 
        olderCustomPlan.eligiblePrices?.length > 0) {
      expect(youngCustomPlan.eligiblePrices[0].monthlyPremium).toBeGreaterThan(0);
      expect(olderCustomPlan.eligiblePrices[0].monthlyPremium).toBeGreaterThan(0);
      
      // Older age brackets typically have higher premiums
      if (olderAge > youngAge) {
        expect(olderCustomPlan.eligiblePrices[0].monthlyPremium)
          .toBeGreaterThanOrEqual(youngCustomPlan.eligiblePrices[0].monthlyPremium);
      }
    }
  });
  
  it('includes all eligible plans for standard age brackets', () => {
    const response: QuestionnaireResponse = { 
      ...defaultQuestionnaire as QuestionnaireResponse,
      age: 35, 
      coverage_type: 'just_me' 
    };
    const plans = planMatcher.findEligiblePlans(response);
    
    // Should include at least one plan
    expect(plans.length).toBeGreaterThan(0);
    
    // Check for standard bracket plans (Zion is known to use standard brackets)
    const zionPlan = providerPlans.find(p => p.providerName === 'Zion Healthshare');
    if (zionPlan) {
      expect(plans.some((p: EligiblePlan) => p.providerName === 'Zion Healthshare')).toBeTruthy();
    }
    
    // If we have custom bracket plans, at least one should be included
    if (hasCustomBracketPlans) {
      const customPlanProvider = plansWithCustomBrackets[0].providerName;
      expect(plans.some((p: EligiblePlan) => p.providerName === customPlanProvider)).toBeTruthy();
    }
  });
  
  it('correctly filters by household size', () => {
    // Find a plan that has both individual and family pricing
    const plansWithFamilyPricing = providerPlans.filter(p => 
      p.planMatrix.some(m => m.householdType === 'Member & Family' && m.costs.length > 0)
    );
    
    if (plansWithFamilyPricing.length === 0) {
      console.warn('Skipping test: No plans with family pricing found');
      return;
    }
    
    const testPlan = plansWithFamilyPricing[0];
    
    const familyResponse: QuestionnaireResponse = { 
      ...defaultQuestionnaire as QuestionnaireResponse,
      age: 35, 
      coverage_type: 'family' 
    };
    const familyPlans = planMatcher.findEligiblePlans(familyResponse);
    const familyTestPlan = familyPlans.find(p => p.id === testPlan.id);
    
    expect(familyTestPlan).toBeDefined();
    if (familyTestPlan && familyTestPlan.eligiblePrices?.length > 0) {
      expect(familyTestPlan.eligiblePrices[0].monthlyPremium).toBeGreaterThan(0);
    }
    
    // Compare with individual pricing
    const individualResponse: QuestionnaireResponse = { 
      ...defaultQuestionnaire as QuestionnaireResponse,
      age: 35, 
      coverage_type: 'just_me' 
    };
    const individualPlans = planMatcher.findEligiblePlans(individualResponse);
    const individualTestPlan = individualPlans.find(p => p.id === testPlan.id);
    
    // If both plans have pricing, family should be more expensive
    if (familyTestPlan && individualTestPlan && 
        familyTestPlan.eligiblePrices?.length > 0 && 
        individualTestPlan.eligiblePrices?.length > 0) {
      expect(familyTestPlan.eligiblePrices[0].monthlyPremium)
        .toBeGreaterThan(individualTestPlan.eligiblePrices[0].monthlyPremium);
    }
  });
  
  it('filters by IUA preference when specified', () => {
    // Find plans with multiple IUA options
    const plansWithMultipleIUAs = providerPlans.filter(p => 
      p.planMatrix.some(m => m.costs.length > 1)
    );
    
    if (plansWithMultipleIUAs.length === 0) {
      console.warn('Skipping test: No plans with multiple IUA options found');
      return;
    }
    
    // Find the lowest IUA value across all plans
    let lowestIUA = Number.MAX_SAFE_INTEGER;
    providerPlans.forEach(plan => {
      plan.planMatrix.forEach(matrix => {
        matrix.costs.forEach(cost => {
          if (cost.initialUnsharedAmount < lowestIUA) {
            lowestIUA = cost.initialUnsharedAmount;
          }
        });
      });
    });
    
    // Use a valid IUA preference value that's closest to our calculated lowest
    let iuaPreference: '1000' | '2500' | '5000' = '1000';
    if (lowestIUA > 1000 && lowestIUA <= 2500) {
      iuaPreference = '2500';
    } else if (lowestIUA > 2500) {
      iuaPreference = '5000';
    }
    
    const response: QuestionnaireResponse = { 
      ...defaultQuestionnaire as QuestionnaireResponse,
      age: 35, 
      coverage_type: 'just_me',
      iua_preference: iuaPreference
    };
    
    const plans = planMatcher.findEligiblePlans(response);
    expect(plans.length).toBeGreaterThan(0);
    
    // All plans should have at least one price option with IUA <= the preference
    plans.forEach(plan => {
      if (plan.eligiblePrices?.length > 0) {
        const hasMatchingIUA = plan.eligiblePrices.some(
          price => price.initialUnsharedAmount <= parseInt(iuaPreference)
        );
        expect(hasMatchingIUA).toBeTruthy();
      }
    });
  });
}); 