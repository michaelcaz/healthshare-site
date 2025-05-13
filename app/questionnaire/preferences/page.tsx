'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ProgressIndicator } from '@/components/questionnaire/progress-indicator';
import { useState, useEffect } from 'react';
import { InfoIcon } from 'lucide-react';
import { OptionCardGroup } from '@/components/questionnaire/OptionCard';

const preferencesSchema = z.object({
  lifestyle_preference: z.enum(['traditional', 'alternative', 'both']).optional().refine(val => val !== undefined, {
    message: "Please answer this question to continue"
  }),
  price_importance: z.enum(['most_important', 'very_important', 'somewhat_important']).optional().refine(val => val !== undefined, {
    message: "Please answer this question to continue"
  }),
  doctor_preference: z.enum(['keep_current', 'willing_to_switch', 'no_regular_doctor']).optional().refine(val => val !== undefined, {
    message: "Please answer this question to continue"
  })
});

type PreferencesData = z.infer<typeof preferencesSchema>;

const steps = [
  { label: 'Basic Info', route: '/questionnaire' },
  { label: 'Health Status', route: '/questionnaire/health' },
  { label: 'Preferences', route: '/questionnaire/preferences' }
];

export default function PreferencesPage() {
  const router = useRouter();
  const [showLifestyleInfo, setShowLifestyleInfo] = useState(false);
  
  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const form = useForm<PreferencesData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      lifestyle_preference: undefined,
      price_importance: undefined,
      doctor_preference: undefined
    }
  });

  const onSubmit = async (data: PreferencesData) => {
    try {
      const existingData = localStorage.getItem('questionnaire-data');
      const questionnaireData = existingData ? JSON.parse(existingData) : {};
      questionnaireData.preferences = data;
      localStorage.setItem('questionnaire-data', JSON.stringify(questionnaireData));
      
      // Scroll to top before navigation
      window.scrollTo(0, 0);
      
      router.push('/questionnaire/email-capture');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <section className="relative py-24" style={{ background: 'var(--color-cream-bg)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProgressIndicator 
          currentPage={3}
          totalPages={3}
          steps={steps}
        />

        <div className="questionnaire-card">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
              {/* Healthcare Style Preference */}
              <div className="questionnaire-section">
                <h2 className="question-text">
                  What type of healthcare do you prefer?
                </h2>
                <p className="helper-text">
                  Some health sharing ministries have different levels of coverage for alternative care providers.
                </p>
                
                <OptionCardGroup
                  name="lifestyle_preference"
                  options={[
                    { 
                      value: 'traditional', 
                      label: 'Traditional medical care', 
                      description: 'Hospitals, standard physicians'
                    },
                    { 
                      value: 'alternative', 
                      label: 'Alternative care', 
                      description: 'Naturopaths, chiropractors'
                    },
                    { 
                      value: 'both', 
                      label: 'Both traditional and alternative care', 
                      description: 'A mix of both approaches'
                    }
                  ]}
                  value={form.watch('lifestyle_preference') || ''}
                  onChange={(value) => form.setValue('lifestyle_preference', value as 'traditional' | 'alternative' | 'both', { shouldValidate: true })}
                  layout="grid"
                />
                
                {form.formState.errors.lifestyle_preference && (
                  <div className="error-message">
                    {form.formState.errors.lifestyle_preference.message}
                  </div>
                )}
              </div>

              <div className="questionnaire-divider" />

              {/* Price Importance */}
              <div className="questionnaire-section">
                <h2 className="question-text">
                  How important is price in your decision?
                </h2>
                <p className="helper-text">
                  This helps us prioritize plans that match your budget priorities.
                </p>
                
                <OptionCardGroup
                  name="price_importance"
                  options={[
                    { 
                      value: 'most_important', 
                      label: 'Most important factor', 
                      description: 'I need the most affordable option'
                    },
                    { 
                      value: 'very_important', 
                      label: 'Very important, but not the only factor', 
                      description: 'I want a balance of price and features'
                    },
                    { 
                      value: 'somewhat_important', 
                      label: 'Somewhat important', 
                      description: 'I prioritize coverage over price'
                    }
                  ]}
                  value={form.watch('price_importance') || ''}
                  onChange={(value) => form.setValue('price_importance', value as 'most_important' | 'very_important' | 'somewhat_important', { shouldValidate: true })}
                />
                
                {form.formState.errors.price_importance && (
                  <div className="error-message">
                    {form.formState.errors.price_importance.message}
                  </div>
                )}
              </div>

              <div className="questionnaire-divider" />

              {/* Doctor Preference */}
              <div className="questionnaire-section">
                <h2 className="question-text">
                  What's your preference regarding doctors?
                </h2>
                <p className="helper-text">
                  Some plans have specific networks while others allow more flexibility.
                </p>
                
                <OptionCardGroup
                  name="doctor_preference"
                  options={[
                    { 
                      value: 'keep_current', 
                      label: 'I want to keep my current doctors', 
                      description: 'Network flexibility is important to me'
                    },
                    { 
                      value: 'willing_to_switch', 
                      label: "I'm willing to switch doctors", 
                      description: 'I can adapt to a new network'
                    },
                    { 
                      value: 'no_regular_doctor', 
                      label: "I don't have regular doctors", 
                      description: "I'm flexible with providers"
                    }
                  ]}
                  value={form.watch('doctor_preference') || ''}
                  onChange={(value) => form.setValue('doctor_preference', value as 'keep_current' | 'willing_to_switch' | 'no_regular_doctor', { shouldValidate: true })}
                />
                
                {form.formState.errors.doctor_preference && (
                  <div className="error-message">
                    {form.formState.errors.doctor_preference.message}
                  </div>
                )}
              </div>
            </div>

            {Object.keys(form.formState.errors).length > 0 && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                <p className="text-red-600 text-sm text-center">
                  Please answer all required questions before continuing.
                </p>
              </div>
            )}

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={() => {
                  // Scroll to top before navigation
                  window.scrollTo(0, 0);
                  router.push('/questionnaire/health');
                }}
                className="questionnaire-button questionnaire-button-secondary"
              >
                Back
              </button>
              <button
                type="submit"
                className="questionnaire-button questionnaire-button-primary"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
} 