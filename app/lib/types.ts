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
    prescription_needs: string;
    doctor_visits: string;
  };
} 