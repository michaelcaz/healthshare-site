import { event } from './google-analytics';

export const FunnelEvents = {
  // Detailed Questionnaire Flow
  QUESTIONNAIRE_START: 'questionnaire_start',
  QUESTIONNAIRE_STEP_VIEW: 'questionnaire_step_view',
  QUESTIONNAIRE_STEP_COMPLETE: 'questionnaire_step_complete',
  QUESTIONNAIRE_STEP_BACK: 'questionnaire_step_back',
  QUESTIONNAIRE_ABANDON: 'questionnaire_abandon',
  QUESTIONNAIRE_COMPLETE: 'questionnaire_complete',
  
  // Question Interactions
  QUESTION_ANSWER_CHANGE: 'question_answer_change',
  QUESTION_HELP_VIEW: 'question_help_view',
  
  // Results Flow
  RESULTS_VIEW: 'results_view',
  PLAN_COMPARE_START: 'plan_compare_start',
  PLAN_DETAILS_VIEW: 'plan_details_view',
  
  // Conversion Events
  AFFILIATE_LINK_CLICK: 'affiliate_link_click',
  PROVIDER_REDIRECT: 'provider_redirect',
  
  // User Events
  USER_SIGNUP: 'user_signup',
  USER_LOGIN: 'user_login'
} as const;

export function trackQuestionnaireStep(
  action: keyof typeof FunnelEvents,
  {
    stepNumber,
    stepName,
    timeSpent,
    previousStep,
    isComplete = false,
    answers = {}
  }: {
    stepNumber: number;
    stepName: string;
    timeSpent?: number;
    previousStep?: number;
    isComplete?: boolean;
    answers?: Record<string, any>;
  }
) {
  event({
    action,
    category: 'Questionnaire',
    label: `Step ${stepNumber}: ${stepName}`,
    value: stepNumber,
    // Custom dimensions
    customData: {
      step_number: stepNumber,
      step_name: stepName,
      time_spent: timeSpent,
      previous_step: previousStep,
      is_complete: isComplete,
      answers: JSON.stringify(answers)
    }
  });
}

// Helper for tracking abandonment
export function trackAbandonment(lastStep: number, timeSpent: number) {
  event({
    action: FunnelEvents.QUESTIONNAIRE_ABANDON,
    category: 'Questionnaire',
    label: `Abandoned at Step ${lastStep}`,
    value: lastStep,
    customData: {
      last_step: lastStep,
      time_spent: timeSpent
    }
  });
} 