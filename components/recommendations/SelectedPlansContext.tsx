'use client'

import { createContext, useContext, useState } from 'react'
import { type PlanRecommendation } from './types'
import { useRouter } from 'next/navigation'

interface SelectedPlansContextType {
  selectedPlans: PlanRecommendation[]
  togglePlanSelection: (plan: PlanRecommendation) => void
  removePlan: (planId: string) => void
  canAddMore: boolean
  navigateToComparison: () => void
}

const SelectedPlansContext = createContext<SelectedPlansContextType | undefined>(undefined)

export function SelectedPlansProvider({ children, maxPlans = 3 }: { 
  children: React.ReactNode
  maxPlans?: number 
}) {
  const [selectedPlans, setSelectedPlans] = useState<PlanRecommendation[]>([])
  const router = useRouter()

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

  const navigateToComparison = () => {
    if (selectedPlans.length > 0) {
      // Store selected plans in localStorage for the comparison page
      localStorage.setItem('selected-plans', JSON.stringify(selectedPlans))
      
      // Get the questionnaire data from localStorage
      const questionnaire = localStorage.getItem('questionnaire-data');
      let visitFrequency = 'just_checkups';
      let coverageType = 'just_me';
      
      if (questionnaire) {
        try {
          const parsedQuestionnaire = JSON.parse(questionnaire);
          visitFrequency = parsedQuestionnaire.visit_frequency || 'just_checkups';
          coverageType = parsedQuestionnaire.coverage_type || 'just_me';
        } catch (error) {
          console.error('Error parsing questionnaire data:', error);
        }
      }
      
      // Navigate to the comparison page with query parameters
      router.push(`/plans/comparison?visitFrequency=${visitFrequency}&coverageType=${coverageType}`)
    }
  }

  return (
    <SelectedPlansContext.Provider value={{
      selectedPlans,
      togglePlanSelection,
      removePlan,
      canAddMore: selectedPlans.length < maxPlans,
      navigateToComparison
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