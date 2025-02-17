export interface MaternityTier {
  year: number
  maximum: number
  details?: string
}

export interface PreExistingTier {
  timeframe: string
  maximum: number | 'Not Shareable' | 'Fully Shareable'
}

export interface PlanCost {
  monthlyPremium: number;
  initialUnsharedAmount: number;
}

export interface PlanMatrix {
  ageBracket: AgeBracket;
  householdType: HouseholdType;
  costs: PlanCost[];
}

export type StandardAgeBracket = '18-29' | '30-39' | '40-49' | '50-64';
export type CustomAgeBracket = '18-54' | '55-64';
export type AgeBracket = StandardAgeBracket | CustomAgeBracket;

export type CoverageType = 'just_me' | 'me_spouse' | 'me_kids' | 'family';

export type HouseholdType = 
  | 'Member Only' 
  | 'Member & Spouse'
  | 'Member & Child(ren)'
  | 'Member & Family';

interface MaternityDetails {
  coverage: {
    services: string[];
    additionalDetails?: string;
  };
  waitingPeriod: {
    months: number;
    details: string;
  };
}

interface PreExistingConditions {
  waitingPeriod: number;
  tiers: PreExistingTier[];
  additionalDetails?: string;
}

interface CoverageLimits {
  annual: string;
  lifetime: {
    limit: string;
    details?: string;
  };
}

export interface PlanVariant {
  id: string;
  name: string;
  maxCoverage: string;
  annualUnsharedAmount: string;
  planMatrix: PlanMatrix[];
  maternity: MaternityDetails;
  preExistingConditions: PreExistingConditions;
  coverageLimits: CoverageLimits;
}

export interface ProviderPlan {
  id: string;
  providerName: string;
  sourceUrl: string;
  plans: PlanVariant[];
}

export interface ProviderAgeRules {
  type: 'standard' | 'custom';
  customBrackets?: {
    ranges: Array<{
      min: number;
      max: number;
      bracket: CustomAgeBracket;
    }>;
  };
}

export interface PricingPlan {
  id: string;
  providerName: string;
  planName: string;
  maxCoverage: string;
  annualUnsharedAmount: string;
  sourceUrl: string;
  ageRules: ProviderAgeRules;
  planMatrix: PlanMatrix[];
}

export interface EligiblePlan {
  id: string;
  providerName: string;
  planName: string;
  maxCoverage: string;
  eligiblePrices: PlanCost[];
}

// Update the providerPlans array type
export const providerPlans: PricingPlan[] = [ /* ... */ ];

// Create a data file to store all providers
export const healthshareProviders: Record<string, ProviderPlan> = {
  zion: {
    id: 'zion-health',
    providerName: "Zion HealthShare",
    sourceUrl: "https://zionhealthshare.org/memberships/direct/",
    plans: [
      {
        id: 'zion-direct',
        name: "Zion Direct",
        maxCoverage: "No limit",
        annualUnsharedAmount: "Total of paid three IUAs in 12 months",
        planMatrix: [],
        maternity: {
          coverage: {
            services: ["miscarriage", "prenatal care", "postnatal care", "delivery"],
            additionalDetails: "All maternity requests will be subject to a $2,500 IUA no matter the household IUA"
          },
          waitingPeriod: {
            months: 6,
            details: "6 month waiting period before maternity is covered. Conception must occur after waiting period."
          }
        },
        preExistingConditions: {
          waitingPeriod: 12,
          tiers: [
            { timeframe: "Year 2", maximum: 25000 },
            { timeframe: "Year 3", maximum: 50000 },
            { timeframe: "Year 4", maximum: 125000 },
            { timeframe: "After 4 years", maximum: 125000 }
          ],
          additionalDetails: "The maximum resets each membership year"
        },
        coverageLimits: {
          annual: "No limit",
          lifetime: {
            limit: "No limit"
          }
        }
      },
      {
        id: 'zion-essential',
        name: "Essential Membership",
        maxCoverage: "No limit",
        annualUnsharedAmount: "Total of paid three IUAs in 12 months",
        planMatrix: [
          // Age 18-29
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
          // ... continue with other age brackets and household types
        ],
        maternity: {
          coverage: {
            services: ["miscarriage", "prenatal care", "postnatal care", "delivery"],
            additionalDetails: "As of April 1st, all maternity requests will be subject to a $2,500 IUA no matter the household IUA"
          },
          waitingPeriod: {
            months: 6,
            details: "6 month waiting period before maternity is covered"
          }
        },
        preExistingConditions: {
          waitingPeriod: 12,
          tiers: [
            { timeframe: "Year 2", maximum: 25000 },
            { timeframe: "Year 3", maximum: 50000 },
            { timeframe: "Year 4", maximum: 125000 },
            { timeframe: "After 4 years", maximum: 125000 }
          ],
          additionalDetails: "The maximum resets each membership year"
        },
        coverageLimits: {
          annual: "No limit",
          lifetime: {
            limit: "No limit"
          }
        }
      }
    ]
  },
  crowdHealth: {
    id: 'crowdhealth-standard',
    providerName: "CrowdHealth",
    sourceUrl: "https://www.joincrowdhealth.com/resources/member-guide",
    plans: [{
      id: 'crowdhealth-standard',
      name: "CrowdHealth Standard",
      maxCoverage: "No limit",
      annualUnsharedAmount: "$500",
      planMatrix: [],
      maternity: {
        coverage: {
          services: ["prenatal", "labor", "delivery"],
          additionalDetails: "$3,000 member commitment"
        },
        waitingPeriod: {
          months: 10,
          details: "10 months (300 days)"
        }
      },
      preExistingConditions: {
        waitingPeriod: 12,
        tiers: [
          { timeframe: "First 12 Months", maximum: "Not Shareable" },
          { timeframe: "Months 13-24", maximum: 25000 },
          { timeframe: "After 24 months", maximum: 100000 }
        ]
      },
      coverageLimits: {
        annual: "No limit",
        lifetime: {
          limit: "No limit"
        }
      }
    }]
  },
  sedera: {
    id: 'sedera',
    providerName: "Sedera",
    sourceUrl: "https://sedera.com/",
    plans: [
      {
        id: 'sedera-select-plus',
        name: "Select+",
        maxCoverage: "No limit",
        annualUnsharedAmount: "Varies by IUA",
        planMatrix: [],
        maternity: {
          coverage: {
            services: ["Normal and emergency Cesarean"],
            additionalDetails: "total Maternity IUA of 2x the member's selected IUA up to a maximum of $5,000\n\nNon-emergency/Elective Cesarean has a fixed Maternity IUA of $5,000"
          },
          waitingPeriod: {
            months: 9,
            details: "9 months"
          }
        },
        preExistingConditions: {
          waitingPeriod: 12,
          tiers: [
            { timeframe: "First 12 Months", maximum: "Not Shareable" },
            { timeframe: "Months 13-24", maximum: 25000 },
            { timeframe: "Months 25-36", maximum: 50000 },
            { timeframe: "Months 37 and up", maximum: "Fully Shareable" }
          ]
        },
        coverageLimits: {
          annual: "No limit",
          lifetime: {
            limit: "No limit",
            details: "Sharing is limited to the total number of shares made available by the collective participants"
          }
        }
      },
      {
        id: 'sedera-access-plus',
        name: "Access+",
        maxCoverage: "No limit",
        annualUnsharedAmount: "Varies by IUA",
        planMatrix: [],
        maternity: {
          coverage: {
            services: ["Normal and emergency Cesarean"],
            additionalDetails: "total Maternity IUA of 2x the member's selected IUA up to a maximum of $5,000\n\nNon-emergency/Elective Cesarean has a fixed Maternity IUA of $5,000"
          },
          waitingPeriod: {
            months: 9,
            details: "9 months"
          }
        },
        preExistingConditions: {
          waitingPeriod: 12,
          tiers: [
            { timeframe: "First 12 Months", maximum: "Not Shareable" },
            { timeframe: "Months 13-24", maximum: 25000 },
            { timeframe: "Months 25-36", maximum: 50000 },
            { timeframe: "Months 37 and up", maximum: "Fully Shareable" }
          ]
        },
        coverageLimits: {
          annual: "No limit",
          lifetime: {
            limit: "No limit",
            details: "Sharing is limited to the total number of shares made available by the collective participants"
          }
        }
      }
    ]
  },
  mpbHealthBasic: {
    id: 'mpb-health-basic',
    providerName: "MPB Health",
    sourceUrl: "https://www.mpbhealth.com/",
    plans: [{
      id: 'mpb-health-basic',
      name: "MPB Health Basic",
      maxCoverage: "No limit",
      annualUnsharedAmount: "Total of paid three IUAs in 12 months",
      planMatrix: [],
      maternity: {
        coverage: {
          services: ["miscarriage", "prenatal care", "postnatal care", "delivery"]
        },
        waitingPeriod: {
          months: 0,
          details: "Conception must have occurred after membership has been active"
        }
      },
      preExistingConditions: {
        waitingPeriod: 12,
        tiers: [
          { timeframe: "Year 2", maximum: 25000 },
          { timeframe: "Year 3", maximum: 50000 },
          { timeframe: "Year 4", maximum: 125000 },
          { timeframe: "After 4 years", maximum: 125000 }
        ],
        additionalDetails: "The maximum resets each membership year"
      },
      coverageLimits: {
        annual: "No limit",
        lifetime: {
          limit: "No limit"
        }
      }
    }]
  },
  mpbHealthPremium: {
    id: 'mpb-health-premium',
    providerName: "MPB Health",
    sourceUrl: "https://www.mpbhealth.com/",
    plans: [{
      id: 'mpb-health-premium',
      name: "MPB Health Premium",
      maxCoverage: "No limit",
      annualUnsharedAmount: "Total of paid three IUAs in 12 months",
      planMatrix: [],
      maternity: {
        coverage: {
          services: ["Normal and emergency Cesarean"],
          additionalDetails: "total Maternity IUA of 2x the member's selected IUA up to a maximum of $5,000\n\nNon-emergency/Elective Cesarean has a fixed Maternity IUA of $5,000"
        },
        waitingPeriod: {
          months: 9,
          details: "9 months"
        }
      },
      preExistingConditions: {
        waitingPeriod: 12,
        tiers: [
          { timeframe: "First 12 Months", maximum: "Not Shareable" },
          { timeframe: "Months 13-24", maximum: 25000 },
          { timeframe: "Months 25-36", maximum: 50000 },
          { timeframe: "Months 37 and up", maximum: "Fully Shareable" }
        ]
      },
      coverageLimits: {
        annual: "No limit",
        lifetime: {
          limit: "No limit",
          details: "Sharing is limited to the total number of shares made available by the collective participants"
        }
      }
    }]
  },
  knewHealth: {
    id: 'knew-health-standard',
    providerName: "Knew Health",
    sourceUrl: "https://knewhealth.com/",
    plans: [{
      id: 'knew-health-standard',
      name: "Knew Health Standard",
      maxCoverage: "No limit",
      annualUnsharedAmount: "Varies by IUA",
      planMatrix: [],
      maternity: {
        coverage: {
          services: ["miscarriage", "prenatal care", "postnatal care", "delivery"],
          additionalDetails: "STD screenings prescribed by a licensed practitioner as part of routine prenatal care are shareable"
        },
        waitingPeriod: {
          months: 12,
          details: "12 months"
        }
      },
      preExistingConditions: {
        waitingPeriod: 12,
        tiers: [
          { timeframe: "Year 1", maximum: "Not Shareable" },
          { timeframe: "Year 2", maximum: 25000 },
          { timeframe: "Year 3", maximum: 50000 },
          { timeframe: "Year 4+", maximum: 125000 }
        ]
      },
      coverageLimits: {
        annual: "No limit",
        lifetime: {
          limit: "No limit"
        }
      }
    }]
  }
} 