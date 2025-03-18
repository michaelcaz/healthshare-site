'use server'

import { sendWelcomeEmail } from '@/lib/email/welcome'
import { User } from '@supabase/supabase-js'

export async function sendWelcomeEmailAction(user: User, firstName: string) {
  console.log('=== Welcome Email Action Started ===')
  console.log('User:', user.id)
  console.log('Email:', user.email)
  console.log('First Name:', firstName)
  
  try {
    const result = await sendWelcomeEmail({
      user,
      firstName
    })
    
    console.log('Welcome email result:', result)
    return { success: true }
  } catch (error) {
    console.error('Error sending welcome email:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  } finally {
    console.log('=== Welcome Email Action Completed ===')
  }
} 