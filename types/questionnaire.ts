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
  HIGHER_MONTHLY = 'higher_monthly'
}

export enum AnnualHealthcareSpend {
  LESS_1000 = 'less_1000',
  BETWEEN_1000_5000 = '1000_5000',
  MORE_5000 = 'more_5000'
}

export interface QuestionnaireResponse {
  zip_code: string
  household_size: number
  age: number
  pregnancy: boolean
  pregnancy_planning: 'yes' | 'no' | 'maybe'
  medical_conditions: boolean
  expense_preference: 'lower_monthly' | 'higher_monthly'
  annual_healthcare_spend: 'less_1000' | '1000_5000' | 'more_5000'
} 