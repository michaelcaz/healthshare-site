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
import { getQuestionnaireResponse } from '@/lib/utils/storage';
import { logError, getErrorMessage, AppError } from '@/lib/utils/error-logging';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getVisitFrequencyOptions } from '@/lib/utils/visit-calculator';
import Cookies from 'js-cookie';
import { ProgressIndicator } from '@/components/questionnaire/progress-indicator';
import { NumberInput } from '@/components/questionnaire/NumberInput';
import { OptionCardGroup } from '@/components/questionnaire/OptionCard';
import { InfoIcon } from 'lucide-react';
import { PregnancyQuestion } from './PregnancyQuestion';
import { PlansLoader } from '../../app/components/questionnaire';

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
    z.enum(['500', '1000', '2500', '5000']),
    z.number().transform(val => String(val) as '500' | '1000' | '2500' | '5000')
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
  }).optional(),
  preventative_services: z.enum(['yes', 'no'], {
    errorMap: () => ({ message: "Please select if you want coverage for preventative services" })
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
  financial_capacity: "In the event of an unexpected medical emergency, what's the maximum amount you could comfortably pay out-of-pocket before cost-sharing begins?",
  risk_preference: "Which approach do you prefer regarding your healthcare costs and risk tolerance?",
  pre_existing_approach: "Understanding that your pre-existing conditions won't be covered in the first year, which approach do you prefer for your healthshare membership?",
  preventative_services: "Do you want coverage for preventative services like annual checkups and well-child visits?"
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
    case 'preventative_services':
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
    case 'preventative_services':
      return [
        { value: 'yes', label: 'Yes, I want preventative services included in my plan' },
        { value: 'no', label: 'No, I have or plan to get a Direct Primary Membership, or plan to invest in my health in other ways.' }
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
        { value: '5000', label: 'I could manage $5,000 out-of-pocket or more' }
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

// Add a function to get tooltips for fields
const getTooltip = (fieldName: keyof z.infer<typeof formSchema>): string | null => {
  const tooltips: Partial<Record<keyof z.infer<typeof formSchema>, string>> = {
    iua_preference: "Unlike a traditional insurance deductible, the IUA applies to each separate medical need rather than accumulating throughout the year. For example, if you have a $1,000 IUA and break your arm, you pay the first $1,000, then the plan shares costs above that amount. If you later get pneumonia (a separate need), you pay another $1,000 before sharing begins.",
    financial_capacity: "This helps us recommend plans with Initial Unshared Amounts (IUAs) that align with your financial situation. We won't recommend plans with IUAs higher than what you can comfortably afford.",
    pre_existing: "Pre-existing conditions are not eligible for cost-sharing during your first year of membership with any healthshare plan. After the first year, coverage for pre-existing conditions will gradually increase based on the specific plan.",
    expense_preference: "This preference helps us recommend plans that align with your financial priorities. Lower monthly costs typically mean higher out-of-pocket expenses when you need care, while higher monthly costs usually mean lower out-of-pocket expenses.",
    visit_frequency: "Your expected frequency of doctor visits helps us recommend plans that provide appropriate coverage for your healthcare needs. It also helps us calculate your expected annual healthcare costs.",
    risk_preference: "Your risk tolerance affects how we recommend plans. Lower risk preference means prioritizing plans with more predictable costs, while higher risk preference means accepting more potential out-of-pocket costs in exchange for lower monthly contributions.",
    pre_existing_approach: "This helps us prioritize plans based on how you want to manage your pre-existing conditions. Some plans offer better long-term coverage after waiting periods, while others may be more suitable for immediate coverage of new medical needs."
  };
  
  return tooltips[fieldName] || null;
};

const renderFormControl = (fieldName: string, field: any, form: UseFormReturn<FormValues>) => {
  const fieldType = getFieldType(fieldName as keyof FormValues);
  
  if (fieldType === 'number') {
    return (
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
    );
  }
  
  if (fieldType === 'text') {
    return (
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
    );
  }
  
  if (fieldType === 'radio') {
    return (
      <div className="space-y-3">
        <OptionCardGroup
          name={fieldName}
          options={getRadioOptions(fieldName as keyof FormValues).map(option => ({
            value: option.value,
            label: option.label,
            description: undefined,
            tooltipText: undefined
          }))}
          value={field.value || ''}
          onChange={(value) => field.onChange(value)}
          layout={fieldName === 'coverage_type' || fieldName === 'iua_preference' ? 'grid' : 'vertical'}
        />
        
        {fieldName === 'iua_preference' && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Remember:</strong> The Initial Unshared Amount (IUA) applies to each separate medical need rather than accumulating throughout the year.
            </p>
          </div>
        )}
        
        {fieldName === 'pre_existing' && field.value === 'true' && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              <strong>Important:</strong> Pre-existing conditions are not eligible for cost-sharing during your first year of membership with any healthshare plan.
            </p>
          </div>
        )}
        
        {form.formState.errors[fieldName as keyof FormValues] && (
          <div className="error-message">
            {form.formState.errors[fieldName as keyof FormValues]?.message?.toString()}
          </div>
        )}
      </div>
    );
  }
  
  // Default case
  return (
    <div className="questionnaire-section fade-in">
      <input
        id={fieldName}
        type="text"
        {...field}
        className="questionnaire-input"
      />
    </div>
  );
};

// Helper function to render form fields
const renderFormField = (fieldName: keyof FormValues, form: UseFormReturn<FormValues>) => {
  // Special handling for pregnancy field
  if (fieldName === 'pregnancy') {
    return <PregnancyQuestion key={fieldName} form={form} fieldName={fieldName} />;
  }
  
  // Regular handling for other fields
  return (
    <FormField
      key={fieldName}
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="mb-6">
          <div className="flex justify-between items-start">
            <FormLabel className="text-lg font-medium text-gray-900 mb-2">
              {getFieldLabel(fieldName)}
            </FormLabel>
            {/* Add tooltip if available */}
            {getTooltip(fieldName as keyof z.infer<typeof formSchema>) && (
              <div className="relative group">
                <InfoIcon className="h-5 w-5 text-gray-400 cursor-help" />
                <div className="absolute right-0 w-64 p-2 mt-2 text-xs text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  {getTooltip(fieldName as keyof z.infer<typeof formSchema>)}
                </div>
              </div>
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
  iua_preference: '500' | '1000' | '2500' | '5000' | undefined;
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
  preventative_services?: 'yes' | 'no';
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
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<FormValues>>({});
  
  // Add state for tracking potential bot detection
  const [isPotentialBot, setIsPotentialBot] = useState(false);
  const [honeypotValue, setHoneypotValue] = useState('');
  
  // Define the steps for the questionnaire
  const questionnaireSections = [
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
      fields: ['financial_capacity', 'risk_preference', 'visit_frequency', 'preventative_services'],
      label: 'Preferences'
    }
  ];
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: '',
      coverage_type: undefined,
      iua_preference: undefined,
      pregnancy: undefined,
      pre_existing: undefined,
      zip_code: '',
      expense_preference: undefined,
      pregnancy_planning: undefined,
      visit_frequency: undefined,
      financial_capacity: undefined,
      risk_preference: undefined,
      pre_existing_approach: undefined,
      preventative_services: undefined
    }
  });
  
  // Scroll to top when the component loads and load existing data
  useEffect(() => {
    // Ensure isSubmitting is false when component mounts
    setIsSubmitting(false);
    setFormSubmitted(false);
    
    window.scrollTo(0, 0);
    
    console.log("Attempting to load existing questionnaire data...");
    
    // Load existing questionnaire data if available
    try {
      // First try to get data from localStorage directly
      const storedData = localStorage.getItem('questionnaire-data');
      console.log("Raw localStorage data:", storedData ? "Found" : "Not found");
      
      // Then try using the utility function
      const utilityData = getQuestionnaireResponse();
      console.log("Utility function data:", utilityData ? "Found" : "Not found");
      
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        console.log("Parsed localStorage data:", parsedData);
        
        // If we have a response object, use it to pre-fill the form
        if (parsedData.response) {
          console.log('Found existing questionnaire data:', parsedData.response);
          
          // Convert the data to match the form's expected format
          const formValues: Partial<FormValues> = {
            age: parsedData.response.age?.toString() || '',
            coverage_type: parsedData.response.coverage_type,
            zip_code: parsedData.response.zip_code || '',
            iua_preference: parsedData.response.iua_preference,
            pregnancy: parsedData.response.pregnancy,
            pre_existing: parsedData.response.pre_existing,
            state: parsedData.response.state || '',
            expense_preference: parsedData.response.expense_preference,
            pregnancy_planning: parsedData.response.pregnancy_planning,
            visit_frequency: parsedData.response.visit_frequency,
            financial_capacity: parsedData.response.financial_capacity,
            risk_preference: parsedData.response.risk_preference,
            pre_existing_approach: parsedData.response.pre_existing_approach,
            preventative_services: parsedData.response.preventative_services,
          };
          
          console.log("Converted form values:", formValues);
          
          // Update the form with the existing values
          Object.entries(formValues).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              console.log(`Setting form value for ${key}:`, value);
              form.setValue(key as keyof FormValues, value as any);
            }
          });
          
          setFormData(formValues);
          
          // Show a toast notification to inform the user
          toast({
            title: "Welcome back!",
            description: "We've loaded your previous answers. Feel free to review and update them.",
            variant: "default"
          });
        } else {
          console.log("No response object found in localStorage data");
        }
      } else {
        console.log("No questionnaire data found in localStorage");
      }
    } catch (error) {
      console.error('Error loading questionnaire data:', error);
      // Don't show an error to the user, just continue with an empty form
    }
  }, [form, toast]);
  
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
      let fields = ['pre_existing'];
      
      // Add pre_existing_approach immediately after pre_existing if user has pre-existing conditions
      if (watchPreExisting === 'true') {
        fields.push('pre_existing_approach');
      }
      
      // Add pregnancy and pregnancy_planning fields after the pre-existing fields
      fields.push('pregnancy');
      
      if (watchPregnancy === 'false') {
        fields.push('pregnancy_planning');
      }
      
      return fields;
    }
    return questionnaireSections[currentStep].fields;
  };
  
  // Log default values
  console.log("Form default values:", form.getValues());
  
  // Log detailed form information
  useEffect(() => {
    console.log("Form initialized with values:", form.getValues());
    console.log("Steps configuration:", questionnaireSections);
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
        
        if (currentStep < questionnaireSections.length - 1) {
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
    
    try {
      // Check if the honeypot field has been filled - indicates a bot
      if (honeypotValue.length > 0) {
        console.log("Bot detected through honeypot field");
        
        // Pretend to submit the form but don't actually do anything with the data
        setIsSubmitting(true);
        setFormSubmitted(true);
        
        // Simulate processing time then redirect to avoid letting bots know they were detected
        setTimeout(() => {
          // We redirect to recommendations but the data isn't actually saved
          router.push('/recommendations');
        }, 3000);
        
        return; // Stop further processing
      }
      
      setIsSubmitting(true);
      setFormSubmitted(true);
      
      // Scroll to top of the page
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      setFormError(null);
      
      console.log("Form submission started", data);
      
      // Log the type of each field for debugging
      Object.entries(data).forEach(([key, value]) => {
        console.log(`Field ${key}: value = ${value}, type = ${typeof value}`);
      });
      
      // Set default state value in onSubmit
      if (!data.state || data.state.trim() === '') {
        data.state = 'TX'; // Default to Texas if no state is provided
      }
      
      // Create a copy of the data to avoid modifying the original
      const submissionData = { ...data };
      
      // Convert age from string to number for internal processing
      const age = typeof submissionData.age === 'string' 
        ? parseInt(submissionData.age, 10) 
        : submissionData.age;
      
      console.log("Data after type conversions:", submissionData);
      
      // Setting iua_preference based on financial_capacity
      const iua_preference = submissionData.financial_capacity || '1000';
      
      // Set expense_preference based on financial_capacity and risk_preference
      let expense_preference: 'lower_monthly' | 'higher_monthly' = 'lower_monthly';
      
      if (submissionData.financial_capacity === '500' || submissionData.financial_capacity === '1000') {
        // Lower financial capacity indicates preference for higher monthly premiums with lower IUAs
        console.log('Setting expense_preference to "higher_monthly" for low financial capacity');
        expense_preference = 'higher_monthly';
      } else if (submissionData.financial_capacity === '2500' || submissionData.financial_capacity === '5000') {
        // Higher financial capacity indicates preference for lower monthly premiums with higher IUAs
        console.log('Setting expense_preference to "lower_monthly" for high financial capacity');
        expense_preference = 'lower_monthly';
      }
      
      // Further adjust expense_preference based on risk_preference
      if (submissionData.risk_preference === 'lower_risk' && expense_preference !== 'higher_monthly') {
        console.log('Adjusting expense_preference to "higher_monthly" for lower_risk preference');
        expense_preference = 'higher_monthly';
      } else if (submissionData.risk_preference === 'higher_risk' && expense_preference !== 'lower_monthly') {
        console.log('Adjusting expense_preference to "lower_monthly" for higher_risk preference');
        expense_preference = 'lower_monthly';
      }
      
      // Create the base data object with required fields
      const finalData: Record<string, any> = {
        age: age,
        coverage_type: submissionData.coverage_type || 'just_me',
        iua_preference: iua_preference as '500' | '1000' | '2500' | '5000',
        pregnancy: submissionData.pregnancy || 'false',
        pre_existing: submissionData.pre_existing || 'false',
        state: submissionData.state || 'TX',
        zip_code: submissionData.zip_code,
        expense_preference: expense_preference,
        pregnancy_planning: submissionData.pregnancy_planning || 'no',
        visit_frequency: submissionData.visit_frequency || 'just_checkups'
      };
      
      // Add optional fields if they exist
      if (submissionData.financial_capacity) {
        finalData.financial_capacity = submissionData.financial_capacity;
      }
      
      if (submissionData.risk_preference) {
        finalData.risk_preference = submissionData.risk_preference;
      }
      
      if (submissionData.pre_existing_approach) {
        finalData.pre_existing_approach = submissionData.pre_existing_approach;
      }
      
      if (submissionData.preventative_services) {
        finalData.preventative_services = submissionData.preventative_services;
      }
      
      console.log("Final data before validation:", finalData);
      
      // Validate the entire form data
      console.log("Validating entire form data");
      const validationResult = formSchema.safeParse(finalData);
      
      console.log("Final validation result:", validationResult);
      
      if (validationResult.success) {
        console.log("Validation successful, proceeding with submission");
        
        // Save the response
        const response = await saveQuestionnaireResponse(validationResult.data as QuestionnaireResponse);
        console.log("Response saved successfully:", response);
        
        // Save to localStorage as well for redundancy
        localStorage.setItem('questionnaire-data', JSON.stringify({
          response: validationResult.data,
          timestamp: new Date().toISOString()
        }));
        
        // Redirect to email capture page instead of recommendations
        router.push('/questionnaire/email-capture');
      } else {
        console.error("Validation failed:", validationResult.error);
        setFormError("Please check your answers and try again.");
        toast({
          title: "Error",
          description: "Please check your answers and try again.",
          variant: "destructive"
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormError("An error occurred. Please try again.");
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  // Add a check for isSubmitting to show the loading state
  if (isSubmitting && formSubmitted && currentStep === questionnaireSections.length - 1) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <PlansLoader 
            totalPlans={22}
            onComplete={() => router.push('/recommendations')}
          />
        </div>
      </div>
    );
  }

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
        totalPages={questionnaireSections.length}
        steps={[
          { label: 'Basic Info' },
          { label: 'Health Status' },
          { label: 'Preferences' }
        ]}
      />
      
      <div className="questionnaire-card">
        <h1 className="questionnaire-step-title">{questionnaireSections[currentStep].title}</h1>
        <p className="questionnaire-step-description">
          {questionnaireSections[currentStep].description}
        </p>
        
        <form onSubmit={handleNextClick} className="space-y-6">
          {/* Form fields with animation */}
          <div className="space-y-12 transition-all duration-300">
            {getCurrentStepFields().map(fieldName => 
              renderFormField(fieldName as keyof FormValues, form)
            )}
            
            {/* Honeypot field - invisible to humans, but bots might fill it */}
            <div 
              aria-hidden="true" 
              style={{ 
                position: 'absolute', 
                left: '-9999px', 
                height: '1px', 
                width: '1px', 
                overflow: 'hidden' 
              }}
            >
              <label htmlFor="website">Website (leave this empty)</label>
              <input
                type="text"
                id="website"
                name="website"
                autoComplete="off"
                tabIndex={-1} 
                value={honeypotValue}
                onChange={(e) => setHoneypotValue(e.target.value)}
              />
            </div>
            
            {/* Error message */}
            {formError && (
              <div className="text-red-500 text-center mt-4">{formError}</div>
            )}
            
            {/* Navigation buttons */}
            <div className="flex justify-end items-center">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-primary transition-colors mr-auto"
                >
                  <span className="mr-1">←</span> Back
                </button>
              )}
              
              {currentStep < questionnaireSections.length - 1 ? (
                <button
                  type="submit"
                  className="btn-primary px-8"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn-primary px-8"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Continue'}
                </button>
              )}
            </div>
          </div>
        </form>
        
        <div className="mt-8">
          <TrustBadges />
          <div className="text-xs text-center text-gray-500 mt-4">
            Your privacy is important to us. See our <a href="/privacy" className="underline hover:text-gray-700">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
} 