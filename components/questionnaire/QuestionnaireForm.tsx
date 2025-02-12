'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { trackQuestionnaireStep, trackAbandonment } from '@/lib/analytics/funnel-tracking';
import { TrustBadges } from '@/components/ui/TrustBadges';
import { useRouter } from 'next/navigation';
import { saveQuestionnaireResponse, recoverPartialResponse } from '@/lib/questionnaire';
import { useToast } from '@/components/ui/toast';
import { QuestionnaireResponse } from '@/lib/types';
import { AgeBracket, HouseholdType } from '@/types/provider-plans';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const basicInfoSchema = z.object({
  zipCode: z.string().min(5, 'Please enter a valid zip code').max(5),
  coverageType: z.enum(['just_me', 'me_spouse', 'me_kids', 'family'], {
    required_error: 'Please select who needs coverage'
  }),
  oldestAge: z.string().min(1, 'Please enter an age').max(3)
});

type BasicInfoData = z.infer<typeof basicInfoSchema>;

export default function QuestionnaireForm() {
  const [startTime] = useState(Date.now());
  const [isComplete, setIsComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isRecovering, setIsRecovering] = useState(true);
  
  const form = useForm<BasicInfoData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      zipCode: '',
      coverageType: undefined,
      oldestAge: ''
    }
  });
  
  const router = useRouter();
  const { toast } = useToast();

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
  }, []);

  const onSubmit = async (data: BasicInfoData) => {
    try {
      // Save to localStorage for page-to-page navigation
      const formData = {
        basicInfo: {
          zipCode: data.zipCode,
          coverageType: data.coverageType,
          oldestAge: data.oldestAge
        }
      };
      localStorage.setItem('questionnaire-data', JSON.stringify(formData));

      // Transform to QuestionnaireResponse format
      const response: QuestionnaireResponse = {
        age: parseInt(data.oldestAge),
        household_size: data.coverageType === 'just_me' ? 1 : 2,
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

      await saveQuestionnaireResponse(response);
      setIsComplete(true);
      router.push('/questionnaire/savings');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        description: 'Failed to save your responses. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (isRecovering) {
    const existingData = localStorage.getItem('questionnaire-data');
    if (existingData) {
      const parsed = JSON.parse(existingData);
      if (parsed.basic_info) {
        Object.entries(parsed.basic_info).forEach(([key, value]) => {
          form.setValue(key as keyof BasicInfoData, value as string);
        });
      }
    }
    setIsRecovering(false);
  }

  return (
    <section className="relative py-24" style={{ background: 'var(--color-cream-bg)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm",
          "transition-all duration-200"
        )}>
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
                    <FormLabel>What's your zip code?</FormLabel>
                    <FormControl>
                      <Input {...field} maxLength={5} placeholder="Enter your zip code" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coverageType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Who needs coverage?</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className={cn(
                          "w-full p-3 rounded-lg",
                          "border border-gray-200",
                          "focus:outline-none focus:ring-2 focus:ring-blue-500",
                          "transition duration-200",
                          "text-gray-900"
                        )}
                      >
                        <option value="">Select who needs coverage</option>
                        <option value="just_me">Just me</option>
                        <option value="me_spouse">Me + Spouse/Partner</option>
                        <option value="me_kids">Me + Kids</option>
                        <option value="family">Family</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="oldestAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What is the age of the oldest person needing coverage?</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min="1" max="120" placeholder="Enter age" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
  );
} 