const { exec } = require('child_process');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

// Define mobile devices to test
const MOBILE_DEVICES = [
  { name: 'iPhone SE', width: 375, height: 667 },
  { name: 'iPhone 12/13/14', width: 390, height: 844 },
  { name: 'iPhone 12/13/14 Pro Max', width: 428, height: 926 },
  { name: 'Samsung Galaxy S20', width: 360, height: 800 },
  { name: 'Samsung Galaxy S21/S22', width: 412, height: 915 },
  { name: 'iPad Mini', width: 768, height: 1024 },
  { name: 'iPad Pro', width: 1024, height: 1366 },
];

// Define critical pages to test
const CRITICAL_PAGES = [
  { path: '/', name: 'Homepage' },
  { path: '/questionnaire', name: 'Questionnaire Start' },
  { path: '/questionnaire/step/1', name: 'Questionnaire Step 1' },
  { path: '/plans', name: 'Plans Page' },
  { path: '/auth/login', name: 'Login Page' },
  { path: '/auth/signup', name: 'Signup Page' },
  { path: '/blog', name: 'Blog Page' },
];

// Create report directory
const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '-');
const reportDir = path.join(__dirname, '..', 'reports', `mobile-responsive-${timestamp}`);
if (!fs.existsSync(reportDir)) {
  fs.mkdirSync(reportDir, { recursive: true });
}

// Create a report file
const reportPath = path.join(reportDir, 'mobile-responsive-report.md');
fs.writeFileSync(reportPath, `# Mobile Responsiveness Test Report\nDate: ${new Date().toLocaleString()}\n\n`);

// Helper function to append to report
function appendToReport(content) {
  fs.appendFileSync(reportPath, content + '\n');
  console.log(content);
}

// Function to take screenshots of pages at different viewport sizes
async function captureScreenshots() {
  appendToReport('## Screenshots\n');
  
  // Ensure screenshots directory exists
  const screenshotsDir = path.join(reportDir, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }
  
  for (const device of MOBILE_DEVICES) {
    appendToReport(`### Device: ${device.name} (${device.width}x${device.height})\n`);
    
    for (const page of CRITICAL_PAGES) {
      const fileName = `${device.name.replace(/\//g, '-')}_${page.path.replace(/\//g, '-')}.png`.toLowerCase();
      const filePath = path.join(screenshotsDir, fileName);
      
      // Create Cypress spec file for this screenshot
      const specFilePath = path.join(__dirname, '..', 'cypress', 'e2e', 'temp-mobile-test.cy.js');
      const specContent = `
      describe('Mobile Responsive Testing', () => {
        it('Captures screenshot of ${page.name}', () => {
          cy.viewport(${device.width}, ${device.height});
          cy.visit('${page.path}');
          // Allow time for animations and loading
          cy.wait(2000);
          cy.screenshot('${fileName.replace('.png', '')}', { overwrite: true });
        });
      });
      `;
      
      fs.writeFileSync(specFilePath, specContent);
      
      // Run Cypress to capture this screenshot
      console.log(chalk.blue(`Taking screenshot of ${page.name} on ${device.name}...`));
      
      try {
        await new Promise((resolve, reject) => {
          exec(`npx cypress run --spec ${specFilePath} --config viewportWidth=${device.width},viewportHeight=${device.height}`,
            (error, stdout, stderr) => {
              if (error) {
                console.log(chalk.red(`Error capturing screenshot: ${error.message}`));
                resolve(); // Continue with next screenshot even if this one fails
                return;
              }
              
              // Move screenshot to our report directory
              const cypressScreenshot = path.join(__dirname, '..', 'cypress', 'screenshots', 
                'temp-mobile-test.cy.js', `${fileName.replace('.png', '')}.png`);
              
              if (fs.existsSync(cypressScreenshot)) {
                fs.copyFileSync(cypressScreenshot, filePath);
                appendToReport(`![${page.name} on ${device.name}](./screenshots/${fileName})`);
                appendToReport('');
              } else {
                appendToReport(`❌ Failed to capture screenshot for ${page.name} on ${device.name}`);
              }
              
              resolve();
            });
        });
      } catch (err) {
        console.error(chalk.red(`Error in screenshot process: ${err.message}`));
      }
    }
    
    appendToReport('\n');
  }
  
  // Clean up temporary spec file
  const tempSpecFile = path.join(__dirname, '..', 'cypress', 'e2e', 'temp-mobile-test.cy.js');
  if (fs.existsSync(tempSpecFile)) {
    fs.unlinkSync(tempSpecFile);
  }
}

// Function to run accessibility checks on mobile viewports
async function runAccessibilityChecks() {
  appendToReport('## Accessibility on Mobile Devices\n');
  
  for (const device of MOBILE_DEVICES) {
    appendToReport(`### Device: ${device.name} (${device.width}x${device.height})\n`);
    
    for (const page of CRITICAL_PAGES) {
      // Create temporary Cypress spec file for a11y testing
      const specFilePath = path.join(__dirname, '..', 'cypress', 'e2e', 'temp-a11y-test.cy.js');
      const specContent = `
      describe('Mobile Accessibility Testing', () => {
        it('Checks accessibility of ${page.name}', () => {
          cy.viewport(${device.width}, ${device.height});
          cy.visit('${page.path}');
          cy.wait(2000); // Wait for page to stabilize
          cy.injectAxe();
          cy.checkA11y();
        });
      });
      `;
      
      fs.writeFileSync(specFilePath, specContent);
      
      console.log(chalk.blue(`Testing accessibility of ${page.name} on ${device.name}...`));
      
      try {
        await new Promise((resolve, reject) => {
          exec(`npx cypress run --spec ${specFilePath} --config viewportWidth=${device.width},viewportHeight=${device.height}`,
            (error, stdout, stderr) => {
              if (error) {
                appendToReport(`❌ Accessibility issues found on ${page.name} for ${device.name}:`);
                appendToReport('```');
                appendToReport(error.message);
                appendToReport('```');
              } else {
                appendToReport(`✅ ${page.name} passes accessibility checks on ${device.name}`);
              }
              resolve();
            });
        });
      } catch (err) {
        console.error(chalk.red(`Error in accessibility testing: ${err.message}`));
      }
      
      appendToReport('');
    }
    
    appendToReport('\n');
  }
  
  // Clean up temporary spec file
  const tempSpecFile = path.join(__dirname, '..', 'cypress', 'e2e', 'temp-a11y-test.cy.js');
  if (fs.existsSync(tempSpecFile)) {
    fs.unlinkSync(tempSpecFile);
  }
}

// Function to test interactive elements on mobile
async function testInteractiveElements() {
  appendToReport('## Interactive Elements on Mobile\n');
  
  // Key interactive elements to test
  const interactiveTests = [
    { name: 'Mobile menu toggle', test: `
      cy.viewport(375, 667);
      cy.visit('/');
      cy.wait(1000);
      cy.get('[data-testid="mobile-menu-button"]').should('be.visible').click();
      cy.get('[data-testid="mobile-menu"]').should('be.visible');
      cy.wait(500);
      cy.get('[data-testid="mobile-menu-close"]').click();
      cy.get('[data-testid="mobile-menu"]').should('not.be.visible');
    `},
    { name: 'Questionnaire navigation', test: `
      cy.viewport(375, 667);
      cy.visit('/questionnaire/step/1');
      cy.wait(1000);
      // Fill out first question
      cy.get('input').first().type('Test User');
      cy.get('[data-testid="next-button"]').click();
      // Should move to step 2
      cy.url().should('include', '/questionnaire/step/2');
      // Test back button
      cy.get('[data-testid="back-button"]').click();
      cy.url().should('include', '/questionnaire/step/1');
    `},
    { name: 'Plan details expansion', test: `
      cy.viewport(375, 667);
      cy.visit('/plans');
      cy.wait(1000);
      cy.get('[data-testid="plan-card"]').first().within(() => {
        cy.get('[data-testid="view-details-button"]').click();
      });
      cy.get('[data-testid="plan-details-modal"]').should('be.visible');
      cy.get('[data-testid="close-modal-button"]').click();
      cy.get('[data-testid="plan-details-modal"]').should('not.exist');
    `}
  ];
  
  for (const test of interactiveTests) {
    // Create temporary Cypress spec file for this interactive test
    const specFilePath = path.join(__dirname, '..', 'cypress', 'e2e', 'temp-interactive-test.cy.js');
    const specContent = `
    describe('Mobile Interactive Element Testing', () => {
      it('Tests ${test.name}', () => {
        ${test.test}
      });
    });
    `;
    
    fs.writeFileSync(specFilePath, specContent);
    
    console.log(chalk.blue(`Testing ${test.name} on mobile...`));
    
    try {
      await new Promise((resolve, reject) => {
        exec(`npx cypress run --spec ${specFilePath}`,
          (error, stdout, stderr) => {
            if (error) {
              appendToReport(`❌ Issues found with ${test.name}:`);
              appendToReport('```');
              appendToReport(error.message);
              appendToReport('```');
            } else {
              appendToReport(`✅ ${test.name} works correctly on mobile`);
            }
            resolve();
          });
      });
    } catch (err) {
      console.error(chalk.red(`Error testing interactive element: ${err.message}`));
    }
    
    appendToReport('');
  }
  
  // Clean up temporary spec file
  const tempSpecFile = path.join(__dirname, '..', 'cypress', 'e2e', 'temp-interactive-test.cy.js');
  if (fs.existsSync(tempSpecFile)) {
    fs.unlinkSync(tempSpecFile);
  }
}

// Run the mobile responsiveness test suite
async function runMobileTests() {
  console.log(chalk.green('Starting Mobile Responsiveness Testing'));
  
  appendToReport('# Mobile Responsiveness Test Results\n');
  appendToReport(`Test Date: ${new Date().toLocaleString()}\n`);
  
  // Run test phases
  await captureScreenshots();
  await runAccessibilityChecks();
  await testInteractiveElements();
  
  // Final summary
  appendToReport('\n## Test Summary\n');
  appendToReport('This automated test suite checked:');
  appendToReport('1. Visual display of key pages across various mobile device sizes');
  appendToReport('2. Accessibility compliance on mobile viewports');
  appendToReport('3. Functionality of critical interactive elements on small screens\n');
  
  console.log(chalk.blue(`\nMobile responsiveness testing complete! Report saved to: ${reportPath}`));
}

// Run the test suite
runMobileTests().catch(err => {
  console.error(chalk.red('Fatal error in mobile testing:'), err);
  process.exit(1);
}); 