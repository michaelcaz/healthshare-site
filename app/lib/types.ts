interface QuestionnaireData {
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
    doctor_visits: string;
  };
} 