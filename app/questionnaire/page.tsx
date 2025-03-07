'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the form component with no SSR
const QuestionnaireForm = dynamic(
  () => import('@/components/questionnaire/QuestionnaireForm').then(mod => mod.QuestionnaireForm),
  { ssr: false }
)

export default function QuestionnairePage() {
  return (
    <section className="relative py-24" style={{ background: 'var(--color-cream-bg)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div>Loading...</div>}>
          <QuestionnaireForm />
        </Suspense>
      </div>
    </section>
  )
} 