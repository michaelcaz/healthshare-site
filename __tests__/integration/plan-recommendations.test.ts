import { describe, it, expect } from 'vitest';
import { PlanMatchingService } from '@/lib/services/plan-matching';
import { QuestionnaireResponse } from '@/types/questionnaire';
import { EligiblePlan } from '@/types/provider-plans';
import { providerPlans } from '@/data/provider-plans';

describe('Plan Recommendations Integration', () => {
  const baseQuestionnaire: QuestionnaireResponse = {
    age: 30,
    household_size: 1,
    coverage_type: 'just_me' as const,
    iua_preference: '1000' as '1000' | '2500' | '5000',
    pregnancy: false,
    pre_existing: false,
    prescription_needs: '',
    provider_preference: '',
    state: '',
    zip: '12345',
    expense_preference: 'lower_monthly',
    pregnancy_planning: 'no',
    medical_conditions: [],
    annual_healthcare_spend: 'less_1000',
    zip_code: '12345'
  };

  const planMatcher = new PlanMatchingService(providerPlans);

  it('correctly maps CrowdHealth age brackets', () => {
    // Test age 54 (should get CrowdHealth 18-54 bracket)
    const youngResponse = { ...baseQuestionnaire, age: 54, coverage_type: 'just_me' as const };
    const youngPlans = planMatcher.findEligiblePlans(youngResponse);
    const crowdHealthYoung = youngPlans.find((p: EligiblePlan) => p.id === 'crowdhealth-basic');
    expect(crowdHealthYoung?.eligiblePrices[0].monthlyPremium).toEqual(195);

    // Test age 55 (should get CrowdHealth 55-64 bracket)
    const olderResponse = { ...baseQuestionnaire, age: 55, coverage_type: 'just_me' as const };
    const olderPlans = planMatcher.findEligiblePlans(olderResponse);
    const crowdHealthOlder = olderPlans.find((p: EligiblePlan) => p.id === 'crowdhealth-basic');
    expect(crowdHealthOlder?.eligiblePrices[0].monthlyPremium).toEqual(335);
  });

  it('includes all eligible plans for standard age brackets', () => {
    const response = { ...baseQuestionnaire, age: 35, coverage_type: 'just_me' as const };
    const plans = planMatcher.findEligiblePlans(response);
    
    // Should include both standard and custom bracket plans
    expect(plans.some((p: EligiblePlan) => p.id === 'zion-direct')).toBeTruthy();
    expect(plans.some((p: EligiblePlan) => p.id === 'crowdhealth-basic')).toBeTruthy();
  });

  it('correctly filters by household size', () => {
    // Single member
    const singleResponse = { ...baseQuestionnaire, age: 30, household_size: 1, coverage_type: 'just_me' as const };
    const singlePlans = planMatcher.findEligiblePlans(singleResponse);
    expect(singlePlans.every(p => 
      p.eligiblePrices.length > 0
    )).toBeTruthy();

    // Family
    const familyResponse = { ...baseQuestionnaire, age: 30, household_size: 4, coverage_type: 'family' as const };
    const familyPlans = planMatcher.findEligiblePlans(familyResponse);
    const crowdHealthFamily = familyPlans.find(p => p.id === 'crowdhealth-basic');
    expect(crowdHealthFamily?.eligiblePrices[0].monthlyPremium).toEqual(640); // CrowdHealth family rate
  });

  it('filters by IUA preference when specified', () => {
    const response = { 
      ...baseQuestionnaire, 
      age: 30, 
      household_size: 1,
      coverage_type: 'just_me' as const,
      iua_preference: '1000' as '1000' | '2500' | '5000'
    };
    const plans = planMatcher.findEligiblePlans(response);
    
    // Regular plans should match IUA preference
    const regularPlans = plans.filter(p => p.id !== 'crowdhealth-basic');
    expect(regularPlans.every(p => 
      p.eligiblePrices.every(price => price.initialUnsharedAmount === 1000)
    )).toBeTruthy();

    // CrowdHealth should be included with its fixed IUA
    const crowdHealth = plans.find(p => p.id === 'crowdhealth-basic');
    expect(crowdHealth).toBeDefined();
    expect(crowdHealth?.eligiblePrices[0].initialUnsharedAmount).toEqual(500);
  });
}); 