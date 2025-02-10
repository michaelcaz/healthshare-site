import { PricingPlan } from '../types/provider-plans';

export const providerPlans: PricingPlan[] = [
  {
    id: 'zion-direct',
    providerName: 'Zion Healthshare',
    planName: 'Direct Membership',
    maxCoverage: 'No limit',
    annualUnsharedAmount: 'Total of paid three IUAs in 12 months',
    sourceUrl: 'https://zionhealthshare.org/memberships/direct/',
    planMatrix: [
      {
        ageBracket: '18-29',
        householdType: 'Member Only',
        costs: [
          { monthlyPremium: 209, initialUnsharedAmount: 1000 },
          { monthlyPremium: 156, initialUnsharedAmount: 2500 },
          { monthlyPremium: 111, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '18-29',
        householdType: 'Member & Spouse',
        costs: [
          { monthlyPremium: 399, initialUnsharedAmount: 1000 },
          { monthlyPremium: 291, initialUnsharedAmount: 2500 },
          { monthlyPremium: 199, initialUnsharedAmount: 5000 }
        ]
      },
      // ... Additional age brackets and household types
    ]
  },
  {
    id: 'crowdhealth-basic',
    providerName: 'CrowdHealth',
    planName: 'Basic',
    maxCoverage: 'No limit',
    annualUnsharedAmount: '$500',
    sourceUrl: 'https://www.joincrowdhealth.com/resources/member-guide',
    planMatrix: [
      {
        ageBracket: '18-29',
        householdType: 'Member Only',
        costs: [
          { monthlyPremium: 195, initialUnsharedAmount: 500 }
        ]
      },
      // ... Additional age brackets and household types
    ]
  }
  // ... Additional providers
]; 