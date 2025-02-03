'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { questionnaireSchema, type QuestionnaireData } from '@/schemas/questionnaire'
import { Question } from '@/components/questionnaire/question'
import { ProgressIndicator } from '@/components/questionnaire/progress-indicator'
import { questions } from '@/config/questions'
import { saveQuestionnaireResponse } from '@/lib/supabase/questionnaire'
import { cn } from '@/lib/utils'

const steps = [
  { label: 'Location', description: 'Your ZIP code' },
  { label: 'Household', description: 'Size and age' },
  { label: 'Pregnancy', description: 'Family planning' },
  { label: 'Health', description: 'Medical conditions' },
  { label: 'Preferences', description: 'Cost preferences' }
]

export default function QuestionnairePage() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const form = useForm<QuestionnaireData>({
    resolver: zodResolver(questionnaireSchema),
    mode: 'onChange'
  })

  const { handleSubmit, formState: { errors, isValid } } = form
  const currentQuestions = questions.filter(q => q.page === currentPage)

  const handleNextPage = async () => {
    const currentFields = currentQuestions.map(q => q.id)
    const hasErrors = currentFields.some(field => errors[field as keyof QuestionnaireData])
    
    if (!hasErrors) {
      if (currentPage === 5) {
        await onSubmit()
      } else {
        setCurrentPage(prev => Math.min(5, prev + 1))
      }
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true)
      await saveQuestionnaireResponse(data)
      router.push('/questionnaire/results')
    } catch (error) {
      console.error('Failed to save response:', error)
    } finally {
      setIsSubmitting(false)
    }
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProgressIndicator 
          currentPage={currentPage} 
          totalPages={5} 
          steps={steps} 
        />
        
        <form onSubmit={onSubmit} className="space-y-6">
          {currentQuestions.map((question) => (
            <Question
              key={question.id}
              question={question}
              value={form.watch(question.id as keyof QuestionnaireData)}
              onChange={(value) => form.setValue(question.id as keyof QuestionnaireData, value, {
                shouldValidate: true
              })}
              error={errors[question.id as keyof QuestionnaireData]?.message}
              className="bg-white shadow rounded-lg p-6"
            />
          ))}

          <div className="flex justify-between pt-5">
            <button
              type="button"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1 || isSubmitting}
              className="btn-secondary"
            >
              Previous
            </button>
            
            <button
              type="button"
              onClick={handleNextPage}
              disabled={isSubmitting}
              className="btn-primary"
            >
              {currentPage === 5 ? (isSubmitting ? 'Submitting...' : 'Submit') : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 