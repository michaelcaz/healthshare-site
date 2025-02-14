import { QuestionnaireResponse } from '@/types/questionnaire';

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
    preExistingConditions: string;
    currentlyPregnant: string;
    planningPregnancy: string;
  };
  coverage?: {
    expense_preference: string;
    doctor_visits: string;
  };
}

// Re-export QuestionnaireResponse for backward compatibility
export type { QuestionnaireResponse }; 