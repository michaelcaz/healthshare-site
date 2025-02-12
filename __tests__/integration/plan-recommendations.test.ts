import { describe, it, expect } from 'vitest';
import { findEligiblePlans } from '@/lib/questionnaire';
import { QuestionnaireResponse } from '@/types/questionnaire';
import { EligiblePlan } from '@/types/provider-plans';

describe('Plan Recommendations Integration', () => {
  const baseQuestionnaire: QuestionnaireResponse = {
    age: 30,
    household_size: 1,
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

  it('correctly maps CrowdHealth age brackets', () => {
    // Test age 54 (should get CrowdHealth 18-54 bracket)
    const youngResponse = { ...baseQuestionnaire, age: 54 };
    const youngPlans = findEligiblePlans(youngResponse);
    const crowdHealthYoung = youngPlans.find((p: EligiblePlan) => p.id === 'crowdhealth-basic');
    expect(crowdHealthYoung?.eligiblePrices[0].monthlyPremium).toEqual(195);

    // Test age 55 (should get CrowdHealth 55-64 bracket)
    const olderResponse = { ...baseQuestionnaire, age: 55 };
    const olderPlans = findEligiblePlans(olderResponse);
    const crowdHealthOlder = olderPlans.find((p: EligiblePlan) => p.id === 'crowdhealth-basic');
    expect(crowdHealthOlder?.eligiblePrices[0].monthlyPremium).toEqual(335);
  });

  it('includes all eligible plans for standard age brackets', () => {
    const response = { ...baseQuestionnaire, age: 35 };
    const plans = findEligiblePlans(response);
    
    // Should include both standard and custom bracket plans
    expect(plans.some((p: EligiblePlan) => p.id === 'zion-direct')).toBeTruthy();
    expect(plans.some((p: EligiblePlan) => p.id === 'crowdhealth-basic')).toBeTruthy();
  });

  it('correctly filters by household size', () => {
    // Single member
    const singleResponse = { ...baseQuestionnaire, age: 30, household_size: 1 };
    const singlePlans = findEligiblePlans(singleResponse);
    expect(singlePlans.every(p => 
      p.eligiblePrices.length > 0
    )).toBeTruthy();

    // Family
    const familyResponse = { ...baseQuestionnaire, age: 30, household_size: 4 };
    const familyPlans = findEligiblePlans(familyResponse);
    const crowdHealthFamily = familyPlans.find(p => p.id === 'crowdhealth-basic');
    expect(crowdHealthFamily?.eligiblePrices[0].monthlyPremium).toEqual(640); // CrowdHealth family rate
  });

  it('filters by IUA preference when specified', () => {
    const response = { 
      ...baseQuestionnaire, 
      age: 30, 
      household_size: 1,
      iua_preference: '1000' as '1000' | '2500' | '5000'
    };
    const plans = findEligiblePlans(response);
    
    expect(plans.every(p => 
      p.eligiblePrices.every(price => 
        price.initialUnsharedAmount === 1000
      )
    )).toBeTruthy();
  });
}); 