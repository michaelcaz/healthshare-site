'use client'

import { useSelectedPlans } from './SelectedPlansContext'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, BarChart2 } from 'lucide-react'

export function FloatingCompareButton() {
  const { selectedPlans, openComparisonModal } = useSelectedPlans()
  
  // Only show the button if there are selected plans
  if (selectedPlans.length === 0) {
    return null
  }
  
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <Button 
          onClick={openComparisonModal}
          size="lg" 
          className="shadow-lg bg-primary hover:bg-primary/90 text-white font-medium px-6 py-6 rounded-full"
        >
          <BarChart2 className="mr-2 h-5 w-5" />
          Compare {selectedPlans.length} Plan{selectedPlans.length !== 1 ? 's' : ''}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
    </AnimatePresence>
  )
} 