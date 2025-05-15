import { z } from 'zod';

export const planComparisonSchema = z.object({
  planName: z.string(),
  emergencyServices: z.string(),
  surgicalProcedures: z.string(),
  preventativeServices: z.string(),
  maternityCoverage: z.string(),
  pregnancyWaitingPeriod: z.string(),
  preExistingConditionWaitingPeriod: z.string(),
  alternativeMedicine: z.string(),
  telemedicine: z.string(),
  prescriptionDrugsAfterIUA: z.string(),
  lifetimeLimit: z.string(),
}); 