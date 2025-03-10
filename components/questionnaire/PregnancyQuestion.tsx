import React, { useState } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { PregnancyQuestionAlert } from './PregnancyQuestionAlert';

interface PregnancyQuestionProps {
  form: UseFormReturn<any>;
  fieldName: string;
}

export function PregnancyQuestion({ form, fieldName }: PregnancyQuestionProps) {
  const [showAlert, setShowAlert] = useState(false);
  
  return (
    <>
      <FormField
        control={form.control}
        name={fieldName}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-lg font-medium text-gray-900 mb-2">
              Are you currently pregnant?
            </FormLabel>
            <FormControl>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className={cn(
                    "flex flex-col items-center justify-center p-4 border rounded-lg transition-colors",
                    field.value === 'false' 
                      ? "border-primary bg-primary/10 text-primary" 
                      : "border-gray-200 hover:border-gray-300"
                  )}
                  onClick={() => {
                    field.onChange('false');
                    setShowAlert(false);
                  }}
                >
                  <span className="text-lg font-medium">No</span>
                </button>
                <button
                  type="button"
                  className={cn(
                    "flex flex-col items-center justify-center p-4 border rounded-lg transition-colors",
                    field.value === 'true' 
                      ? "border-primary bg-primary/10 text-primary" 
                      : "border-gray-200 hover:border-gray-300"
                  )}
                  onClick={() => {
                    field.onChange('true');
                    setShowAlert(true);
                  }}
                >
                  <span className="text-lg font-medium">Yes</span>
                </button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {showAlert && <PregnancyQuestionAlert isVisible={true} />}
    </>
  );
} 