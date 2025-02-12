import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const QUESTIONNAIRE_COOKIE = 'questionnaire-data'
const BACKUP_COOKIE = 'questionnaire_backup'

export async function POST() {
  const cookieStore = cookies()
  
  // Clear both main and backup cookies
  cookieStore.delete(QUESTIONNAIRE_COOKIE)
  cookieStore.delete(BACKUP_COOKIE)
  
  return NextResponse.json({ success: true })
} 