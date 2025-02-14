import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { Database } from '@/types/supabase'

export const dynamic = 'force-dynamic'

export async function GET() {
  const supabase = createRouteHandlerClient<Database>({ cookies })
  const tests: Record<string, boolean> = {}
  const counts: Record<string, number | null> = {}
  const errors: string[] = []

  try {
    // Test basic connection
    const { data: healthCheck, error: healthError } = await supabase
      .from('plans')
      .select('id')
      .limit(1)

    tests.basicConnection = !healthError
    if (healthError) errors.push(`Basic connection error: ${healthError.message}`)

    // Test plans table access
    const { count: plansCount, error: plansError } = await supabase
      .from('plans')
      .select('*', { count: 'exact', head: true })

    tests.plansAccessible = !plansError
    counts.plans = plansCount
    if (plansError) errors.push(`Plans access error: ${plansError.message}`)

    // Test RLS policies
    const { data: publicData, error: publicError } = await supabase
      .from('plans')
      .select('id')
      .limit(1)

    tests.publicAccessWorking = !publicError && Array.isArray(publicData)
    if (publicError) errors.push(`Public access error: ${publicError.message}`)

    // Test providers table
    const { count: providersCount, error: providersError } = await supabase
      .from('providers')
      .select('*', { count: 'exact', head: true })

    tests.providersAccessible = !providersError
    counts.providers = providersCount
    if (providersError) errors.push(`Providers access error: ${providersError.message}`)

    // Verify storage bucket access if used
    const { data: bucketData, error: bucketError } = await supabase
      .storage
      .getBucket('public')

    tests.storageAccessible = !bucketError
    if (bucketError) errors.push(`Storage access error: ${bucketError.message}`)

    return NextResponse.json({
      status: errors.length === 0 ? 'success' : 'warning',
      connection: tests.basicConnection ? 'healthy' : 'unhealthy',
      tests,
      counts,
      errors: errors.length > 0 ? errors : undefined,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      connection: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      timestamp: new Date().toISOString(),
    }, { status: 500 })
  }
} 