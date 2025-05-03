describe('Basic Performance Checks', () => {
  it('should load homepage within acceptable time', () => {
    // Start performance measurement
    const startTime = Date.now();
    
    // Visit the homepage
    cy.visit('/', {
      onBeforeLoad: (win) => {
        // Add a listener for the window load event
        win.performance.mark('start-loading');
      },
      onLoad: (win) => {
        // Mark when the page has loaded
        win.performance.mark('end-loading');
        win.performance.measure('page-load', 'start-loading', 'end-loading');
      }
    });
    
    // Verify page loaded successfully
    cy.get('header').should('be.visible');
    cy.get('main, #main, [role="main"]').should('exist');
    
    // Calculate and log load time
    cy.window().then((win) => {
      if (win.performance.getEntriesByName('page-load').length) {
        const loadTime = win.performance.getEntriesByName('page-load')[0].duration;
        cy.log(`Homepage load time: ${loadTime.toFixed(2)}ms`);
        
        // Expect load time to be under 5 seconds (5000ms)
        // This is a generous threshold - you can adjust based on your requirements
        expect(loadTime).to.be.lessThan(5000);
      } else {
        // Fallback if performance metrics aren't available
        const totalTime = Date.now() - startTime;
        cy.log(`Homepage approximate load time: ${totalTime}ms`);
        expect(totalTime).to.be.lessThan(5000);
      }
    });
  });
  
  it('should load questionnaire page efficiently', () => {
    // Start performance measurement
    const startTime = Date.now();
    
    // Visit the questionnaire page
    cy.visit('/questionnaire', {
      onBeforeLoad: (win) => {
        win.performance.mark('start-loading');
      },
      onLoad: (win) => {
        win.performance.mark('end-loading');
        win.performance.measure('page-load', 'start-loading', 'end-loading');
      }
    });
    
    // Verify page loaded successfully
    cy.get('form, [role="form"]').should('exist');
    
    // Calculate and log load time
    cy.window().then((win) => {
      if (win.performance.getEntriesByName('page-load').length) {
        const loadTime = win.performance.getEntriesByName('page-load')[0].duration;
        cy.log(`Questionnaire load time: ${loadTime.toFixed(2)}ms`);
        expect(loadTime).to.be.lessThan(5000);
      } else {
        const totalTime = Date.now() - startTime;
        cy.log(`Questionnaire approximate load time: ${totalTime}ms`);
        expect(totalTime).to.be.lessThan(5000);
      }
    });
  });
  
  it('should check image optimization', () => {
    cy.visit('/');
    
    // Look for images and verify they use proper loading attributes
    cy.get('img').then($images => {
      // Check at least some images have loading="lazy" attribute
      const lazyLoadedImages = $images.filter('[loading="lazy"]');
      const nextJsImages = $images.filter('[decoding="async"], [fetchpriority="high"]');
      const totalImages = $images.length;
      
      cy.log(`${lazyLoadedImages.length} of ${totalImages} images use explicit lazy loading`);
      cy.log(`${nextJsImages.length} of ${totalImages} images are Next.js optimized images`);
      
      // Consider both lazy-loaded images and Next.js optimized images
      const optimizedImages = lazyLoadedImages.length + nextJsImages.length;
      
      // If there are multiple images, at least some should be optimized
      if (totalImages > 3) {
        // Consider test passed if we have any lazy loaded images OR Next.js optimized images
        // This way the test is resilient to different optimization methods
        expect(optimizedImages).to.be.at.least(1);
      }
      
      // Check if images are properly sized (no massive images)
      $images.each((i, img) => {
        // Skip SVGs as they're typically small
        if (!img.src.includes('.svg')) {
          // Create a test image to check dimensions
          const testImg = new Image();
          testImg.src = img.src;
          
          // Log image dimensions when loaded
          testImg.onload = () => {
            const isReasonablyOptimized = testImg.width <= 1920 && testImg.height <= 1920;
            if (!isReasonablyOptimized) {
              cy.log(`Image optimization warning: ${img.src} is ${testImg.width}x${testImg.height}`);
            }
          };
        }
      });
    });
  });
}); 