'use client'

import { useSelectedPlans } from './SelectedPlansContext'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart2, X, ChevronRight, Check } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function ComparisonBanner() {
  const { selectedPlans, removePlan, openComparisonModal, canAddMore } = useSelectedPlans()
  const [isExpanded, setIsExpanded] = useState(false)
  
  // Debug log
  console.log('[ComparisonBanner] Rendered. selectedPlans.length:', selectedPlans.length)
  // Only show the banner if there are selected plans
  if (selectedPlans.length === 0) {
    return null
  }
  
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed bottom-0 left-0 right-0 z-50 bg-primary text-white border-t border-primary/80 shadow-lg"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white/20 text-white p-2 rounded-full mr-3">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <span className="font-medium text-white">
                  {selectedPlans.length} Plan{selectedPlans.length !== 1 ? 's' : ''} Selected
                </span>
                {selectedPlans.length > 0 && (
                  <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="ml-3 text-sm text-white/80 hover:text-white hover:underline"
                  >
                    {isExpanded ? 'Hide details' : 'Show details'}
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button 
                onClick={openComparisonModal}
                className="bg-amber-500 hover:bg-amber-600 text-white px-6 flex items-center"
                size="lg"
              >
                Compare Plans <ChevronRight className="ml-1 h-4 w-4 inline-block" />
              </Button>
            </div>
          </div>
          
          {/* Expandable plan details */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 pb-1 space-y-3">
                  {selectedPlans.map((plan) => (
                    <div 
                      key={plan.plan.id} 
                      className="flex items-center justify-between bg-white/10 p-4 rounded-lg border border-white/20"
                    >
                      <div>
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center border border-white/30 mr-3">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-white">{plan.plan.planName}</p>
                            <p className="text-sm text-white/80">{plan.plan.providerName}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm text-white/80">Monthly Premium</p>
                          <p className="font-semibold text-lg text-white">
                            ${plan.plan.planMatrix[0]?.costs[0]?.monthlyPremium || 0}
                          </p>
                        </div>
                        <button
                          onClick={() => removePlan(plan.plan.id)}
                          className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                          aria-label={`Remove ${plan.plan.planName} from comparison`}
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  )
} 