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
import { getVisitFrequencyOptions } from '@/lib/utils/visit-calculator';

const STORAGE_KEY = 'questionnaire-basic-info';

const formSchema = z.object({
  age: z.number().min(18).max(120),
  household_size: z.number().min(1).max(10),
  coverage_type: z.enum(['just_me', 'me_spouse', 'me_kids', 'family']),
  iua_preference: z.enum(['1000', '2500', '5000']),
  pregnancy: z.boolean(),
  pre_existing: z.boolean(),
  state: z.string(),
  zip_code: z.string(),
  expense_preference: z.enum(['lower_monthly', 'higher_monthly']),
  pregnancy_planning: z.enum(['yes', 'no', 'maybe']),
  medical_conditions: z.array(z.string()),
  visit_frequency: z.enum(['just_checkups', 'few_months', 'monthly_plus'])
})

const questionLabels: Record<keyof z.infer<typeof formSchema>, string> = {
  age: "What is your age?",
  household_size: "How many people are in your household?",
  coverage_type: "Who needs coverage?",
  iua_preference: "Choose your Initial Unshared Amount (IUA)",
  pregnancy: "Are you currently pregnant?",
  pre_existing: "Do you have any pre-existing conditions?",
  state: "What state do you live in?",
  zip_code: "What is your ZIP code?",
  expense_preference: "Would you prefer lower monthly payments or lower out-of-pocket costs?",
  pregnancy_planning: "Are you planning to become pregnant in the next year?",
  medical_conditions: "Select any medical conditions that apply",
  visit_frequency: "How often do you expect to visit the doctor?"
}

const getFieldLabel = (field: keyof z.infer<typeof formSchema>, watchFields?: Record<string, any>): string => {
  if (field === 'visit_frequency' && watchFields?.coverage_type) {
    const options = getVisitFrequencyOptions(watchFields.coverage_type);
    return options.just_checkups.question;
  }
  return questionLabels[field] || field;
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
    case 'age':
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
    case 'visit_frequency':
      if (!watchFields?.coverage_type) return null;
      const visitOptions = getVisitFrequencyOptions(watchFields.coverage_type);
      
      return (
        <div className="relative">
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select visit frequency" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white" position="popper" sideOffset={5}>
              {Object.entries(visitOptions).map(([key, option]) => (
                <SelectItem key={key} value={key}>
                  {option.label} ({option.example})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
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
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 0,
      household_size: 1,
      coverage_type: 'just_me',
      iua_preference: '1000',
      pregnancy: false,
      pre_existing: false,
      state: '',
      zip_code: '',
      expense_preference: 'lower_monthly',
      pregnancy_planning: 'no',
      medical_conditions: [],
      visit_frequency: 'just_checkups'
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
          form.setValue(key as keyof z.infer<typeof formSchema>, value as string);
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

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (isSubmitting) return;
    setFormError(null);
    
    try {
      setIsSubmitting(true);

      // Save form data to client storage
      setClientStorage(STORAGE_KEY, data);

      // Transform to QuestionnaireResponse format
      const response: QuestionnaireResponse = {
        age: data.age,
        household_size: data.household_size,
        coverage_type: data.coverage_type,
        zip_code: data.zip_code,
        iua_preference: data.iua_preference,
        pregnancy: data.pregnancy,
        pre_existing: data.pre_existing,
        state: data.state,
        expense_preference: data.expense_preference,
        pregnancy_planning: data.pregnancy_planning,
        medical_conditions: data.medical_conditions,
        visit_frequency: data.visit_frequency
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
                // Skip rendering pregnancy_planning if pregnancy is true
                if (field === 'pregnancy_planning' && watchPregnancy === true) {
                  return null;
                }
                
                return (
                  <FormField
                    key={field}
                    control={form.control}
                    name={field}
                    render={({ field: formField }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-base">
                          {getFieldLabel(field as keyof z.infer<typeof formSchema>, { coverage_type: form.watch('coverage_type') })}
                        </FormLabel>
                        <FormControl>
                          {renderFormControl(field, formField, { 
                            pregnancy: watchPregnancy,
                            coverage_type: form.watch('coverage_type')
                          })}
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