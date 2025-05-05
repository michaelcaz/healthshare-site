describe('Mobile Responsiveness Tests', () => {
  const mobileViewports = [
    { width: 375, height: 667, name: 'iPhone SE' },
    { width: 414, height: 896, name: 'iPhone XR' }
  ];
  
  const pagesToTest = [
    { url: '/', name: 'Homepage' },
    { url: '/questionnaire', name: 'Questionnaire Start' },
    { url: '/about', name: 'About Page' },
    { url: '/auth/login', name: 'Login Page' },
    { url: '/auth/signup', name: 'Signup Page' },
  ];

  mobileViewports.forEach(viewport => {
    describe(`${viewport.name} (${viewport.width}x${viewport.height})`, () => {
      beforeEach(() => {
        cy.viewport(viewport.width, viewport.height);
      });

      // Test mobile navigation
      it('should open and close mobile menu correctly', () => {
        cy.visit('/');
        
        // Mobile menu button should be visible
        cy.get('button.md\\:hidden').should('be.visible');
        
        // Open mobile menu
        cy.get('button.md\\:hidden').click();
        
        // Mobile menu should be visible with navigation links
        cy.get('div.md\\:hidden.bg-white').should('be.visible');
        cy.get('div.md\\:hidden.bg-white a').should('have.length.at.least', 2);
        
        // Close mobile menu
        cy.get('button.md\\:hidden').click();
        
        // Mobile menu should be closed
        cy.get('div.md\\:hidden.bg-white').should('not.exist');
      });

      // Test pages at mobile viewport
      pagesToTest.forEach(page => {
        it(`should render ${page.name} correctly without horizontal overflow`, () => {
          cy.visit(page.url);
          
          // Check that there's no horizontal overflow
          cy.document().then(doc => {
            // Check document width vs viewport width
            expect(doc.documentElement.scrollWidth).to.be.lte(viewport.width);
          });
          
          // Check key elements are visible 
          if (page.url === '/') {
            // Homepage specific checks
            cy.get('header').should('be.visible');
            cy.get('h1').should('be.visible');
            cy.contains('button', /get started|find my plan/i).should('be.visible');
          }
          
          if (page.url === '/questionnaire') {
            // Questionnaire specific checks
            cy.get('form').should('be.visible');
            cy.contains('button', /next|continue/i).should('be.visible');
          }
          
          if (page.url.includes('/auth/')) {
            // Auth pages specific checks
            cy.get('form').should('be.visible');
            cy.get('input').should('be.visible');
            cy.get('button[type="submit"]').should('be.visible');
          }
        });
      });
      
      // Test form inputs on mobile
      it('should handle form inputs properly on mobile', () => {
        cy.visit('/questionnaire');
        
        // Form inputs should be easily tappable (adequate size)
        cy.get('input').first().should(($input) => {
          const height = $input.outerHeight();
          expect(height).to.be.at.least(40); // Check for minimum tap target size
        });
        
        // Form input should receive focus when tapped
        cy.get('input').first().focus().should('be.focused');
      });
      
      // Test mobile bottom CTA if it exists
      it('should show mobile bottom CTA that is functional', () => {
        cy.visit('/');
        cy.scrollTo(0, 300);
        
        // Try to find mobile bottom CTA - don't fail if not present
        cy.get('body').then($body => {
          if ($body.find('.fixed.bottom-0.left-0.right-0.md\\:hidden').length > 0) {
            cy.get('.fixed.bottom-0.left-0.right-0.md\\:hidden button').first()
              .should('be.visible')
              .and($button => {
                // Check button size for tap target
                const height = $button.outerHeight();
                expect(height).to.be.at.least(40);
              });
          }
        });
      });
    });
  });
  
  describe('Mobile Specific Features', () => {
    beforeEach(() => {
      cy.viewport(375, 667);
    });
    
    it('should hide desktop-only elements on mobile', () => {
      cy.visit('/');
      
      // Elements with md:flex or similar classes should be hidden on mobile
      cy.get('.hidden.md\\:flex').should('not.be.visible');
      cy.get('.hidden.md\\:block').should('not.be.visible');
    });
    
    it('should stack columns on mobile breakpoints', () => {
      cy.visit('/');
      
      // Find elements that should stack on mobile
      cy.get('.flex.flex-col.md\\:flex-row').each($el => {
        // Check flex direction is column on mobile
        cy.wrap($el).should('have.css', 'flex-direction', 'column');
      });
    });
  });
}); 