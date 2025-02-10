'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ProgressIndicator } from '@/components/questionnaire/progress-indicator';
import { useState } from 'react';
import { InfoIcon } from 'lucide-react';

const preferencesSchema = z.object({
  lifestyle_preference: z.enum(['traditional', 'alternative', 'both']).optional().refine(val => val !== undefined, {
    message: "Please answer this question to continue"
  }),
  price_importance: z.enum(['most_important', 'very_important', 'somewhat_important']).optional().refine(val => val !== undefined, {
    message: "Please answer this question to continue"
  }),
  doctor_preference: z.enum(['keep_current', 'willing_to_switch', 'no_regular_doctor']).optional().refine(val => val !== undefined, {
    message: "Please answer this question to continue"
  })
});

type PreferencesData = z.infer<typeof preferencesSchema>;

const steps = [
  { label: 'Basic Info', route: '/questionnaire' },
  { label: 'Savings', route: '/questionnaire/savings' },
  { label: 'Health Status', route: '/questionnaire/health' },
  { label: 'Coverage Needs', route: '/questionnaire/coverage' }
];

export default function PreferencesPage() {
  const router = useRouter();
  const [showLifestyleInfo, setShowLifestyleInfo] = useState(false);
  
  const form = useForm<PreferencesData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      lifestyle_preference: undefined,
      price_importance: undefined,
      doctor_preference: undefined
    }
  });

  const onSubmit = async (data: PreferencesData) => {
    try {
      const existingData = localStorage.getItem('questionnaire-data');
      const questionnaireData = existingData ? JSON.parse(existingData) : {};
      questionnaireData.preferences = data;
      localStorage.setItem('questionnaire-data', JSON.stringify(questionnaireData));
      router.push('/questionnaire/review');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <section className="relative py-24" style={{ background: 'var(--color-cream-bg)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProgressIndicator 
          currentPage={4}
          totalPages={steps.length}
          steps={steps}
        />

        <div className={cn(
          "bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm",
          "transition-all duration-200"
        )}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
              {/* Healthcare Style Preference */}
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <div className="flex-grow">
                    <label className="block text-gray-700 mb-2">
                      What type of healthcare do you prefer?
                    </label>
                    <select
                      {...form.register('lifestyle_preference')}
                      className={cn(
                        "w-full p-3 rounded-lg",
                        "border border-gray-200",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500",
                        "transition duration-200"
                      )}
                    >
                      <option value="">Select an option</option>
                      <option value="traditional">Traditional medical care (hospitals, standard physicians)</option>
                      <option value="alternative">Alternative care (naturopaths, chiropractors)</option>
                      <option value="both">Both traditional and alternative care</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowLifestyleInfo(!showLifestyleInfo)}
                    className="text-gray-400 hover:text-gray-600 mt-2"
                  >
                    <InfoIcon className="w-5 h-5" />
                  </button>
                </div>
                {showLifestyleInfo && (
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    Some health sharing ministries have different levels of coverage for alternative care providers.
                  </div>
                )}
              </div>

              {/* Price Importance */}
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <div className="flex-grow">
                    <label className="block text-gray-700 mb-2">
                      How important is price in your decision?
                    </label>
                    <select
                      {...form.register('price_importance')}
                      className={cn(
                        "w-full p-3 rounded-lg",
                        "border border-gray-200",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500",
                        "transition duration-200"
                      )}
                    >
                      <option value="">Select an option</option>
                      <option value="most_important">Most important factor</option>
                      <option value="very_important">Very important, but not the only factor</option>
                      <option value="somewhat_important">Somewhat important</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Doctor Preference */}
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <div className="flex-grow">
                    <label className="block text-gray-700 mb-2">
                      What's your preference regarding doctors?
                    </label>
                    <select
                      {...form.register('doctor_preference')}
                      className={cn(
                        "w-full p-3 rounded-lg",
                        "border border-gray-200",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500",
                        "transition duration-200"
                      )}
                    >
                      <option value="">Select an option</option>
                      <option value="keep_current">I want to keep my current doctors</option>
                      <option value="willing_to_switch">I'm willing to switch doctors</option>
                      <option value="no_regular_doctor">I don't have regular doctors</option>
                    </select>
                  </div>
                </div>
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
                onClick={() => router.push('/questionnaire/coverage')}
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