'use client'

import { type PlanRecommendation } from './types'
import { CostBreakdown } from './CostBreakdown'
import { MedicalServices } from './MedicalServices'
import { CoverageTimeline } from './CoverageTimeline'
import { PlanDetails } from './PlanDetails'
import { X, Star } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface PlanDetailsModalProps {
  plan: PlanRecommendation
  isOpen: boolean
  onClose: () => void
}

export function PlanDetailsModal({ plan, isOpen, onClose }: PlanDetailsModalProps) {
  const [activeTab, setActiveTab] = useState('costs')
  
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-50 w-full max-w-4xl bg-white rounded-lg shadow-xl">
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">{plan.plan.planName}</h2>
            <div className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-full">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-medium">{Math.round(plan.score)}% Match</span>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex border-b px-6">
          {[
            { id: 'costs', label: 'Costs & Coverage' },
            { id: 'medical', label: 'Medical Services' },
            { id: 'timeline', label: 'Coverage Timeline' },
            { id: 'details', label: 'Plan Details' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-4 py-2 font-medium',
                activeTab === tab.id 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="p-6">
          {activeTab === 'costs' && <CostBreakdown plan={plan} />}
          {activeTab === 'medical' && <MedicalServices plan={plan} />}
          {activeTab === 'timeline' && <CoverageTimeline plan={plan} />}
          {activeTab === 'details' && <PlanDetails plan={plan} />}
        </div>
      </div>
    </div>
  )
} 