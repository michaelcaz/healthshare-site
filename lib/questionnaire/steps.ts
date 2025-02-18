export const steps = [
  {
    id: 'basic-info',
    title: 'Basic Information',
    description: 'Let\'s start with the basics',
    fields: ['age', 'household_size', 'coverage_type']
  },
  {
    id: 'location',
    title: 'Location',
    description: 'Tell us about your location',
    fields: ['state', 'zip_code']
  },
  {
    id: 'health-status',
    title: 'Health Status',
    description: 'Tell us about your health status',
    fields: ['pre_existing', 'medical_conditions']
  },
  {
    id: 'pregnancy',
    title: 'Pregnancy',
    description: 'Tell us about your pregnancy',
    fields: ['pregnancy', 'pregnancy_planning']
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