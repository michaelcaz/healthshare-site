import { z } from 'zod'

export const questionnaireSchema = z.object({
  age: z.number(),
  household_size: z.number(),
  coverage_type: z.enum(['just_me', 'me_spouse', 'me_kids', 'family']),
  iua_preference: z.enum(['1000', '2500', '5000']).default('1000'),
  pregnancy: z.boolean().default(false),
  pre_existing: z.boolean().default(false),
  prescription_needs: z.string().default(''),
  provider_preference: z.string().default(''),
  state: z.string().default(''),
  zip: z.string(),
  expense_preference: z.enum(['lower_monthly', 'higher_monthly']).default('lower_monthly'),
  pregnancy_planning: z.enum(['yes', 'no', 'maybe']).default('no'),
  medical_conditions: z.array(z.string()).default([]),
  annual_healthcare_spend: z.string().default(''),
  zip_code: z.string()
})

export type QuestionnaireData = z.infer<typeof questionnaireSchema>
