import { type User } from '@supabase/supabase-js'

interface SendWelcomeEmailProps {
  user: User
  firstName?: string
}

async function attemptEmailSend(props: SendWelcomeEmailProps, attempt: number = 1): Promise<boolean> {
  const maxAttempts = 3
  const { user, firstName } = props

  try {
    const response = await fetch('https://api.convertkit.com/v3/sequences/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CONVERTKIT_API_KEY}`
      },
      body: JSON.stringify({
        api_key: process.env.CONVERTKIT_API_KEY,
        sequence_id: process.env.CONVERTKIT_WELCOME_SEQUENCE_ID,
        email: user.email,
        first_name: firstName,
        fields: {
          signup_date: new Date().toISOString()
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Failed to add subscriber: ${response.statusText}`)
    }

    return true
  } catch (error) {
    if (attempt < maxAttempts) {
      // Exponential backoff: 1s, 2s, 4s
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt - 1) * 1000))
      return attemptEmailSend(props, attempt + 1)
    }
    throw error
  }
}

export async function sendWelcomeEmail(props: SendWelcomeEmailProps) {
  console.log('=== Welcome Email Process Started ===')
  console.log('Recipient:', {
    email: props.user.email,
    firstName: props.firstName,
    userId: props.user.id
  })
  
  if (!process.env.CONVERTKIT_API_KEY || !process.env.CONVERTKIT_WELCOME_SEQUENCE_ID) {
    console.error('Configuration Error:', {
      hasApiKey: !!process.env.CONVERTKIT_API_KEY,
      hasSequenceId: !!process.env.CONVERTKIT_WELCOME_SEQUENCE_ID
    })
    throw new Error('Missing ConvertKit configuration')
  }

  try {
    console.log('Making API request to Kit:', {
      sequenceId: process.env.CONVERTKIT_WELCOME_SEQUENCE_ID,
      timestamp: new Date().toISOString()
    })

    const response = await fetch(`https://api.convertkit.com/v3/sequences/${process.env.CONVERTKIT_WELCOME_SEQUENCE_ID}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        api_key: process.env.CONVERTKIT_API_KEY,
        email: props.user.email,
        first_name: props.firstName
      })
    })

    const responseData = await response.json()
    
    if (!response.ok) {
      console.error('Kit API Error:', {
        status: response.status,
        statusText: response.statusText,
        response: responseData,
        timestamp: new Date().toISOString()
      })
      throw new Error(`Failed to add subscriber: ${response.statusText}`)
    }

    console.log('Welcome Email Success:', {
      status: response.status,
      response: responseData,
      timestamp: new Date().toISOString()
    })
    console.log('=== Welcome Email Process Completed ===')

    return true
  } catch (error) {
    console.error('Welcome Email Error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    })
    console.log('=== Welcome Email Process Failed ===')
    return false
  }
} 