import { cookies } from 'next/headers';
import { QuestionnaireResponse, questionnaireSchema } from '@/lib/types';
import { z } from 'zod';

const QUESTIONNAIRE_COOKIE = 'questionnaire_response';
const BACKUP_COOKIE = 'questionnaire_backup';

export async function getQuestionnaireResponse(): Promise<QuestionnaireResponse> {
  const cookieStore = cookies();
  const response = cookieStore.get(QUESTIONNAIRE_COOKIE);
  const backup = cookieStore.get(BACKUP_COOKIE);
  
  try {
    if (response?.value) {
      const parsed = JSON.parse(response.value);
      // Validate against schema
      const validated = questionnaireSchema.parse(parsed);
      return validated;
    }

    // Try to recover from backup if main response is missing
    if (backup?.value) {
      const parsed = JSON.parse(backup.value);
      const validated = questionnaireSchema.parse(parsed);
      // Restore from backup
      await saveQuestionnaireResponse(validated);
      return validated;
    }

    throw new Error('NO_RESPONSE');
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
      throw new Error('INVALID_RESPONSE');
    }
    
    if (error.message === 'NO_RESPONSE') {
      throw new Error('Please complete the questionnaire first.');
    }

    console.error('Error retrieving questionnaire:', error);
    throw new Error('Something went wrong. Please try again.');
  }
}

export async function saveQuestionnaireResponse(response: QuestionnaireResponse): Promise<void> {
  const cookieStore = cookies();
  
  try {
    // Validate before saving
    const validated = questionnaireSchema.parse(response);
    const responseString = JSON.stringify(validated);

    // Save main response
    cookieStore.set(QUESTIONNAIRE_COOKIE, responseString, {
      maxAge: 30 * 60,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    // Save backup
    cookieStore.set(BACKUP_COOKIE, responseString, {
      maxAge: 24 * 60 * 60, // 24 hours backup
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
      throw new Error('Invalid questionnaire data. Please check your responses.');
    }
    throw new Error('Failed to save questionnaire. Please try again.');
  }
}

export function clearQuestionnaireResponse(): void {
  const cookieStore = cookies();
  cookieStore.delete(QUESTIONNAIRE_COOKIE);
  cookieStore.delete(BACKUP_COOKIE);
}

// Recovery mechanism for partial responses
export async function recoverPartialResponse(): Promise<Partial<QuestionnaireResponse> | null> {
  const cookieStore = cookies();
  const backup = cookieStore.get(BACKUP_COOKIE);

  if (!backup?.value) return null;

  try {
    const parsed = JSON.parse(backup.value);
    // Partial validation - allows incomplete data
    return questionnaireSchema.partial().parse(parsed);
  } catch {
    return null;
  }
}