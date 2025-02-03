'use client'

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Basic Plan', recommendations: 120 },
  { name: 'Family Plan', recommendations: 98 },
  { name: 'Premium Plan', recommendations: 86 },
  { name: 'Senior Plan', recommendations: 75 },
  { name: 'Student Plan', recommendations: 65 },
]

interface FilterProps {
  value: string
  onChange: (value: string) => void
}

function PlanFilter({ value, onChange }: FilterProps) {
  return (
    <select 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    >
      <option value="all">All Plans</option>
      <option value="active">Active Plans</option>
      <option value="inactive">Inactive Plans</option>
    </select>
  )
}

export function PlanRecommendationsChart() {
  const [filter, setFilter] = useState('all')
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
        <PlanFilter value={filter} onChange={setFilter} />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="recommendations" fill="#4F46E5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
