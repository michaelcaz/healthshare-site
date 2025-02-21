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
    id: 'visit-frequency',
    title: 'Expected Doctor Visits',
    description: 'Help us understand your expected healthcare needs',
    fields: ['visit_frequency']
  },
  {
    id: 'preferences',
    title: 'Cost Preferences',
    description: 'Help us understand your cost preferences',
    fields: ['expense_preference', 'iua_preference']
  }
] as const

export type QuestionnaireStep = typeof steps[number] 