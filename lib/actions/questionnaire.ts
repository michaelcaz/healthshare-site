'use server'

import { cookies } from 'next/headers'
import { QuestionnaireResponse } from '@/lib/types'
import { questionnaireSchema } from '@/schemas/questionnaire'

const QUESTIONNAIRE_COOKIE = 'questionnaire-data'
const BACKUP_COOKIE = 'questionnaire_backup'

interface SaveResponse {
  success: boolean;
  error?: string;
  details?: any;
}

export async function saveQuestionnaireResponse(data: QuestionnaireResponse): Promise<SaveResponse> {
  try {
    // Validate data before saving
    const validated = questionnaireSchema.safeParse(data)
    
    if (!validated.success) {
      console.error('Validation error:', validated.error)
      return { 
        success: false, 
        error: 'Invalid questionnaire data',
        details: validated.error.errors
      }
    }
    
    // Convert to string for storage
    const serialized = JSON.stringify(validated.data)
    
    // Save to cookies with proper configuration
    const cookieStore = cookies()
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

    return { success: true }
  } catch (error) {
    console.error('Error saving questionnaire:', error)
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
