import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { PlanDetailsModal } from '@/components/plans/PlanDetailsModal';

// Mock the dynamically imported components
vi.mock('@/components/plans/PlanCostBreakdown', () => ({
  default: () => <div data-testid="cost-breakdown">Cost Breakdown Content</div>
}));

vi.mock('@/components/plans/PlanCoverageDetails', () => ({
  default: () => <div data-testid="coverage-details">Coverage Details Content</div>
}));

vi.mock('@/components/plans/PlanProviderNetwork', () => ({
  default: () => <div data-testid="provider-network">Provider Network Content</div>
}));

vi.mock('@/components/plans/PlanPrescriptionCoverage', () => ({
  default: () => <div data-testid="prescription-coverage">Prescription Coverage Content</div>
}));

// Mock Dialog component from UI
vi.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children, open }: { children: React.ReactNode; open?: boolean }) => 
    open ? <div data-testid="dialog">{children}</div> : null,
  DialogContent: ({ children }: { children: React.ReactNode }) => 
    <div data-testid="dialog-content">{children}</div>,
  DialogHeader: ({ children }: { children: React.ReactNode }) => 
    <div data-testid="dialog-header">{children}</div>,
  DialogTitle: ({ children }: { children: React.ReactNode }) => 
    <div data-testid="dialog-title">{children}</div>,
}));

// Mock Tabs component from UI
vi.mock('@/components/ui/tabs', () => ({
  Tabs: ({ 
    children, 
    value, 
    onValueChange 
  }: { 
    children: React.ReactNode; 
    value: string; 
    onValueChange?: (value: string) => void 
  }) => (
    <div data-testid="tabs" data-value={value} onClick={() => onValueChange && onValueChange('coverage')}>
      {children}
    </div>
  ),
  TabsList: ({ children }: { children: React.ReactNode }) => 
    <div data-testid="tabs-list">{children}</div>,
  TabsTrigger: ({ children, value }: { children: React.ReactNode; value: string }) => (
    <button data-testid={`tab-${value}`} data-value={value}>
      {children}
    </button>
  ),
  TabsContent: ({ children, value }: { children: React.ReactNode; value: string }) => (
    <div data-testid={`tab-content-${value}`} data-value={value}>
      {children}
    </div>
  ),
}));

// Mock Badge component
vi.mock('@/components/ui/badge', () => ({
  Badge: ({ children }: { children: React.ReactNode }) => 
    <span data-testid="badge">{children}</span>,
}));

// Mock Skeleton component
vi.mock('@/components/ui/skeleton', () => ({
  Skeleton: ({ className }: { className?: string }) => 
    <div data-testid="skeleton" className={className}>Loading...</div>,
}));

describe('PlanDetailsModal', () => {
  const mockPlan = {
    id: 'test-plan-1',
    name: 'Test Health Plan',
    provider: 'Test Provider',
    monthlyCost: 250,
    iua: 1000,
    sharingPercentage: '100%',
    annualMemberResponsibility: 5000,
    applicationFee: 100,
    annualRenewalFee: 50,
    networkType: 'PPO' as const,
    prescriptionCoverage: 'Full' as const,
    maternity: true,
    preventiveCare: true,
    specialistCare: true,
    mentalHealth: false,
    preExistingConditions: 'Limited' as const,
    waitingPeriods: {
      accident: '0 days',
      illness: '30 days',
      maternity: '10 months',
      preventive: '60 days'
    }
  };

  it('renders the modal with correct plan details', () => {
    render(
      <PlanDetailsModal
        isOpen={true}
        onClose={vi.fn()}
        plan={mockPlan}
      />
    );

    // Check plan name and provider are displayed
    expect(screen.getByTestId('dialog-title')).toHaveTextContent('Test Health Plan');
    expect(screen.getByTestId('badge')).toHaveTextContent('Test Provider');
    
    // Check tabs are rendered
    expect(screen.getByTestId('tab-costs')).toBeInTheDocument();
    expect(screen.getByTestId('tab-coverage')).toBeInTheDocument();
    expect(screen.getByTestId('tab-network')).toBeInTheDocument();
    expect(screen.getByTestId('tab-prescriptions')).toBeInTheDocument();
    
    // Check content of the default tab
    expect(screen.getByTestId('tab-content-costs')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(
      <PlanDetailsModal
        isOpen={false}
        onClose={vi.fn()}
        plan={mockPlan}
      />
    );

    expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();
  });

  it('does not render when plan is not provided', () => {
    render(
      <PlanDetailsModal
        isOpen={true}
        onClose={vi.fn()}
        plan={undefined as any}
      />
    );

    expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();
  });
}); 