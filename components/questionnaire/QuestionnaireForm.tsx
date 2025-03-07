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
import { ProgressIndicator } from '@/components/questionnaire/progress-indicator';
import { NumberInput } from '@/components/questionnaire/NumberInput';
import { OptionCardGroup } from '@/components/questionnaire/OptionCard';
import { InfoIcon } from 'lucide-react';

const COOKIE_KEY = 'questionnaire-form-data';
const COOKIE_OPTIONS = {
  expires: 1, // 1 day
  path: '/',
  sameSite: 'Lax' as const
};

const formSchema = z.object({
  age: z.union([
    z.string().min(1, "Age is required").transform(val => {
      const parsed = parseInt(val, 10);
      if (isNaN(parsed)) {
        throw new Error("Age must be a number");
      }
      return parsed;
    }),
    z.number().min(18, "You must be at least 18 years old").max(120, "Please enter a valid age")
  ]),
  coverage_type: z.enum(['just_me', 'me_spouse', 'me_kids', 'family'], {
    errorMap: () => ({ message: "Please select who needs coverage" })
  }),
  zip_code: z.string().min(5, "Please enter a valid ZIP code"),
  iua_preference: z.union([
    z.enum(['1000', '2500', '5000']),
    z.number().transform(val => String(val) as '1000' | '2500' | '5000')
  ]).optional(),
  pregnancy: z.enum(['true', 'false'], {
    errorMap: () => ({ message: "Please indicate if you are currently pregnant" })
  }).optional(),
  pre_existing: z.enum(['true', 'false'], {
    errorMap: () => ({ message: "Please indicate if you have pre-existing conditions" })
  }).optional(),
  state: z.string().optional(),
  expense_preference: z.enum(['lower_monthly', 'higher_monthly'], {
    errorMap: () => ({ message: "Please select your cost preference" })
  }).optional(),
  pregnancy_planning: z.enum(['yes', 'no', 'maybe'], {
    errorMap: () => ({ message: "Please indicate your pregnancy plans" })
  }).optional(),
  visit_frequency: z.enum(['just_checkups', 'few_months', 'monthly_plus'], {
    errorMap: () => ({ message: "Please select your expected visit frequency" })
  }).optional(),
  financial_capacity: z.enum(['500', '1000', '2500', '5000'], {
    errorMap: () => ({ message: "Please select your financial capacity for unexpected medical costs" })
  }).optional(),
  risk_preference: z.enum(['lower_risk', 'higher_risk'], {
    errorMap: () => ({ message: "Please select your risk preference" })
  }).optional(),
  pre_existing_approach: z.enum(['long_term', 'new_needs', 'balanced'], {
    errorMap: () => ({ message: "Please select your approach to pre-existing conditions" })
  }).optional()
});

const questionLabels: Record<keyof z.infer<typeof formSchema>, string> = {
  age: "What's the age of the oldest person needing coverage?",
  coverage_type: "Who needs coverage?",
  iua_preference: "Choose your Initial Unshared Amount (IUA)",
  pregnancy: "Are you currently pregnant?",
  pre_existing: "Do you have any pre-existing conditions?",
  state: "What state do you live in?",
  zip_code: "What is your ZIP code?",
  expense_preference: "Which approach do you prefer regarding your healthcare costs?",
  pregnancy_planning: "Are you planning to become pregnant in the next year?",
  visit_frequency: "How often do you expect to visit the doctor?",
  financial_capacity: "In the event of an unexpected medical emergency, what is the maximum amount you could comfortably pay out-of-pocket before cost-sharing begins?",
  risk_preference: "Which approach do you prefer regarding your healthcare costs and risk tolerance?",
  pre_existing_approach: "Understanding that your pre-existing conditions won't be covered in the first year, which approach do you prefer for your healthshare membership?"
}

const getFieldLabel = (field: keyof z.infer<typeof formSchema>): string => {
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
    case 'financial_capacity':
    case 'risk_preference':
    case 'pre_existing_approach':
      return 'radio';
    default:
      return 'text';
  }
};

const getPlaceholder = (fieldName: keyof z.infer<typeof formSchema>): string => {
  // Return empty strings to remove all placeholder text
  return '';
};

interface SelectOption {
  value: string;
  label: string;
}

const getSelectOptions = (fieldName: keyof z.infer<typeof formSchema>): SelectOption[] => {
  switch (fieldName) {
    case 'coverage_type':
      return [
        { value: 'just_me', label: 'Just me' },
        { value: 'me_spouse', label: 'Me and my spouse' },
        { value: 'me_kids', label: 'Me and my children' },
        { value: 'family', label: 'My family (me, spouse, and children)' }
      ];
    case 'iua_preference':
      return [
        { value: '1000', label: '$1,000' },
        { value: '2500', label: '$2,500' },
        { value: '5000', label: '$5,000' }
      ];
    case 'pregnancy':
    case 'pre_existing':
      return [
        { value: 'true', label: 'Yes' },
        { value: 'false', label: 'No' }
      ];
    case 'expense_preference':
      return [
        { value: 'lower_monthly', label: 'I prefer to pay less each month, even if it means higher out-of-pocket costs during a medical emergency' },
        { value: 'higher_monthly', label: 'I prefer to pay more monthly to minimize my out-of-pocket costs during a medical emergency' }
      ];
    case 'pregnancy_planning':
      return [
        { value: 'yes', label: 'Yes, planning to become pregnant' },
        { value: 'no', label: 'No plans for pregnancy' },
        { value: 'maybe', label: 'Maybe / Unsure' }
      ];
    case 'visit_frequency':
      return [
        { value: 'just_checkups', label: 'Just annual checkups' },
        { value: 'few_months', label: 'Every few months' },
        { value: 'monthly_plus', label: 'Monthly or more frequently' }
      ];
    case 'financial_capacity':
      return [
        { value: '500', label: 'I could manage up to $500 out-of-pocket' },
        { value: '1000', label: 'I could manage up to $1,000 out-of-pocket' },
        { value: '2500', label: 'I could manage up to $2,500 out-of-pocket' },
        { value: '5000', label: 'I could manage up to $5,000 out-of-pocket' }
      ];
    case 'risk_preference':
      return [
        { value: 'lower_risk', label: 'I prefer to pay more monthly to minimize my out-of-pocket costs during a medical emergency' },
        { value: 'higher_risk', label: 'I prefer to pay less monthly, even if it means higher out-of-pocket costs during a medical emergency' }
      ];
    case 'pre_existing_approach':
      return [
        { value: 'long_term', label: 'I want a plan that will provide the best long-term coverage for my pre-existing conditions after the waiting period' },
        { value: 'new_needs', label: 'I\'m primarily concerned with coverage for new, unexpected medical needs while I manage my pre-existing conditions separately' },
        { value: 'balanced', label: 'I want a balanced approach that considers both future coverage for pre-existing conditions and immediate coverage for new needs' }
      ];
    default:
      return [];
  }
};

const getRadioOptions = getSelectOptions;

const renderFormControl = (fieldName: string, field: any, form: UseFormReturn<FormValues>) => {
  const fieldType = getFieldType(fieldName as keyof FormValues);
  const fieldLabel = getFieldLabel(fieldName as keyof FormValues);
  
  // Log the field value and onChange handler
  console.log(`Rendering control for ${fieldName}:`, {
    value: field.value,
    onChange: !!field.onChange,
    onBlur: !!field.onBlur,
    name: field.name
  });
  
  return (
    <div className="questionnaire-section fade-in" style={{ animationDelay: `${parseInt(fieldName.split('_')[0] || '0') * 0.05}s` }}>
      {fieldType === 'number' && (
        <NumberInput
          id={fieldName}
          name={field.name}
          value={field.value || ''}
          onChange={(value) => field.onChange(value)}
          min={fieldName === 'age' ? 18 : 0}
          max={fieldName === 'age' ? 120 : 999}
          label={undefined}
          error={form.formState.errors[fieldName as keyof FormValues]?.message?.toString()}
          isValid={field.value && !form.formState.errors[fieldName as keyof FormValues]}
          tooltipText={undefined}
        />
      )}
      
      {fieldType === 'text' && (
        <div className="space-y-2">
          <input
            id={fieldName}
            type="text"
            {...field}
            value={field.value || ''}
            className={cn(
              "number-input",
              form.formState.errors[fieldName as keyof FormValues] && "input-error",
              field.value && !form.formState.errors[fieldName as keyof FormValues] && "input-success"
            )}
            placeholder={getPlaceholder(fieldName as keyof FormValues)}
          />
          {form.formState.errors[fieldName as keyof FormValues] && (
            <div className="error-message">
              {form.formState.errors[fieldName as keyof FormValues]?.message?.toString()}
            </div>
          )}
        </div>
      )}
      
      {fieldType === 'radio' && (
        <div className="space-y-3">
          <div className="flex items-center">
            {/* Tooltips have been moved to the FormLabel component */}
          </div>
          
          <OptionCardGroup
            name={fieldName}
            options={getRadioOptions(fieldName as keyof FormValues).map(option => ({
              value: option.value,
              label: option.label,
              description: undefined,
              tooltipText: undefined // Remove tooltips from answer options
            }))}
            value={field.value || ''}
            onChange={(value) => field.onChange(value)}
            layout={fieldName === 'coverage_type' || fieldName === 'iua_preference' ? 'grid' : 'vertical'}
          />
          
          {fieldName === 'iua_preference' && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Remember:</strong> The Initial Unshared Amount (IUA) applies to each separate medical need rather than accumulating throughout the year. For example, if you have a $1,000 IUA and break your arm, you pay the first $1,000, then the plan shares costs above that amount. If you later get pneumonia (a separate need), you pay another $1,000 before sharing begins.
              </p>
            </div>
          )}
          
          {fieldName === 'pre_existing' && field.value === 'true' && (
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>Important:</strong> Pre-existing conditions are not eligible for cost-sharing during your first year of membership with any healthshare plan. After the first year, coverage for pre-existing conditions will gradually increase based on the specific plan.
              </p>
            </div>
          )}
          
          {fieldName === 'pre_existing_approach' && (
            <div className="mt-2 text-sm text-gray-500">
              This helps us recommend plans that best align with your priorities for managing pre-existing conditions.
            </div>
          )}
          
          {form.formState.errors[fieldName as keyof FormValues] && (
            <div className="error-message">
              {form.formState.errors[fieldName as keyof FormValues]?.message?.toString()}
            </div>
          )}
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
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center">
            <FormLabel className="question-text">{getFieldLabel(fieldName)}</FormLabel>
            {fieldName === 'iua_preference' && (
              <span className="tooltip ml-2">
                <InfoIcon className="tooltip-icon" />
                <div className="tooltip-content">
                  Unlike a traditional insurance deductible, the IUA applies to each separate medical need rather than accumulating throughout the year. For example, if you have a $1,000 IUA and break your arm, you pay the first $1,000, then the plan shares costs above that amount. If you later get pneumonia (a separate need), you pay another $1,000 before sharing begins.
                </div>
              </span>
            )}
            {fieldName === 'financial_capacity' && (
              <span className="tooltip ml-2">
                <InfoIcon className="tooltip-icon" />
                <div className="tooltip-content">
                  This helps us recommend plans with Initial Unshared Amounts (IUAs) that align with your financial situation. We won't recommend plans with IUAs higher than what you can comfortably afford.
                </div>
              </span>
            )}
            {fieldName === 'pre_existing' && (
              <span className="tooltip ml-2">
                <InfoIcon className="tooltip-icon" />
                <div className="tooltip-content">
                  Pre-existing conditions are not eligible for cost-sharing during your first year of membership with any healthshare plan. After the first year, coverage for pre-existing conditions will gradually increase based on the specific plan.
                </div>
              </span>
            )}
            {fieldName === 'expense_preference' && (
              <span className="tooltip tooltip-right ml-2">
                <InfoIcon className="tooltip-icon" />
                <div className="tooltip-content">
                  This preference helps us recommend plans that align with your financial priorities. Lower monthly costs typically mean higher out-of-pocket expenses when you need care, while higher monthly costs usually mean lower out-of-pocket expenses.
                </div>
              </span>
            )}
            {fieldName === 'visit_frequency' && (
              <span className="tooltip ml-2">
                <InfoIcon className="tooltip-icon" />
                <div className="tooltip-content">
                  Your expected frequency of doctor visits helps us recommend plans that provide appropriate coverage for your healthcare needs. More frequent visits may benefit from plans with lower Initial Unshared Amounts (IUAs).
                </div>
              </span>
            )}
            {fieldName === 'risk_preference' && (
              <span className="tooltip tooltip-right ml-2">
                <InfoIcon className="tooltip-icon" />
                <div className="tooltip-content">
                  Your risk tolerance affects how we recommend plans. Lower risk preference means prioritizing plans with more predictable costs, while higher risk preference means accepting more potential out-of-pocket costs in exchange for lower monthly contributions.
                </div>
              </span>
            )}
            {fieldName === 'pre_existing_approach' && (
              <span className="tooltip tooltip-right ml-2">
                <InfoIcon className="tooltip-icon" />
                <div className="tooltip-content">
                  This helps us prioritize plans based on how you want to manage your pre-existing conditions. Some plans offer better long-term coverage after waiting periods, while others may be more suitable for immediate coverage of new medical needs.
                </div>
              </span>
            )}
          </div>
          <FormControl>
            {renderFormControl(fieldName, field, form)}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Define FormValues interface explicitly to match our schema changes
interface FormValues {
  age: string;  // Changed from number to string to match our schema
  coverage_type: 'just_me' | 'me_spouse' | 'me_kids' | 'family' | undefined;
  iua_preference: '1000' | '2500' | '5000' | undefined;
  pregnancy: 'true' | 'false' | undefined;
  pre_existing: 'true' | 'false' | undefined;
  state?: string;
  zip_code: string;
  expense_preference: 'lower_monthly' | 'higher_monthly' | undefined;
  pregnancy_planning?: 'yes' | 'no' | 'maybe';
  visit_frequency: 'just_checkups' | 'few_months' | 'monthly_plus' | undefined;
  financial_capacity: '500' | '1000' | '2500' | '5000' | undefined;
  risk_preference: 'lower_risk' | 'higher_risk' | undefined;
  pre_existing_approach: 'long_term' | 'new_needs' | 'balanced' | undefined;
}

// Create a schema for just the first step
const firstStepSchema = z.object({
  age: z.union([
    z.string().min(1, "Age is required").transform(val => {
      const parsed = parseInt(val, 10);
      if (isNaN(parsed)) {
        throw new Error("Age must be a number");
      }
      return parsed;
    }),
    z.number().min(18, "You must be at least 18 years old").max(120, "Please enter a valid age")
  ]),
  coverage_type: z.enum(['just_me', 'me_spouse', 'me_kids', 'family'], {
    errorMap: () => ({ message: "Please select who needs coverage" })
  }),
  zip_code: z.string().min(5, "Please enter a valid ZIP code"),
});

export const QuestionnaireForm = () => {
  // Add console logs to debug form initialization
  console.log("QuestionnaireForm initializing");
  
  const [startTime] = useState(Date.now());
  const [isComplete, setIsComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  
  // Scroll to top when the component loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Define the steps for the questionnaire
  const steps = [
    {
      title: "Basic Information",
      description: "Let's start with some basic information to find the right healthshare plan for you.",
      fields: ['age', 'coverage_type', 'zip_code'],
      label: 'Basic Info'
    },
    {
      title: "Health Status",
      description: "Tell us about your health to find plans that meet your needs.",
      fields: ['pre_existing', 'pregnancy'],
      label: 'Health Status'
    },
    {
      title: "Preferences",
      description: "Help us understand your preferences for cost and coverage.",
      fields: ['financial_capacity', 'risk_preference', 'visit_frequency', 'iua_preference'],
      label: 'Preferences'
    }
  ];
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: '',  // Initialize with empty string instead of undefined
      coverage_type: undefined,
      zip_code: '',
      iua_preference: undefined,
      pregnancy: undefined,
      pre_existing: undefined,
      state: '',
      expense_preference: undefined,
      pregnancy_planning: undefined,
      visit_frequency: undefined,
      financial_capacity: undefined,
      risk_preference: undefined,
      pre_existing_approach: undefined,
    },
    mode: 'onSubmit', // Change to onSubmit to prevent premature validation
  });
  
  // Watch the pregnancy field to conditionally show pregnancy_planning
  const watchPregnancy = form.watch('pregnancy');
  
  // Watch the pre_existing field to conditionally show pre_existing_approach
  const watchPreExisting = form.watch('pre_existing');
  
  // Reset pregnancy_planning when pregnancy changes to 'true'
  useEffect(() => {
    if (watchPregnancy === 'true') {
      form.setValue('pregnancy_planning', undefined);
    }
  }, [watchPregnancy, form]);
  
  // Dynamically determine fields for the current step
  const getCurrentStepFields = () => {
    if (currentStep === 1) {
      // For the Health Status step, conditionally include pregnancy_planning and pre_existing_approach
      const fields = ['pre_existing', 'pregnancy'];
      if (watchPregnancy === 'false') {
        fields.push('pregnancy_planning');
      }
      
      // Add pre_existing_approach if user has pre-existing conditions
      if (watchPreExisting === 'true') {
        fields.push('pre_existing_approach');
      }
      
      return fields;
    }
    return steps[currentStep].fields;
  };
  
  // Log default values
  console.log("Form default values:", form.getValues());
  
  // Log detailed form information
  useEffect(() => {
    console.log("Form initialized with values:", form.getValues());
    console.log("Steps configuration:", steps);
    console.log("Form schema shape:", Object.keys(formSchema.shape));
    
    // Add event listener for form changes
    const subscription = form.watch((value, { name, type }) => {
      if (name) {
        console.log(`Form field "${name}" changed:`, value, type);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form]);
  
  // Add debugging for form validation
  const handleNextClick = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Next button clicked");
    console.log("Current form values:", form.getValues());
    console.log("Form state:", form.formState);
    console.log("Current step before validation:", currentStep);
    
    // Get only the fields for the current step
    const currentStepFields = getCurrentStepFields();
    console.log("Current step fields:", currentStepFields);
    
    // Get current values
    const currentValues = form.getValues();
    const currentStepValues = Object.fromEntries(
      currentStepFields.map(field => [field, currentValues[field as keyof FormValues]])
    );
    
    console.log("Validating current step values:", currentStepValues);
    
    // For the first step, use the dedicated schema
    if (currentStep === 0) {
      try {
        const validationResult = firstStepSchema.safeParse(currentStepValues);
        console.log("First step validation result:", validationResult);
        
        if (validationResult.success) {
          console.log("First step is valid, proceeding to next step");
          // Scroll to top before changing step
          window.scrollTo(0, 0);
          setCurrentStep(1);
        } else {
          console.log("First step validation errors:", validationResult.error.format());
          
          // Set form errors
          validationResult.error.errors.forEach(err => {
            if (err.path.length > 0) {
              const fieldName = err.path[0].toString();
              form.setError(fieldName as any, {
                type: 'manual',
                message: err.message
              });
            }
          });
          
          toast({
            title: "Please check your information",
            description: "There are some issues with your form entries.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Error during first step validation:", error);
      }
      return;
    }
    
    // For other steps, use the existing logic
    try {
      // This is a simplified approach for debugging
      let isValid = true;
      const errors: any[] = [];
      
      // Simple validation for other steps
      currentStepFields.forEach(field => {
        const value = currentValues[field as keyof FormValues];
        if (field === 'pre_existing' || field === 'pregnancy' || field === 'expense_preference') {
          if (!value) {
            isValid = false;
            errors.push({
              path: [field],
              message: `Please select an option for ${field.replace('_', ' ')}`
            });
          }
        }
      });
      
      if (isValid) {
        console.log("Current step is valid, proceeding...");
        
        if (currentStep < steps.length - 1) {
          // Scroll to top before changing step
          window.scrollTo(0, 0);
          // Move to the next step
          setCurrentStep(currentStep + 1);
        } else {
          // Submit the form on the last step
          form.handleSubmit(onSubmit)();
        }
      } else {
        console.log("Validation errors:", errors);
        
        // Set form errors
        errors.forEach(err => {
          if (err.path.length > 0) {
            const fieldName = err.path[0].toString();
            form.setError(fieldName as any, {
              type: 'manual',
              message: err.message
            });
          }
        });
        
        toast({
          title: "Please check your information",
          description: "There are some issues with your form entries.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error during validation:", error);
      toast({
        title: "Validation Error",
        description: "There was a problem validating your information.",
        variant: "destructive"
      });
    }
  };

  // Add effect to log current step changes
  useEffect(() => {
    console.log("Current step changed to:", currentStep);
  }, [currentStep]);

  const onSubmit = async (data: FormValues) => {
    console.log("Form submission triggered with data:", data);
    console.log("onSubmit function called with data:", data);
    
    if (isSubmitting) {
      console.log('Already submitting, ignoring duplicate submission');
      return;
    }
    
    try {
      console.log("Form submission started", data);
      setIsSubmitting(true);
      setFormError(null);
      
      // Log each field's type to identify the issue
      Object.entries(data).forEach(([key, value]) => {
        console.log(`Field ${key}: value = ${value}, type = ${typeof value}`);
      });
      
      console.log("Validating entire form data");
      
      // If state is not provided, set a default value
      if (!data.state) {
        console.log("Setting default state value in onSubmit");
        data.state = data.zip_code ? 'TX' : '';
      }
      
      // Convert any numeric strings to actual strings before validation
      if (typeof data.iua_preference === 'number') {
        console.log("Converting iua_preference from number to string");
        data.iua_preference = String(data.iua_preference) as any;
      }
      
      // Convert age back to string if it's a number
      if (typeof data.age === 'number') {
        console.log("Converting age from number to string");
        data.age = String(data.age);
      }
      
      // Log the data after conversions
      console.log("Data after type conversions:", data);
      
      // Manually validate the data
      const validationResult = formSchema.safeParse(data);
      console.log("Final validation result:", validationResult);
      
      if (validationResult.success) {
        console.log("Validation successful, proceeding with submission");
        
        // Transform data to match QuestionnaireResponse type
        const transformedData = {
          age: validationResult.data.age,
          coverage_type: validationResult.data.coverage_type,
          iua_preference: validationResult.data.iua_preference || '1000', // Default value
          pregnancy: validationResult.data.pregnancy || 'false', // Default value
          pre_existing: validationResult.data.pre_existing || 'false', // Default value
          state: validationResult.data.state || 'TX', // Default to TX if not provided
          zip_code: validationResult.data.zip_code,
          expense_preference: validationResult.data.expense_preference || 'lower_monthly', // Default value
          pregnancy_planning: validationResult.data.pregnancy === 'false' ? (validationResult.data.pregnancy_planning || 'no') : 'no', // Only include if pregnancy is false
          visit_frequency: validationResult.data.visit_frequency || 'just_checkups', // Default value
          financial_capacity: validationResult.data.financial_capacity || '1000', // Default value
          risk_preference: validationResult.data.risk_preference || 'lower_risk', // Default value
          pre_existing_approach: validationResult.data.pre_existing_approach || 'balanced' // Default value
        };
        
        // Save the response to the database
        const response = await saveQuestionnaireResponse(transformedData);
        console.log("Response saved successfully:", response);
        
        // Set completion flag
        setIsComplete(true);
        
        // Scroll to top before redirecting
        window.scrollTo(0, 0);
        
        // Redirect to results page
        router.push('/questionnaire/results');
      } else {
        console.error("Validation failed:", validationResult.error);
        
        // Log detailed validation errors
        validationResult.error.errors.forEach(err => {
          console.error(`Validation error for path ${err.path.join('.')}: ${err.message}`);
          console.error(`Error code: ${err.code}, received: ${JSON.stringify(err)}`);
        });
        
        throw new Error(validationResult.error.message);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormError(error instanceof Error ? error.message : 'An unknown error occurred');
      
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to submit questionnaire',
        variant: 'destructive'
      });
    } finally {
      console.log("Setting isSubmitting to false");
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
      <ProgressIndicator 
        currentPage={currentStep + 1}
        totalPages={steps.length}
        steps={steps.map(step => ({ label: step.label }))}
      />
      
      <div className="questionnaire-card">
        <h1 className="questionnaire-step-title">{steps[currentStep].title}</h1>
        <p className="questionnaire-step-description">
          {steps[currentStep].description}
        </p>
        
        <form onSubmit={handleNextClick} className="space-y-6">
          {/* Form fields with animation */}
          <div className="space-y-12 transition-all duration-300">
            {getCurrentStepFields().map(fieldName => 
              renderFormField(fieldName as keyof FormValues, form)
            )}
          </div>
          
          <div className="flex justify-between pt-6">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="questionnaire-button questionnaire-button-secondary"
              >
                Back
              </button>
            )}
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNextClick}
                className="questionnaire-button questionnaire-button-primary questionnaire-button-with-arrow"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                className="questionnaire-button questionnaire-button-primary"
              >
                Get My Recommendations
              </button>
            )}
          </div>
        </form>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Your information is secure and will never be shared without your permission.</p>
      </div>
    </div>
  );
} 