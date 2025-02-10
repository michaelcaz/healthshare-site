import { type PlanRecommendation } from './types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '../ui/scroll-area'

interface PlanComparisonTableProps {
  selectedPlans: PlanRecommendation[]
  onClose: (planId: string) => void
  maxPlans?: number
}

export function PlanComparisonTable({ 
  selectedPlans,
  onClose,
  maxPlans = 3 
}: PlanComparisonTableProps) {
  const comparisonCategories = [
    {
      title: 'Monthly Costs',
      items: [
        { label: 'Monthly Premium', key: 'monthly_cost' },
        { label: 'Per-Incident Cost', key: 'incident_cost' },
        { label: 'Annual Estimated', key: 'annual_cost' }
      ]
    },
    {
      title: 'Coverage Limits',
      items: [
        { label: 'Per Incident Maximum', key: 'per_incident_maximum' },
        { label: 'Annual Maximum', key: 'annual_maximum' },
        { label: 'Lifetime Maximum', key: 'lifetime_maximum' }
      ]
    },
    {
      title: 'Waiting Periods',
      items: [
        { label: 'Pre-existing Conditions', key: 'pre_existing_waiting_period' },
        { label: 'Maternity', key: 'maternity_waiting_period' },
        { label: 'Preventive Care', key: 'preventive_waiting_period' }
      ]
    },
    {
      title: 'Coverage Details',
      items: [
        { label: 'Doctor Visits', key: 'doctor_visits' },
        { label: 'Prescriptions', key: 'prescription_coverage' },
        { label: 'Emergency Care', key: 'emergency_coverage' },
        { label: 'Surgery', key: 'surgery_coverage' },
        { label: 'Maternity', key: 'maternity_coverage' }
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
              <h4 className="font-medium">{plan.plan.name}</h4>
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
                <div key={item.key} className="contents">
                  <div className="p-2 border-b">{item.label}</div>
                  {selectedPlans.map((plan) => (
                    <div key={plan.plan.id} className="p-2 border-b">
                      {formatValue(plan.plan[item.key as keyof typeof plan.plan])}
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