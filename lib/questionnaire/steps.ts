export const steps = [
  {
    id: 'basic-info',
    title: 'Basic Information',
    description: 'Tell us about yourself',
    fields: ['age', 'coverage_type', 'zip_code']
  },
  {
    id: 'health-status',
    title: 'Health Status',
    description: 'Tell us about your health status',
    fields: ['pre_existing', 'pregnancy', 'pregnancy_planning']
  },
  {
    id: 'preferences',
    title: 'Cost Preferences',
    description: 'Help us understand your cost and healthcare needs',
    fields: ['visit_frequency', 'expense_preference', 'iua_preference']
  }
] as const

export type QuestionnaireStep = typeof steps[number] 