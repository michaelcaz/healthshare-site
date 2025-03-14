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

  const navigateToComparison = () => {
    if (selectedPlans.length > 0) {
      // Store selected plans in localStorage for the comparison page
      localStorage.setItem('selected-plans', JSON.stringify(selectedPlans))
      
      // Get the questionnaire data from localStorage
      const questionnaire = localStorage.getItem('questionnaire-data');
      let visitFrequency = 'just_checkups';
      let coverageType = 'just_me';
      let age = '34'; // Default age
      let iua = '5000'; // Default IUA
      
      if (questionnaire) {
        try {
          const parsedQuestionnaire = JSON.parse(questionnaire);
          
          // Extract questionnaire response data
          const responseData = parsedQuestionnaire.response || parsedQuestionnaire;
          
          visitFrequency = responseData.visit_frequency || 'just_checkups';
          coverageType = responseData.coverage_type || 'just_me';
          age = responseData.age?.toString() || '34';
          iua = responseData.iua_preference || '5000';
          
          console.log('Questionnaire data for comparison:', {
            visitFrequency,
            coverageType,
            age,
            iua
          });
        } catch (error) {
          console.error('Error parsing questionnaire data:', error);
        }
      }
      
      // Navigate to the comparison page with all necessary query parameters
      router.push(`/plans/comparison?visitFrequency=${visitFrequency}&coverageType=${coverageType}&age=${age}&iua=${iua}`)
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