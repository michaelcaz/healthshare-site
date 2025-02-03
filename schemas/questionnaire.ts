import { z } from 'zod'

export const questionnaireSchema = z.object({
  zip_code: z.string().min(5).max(5),
  household_size: z.number().min(1).max(10),
  age: z.number().min(18).max(100),
  pregnancy: z.boolean(),
  pregnancy_planning: z.enum(['yes', 'no', 'maybe']),
  medical_conditions: z.boolean(),
  expense_preference: z.enum(['lower_monthly', 'higher_monthly']),
  annual_healthcare_spend: z.enum(['less_1000', '1000_5000', 'more_5000'])
})

export type QuestionnaireData = z.infer<typeof questionnaireSchema>
