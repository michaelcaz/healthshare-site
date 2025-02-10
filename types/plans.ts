export type AgeBracket = '18-29' | '30-39' | '40-49'
export type IUALevel = '1000' | '2500' | '5000'
export type HouseholdSize = 1 | 2

export interface PlanCost {
  age_bracket: AgeBracket
  household_size: HouseholdSize
  iua_level: IUALevel
  monthly_cost: number
  incident_cost: number
}

export interface HealthsharePlan {
  id: string
  name: string
  provider: string
  monthly_cost: number
  incident_cost: number
  annual_maximum: number
  per_incident_maximum: number
  lifetime_maximum?: number
  pre_existing_waiting_period: number
  maternity_coverage: boolean
  maternity_waiting_period?: number
  costs: PlanCost[]
}

export interface Plan {
  id: string
  maternity_coverage: boolean
  maternity_waiting_period: number
  monthly_cost: number
  incident_cost: number
  pre_existing_conditions: boolean
  pre_existing_waiting_period: number
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