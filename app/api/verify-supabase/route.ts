import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { Database } from '@/types/supabase'
import { withErrorHandler, APIError } from '@/lib/utils/api-error-handler'

export const dynamic = 'force-dynamic'

async function handler() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
  const tests: Record<string, boolean> = {}
  const counts: Record<string, number | null> = {}

  // 1. Verify Database Connection
  const { data: healthCheck, error: healthError } = await supabase
    .from('plans')
    .select('id')
    .limit(1)
  
  if (healthError) {
    throw new APIError('Database connection failed', 500, {
      error: healthError.message
    })
  }
  tests.basicConnection = true

  // 2. Verify RLS Policies
  const { data: policies, error: policiesError } = await supabase
    .rpc('get_policies')
  
  if (policiesError) {
    throw new APIError('Failed to check RLS policies', 500, {
      error: policiesError.message
    })
  }
  tests.plansAccessible = true

  // 3. Verify Storage Buckets
  const { data: buckets, error: bucketsError } = await supabase
    .storage
    .listBuckets()
  
  if (bucketsError) {
    throw new APIError('Failed to check storage buckets', 500, {
      error: bucketsError.message
    })
  }
  tests.storageAccessible = true

  return NextResponse.json({
    status: 'success',
    connection: 'healthy',
    tests,
    counts,
    timestamp: new Date().toISOString(),
  })
}

export const GET = withErrorHandler(handler) 