import { z } from 'zod'

export const questionnaireSchema = z.object({
  age: z.number().min(18, "You must be at least 18 years old").max(120, "Please enter a valid age"),
  coverage_type: z.enum(['just_me', 'me_spouse', 'me_kids', 'family'], {
    errorMap: () => ({ message: "Please select who needs coverage" })
  }),
  iua_preference: z.enum(['500', '1000', '2500', '5000']),
  pregnancy: z.enum(['true', 'false']),
  pre_existing: z.enum(['true', 'false']),
  state: z.string().optional(),
  zip_code: z.string().min(5, "Please enter a valid ZIP code"),
  expense_preference: z.enum(['lower_monthly', 'higher_monthly']),
  pregnancy_planning: z.enum(['yes', 'no', 'maybe']),
  medical_conditions: z.array(z.string()).optional(),
  visit_frequency: z.enum(['just_checkups', 'few_months', 'monthly_plus']),
  preventative_services: z.enum(['yes', 'no']).optional()
})

export type QuestionnaireData = z.infer<typeof questionnaireSchema>
