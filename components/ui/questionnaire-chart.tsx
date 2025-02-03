'use client'

import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { date: '2024-01-01', completions: 4 },
  { date: '2024-01-02', completions: 3 },
  { date: '2024-01-03', completions: 7 },
  { date: '2024-01-04', completions: 5 },
  { date: '2024-01-05', completions: 8 },
  { date: '2024-01-06', completions: 6 },
  { date: '2024-01-07', completions: 9 },
]

interface DateRangeProps {
  value: string
  onChange: (value: string) => void
}

function DateRangeSelector({ value, onChange }: DateRangeProps) {
  return (
    <select 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    >
      <option value="7">Last 7 days</option>
      <option value="30">Last 30 days</option>
      <option value="90">Last 90 days</option>
    </select>
  )
}

export function QuestionnaireChart() {
  const [dateRange, setDateRange] = useState('7')
  const [error, setError] = useState<string | null>(null)

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">Error loading chart: {error}</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4">
        <DateRangeSelector value={dateRange} onChange={setDateRange} />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(date) => new Date(date).toLocaleDateString()}
          />
          <YAxis />
          <Tooltip 
            labelFormatter={(date) => new Date(date).toLocaleDateString()}
          />
          <Area 
            type="monotone" 
            dataKey="completions" 
            stroke="#4F46E5" 
            fill="#E0E7FF" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
