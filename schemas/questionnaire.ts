import { z } from 'zod'

export const questionnaireSchema = z.object({
  age: z.number(),
  coverage_type: z.enum(['just_me', 'family']),
  iua_preference: z.enum(['1000', '2500', '5000']).default('1000'),
  pregnancy: z.boolean().default(false),
  pre_existing: z.boolean().default(false),
  state: z.string().default(''),
  zip_code: z.string(),
  expense_preference: z.enum(['lower_monthly', 'higher_monthly']).default('lower_monthly'),
  pregnancy_planning: z.enum(['yes', 'no', 'maybe']).default('no'),
  medical_conditions: z.array(z.string()).default([]),
  visit_frequency: z.enum(['just_checkups', 'few_months', 'monthly_plus']).default('just_checkups')
})

export type QuestionnaireData = z.infer<typeof questionnaireSchema>
