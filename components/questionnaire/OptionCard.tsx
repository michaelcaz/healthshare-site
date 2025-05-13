'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { InfoIcon } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';

interface OptionCardProps {
  id: string;
  name: string;
  value: string;
  label: string;
  description?: string;
  isSelected: boolean;
  onChange: (value: string) => void;
  tooltipText?: string;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  id,
  name,
  value,
  label,
  description,
  isSelected,
  onChange,
  tooltipText
}) => {
  return (
    <label 
      htmlFor={id}
      className={cn(
        "option-card",
        isSelected && "selected"
      )}
    >
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={isSelected}
        onChange={() => onChange(value)}
      />
      <div className="option-card-radio"></div>
      <div className="option-card-content">
        <div className="option-card-label">{label}</div>
        {description && (
          <div className="option-card-description">{description}</div>
        )}
      </div>
    </label>
  );
};

interface OptionCardGroupProps {
  name: string;
  options: Array<{
    value: string;
    label: string;
    description?: string;
    tooltipText?: string;
  }>;
  value: string;
  onChange: (value: string) => void;
  layout?: 'vertical' | 'grid';
}

export const OptionCardGroup: React.FC<OptionCardGroupProps> = ({
  name,
  options,
  value,
  onChange,
  layout = 'vertical'
}) => {
  return (
    <div className={layout === 'grid' ? 'option-card-grid' : 'space-y-3'}>
      {options.map((option) => (
        <OptionCard
          key={option.value}
          id={`${name}-${option.value}`}
          name={name}
          value={option.value}
          label={option.label}
          description={option.description}
          isSelected={value === option.value}
          onChange={onChange}
          tooltipText={option.tooltipText}
        />
      ))}
    </div>
  );
}; 