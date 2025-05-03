'use client';

import { useState, useEffect, Suspense } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';

// Dynamically import heavy components with loading fallbacks
const PlanCostBreakdown = dynamic(() => import('./PlanCostBreakdown'), {
  loading: () => <Skeleton className="h-80 w-full rounded-md" />,
  ssr: false
});

const PlanCoverageDetails = dynamic(() => import('./PlanCoverageDetails'), {
  loading: () => <Skeleton className="h-80 w-full rounded-md" />,
  ssr: false
});

const PlanProviderNetwork = dynamic(() => import('./PlanProviderNetwork'), {
  loading: () => <Skeleton className="h-80 w-full rounded-md" />,
  ssr: false
});

const PlanPrescriptionCoverage = dynamic(() => import('./PlanPrescriptionCoverage'), {
  loading: () => <Skeleton className="h-80 w-full rounded-md" />,
  ssr: false
});

interface PlanDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: any; // Replace with proper Plan type
}

export function PlanDetailsModal({ isOpen, onClose, plan }: PlanDetailsModalProps) {
  const [activeTab, setActiveTab] = useState('costs');

  // Load tab content only when the tab is active to improve performance
  useEffect(() => {
    // You can add analytics tracking here
    if (isOpen) {
      // Track modal view
    }
  }, [isOpen]);

  if (!plan) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">{plan.name}</DialogTitle>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {plan.provider}
            </Badge>
          </div>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="costs">Costs</TabsTrigger>
            <TabsTrigger value="coverage">Coverage</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="costs" className="mt-6">
            <Suspense fallback={<Skeleton className="h-80 w-full rounded-md" />}>
              <PlanCostBreakdown plan={plan} />
            </Suspense>
          </TabsContent>
          
          <TabsContent value="coverage" className="mt-6">
            <Suspense fallback={<Skeleton className="h-80 w-full rounded-md" />}>
              <PlanCoverageDetails plan={plan} />
            </Suspense>
          </TabsContent>
          
          <TabsContent value="network" className="mt-6">
            <Suspense fallback={<Skeleton className="h-80 w-full rounded-md" />}>
              <PlanProviderNetwork plan={plan} />
            </Suspense>
          </TabsContent>
          
          <TabsContent value="prescriptions" className="mt-6">
            <Suspense fallback={<Skeleton className="h-80 w-full rounded-md" />}>
              <PlanPrescriptionCoverage plan={plan} />
            </Suspense>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
} 