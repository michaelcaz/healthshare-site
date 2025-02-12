import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const cookieStore = cookies()
    
    // Clear all possible questionnaire-related cookies
    const cookiesToClear = [
      'questionnaire-data',
      'questionnaire_data',
      'questionnaire-backup',
      'questionnaire_backup',
      'questionnaire_response',
      'questionnaire-response'
    ]
    
    cookiesToClear.forEach(name => {
      cookieStore.delete(name)
    })
    
    return NextResponse.json({ 
      success: true,
      message: 'All data cleared successfully'
    })
  } catch (error) {
    console.error('Error clearing data:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to clear data'
    }, { 
      status: 500 
    })
  }
} 