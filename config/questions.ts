import { Question } from '@/types/questionnaire'

export const questions: Question[] = [
  // Page 1: Basic Info
  {
    id: 'basic_info',
    type: 'text',
    text: 'What is your ZIP code?',
    required: true,
    validation: {
      pattern: '^[0-9]{5}$',
      message: 'Please enter a valid 5-digit ZIP code'
    },
    page: 1
  },

  // Page 2: Savings
  {
    id: 'savings',
    type: 'select',
    text: 'Who needs coverage?',
    required: true,
    options: [
      { value: 'individual', label: 'Just me' },
      { value: 'couple', label: 'Me + Spouse/Partner' },
      { value: 'parent_children', label: 'Me + Kids' },
      { value: 'family', label: 'Family' }
    ],
    page: 2
  },
  {
    id: 'age',
    type: 'number',
    text: 'What is your age?',
    required: true,
    validation: {
      min: 0,
      max: 120,
      message: 'Please enter an age between 0 and 120'
    },
    page: 2
  },
  {
    id: 'household_size',
    type: 'number',
    text: 'How many people are in your household?',
    required: true,
    page: 2
  },

  // Page 3: Health Status
  {
    id: 'health_status',
    type: 'boolean',
    text: 'Are you or your partner currently pregnant?',
    required: true,
    page: 3
  },
  {
    id: 'pregnancy_planning',
    type: 'select',
    text: 'Are you or your partner planning to become pregnant in the next 12 months?',
    required: true,
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
      { value: 'maybe', label: 'Maybe' }
    ],
    page: 3
  },

  // Page 4: Coverage Needs
  {
    id: 'coverage_needs',
    type: 'boolean',
    text: 'Do you or a family member have any ongoing medical conditions?',
    required: true,
    page: 4
  },

  // Page 5: Medical Expenses & Annual Spending
  {
    id: 'expense_preference',
    type: 'select',
    text: 'How do you prefer to handle large medical expenses?',
    required: true,
    options: [
      { 
        value: 'lower_monthly', 
        label: 'Lower monthly costs, but I\'ll cover small medical costs myself'
      },
      { 
        value: 'higher_monthly', 
        label: 'Higher monthly costs for more protection on big expenses'
      }
    ],
    tooltip: 'Small medical costs typically include routine doctor visits, basic prescriptions, and preventive care.',
    page: 5
  },
  {
    id: 'annual_healthcare_spend',
    type: 'select',
    text: 'What is your typical annual healthcare spending?',
    required: true,
    options: [
      { value: 'less_1000', label: 'Less than $1,000' },
      { value: '1000_5000', label: '$1,000 - $5,000' },
      { value: 'more_5000', label: 'More than $5,000' }
    ],
    page: 5
  }
]

export const totalPages = 5 