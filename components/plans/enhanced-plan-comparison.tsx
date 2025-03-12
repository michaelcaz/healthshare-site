'use client'

import { useState } from 'react'
import { PlanRecommendation } from '@/lib/recommendation/recommendations'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChevronDown, ChevronUp, Check, X, Info, DollarSign, Shield, Calendar, Heart, Activity, Users } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface EnhancedPlanComparisonProps {
  plans: PlanRecommendation[]
}

// Helper function to format currency
function formatCurrency(amount: number | string): string {
  if (typeof amount === 'string') {
    // Try to parse the string as a number if it looks like one
    if (/^\d+(\.\d+)?$/.test(amount)) {
      amount = parseFloat(amount)
    } else {
      return amount
    }
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// Helper function to get representative costs for a plan
function getRepresentativeCosts(plan: PlanRecommendation) {
  // Try to find costs for a 30-39 year old individual with a mid-tier IUA
  const costs = plan.plan.planMatrix
    .find(matrix => matrix.ageBracket === '30-39' && matrix.householdType === 'Member Only')
    ?.costs.find(cost => cost.initialUnsharedAmount === 2500)
  
  // Fallback to the first cost option if the specific one isn't found
  const fallbackCosts = plan.plan.planMatrix[0]?.costs[0]
  
  return costs || fallbackCosts || { 
    monthlyPremium: 0, 
    initialUnsharedAmount: 0 
  }
}

// Helper function to safely access plan properties
function getPlanProperty(plan: PlanRecommendation, key: string): string | boolean | number | undefined {
  return plan.plan[key as keyof typeof plan.plan] || 
         (plan as any)[key] || 
         (plan.plan as any)[key]
}

// Helper function to format currency that handles boolean values
function formatCurrencyValue(value: string | number | boolean | undefined): string {
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No'
  }
  if (value === undefined) {
    return 'Not specified'
  }
  if (typeof value === 'number') {
    return formatCurrency(value)
  }
  return value
}

export function EnhancedPlanComparison({ plans }: EnhancedPlanComparisonProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedSections, setExpandedSections] = useState<string[]>(['costs', 'coverage'])
  
  const toggleSection = (section: string) => {
    setExpandedSections(current => 
      current.includes(section) 
        ? current.filter(s => s !== section) 
        : [...current, section]
    )
  }
  
  const isSectionExpanded = (section: string) => expandedSections.includes(section)
  
  // Define comparison categories
  const comparisonCategories = [
    {
      id: 'costs',
      title: 'Costs & Pricing',
      icon: <DollarSign className="h-5 w-5" />,
      items: [
        { 
          label: 'Monthly Premium',
          tooltip: 'The monthly amount you pay to maintain your membership',
          getValue: (plan: PlanRecommendation) => formatCurrency(getRepresentativeCosts(plan).monthlyPremium)
        },
        { 
          label: 'Initial Unshared Amount (IUA)',
          tooltip: 'Similar to a deductible - the amount you pay before sharing begins',
          getValue: (plan: PlanRecommendation) => formatCurrency(getRepresentativeCosts(plan).initialUnsharedAmount)
        },
        { 
          label: 'Annual Cost Estimate',
          tooltip: 'Estimated annual cost including monthly premiums',
          getValue: (plan: PlanRecommendation) => formatCurrency(getRepresentativeCosts(plan).monthlyPremium * 12)
        },
        { 
          label: 'Application Fee',
          tooltip: 'One-time fee to join the healthshare',
          getValue: (plan: PlanRecommendation) => {
            const fee = getPlanProperty(plan, 'applicationFee')
            return fee ? formatCurrencyValue(fee) : 'None'
          }
        }
      ]
    },
    {
      id: 'coverage',
      title: 'Coverage Details',
      icon: <Shield className="h-5 w-5" />,
      items: [
        { 
          label: 'Maximum Coverage',
          tooltip: 'The maximum amount that can be shared per incident',
          getValue: (plan: PlanRecommendation) => plan.plan.maxCoverage
        },
        { 
          label: 'Annual Unshared Amount',
          tooltip: 'How the annual unshared amount works',
          getValue: (plan: PlanRecommendation) => plan.plan.annualUnsharedAmount
        },
        { 
          label: 'Pre-existing Conditions',
          tooltip: 'How pre-existing conditions are handled',
          getValue: (plan: PlanRecommendation) => getPlanProperty(plan, 'preExistingConditions') || 'Limited coverage'
        }
      ]
    },
    {
      id: 'eligibility',
      title: 'Eligibility & Requirements',
      icon: <Users className="h-5 w-5" />,
      items: [
        { 
          label: 'Faith Requirements',
          tooltip: 'Religious or faith requirements for membership',
          getValue: (plan: PlanRecommendation) => getPlanProperty(plan, 'faithRequirements') || 'Statement of faith required'
        },
        { 
          label: 'Lifestyle Requirements',
          tooltip: 'Lifestyle agreements required for membership',
          getValue: (plan: PlanRecommendation) => getPlanProperty(plan, 'lifestyleRequirements') || 'Healthy lifestyle agreement'
        },
        { 
          label: 'Age Restrictions',
          tooltip: 'Age limitations for membership',
          getValue: (plan: PlanRecommendation) => getPlanProperty(plan, 'ageRestrictions') || '18-64 years old'
        }
      ]
    },
    {
      id: 'benefits',
      title: 'Additional Benefits',
      icon: <Heart className="h-5 w-5" />,
      items: [
        { 
          label: 'Preventive Care',
          tooltip: 'Coverage for preventive services',
          getValue: (plan: PlanRecommendation) => getPlanProperty(plan, 'preventiveCare') || 'Limited'
        },
        { 
          label: 'Telemedicine',
          tooltip: 'Access to virtual doctor visits',
          getValue: (plan: PlanRecommendation) => getPlanProperty(plan, 'telemedicine') ? 'Included' : 'Not included'
        },
        { 
          label: 'Prescription Discounts',
          tooltip: 'Discounts on prescription medications',
          getValue: (plan: PlanRecommendation) => getPlanProperty(plan, 'prescriptionDiscounts') ? 'Available' : 'Not available'
        },
        { 
          label: 'Mental Health',
          tooltip: 'Coverage for mental health services',
          getValue: (plan: PlanRecommendation) => getPlanProperty(plan, 'mentalHealth') || 'Limited'
        }
      ]
    },
    {
      id: 'network',
      title: 'Network & Providers',
      icon: <Activity className="h-5 w-5" />,
      items: [
        { 
          label: 'Provider Network',
          tooltip: 'Type of provider network',
          getValue: (plan: PlanRecommendation) => getPlanProperty(plan, 'providerNetwork') || 'Open network'
        },
        { 
          label: 'Network Restrictions',
          tooltip: 'Limitations on which providers you can use',
          getValue: (plan: PlanRecommendation) => getPlanProperty(plan, 'networkRestrictions') || 'No restrictions'
        }
      ]
    },
    {
      id: 'waiting',
      title: 'Waiting Periods',
      icon: <Calendar className="h-5 w-5" />,
      items: [
        { 
          label: 'General Waiting Period',
          tooltip: 'Time before general medical needs are eligible for sharing',
          getValue: (plan: PlanRecommendation) => getPlanProperty(plan, 'waitingPeriod') || '30 days'
        },
        { 
          label: 'Maternity Waiting Period',
          tooltip: 'Time before maternity expenses are eligible for sharing',
          getValue: (plan: PlanRecommendation) => getPlanProperty(plan, 'maternityWaitingPeriod') || '10-12 months'
        }
      ]
    }
  ]

  // Get the best value for each metric
  const getBestValue = (categoryId: string, itemLabel: string) => {
    const category = comparisonCategories.find(c => c.id === categoryId)
    if (!category) return null
    
    const item = category.items.find(i => i.label === itemLabel)
    if (!item) return null
    
    // For costs, lower is better
    if (categoryId === 'costs') {
      if (itemLabel.includes('Monthly Premium') || itemLabel.includes('Initial Unshared') || itemLabel.includes('Annual Cost')) {
        const values = plans.map(plan => {
          const value = item.getValue(plan)
          // Extract numeric value from formatted currency
          let numericValue: number
          
          if (typeof value === 'string') {
            numericValue = parseFloat(value.replace(/[^0-9.-]+/g, '')) || 0
          } else if (typeof value === 'number') {
            numericValue = value
          } else {
            numericValue = 0
          }
          
          return { planId: plan.plan.id, value: numericValue }
        })
        
        // Find the minimum value
        const minValue = Math.min(...values.map(v => v.value))
        return values.find(v => v.value === minValue)?.planId
      }
    }
    
    // For coverage, higher/unlimited is better
    if (categoryId === 'coverage' && itemLabel === 'Maximum Coverage') {
      const unlimitedPlanId = plans.find(plan => 
        item.getValue(plan).toString().toLowerCase().includes('no limit') || 
        item.getValue(plan).toString().toLowerCase().includes('unlimited')
      )?.plan.id
      
      if (unlimitedPlanId) return unlimitedPlanId
    }
    
    return null
  }

  return (
    <TooltipProvider>
      <Card className="bg-white shadow-lg border-0 overflow-hidden">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <div className="border-b">
            <div className="px-6 py-4">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="details">Detailed Comparison</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
              </TabsList>
            </div>
          </div>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="p-0">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Plan Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => {
                  const costs = getRepresentativeCosts(plan)
                  
                  return (
                    <Card key={plan.plan.id} className="p-6 border-2 hover:border-primary transition-colors">
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant={plan.ranking === 1 ? "primary" : "outline"} className="mb-2">
                          {plan.ranking === 1 ? 'Top Match' : `Match #${plan.ranking}`}
                        </Badge>
                        <span className="text-sm font-medium text-gray-500">
                          {Math.round(plan.score)}% match
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2">{plan.plan.planName}</h3>
                      <p className="text-gray-500 mb-4">{plan.plan.providerName}</p>
                      
                      <div className="space-y-4 mb-6">
                        <div>
                          <p className="text-sm text-gray-500">Monthly Premium</p>
                          <p className="text-2xl font-bold">{formatCurrency(costs.monthlyPremium)}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Initial Unshared Amount</p>
                          <p className="text-xl font-semibold">{formatCurrency(costs.initialUnsharedAmount)}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Maximum Coverage</p>
                          <p className="text-lg font-medium">{plan.plan.maxCoverage}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {plan.factors && plan.factors.slice(0, 3).map((factor, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{factor.factor}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        className="w-full mt-6"
                        variant="outline"
                        onClick={() => setActiveTab('details')}
                      >
                        View Detailed Comparison
                      </Button>
                    </Card>
                  )
                })}
              </div>
            </div>
          </TabsContent>
          
          {/* Detailed Comparison Tab */}
          <TabsContent value="details" className="p-0">
            <ScrollArea className="h-[800px]">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Detailed Plan Comparison</h2>
                
                <div className="space-y-6">
                  {comparisonCategories.map((category) => (
                    <Accordion
                      key={category.id}
                      type="single"
                      collapsible
                      defaultValue={isSectionExpanded(category.id) ? category.id : undefined}
                      className="border rounded-lg overflow-hidden"
                    >
                      <AccordionItem value={category.id} className="border-0">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline">
                          <div className="flex items-center gap-2">
                            {category.icon}
                            <span className="font-semibold">{category.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-0">
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="bg-gray-50">
                                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 w-1/4">Feature</th>
                                  {plans.map((plan) => (
                                    <th key={plan.plan.id} className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                      {plan.plan.planName}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {category.items.map((item) => {
                                  const bestValuePlanId = getBestValue(category.id, item.label)
                                  
                                  return (
                                    <tr key={item.label} className="hover:bg-gray-50">
                                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                                        <div className="flex items-center gap-1">
                                          {item.label}
                                          {item.tooltip && (
                                            <Tooltip>
                                              <TooltipTrigger>
                                                <Info className="h-4 w-4 text-gray-400" />
                                              </TooltipTrigger>
                                              <TooltipContent className="max-w-xs">
                                                <p>{item.tooltip}</p>
                                              </TooltipContent>
                                            </Tooltip>
                                          )}
                                        </div>
                                      </td>
                                      {plans.map((plan) => {
                                        const value = item.getValue(plan)
                                        const isBestValue = bestValuePlanId === plan.plan.id
                                        
                                        return (
                                          <td 
                                            key={plan.plan.id} 
                                            className={cn(
                                              "px-6 py-4 text-sm",
                                              isBestValue ? "text-green-700 font-semibold" : "text-gray-900"
                                            )}
                                          >
                                            <div className="flex items-center gap-1">
                                              {value}
                                              {isBestValue && (
                                                <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                                                  Best
                                                </Badge>
                                              )}
                                            </div>
                                          </td>
                                        )
                                      })}
                                    </tr>
                                  )
                                })}
                              </tbody>
                            </table>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
          
          {/* Features Tab */}
          <TabsContent value="features" className="p-0">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Plan Features</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border">Feature</th>
                      {plans.map((plan) => (
                        <th key={plan.plan.id} className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border">
                          {plan.plan.planName}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: 'Preventive Care', key: 'preventiveCare' },
                      { label: 'Telemedicine', key: 'telemedicine' },
                      { label: 'Prescription Discounts', key: 'prescriptionDiscounts' },
                      { label: 'Mental Health Coverage', key: 'mentalHealth' },
                      { label: 'Maternity Coverage', key: 'maternityCoverage' },
                      { label: 'Specialist Visits', key: 'specialistVisits' },
                      { label: 'Hospital Stays', key: 'hospitalStays' },
                      { label: 'Emergency Room', key: 'emergencyRoom' },
                      { label: 'Urgent Care', key: 'urgentCare' },
                      { label: 'Surgery', key: 'surgery' },
                      { label: 'Wellness Programs', key: 'wellnessPrograms' }
                    ].map((feature, index) => (
                      <tr key={feature.key} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 border">{feature.label}</td>
                        {plans.map((plan) => {
                          // Check if the feature exists in the plan
                          const hasFeature = getPlanProperty(plan, feature.key)
                          
                          // Determine the display value
                          let displayValue = hasFeature
                          if (typeof hasFeature === 'boolean') {
                            displayValue = hasFeature ? 'Included' : 'Not included'
                          } else if (hasFeature === undefined) {
                            displayValue = 'Not specified'
                          }
                          
                          return (
                            <td key={plan.plan.id} className="px-6 py-4 text-sm text-gray-900 border">
                              <div className="flex items-center">
                                {typeof hasFeature === 'boolean' ? (
                                  hasFeature ? (
                                    <Check className="h-5 w-5 text-green-500 mr-2" />
                                  ) : (
                                    <X className="h-5 w-5 text-red-500 mr-2" />
                                  )
                                ) : null}
                                {displayValue}
                              </div>
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          {/* Eligibility Tab */}
          <TabsContent value="eligibility" className="p-0">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Eligibility Requirements</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border">Requirement</th>
                      {plans.map((plan) => (
                        <th key={plan.plan.id} className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border">
                          {plan.plan.planName}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: 'Faith Requirements', key: 'faithRequirements' },
                      { label: 'Lifestyle Requirements', key: 'lifestyleRequirements' },
                      { label: 'Age Restrictions', key: 'ageRestrictions' },
                      { label: 'Pre-existing Conditions', key: 'preExistingConditions' },
                      { label: 'Tobacco Use', key: 'tobaccoUse' },
                      { label: 'Application Process', key: 'applicationProcess' }
                    ].map((requirement, index) => (
                      <tr key={requirement.key} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 border">{requirement.label}</td>
                        {plans.map((plan) => (
                          <td key={plan.plan.id} className="px-6 py-4 text-sm text-gray-900 border">
                            {getPlanProperty(plan, requirement.key) || 'Not specified'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </TooltipProvider>
  )
} 