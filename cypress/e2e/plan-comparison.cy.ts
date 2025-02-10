describe('Plan Comparison Flow', () => {
  beforeEach(() => {
    cy.visit('/plans/comparison');
  });

  it('allows full comparison flow', () => {
    // Select age bracket
    cy.get('select[name="ageBracket"]').select('30-39');
    
    // Select household type
    cy.get('select[name="householdType"]').select('Member & Family');
    
    // Verify table updates
    cy.get('table').should('be.visible');
    cy.get('tr').should('have.length.greaterThan', 1);
    
    // Check sorting
    cy.get('[data-testid="annual-cost"]').then($costs => {
      const costs = Array.from($costs).map(el => 
        parseInt(el.textContent!.replace(/[^0-9]/g, '')));
      const sortedCosts = Array.from(costs).sort((a, b) => a - b);
      cy.wrap(costs).should('deep.equal', sortedCosts);
    });
  });

  it('handles IUA filtering', () => {
    // Select max IUA
    cy.get('select[name="maxIUA"]').select('2500');
    
    // Verify filtered results
    cy.get('[data-testid="iua-amount"]').each($iua => {
      const amount = parseInt($iua.text().replace(/[^0-9]/g, ''));
      cy.wrap(amount).should('be.lessThan', 2501);
    });
  });
}); 