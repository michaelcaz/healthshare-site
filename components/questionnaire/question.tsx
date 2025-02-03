'use client'

import { useState } from 'react'
import { Question as QuestionType } from '@/types/questionnaire'
import { cn } from '@/lib/utils'

interface QuestionProps {
  question: QuestionType
  value: any
  onChange: (value: any) => void
  error?: string
  className?: string
}

export function Question({ question, value, onChange, error, className }: QuestionProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newValue = question.type === 'number' 
      ? Number(e.target.value)
      : e.target.value
    onChange(newValue)
  }

  const handleBooleanChange = (value: boolean) => {
    onChange(value)
  }

  if (question.type === 'boolean') {
    return (
      <div className={cn('space-y-2', className)}>
        <label className="block text-sm font-medium text-gray-700">{question.text}</label>
        <div className="space-x-4">
          <button
            type="button"
            onClick={() => handleBooleanChange(true)}
            className={cn(
              'px-4 py-2 rounded-md',
              value === true ? 'bg-indigo-600 text-white' : 'bg-gray-100'
            )}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => handleBooleanChange(false)}
            className={cn(
              'px-4 py-2 rounded-md',
              value === false ? 'bg-indigo-600 text-white' : 'bg-gray-100'
            )}
          >
            No
          </button>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    )
  }

  return (
    <div className={cn('space-y-2', className)}>
      <label className="block text-sm font-medium text-gray-700">{question.text}</label>
      {question.type === 'select' && question.options ? (
        <select
          value={value || ''}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select an option</option>
          {question.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={question.type === 'number' ? 'number' : 'text'}
          value={value || ''}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
} 