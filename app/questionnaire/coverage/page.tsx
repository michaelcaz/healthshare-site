'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ProgressIndicator } from '@/components/questionnaire/progress-indicator';
import { useState } from 'react';
import { InfoIcon } from 'lucide-react';

const coverageSchema = z.object({
  expense_preference: z.enum(['lower_monthly', 'higher_monthly']).optional().refine(val => val !== undefined, {
    message: "Please answer this question to continue"
  }),
  annual_healthcare_spend: z.enum(['less_1000', '1000_5000', 'more_5000']).optional().refine(val => val !== undefined, {
    message: "Please answer this question to continue"
  })
});

type CoverageData = z.infer<typeof coverageSchema>;

const steps = [
  { label: 'Basic Info', route: '/questionnaire' },
  { label: 'Savings', route: '/questionnaire/savings' },
  { label: 'Health Status', route: '/questionnaire/health' },
  { label: 'Coverage Needs', route: '/questionnaire/coverage' }
];

export default function CoveragePage() {
  const router = useRouter();
  const [showExpenseInfo, setShowExpenseInfo] = useState(false);
  
  const form = useForm<CoverageData>({
    resolver: zodResolver(coverageSchema),
    defaultValues: {
      expense_preference: undefined,
      annual_healthcare_spend: undefined
    }
  });

  const onSubmit = async (data: CoverageData) => {
    try {
      const existingData = localStorage.getItem('questionnaire-data');
      const questionnaireData = existingData ? JSON.parse(existingData) : {};
      questionnaireData.coverage = data;
      localStorage.setItem('questionnaire-data', JSON.stringify(questionnaireData));
      await router.push('/recommendations');
      router.refresh();
    } catch (error) {
      console.error('Error submitting form:', error);
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
          "bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm",
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
                  {...form.register('annual_healthcare_spend')}
                  className={cn(
                    "w-full p-3 rounded-lg",
                    "border border-gray-200",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500",
                    "transition duration-200",
                    "text-gray-900"
                  )}
                >
                  <option value="" className="text-gray-500">Select an option</option>
                  <option value="less_1000">Less than $1,000</option>
                  <option value="1000_5000">$1,000 - $5,000</option>
                  <option value="more_5000">More than $5,000</option>
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