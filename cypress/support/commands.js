// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Custom command for logging in
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/auth/login');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

// Custom command for starting the questionnaire
Cypress.Commands.add('startQuestionnaire', () => {
  cy.visit('/');
  cy.contains('Get Started').click();
  cy.url().should('include', '/questionnaire');
});

// Custom command to fill out the basic questionnaire information
Cypress.Commands.add('fillBasicQuestionnaireInfo', (age, zipCode, householdSize) => {
  cy.get('input[name="age"]').type(age);
  cy.get('input[name="zipCode"]').type(zipCode);
  cy.get(`input[name="householdSize"][value="${householdSize}"]`).check();
  cy.contains('button', 'Next').click();
});

// Custom command to check for form errors
Cypress.Commands.add('hasFormErrors', () => {
  return cy.get('body').then($body => {
    const hasErrorClass = $body.find('.error, .invalid, .error-message, [aria-invalid="true"]').length > 0;
    const hasErrorText = $body.text().toLowerCase().includes('required') ||
                        $body.text().toLowerCase().includes('invalid') ||
                        $body.text().toLowerCase().includes('error');
    return hasErrorClass || hasErrorText;
  });
});

// Custom command to find and click a button by its text content
Cypress.Commands.add('clickButton', (textPattern) => {
  // First try exact match
  cy.get('button').contains(textPattern).then($exactMatch => {
    if ($exactMatch.length) {
      return cy.wrap($exactMatch).first().click();
    }
    
    // If no exact match, try case-insensitive match
    return cy.get('button').then($buttons => {
      const matchingButton = $buttons.filter((i, el) => {
        return new RegExp(textPattern, 'i').test(el.innerText);
      });
      
      if (matchingButton.length) {
        return cy.wrap(matchingButton).first().click();
      }
      
      // If still no match, look for similar button purposes
      if (textPattern.toLowerCase().includes('next') || textPattern.toLowerCase().includes('continue')) {
        return cy.get('button[type="submit"], button.btn-primary, button.btn-arrow').first().click({force: true});
      }
      
      throw new Error(`Could not find button with text matching: ${textPattern}`);
    });
  });
});

// Custom command to handle healthshare plan selection
Cypress.Commands.add('selectPlan', (planNamePattern) => {
  cy.get('body').then($body => {
    // Look for plan cards or plan selection elements
    const planElements = $body.find('[data-testid*="plan"], [id*="plan"], [class*="plan"], h3, h4');
    
    // Filter for elements containing the plan name
    const matchingPlan = planElements.filter((i, el) => {
      return new RegExp(planNamePattern, 'i').test(el.innerText);
    });
    
    if (matchingPlan.length) {
      // Click on the plan or its parent
      cy.wrap(matchingPlan).first().parents('[role="button"], button, a').first().click({force: true});
    } else {
      // If no match by name, just click the first plan
      cy.log(`Plan "${planNamePattern}" not found, selecting first available plan`);
      cy.get('[data-testid*="plan"], [id*="plan"], [class*="plan"]').first().click({force: true});
    }
  });
}); 