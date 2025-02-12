import { saveQuestionnaireResponse as saveResponse, getQuestionnaireResponse as getResponse } from './actions/questionnaire'
import { QuestionnaireResponse } from '@/lib/types'
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
  const householdType = getHouseholdType(response.household_size);

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