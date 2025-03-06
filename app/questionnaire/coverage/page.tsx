'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ProgressIndicator } from '@/components/questionnaire/progress-indicator';
import { useState } from 'react';
import { InfoIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { QuestionnaireResponse } from '@/types/questionnaire';
import { QuestionnaireData } from '@/lib/types';
import { saveQuestionnaireResponse } from '@/lib/actions/questionnaire';

const formSchema = z.object({
  expense_preference: z.enum(['lower_monthly', 'higher_monthly']).optional().refine(val => val !== undefined, {
    message: 'Please select your expense preference'
  }),
  iua_preference: z.enum(['1000', '2500', '5000']).optional().refine(val => val !== undefined, {
    message: 'Please select your IUA preference'
  })
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  { label: 'Basic Info', route: '/questionnaire' },
  { label: 'Savings', route: '/questionnaire/savings' },
  { label: 'Health Status', route: '/questionnaire/health' },
  { label: 'Coverage Needs', route: '/questionnaire/coverage' }
];

// Add type for the server action response
interface SaveResponse {
  success: boolean;
  error?: string;
  details?: any;
}

export default function CoveragePage() {
  const router = useRouter();
  const [showExpenseInfo, setShowExpenseInfo] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expense_preference: undefined,
      iua_preference: undefined
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      // 1. Get and validate basic info
      const existingData = localStorage.getItem('questionnaire-basic-info');
      console.log('Basic Info Data:', existingData);
      
      if (!existingData) {
        throw new Error('Please complete the basic information first');
      }
      
      const basicInfo = JSON.parse(existingData);
      console.log('Parsed Basic Info:', basicInfo);
      
      // 2. Get and validate health data
      const healthData = localStorage.getItem('questionnaire-data');
      console.log('Health Data:', healthData);
      
      let parsedHealthData = null;
      if (healthData) {
        parsedHealthData = JSON.parse(healthData);
        console.log('Parsed Health Data:', parsedHealthData);
      }
      
      // 3. Validate required basic info fields
      if (!basicInfo.zipCode) {
        throw new Error('Please provide your zip code in the basic information');
      }
      
      if (!basicInfo.oldestAge) {
        throw new Error('Please provide your age in the basic information');
      }
      
      if (!basicInfo.coverage_type) {
        throw new Error('Please select who needs coverage in the basic information');
      }
      
      // 4. Build response object with explicit type checking
      const response: QuestionnaireResponse = {
        age: parseInt(basicInfo.oldestAge),
        coverage_type: basicInfo.coverage_type,
        zip_code: basicInfo.zipCode,
        iua_preference: data.iua_preference || '1000',
        pregnancy: 'false' as const,
        pre_existing: 'false' as const,
        state: '',
        expense_preference: data.expense_preference || 'lower_monthly',
        pregnancy_planning: 'no',
        medical_conditions: [],
        visit_frequency: 'just_checkups'
      };

      // 5. Update with health data if available
      if (parsedHealthData?.health) {
        response.pregnancy = parsedHealthData.health.currentlyPregnant === 'yes' ? 'true' : 'false';
        response.pre_existing = parsedHealthData.health.preExistingConditions === 'yes' ? 'true' : 'false';
        response.pregnancy_planning = parsedHealthData.health.planningPregnancy as 'yes' | 'no' | 'maybe' || 'no';
      }

      // 6. Save to localStorage for recovery
      localStorage.setItem('questionnaire-data', JSON.stringify({
        ...parsedHealthData,
        coverage: data,
        response
      }));

      // 7. Save using server action
      const result = await saveQuestionnaireResponse(response);
      console.log('Save Result:', result);
      
      if (!result.success) {
        console.error('Validation Errors:', result.details);
        throw new Error(result.error || 'Failed to save questionnaire response');
      }
      
      // 8. Only redirect on success
      router.push('/recommendations');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save your responses. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <section className="relative py-24" style={{ background: 'var(--color-cream-bg)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProgressIndicator 
          currentPage={4}
          totalPages={4}
          steps={steps}
        />

        <div className={cn(
          "bg-white backdrop-blur-sm rounded-2xl p-8 shadow-sm",
          "transition-all duration-200"
        )}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-gray-800 font-medium mb-2">
                  How do you prefer to handle large medical expenses?
                </label>
                <select
                  {...form.register('expense_preference')}
                  className={cn(
                    "w-full p-3 rounded-lg",
                    "border border-gray-200",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500",
                    "transition duration-200",
                    "text-gray-900"
                  )}
                >
                  <option value="" className="text-gray-500">Select an option</option>
                  <option value="lower_monthly">Lower monthly costs, but I'll cover small medical costs myself</option>
                  <option value="higher_monthly">Higher monthly costs for more protection on big expenses</option>
                </select>
              </div>
              {showExpenseInfo && (
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  Small medical costs typically include routine doctor visits, basic prescriptions, and preventive care.
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-gray-800 font-medium mb-2">
                  What is your typical annual healthcare spending?
                </label>
                <select
                  {...form.register('iua_preference')}
                  className={cn(
                    "w-full p-3 rounded-lg",
                    "border border-gray-200",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500",
                    "transition duration-200",
                    "text-gray-900"
                  )}
                >
                  <option value="" className="text-gray-500">Select an option</option>
                  <option value="1000">Less than $1,000</option>
                  <option value="2500">$1,000 - $2,500</option>
                  <option value="5000">More than $5,000</option>
                </select>
              </div>
            </div>

            {Object.keys(form.formState.errors).length > 0 && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                <p className="text-red-600 text-sm text-center">
                  Please answer all required questions before continuing.
                </p>
              </div>
            )}

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={() => router.push('/questionnaire/health')}
                className={cn(
                  "px-6 py-2 rounded-full",
                  "border border-gray-300 text-gray-600",
                  "hover:bg-gray-50",
                  "transition-colors duration-200"
                )}
              >
                Back
              </button>
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