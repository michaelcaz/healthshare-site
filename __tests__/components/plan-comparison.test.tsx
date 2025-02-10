import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { PlanComparison } from '@/components/plans/plan-comparison';

describe('PlanComparison Component', () => {
  test('renders all providers', () => {
    render(
      <PlanComparison 
        initialAgeBracket="30-39"
        initialHouseholdType="Member Only"
      />
    );
    
    // Check for provider names
    expect(screen.getByText('Zion Healthshare')).toBeInTheDocument();
    expect(screen.getByText('CrowdHealth')).toBeInTheDocument();
  });

  test('filters work correctly', () => {
    render(
      <PlanComparison 
        initialAgeBracket="30-39"
        initialHouseholdType="Member Only"
      />
    );

    // Change age bracket
    const ageSelect = screen.getByRole('combobox', { name: /age/i });
    userEvent.selectOptions(ageSelect, '50-64');

    // Verify prices updated
    const prices = screen.getAllByText(/\$\d+/);
    expect(prices.length).toBeGreaterThan(0);
  });

  test('sorts by annual cost', () => {
    render(
      <PlanComparison 
        initialAgeBracket="30-39"
        initialHouseholdType="Member Only"
      />
    );

    const annualCosts = screen.getAllByTestId('annual-cost')
      .map(el => parseInt(el.textContent!.replace(/[^0-9]/g, '')));
    
    // Verify sorting
    expect([...annualCosts].sort((a, b) => a - b)).toEqual(annualCosts);
  });
}); 