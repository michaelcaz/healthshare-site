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
  { label: 'Savings', route: '/questionnaire/savings' },
  { label: 'Health Status', route: '/questionnaire/health' },
  { label: 'Coverage Needs', route: '/questionnaire/coverage' }
];

export default function HealthPage() {
  const router = useRouter();
  const [showPreExistingInfo, setShowPreExistingInfo] = useState(false);
  const [showPregnancyInfo, setShowPregnancyInfo] = useState(false);
  const [showPlanningQuestion, setShowPlanningQuestion] = useState(false);
  
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
      
      router.push('/questionnaire/coverage');
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
          currentPage={3}
          totalPages={4}
          steps={steps}
        />

        <div className={cn(
          "bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm",
          "transition-all duration-200"
        )}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
              {/* Pre-existing Conditions */}
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <div className="flex-grow">
                    <label className="block text-gray-800 font-medium mb-2">
                      Do you or anyone you need coverage for have any pre-existing conditions within the past 2 years?
                    </label>
                    <select
                      {...form.register('preExistingConditions')}
                      className={cn(
                        "w-full p-3 rounded-lg",
                        "border border-gray-200",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500",
                        "transition duration-200",
                        "text-gray-900"
                      )}
                    >
                      <option value="" className="text-gray-500">Select an option</option>
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPreExistingInfo(!showPreExistingInfo)}
                    className="text-gray-400 hover:text-gray-600 mt-2"
                  >
                    <InfoIcon className="w-5 h-5" />
                  </button>
                </div>
                {showPreExistingInfo && (
                  <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                    Healthshare companies often have waiting periods before they'll cover any pre-existing condition. Think things like a nagging injury, something going on with your stomach that you still haven't figured out, etc. Anything you can remember that's started in the past couple years and is not yet complete.
                  </div>
                )}
              </div>

              {/* Currently Pregnant */}
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <div className="flex-grow">
                    <label className="block text-gray-800 font-medium mb-2">
                      Are you or your partner currently pregnant?
                    </label>
                    <select
                      {...form.register('currentlyPregnant')}
                      className={cn(
                        "w-full p-3 rounded-lg",
                        "border border-gray-200",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500",
                        "transition duration-200",
                        "text-gray-900"
                      )}
                    >
                      <option value="">Select an option</option>
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPregnancyInfo(!showPregnancyInfo)}
                    className="text-gray-400 hover:text-gray-600 mt-2"
                  >
                    <InfoIcon className="w-5 h-5" />
                  </button>
                </div>
                {showPregnancyInfo && (
                  <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                    Some health share companies have waiting periods before they will cover your pregnancy and delivery needs
                  </div>
                )}
              </div>

              {/* Planning Pregnancy - Only show if currentlyPregnant is "no" */}
              {showPlanningQuestion && (
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <div className="flex-grow">
                      <label className="block text-gray-800 font-medium mb-2">
                        Are you or your partner planning to become pregnant in the next 6 months?
                      </label>
                      <select
                        {...form.register('planningPregnancy')}
                        className={cn(
                          "w-full p-3 rounded-lg",
                          "border border-gray-200",
                          "focus:outline-none focus:ring-2 focus:ring-blue-500",
                          "transition duration-200",
                          "text-gray-900"
                        )}
                      >
                        <option value="" className="text-gray-500">Select an option</option>
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                        <option value="maybe">Maybe</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPregnancyInfo(!showPregnancyInfo)}
                      className="text-gray-400 hover:text-gray-600 mt-2"
                    >
                      <InfoIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
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
                onClick={() => router.push('/questionnaire')}
                className={cn(
                  "px-6 py-2 rounded-full",
                  "border border-gray-300 text-gray-600",
                  "hover:bg-gray-50",
                  "transition-colors duration-200"
                )}
              >
                Back
              </button>
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
  );
} 