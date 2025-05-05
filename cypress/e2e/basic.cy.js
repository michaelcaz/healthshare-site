describe('Basic Application Tests', () => {
  beforeEach(() => {
    // Visit the homepage before each test
    cy.visit('/');
    // Wait for page to fully load
    cy.wait(1000);
  });

  it('should load the homepage successfully', () => {
    // Check that the homepage loads with expected elements
    cy.get('h1').should('be.visible');
    cy.contains('Get Started').should('be.visible');
  });

  it('should have working navigation links', () => {
    // Test navigation menu
    cy.get('nav').should('be.visible');
    cy.get('nav a').should('have.length.at.least', 3);
  });

  it('should be responsive', () => {
    // Check if the page is responsive
    // This will be tested across different viewport sizes
    cy.get('header').should('be.visible');
    cy.get('main').should('be.visible');
    cy.get('footer').should('be.visible');
  });

  // Simple visual verification
  it('should display the hero section correctly', () => {
    cy.get('main').should('be.visible');
    // Take a screenshot for visual comparison
    cy.screenshot('homepage-hero');
  });
}); 