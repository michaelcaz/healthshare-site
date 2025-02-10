'use server'

import { createClient } from '../../lib/supabase/server'
import { cookies } from 'next/headers'
import { sendWelcomeEmail } from '../../lib/email/welcome'

export async function signUp(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const firstName = formData.get('firstName') as string

  console.log('=== Starting Signup Process ===')
  console.log('Email:', email)
  console.log('First Name:', firstName)

  try {
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName
        }
      }
    })

    if (signUpError) {
      console.error('Supabase signup error:', signUpError)
      return { error: signUpError.message }
    }

    if (!data.user) {
      console.error('No user returned from signup')
      return { error: 'No user created' }
    }

    console.log('User created successfully:', data.user.id)
    console.log('Attempting to send welcome email...')
    
    try {
      console.log('Before sendWelcomeEmail call')
      const emailResult = await sendWelcomeEmail({
        user: data.user,
        firstName
      })
      console.log('After sendWelcomeEmail call')
      console.log('Welcome email result:', emailResult)
    } catch (emailError) {
      console.error('Welcome email error:', emailError)
      // Don't fail the signup if email fails
    }

    console.log('=== Signup Process Complete ===')
    return { success: true, user: data.user }
  } catch (error) {
    console.error('Unexpected signup error:', error)
    return { error: error instanceof Error ? error.message : 'Failed to sign up' }
  }
} 