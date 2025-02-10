'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ProgressIndicator } from '@/components/questionnaire/progress-indicator'

// Define the validation schema
const questionnaireSchema = z.object({
  zipCode: z.string().length(5, "Please enter a valid 5-digit zip code"),
  coverageType: z.enum(['just_me', 'me_spouse', 'me_kids', 'family'], {
    required_error: "Please select who needs coverage"
  }),
  oldestAge: z.string().min(1, "Please enter an age").max(3, "Please enter a valid age")
    .refine((val) => {
      const age = parseInt(val);
      return age > 0 && age < 120;
    }, "Please enter a valid age between 1 and 120")
})

type QuestionnaireData = z.infer<typeof questionnaireSchema>

export const steps = [
  { label: 'Basic Info', route: '/questionnaire' },
  { label: 'Savings', route: '/questionnaire/savings' },
  { label: 'Health Status', route: '/questionnaire/health' },
  { label: 'Coverage Needs', route: '/questionnaire/coverage' }
]

export default function QuestionnairePage() {
  const router = useRouter()
  
  const form = useForm<QuestionnaireData>({
    resolver: zodResolver(questionnaireSchema),
    defaultValues: {
      zipCode: '',
      coverageType: undefined,
      oldestAge: ''
    }
  })

  const onSubmit = async (data: QuestionnaireData) => {
    try {
      // Store the data in localStorage
      const questionnaireData = {
        basicInfo: {
          zipCode: data.zipCode,
          coverageType: data.coverageType,
          oldestAge: data.oldestAge
        }
      }
      localStorage.setItem('questionnaire-data', JSON.stringify(questionnaireData))
      router.push('/questionnaire/savings')
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <section className="relative py-24" style={{ background: 'var(--color-cream-bg)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Find Your Perfect Plan
          </h1>
          <p className="text-lg text-gray-700">
            Answer a few questions to get your personalized recommendations
          </p>
        </div>

        <ProgressIndicator 
          currentPage={1}
          totalPages={steps.length}
          steps={steps}
        />

        {/* Question Card */}
        <div className={cn(
          "bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm",
          "transition-all duration-200"
        )}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
              <h2 className={cn(
                "text-xl font-semibold text-gray-900",
                "transition-colors duration-200"
              )}>
                Let's start with the basics
              </h2>
              
              {/* Zip Code */}
              <div className="space-y-2">
                <label className="block text-gray-800 mb-2 font-medium">
                  What's your zip code?
                </label>
                <input
                  {...form.register('zipCode')}
                  type="text"
                  placeholder="Enter your zip code"
                  className={cn(
                    "w-full p-3 rounded-lg",
                    "border border-gray-200",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500",
                    "transition duration-200",
                    "text-gray-900 placeholder-gray-500"
                  )}
                  maxLength={5}
                />
              </div>

              {/* Coverage Type */}
              <div className="space-y-2">
                <label className="block text-gray-800 mb-2 font-medium">
                  Who needs coverage?
                </label>
                <select
                  {...form.register('coverageType')}
                  className={cn(
                    "w-full p-3 rounded-lg",
                    "border border-gray-200",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500",
                    "transition duration-200",
                    "text-gray-900"
                  )}
                >
                  <option value="" className="text-gray-500">Select who needs coverage</option>
                  <option value="just_me">Just me</option>
                  <option value="me_spouse">Me + Spouse/Partner</option>
                  <option value="me_kids">Me + Kids</option>
                  <option value="family">Family</option>
                </select>
              </div>

              {/* Oldest Age */}
              <div className="space-y-2">
                <label className="block text-gray-800 mb-2 font-medium">
                  What is the age of the oldest person needing coverage?
                </label>
                <input
                  {...form.register('oldestAge')}
                  type="number"
                  placeholder="Enter age"
                  min="1"
                  max="120"
                  className={cn(
                    "w-full p-3 rounded-lg",
                    "border border-gray-200",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500",
                    "transition duration-200",
                    "text-gray-900 placeholder-gray-500"
                  )}
                />
              </div>
            </div>

            {Object.keys(form.formState.errors).length > 0 && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                <p className="text-red-600 text-sm text-center">
                  Please answer all required questions before continuing.
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                className={cn(
                  "px-6 py-2 rounded-full text-white",
                  "transition-colors duration-200"
                )}
                style={{ background: 'var(--color-coral-primary)' }}
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
} 