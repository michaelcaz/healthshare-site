describe('Healthshare Plan Finder Basic Tests', () => {
  it('should load the home page successfully', () => {
    cy.visit('/');
    
    // Check for main heading about health insurance
    cy.get('h1').should('exist').contains('health insurance', { matchCase: false });
    cy.get('body').should('not.have.text', 'Error');
    
    // Check for the zip code form
    cy.get('form').should('exist');
    cy.get('input[placeholder="Enter zip code"]').should('exist');
    cy.get('button').contains('Find my plan').should('exist');
  });

  it('should have working navigation in the header', () => {
    cy.visit('/');
    
    // Check for logo and main navigation links
    cy.get('img[alt*="ShareWell"], img[alt*="logo"]').should('exist');
    
    // Test navigation links
    cy.get('a').contains('About').should('exist');
    cy.get('a').contains("What's Health Sharing?").should('exist');
    cy.get('a').contains('Contact').should('exist');
  });

  it('should have a Get Started button that navigates to the questionnaire', () => {
    cy.visit('/');
    
    // Find and click the Get Started button
    cy.get('button').contains('Get Started').should('exist').click();
    
    // Verify we're on the questionnaire page
    cy.url().should('include', '/questionnaire');
  });

  it('should allow entering a zip code to find plans', () => {
    cy.visit('/');
    
    // Enter a zip code and submit the form
    cy.get('input[placeholder="Enter zip code"]').type('12345');
    cy.get('button').contains('Find my plan').click();
    
    // Verify we're on the questionnaire page with zip parameter
    cy.url().should('include', '/questionnaire');
    cy.url().should('include', 'zip=12345');
  });
}); 