import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '../ui/checkbox'
import { useSelectedPlans } from './SelectedPlansContext'
import { type PlanRecommendation } from './types'
import { getPlanCost } from '@/lib/utils/plan-costs'

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

  const getComparisonMetrics = (plan: PlanRecommendation): ComparisonMetric[] => {
    // Get the lowest cost option from the plan matrix
    const lowestCost = plan.plan.planMatrix
      .flatMap(bracket => bracket.costs)
      .reduce((min, cost) => 
        cost.monthlyPremium < min.monthlyPremium ? cost : min
      );

    return [
      {
        label: 'Monthly Cost',
        value: `$${lowestCost.monthlyPremium}`,
        tooltip: 'Starting monthly payment to maintain coverage'
      },
      {
        label: 'Initial Unshared Amount',
        value: `$${lowestCost.initialUnsharedAmount}`,
        tooltip: 'Amount you pay before sharing begins'
      },
      {
        label: 'Est. Annual Cost',
        value: `$${lowestCost.monthlyPremium * 12 + lowestCost.initialUnsharedAmount}`,
        tooltip: 'Estimated total yearly cost including monthly payments and IUA'
      },
      {
        label: 'Maximum Coverage',
        value: plan.plan.maxCoverage,
        tooltip: 'Maximum amount that can be shared'
      },
      {
        label: 'Annual Unshared Amount',
        value: plan.plan.annualUnsharedAmount,
        tooltip: 'How the annual unshared amount works'
      },
      {
        label: 'Provider',
        value: plan.plan.providerName,
        tooltip: 'Healthcare sharing ministry provider'
      },
      {
        label: 'Match Score',
        value: `${Math.round(plan.score)}%`,
        tooltip: 'How well this plan matches your needs'
      }
    ]
  }

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
            <h3 className="font-semibold text-lg">{topPlan.plan.planName}</h3>
            
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
              <h3 className="font-semibold text-lg">{plan.plan.planName}</h3>
              
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