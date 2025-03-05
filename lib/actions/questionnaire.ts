'use server'

import { cookies } from 'next/headers'
import { QuestionnaireResponse } from '@/types/questionnaire'
import { questionnaireSchema } from '@/schemas/questionnaire'

const QUESTIONNAIRE_COOKIE = 'questionnaire-data'
const BACKUP_COOKIE = 'questionnaire_backup'

interface SaveResponse {
  success: boolean;
  error?: string;
  details?: any;
}

export async function saveQuestionnaireResponse(data: QuestionnaireResponse): Promise<SaveResponse> {
  console.log('Server action saveQuestionnaireResponse called with data:', JSON.stringify(data));
  
  try {
    // Validate data before saving
    console.log('Validating data with schema');
    const validated = questionnaireSchema.safeParse(data)
    
    if (!validated.success) {
      console.error('Server validation error:', validated.error)
      return { 
        success: false, 
        error: 'Invalid questionnaire data',
        details: validated.error.errors
      }
    }
    
    console.log('Data validation successful');
    
    // Convert to string for storage
    const serialized = JSON.stringify(validated.data)
    console.log('Serialized data length:', serialized.length);
    
    // Save to cookies with proper configuration
    console.log('Saving to cookies');
    const cookieStore = cookies()
    
    try {
      cookieStore.set(QUESTIONNAIRE_COOKIE, serialized, {
        path: '/',
        maxAge: 3600, // 1 hour
        httpOnly: false, // Allow client-side access
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      })
      
      // Save backup
      cookieStore.set(BACKUP_COOKIE, serialized, {
        path: '/',
        maxAge: 3600,
        httpOnly: false, // Allow client-side access
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      })
      
      console.log('Cookies set successfully');
    } catch (cookieError) {
      console.error('Error setting cookies:', cookieError);
      throw cookieError;
    }

    console.log('Server action completed successfully');
    return { success: true }
  } catch (error) {
    console.error('Server error saving questionnaire:', error)
    return { 
      success: false, 
      error: 'Failed to save questionnaire response',
      details: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export async function getQuestionnaireResponse() {
  try {
    const cookieStore = cookies()
    const data = cookieStore.get(QUESTIONNAIRE_COOKIE)
    
    if (!data?.value) return null
    
    const parsed = JSON.parse(data.value)
    return questionnaireSchema.parse(parsed)
  } catch (error) {
    console.error('Error retrieving questionnaire:', error)
    return null
  }
}

export async function clearQuestionnaireResponse() {
  const cookieStore = cookies()
  cookieStore.delete(QUESTIONNAIRE_COOKIE)
  cookieStore.delete(BACKUP_COOKIE)
  return { success: true }
}
