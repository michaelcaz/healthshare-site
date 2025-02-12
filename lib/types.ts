import { QuestionnaireResponse as BaseResponse } from '@/types/questionnaire'

export type QuestionnaireResponse = BaseResponse

export interface QuestionnaireData {
  basicInfo?: {
    zipCode: string;
    coverageType: string;
    oldestAge: string;
  };
  savings?: {
    currentPremium?: string;
  };
  health?: {
    preExistingConditions?: string;
    currentlyPregnant?: string;
    planningPregnancy?: string;
  };
  coverage?: {
    expense_preference?: 'lower_monthly' | 'higher_monthly';
    annual_healthcare_spend?: 'less_1000' | '1000_5000' | 'more_5000';
  };
} 