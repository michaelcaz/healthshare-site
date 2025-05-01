// Auto-generated on 2025-05-01T17:42:45.782Z
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
            "monthlyPremium": 209,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 156,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 111,
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
            "monthlyPremium": 291,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 199,
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
            "monthlyPremium": 294,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 199,
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
            "monthlyPremium": 446,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 324,
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
            "monthlyPremium": 198,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 170,
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
            "monthlyPremium": 364,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 288,
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
            "monthlyPremium": 378,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 288,
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
            "monthlyPremium": 504,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 433,
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
            "monthlyPremium": 208,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 183,
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
            "monthlyPremium": 390,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 314,
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
            "monthlyPremium": 390,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 314,
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
            "monthlyPremium": 562,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 489,
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
            "monthlyPremium": 281,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 201,
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
            "monthlyPremium": 473,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 374,
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
            "monthlyPremium": 473,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 374,
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
            "monthlyPremium": 707,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 549,
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
            "monthlyPremium": 166,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 109,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 82,
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
            "monthlyPremium": 218,
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
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 331,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 218,
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
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 508,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 383,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 268,
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
            "monthlyPremium": 130,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 108,
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
            "monthlyPremium": 260,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 216,
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
            "monthlyPremium": 260,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 216,
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
            "monthlyPremium": 394,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 324,
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
            "monthlyPremium": 229,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 160,
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
            "monthlyPremium": 406,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 314,
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
            "monthlyPremium": 406,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 314,
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
            "monthlyPremium": 562,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 464,
            "initialUnsharedAmount": 5000
          }
        ]
      }
    ]
  },
  {
    "id": "crowdhealth-essential-membership",
    "providerName": "CrowdHealth",
    "planName": "Essential Membership",
    "maxCoverage": "No limit",
    "annualUnsharedAmount": "Total of paid three IUAs in 12 months",
    "sourceUrl": "",
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
            "monthlyPremium": 195,
            "initialUnsharedAmount": 500
          }
        ]
      },
      {
        "ageBracket": "18-55",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 390,
            "initialUnsharedAmount": 500
          }
        ]
      },
      {
        "ageBracket": "18-55",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 390,
            "initialUnsharedAmount": 500
          }
        ]
      },
      {
        "ageBracket": "18-55",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 640,
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
            "monthlyPremium": 335,
            "initialUnsharedAmount": 500
          }
        ]
      },
      {
        "ageBracket": "55-64",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 530,
            "initialUnsharedAmount": 500
          }
        ]
      },
      {
        "ageBracket": "55-64",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 725,
            "initialUnsharedAmount": 500
          }
        ]
      },
      {
        "ageBracket": "55-64",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 1005,
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
            "monthlyPremium": 267,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 252,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 226,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 201,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 153,
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
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 464,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 413,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 362,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 266,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 477,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 447,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 399,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 352,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 260,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 710,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 667,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 592,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 519,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 378,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-39",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 311,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 303,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 272,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 224,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 194,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-39",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 580,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 565,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 505,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 407,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 347,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-39",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 559,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 545,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 486,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 395,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 337,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-39",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 836,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 812,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 725,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 586,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 497,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "40-49",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 358,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 316,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 285,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 249,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 216,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "40-49",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 677,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 590,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 530,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 458,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 393,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "40-49",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 650,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 568,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 510,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 443,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 380,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "40-49",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 974,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 850,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 762,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 658,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 562,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "50-59",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 438,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 378,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 348,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 314,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 249,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "50-59",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 834,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 717,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 657,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 586,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 458,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "50-59",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 801,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 689,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 631,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 564,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 443,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "50-59",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 1203,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 1034,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 946,
            "initialUnsharedAmount": 1500
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
            "monthlyPremium": 742,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 641,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 598,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 541,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 440,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "60-64",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 1444,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 1241,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 1155,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 1043,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 839,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "60-64",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 1378,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 1186,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 1104,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 998,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 806,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "60-64",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 2088,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 1793,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 1668,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 1506,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 1211,
            "initialUnsharedAmount": 5000
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
            "monthlyPremium": 230.23,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 217.33,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 194.97,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 173.47,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 132.19,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 426.31,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 399.65,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 355.79,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 311.93,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 229.37,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 410.83,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 385.03,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 343.75,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 303.33,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 224.21,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "18-29",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 611.21,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 574.23,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 509.73,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 446.95,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 325.69,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-39",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 268.07,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 261.19,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 232.53,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 193.25,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 167.45,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-39",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 499.41,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 486.51,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 434.91,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 350.63,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 299.03,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-39",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 481.35,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 469.31,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 418.57,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 340.31,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 290.43,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "30-39",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 719.57,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 698.93,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 624.11,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 504.57,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 428.03,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "40-49",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 308.49,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 272.37,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 245.71,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 214.75,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 186.37,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "40-49",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 582.83,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 508.01,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 456.41,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 394.49,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 338.59,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "40-49",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 559.61,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 489.09,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 439.21,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 381.59,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 327.41,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "40-49",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 838.25,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 731.61,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 655.93,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 566.49,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 483.93,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "50-59",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 377.29,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 325.69,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 299.89,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 270.65,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 214.75,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "50-59",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 717.85,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 617.23,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 565.63,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 504.57,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 394.49,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "50-59",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 689.47,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 593.15,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 543.27,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 485.65,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 381.59,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "50-59",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 1035.19,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 889.85,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 814.17,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 725.59,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 566.49,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "60-64",
        "householdType": "Member Only",
        "costs": [
          {
            "monthlyPremium": 683.73,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 551.87,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 514.89,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 465.87,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 379.01,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "60-64",
        "householdType": "Member & Spouse",
        "costs": [
          {
            "monthlyPremium": 1242.45,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 1067.87,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 993.91,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 897.59,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 722.15,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "60-64",
        "householdType": "Member & Child(ren)",
        "costs": [
          {
            "monthlyPremium": 1185.69,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 1020.57,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 950.05,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 858.89,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 693.77,
            "initialUnsharedAmount": 5000
          }
        ]
      },
      {
        "ageBracket": "60-64",
        "householdType": "Member & Family",
        "costs": [
          {
            "monthlyPremium": 1796.29,
            "initialUnsharedAmount": 500
          },
          {
            "monthlyPremium": 1542.59,
            "initialUnsharedAmount": 1000
          },
          {
            "monthlyPremium": 1435.09,
            "initialUnsharedAmount": 1500
          },
          {
            "monthlyPremium": 1295.77,
            "initialUnsharedAmount": 2500
          },
          {
            "monthlyPremium": 1042.07,
            "initialUnsharedAmount": 5000
          }
        ]
      }
    ]
  },
  {
    "id": "mpb-health-care+",
    "providerName": "MPB Health",
    "planName": "Care+",
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
