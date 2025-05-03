export type AgeBracket = '18-29' | '30-39' | '40-49'
export type IUALevel = '1000' | '2500' | '5000'
export type HouseholdSize = 1 | 2

/**
 * HealthsharePlanCost represents the detailed cost structure for healthshare plans.
 * This interface is used primarily in UI components for displaying comprehensive plan information.
 * It includes contextual information about the cost such as age bracket and household size.
 */
export interface HealthsharePlanCost {
  // Using snake_case for backward compatibility
  age_bracket: AgeBracket;  // The age range this cost applies to
  household_size: HouseholdSize;  // Whether this is for an individual or family
  iua_level: IUALevel;  // The specific Initial Unshared Amount tier
  monthly_cost: number;  // Monthly payment to maintain coverage
  incident_cost: number;  // Amount paid before sharing begins (per incident)
}

/**
 * Utility type that provides camelCase aliases for HealthsharePlanCost properties.
 * This can be used when you want to access properties in camelCase.
 */
export type HealthsharePlanCostCamelCase = HealthsharePlanCost & {
  ageBracket: AgeBracket;
  householdSize: HouseholdSize;
  iuaLevel: IUALevel;
  monthlyCost: number;
  incidentCost: number;
}

/**
 * HealthsharePlan represents a complete healthshare plan with all its details.
 * This interface is used for displaying comprehensive plan information in UI components.
 */
export interface HealthsharePlan {
  id: string;  // Unique identifier for the plan
  name: string;  // Display name of the plan
  provider: string;  // The healthshare provider offering this plan
  monthly_cost: number;  // Base monthly cost
  incident_cost: number;  // Base incident cost (similar to a deductible)
  annual_maximum: number;  // Maximum coverage per year
  per_incident_maximum: number;  // Maximum coverage per incident
  lifetime_maximum?: number;  // Maximum lifetime coverage (if applicable)
  pre_existing_waiting_period: number;  // Waiting period for pre-existing conditions (in months)
  maternity_coverage: boolean;  // Whether maternity is covered
  maternity_waiting_period?: number;  // Waiting period for maternity coverage (in months)
  costs: HealthsharePlanCost[];  // Detailed cost structure for different demographics
}

/**
 * Utility type that provides camelCase aliases for HealthsharePlan properties.
 * This can be used when you want to access properties in camelCase.
 */
export type HealthsharePlanCamelCase = HealthsharePlan & {
  monthlyCost: number;
  incidentCost: number;
  annualMaximum: number;
  perIncidentMaximum: number;
  lifetimeMaximum?: number;
  preExistingWaitingPeriod: number;
  maternityCoverage: boolean;
  maternityWaitingPeriod?: number;
}

/**
 * Plan represents a simplified plan structure used in the recommendation engine.
 * This interface contains only the essential information needed for plan comparison.
 */
export interface Plan {
  id: string;
  name: string;
  provider: string;
  monthlyCost: number;
  iua: number;
  sharingPercentage: string;
  annualMemberResponsibility: number | null;
  applicationFee: number;
  annualRenewalFee: number;
  otherFees?: Array<{
    name: string;
    amount: number;
  }>;
  waitingPeriods?: {
    accident: string;
    illness: string;
    maternity: string;
    preventive: string;
  };
  networkType: 'PPO' | 'Open' | 'Limited';
  networkDetails?: string;
  prescriptionCoverage: 'Full' | 'Limited' | 'None';
  prescriptionDetails?: string;
  maternity: boolean;
  maternityDetails?: string;
  preventiveCare: boolean;
  preventiveCareDetails?: string;
  specialistCare: boolean;
  specialistCareDetails?: string;
  mentalHealth: boolean;
  mentalHealthDetails?: string;
  preExistingConditions: 'Eligible' | 'Limited' | 'Not Eligible';
  preExistingConditionsDetails?: string;
  eligibilityRestrictions?: string[];
  matchScore?: number;
  matchReasons?: string[];
  logoUrl?: string;
  websiteUrl?: string;
  trustScore?: number;
  reviewCount?: number;
}

export interface HealthshareCoverage {
  doctors: {
    primary_care: {
      is_covered: boolean
      waiting_period: number // in days
      details: string
      typical_cost: string
    }
    specialist: {
      is_covered: boolean
      waiting_period: number
      details: string
      typical_cost: string
    }
    urgent_care: {
      is_covered: boolean
      waiting_period: number
      details: string
      typical_cost: string
    }
  }
  emergency: {
    er_visits: {
      is_covered: boolean
      waiting_period: number
      details: string
      typical_cost: string
    }
    ambulance: {
      is_covered: boolean
      waiting_period: number
      details: string
      typical_cost: string
    }
  }
  hospital: {
    inpatient: {
      is_covered: boolean
      waiting_period: number
      details: string
      typical_cost: string
    }
    outpatient: {
      is_covered: boolean
      waiting_period: number
      details: string
      typical_cost: string
    }
    surgery: {
      is_covered: boolean
      waiting_period: number
      details: string
      typical_cost: string
    }
  }
  maternity: {
    is_covered: boolean
    waiting_period: number // typically in months
    details: string
    typical_cost: string
    restrictions: string[]
  }
  prescriptions: {
    is_covered: boolean
    program_type: 'discount' | 'sharing' | 'hybrid'
    details: string
    typical_savings: string
    restrictions: string[]
  }
  preventive: {
    annual_checkups: {
      is_covered: boolean
      frequency: string
      typical_cost: string
    }
    immunizations: {
      is_covered: boolean
      details: string
    }
    screenings: {
      is_covered: boolean
      details: string
    }
  }
  mental_health: {
    is_covered: boolean
    waiting_period: number
    details: string
    restrictions: string[]
  }
}