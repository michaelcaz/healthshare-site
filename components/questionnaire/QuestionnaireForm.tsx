'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { trackQuestionnaireStep, trackAbandonment } from '@/lib/analytics/funnel-tracking';
import { TrustBadges } from '@/components/ui/TrustBadges';
import { useRouter } from 'next/navigation';
import { saveQuestionnaireResponse } from '@/lib/actions/questionnaire';
import { useToast } from '@/components/ui/toast';
import { QuestionnaireResponse } from '@/lib/types';
import { AgeBracket, HouseholdType } from '@/types/provider-plans';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { getClientStorage, setClientStorage } from '@/lib/utils/client-storage';
import { logError, getErrorMessage, AppError } from '@/lib/utils/error-logging';

const STORAGE_KEY = 'questionnaire-basic-info';

const basicInfoSchema = z.object({
  zipCode: z.string()
    .min(5, 'Please enter a valid 5-digit zip code')
    .max(5, 'Please enter a valid 5-digit zip code')
    .regex(/^\d{5}$/, 'Zip code must be 5 digits'),
  coverage_type: z.enum(['just_me', 'me_spouse', 'me_kids', 'family'], {
    required_error: 'Please select who needs coverage'
  }),
  oldestAge: z.string()
    .min(1, 'Please enter an age')
    .max(3, 'Please enter a valid age')
    .refine((val) => {
      const age = parseInt(val);
      return age >= 18 && age <= 120;
    }, 'Age must be between 18 and 120')
});

type BasicInfoData = z.infer<typeof basicInfoSchema>;

export default function QuestionnaireForm() {
  const [startTime] = useState(Date.now());
  const [isComplete, setIsComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);
  
  const form = useForm<BasicInfoData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      zipCode: '',
      coverage_type: undefined,
      oldestAge: ''
    },
    mode: 'onChange' // Enable real-time validation
  });
  
  const router = useRouter();
  const { toast } = useToast();

  // Load saved form data
  useEffect(() => {
    try {
      const savedData = getClientStorage(STORAGE_KEY);
      if (savedData) {
        Object.entries(savedData).forEach(([key, value]) => {
          form.setValue(key as keyof BasicInfoData, value as string);
        });
      }
    } catch (error) {
      logError(error, {
        component: 'QuestionnaireForm',
        action: 'loadSavedData'
      });
    } finally {
      setIsLoading(false);
    }
  }, [form]);

  // Track questionnaire progress
  useEffect(() => {
    trackQuestionnaireStep('QUESTIONNAIRE_START', {
      stepNumber: 1,
      stepName: 'Start',
    });

    return () => {
      if (!isComplete) {
        trackAbandonment(currentStep, Date.now() - startTime);
      }
    };
  }, [currentStep, isComplete, startTime]);

  const onSubmit = async (data: BasicInfoData) => {
    if (isSubmitting) return;
    setFormError(null);
    
    try {
      setIsSubmitting(true);

      // Save form data to client storage
      setClientStorage(STORAGE_KEY, data);

      // Transform to QuestionnaireResponse format
      const response: QuestionnaireResponse = {
        age: parseInt(data.oldestAge),
        household_size: data.coverage_type === 'just_me' ? 1 : 2,
        coverage_type: data.coverage_type,
        zip: data.zipCode,
        // Set defaults for required fields
        iua_preference: '1000',
        pregnancy: false,
        pre_existing: false,
        prescription_needs: '',
        provider_preference: '',
        state: '',
        expense_preference: 'lower_monthly',
        pregnancy_planning: 'no',
        medical_conditions: [],
        annual_healthcare_spend: '',
        zip_code: data.zipCode
      };

      const result = await saveQuestionnaireResponse(response);
      
      if (!result?.success) {
        throw new AppError('Failed to save response', {
          component: 'QuestionnaireForm',
          action: 'saveResponse',
          data: response
        });
      }

      setIsComplete(true);
      router.push('/questionnaire/savings');
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      logError(error, {
        component: 'QuestionnaireForm',
        action: 'submitForm',
        data: data
      });
      
      setFormError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <section className="relative py-24" style={{ background: 'var(--color-cream-bg)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm",
          "transition-all duration-200"
        )}>
          {formError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600" role="alert">
              {formError}
            </div>
          )}
          
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Let's start with the basics
              </h2>

              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="zipCode">What's your zip code?</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        id="zipCode"
                        maxLength={5} 
                        placeholder="Enter your zip code"
                        aria-describedby={form.formState.errors.zipCode ? "zipCode-error" : undefined}
                        className={cn(
                          form.formState.errors.zipCode && "border-red-300 focus:border-red-500"
                        )}
                      />
                    </FormControl>
                    <FormMessage id="zipCode-error" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coverage_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="coverage_type">Who needs coverage?</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        id="coverage_type"
                        aria-describedby={form.formState.errors.coverage_type ? "coverage-type-error" : undefined}
                        className={cn(
                          "w-full p-3 rounded-lg",
                          "border border-gray-200",
                          "focus:outline-none focus:ring-2 focus:ring-blue-500",
                          "transition duration-200",
                          "text-gray-900",
                          form.formState.errors.coverage_type && "border-red-300 focus:ring-red-500"
                        )}
                      >
                        <option value="">Select who needs coverage</option>
                        <option value="just_me">Just me</option>
                        <option value="me_spouse">Me + Spouse/Partner</option>
                        <option value="me_kids">Me + Kids</option>
                        <option value="family">Family</option>
                      </select>
                    </FormControl>
                    <FormMessage id="coverage-type-error" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="oldestAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="oldestAge">What is the age of the oldest person needing coverage?</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        id="oldestAge"
                        type="number" 
                        min="18" 
                        max="120" 
                        placeholder="Enter age"
                        aria-describedby={form.formState.errors.oldestAge ? "age-error" : undefined}
                        className={cn(
                          form.formState.errors.oldestAge && "border-red-300 focus:border-red-500"
                        )}
                      />
                    </FormControl>
                    <FormMessage id="age-error" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={isSubmitting || !form.formState.isValid}
                aria-busy={isSubmitting}
                className={cn(
                  "px-6 py-2 rounded-full text-white",
                  "transition-colors duration-200",
                  (isSubmitting || !form.formState.isValid) && "opacity-50 cursor-not-allowed",
                  "hover:bg-opacity-90"
                )}
                style={{ background: 'var(--color-coral-primary)' }}
              >
                {isSubmitting ? 'Saving...' : 'Continue'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
} 