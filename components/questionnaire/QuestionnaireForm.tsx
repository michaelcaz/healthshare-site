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
import { QuestionnaireResponse } from '@/types/questionnaire';
import { AgeBracket, HouseholdType } from '@/types/provider-plans';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { getClientStorage, setClientStorage } from '@/lib/utils/client-storage';
import { logError, getErrorMessage, AppError } from '@/lib/utils/error-logging';
import { steps } from '@/lib/questionnaire/steps';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    }, 'Age must be between 18 and 120'),
  pre_existing: z.enum(['yes', 'no'], {
    required_error: 'Please select an option'
  }),
  pregnancy: z.enum(['yes', 'no'], {
    required_error: 'Please select an option'
  }),
  pregnancy_planning: z.enum(['yes', 'no', 'maybe']).optional(),
  expense_preference: z.enum(['lower_monthly', 'higher_monthly'], {
    required_error: 'Please select a preferred way to handle medical expenses'
  }),
  iua_preference: z.enum(['1000', '2500', '5000'], {
    required_error: 'Please select an Initial Unshared Amount (IUA) preference'
  }),
  annual_healthcare_spend: z.enum(['less_1000', '1000_5000', 'more_5000'], {
    required_error: 'Please estimate your annual healthcare spending'
  })
});

type BasicInfoData = z.infer<typeof basicInfoSchema>;

const getFieldLabel = (field: string): string => {
  const labels: Record<string, string> = {
    zipCode: "What's your zip code?",
    coverage_type: "Who needs coverage?",
    oldestAge: "What is the age of the oldest person needing coverage?",
    pre_existing: "Do you have any pre-existing conditions?",
    pregnancy: "Are you currently pregnant?",
    pregnancy_planning: "Are you planning to become pregnant?",
    expense_preference: "What's your preferred way to handle medical expenses?",
    iua_preference: "What Initial Unshared Amount (IUA) would you prefer?",
    annual_healthcare_spend: "How much did you spend on healthcare last year (outside of insurance)?"
  }
  return labels[field] || field
}

const renderFormControl = (fieldName: string, field: any, watchFields?: Record<string, any>) => {
  switch (fieldName) {
    case 'coverage_type':
      return (
        <div className="relative">
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select who needs coverage" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white" position="popper" sideOffset={5}>
              <SelectItem value="just_me">Just me</SelectItem>
              <SelectItem value="me_spouse">Me + Spouse/Partner</SelectItem>
              <SelectItem value="me_kids">Me + Kids</SelectItem>
              <SelectItem value="family">Family</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )
    case 'oldestAge':
      return (
        <Input 
          {...field} 
          type="number" 
          min="18" 
          max="120" 
          placeholder="Enter age"
          className="bg-white"
        />
      )
    case 'pre_existing':
      return (
        <div className="relative">
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white" position="popper" sideOffset={5}>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="yes">Yes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )
    case 'pregnancy':
      return (
        <div className="relative">
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white" position="popper" sideOffset={5}>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="yes">Yes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )
    case 'pregnancy_planning':
      return (
        <div className="relative">
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white" position="popper" sideOffset={5}>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="maybe">Maybe</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )
    case 'expense_preference':
      return (
        <div className="relative">
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select your preference" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white" position="popper" sideOffset={5}>
              <SelectItem value="lower_monthly">Lower monthly cost, higher out-of-pocket</SelectItem>
              <SelectItem value="higher_monthly">Higher monthly cost, lower out-of-pocket</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )
    case 'iua_preference':
      return (
        <div className="relative">
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select your IUA preference" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white" position="popper" sideOffset={5}>
              <SelectItem value="1000">$1,000 IUA</SelectItem>
              <SelectItem value="2500">$2,500 IUA</SelectItem>
              <SelectItem value="5000">$5,000 IUA</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )
    case 'annual_healthcare_spend':
      return (
        <div className="relative">
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select your estimated spending" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white" position="popper" sideOffset={5}>
              <SelectItem value="less_1000">Less than $1,000</SelectItem>
              <SelectItem value="1000_5000">$1,000 - $5,000</SelectItem>
              <SelectItem value="more_5000">More than $5,000</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )
    default:
      return <Input {...field} placeholder={`Enter ${fieldName}`} className="bg-white" />
  }
}

export const QuestionnaireForm = () => {
  const [startTime] = useState(Date.now());
  const [isComplete, setIsComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);
  
  const form = useForm<BasicInfoData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      zipCode: '',
      coverage_type: undefined,
      oldestAge: '',
      pre_existing: undefined,
      pregnancy: undefined,
      pregnancy_planning: undefined,
      expense_preference: undefined as 'lower_monthly' | 'higher_monthly' | undefined,
      iua_preference: undefined,
      annual_healthcare_spend: undefined
    },
    mode: 'onChange'
  });

  const watchPregnancy = form.watch('pregnancy');
  
  const router = useRouter();
  const { toast } = useToast();

  const step = steps[currentStep];

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
        zip_code: data.zipCode,
        // Set defaults for required fields
        iua_preference: data.iua_preference,
        pregnancy: data.pregnancy === 'yes',
        pre_existing: data.pre_existing === 'yes',
        state: '',
        expense_preference: data.expense_preference,
        pregnancy_planning: data.pregnancy_planning || 'no',
        medical_conditions: [],
        annual_healthcare_spend: data.annual_healthcare_spend
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
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">{step.title}</h2>
              <p className="text-gray-600">{step.description}</p>
              
              {/* Render form fields based on current step */}
              {step.fields.map(field => {
                // Skip rendering pregnancy_planning if pregnancy is not "no"
                if (field === 'pregnancy_planning' && watchPregnancy !== 'no') {
                  return null;
                }
                
                return (
                  <FormField
                    key={field}
                    control={form.control}
                    name={field}
                    render={({ field: formField }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-base">{getFieldLabel(field)}</FormLabel>
                        <FormControl>
                          {renderFormControl(field, formField, { pregnancy: watchPregnancy })}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              })}
            </div>

            <div className="flex justify-between mt-8">
              {currentStep > 0 && (
                <Button onClick={() => setCurrentStep(prev => prev - 1)} variant="outline">
                  Previous
                </Button>
              )}
              
              <Button 
                type={currentStep === steps.length - 1 ? 'submit' : 'button'}
                onClick={currentStep === steps.length - 1 ? undefined : () => setCurrentStep(prev => prev + 1)}
                className="ml-auto"
              >
                {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
} 