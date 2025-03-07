'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { InfoIcon, Plus, Minus } from 'lucide-react';

interface NumberInputProps {
  id: string;
  name: string;
  value: string | number;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  placeholder?: string;
  helperText?: string;
  tooltipText?: string;
  error?: string;
  isValid?: boolean;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  id,
  name,
  value,
  onChange,
  min = 0,
  max = 999,
  step = 1,
  label,
  placeholder,
  helperText,
  tooltipText,
  error,
  isValid
}) => {
  const [inputValue, setInputValue] = useState<string>(value?.toString() || '');

  useEffect(() => {
    setInputValue(value?.toString() || '');
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  const handleIncrement = () => {
    const currentValue = parseInt(inputValue) || 0;
    if (currentValue < max) {
      const newValue = (currentValue + step).toString();
      setInputValue(newValue);
      onChange(newValue);
    }
  };

  const handleDecrement = () => {
    const currentValue = parseInt(inputValue) || 0;
    if (currentValue > min) {
      const newValue = (currentValue - step).toString();
      setInputValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center">
          <label htmlFor={id} className="question-text">
            {label}
          </label>
          {tooltipText && (
            <div className="tooltip">
              <InfoIcon className="tooltip-icon" />
              <div className="tooltip-content">{tooltipText}</div>
            </div>
          )}
        </div>
      )}
      <div className="number-input-container">
        <button 
          type="button"
          className="number-control number-decrement touch-target"
          onClick={handleDecrement}
          tabIndex={-1}
          aria-label="Decrease value"
        >
          <Minus size={16} />
        </button>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          id={id}
          name={name}
          value={inputValue}
          onChange={handleChange}
          min={min}
          max={max}
          placeholder={placeholder}
          style={{ textAlign: 'center' }}
          className={cn(
            "number-input",
            error && "input-error",
            isValid && !error && "input-success"
          )}
        />
        <button 
          type="button"
          className="number-control number-increment touch-target"
          onClick={handleIncrement}
          tabIndex={-1}
          aria-label="Increase value"
        >
          <Plus size={16} />
        </button>
      </div>
      {helperText && !error && (
        <div className="helper-message">{helperText}</div>
      )}
      {error && (
        <div className="error-message">{error}</div>
      )}
    </div>
  );
}; 