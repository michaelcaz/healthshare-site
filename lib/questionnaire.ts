import { saveQuestionnaireResponse as saveResponse, getQuestionnaireResponse as getResponse } from './actions/questionnaire'
import { QuestionnaireResponse } from '@/types/questionnaire'
import { questionnaireSchema } from '@/schemas/questionnaire'
import { z } from 'zod'
import { providerPlans, EligiblePlan, HouseholdType } from '@/types/provider-plans'
import { getAgeBracket } from './plan-matching/age-brackets'
import { recoverPartialResponse as recoverFromStorage } from './utils/storage'

const QUESTIONNAIRE_COOKIE = 'questionnaire_response';
const BACKUP_COOKIE = 'questionnaire_backup';

export async function getQuestionnaireResponse(): Promise<QuestionnaireResponse> {
  try {
    const response = await getResponse()
    if (!response) {
      throw new Error('NO_RESPONSE')
    }
    
    // Validate against schema
    const validated = questionnaireSchema.parse(response)
    return validated
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors)
      throw new Error('INVALID_RESPONSE')
    }
    
    if (error instanceof Error && error.message === 'NO_RESPONSE') {
      throw new Error('Please complete the questionnaire first.')
    }

    console.error('Error retrieving questionnaire:', error)
    throw new Error('Something went wrong. Please try again.')
  }
}

export async function saveQuestionnaireResponse(data: QuestionnaireResponse) {
  try {
    await saveResponse(data)
  } catch (error) {
    console.error('Error saving questionnaire:', error)
    throw new Error('Failed to save questionnaire response')
  }
}

export { clearQuestionnaireResponse } from './actions/questionnaire'

// Export recoverPartialResponse from storage utility
export { recoverPartialResponse } from './utils/storage'

export function findEligiblePlans(response: QuestionnaireResponse): EligiblePlan[] {
  console.log('QuestionnaireResponse received:', JSON.stringify(response, null, 2));
  
  // Map coverage_type to household_size
  let household_size = 1; // Default to 1
  
  if (response.coverage_type === 'just_me') {
    household_size = 1;
  } else if (response.coverage_type === 'me_spouse') {
    household_size = 2;
  } else if (response.coverage_type === 'me_kids') {
    household_size = 3; // Assuming at least one child
  } else if (response.coverage_type === 'family') {
    household_size = 4; // Assuming spouse + at least one child
  }
  
  console.log('Derived household_size:', household_size);
  
  const householdType = getHouseholdType(household_size);
  console.log('Household type:', householdType);
  
  return providerPlans.map(plan => {
    const ageBracket = getAgeBracket(response.age, plan.ageRules);
    if (!ageBracket) return null;

    const eligiblePrices = plan.planMatrix
      .filter(matrix => 
        matrix.ageBracket === ageBracket && 
        matrix.householdType === householdType
      )
      .flatMap(matrix => matrix.costs)
      .filter(cost => 
        // Filter by IUA preference if specified
        !response.iua_preference || 
        cost.initialUnsharedAmount.toString() === response.iua_preference
      );

    return eligiblePrices.length ? {
      id: plan.id,
      eligiblePrices
    } : null;
  }).filter((plan): plan is EligiblePlan => plan !== null);
}

function getHouseholdType(size: number): HouseholdType {
  switch (size) {
    case 1:
      return 'Member Only';
    case 2:
      return 'Member & Spouse';
    case 3:
    case 4:
      return 'Member & Child(ren)';
    default:
      return 'Member & Family';
  }
}