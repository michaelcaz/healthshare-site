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
  age: z.string()
    .min(1, "Age is required")
    .transform((val) => {
      const parsed = parseInt(val, 10);
      if (isNaN(parsed)) {
        throw new Error("Age must be a number");
      }
      return parsed;
    })
    .refine((val) => val >= 18, "You must be at least 18 years old")
    .refine((val) => val <= 120, "Please enter a valid age"),
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
    return "How often do you expect to visit the doctor?";
  }
  return questionLabels[field] || field;
}

// Create a forwarded ref version of Select
const ForwardedSelect = forwardRef((props: any, ref) => (
  <Select {...props} />
));
ForwardedSelect.displayName = 'ForwardedSelect';

// Helper functions for form field rendering
const getFieldType = (fieldName: keyof z.infer<typeof formSchema>): 'text' | 'number' | 'select' | 'radio' => {
  switch (fieldName) {
    case 'age':
      return 'number';
    case 'coverage_type':
    case 'iua_preference':
    case 'pregnancy':
    case 'pre_existing':
    case 'expense_preference':
    case 'pregnancy_planning':
    case 'visit_frequency':
      return 'radio';
    default:
      return 'text';
  }
};

const getPlaceholder = (fieldName: keyof z.infer<typeof formSchema>): string => {
  switch (fieldName) {
    case 'age':
      return 'Enter your age';
    case 'zip_code':
      return 'Enter your ZIP code';
    case 'medical_conditions':
      return 'Enter medical conditions, separated by commas';
    default:
      return `Enter ${fieldName.replace('_', ' ')}`;
  }
};

interface SelectOption {
  value: string;
  label: string;
  description?: string;
}

const getSelectOptions = (fieldName: keyof z.infer<typeof formSchema>, form: UseFormReturn<FormValues>): SelectOption[] => {
  switch (fieldName) {
    case 'coverage_type':
      return [
        { value: 'just_me', label: 'Just me' },
        { value: 'me_spouse', label: 'Me + Spouse' },
        { value: 'me_kids', label: 'Me + Kids' },
        { value: 'family', label: 'Family' }
      ];
    case 'iua_preference':
      return [
        { value: '1000', label: '$1,000' },
        { value: '2500', label: '$2,500' },
        { value: '5000', label: '$5,000' }
      ];
    case 'pregnancy':
      return [
        { value: 'false', label: 'No' },
        { value: 'true', label: 'Yes' }
      ];
    case 'pre_existing':
      return [
        { value: 'false', label: 'No' },
        { value: 'true', label: 'Yes' }
      ];
    case 'expense_preference':
      return [
        { value: 'lower_monthly', label: 'Lower monthly cost', description: 'Higher out-of-pocket when you need care' },
        { value: 'higher_monthly', label: 'Higher monthly cost', description: 'Lower out-of-pocket when you need care' }
      ];
    case 'pregnancy_planning':
      return [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
        { value: 'maybe', label: 'Maybe' }
      ];
    case 'visit_frequency':
      return [
        { value: 'just_checkups', label: 'Just annual checkups', description: 'Only for preventive care' },
        { value: 'few_months', label: 'Every few months', description: 'Occasional doctor visits' },
        { value: 'monthly_plus', label: 'Monthly or more', description: 'Regular medical attention' }
      ];
    default:
      return [];
  }
};

const getRadioOptions = getSelectOptions;

const renderFormControl = (fieldName: string, field: any, form: UseFormReturn<FormValues>) => {
  const fieldType = getFieldType(fieldName as keyof FormValues);
  const fieldLabel = getFieldLabel(fieldName as keyof FormValues, form);
  
  return (
    <div className="questionnaire-form-group fade-in" style={{ animationDelay: `${parseInt(fieldName.split('_')[0] || '0') * 0.05}s` }}>
      <label htmlFor={fieldName} className="questionnaire-label">
        {fieldLabel}
      </label>
      
      {fieldType === 'select' && (
        <div className="relative">
          <select
            id={fieldName}
            {...field}
            className="questionnaire-select focus:ring-2 focus:ring-primary/20 transition-all"
          >
            {getSelectOptions(fieldName as keyof FormValues, form).map((option: SelectOption) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      )}
      
      {fieldType === 'text' && (
        <input
          id={fieldName}
          type="text"
          {...field}
          className="questionnaire-input focus:ring-2 focus:ring-primary/20 transition-all"
          placeholder={getPlaceholder(fieldName as keyof FormValues)}
        />
      )}
      
      {fieldType === 'number' && (
        <input
          id={fieldName}
          type={fieldName === 'age' ? 'text' : 'number'}
          inputMode={fieldName === 'age' ? 'numeric' : 'decimal'}
          pattern={fieldName === 'age' ? '[0-9]*' : undefined}
          {...field}
          className="questionnaire-input focus:ring-2 focus:ring-primary/20 transition-all"
          placeholder={getPlaceholder(fieldName as keyof FormValues)}
        />
      )}
      
      {fieldType === 'radio' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          {getRadioOptions(fieldName as keyof FormValues, form).map((option: SelectOption) => (
            <label
              key={option.value}
              className={`
                flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all
                ${field.value === option.value 
                  ? 'border-primary bg-primary/5 shadow-sm' 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <input
                type="radio"
                value={option.value}
                checked={field.value === option.value}
                onChange={() => field.onChange(option.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${field.value === option.value ? 'border-primary' : 'border-gray-300'}`}>
                {field.value === option.value && (
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                )}
              </div>
              <div>
                <div className="font-medium">{option.label}</div>
                {option.description && (
                  <div className="text-sm text-gray-500">{option.description}</div>
                )}
              </div>
            </label>
          ))}
        </div>
      )}
      
      {form.formState.errors[fieldName as keyof FormValues] && (
        <div className="questionnaire-error">
          {form.formState.errors[fieldName as keyof FormValues]?.message as string}
        </div>
      )}
    </div>
  );
};

// Helper function to render form fields
const renderFormField = (fieldName: keyof FormValues, form: UseFormReturn<FormValues>) => {
  return (
    <FormField
      key={fieldName}
      control={form.control}
      name={fieldName}
      render={({ field }) => renderFormControl(fieldName, field, form)}
    />
  );
};

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
    <div className="questionnaire-container">
      <div className="questionnaire-card">
        <h1 className="questionnaire-step-title">Basic Information</h1>
        <p className="questionnaire-step-description">
          Let's start with some basic information to find the right healthshare plan for you.
        </p>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Form fields with animation */}
          <div className="space-y-6 transition-all duration-300">
            {renderFormField('age', form)}
            {renderFormField('coverage_type', form)}
            {renderFormField('zip_code', form)}
          </div>
          
          <div className="questionnaire-navigation">
            <div></div> {/* Empty div for flex spacing */}
            <button 
              type="submit" 
              className="questionnaire-button questionnaire-button-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Next'}
            </button>
          </div>
        </form>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Your information is secure and will never be shared without your permission.</p>
      </div>
    </div>
  );
} 