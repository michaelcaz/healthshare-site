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
  state: z.string().optional(),
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
  console.log(`Rendering field ${fieldName} with ID ${fieldId}`, field);
  
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
            <SelectTrigger className="w-full bg-white" id={`${fieldId}-trigger`}>
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white" position="popper" sideOffset={5}>
              <SelectItem value="just_me" id={`${fieldId}-just_me`} className="data-[state=checked]:bg-cyan-500 data-[state=checked]:text-white hover:bg-cyan-500 hover:text-white">Just me</SelectItem>
              <SelectItem value="me_spouse" id={`${fieldId}-me_spouse`} className="data-[state=checked]:bg-cyan-500 data-[state=checked]:text-white hover:bg-cyan-500 hover:text-white">Me + Spouse</SelectItem>
              <SelectItem value="me_kids" id={`${fieldId}-me_kids`} className="data-[state=checked]:bg-cyan-500 data-[state=checked]:text-white hover:bg-cyan-500 hover:text-white">Me + Kids</SelectItem>
              <SelectItem value="family" id={`${fieldId}-family`} className="data-[state=checked]:bg-cyan-500 data-[state=checked]:text-white hover:bg-cyan-500 hover:text-white">Family</SelectItem>
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
            <SelectTrigger className="w-full bg-white" id={`${fieldId}-trigger`}>
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white" position="popper" sideOffset={5}>
              <SelectItem value="false" id={`${fieldId}-false`}>No</SelectItem>
              <SelectItem value="true" id={`${fieldId}-true`}>Yes</SelectItem>
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
            <SelectTrigger className="w-full bg-white" id={`${fieldId}-trigger`}>
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white" position="popper" sideOffset={5}>
              <SelectItem value="false" id={`${fieldId}-false`}>No</SelectItem>
              <SelectItem value="true" id={`${fieldId}-true`}>Yes</SelectItem>
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
            <SelectTrigger className="w-full bg-white" id={`${fieldId}-trigger`}>
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white" position="popper" sideOffset={5}>
              <SelectItem value="yes" id={`${fieldId}-yes`}>Yes</SelectItem>
              <SelectItem value="no" id={`${fieldId}-no`}>No</SelectItem>
              <SelectItem value="maybe" id={`${fieldId}-maybe`}>Maybe</SelectItem>
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
            <SelectTrigger className="w-full bg-white" id={`${fieldId}-trigger`}>
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white" position="popper" sideOffset={5}>
              <SelectItem value="lower_monthly" id={`${fieldId}-lower_monthly`}>Lower monthly cost, higher out-of-pocket</SelectItem>
              <SelectItem value="higher_monthly" id={`${fieldId}-higher_monthly`}>Higher monthly cost, lower out-of-pocket</SelectItem>
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
            <SelectTrigger className="w-full bg-white" id={`${fieldId}-trigger`}>
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white" position="popper" sideOffset={5}>
              <SelectItem value="1000" id={`${fieldId}-1000`}>$1,000</SelectItem>
              <SelectItem value="2500" id={`${fieldId}-2500`}>$2,500</SelectItem>
              <SelectItem value="5000" id={`${fieldId}-5000`}>$5,000</SelectItem>
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
            <SelectTrigger className="w-full bg-white" id={`${fieldId}-trigger`}>
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white" position="popper" sideOffset={5}>
              <SelectItem value="just_checkups" id={`${fieldId}-just_checkups`}>Just annual checkups</SelectItem>
              <SelectItem value="few_months" id={`${fieldId}-few_months`}>Every few months</SelectItem>
              <SelectItem value="monthly_plus" id={`${fieldId}-monthly_plus`}>Monthly or more</SelectItem>
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
    
    const startTime = Date.now();
    trackQuestionnaireStep('QUESTIONNAIRE_START', {
      stepNumber: currentStep + 1,
      stepName: 'Start',
    });

    return () => {
      if (!isComplete) {
        trackAbandonment(currentStep, Date.now() - startTime);
      }
    };
  }, [currentStep, isComplete, startTime]);

  // Add debugging for form state
  useEffect(() => {
    console.log('Form initialized with values:', form.getValues());
    
    // Log the steps configuration to see if state field is included
    console.log('Steps configuration:', steps);
    
    // Log the schema shape to see required fields
    console.log('Form schema shape:', Object.entries(formSchema.shape).map(([key, schema]) => {
      // @ts-ignore - Checking if field is required
      const isRequired = !schema.isOptional?.();
      return { field: key, required: isRequired };
    }));
    
    const subscription = form.watch((value, { name, type }) => {
      console.log(`Form field "${name}" changed:`, value, type);
    });
    
    return () => subscription.unsubscribe();
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
    if (isSubmitting) {
      console.log('Already submitting, ignoring duplicate submission');
      return;
    }
    
    console.log('onSubmit function called with data:', data);
    setIsSubmitting(true);
    setFormError(null);
    
    console.log('Form submission started', { data, currentStep, isComplete });
    
    try {
      // For the final step, validate the entire form
      console.log('Validating entire form data');
      
      // Ensure state has a value if not provided
      if (!data.state) {
        console.log('Setting default state value in onSubmit');
        data.state = data.zip_code ? 'TX' : '';
      }
      
      const finalValidation = formSchema.safeParse(data);
      console.log('Final validation result:', finalValidation);

      if (!finalValidation.success) {
        const errorMessage = finalValidation.error.errors
          .map(err => err.message)
          .join('. ');
        console.error('Validation failed:', errorMessage);
        throw new Error(errorMessage);
      }

      // Transform data to match QuestionnaireResponse type
      const transformedData: QuestionnaireResponse = {
        age: finalValidation.data.age,
        coverage_type: finalValidation.data.coverage_type,
        iua_preference: finalValidation.data.iua_preference || '1000', // Default value
        pregnancy: finalValidation.data.pregnancy || 'false', // Default value
        pre_existing: finalValidation.data.pre_existing || 'false', // Default value
        state: finalValidation.data.state || 'TX', // Default to TX if not provided
        zip_code: finalValidation.data.zip_code,
        expense_preference: finalValidation.data.expense_preference || 'lower_monthly', // Default value
        pregnancy_planning: finalValidation.data.pregnancy_planning,
        medical_conditions: finalValidation.data.medical_conditions || [],
        visit_frequency: finalValidation.data.visit_frequency || 'just_checkups' // Default value
      };

      console.log('Submitting form data:', transformedData);
      
      try {
        console.log('Calling saveQuestionnaireResponse');
        const response = await saveQuestionnaireResponse(transformedData);
        console.log('Server response:', response);
        
        if (!response.success) {
          console.error('Submission failed:', response.error, response.details);
          throw new Error(response.error || 'Failed to save questionnaire');
        }
        
        console.log('Tracking questionnaire completion');
        trackQuestionnaireStep('QUESTIONNAIRE_COMPLETE', {
          stepNumber: steps.length,
          stepName: 'Complete',
        });
        
        setIsComplete(true);
        
        // Wait a moment before redirecting
        console.log('Submission successful, preparing to redirect...');
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Redirect to results page
        console.log('Redirecting to results page');
        router.push('/questionnaire/results');
      } catch (submitError) {
        console.error('Error during submission:', submitError);
        throw submitError;
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormError(getErrorMessage(error));
      toast({
        title: 'Error',
        description: getErrorMessage(error),
        variant: 'destructive'
      });
    } finally {
      console.log('Setting isSubmitting to false');
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
          
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              console.log('Form submit event triggered');
              if (currentStep === steps.length - 1) {
                form.handleSubmit(onSubmit)(e);
              } else {
                // For non-final steps, just prevent default and let the button handle it
                console.log('Non-final step form submission, letting button handle it');
              }
            }} 
            className="space-y-6"
            noValidate
          >
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
                        <FormLabel htmlFor={fieldId} className="text-base">
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
                  id="previous-button"
                >
                  Previous
                </Button>
              )}
              
              <Button 
                type="button"
                onClick={() => {
                  console.log('Next/Submit button clicked');
                  console.log('Current step:', currentStep, 'Total steps:', steps.length);
                  
                  if (currentStep === steps.length - 1) {
                    console.log('Final step detected, attempting form submission');
                    // Log the current form values
                    console.log('Form values before submission:', form.getValues());
                    
                    // Check if all required fields are present
                    const missingFields = Object.entries(formSchema.shape).filter(([key, schema]) => {
                      // @ts-ignore - Checking if field is required
                      const isRequired = !schema.isOptional?.();
                      return isRequired && !form.getValues(key as any);
                    }).map(([key]) => key);
                    
                    console.log('Missing required fields:', missingFields);
                    
                    // Use a different approach for final submission
                    try {
                      console.log('Preparing data for direct submission');
                      const formData = form.getValues();
                      
                      // Set a default state value if it's not provided
                      if (!formData.state) {
                        console.log('Setting default state value from ZIP code');
                        // Extract state from ZIP code or set a default
                        formData.state = formData.zip_code ? 'TX' : '';
                        form.setValue('state', formData.state);
                      }
                      
                      // Manually validate the data
                      const validationResult = formSchema.safeParse(formData);
                      console.log('Manual validation result:', validationResult);
                      
                      if (validationResult.success) {
                        console.log('Manual validation successful, calling onSubmit directly');
                        // Call onSubmit directly instead of through form.handleSubmit
                        onSubmit(validationResult.data).catch(err => {
                          console.error('Direct onSubmit promise rejection:', err);
                        });
                      } else {
                        console.error('Manual validation failed:', validationResult.error);
                        toast({
                          title: 'Validation Error',
                          description: 'Please check all required fields',
                          variant: 'destructive'
                        });
                        
                        // Set errors on the form
                        validationResult.error.errors.forEach(err => {
                          form.setError(err.path[0] as any, {
                            type: 'manual',
                            message: err.message
                          });
                        });
                      }
                    } catch (error) {
                      console.error('Error during manual form submission:', error);
                    }
                  } else {
                    // For non-final steps, validate current step fields
                    const currentStepFields = step.fields as unknown as Array<keyof FormValues>;
                    const currentStepData = Object.fromEntries(
                      Object.entries(form.getValues()).filter(([key]) => 
                        currentStepFields.includes(key as keyof FormValues)
                      )
                    );
                    
                    console.log('Validating current step data:', currentStepData);
                    
                    // Create a schema for just this step's fields
                    const stepSchema = formSchema.pick(
                      currentStepFields.reduce((acc, field) => ({
                        ...acc,
                        [field]: true
                      }), {}) as Record<keyof FormValues, true>
                    );
                    
                    const validationResult = stepSchema.safeParse(currentStepData);
                    console.log('Step validation result:', validationResult);
                    
                    if (validationResult.success) {
                      // Additional check for coverage_type since it's a common issue
                      if (currentStepFields.includes('coverage_type' as keyof FormValues) && 
                          !form.getValues('coverage_type')) {
                        console.error('Coverage type is required but not selected');
                        form.setError('coverage_type', {
                          type: 'manual',
                          message: 'Please select who needs coverage'
                        });
                        
                        toast({
                          title: 'Missing Information',
                          description: 'Please select who needs coverage',
                          variant: 'destructive'
                        });
                        return;
                      }
                      
                      console.log('Advancing to next step');
                      setCurrentStep(prev => prev + 1);
                    } else {
                      // Show validation errors
                      validationResult.error.errors.forEach(err => {
                        form.setError(err.path[0] as any, {
                          type: 'manual',
                          message: err.message
                        });
                      });
                      
                      console.error('Validation failed:', validationResult.error);
                      toast({
                        title: 'Validation Error',
                        description: 'Please check the form for errors',
                        variant: 'destructive'
                      });
                    }
                  }
                }}
                className="ml-auto"
                disabled={isSubmitting}
                id={currentStep === steps.length - 1 ? "submit-button" : "next-button"}
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