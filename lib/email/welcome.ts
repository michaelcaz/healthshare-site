import { type User } from '@supabase/supabase-js'

interface SendWelcomeEmailProps {
  user: User
  firstName?: string
}

async function attemptEmailSend(props: SendWelcomeEmailProps, attempt: number = 1): Promise<boolean> {
  const maxAttempts = 3
  const { user, firstName } = props

  if (!process.env.CONVERTKIT_API_KEY || !process.env.CONVERTKIT_WELCOME_SEQUENCE_ID) {
    throw new Error('Missing ConvertKit configuration')
  }

  try {
    // Clean the sequence ID to ensure it's just numbers
    const sequenceId = process.env.CONVERTKIT_WELCOME_SEQUENCE_ID.replace(/[^0-9]/g, '')

    console.log('Making API request to Kit:', {
      sequenceId,
      attempt,
      timestamp: new Date().toISOString()
    })

    // Using the working 'courses' endpoint format instead of 'sequences'
    const response = await fetch(`https://api.convertkit.com/v3/courses/${sequenceId}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        api_key: process.env.CONVERTKIT_API_KEY,
        email: user.email,
        first_name: firstName,
        fields: {
          signup_date: new Date().toISOString()
        }
      })
    })

    const responseData = await response.json()

    if (!response.ok) {
      console.error('Kit API Error:', {
        status: response.status,
        statusText: response.statusText,
        response: responseData,
        attempt,
        timestamp: new Date().toISOString()
      })
      throw new Error(`Failed to add subscriber: ${response.statusText}`)
    }

    console.log('Welcome Email Success:', {
      status: response.status,
      response: responseData,
      attempt,
      timestamp: new Date().toISOString()
    })

    return true
  } catch (error) {
    console.error('Welcome Email Error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      attempt,
      timestamp: new Date().toISOString()
    })

    if (attempt < maxAttempts) {
      // Exponential backoff: 1s, 2s, 4s
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt - 1) * 1000))
      return attemptEmailSend(props, attempt + 1)
    }
    
    throw error
  }
}

export async function sendWelcomeEmail(props: SendWelcomeEmailProps): Promise<boolean> {
  console.log('=== Welcome Email Process Started ===')
  console.log('Recipient:', {
    email: props.user.email,
    firstName: props.firstName,
    userId: props.user.id
  })

  try {
    await attemptEmailSend(props)
    console.log('=== Welcome Email Process Completed ===')
    return true
  } catch (error) {
    console.error('Welcome Email Process Failed:', error)
    console.log('=== Welcome Email Process Failed ===')
    return false
  }
} 