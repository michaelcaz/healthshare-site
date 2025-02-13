export const steps = [
  {
    id: 'basic-info',
    title: 'Basic Information',
    description: 'Let\'s start with the basics',
    fields: ['zipCode', 'coverage_type', 'oldestAge']
  },
  {
    id: 'health-needs',
    title: 'Health Needs',
    description: 'Tell us about your healthcare needs',
    fields: ['pre_existing', 'pregnancy', 'pregnancy_planning']
  },
  {
    id: 'preferences',
    title: 'Preferences',
    description: 'Help us understand your preferences',
    fields: ['expense_preference', 'iua_preference', 'annual_healthcare_spend']
  },
  {
    id: 'review',
    title: 'Review',
    description: 'Review your information',
    fields: []
  }
]

export type QuestionnaireStep = typeof steps[number] 