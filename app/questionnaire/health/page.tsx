'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ProgressIndicator } from '@/components/questionnaire/progress-indicator';
import { useState, useEffect } from 'react';
import { InfoIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { QuestionnaireData } from '@/lib/types';
import { saveQuestionnaireResponse } from '@/lib/questionnaire';
import { OptionCardGroup } from '@/components/questionnaire/OptionCard';

const healthSchema = z.object({
  preExistingConditions: z.enum(['yes', 'no']).optional().refine(val => val !== undefined, {
    message: "Please answer this question to continue"
  }),
  currentlyPregnant: z.enum(['yes', 'no']).optional().refine(val => val !== undefined, {
    message: "Please answer this question to continue"
  }),
  planningPregnancy: z.enum(['yes', 'no', 'maybe']).optional(),
});

type HealthData = z.infer<typeof healthSchema>;

const steps = [
  { label: 'Basic Info', route: '/questionnaire' },
  { label: 'Health Status', route: '/questionnaire/health' },
  { label: 'Preferences', route: '/questionnaire/preferences' }
];

export default function HealthPage() {
  const router = useRouter();
  const [showPreExistingInfo, setShowPreExistingInfo] = useState(false);
  const [showPregnancyInfo, setShowPregnancyInfo] = useState(false);
  const [showPlanningQuestion, setShowPlanningQuestion] = useState(false);
  
  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const form = useForm<HealthData>({
    resolver: zodResolver(healthSchema),
    defaultValues: {
      preExistingConditions: undefined,
      currentlyPregnant: undefined,
      planningPregnancy: undefined
    },
    shouldUnregister: true
  });

  // Watch for changes to currentlyPregnant
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'currentlyPregnant') {
        setShowPlanningQuestion(value.currentlyPregnant === 'no');
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const onSubmit = async (data: HealthData) => {
    try {
      // Get basic info
      const basicInfoData = localStorage.getItem('questionnaire-basic-info');
      const basicInfo = basicInfoData ? JSON.parse(basicInfoData) : {};

      // Get savings data if it exists
      const existingData = localStorage.getItem('questionnaire-data');
      const questionnaireData: QuestionnaireData = existingData ? JSON.parse(existingData) : {
        basicInfo: basicInfo
      };

      // Update health data
      questionnaireData.health = {
        preExistingConditions: data.preExistingConditions || '',
        currentlyPregnant: data.currentlyPregnant || '',
        planningPregnancy: data.planningPregnancy || ''
      };

      // Save updated data
      localStorage.setItem('questionnaire-data', JSON.stringify(questionnaireData));
      
      // Scroll to top before navigation
      window.scrollTo(0, 0);
      
      router.push('/questionnaire/preferences');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        description: 'Failed to save your responses. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <section className="relative py-24" style={{ background: 'var(--color-cream-bg)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProgressIndicator 
          currentPage={2}
          totalPages={3}
          steps={steps}
        />

        <div className="questionnaire-card">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
              {/* Pre-existing Conditions */}
              <div className="questionnaire-section">
                <h2 className="question-text">
                  Do you or anyone you need coverage for have any pre-existing conditions within the past 2 years?
                </h2>
                <p className="helper-text">
                  This helps us find plans that will work best for your specific health situation.
                </p>
                
                <OptionCardGroup
                  name="preExistingConditions"
                  options={[
                    { 
                      value: 'no', 
                      label: 'No', 
                      description: 'No pre-existing conditions' 
                    },
                    { 
                      value: 'yes', 
                      label: 'Yes', 
                      description: 'I have pre-existing conditions',
                      tooltipText: "Healthshare companies often have waiting periods before they'll cover any pre-existing condition. Think things like a nagging injury, something going on with your stomach that you still haven't figured out, etc."
                    }
                  ]}
                  value={form.watch('preExistingConditions') || ''}
                  onChange={(value) => form.setValue('preExistingConditions', value as 'yes' | 'no', { shouldValidate: true })}
                />
                
                {form.formState.errors.preExistingConditions && (
                  <div className="error-message">
                    {form.formState.errors.preExistingConditions.message}
                  </div>
                )}
              </div>

              <div className="questionnaire-divider" />

              {/* Currently Pregnant */}
              <div className="questionnaire-section">
                <h2 className="question-text">
                  Are you or your partner currently pregnant?
                </h2>
                <p className="helper-text">
                  Some health share companies have waiting periods before they will cover pregnancy and delivery needs.
                </p>
                
                <OptionCardGroup
                  name="currentlyPregnant"
                  options={[
                    { value: 'no', label: 'No' },
                    { 
                      value: 'yes', 
                      label: 'Yes',
                      tooltipText: "Some health share companies have waiting periods before they will cover your pregnancy and delivery needs"
                    }
                  ]}
                  value={form.watch('currentlyPregnant') || ''}
                  onChange={(value) => form.setValue('currentlyPregnant', value as 'yes' | 'no', { shouldValidate: true })}
                />
                
                {form.formState.errors.currentlyPregnant && (
                  <div className="error-message">
                    {form.formState.errors.currentlyPregnant.message}
                  </div>
                )}
              </div>

              {/* Planning Pregnancy - Only show if currentlyPregnant is "no" */}
              {showPlanningQuestion && (
                <>
                  <div className="questionnaire-divider" />
                  
                  <div className="questionnaire-section">
                    <h2 className="question-text">
                      Are you or your partner planning to become pregnant in the next 6 months?
                    </h2>
                    <p className="helper-text">
                      This helps us recommend plans with appropriate maternity coverage.
                    </p>
                    
                    <OptionCardGroup
                      name="planningPregnancy"
                      options={[
                        { value: 'no', label: 'No' },
                        { value: 'yes', label: 'Yes' },
                        { value: 'maybe', label: 'Maybe' }
                      ]}
                      value={form.watch('planningPregnancy') || ''}
                      onChange={(value) => form.setValue('planningPregnancy', value as 'yes' | 'no' | 'maybe', { shouldValidate: true })}
                    />
                  </div>
                </>
              )}
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
                  router.push('/questionnaire');
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