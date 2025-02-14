import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import type { Database } from '@/types/supabase'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side singleton
let clientInstance: ReturnType<typeof createClientComponentClient<Database>> | null = null

export function getClientInstance() {
  if (!clientInstance) {
    clientInstance = createClientComponentClient<Database>()
  }
  return clientInstance
}

// Server-side client (creates new instance per-request)
export function getServerClient() {
  return createServerComponentClient<Database>({ cookies })
}

// Admin client for background jobs
export const adminClient = createClient<Database>(
  SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: false
    }
  }
)

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
  client: ReturnType<typeof createClientComponentClient<Database>>,
  table: keyof Database['auth']['Tables']
) {
  return client.from(table)
} 