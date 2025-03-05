import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/supabase'

// Environment variables - with better error handling
const getEnvVariable = (key: string): string => {
  const value = process.env[key]
  if (!value) {
    console.error(`Missing environment variable: ${key}`)
    // Return empty string instead of throwing to allow graceful fallback
    return ''
  }
  return value
}

const SUPABASE_URL = getEnvVariable('NEXT_PUBLIC_SUPABASE_URL')
const SUPABASE_ANON_KEY = getEnvVariable('NEXT_PUBLIC_SUPABASE_ANON_KEY')

// Server-side client (creates new instance per-request)
export function getServerClient() {
  if (typeof window !== 'undefined') {
    console.error('getServerClient called on the client side - this should only be used in server components')
    throw new Error('getServerClient must be called from a server component')
  }

  try {
    console.log('Creating Supabase server client')
    const cookieStore = cookies()
    
    // Check if environment variables are available
    if (!SUPABASE_URL) {
      console.error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
      throw new Error('Supabase URL is required for server client')
    }
    
    if (!SUPABASE_ANON_KEY) {
      console.error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
      throw new Error('Supabase key is required for server client')
    }
    
    console.log('Supabase URL:', SUPABASE_URL.substring(0, 15) + '...')
    console.log('Supabase ANON KEY available (length):', SUPABASE_ANON_KEY.length)
    
    return createServerClient<Database>(
      SUPABASE_URL,
      SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
        },
      }
    )
  } catch (error) {
    console.error('Error creating Supabase server client:', error)
    throw error
  }
} 