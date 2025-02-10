'use client'

import { createContext, useContext, useState } from 'react'
import { type PlanRecommendation } from './types'

interface SelectedPlansContextType {
  selectedPlans: PlanRecommendation[]
  togglePlanSelection: (plan: PlanRecommendation) => void
  removePlan: (planId: string) => void
  canAddMore: boolean
}

const SelectedPlansContext = createContext<SelectedPlansContextType | undefined>(undefined)

export function SelectedPlansProvider({ children, maxPlans = 3 }: { 
  children: React.ReactNode
  maxPlans?: number 
}) {
  const [selectedPlans, setSelectedPlans] = useState<PlanRecommendation[]>([])

  const togglePlanSelection = (plan: PlanRecommendation) => {
    setSelectedPlans(current => {
      const isSelected = current.some(p => p.plan.id === plan.plan.id)
      
      if (isSelected) {
        return current.filter(p => p.plan.id !== plan.plan.id)
      }
      
      if (current.length >= maxPlans) {
        return current
      }
      
      return [...current, plan]
    })
  }

  const removePlan = (planId: string) => {
    setSelectedPlans(current => current.filter(p => p.plan.id !== planId))
  }

  return (
    <SelectedPlansContext.Provider value={{
      selectedPlans,
      togglePlanSelection,
      removePlan,
      canAddMore: selectedPlans.length < maxPlans
    }}>
      {children}
    </SelectedPlansContext.Provider>
  )
}

export function useSelectedPlans() {
  const context = useContext(SelectedPlansContext)
  if (!context) {
    throw new Error('useSelectedPlans must be used within a SelectedPlansProvider')
  }
  return context
} 