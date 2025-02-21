import { z } from 'zod'

export const questionnaireSchema = z.object({
  age: z.number(),
  coverage_type: z.enum(['just_me', 'me_spouse', 'me_kids', 'family'], {
    errorMap: () => ({ message: "Please select who needs coverage" })
  }),
  iua_preference: z.enum(['1000', '2500', '5000']).default('1000'),
  pregnancy: z.boolean().default(false),
  pre_existing: z.boolean().default(false),
  state: z.string().optional(),
  zip_code: z.string().min(5, "Please enter a valid ZIP code"),
  expense_preference: z.enum(['lower_monthly', 'higher_monthly']).default('lower_monthly'),
  pregnancy_planning: z.enum(['yes', 'no', 'maybe']).default('no'),
  medical_conditions: z.array(z.string()).optional(),
  visit_frequency: z.enum(['just_checkups', 'few_months', 'monthly_plus']).default('just_checkups')
})

export type QuestionnaireData = z.infer<typeof questionnaireSchema>
