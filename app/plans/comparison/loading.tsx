import { Skeleton } from '@/components/ui/skeleton'

export default function PlanComparisonLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-6">
        <Skeleton className="h-6 w-32" />
      </div>
      
      <Skeleton className="h-10 w-64 mb-4" />
      <Skeleton className="h-6 w-full max-w-2xl mb-8" />
      
      <div className="space-y-6">
        <div className="overflow-x-auto">
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
        
        <Skeleton className="h-96 w-full" />
      </div>
    </div>
  )
} 