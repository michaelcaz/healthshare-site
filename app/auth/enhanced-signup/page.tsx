'use client'

import { OnboardingLayout } from '@/components/onboarding/OnboardingLayout'
import { EnhancedAuthForm } from '@/components/onboarding/EnhancedAuthForm'

export default function EnhancedSignupPage() {
  return (
    <OnboardingLayout
      title="I'll get you an awesome price in minutes. Ready to go?"
      description="Create your ShareWell account to get started"
    >
      <EnhancedAuthForm type="signup" />
    </OnboardingLayout>
  )
} 