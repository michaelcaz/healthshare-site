'use client';

import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState, forwardRef } from 'react';
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
import Cookies from 'js-cookie';

const COOKIE_KEY = 'questionnaire-form-data';
const COOKIE_OPTIONS = {
  expires: 1, // 1 day
  path: '/',
  sameSite: 'lax'
};

const formSchema = z.object({
  age: z.coerce.number().min(18, "Age must be at least 18").max(120, "Age must be 120 or less"),
  household_size: z.coerce.number().min(1, "Household size must be at least 1").max(10, "Household size must be 10 or less"),
  coverage_type: z.enum(['just_me', 'me_spouse', 'me_kids', 'family'], {
    errorMap: () => ({ message: "Please select who needs coverage" })
  }),
  iua_preference: z.enum(['1000', '2500', '5000'], {
    errorMap: () => ({ message: "Please select an IUA preference" })
  }),
  pregnancy: z.enum(['true', 'false'], {
    errorMap: () => ({ message: "Please indicate if you are currently pregnant" })
  }).transform(val => val === 'true'),
  pre_existing: z.enum(['true', 'false'], {
    errorMap: () => ({ message: "Please indicate if you have pre-existing conditions" })
  }).transform(val => val === 'true'),
  state: z.string().min(1, "Please enter your state"),
  zip_code: z.string().min(5, "Please enter a valid ZIP code"),
  expense_preference: z.enum(['lower_monthly', 'higher_monthly'], {
    errorMap: () => ({ message: "Please select your cost preference" })
  }),
  pregnancy_planning: z.enum(['yes', 'no', 'maybe'], {
    errorMap: () => ({ message: "Please indicate your pregnancy plans" })
  }),
  medical_conditions: z.union([
    z.string(),
    z.array(z.string())
  ]).optional().transform(val => {
    if (typeof val === 'string') {
      return val.split(',').map(c => c.trim()).filter(Boolean);
    }
    return Array.isArray(val) ? val : [];
  }),
  visit_frequency: z.enum(['just_checkups', 'few_months', 'monthly_plus'], {
    errorMap: () => ({ message: "Please select your expected visit frequency" })
  })
});

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

// Create a forwarded ref version of Select
const ForwardedSelect = forwardRef((props: any, ref) => (
  <Select {...props} />
));
ForwardedSelect.displayName = 'ForwardedSelect';

const renderFormControl = (fieldName: string, field: any, watchFields?: Record<string, any>) => {
  const fieldId = `form-field-${fieldName}`;
  
  switch (fieldName) {
    case 'coverage_type':
      return (
        <div className="relative">
          <ForwardedSelect 
            {...field}
            id={fieldId}
            name={fieldName}
            onValueChange={field.onChange}
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select who needs coverage" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white" position="popper" sideOffset={5}>
              <SelectItem value="just_me">Just me</SelectItem>
              <SelectItem value="me_spouse">Me + Spouse/Partner</SelectItem>
              <SelectItem value="me_kids">Me + Kids</SelectItem>
              <SelectItem value="family">Family</SelectItem>
            </SelectContent>
          </ForwardedSelect>
        </div>
      )
    case 'age':
      return (
        <Input 
          {...field} 
          id={fieldId}
          name={fieldName}
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
          <ForwardedSelect 
            {...field}
            id={fieldId}
            name={fieldName}
            onValueChange={field.onChange}
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white" position="popper" sideOffset={5}>
              <SelectItem value="false">No</SelectItem>
              <SelectItem value="true">Yes</SelectItem>
            </SelectContent>
          </ForwardedSelect>
        </div>
      )
    case 'pregnancy':
      return (
        <div className="relative">
          <ForwardedSelect 
            {...field}
            id={fieldId}
            name={fieldName}
            onValueChange={field.onChange}
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white" position="popper" sideOffset={5}>
              <SelectItem value="false">No</SelectItem>
              <SelectItem value="true">Yes</SelectItem>
            </SelectContent>
          </ForwardedSelect>
        </div>
      )
    case 'pregnancy_planning':
      return (
        <div className="relative">
          <ForwardedSelect 
            {...field}
            id={fieldId}
            name={fieldName}
            onValueChange={field.onChange}
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white" position="popper" sideOffset={5}>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="maybe">Maybe</SelectItem>
            </SelectContent>
          </ForwardedSelect>
        </div>
      )
    case 'expense_preference':
      return (
        <div className="relative">
          <ForwardedSelect 
            {...field}
            id={fieldId}
            name={fieldName}
            onValueChange={field.onChange}
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select your preference" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white" position="popper" sideOffset={5}>
              <SelectItem value="lower_monthly">Lower monthly cost, higher out-of-pocket</SelectItem>
              <SelectItem value="higher_monthly">Higher monthly cost, lower out-of-pocket</SelectItem>
            </SelectContent>
          </ForwardedSelect>
        </div>
      )
    case 'medical_conditions':
      return (
        <Input 
          {...field}
          id={fieldId}
          name={fieldName}
          type="text"
          placeholder="Enter medical conditions"
          className="bg-white"
        />
      )
    case 'iua_preference':
      return (
        <div className="relative">
          <ForwardedSelect 
            {...field}
            id={fieldId}
            name={fieldName}
            onValueChange={field.onChange}
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select your IUA preference" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white" position="popper" sideOffset={5}>
              <SelectItem value="1000">$1,000 IUA</SelectItem>
              <SelectItem value="2500">$2,500 IUA</SelectItem>
              <SelectItem value="5000">$5,000 IUA</SelectItem>
            </SelectContent>
          </ForwardedSelect>
        </div>
      )
    case 'visit_frequency':
      if (!watchFields?.coverage_type) return null;
      const visitOptions = getVisitFrequencyOptions(watchFields.coverage_type);
      
      return (
        <div className="relative">
          <ForwardedSelect 
            {...field}
            id={fieldId}
            name={fieldName}
            onValueChange={field.onChange}
          >
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
          </ForwardedSelect>
        </div>
      )
    default:
      return (
        <Input 
          {...field}
          id={fieldId}
          name={fieldName}
          placeholder={`Enter ${fieldName}`}
          className="bg-white"
        />
      )
  }
}

type FormValues = z.infer<typeof formSchema>;

export const QuestionnaireForm = () => {
  const [startTime] = useState(Date.now());
  const [isComplete, setIsComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);
  
  const form = useForm<FormValues>({
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
    mode: 'onBlur'
  });

  const watchPregnancy = form.watch('pregnancy');
  
  const router = useRouter();
  const { toast } = useToast();

  const step = steps[currentStep];

  // Load saved form data
  useEffect(() => {
    const loadSavedData = async () => {
      setIsLoading(true);
      try {
        const savedData = Cookies.get(COOKIE_KEY);
        if (savedData) {
          try {
            const parsedData = JSON.parse(savedData);
            Object.entries(parsedData).forEach(([key, value]) => {
              if (key in form.getValues()) {
                form.setValue(key as keyof FormValues, value as any);
              }
            });
          } catch (parseError) {
            console.warn('Could not parse saved form data:', parseError);
          }
        }
      } catch (error) {
        console.warn('Error loading form data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedData();
  }, [form]);

  // Save form data when it changes
  useEffect(() => {
    const saveFormData = async () => {
      try {
        const formData = form.getValues();
        Cookies.set(COOKIE_KEY, JSON.stringify(formData), COOKIE_OPTIONS);
      } catch (error) {
        console.warn('Could not save form data:', error);
      }
    };

    const subscription = form.watch(() => {
      saveFormData();
    });

    return () => subscription.unsubscribe();
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

  const onSubmit = async (data: FormValues) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      // Validate current step fields only
      const currentStepFields = step.fields as unknown as Array<keyof FormValues>;
      const currentStepData = Object.fromEntries(
        Object.entries(data).filter(([key]) => 
          currentStepFields.includes(key as keyof FormValues)
        )
      );
      
      const stepSchema = formSchema.pick(
        currentStepFields.reduce((acc, field) => ({
          ...acc,
          [field]: true
        }), {}) as Record<keyof FormValues, true>
      );

      const validationResult = stepSchema.safeParse(currentStepData);

      if (!validationResult.success) {
        const errorMessage = validationResult.error.errors
          .map(err => err.message)
          .join('. ');
        throw new Error(errorMessage);
      }

      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
        setIsSubmitting(false);
        return;
      }

      // On final step, validate entire form
      const finalValidation = formSchema.safeParse(data);
      if (!finalValidation.success) {
        const errorMessage = finalValidation.error.errors
          .map(err => err.message)
          .join('. ');
        throw new Error(errorMessage);
      }

      const transformedData = finalValidation.data;
      const response = await saveQuestionnaireResponse(transformedData);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to save questionnaire');
      }
      
      trackQuestionnaireStep('QUESTIONNAIRE_COMPLETE', {
        stepNumber: steps.length,
        stepName: 'Complete',
      });
      
      setIsComplete(true);
      router.push('/recommendations');
    } catch (error) {
      setFormError(getErrorMessage(error));
      toast({
        title: 'Error',
        description: getErrorMessage(error),
        variant: 'destructive'
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
              
              {step.fields.map(field => {
                if (field === 'pregnancy_planning' && form.watch('pregnancy') === true) {
                  return null;
                }
                
                const fieldId = `form-field-${field}`;
                
                return (
                  <FormField
                    key={field}
                    control={form.control}
                    name={field}
                    render={({ field: formField }) => (
                      <FormItem className="space-y-2">
                        <FormLabel htmlFor={fieldId} className="text-base">
                          {getFieldLabel(field as keyof z.infer<typeof formSchema>, { coverage_type: form.watch('coverage_type') })}
                        </FormLabel>
                        <FormControl>
                          {renderFormControl(field, formField, { 
                            pregnancy: form.watch('pregnancy'),
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
                <Button 
                  type="button"
                  onClick={() => setCurrentStep(prev => prev - 1)} 
                  variant="outline"
                >
                  Previous
                </Button>
              )}
              
              <Button 
                type={currentStep === steps.length - 1 ? 'submit' : 'button'}
                onClick={currentStep === steps.length - 1 ? undefined : () => setCurrentStep(prev => prev + 1)}
                className="ml-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : currentStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
} 