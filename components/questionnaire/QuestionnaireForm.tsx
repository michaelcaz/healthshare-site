'use client';

import { useForm, UseFormReturn, ControllerRenderProps, ControllerFieldState, UseFormStateReturn } from 'react-hook-form';
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
  sameSite: 'Lax' as const
};

const formSchema = z.object({
  age: z.number()
    .min(18, "You must be at least 18 years old")
    .max(120, "Please enter a valid age"),
  coverage_type: z.enum(['just_me', 'me_spouse', 'me_kids', 'family'], {
    errorMap: () => ({ message: "Please select who needs coverage" })
  }),
  iua_preference: z.enum(['1000', '2500', '5000'], {
    errorMap: () => ({ message: "Please select an IUA preference" })
  }),
  pregnancy: z.enum(['true', 'false'], {
    errorMap: () => ({ message: "Please indicate if you are currently pregnant" })
  }),
  pre_existing: z.enum(['true', 'false'], {
    errorMap: () => ({ message: "Please indicate if you have pre-existing conditions" })
  }),
  state: z.string().min(1, "Please enter your state").optional(),
  zip_code: z.string().min(5, "Please enter a valid ZIP code"),
  expense_preference: z.enum(['lower_monthly', 'higher_monthly'], {
    errorMap: () => ({ message: "Please select your cost preference" })
  }),
  pregnancy_planning: z.enum(['yes', 'no', 'maybe'], {
    errorMap: () => ({ message: "Please indicate your pregnancy plans" })
  }).optional(),
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

const getFieldLabel = (field: keyof z.infer<typeof formSchema>, form: UseFormReturn<FormValues>): string => {
  if (field === 'visit_frequency') {
    const coverage_type = form.watch('coverage_type');
    if (coverage_type) {
      const options = getVisitFrequencyOptions(coverage_type);
      return options.just_checkups.question;
    }
  }
  return questionLabels[field] || field;
}

// Create a forwarded ref version of Select
const ForwardedSelect = forwardRef((props: any, ref) => (
  <Select {...props} />
));
ForwardedSelect.displayName = 'ForwardedSelect';

const renderFormControl = (fieldName: string, field: any, form: UseFormReturn<FormValues>) => {
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
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white" position="popper" sideOffset={5}>
              <SelectItem value="just_me" className="data-[state=checked]:bg-cyan-500 data-[state=checked]:text-white hover:bg-cyan-500 hover:text-white">Just me</SelectItem>
              <SelectItem value="me_spouse" className="data-[state=checked]:bg-cyan-500 data-[state=checked]:text-white hover:bg-cyan-500 hover:text-white">Me + Spouse</SelectItem>
              <SelectItem value="me_kids" className="data-[state=checked]:bg-cyan-500 data-[state=checked]:text-white hover:bg-cyan-500 hover:text-white">Me + Kids</SelectItem>
              <SelectItem value="family" className="data-[state=checked]:bg-cyan-500 data-[state=checked]:text-white hover:bg-cyan-500 hover:text-white">Family</SelectItem>
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
          min={18}
          max={120}
          placeholder="Enter age"
          className="bg-white"
          value={field.value ?? ''}
          onChange={(e) => {
            const val = e.target.value;
            if (val === '') {
              field.onChange(undefined);
            } else {
              const num = parseInt(val, 10);
              if (!isNaN(num)) {
                field.onChange(num);
              }
            }
          }}
          onBlur={field.onBlur}
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
              <SelectValue placeholder="" />
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
            onValueChange={(value: string) => {
              field.onChange(value);
              if (value === 'true') {
                form.resetField('pregnancy_planning');
              }
            }}
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="" />
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
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white" position="popper" sideOffset={5}>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
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
              <SelectValue placeholder="" />
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
              <SelectValue placeholder="" />
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
      const coverage_type = form.watch('coverage_type');
      if (!coverage_type) return null;
      const visitOptions = getVisitFrequencyOptions(coverage_type);
      
      return (
        <div className="relative">
          <ForwardedSelect 
            {...field}
            id={fieldId}
            name={fieldName}
            onValueChange={field.onChange}
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="" />
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
      age: undefined,
      coverage_type: undefined,
      iua_preference: undefined,
      pregnancy: undefined,
      pre_existing: undefined,
      state: '',
      zip_code: '',
      expense_preference: undefined,
      pregnancy_planning: undefined,
      medical_conditions: [],
      visit_frequency: undefined
    },
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
    delayError: 500,
    shouldFocusError: true,
    criteriaMode: 'firstError'
  });

  const watchPregnancy = form.watch('pregnancy');
  const watchCoverageType = form.watch('coverage_type');
  
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
            // Reset form before setting values
            await form.reset();
            // Set each field individually with validation
            for (const [key, value] of Object.entries(parsedData)) {
              if (key in form.getValues()) {
                await form.setValue(key as keyof FormValues, value as any, {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true
                });
              }
            }
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

      // Transform data to match QuestionnaireResponse type
      const transformedData: QuestionnaireResponse = {
        age: finalValidation.data.age,
        coverage_type: finalValidation.data.coverage_type,
        iua_preference: finalValidation.data.iua_preference,
        pregnancy: finalValidation.data.pregnancy,
        pre_existing: finalValidation.data.pre_existing,
        state: finalValidation.data.state,
        zip_code: finalValidation.data.zip_code,
        expense_preference: finalValidation.data.expense_preference,
        pregnancy_planning: finalValidation.data.pregnancy_planning,
        medical_conditions: finalValidation.data.medical_conditions,
        visit_frequency: finalValidation.data.visit_frequency
      };

      console.log('Submitting form data:', transformedData);
      
      const response = await saveQuestionnaireResponse(transformedData);
      console.log('Server response:', response);
      
      if (!response.success) {
        console.error('Submission failed:', response.error, response.details);
        throw new Error(response.error || 'Failed to save questionnaire');
      }
      
      trackQuestionnaireStep('QUESTIONNAIRE_COMPLETE', {
        stepNumber: steps.length,
        stepName: 'Complete',
      });
      
      setIsComplete(true);
      await new Promise(resolve => setTimeout(resolve, 100));
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
                // Skip pregnancy_planning if pregnancy is not explicitly 'false'
                if (field === 'pregnancy_planning' && form.watch('pregnancy') !== 'false') {
                  return null;
                }
                
                const fieldId = `form-field-${field}`;
                
                return (
                  <FormField
                    key={field}
                    control={form.control}
                    name={field as keyof FormValues}
                    render={({ 
                      field: formField 
                    }) => (
                      <FormItem className="space-y-2">
                        <FormLabel htmlFor={`form-field-${field}`} className="text-base">
                          {getFieldLabel(field as keyof FormValues, form)}
                        </FormLabel>
                        <FormControl>
                          {renderFormControl(field, formField, form)}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
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