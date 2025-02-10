import { type HealthsharePlan } from '@/types/plans'

export const samplePlans: HealthsharePlan[] = [
  {
    id: "liberty-complete",
    name: "Liberty Complete",
    provider: "Liberty HealthShare",
    monthly_cost: 449,
    incident_cost: 1000,
    annual_maximum: 1000000,
    per_incident_maximum: 600000,
    lifetime_maximum: undefined, // unlimited
    pre_existing_waiting_period: 24,
    maternity_coverage: true,
    maternity_waiting_period: 2,
    costs: [
      {
        age_bracket: '18-29',
        household_size: 1,
        iua_level: '1000',
        monthly_cost: 349,
        incident_cost: 1000
      },
      {
        age_bracket: '30-39',
        household_size: 1,
        iua_level: '1000',
        monthly_cost: 399,
        incident_cost: 1000
      },
      {
        age_bracket: '18-29',
        household_size: 2,
        iua_level: '1000',
        monthly_cost: 449,
        incident_cost: 1000
      }
    ]
  },
  {
    id: "zion-essential",
    name: "Zion Essential",
    provider: "Zion HealthShare",
    monthly_cost: 299,
    incident_cost: 2500,
    annual_maximum: 750000,
    per_incident_maximum: 250000,
    lifetime_maximum: 2000000,
    pre_existing_waiting_period: 24,
    maternity_coverage: false,
    costs: [
      {
        age_bracket: '18-29',
        household_size: 1,
        iua_level: '2500',
        monthly_cost: 299,
        incident_cost: 2500
      },
      {
        age_bracket: '30-39',
        household_size: 1,
        iua_level: '2500',
        monthly_cost: 349,
        incident_cost: 2500
      },
      {
        age_bracket: '18-29',
        household_size: 2,
        iua_level: '2500',
        monthly_cost: 399,
        incident_cost: 2500
      }
    ]
  },
  {
    id: "sedera-premium",
    name: "Sedera Premium",
    provider: "Sedera Health",
    monthly_cost: 499,
    incident_cost: 500,
    annual_maximum: 2000000,
    per_incident_maximum: 1000000,
    lifetime_maximum: undefined, // unlimited
    pre_existing_waiting_period: 36,
    maternity_coverage: true,
    maternity_waiting_period: 10,
    costs: [
      {
        age_bracket: '18-29',
        household_size: 1,
        iua_level: '1000',
        monthly_cost: 499,
        incident_cost: 500
      },
      {
        age_bracket: '30-39',
        household_size: 1,
        iua_level: '1000',
        monthly_cost: 549,
        incident_cost: 500
      },
      {
        age_bracket: '18-29',
        household_size: 2,
        iua_level: '1000',
        monthly_cost: 699,
        incident_cost: 500
      }
    ]
  }
] 