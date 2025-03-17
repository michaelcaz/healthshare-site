'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { OnboardingLayout } from '@/components/onboarding/OnboardingLayout'
import { EnhancedAuthForm } from '@/components/onboarding/EnhancedAuthForm'

export default function EnhancedSignupPage() {
  const router = useRouter()
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
        router.replace('/questionnaire')
      }
    }
    
    checkUser()
  }, [router, supabase.auth])

  return (
    <OnboardingLayout
      title="I'll get you an awesome price in minutes. Ready to go?"
      description="Create your ShareWell account to get started"
    >
      <EnhancedAuthForm type="signup" />
    </OnboardingLayout>
  )
} 