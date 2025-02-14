import { QuestionnaireResponse } from '@/types/questionnaire'
import { questionnaireSchema } from '@/schemas/questionnaire'

const STORAGE_KEY = 'questionnaire-data'
const BACKUP_KEY = 'questionnaire-backup'

class StorageManager {
  static saveData(key: string, data: any) {
    try {
      const serialized = JSON.stringify(data)
      if (typeof window !== 'undefined') {
        // Save to localStorage
        window.localStorage.setItem(key, serialized)
        
        // Also try to save as cookie
        document.cookie = `${key}=${encodeURIComponent(serialized)}; path=/; max-age=3600`
      }
    } catch (error) {
      console.error('Error saving data:', error)
      throw new Error('Failed to save data')
    }
  }

  static getData(key: string) {
    if (typeof window === 'undefined') return null

    try {
      // Try localStorage first
      const localData = window.localStorage.getItem(key)
      if (localData) {
        return JSON.parse(localData)
      }

      // Try cookies as fallback
      const cookies = document.cookie.split(';')
      const cookie = cookies.find(c => c.trim().startsWith(`${key}=`))
      if (cookie) {
        const value = cookie.split('=')[1]
        return JSON.parse(decodeURIComponent(value))
      }

      return null
    } catch (error) {
      console.error('Error retrieving data:', error)
      return null
    }
  }

  static clearData(key: string) {
    if (typeof window === 'undefined') return

    try {
      // Clear localStorage
      window.localStorage.removeItem(key)
      
      // Clear cookie
      document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
    } catch (error) {
      console.error('Error clearing data:', error)
    }
  }
}

export function saveQuestionnaireResponse(data: QuestionnaireResponse) {
  try {
    // Validate data before saving
    const validated = questionnaireSchema.parse(data)
    StorageManager.saveData(STORAGE_KEY, validated)
    StorageManager.saveData(BACKUP_KEY, validated)
  } catch (error) {
    console.error('Validation error when saving questionnaire:', error)
    throw new Error('Invalid questionnaire data')
  }
}

export function getQuestionnaireResponse(): QuestionnaireResponse | null {
  try {
    const data = StorageManager.getData(STORAGE_KEY)
    if (!data) return null
    
    return questionnaireSchema.parse(data)
  } catch (error) {
    console.error('Error retrieving questionnaire:', error)
    return null
  }
}

export function clearQuestionnaireResponse() {
  StorageManager.clearData(STORAGE_KEY)
  StorageManager.clearData(BACKUP_KEY)
}

export function recoverPartialResponse(): Partial<QuestionnaireResponse> | null {
  try {
    const data = StorageManager.getData(BACKUP_KEY)
    if (!data) return null
    
    return questionnaireSchema.partial().parse(data)
  } catch {
    return null
  }
} 