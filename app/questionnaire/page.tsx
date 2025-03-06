'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { ProgressIndicator } from '@/components/questionnaire/progress-indicator'

// Dynamically import the form component with no SSR
const QuestionnaireForm = dynamic(
  () => import('@/components/questionnaire/QuestionnaireForm').then(mod => mod.QuestionnaireForm),
  { ssr: false }
)

const steps = [
  { label: 'Basic Info', route: '/questionnaire' },
  { label: 'Health Status', route: '/questionnaire/health' },
  { label: 'Preferences', route: '/questionnaire/preferences' }
];

export default function QuestionnairePage() {
  return (
    <section className="relative py-24" style={{ background: 'var(--color-cream-bg)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProgressIndicator 
          currentPage={1}
          totalPages={3}
          steps={steps}
        />
        
        <Suspense fallback={<div>Loading...</div>}>
          <QuestionnaireForm />
        </Suspense>
      </div>
    </section>
  )
} 