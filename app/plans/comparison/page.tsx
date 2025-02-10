import { PlanComparison } from '@/components/plans/plan-comparison';

export default function PlanComparisonPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Compare Health Sharing Plans</h1>
      <PlanComparison 
        initialAgeBracket="30-39"
        initialHouseholdType="Member Only"
      />
    </div>
  );
} 