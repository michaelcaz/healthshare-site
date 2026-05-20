// Auto-generated on 2026-05-20T22:04:08.425Z
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
    "id": "zion-healthshare-direct-membership",
    "providerName": "Zion Healthshare",
    "planName": "Direct Membership",
    "maxCoverage": "no limit",
    "annualUnsharedAmount": "Total of paid three IUAs in 12 months",
    "sourceUrl": "https://zionhealthshare.org/?affiliate=200016",
    "ageRules": {
      "type": "standard"
    },
    "planMatrix": [
      {
        "ageBracket": "18-29",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 209,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 219,
            "initialUnsharedAmount": 1250
          },
          {
            "monthlyPremium": 161,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 114,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 399,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 419,
            "initialUnsharedAmount": 1250
          },
          {
            "monthlyPremium": 300,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 205,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 418,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 439,
            "initialUnsharedAmount": 1250
          },
          {
            "monthlyPremium": 303,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 205,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 605,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 635,
            "initialUnsharedAmount": 1250
          },
          {
            "monthlyPremium": 459,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 334,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-39",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 248,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 260,
            "initialUnsharedAmount": 1250
          },
          {
            "monthlyPremium": 204,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 175,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-39",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 459,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 482,
            "initialUnsharedAmount": 1250
          },
          {
            "monthlyPremium": 375,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 297,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-39",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 468,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 491,
            "initialUnsharedAmount": 1250
          },
          {
            "monthlyPremium": 389,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 297,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-39",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 637,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 669,
            "initialUnsharedAmount": 1250
          },
          {
            "monthlyPremium": 519,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 446,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "40-49",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 242,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 254,
            "initialUnsharedAmount": 1250
          },
          {
            "monthlyPremium": 214,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 188,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "40-49",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 483,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 507,
            "initialUnsharedAmount": 1250
          },
          {
            "monthlyPremium": 402,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 323,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "40-49",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 483,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 507,
            "initialUnsharedAmount": 1250
          },
          {
            "monthlyPremium": 402,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 323,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "40-49",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 683,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 717,
            "initialUnsharedAmount": 1250
          },
          {
            "monthlyPremium": 579,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 504,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "50-64",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 305,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 320,
            "initialUnsharedAmount": 1250
          },
          {
            "monthlyPremium": 289,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 207,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "50-64",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 588,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 617,
            "initialUnsharedAmount": 1250
          },
          {
            "monthlyPremium": 487,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 385,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "50-64",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 588,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 617,
            "initialUnsharedAmount": 1250
          },
          {
            "monthlyPremium": 487,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 385,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "50-64",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 856,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 899,
            "initialUnsharedAmount": 1250
          },
          {
            "monthlyPremium": 728,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 565,
            "initialUnsharedAmount": 5000
          }
        ]
      }
    ]
  },
  {
    "id": "zion-healthshare-essential-membership",
    "providerName": "Zion Healthshare",
    "planName": "Essential Membership",
    "maxCoverage": "no limit",
    "annualUnsharedAmount": "Total of paid three IUAs in 12 months",
    "sourceUrl": "https://zionhealthshare.org/?affiliate=200016",
    "ageRules": {
      "type": "standard"
    },
    "planMatrix": [
      {
        "ageBracket": "18-29",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 166,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 174,
            "initialUnsharedAmount": 1250
          },
          {
            "monthlyPremium": 112,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 84,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 331,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 348,
            "initialUnsharedAmount": 1250
          },
          {
            "monthlyPremium": 225,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 165,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 331,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 348,
            "initialUnsharedAmount": 1250
          },
          {
            "monthlyPremium": 225,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 165,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 508,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 533,
            "initialUnsharedAmount": 1250
          },
          {
            "monthlyPremium": 394,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 276,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-49",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 194,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 204,
            "initialUnsharedAmount": 1250
          },
          {
            "monthlyPremium": 134,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 111,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-49",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 357,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 375,
            "initialUnsharedAmount": 1250
          },
          {
            "monthlyPremium": 268,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 222,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-49",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 357,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 375,
            "initialUnsharedAmount": 1250
          },
          {
            "monthlyPremium": 268,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 222,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-49",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 518,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 544,
            "initialUnsharedAmount": 1250
          },
          {
            "monthlyPremium": 406,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 334,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "50-64",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 284,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 298,
            "initialUnsharedAmount": 1250
          },
          {
            "monthlyPremium": 236,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 165,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "50-64",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 515,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 541,
            "initialUnsharedAmount": 1250
          },
          {
            "monthlyPremium": 418,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 323,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "50-64",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 515,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 541,
            "initialUnsharedAmount": 1250
          },
          {
            "monthlyPremium": 418,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 323,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "50-64",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 740,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 777,
            "initialUnsharedAmount": 1250
          },
          {
            "monthlyPremium": 579,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 478,
            "initialUnsharedAmount": 5000
          }
        ]
      }
    ]
  },
  {
    "id": "crowdhealth-standard",
    "providerName": "CrowdHealth",
    "planName": "Standard",
    "maxCoverage": "No limit",
    "annualUnsharedAmount": "Total of paid three IUAs in 12 months",
    "sourceUrl": "https://www.joincrowdhealth.com/",
    "ageRules": {
      "type": "custom",
      "customBrackets": {
        "ranges": [
          {
            "min": 18,
            "max": 54,
            "bracket": "18-54"
          },
          {
            "min": 55,
            "max": 64,
            "bracket": "55-64"
          }
        ]
      }
    },
    "planMatrix": [
      {
        "ageBracket": "18-55",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 200,
            "initialUnsharedAmount": 500
          }
        ]
      },
      {
        "ageBracket": "18-55",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 400,
            "initialUnsharedAmount": 500
          }
        ]
      },
      {
        "ageBracket": "18-55",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 540,
            "initialUnsharedAmount": 500
          }
        ]
      },
      {
        "ageBracket": "18-55",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 660,
            "initialUnsharedAmount": 500
          }
        ]
      },
      {
        "ageBracket": "18-55",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 695,
            "initialUnsharedAmount": 500
          }
        ]
      },
      {
        "ageBracket": "55-64",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 340,
            "initialUnsharedAmount": 500
          }
        ]
      },
      {
        "ageBracket": "55-64",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 540,
            "initialUnsharedAmount": 500
          }
        ]
      },
      {
        "ageBracket": "55-64",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 740,
            "initialUnsharedAmount": 500
          }
        ]
      },
      {
        "ageBracket": "55-64",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 1040,
            "initialUnsharedAmount": 500
          }
        ]
      },
      {
        "ageBracket": "18-55",
        "householdType": "Member & Family (5+)",
        "costs": [
          {
            "monthlyPremium": 720,
            "initialUnsharedAmount": 500
          }
        ]
      }
    ]
  },
  {
    "id": "sedera-access+",
    "providerName": "Sedera",
    "planName": "ACCESS+",
    "maxCoverage": "no limit",
    "annualUnsharedAmount": "Total of paid three IUAs in 12 months",
    "sourceUrl": "",
    "ageRules": {
      "type": "standard"
    },
    "planMatrix": [
      {
        "ageBracket": "18-29",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 289,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45838"
          },
          {
            "monthlyPremium": 272,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45839"
          },
          {
            "monthlyPremium": 244,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45840"
          },
          {
            "monthlyPremium": 217,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45841"
          },
          {
            "monthlyPremium": 166,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45842"
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 535,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45838"
          },
          {
            "monthlyPremium": 501,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45839"
          },
          {
            "monthlyPremium": 446,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45840"
          },
          {
            "monthlyPremium": 391,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45841"
          },
          {
            "monthlyPremium": 288,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45842"
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 515,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45838"
          },
          {
            "monthlyPremium": 483,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45839"
          },
          {
            "monthlyPremium": 431,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45840"
          },
          {
            "monthlyPremium": 380,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45841"
          },
          {
            "monthlyPremium": 281,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45842"
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 767,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45838"
          },
          {
            "monthlyPremium": 721,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45839"
          },
          {
            "monthlyPremium": 640,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45840"
          },
          {
            "monthlyPremium": 561,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45841"
          },
          {
            "monthlyPremium": 409,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45842"
          }
        ]
      },
      {
        "ageBracket": "30-39",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 336,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45838"
          },
          {
            "monthlyPremium": 328,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45839"
          },
          {
            "monthlyPremium": 294,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45840"
          },
          {
            "monthlyPremium": 242,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45841"
          },
          {
            "monthlyPremium": 210,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45842"
          }
        ]
      },
      {
        "ageBracket": "30-39",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 627,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45838"
          },
          {
            "monthlyPremium": 611,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45839"
          },
          {
            "monthlyPremium": 546,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45840"
          },
          {
            "monthlyPremium": 440,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45841"
          },
          {
            "monthlyPremium": 375,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45842"
          }
        ]
      },
      {
        "ageBracket": "30-39",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 604,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45838"
          },
          {
            "monthlyPremium": 589,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45839"
          },
          {
            "monthlyPremium": 525,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45840"
          },
          {
            "monthlyPremium": 427,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45841"
          },
          {
            "monthlyPremium": 364,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45842"
          }
        ]
      },
      {
        "ageBracket": "30-39",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 903,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45838"
          },
          {
            "monthlyPremium": 877,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45839"
          },
          {
            "monthlyPremium": 783,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45840"
          },
          {
            "monthlyPremium": 633,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45841"
          },
          {
            "monthlyPremium": 537,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45842"
          }
        ]
      },
      {
        "ageBracket": "40-49",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 387,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45838"
          },
          {
            "monthlyPremium": 342,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45839"
          },
          {
            "monthlyPremium": 308,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45840"
          },
          {
            "monthlyPremium": 269,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45841"
          },
          {
            "monthlyPremium": 234,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45842"
          }
        ]
      },
      {
        "ageBracket": "40-49",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 731,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45838"
          },
          {
            "monthlyPremium": 638,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45839"
          },
          {
            "monthlyPremium": 573,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45840"
          },
          {
            "monthlyPremium": 495,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45841"
          },
          {
            "monthlyPremium": 425,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45842"
          }
        ]
      },
      {
        "ageBracket": "40-49",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 702,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45838"
          },
          {
            "monthlyPremium": 614,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45839"
          },
          {
            "monthlyPremium": 551,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45840"
          },
          {
            "monthlyPremium": 479,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45841"
          },
          {
            "monthlyPremium": 411,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45842"
          }
        ]
      },
      {
        "ageBracket": "40-49",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 1052,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45838"
          },
          {
            "monthlyPremium": 918,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45839"
          },
          {
            "monthlyPremium": 823,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45840"
          },
          {
            "monthlyPremium": 711,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45841"
          },
          {
            "monthlyPremium": 607,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45842"
          }
        ]
      },
      {
        "ageBracket": "50-59",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 473,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45838"
          },
          {
            "monthlyPremium": 409,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45839"
          },
          {
            "monthlyPremium": 376,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45840"
          },
          {
            "monthlyPremium": 339,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45841"
          },
          {
            "monthlyPremium": 269,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45842"
          }
        ]
      },
      {
        "ageBracket": "50-59",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 901,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45838"
          },
          {
            "monthlyPremium": 775,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45839"
          },
          {
            "monthlyPremium": 710,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45840"
          },
          {
            "monthlyPremium": 633,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45841"
          },
          {
            "monthlyPremium": 495,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45842"
          }
        ]
      },
      {
        "ageBracket": "50-59",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 865,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45838"
          },
          {
            "monthlyPremium": 744,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45839"
          },
          {
            "monthlyPremium": 682,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45840"
          },
          {
            "monthlyPremium": 609,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45841"
          },
          {
            "monthlyPremium": 479,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45842"
          }
        ]
      },
      {
        "ageBracket": "50-59",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 1300,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45838"
          },
          {
            "monthlyPremium": 1117,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45839"
          },
          {
            "monthlyPremium": 1022,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45840"
          },
          {
            "monthlyPremium": 911,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45841"
          },
          {
            "monthlyPremium": 711,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45842"
          }
        ]
      },
      {
        "ageBracket": "60-64",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 802,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45838"
          },
          {
            "monthlyPremium": 693,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45839"
          },
          {
            "monthlyPremium": 646,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45840"
          },
          {
            "monthlyPremium": 585,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45841"
          },
          {
            "monthlyPremium": 476,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45842"
          }
        ]
      },
      {
        "ageBracket": "60-64",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 1560,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45838"
          },
          {
            "monthlyPremium": 1341,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45839"
          },
          {
            "monthlyPremium": 1248,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45840"
          },
          {
            "monthlyPremium": 1127,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45841"
          },
          {
            "monthlyPremium": 906,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45842"
          }
        ]
      },
      {
        "ageBracket": "60-64",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 1489,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45838"
          },
          {
            "monthlyPremium": 1281,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45839"
          },
          {
            "monthlyPremium": 1193,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45840"
          },
          {
            "monthlyPremium": 1078,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45841"
          },
          {
            "monthlyPremium": 871,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45842"
          }
        ]
      },
      {
        "ageBracket": "60-64",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 2255,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45838"
          },
          {
            "monthlyPremium": 1937,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45839"
          },
          {
            "monthlyPremium": 1802,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45840"
          },
          {
            "monthlyPremium": 1627,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45841"
          },
          {
            "monthlyPremium": 1308,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45842"
          }
        ]
      }
    ]
  },
  {
    "id": "sedera-access+-+dpc/vpc",
    "providerName": "Sedera",
    "planName": "ACCESS+\r\n +DPC/VPC",
    "maxCoverage": "no limit",
    "annualUnsharedAmount": "Total of paid three IUAs in 12 months",
    "sourceUrl": "",
    "ageRules": {
      "type": "standard"
    },
    "planMatrix": [
      {
        "ageBracket": "18-29",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 249.15,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45843"
          },
          {
            "monthlyPremium": 234.53,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45844"
          },
          {
            "monthlyPremium": 210.45,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45845"
          },
          {
            "monthlyPremium": 187.23,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45846"
          },
          {
            "monthlyPremium": 143.37,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45847"
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 460.71,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45843"
          },
          {
            "monthlyPremium": 431.47,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45844"
          },
          {
            "monthlyPremium": 384.17,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45845"
          },
          {
            "monthlyPremium": 336.87,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45846"
          },
          {
            "monthlyPremium": 248.29,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45847"
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 443.51,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45843"
          },
          {
            "monthlyPremium": 415.99,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45844"
          },
          {
            "monthlyPremium": 371.27,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45845"
          },
          {
            "monthlyPremium": 327.41,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45846"
          },
          {
            "monthlyPremium": 242.27,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45847"
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 660.23,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45843"
          },
          {
            "monthlyPremium": 620.67,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45844"
          },
          {
            "monthlyPremium": 551.01,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45845"
          },
          {
            "monthlyPremium": 483.07,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45846"
          },
          {
            "monthlyPremium": 352.35,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45847"
          }
        ]
      },
      {
        "ageBracket": "30-39",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 289.57,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45843"
          },
          {
            "monthlyPremium": 282.69,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45844"
          },
          {
            "monthlyPremium": 253.45,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45845"
          },
          {
            "monthlyPremium": 208.73,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45846"
          },
          {
            "monthlyPremium": 181.21,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45847"
          }
        ]
      },
      {
        "ageBracket": "30-39",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 539.83,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45843"
          },
          {
            "monthlyPremium": 526.07,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45844"
          },
          {
            "monthlyPremium": 470.17,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45845"
          },
          {
            "monthlyPremium": 379.01,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45846"
          },
          {
            "monthlyPremium": 323.11,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45847"
          }
        ]
      },
      {
        "ageBracket": "30-39",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 520.05,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45843"
          },
          {
            "monthlyPremium": 507.15,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45844"
          },
          {
            "monthlyPremium": 452.11,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45845"
          },
          {
            "monthlyPremium": 367.83,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45846"
          },
          {
            "monthlyPremium": 313.65,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45847"
          }
        ]
      },
      {
        "ageBracket": "30-39",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 777.19,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45843"
          },
          {
            "monthlyPremium": 754.83,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45844"
          },
          {
            "monthlyPremium": 673.99,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45845"
          },
          {
            "monthlyPremium": 544.99,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45846"
          },
          {
            "monthlyPremium": 462.43,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45847"
          }
        ]
      },
      {
        "ageBracket": "40-49",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 333.43,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45843"
          },
          {
            "monthlyPremium": 294.73,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45844"
          },
          {
            "monthlyPremium": 265.49,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45845"
          },
          {
            "monthlyPremium": 231.95,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45846"
          },
          {
            "monthlyPremium": 201.85,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45847"
          }
        ]
      },
      {
        "ageBracket": "40-49",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 629.27,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45843"
          },
          {
            "monthlyPremium": 549.29,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45844"
          },
          {
            "monthlyPremium": 493.39,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45845"
          },
          {
            "monthlyPremium": 426.31,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45846"
          },
          {
            "monthlyPremium": 366.11,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45847"
          }
        ]
      },
      {
        "ageBracket": "40-49",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 604.33,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45843"
          },
          {
            "monthlyPremium": 528.65,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45844"
          },
          {
            "monthlyPremium": 474.47,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45845"
          },
          {
            "monthlyPremium": 412.55,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45846"
          },
          {
            "monthlyPremium": 354.07,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45847"
          }
        ]
      },
      {
        "ageBracket": "40-49",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 905.33,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45843"
          },
          {
            "monthlyPremium": 790.09,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45844"
          },
          {
            "monthlyPremium": 708.39,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45845"
          },
          {
            "monthlyPremium": 612.07,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45846"
          },
          {
            "monthlyPremium": 522.63,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45847"
          }
        ]
      },
      {
        "ageBracket": "50-59",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 407.39,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45843"
          },
          {
            "monthlyPremium": 352.35,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45844"
          },
          {
            "monthlyPremium": 323.97,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45845"
          },
          {
            "monthlyPremium": 292.15,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45846"
          },
          {
            "monthlyPremium": 231.95,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45847"
          }
        ]
      },
      {
        "ageBracket": "50-59",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 775.47,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45843"
          },
          {
            "monthlyPremium": 667.11,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45844"
          },
          {
            "monthlyPremium": 611.21,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45845"
          },
          {
            "monthlyPremium": 544.99,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45846"
          },
          {
            "monthlyPremium": 426.31,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45847"
          }
        ]
      },
      {
        "ageBracket": "50-59",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 744.51,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45843"
          },
          {
            "monthlyPremium": 640.45,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45844"
          },
          {
            "monthlyPremium": 587.13,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45845"
          },
          {
            "monthlyPremium": 524.35,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45846"
          },
          {
            "monthlyPremium": 412.55,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45847"
          }
        ]
      },
      {
        "ageBracket": "50-59",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 1118.61,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45843"
          },
          {
            "monthlyPremium": 961.23,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45844"
          },
          {
            "monthlyPremium": 879.53,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45845"
          },
          {
            "monthlyPremium": 784.07,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45846"
          },
          {
            "monthlyPremium": 612.07,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45847"
          }
        ]
      },
      {
        "ageBracket": "60-64",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 690.33,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45843"
          },
          {
            "monthlyPremium": 596.59,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45844"
          },
          {
            "monthlyPremium": 556.17,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45845"
          },
          {
            "monthlyPremium": 503.71,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45846"
          },
          {
            "monthlyPremium": 409.97,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45847"
          }
        ]
      },
      {
        "ageBracket": "60-64",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 1342.21,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45843"
          },
          {
            "monthlyPremium": 1153.87,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45844"
          },
          {
            "monthlyPremium": 1073.89,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45845"
          },
          {
            "monthlyPremium": 969.83,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45846"
          },
          {
            "monthlyPremium": 779.77,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45847"
          }
        ]
      },
      {
        "ageBracket": "60-64",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 1281.15,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45843"
          },
          {
            "monthlyPremium": 1102.27,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45844"
          },
          {
            "monthlyPremium": 1026.59,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45845"
          },
          {
            "monthlyPremium": 927.69,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45846"
          },
          {
            "monthlyPremium": 749.67,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45847"
          }
        ]
      },
      {
        "ageBracket": "60-64",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 1939.91,
            "initialUnsharedAmount": 500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45843"
          },
          {
            "monthlyPremium": 1666.43,
            "initialUnsharedAmount": 1000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45844"
          },
          {
            "monthlyPremium": 1550.33,
            "initialUnsharedAmount": 1500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45845"
          },
          {
            "monthlyPremium": 1399.83,
            "initialUnsharedAmount": 2500,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45846"
          },
          {
            "monthlyPremium": 1125.49,
            "initialUnsharedAmount": 5000,
            "sourceUrl": "https://www.1enrollment.com/order/checkout.cfm?id=862417&pdid=45847"
          }
        ]
      }
    ]
  },
  {
    "id": "mpb-health-care+",
    "providerName": "MPB Health",
    "planName": "Care+",
    "isActive": false,
    "maxCoverage": "no limit",
    "annualUnsharedAmount": "Total of paid three IUAs in 12 months",
    "sourceUrl": "",
    "ageRules": {
      "type": "standard"
    },
    "planMatrix": [
      {
        "ageBracket": "18-29",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 245,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 185,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 160,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 435,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 322,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 265,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 435,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 322,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 265,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 662,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 537,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 422,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-49",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 273,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 205,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 185,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-49",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 461,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 364,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 320,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-49",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 461,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 364,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 320,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-49",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 672,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 550,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 480,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "50-65",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 352,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 300,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 235,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "50-65",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 627,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 510,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 420,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "50-65",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 327,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 510,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 420,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "50-65",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 895,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 716,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 620,
            "initialUnsharedAmount": 5000
          }
        ]
      }
    ]
  },
  {
    "id": "mpb-health-direct",
    "providerName": "MPB Health",
    "planName": "Direct",
    "isActive": false,
    "maxCoverage": "no limit",
    "annualUnsharedAmount": "Total of paid three IUAs in 12 months",
    "sourceUrl": "",
    "ageRules": {
      "type": "standard"
    },
    "planMatrix": [
      {
        "ageBracket": "18-29",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 295,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 230,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 190,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 495,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 390,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 325,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 495,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 390,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 325,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 722,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 597,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 485,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-49",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 300,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 280,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 250,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-49",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 540,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 490,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 415,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-49",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 540,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 490,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 415,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-49",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 755,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 700,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 630,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "50-65",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 386,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 350,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 275,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "50-65",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 685,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 580,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 475,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "50-65",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 685,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 580,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 475,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "50-65",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 1005,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 855,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 690,
            "initialUnsharedAmount": 5000
          }
        ]
      }
    ]
  },
  {
    "id": "mpb-health-secure-hsa",
    "providerName": "MPB Health",
    "planName": "Secure HSA",
    "isActive": false,
    "maxCoverage": "no limit",
    "annualUnsharedAmount": "Total of paid three IUAs in 12 months",
    "sourceUrl": "",
    "ageRules": {
      "type": "standard"
    },
    "planMatrix": [
      {
        "ageBracket": "18-29",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 309,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 256,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 231,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 553,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 448,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 393,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 553,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 448,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 393,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 776,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 638,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 541,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-49",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 336,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 276,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 256,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-49",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 578,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 488,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 448,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-49",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 578,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 488,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 448,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-49",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 780,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 658,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 598,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "50-65",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 419,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 369,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 301,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "50-65",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 733,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 633,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 548,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "50-65",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 733,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 633,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 548,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "50-65",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 1018,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 843,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 753,
            "initialUnsharedAmount": 5000
          }
        ]
      }
    ]
  },
  {
    "id": "mpb-health-premium-care",
    "providerName": "MPB Health",
    "planName": "Premium Care",
    "isActive": false,
    "maxCoverage": "no limit",
    "annualUnsharedAmount": "Total of paid three IUAs in 12 months",
    "sourceUrl": "",
    "ageRules": {
      "type": "standard"
    },
    "planMatrix": [
      {
        "ageBracket": "18-29",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 282,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 237,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 212,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 196,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 185,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 642,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 510,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 456,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 409,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 377,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 572,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 459,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 413,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 369,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 346,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 943,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 758,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 679,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 602,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 558,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-64",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 389,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 258,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 254,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 234,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 219,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-64",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 816,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 575,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 507,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 463,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 440,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-64",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 746,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 533,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 474,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 432,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 407,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-64",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 1168,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 837,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 741,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 680,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 640,
            "initialUnsharedAmount": 5000
          }
        ]
      }
    ]
  },
  {
    "id": "mpb-health-premium-hsa",
    "providerName": "MPB Health",
    "planName": "Premium HSA",
    "isActive": false,
    "maxCoverage": "no limit",
    "annualUnsharedAmount": "Total of paid three IUAs in 12 months",
    "sourceUrl": "",
    "ageRules": {
      "type": "standard"
    },
    "planMatrix": [
      {
        "ageBracket": "18-29",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 350,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 301,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 281,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 264,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 248,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 760,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 634,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 580,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 530,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 495,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 685,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 577,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 531,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 489,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 464,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 1056,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 876,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 797,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 725,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 681,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-64",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 453,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 349,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 323,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 301,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 288,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-64",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 934,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 692,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 630,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 587,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 553,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-64",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 867,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 650,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 592,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 551,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 526,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-64",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 1282,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 949,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 860,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 799,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 758,
            "initialUnsharedAmount": 5000
          }
        ]
      }
    ]
  },
  {
    "id": "knew-health-premium-hsa",
    "providerName": "Knew Health",
    "planName": "Premium HSA",
    "maxCoverage": "no limit",
    "annualUnsharedAmount": "Total of paid three IUAs in 12 months",
    "sourceUrl": "",
    "ageRules": {
      "type": "standard"
    },
    "planMatrix": [
      {
        "ageBracket": "18-29",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 241,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 192,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 142,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 468,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 370,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 270,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 453,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 360,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 264,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 687,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 544,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 400,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-39",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 279,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 210,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 178,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-39",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 541,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 405,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 343,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-39",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 522,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 391,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 333,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-39",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 793,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 594,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 505,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "40-49",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 291,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 234,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 201,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "40-49",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 565,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 453,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 387,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "40-49",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 546,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 438,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 375,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "40-49",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 828,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 664,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 568,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "50-59",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 351,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 295,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 232,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "50-59",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 688,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 576,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 450,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "50-59",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 661,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 555,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 435,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "50-59",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 1006,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 843,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 658,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "60-64",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 439,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 369,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 290,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "60-64",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 860,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 720,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 562,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "60-64",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 827,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 694,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 544,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "60-64",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 1258,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 1054,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 823,
            "initialUnsharedAmount": 5000
          }
        ]
      }
    ]
  }
];
