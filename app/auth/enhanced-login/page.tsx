'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { OnboardingLayout } from '@/components/onboarding/OnboardingLayout'
import { EnhancedAuthForm } from '@/components/onboarding/EnhancedAuthForm'

export default function EnhancedLoginPage() {
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
      title="Amazing! Enter your email to log in"
      description="Sign in to your ShareWell account to continue"
    >
      <EnhancedAuthForm type="login" />
    </OnboardingLayout>
  )
} 