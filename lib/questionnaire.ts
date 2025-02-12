import { saveQuestionnaireResponse as saveResponse, getQuestionnaireResponse as getResponse } from './actions/questionnaire'
import { QuestionnaireResponse } from '@/lib/types'
import { questionnaireSchema } from '@/schemas/questionnaire'
import { z } from 'zod'

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

// Recovery mechanism for partial responses
export { recoverPartialResponse } from './actions/questionnaire'