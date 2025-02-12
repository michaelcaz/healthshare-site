import { z } from 'zod'

export const questionnaireSchema = z.object({
  age: z.number(),
  household_size: z.number(),
  iua_preference: z.enum(['1000', '2500', '5000']),
  pregnancy: z.boolean(),
  pre_existing: z.boolean(),
  prescription_needs: z.string(),
  provider_preference: z.string(),
  state: z.string(),
  zip: z.string(),
  expense_preference: z.enum(['lower_monthly', 'higher_monthly']),
  pregnancy_planning: z.enum(['yes', 'no', 'maybe']),
  medical_conditions: z.array(z.string()),
  annual_healthcare_spend: z.string(),
  zip_code: z.string()
})

export type QuestionnaireData = z.infer<typeof questionnaireSchema>
