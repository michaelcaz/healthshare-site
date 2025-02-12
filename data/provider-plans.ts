import { PricingPlan, ProviderAgeRules } from '@/types/provider-plans';

const standardAgeRules: ProviderAgeRules = {
  type: 'standard'
};

const crowdHealthAgeRules: ProviderAgeRules = {
  type: 'custom',
  customBrackets: {
    ranges: [
      { min: 18, max: 54, bracket: '18-54' },
      { min: 55, max: 64, bracket: '55-64' }
    ]
  }
};

export const providerPlans: PricingPlan[] = [
  {
    id: 'zion-direct',
    providerName: 'Zion Healthshare',
    planName: 'Direct Membership',
    maxCoverage: 'No limit',
    annualUnsharedAmount: 'Total of paid three IUAs in 12 months',
    sourceUrl: 'https://zionhealthshare.org/memberships/direct/',
    ageRules: standardAgeRules,
    planMatrix: [
      // Age bracket: 18-29
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
      {
        ageBracket: '18-29',
        householdType: 'Member & Child(ren)',
        costs: [
          { monthlyPremium: 418, initialUnsharedAmount: 1000 },
          { monthlyPremium: 294, initialUnsharedAmount: 2500 },
          { monthlyPremium: 199, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '18-29',
        householdType: 'Member & Family',
        costs: [
          { monthlyPremium: 605, initialUnsharedAmount: 1000 },
          { monthlyPremium: 446, initialUnsharedAmount: 2500 },
          { monthlyPremium: 324, initialUnsharedAmount: 5000 }
        ]
      },
      // Age bracket: 30-39
      {
        ageBracket: '30-39',
        householdType: 'Member Only',
        costs: [
          { monthlyPremium: 248, initialUnsharedAmount: 1000 },
          { monthlyPremium: 198, initialUnsharedAmount: 2500 },
          { monthlyPremium: 170, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '30-39',
        householdType: 'Member & Spouse',
        costs: [
          { monthlyPremium: 459, initialUnsharedAmount: 1000 },
          { monthlyPremium: 364, initialUnsharedAmount: 2500 },
          { monthlyPremium: 288, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '30-39',
        householdType: 'Member & Child(ren)',
        costs: [
          { monthlyPremium: 468, initialUnsharedAmount: 1000 },
          { monthlyPremium: 378, initialUnsharedAmount: 2500 },
          { monthlyPremium: 288, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '30-39',
        householdType: 'Member & Family',
        costs: [
          { monthlyPremium: 637, initialUnsharedAmount: 1000 },
          { monthlyPremium: 504, initialUnsharedAmount: 2500 },
          { monthlyPremium: 433, initialUnsharedAmount: 5000 }
        ]
      },
      // Age bracket: 40-49
      {
        ageBracket: '40-49',
        householdType: 'Member Only',
        costs: [
          { monthlyPremium: 242, initialUnsharedAmount: 1000 },
          { monthlyPremium: 208, initialUnsharedAmount: 2500 },
          { monthlyPremium: 183, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '40-49',
        householdType: 'Member & Spouse',
        costs: [
          { monthlyPremium: 483, initialUnsharedAmount: 1000 },
          { monthlyPremium: 390, initialUnsharedAmount: 2500 },
          { monthlyPremium: 314, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '40-49',
        householdType: 'Member & Child(ren)',
        costs: [
          { monthlyPremium: 483, initialUnsharedAmount: 1000 },
          { monthlyPremium: 390, initialUnsharedAmount: 2500 },
          { monthlyPremium: 314, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '40-49',
        householdType: 'Member & Family',
        costs: [
          { monthlyPremium: 683, initialUnsharedAmount: 1000 },
          { monthlyPremium: 562, initialUnsharedAmount: 2500 },
          { monthlyPremium: 489, initialUnsharedAmount: 5000 }
        ]
      },
      // Age bracket: 50-64
      {
        ageBracket: '50-64',
        householdType: 'Member Only',
        costs: [
          { monthlyPremium: 305, initialUnsharedAmount: 1000 },
          { monthlyPremium: 281, initialUnsharedAmount: 2500 },
          { monthlyPremium: 201, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '50-64',
        householdType: 'Member & Spouse',
        costs: [
          { monthlyPremium: 588, initialUnsharedAmount: 1000 },
          { monthlyPremium: 473, initialUnsharedAmount: 2500 },
          { monthlyPremium: 374, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '50-64',
        householdType: 'Member & Child(ren)',
        costs: [
          { monthlyPremium: 588, initialUnsharedAmount: 1000 },
          { monthlyPremium: 473, initialUnsharedAmount: 2500 },
          { monthlyPremium: 374, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '50-64',
        householdType: 'Member & Family',
        costs: [
          { monthlyPremium: 856, initialUnsharedAmount: 1000 },
          { monthlyPremium: 707, initialUnsharedAmount: 2500 },
          { monthlyPremium: 549, initialUnsharedAmount: 5000 }
        ]
      }
    ]
  },
  {
    id: 'zion-essential',
    providerName: 'Zion Healthshare',
    planName: 'Essential Membership',
    maxCoverage: 'No limit',
    annualUnsharedAmount: 'Total of paid three IUAs in 12 months',
    sourceUrl: 'https://zionhealthshare.org/memberships/essential/',
    ageRules: standardAgeRules,
    planMatrix: [
      // Age bracket: 18-29
      {
        ageBracket: '18-29',
        householdType: 'Member Only',
        costs: [
          { monthlyPremium: 201, initialUnsharedAmount: 1000 },
          { monthlyPremium: 144, initialUnsharedAmount: 2500 },
          { monthlyPremium: 117, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '18-29',
        householdType: 'Member & Spouse',
        costs: [
          { monthlyPremium: 396, initialUnsharedAmount: 1000 },
          { monthlyPremium: 283, initialUnsharedAmount: 2500 },
          { monthlyPremium: 225, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '18-29',
        householdType: 'Member & Child(ren)',
        costs: [
          { monthlyPremium: 396, initialUnsharedAmount: 1000 },
          { monthlyPremium: 283, initialUnsharedAmount: 2500 },
          { monthlyPremium: 225, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '18-29',
        householdType: 'Member & Family',
        costs: [
          { monthlyPremium: 603, initialUnsharedAmount: 1000 },
          { monthlyPremium: 478, initialUnsharedAmount: 2500 },
          { monthlyPremium: 363, initialUnsharedAmount: 5000 }
        ]
      },
      // Age bracket: 30-39
      {
        ageBracket: '30-39',
        householdType: 'Member Only',
        costs: [
          { monthlyPremium: 229, initialUnsharedAmount: 1000 },
          { monthlyPremium: 165, initialUnsharedAmount: 2500 },
          { monthlyPremium: 143, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '30-39',
        householdType: 'Member & Spouse',
        costs: [
          { monthlyPremium: 422, initialUnsharedAmount: 1000 },
          { monthlyPremium: 326, initialUnsharedAmount: 2500 },
          { monthlyPremium: 281, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '30-39',
        householdType: 'Member & Child(ren)',
        costs: [
          { monthlyPremium: 422, initialUnsharedAmount: 1000 },
          { monthlyPremium: 325, initialUnsharedAmount: 2500 },
          { monthlyPremium: 281, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '30-39',
        householdType: 'Member & Family',
        costs: [
          { monthlyPremium: 613, initialUnsharedAmount: 1000 },
          { monthlyPremium: 489, initialUnsharedAmount: 2500 },
          { monthlyPremium: 419, initialUnsharedAmount: 5000 }
        ]
      },
      // Age bracket: 50-64
      {
        ageBracket: '50-64',
        householdType: 'Member Only',
        costs: [
          { monthlyPremium: 319, initialUnsharedAmount: 1000 },
          { monthlyPremium: 264, initialUnsharedAmount: 2500 },
          { monthlyPremium: 195, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '50-64',
        householdType: 'Member & Spouse',
        costs: [
          { monthlyPremium: 580, initialUnsharedAmount: 1000 },
          { monthlyPremium: 471, initialUnsharedAmount: 2500 },
          { monthlyPremium: 379, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '50-64',
        householdType: 'Member & Child(ren)',
        costs: [
          { monthlyPremium: 580, initialUnsharedAmount: 1000 },
          { monthlyPremium: 471, initialUnsharedAmount: 2500 },
          { monthlyPremium: 379, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '50-64',
        householdType: 'Member & Family',
        costs: [
          { monthlyPremium: 835, initialUnsharedAmount: 1000 },
          { monthlyPremium: 657, initialUnsharedAmount: 2500 },
          { monthlyPremium: 559, initialUnsharedAmount: 5000 }
        ]
      }
    ]
  },
  {
    id: 'crowdhealth-basic',
    providerName: 'CrowdHealth',
    planName: 'Basic',
    maxCoverage: 'No limit',
    annualUnsharedAmount: '$500',
    sourceUrl: 'https://www.joincrowdhealth.com/resources/member-guide',
    ageRules: crowdHealthAgeRules,
    planMatrix: [
      {
        ageBracket: '18-54',
        householdType: 'Member Only',
        costs: [
          { monthlyPremium: 195, initialUnsharedAmount: 500 }
        ]
      },
      {
        ageBracket: '55-64',
        householdType: 'Member Only',
        costs: [
          { monthlyPremium: 335, initialUnsharedAmount: 500 }
        ]
      },
      // Couples and Families
      {
        ageBracket: '18-29',
        householdType: 'Member & Spouse',
        costs: [
          { monthlyPremium: 390, initialUnsharedAmount: 500 }
        ]
      },
      {
        ageBracket: '18-29',
        householdType: 'Member & Child(ren)',
        costs: [
          { monthlyPremium: 390, initialUnsharedAmount: 500 }
        ]
      },
      {
        ageBracket: '18-29',
        householdType: 'Member & Family',
        costs: [
          { monthlyPremium: 640, initialUnsharedAmount: 500 }
        ]
      },
      // Repeat for other age brackets...
      {
        ageBracket: '50-64',
        householdType: 'Member & Spouse',
        costs: [
          { monthlyPremium: 670, initialUnsharedAmount: 500 }
        ]
      },
      {
        ageBracket: '50-64',
        householdType: 'Member & Child(ren)',
        costs: [
          { monthlyPremium: 725, initialUnsharedAmount: 500 }
        ]
      },
      {
        ageBracket: '50-64',
        householdType: 'Member & Family',
        costs: [
          { monthlyPremium: 695, initialUnsharedAmount: 500 }
        ]
      }
    ]
  },
  {
    id: 'sedera-select-plus',
    providerName: 'Sedera',
    planName: 'SELECT+',
    maxCoverage: 'No limit',
    annualUnsharedAmount: 'Total of paid three IUAs in 12 months',
    sourceUrl: 'https://assets.ctfassets.net/01zqqfy0bb2m/BdCi3f2zO5AcFTHBLcNkJ/3cdf28f268d4186cc7550e11b11664c7/SELECT__Guidelines_-_Community_20231001.pdf',
    ageRules: standardAgeRules,
    planMatrix: [
      // Age bracket: 18-29
      {
        ageBracket: '18-29',
        householdType: 'Member Only',
        costs: [
          { monthlyPremium: 247, initialUnsharedAmount: 500 },
          { monthlyPremium: 233, initialUnsharedAmount: 1000 },
          { monthlyPremium: 209, initialUnsharedAmount: 1500 },
          { monthlyPremium: 186, initialUnsharedAmount: 2500 },
          { monthlyPremium: 141, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '18-29',
        householdType: 'Member & Spouse',
        costs: [
          { monthlyPremium: 458, initialUnsharedAmount: 500 },
          { monthlyPremium: 429, initialUnsharedAmount: 1000 },
          { monthlyPremium: 382, initialUnsharedAmount: 1500 },
          { monthlyPremium: 335, initialUnsharedAmount: 2500 },
          { monthlyPremium: 246, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '18-29',
        householdType: 'Member & Child(ren)',
        costs: [
          { monthlyPremium: 441, initialUnsharedAmount: 500 },
          { monthlyPremium: 414, initialUnsharedAmount: 1000 },
          { monthlyPremium: 369, initialUnsharedAmount: 1500 },
          { monthlyPremium: 326, initialUnsharedAmount: 2500 },
          { monthlyPremium: 240, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '18-29',
        householdType: 'Member & Family',
        costs: [
          { monthlyPremium: 657, initialUnsharedAmount: 500 },
          { monthlyPremium: 617, initialUnsharedAmount: 1000 },
          { monthlyPremium: 548, initialUnsharedAmount: 1500 },
          { monthlyPremium: 480, initialUnsharedAmount: 2500 },
          { monthlyPremium: 350, initialUnsharedAmount: 5000 }
        ]
      },
      // Age bracket: 30-39
      {
        ageBracket: '30-39',
        householdType: 'Member Only',
        costs: [
          { monthlyPremium: 288, initialUnsharedAmount: 500 },
          { monthlyPremium: 280, initialUnsharedAmount: 1000 },
          { monthlyPremium: 252, initialUnsharedAmount: 1500 },
          { monthlyPremium: 207, initialUnsharedAmount: 2500 },
          { monthlyPremium: 179, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '30-39',
        householdType: 'Member & Spouse',
        costs: [
          { monthlyPremium: 537, initialUnsharedAmount: 500 },
          { monthlyPremium: 523, initialUnsharedAmount: 1000 },
          { monthlyPremium: 467, initialUnsharedAmount: 1500 },
          { monthlyPremium: 377, initialUnsharedAmount: 2500 },
          { monthlyPremium: 321, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '30-39',
        householdType: 'Member & Child(ren)',
        costs: [
          { monthlyPremium: 517, initialUnsharedAmount: 500 },
          { monthlyPremium: 504, initialUnsharedAmount: 1000 },
          { monthlyPremium: 450, initialUnsharedAmount: 1500 },
          { monthlyPremium: 365, initialUnsharedAmount: 2500 },
          { monthlyPremium: 312, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '30-39',
        householdType: 'Member & Family',
        costs: [
          { monthlyPremium: 774, initialUnsharedAmount: 500 },
          { monthlyPremium: 752, initialUnsharedAmount: 1000 },
          { monthlyPremium: 671, initialUnsharedAmount: 1500 },
          { monthlyPremium: 542, initialUnsharedAmount: 2500 },
          { monthlyPremium: 460, initialUnsharedAmount: 5000 }
        ]
      },
      // Age bracket: 40-49
      {
        ageBracket: '40-49',
        householdType: 'Member Only',
        costs: [
          { monthlyPremium: 331, initialUnsharedAmount: 500 },
          { monthlyPremium: 292, initialUnsharedAmount: 1000 },
          { monthlyPremium: 264, initialUnsharedAmount: 1500 },
          { monthlyPremium: 230, initialUnsharedAmount: 2500 },
          { monthlyPremium: 200, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '40-49',
        householdType: 'Member & Spouse',
        costs: [
          { monthlyPremium: 627, initialUnsharedAmount: 500 },
          { monthlyPremium: 546, initialUnsharedAmount: 1000 },
          { monthlyPremium: 490, initialUnsharedAmount: 1500 },
          { monthlyPremium: 424, initialUnsharedAmount: 2500 },
          { monthlyPremium: 364, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '40-49',
        householdType: 'Member & Child(ren)',
        costs: [
          { monthlyPremium: 602, initialUnsharedAmount: 500 },
          { monthlyPremium: 526, initialUnsharedAmount: 1000 },
          { monthlyPremium: 472, initialUnsharedAmount: 1500 },
          { monthlyPremium: 410, initialUnsharedAmount: 2500 },
          { monthlyPremium: 352, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '40-49',
        householdType: 'Member & Family',
        costs: [
          { monthlyPremium: 902, initialUnsharedAmount: 500 },
          { monthlyPremium: 787, initialUnsharedAmount: 1000 },
          { monthlyPremium: 705, initialUnsharedAmount: 1500 },
          { monthlyPremium: 609, initialUnsharedAmount: 2500 },
          { monthlyPremium: 520, initialUnsharedAmount: 5000 }
        ]
      },
      // Age bracket: 50-64
      {
        ageBracket: '50-64',
        householdType: 'Member Only',
        costs: [
          { monthlyPremium: 405, initialUnsharedAmount: 500 },
          { monthlyPremium: 350, initialUnsharedAmount: 1000 },
          { monthlyPremium: 322, initialUnsharedAmount: 1500 },
          { monthlyPremium: 290, initialUnsharedAmount: 2500 },
          { monthlyPremium: 230, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '50-64',
        householdType: 'Member & Spouse',
        costs: [
          { monthlyPremium: 772, initialUnsharedAmount: 500 },
          { monthlyPremium: 664, initialUnsharedAmount: 1000 },
          { monthlyPremium: 608, initialUnsharedAmount: 1500 },
          { monthlyPremium: 542, initialUnsharedAmount: 2500 },
          { monthlyPremium: 424, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '50-64',
        householdType: 'Member & Child(ren)',
        costs: [
          { monthlyPremium: 741, initialUnsharedAmount: 500 },
          { monthlyPremium: 638, initialUnsharedAmount: 1000 },
          { monthlyPremium: 584, initialUnsharedAmount: 1500 },
          { monthlyPremium: 522, initialUnsharedAmount: 2500 },
          { monthlyPremium: 410, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '50-64',
        householdType: 'Member & Family',
        costs: [
          { monthlyPremium: 1114, initialUnsharedAmount: 500 },
          { monthlyPremium: 957, initialUnsharedAmount: 1000 },
          { monthlyPremium: 876, initialUnsharedAmount: 1500 },
          { monthlyPremium: 780, initialUnsharedAmount: 2500 },
          { monthlyPremium: 609, initialUnsharedAmount: 5000 }
        ]
      }
    ]
  },
  {
    id: 'knew-health',
    providerName: 'Knew Health',
    planName: 'Standard',
    maxCoverage: 'No limit',
    annualUnsharedAmount: 'Total of paid three IUAs in 12 months',
    sourceUrl: 'file:///C:/Users/ADMIN/Downloads/Knew-Health-Member-Guidelines%20(1).pdf',
    ageRules: standardAgeRules,
    planMatrix: [
      // Age bracket: 18-29
      {
        ageBracket: '18-29',
        householdType: 'Member Only',
        costs: [
          { monthlyPremium: 241, initialUnsharedAmount: 1000 },
          { monthlyPremium: 192, initialUnsharedAmount: 2500 },
          { monthlyPremium: 142, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '18-29',
        householdType: 'Member & Spouse',
        costs: [
          { monthlyPremium: 468, initialUnsharedAmount: 1000 },
          { monthlyPremium: 370, initialUnsharedAmount: 2500 },
          { monthlyPremium: 270, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '18-29',
        householdType: 'Member & Child(ren)',
        costs: [
          { monthlyPremium: 453, initialUnsharedAmount: 1000 },
          { monthlyPremium: 360, initialUnsharedAmount: 2500 },
          { monthlyPremium: 264, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '18-29',
        householdType: 'Member & Family',
        costs: [
          { monthlyPremium: 687, initialUnsharedAmount: 1000 },
          { monthlyPremium: 544, initialUnsharedAmount: 2500 },
          { monthlyPremium: 400, initialUnsharedAmount: 5000 }
        ]
      },
      // Age bracket: 30-39
      {
        ageBracket: '30-39',
        householdType: 'Member Only',
        costs: [
          { monthlyPremium: 279, initialUnsharedAmount: 1000 },
          { monthlyPremium: 210, initialUnsharedAmount: 2500 },
          { monthlyPremium: 178, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '30-39',
        householdType: 'Member & Spouse',
        costs: [
          { monthlyPremium: 541, initialUnsharedAmount: 1000 },
          { monthlyPremium: 405, initialUnsharedAmount: 2500 },
          { monthlyPremium: 343, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '30-39',
        householdType: 'Member & Child(ren)',
        costs: [
          { monthlyPremium: 522, initialUnsharedAmount: 1000 },
          { monthlyPremium: 391, initialUnsharedAmount: 2500 },
          { monthlyPremium: 333, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '30-39',
        householdType: 'Member & Family',
        costs: [
          { monthlyPremium: 793, initialUnsharedAmount: 1000 },
          { monthlyPremium: 594, initialUnsharedAmount: 2500 },
          { monthlyPremium: 505, initialUnsharedAmount: 5000 }
        ]
      },
      // Age bracket: 40-49
      {
        ageBracket: '40-49',
        householdType: 'Member Only',
        costs: [
          { monthlyPremium: 291, initialUnsharedAmount: 1000 },
          { monthlyPremium: 234, initialUnsharedAmount: 2500 },
          { monthlyPremium: 201, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '40-49',
        householdType: 'Member & Spouse',
        costs: [
          { monthlyPremium: 565, initialUnsharedAmount: 1000 },
          { monthlyPremium: 453, initialUnsharedAmount: 2500 },
          { monthlyPremium: 387, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '40-49',
        householdType: 'Member & Child(ren)',
        costs: [
          { monthlyPremium: 546, initialUnsharedAmount: 1000 },
          { monthlyPremium: 438, initialUnsharedAmount: 2500 },
          { monthlyPremium: 375, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '40-49',
        householdType: 'Member & Family',
        costs: [
          { monthlyPremium: 828, initialUnsharedAmount: 1000 },
          { monthlyPremium: 664, initialUnsharedAmount: 2500 },
          { monthlyPremium: 568, initialUnsharedAmount: 5000 }
        ]
      },
      // Age bracket: 50-64
      {
        ageBracket: '50-64',
        householdType: 'Member Only',
        costs: [
          { monthlyPremium: 351, initialUnsharedAmount: 1000 },
          { monthlyPremium: 295, initialUnsharedAmount: 2500 },
          { monthlyPremium: 232, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '50-64',
        householdType: 'Member & Spouse',
        costs: [
          { monthlyPremium: 688, initialUnsharedAmount: 1000 },
          { monthlyPremium: 576, initialUnsharedAmount: 2500 },
          { monthlyPremium: 450, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '50-64',
        householdType: 'Member & Child(ren)',
        costs: [
          { monthlyPremium: 661, initialUnsharedAmount: 1000 },
          { monthlyPremium: 555, initialUnsharedAmount: 2500 },
          { monthlyPremium: 435, initialUnsharedAmount: 5000 }
        ]
      },
      {
        ageBracket: '50-64',
        householdType: 'Member & Family',
        costs: [
          { monthlyPremium: 1006, initialUnsharedAmount: 1000 },
          { monthlyPremium: 843, initialUnsharedAmount: 2500 },
          { monthlyPremium: 658, initialUnsharedAmount: 5000 }
        ]
      }
    ]
  }
  // ... Additional providers
]; 