'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the form component with no SSR
const QuestionnaireForm = dynamic(
  () => import('@/components/questionnaire/QuestionnaireForm'),
  { ssr: false }
)

export default function QuestionnairePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuestionnaireForm />
    </Suspense>
  )
} 