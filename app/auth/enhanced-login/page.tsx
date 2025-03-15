'use client'

import { OnboardingLayout } from '@/components/onboarding/OnboardingLayout'
import { EnhancedAuthForm } from '@/components/onboarding/EnhancedAuthForm'

export default function EnhancedLoginPage() {
  return (
    <OnboardingLayout
      title="Amazing! Enter your email to log in"
      description="Sign in to your ShareWell account to continue"
    >
      <EnhancedAuthForm type="login" />
    </OnboardingLayout>
  )
} 