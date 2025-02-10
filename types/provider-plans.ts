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

export type AgeBracket = '18-29' | '30-39' | '40-49' | '50-64';

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

export interface ProviderPlan {
  id: string;
  providerName: string;
  planName: string | string[];
  maxCoverage: string;
  annualUnsharedAmount: string;
  sourceUrl: string;
  planMatrix: PlanMatrix[];
  maternity: MaternityDetails;
  preExistingConditions: PreExistingConditions;
  coverageLimits: CoverageLimits;
}

// New type for pricing data
export interface PricingPlan {
  id: string;
  providerName: string;
  planName: string;
  maxCoverage: string;
  annualUnsharedAmount: string;
  sourceUrl: string;
  planMatrix: PlanMatrix[];
}

// Update the providerPlans array type
export const providerPlans: PricingPlan[] = [ /* ... */ ];

// Create a data file to store all providers
export const healthshareProviders: Record<string, ProviderPlan> = {
  zion: {
    id: 'zion-health',
    providerName: "Zion HealthShare",
    planName: ["Zion Health"],
    maxCoverage: "No limit",
    annualUnsharedAmount: "Total of paid three IUAs in 12 months",
    sourceUrl: "https://zionhealthshare.org/memberships/direct/",
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
  },
  crowdHealth: {
    id: 'crowdhealth-standard',
    providerName: "CrowdHealth",
    planName: ["CrowdHealth Standard"],
    maxCoverage: "No limit",
    annualUnsharedAmount: "$500",
    sourceUrl: "https://www.joincrowdhealth.com/resources/member-guide",
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
  },
  sedera: {
    id: 'sedera-standard',
    providerName: "Sedera",
    planName: ["Select+", "Access+"],
    maxCoverage: "No limit",
    annualUnsharedAmount: "Varies by IUA",
    sourceUrl: "https://sedera.com/",
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
  mpbHealthBasic: {
    id: 'mpb-health-basic',
    providerName: "MPB Health",
    planName: ["Care+", "Direct", "Secure HSA"],
    maxCoverage: "No limit",
    annualUnsharedAmount: "Total of paid three IUAs in 12 months",
    sourceUrl: "https://www.mpbhealth.com/",
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
  },
  mpbHealthPremium: {
    id: 'mpb-health-premium',
    providerName: "MPB Health",
    planName: ["Premium Care", "Premium HSA"],
    maxCoverage: "No limit",
    annualUnsharedAmount: "Total of paid three IUAs in 12 months",
    sourceUrl: "https://www.mpbhealth.com/",
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
  knewHealth: {
    id: 'knew-health-standard',
    providerName: "Knew Health",
    planName: ["Knew Health Standard"],
    maxCoverage: "No limit",
    annualUnsharedAmount: "Varies by IUA",
    sourceUrl: "https://knewhealth.com/",
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
  }
} 