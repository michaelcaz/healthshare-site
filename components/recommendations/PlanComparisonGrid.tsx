import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '../ui/checkbox'
import { useSelectedPlans } from './SelectedPlansContext'
import { type PlanRecommendation } from './types'

interface ComparisonMetric {
  label: string
  value: string | number
  tooltip?: string
}

interface PlanComparisonGridProps {
  topPlan: PlanRecommendation
  alternativePlans: PlanRecommendation[]
  onPlanSelect: (planId: string) => void
}

export function PlanComparisonGrid({ 
  topPlan, 
  alternativePlans,
  onPlanSelect 
}: PlanComparisonGridProps) {
  const { selectedPlans, togglePlanSelection, canAddMore } = useSelectedPlans()

  const isPlanSelected = (planId: string) => 
    selectedPlans.some(p => p.plan.id === planId)

  const renderCompareCheckbox = (plan: PlanRecommendation) => {
    const isSelected = isPlanSelected(plan.plan.id)
    return (
      <div className="flex items-center space-x-2 mt-4">
        <Checkbox
          id={`compare-${plan.plan.id}`}
          checked={isSelected}
          disabled={!isSelected && !canAddMore}
          onCheckedChange={() => togglePlanSelection(plan)}
        />
        <label 
          htmlFor={`compare-${plan.plan.id}`}
          className="text-sm text-gray-600"
        >
          Add to comparison
        </label>
      </div>
    )
  }

  const getComparisonMetrics = (plan: PlanRecommendation): ComparisonMetric[] => [
    {
      label: 'Monthly Cost',
      value: `$${plan.plan.monthly_cost}`,
      tooltip: 'Your monthly payment to maintain coverage'
    },
    {
      label: 'Per-Incident Cost',
      value: `$${plan.plan.incident_cost}`,
      tooltip: 'Amount you pay per medical incident before sharing begins'
    },
    {
      label: 'Est. Annual Cost',
      value: `$${plan.plan.monthly_cost * 12}`,
      tooltip: 'Estimated total yearly cost including monthly payments'
    },
    {
      label: 'Waiting Periods',
      value: `${plan.plan.pre_existing_waiting_period} months`,
      tooltip: 'Time before pre-existing conditions are eligible'
    },
    {
      label: 'Per Incident Max',
      value: `$${plan.plan.per_incident_maximum.toLocaleString()}`,
      tooltip: 'Maximum amount shared per medical incident'
    },
    {
      label: 'Annual Max',
      value: `$${plan.plan.annual_maximum.toLocaleString()}`,
      tooltip: 'Maximum amount shared per year'
    },
    {
      label: 'Lifetime Max',
      value: plan.plan.lifetime_maximum ? 
        `$${plan.plan.lifetime_maximum.toLocaleString()}` : 
        'Unlimited',
      tooltip: 'Maximum lifetime sharing amount'
    },
    {
      label: 'Trust Score',
      value: `${Math.round(plan.score)}%`,
      tooltip: 'Based on member reviews and program stability'
    }
  ]

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Compare Alternative Plans</h2>
        {selectedPlans.length > 0 && (
          <p className="text-sm text-gray-600">
            {selectedPlans.length} plan{selectedPlans.length !== 1 ? 's' : ''} selected
          </p>
        )}
      </div>
      
      <div className="grid md:grid-cols-4 gap-6">
        {/* Top Plan Column */}
        <Card className="p-6 border-2 border-blue-500">
          <div className="space-y-4">
            <Badge variant="primary" className="bg-blue-500">
              Top Recommendation
            </Badge>
            <h3 className="font-semibold text-lg">{topPlan.plan.name}</h3>
            
            {/* Comparison Metrics */}
            <div className="space-y-3">
              {getComparisonMetrics(topPlan).map((metric, index) => (
                <div key={index} className="text-sm">
                  <p className="text-gray-500">{metric.label}</p>
                  <p className="font-semibold text-gray-900">{metric.value}</p>
                </div>
              ))}
            </div>
            {renderCompareCheckbox(topPlan)}
          </div>
        </Card>

        {/* Alternative Plans */}
        {alternativePlans.map((plan) => (
          <Card key={plan.plan.id} className="p-6 hover:border-blue-200 transition-colors">
            <div className="space-y-4">
              <Badge variant="outline" className="text-blue-500">
                Alternative {plan.ranking}
              </Badge>
              <h3 className="font-semibold text-lg">{plan.plan.name}</h3>
              
              {/* Comparison Metrics */}
              <div className="space-y-3">
                {getComparisonMetrics(plan).map((metric, index) => (
                  <div key={index} className="text-sm">
                    <p className="text-gray-500">{metric.label}</p>
                    <p className="font-semibold text-gray-900">{metric.value}</p>
                  </div>
                ))}
              </div>
              {renderCompareCheckbox(plan)}
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => onPlanSelect(plan.plan.id)}
                >
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 