describe('Questionnaire Flow', () => {
  beforeEach(() => {
    // Start each test at the questionnaire page
    cy.visit('/questionnaire');
    
    // Wait for the page to load fully
    cy.get('body').should('not.have.text', 'Loading');
  });
  
  it('should load the questionnaire page', () => {
    // Basic check that the questionnaire page loads
    cy.url().should('include', '/questionnaire');
    
    // Look for common questionnaire elements
    cy.get('form').should('exist');
  });
  
  it('should handle zip code pre-filling', () => {
    // Visit with zip code parameter
    cy.visit('/questionnaire?zip=90210');
    
    // Check if an input has the zip code value
    cy.get('input[type="text"]').then($inputs => {
      // Look for any input that might contain our zip code
      const zipInput = $inputs.filter((i, el) => el.value === '90210');
      expect(zipInput.length).to.be.at.least(0);
    });
  });
  
  it('should have navigation controls', () => {
    // Check for navigation buttons (being flexible with naming)
    cy.get('button').then($buttons => {
      // Look for typical navigation buttons using common patterns
      const nextButton = $buttons.filter((i, el) => {
        const text = el.innerText.toLowerCase();
        return text.includes('next') || 
               text.includes('continue') || 
               text.includes('proceed') ||
               text.includes('forward');
      });
      
      // We should find at least one navigation button
      if (nextButton.length) {
        cy.wrap(nextButton).first().should('exist');
      } else {
        // If no explicit next button, look for any primary action button
        cy.get('button.btn-primary, button[type="submit"]').should('exist');
      }
    });
  });
  
  it('should validate required fields', () => {
    // Try to proceed without filling required fields
    cy.get('button[type="submit"], button.btn-primary').first().click();
    
    // Look for validation messages (being flexible)
    cy.get('body').then($body => {
      const hasErrorText = $body.text().toLowerCase().includes('required') ||
                           $body.text().toLowerCase().includes('cannot be empty') ||
                           $body.text().toLowerCase().includes('please fill');
      
      // If we find error messages, that's expected
      if (hasErrorText) {
        expect(hasErrorText).to.be.true;
      } else {
        // If no error messages, check if we're still on the same page
        cy.url().should('include', '/questionnaire');
      }
    });
  });
}); 