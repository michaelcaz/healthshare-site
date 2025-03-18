'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'

export default function SignUpPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectedFrom = searchParams.get('redirectedFrom') || '/questionnaire'
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      // If session exists, redirect to questionnaire
      if (session) {
        router.replace(redirectedFrom)
        return
      }
      
      // If not logged in, redirect to the new account-check page
      router.replace(`/account-check?redirectTo=${encodeURIComponent(redirectedFrom)}`)
    }
    
    checkUser()
  }, [router, supabase.auth, redirectedFrom])

  // This component will not render anything as it immediately redirects
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <p className="text-gray-500">Redirecting...</p>
    </div>
  )
} 