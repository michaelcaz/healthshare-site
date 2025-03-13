import { type PlanRecommendation } from './types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '../ui/scroll-area'
import { calculateAnnualCost } from '@/utils/plan-utils'

interface PlanComparisonTableProps {
  selectedPlans: PlanRecommendation[]
  onClose: (planId: string) => void
  maxPlans?: number
  visitFrequency?: string
  coverageType?: string
}

export function PlanComparisonTable({ 
  selectedPlans,
  onClose,
  maxPlans = 3,
  visitFrequency = 'just_checkups',
  coverageType = 'just_me'
}: PlanComparisonTableProps) {
  // Get representative costs for each plan (middle tier, single member, 30-39 age bracket)
  const getRepresentativeCosts = (plan: PlanRecommendation) => {
    const costs = plan.plan.planMatrix
      .find(matrix => matrix.ageBracket === '30-39' && matrix.householdType === 'Member Only')
      ?.costs.find(cost => cost.initialUnsharedAmount === 2500)
    
    // Check if this is a DPC plan
    const isDpcPlan = plan.plan.id.includes('dpc') || plan.plan.id.includes('vpc');
    
    return {
      monthlyPremium: costs?.monthlyPremium || 0,
      initialUnsharedAmount: costs?.initialUnsharedAmount || 0,
      // Use the centralized calculateAnnualCost function
      annualCost: calculateAnnualCost(
        costs?.monthlyPremium || 0, 
        costs?.initialUnsharedAmount || 0,
        visitFrequency,
        coverageType,
        isDpcPlan,
        'PlanComparisonTable'
      )
    }
  }

  const comparisonCategories = [
    {
      title: 'Monthly Costs',
      items: [
        { 
          label: 'Monthly Premium',
          getValue: (plan: PlanRecommendation) => getRepresentativeCosts(plan).monthlyPremium
        },
        { 
          label: 'Initial Unshared Amount',
          getValue: (plan: PlanRecommendation) => getRepresentativeCosts(plan).initialUnsharedAmount
        },
        { 
          label: 'Annual Estimated',
          getValue: (plan: PlanRecommendation) => getRepresentativeCosts(plan).annualCost
        }
      ]
    },
    {
      title: 'Coverage Details',
      items: [
        { 
          label: 'Maximum Coverage',
          getValue: (plan: PlanRecommendation) => plan.plan.maxCoverage
        },
        { 
          label: 'Annual Unshared Amount',
          getValue: (plan: PlanRecommendation) => plan.plan.annualUnsharedAmount
        },
        { 
          label: 'Provider Network',
          getValue: (plan: PlanRecommendation) => `${plan.plan.providerName} Network`
        }
      ]
    }
  ]

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Plan Comparison</h3>
        <p className="text-sm text-gray-500">
          {selectedPlans.length}/{maxPlans} Plans Selected
        </p>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="grid grid-cols-[200px_repeat(auto-fit,minmax(200px,1fr))] gap-4">
          {/* Header Row */}
          <div className="sticky top-0 bg-white z-10">
            <div className="h-24" /> {/* Spacer for plan names */}
          </div>
          
          {selectedPlans.map((plan) => (
            <div key={plan.plan.id} className="sticky top-0 bg-white z-10 p-4">
              <Badge className="mb-2">
                {plan.ranking === 1 ? 'Top Match' : `Match #${plan.ranking}`}
              </Badge>
              <h4 className="font-medium">{plan.plan.planName}</h4>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2"
                onClick={() => onClose(plan.plan.id)}
              >
                Remove
              </Button>
            </div>
          ))}

          {/* Comparison Categories */}
          {comparisonCategories.map((category) => (
            <div key={category.title} className="contents">
              <div className="col-span-full bg-gray-50 p-2 mt-4">
                <h5 className="font-medium">{category.title}</h5>
              </div>
              
              {category.items.map((item) => (
                <div key={item.label} className="contents">
                  <div className="p-2 border-b">{item.label}</div>
                  {selectedPlans.map((plan) => (
                    <div key={plan.plan.id} className="p-2 border-b">
                      {formatValue(item.getValue(plan))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}

function formatValue(value: any): string {
  if (typeof value === 'boolean') {
    return value ? '✓' : '✗'
  }
  if (typeof value === 'number') {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    })
  }
  return value?.toString() || 'N/A'
} 