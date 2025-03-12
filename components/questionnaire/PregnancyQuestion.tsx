import React, { useState } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { PregnancyQuestionAlert } from './PregnancyQuestionAlert';
import { OptionCardGroup } from './OptionCard';

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
              <OptionCardGroup
                name={fieldName}
                options={[
                  { value: 'false', label: 'No' },
                  { value: 'true', label: 'Yes' }
                ]}
                value={field.value || ''}
                onChange={(value) => {
                  field.onChange(value);
                  setShowAlert(value === 'true');
                }}
                layout="grid"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {showAlert && <PregnancyQuestionAlert isVisible={true} />}
    </>
  );
} 