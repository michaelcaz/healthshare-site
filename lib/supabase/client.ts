import { createBrowserClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
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

// Client-side singleton
let clientInstance: ReturnType<typeof createBrowserClient<Database>> | null = null

export function getClientInstance() {
  if (typeof window === 'undefined') {
    console.warn('getClientInstance called on the server side - this should only be used in client components')
    // Return a dummy client for SSR that will be replaced on the client
    return createBrowserClient<Database>(
      SUPABASE_URL || '',
      SUPABASE_ANON_KEY || ''
    )
  }

  if (!clientInstance) {
    console.log('Creating new Supabase browser client instance')
    
    // Check if environment variables are available
    if (!SUPABASE_URL) {
      console.error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
      throw new Error('Supabase URL is required')
    }
    
    if (!SUPABASE_ANON_KEY) {
      console.error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
      throw new Error('Supabase key is required')
    }
    
    try {
      console.log('Supabase URL:', SUPABASE_URL.substring(0, 15) + '...')
      console.log('Supabase ANON KEY available (length):', SUPABASE_ANON_KEY.length)
      
      clientInstance = createBrowserClient<Database>(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
      )
      console.log('Supabase browser client created successfully')
    } catch (error) {
      console.error('Error creating Supabase browser client:', error)
      throw error
    }
  }
  return clientInstance
}

// Admin client for background jobs - only create if service role key is available
let adminClientInstance: ReturnType<typeof createClient<Database>> | null = null

export function getAdminClient() {
  if (!adminClientInstance) {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    if (!serviceRoleKey) {
      console.error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable')
      throw new Error('Supabase service role key is required for admin operations')
    }
    
    if (!SUPABASE_URL) {
      console.error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
      throw new Error('Supabase URL is required')
    }
    
    adminClientInstance = createClient<Database>(
      SUPABASE_URL,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: true,
          persistSession: false
        }
      }
    )
  }
  
  return adminClientInstance
}

// Error handling wrapper
export async function withErrorHandling<T>(
  operation: () => Promise<T>,
  context: string
): Promise<T> {
  try {
    return await operation()
  } catch (error) {
    console.error(`Supabase ${context} error:`, error)
    throw new Error(`Failed to ${context}: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// Retry wrapper for failed operations
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  let lastError: Error | undefined
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error')
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)))
      }
    }
  }
  
  throw lastError
}

// Helper for type-safe queries
export function createTypedQuery(
  client: ReturnType<typeof createBrowserClient<Database>>,
  table: keyof Database['auth']['Tables']
) {
  return client.from(table)
} 