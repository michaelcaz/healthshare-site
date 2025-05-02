'use client'

import { createContext, useContext, useState } from 'react'
import { type PlanRecommendation } from './types'
import { useRouter } from 'next/navigation'

interface SelectedPlansContextType {
  selectedPlans: PlanRecommendation[]
  togglePlanSelection: (plan: PlanRecommendation) => void
  removePlan: (planId: string) => void
  canAddMore: boolean
  isComparisonModalOpen: boolean
  openComparisonModal: () => void
  closeComparisonModal: () => void
  navigateToComparison: () => void
}

const SelectedPlansContext = createContext<SelectedPlansContextType | undefined>(undefined)

export function SelectedPlansProvider({ children, maxPlans = 3 }: { 
  children: React.ReactNode
  maxPlans?: number 
}) {
  const [selectedPlans, setSelectedPlans] = useState<PlanRecommendation[]>([])
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false)
  const router = useRouter()

  const togglePlanSelection = (plan: PlanRecommendation) => {
    // Get the questionnaire data to ensure we're using the correct parameters
    const questionnaire = localStorage.getItem('questionnaire-data');
    let questionnaireData = null;
    
    if (questionnaire) {
      try {
        const parsedQuestionnaire = JSON.parse(questionnaire);
        questionnaireData = parsedQuestionnaire.response || parsedQuestionnaire;
      } catch (error) {
        console.error('Error parsing questionnaire data in togglePlanSelection:', error);
      }
    }
    
    setSelectedPlans(current => {
      const isSelected = current.some(p => p.plan.id === plan.plan.id)
      
      if (isSelected) {
        return current.filter(p => p.plan.id !== plan.plan.id)
      }
      
      if (current.length >= maxPlans) {
        return current
      }
      
      // Create a new plan object with the questionnaire data attached
      // This ensures the plan data is complete when stored in localStorage
      const enhancedPlan = {
        ...plan,
        questionnaire: questionnaireData
      };
      
      console.log('Adding plan with questionnaire data:', enhancedPlan);
      
      return [...current, enhancedPlan]
    })
  }

  const removePlan = (planId: string) => {
    setSelectedPlans(current => current.filter(p => p.plan.id !== planId))
  }

  const openComparisonModal = () => {
    if (selectedPlans.length > 0) {
      // Store selected plans in localStorage for the comparison component
      localStorage.setItem('selected-plans', JSON.stringify(selectedPlans))
      setIsComparisonModalOpen(true)
    }
  }

  const closeComparisonModal = () => {
    setIsComparisonModalOpen(false)
  }

  const navigateToComparison = () => {
    if (selectedPlans.length > 0) {
      // Store selected plans in localStorage for the comparison page
      localStorage.setItem('selected-plans', JSON.stringify(selectedPlans))
      
      // Check if we have the questionnaire data to build parameters
      let url = '/plans/comparison';
      const questionnaire = localStorage.getItem('questionnaire-data');
      
      if (questionnaire) {
        try {
          const parsedQuestionnaire = JSON.parse(questionnaire);
          const data = parsedQuestionnaire.response || parsedQuestionnaire;
          
          // Build query parameters based on questionnaire data
          const params = new URLSearchParams();
          
          if (data.age) params.append('age', String(data.age));
          if (data.coverage_type) params.append('coverageType', data.coverage_type);
          if (data.visit_frequency) params.append('visitFrequency', data.visit_frequency);
          if (data.iua_preference) params.append('iua', data.iua_preference);
          
          // Add the parameters to the URL
          if (params.toString()) {
            url = `${url}?${params.toString()}`;
          }
        } catch (error) {
          console.error('Error parsing questionnaire data for navigation:', error);
        }
      }
      
      // Navigate to the comparison page
      router.push(url);
    }
  }

  return (
    <SelectedPlansContext.Provider value={{
      selectedPlans,
      togglePlanSelection,
      removePlan,
      canAddMore: selectedPlans.length < maxPlans,
      isComparisonModalOpen,
      openComparisonModal,
      closeComparisonModal,
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