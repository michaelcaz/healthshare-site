export interface QuestionnaireResponse {
  age: number;
  household_size: number;
  iua_preference: '1000' | '2500' | '5000';
  pregnancy: boolean;
  pre_existing: boolean;
  prescription_needs: string;
  provider_preference: string;
  state: string;
  zip: string;
  expense_preference: 'lower_monthly' | 'higher_monthly';
  pregnancy_planning: 'yes' | 'no' | 'maybe';
  medical_conditions: string[];
  annual_healthcare_spend: string;
  zip_code: string;
}

export interface QuestionnaireData {
  basicInfo?: {
    zipCode: string;
    coverageType: string;
    oldestAge: string;
  };
  savings?: {
    currentPremium: string;
  };
  health?: {
    preExistingConditions: string;
    currentlyPregnant: string;
    planningPregnancy: string;
  };
  coverage?: {
    expense_preference: string;
    prescription_needs: string;
    doctor_visits: string;
  };
} 