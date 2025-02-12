'use server'

import { cookies } from 'next/headers'
import { QuestionnaireResponse } from '@/lib/types'
import { questionnaireSchema } from '@/schemas/questionnaire'

const QUESTIONNAIRE_COOKIE = 'questionnaire-data'
const BACKUP_COOKIE = 'questionnaire_backup'

export async function saveQuestionnaireResponse(data: QuestionnaireResponse) {
  const cookieStore = cookies()
  cookieStore.set(QUESTIONNAIRE_COOKIE, JSON.stringify(data))
}

export async function getQuestionnaireResponse() {
  const cookieStore = cookies()
  const data = cookieStore.get(QUESTIONNAIRE_COOKIE)
  return data ? JSON.parse(data.value) : null
}

export async function clearQuestionnaireResponse() {
  const cookieStore = cookies()
  cookieStore.delete(QUESTIONNAIRE_COOKIE)
  cookieStore.delete(BACKUP_COOKIE)
}

export async function recoverPartialResponse(): Promise<Partial<QuestionnaireResponse> | null> {
  const cookieStore = cookies()
  const backup = cookieStore.get(BACKUP_COOKIE)

  if (!backup?.value) return null

  try {
    const parsed = JSON.parse(backup.value)
    // Partial validation - allows incomplete data
    return questionnaireSchema.partial().parse(parsed)
  } catch {
    return null
  }
}
