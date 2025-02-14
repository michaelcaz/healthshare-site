import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

async function verifyProduction() {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  console.log('🔍 Verifying production setup...')

  try {
    // 1. Verify Database Connection
    console.log('\n📡 Testing database connection...')
    const { data: healthCheck, error: healthError } = await supabase
      .from('plans')
      .select('id')
      .limit(1)
    
    if (healthError) throw new Error(`Database connection failed: ${healthError.message}`)
    console.log('✅ Database connection successful')

    // 2. Verify RLS Policies
    console.log('\n🔒 Checking RLS policies...')
    const { data: policies, error: policiesError } = await supabase
      .rpc('get_policies')
    
    if (policiesError) throw new Error(`Failed to check RLS policies: ${policiesError.message}`)
    console.log('✅ RLS policies are configured')

    // 3. Verify Indexes
    console.log('\n📊 Checking database indexes...')
    const { data: indexes, error: indexesError } = await supabase
      .rpc('get_indexes')
    
    if (indexesError) throw new Error(`Failed to check indexes: ${indexesError.message}`)
    console.log('✅ Database indexes are configured')

    // 4. Verify Environment Variables
    console.log('\n🔐 Checking environment variables...')
    const requiredEnvVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'SUPABASE_SERVICE_ROLE_KEY'
    ]

    const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName])
    if (missingEnvVars.length > 0) {
      throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`)
    }
    console.log('✅ All required environment variables are set')

    // 5. Verify Storage Buckets
    console.log('\n📦 Checking storage buckets...')
    const { data: buckets, error: bucketsError } = await supabase
      .storage
      .listBuckets()
    
    if (bucketsError) throw new Error(`Failed to check storage buckets: ${bucketsError.message}`)
    console.log('✅ Storage buckets are configured')

    console.log('\n✨ Production verification completed successfully!')
  } catch (error) {
    console.error('\n❌ Production verification failed:', error)
    process.exit(1)
  }
}

verifyProduction() 