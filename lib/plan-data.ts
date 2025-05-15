import { planComparisonSchema } from '@/schemas/plan-comparison-schema';

export interface PlanComparisonFeature {
  planName: string;
  emergencyServices: string;
  surgicalProcedures: string;
  preventativeServices: string;
  maternityCoverage: string;
  pregnancyWaitingPeriod: string;
  preExistingConditionWaitingPeriod: string;
  alternativeMedicine: string;
  telemedicine: string;
  prescriptionDrugsAfterIUA: string;
  lifetimeLimit: string;
}

export const planData: PlanComparisonFeature[] = [
  {
    planName: 'Zion Essential',
    emergencyServices: 'check',
    surgicalProcedures: 'check',
    preventativeServices: 'x',
    maternityCoverage: 'check',
    pregnancyWaitingPeriod: '6 months',
    preExistingConditionWaitingPeriod: '12 months',
    alternativeMedicine: 'check',
    telemedicine: 'check',
    prescriptionDrugsAfterIUA: 'check',
    lifetimeLimit: 'none',
  },
  {
    planName: 'Zion Direct',
    emergencyServices: 'check',
    surgicalProcedures: 'check',
    preventativeServices: 'check',
    maternityCoverage: 'check',
    pregnancyWaitingPeriod: '6 months',
    preExistingConditionWaitingPeriod: '12 months',
    alternativeMedicine: 'check',
    telemedicine: 'check',
    prescriptionDrugsAfterIUA: 'check',
    lifetimeLimit: 'none',
  },
  {
    planName: 'Sedera Access+',
    emergencyServices: 'check',
    surgicalProcedures: 'check',
    preventativeServices: 'check',
    maternityCoverage: 'check',
    pregnancyWaitingPeriod: '3 months',
    preExistingConditionWaitingPeriod: '12 months',
    alternativeMedicine: 'x',
    telemedicine: 'check',
    prescriptionDrugsAfterIUA: 'check',
    lifetimeLimit: 'none',
  },
  {
    planName: 'Sedera Access+ DPC',
    emergencyServices: 'check',
    surgicalProcedures: 'check',
    preventativeServices: 'x',
    maternityCoverage: 'check',
    pregnancyWaitingPeriod: '3 months',
    preExistingConditionWaitingPeriod: '12 months',
    alternativeMedicine: 'x',
    telemedicine: 'check',
    prescriptionDrugsAfterIUA: 'check',
    lifetimeLimit: 'none',
  },
  {
    planName: 'Crowd Health',
    emergencyServices: 'check',
    surgicalProcedures: 'check',
    preventativeServices: 'check',
    maternityCoverage: 'check',
    pregnancyWaitingPeriod: '10 months',
    preExistingConditionWaitingPeriod: '24 months',
    alternativeMedicine: 'x',
    telemedicine: 'check',
    prescriptionDrugsAfterIUA: 'check',
    lifetimeLimit: 'none',
  },
  {
    planName: 'Knew Health',
    emergencyServices: 'check',
    surgicalProcedures: 'check',
    preventativeServices: 'check',
    maternityCoverage: 'check',
    pregnancyWaitingPeriod: '12 months',
    preExistingConditionWaitingPeriod: '12 months',
    alternativeMedicine: 'check',
    telemedicine: 'check',
    prescriptionDrugsAfterIUA: 'check',
    lifetimeLimit: 'none',
  },
];

planComparisonSchema.array().parse(planData); 