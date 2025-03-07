export type QuestionType = 'text' | 'number' | 'select' | 'multiselect' | 'boolean'

export interface QuestionOption {
  value: string
  label: string
}

export interface Question {
  id: string
  type: QuestionType
  text: string
  required: boolean
  page: number
  options?: QuestionOption[]
  validation?: {
    min?: number
    max?: number
    pattern?: string
    message?: string
  }
  tooltip?: string
  dependsOn?: {
    questionId: string
    value: string | number | boolean
  }
}

export enum ExpensePreference {
  LOWER_MONTHLY = 'lower_monthly',
  BALANCED = 'balanced',
  HIGHER_MONTHLY = 'higher_monthly'
}

export enum AnnualHealthcareSpend {
  LESS_1000 = 'less_1000',
  BETWEEN_1000_5000 = '1000_5000',
  MORE_5000 = 'more_5000'
}

export interface QuestionnaireResponse {
  age: number
  coverage_type: 'just_me' | 'me_spouse' | 'me_kids' | 'family'
  iua_preference: '500' | '1000' | '2500' | '5000'
  pregnancy: 'true' | 'false'
  pre_existing: 'true' | 'false'
  state?: string
  expense_preference: 'lower_monthly' | 'higher_monthly'
  pregnancy_planning?: 'yes' | 'no' | 'maybe'
  medical_conditions?: string[]
  zip_code: string
  visit_frequency: 'just_checkups' | 'few_months' | 'monthly_plus'
  financial_capacity?: '500' | '1000' | '2500' | '5000'
  risk_preference?: 'lower_risk' | 'higher_risk'
  pre_existing_approach?: 'long_term' | 'new_needs' | 'balanced'
}