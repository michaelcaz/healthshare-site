const { exec } = require('child_process');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Configuration
const BASE_URL = process.env.VERIFY_URL || 'http://localhost:3003';
const HEADLESS = process.env.HEADLESS !== 'false'; // Default to headless mode
const OUTPUT_DIR = path.join(__dirname, '..', 'reports', 'form-verification');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Create report file
const reportPath = path.join(OUTPUT_DIR, 'form-verification-report.md');
const timestamp = new Date().toISOString();
fs.writeFileSync(reportPath, `# Form Verification Report\nDate: ${new Date(timestamp).toLocaleString()}\n\n`);

// Helper to append to report
function appendToReport(content) {
  fs.appendFileSync(reportPath, content + '\n');
  console.log(content);
}

// Forms to test
const FORMS = [
  {
    name: 'Login Form',
    url: '/auth/login',
    fields: [
      { selector: 'input[type="email"]', value: 'test@example.com' },
      { selector: 'input[type="password"]', value: 'TestPassword123!' }
    ],
    submitButton: 'button[type="submit"]',
    expectation: {
      success: {
        redirectUrl: '/dashboard',
        element: 'h1'
      },
      failure: {
        errorElement: '[data-testid="auth-error"]'
      }
    }
  },
  {
    name: 'Signup Form',
    url: '/auth/signup',
    fields: [
      { selector: 'input[name="email"]', value: `test_${Date.now()}@example.com` },
      { selector: 'input[name="password"]', value: 'TestPassword123!' },
      { selector: 'input[name="confirmPassword"]', value: 'TestPassword123!' }
    ],
    submitButton: 'button[type="submit"]',
    expectation: {
      success: {
        redirectUrl: '/dashboard',
        element: 'h1'
      },
      failure: {
        errorElement: '[data-testid="auth-error"]'
      }
    }
  },
  {
    name: 'Contact Form',
    url: '/contact',
    fields: [
      { selector: 'input[name="name"]', value: 'Test User' },
      { selector: 'input[name="email"]', value: 'test@example.com' },
      { selector: 'textarea[name="message"]', value: 'This is a test message from the automated form verification script.' }
    ],
    submitButton: 'button[type="submit"]',
    expectation: {
      success: {
        element: '[data-testid="submission-success"]'
      },
      failure: {
        errorElement: '[data-testid="submission-error"]'
      }
    }
  },
  {
    name: 'Newsletter Signup',
    url: '/', // Assuming this is on the homepage
    fields: [
      { selector: 'input[name="email"]', value: `newsletter_${Date.now()}@example.com` }
    ],
    submitButton: 'button[data-testid="newsletter-submit"]',
    expectation: {
      success: {
        element: '[data-testid="newsletter-success"]'
      },
      failure: {
        errorElement: '[data-testid="newsletter-error"]'
      }
    }
  },
  {
    name: 'Search Form',
    url: '/blog',
    fields: [
      { selector: 'input[name="search"]', value: 'health' }
    ],
    submitButton: 'button[data-testid="search-submit"]',
    expectation: {
      success: {
        element: '[data-testid="search-results"]'
      },
      failure: {
        errorElement: '[data-testid="search-no-results"]'
      }
    }
  }
];

// Flows to test
const FLOWS = [
  {
    name: 'Full Questionnaire Flow',
    steps: [
      {
        url: '/questionnaire',
        action: async (page) => {
          await page.click('[data-testid="start-questionnaire-button"]');
          await page.waitForNavigation();
        },
        expectation: {
          url: '/questionnaire/step/1'
        }
      },
      {
        action: async (page) => {
          // Step 1 - Basic info
          await page.type('input[name="fullName"]', 'Test User');
          await page.click('[data-testid="next-button"]');
          await page.waitForNavigation();
        },
        expectation: {
          url: '/questionnaire/step/2'
        }
      },
      {
        action: async (page) => {
          // Step 2 - Age
          await page.type('input[name="age"]', '35');
          await page.click('[data-testid="next-button"]');
          await page.waitForNavigation();
        },
        expectation: {
          url: '/questionnaire/step/3'
        }
      },
      {
        action: async (page) => {
          // Step 3 - Household size
          await page.type('input[name="householdSize"]', '3');
          await page.click('[data-testid="next-button"]');
          await page.waitForNavigation();
        },
        expectation: {
          url: '/questionnaire/step/4'
        }
      },
      {
        action: async (page) => {
          // Step 4 - Household income
          await page.type('input[name="householdIncome"]', '75000');
          await page.click('[data-testid="next-button"]');
          await page.waitForNavigation();
        },
        expectation: {
          url: '/questionnaire/step/5'
        }
      },
      {
        action: async (page) => {
          // Step 5 - ZIP code
          await page.type('input[name="zipCode"]', '90210');
          await page.click('[data-testid="next-button"]');
          await page.waitForNavigation();
        },
        expectation: {
          url: '/questionnaire/step/6'
        }
      },
      {
        action: async (page) => {
          // Step 6 - Final questions
          await page.click('input[name="isSmoker"][value="false"]');
          await page.click('[data-testid="submit-button"]');
          await page.waitForNavigation({ timeout: 60000 }); // Give extra time for calculation
        },
        expectation: {
          url: '/plans',
          element: '[data-testid="plan-results"]'
        }
      }
    ]
  },
  {
    name: 'Blog to Article Flow',
    steps: [
      {
        url: '/blog',
        action: async (page) => {
          // Click on the first blog post
          await page.click('[data-testid="blog-card"]:first-child a');
          await page.waitForNavigation();
        },
        expectation: {
          urlPattern: /\/blog\/[\w-]+/,
          element: 'article'
        }
      }
    ]
  },
  {
    name: 'Plan Details Flow',
    steps: [
      {
        url: '/plans',
        action: async (page) => {
          // Click on View Details for the first plan
          await page.click('[data-testid="plan-card"]:first-child [data-testid="view-details-button"]');
          await page.waitForSelector('[data-testid="plan-details-modal"]', { visible: true });
        },
        expectation: {
          element: '[data-testid="plan-details-modal"]'
        }
      }
    ]
  }
];

// Function to test a form
async function testForm(browser, form) {
  const page = await browser.newPage();
  let success = false;
  let errorMessage = '';
  
  try {
    console.log(chalk.blue(`Testing ${form.name}...`));
    
    // Navigate to the form
    await page.goto(`${BASE_URL}${form.url}`, { waitUntil: 'networkidle2' });
    
    // Fill out form fields
    for (const field of form.fields) {
      await page.waitForSelector(field.selector);
      await page.type(field.selector, field.value);
    }
    
    // Take a screenshot before submitting
    const screenshotBefore = path.join(OUTPUT_DIR, `${form.name.replace(/\s+/g, '-')}-before.png`);
    await page.screenshot({ path: screenshotBefore, fullPage: true });
    
    // Submit the form
    await Promise.all([
      page.click(form.submitButton),
      // Wait for either success or error indicators
      page.waitForResponse(
        (response) => response.url().includes(BASE_URL),
        { timeout: 10000 }
      ).catch(() => {})
    ]);
    
    // Wait a moment for any client-side validation or redirects
    await page.waitForTimeout(2000);
    
    // Take a screenshot after submitting
    const screenshotAfter = path.join(OUTPUT_DIR, `${form.name.replace(/\s+/g, '-')}-after.png`);
    await page.screenshot({ path: screenshotAfter, fullPage: true });
    
    // Check for success or failure
    if (form.expectation.success.redirectUrl) {
      // If we expect a redirect
      const currentUrl = page.url();
      success = currentUrl.includes(form.expectation.success.redirectUrl);
      
      if (!success) {
        errorMessage = `Expected redirect to URL containing "${form.expectation.success.redirectUrl}", but got "${currentUrl}"`;
      }
    } else if (form.expectation.success.element) {
      // If we expect a success element
      success = await page.$(form.expectation.success.element) !== null;
      
      if (!success) {
        // Check if there's an error element
        const hasError = await page.$(form.expectation.failure.errorElement) !== null;
        
        if (hasError) {
          const errorText = await page.$eval(form.expectation.failure.errorElement, el => el.textContent);
          errorMessage = `Form submission failed with error: ${errorText}`;
        } else {
          errorMessage = `Success element "${form.expectation.success.element}" not found and no error message detected`;
        }
      }
    }
    
    return {
      name: form.name,
      success,
      errorMessage,
      screenshotBefore: path.relative(OUTPUT_DIR, screenshotBefore),
      screenshotAfter: path.relative(OUTPUT_DIR, screenshotAfter)
    };
  } catch (error) {
    console.error(chalk.red(`Error testing ${form.name}:`), error);
    return {
      name: form.name,
      success: false,
      errorMessage: error.message
    };
  } finally {
    await page.close();
  }
}

// Function to test a flow
async function testFlow(browser, flow) {
  const page = await browser.newPage();
  const screenshots = [];
  let success = true;
  let errorMessage = '';
  
  try {
    console.log(chalk.blue(`Testing ${flow.name}...`));
    
    for (let i = 0; i < flow.steps.length; i++) {
      const step = flow.steps[i];
      
      // Navigate to URL if provided
      if (step.url) {
        await page.goto(`${BASE_URL}${step.url}`, { waitUntil: 'networkidle2' });
      }
      
      // Take screenshot before action
      const screenshotBefore = path.join(OUTPUT_DIR, `${flow.name.replace(/\s+/g, '-')}-step${i+1}-before.png`);
      await page.screenshot({ path: screenshotBefore, fullPage: true });
      screenshots.push(path.relative(OUTPUT_DIR, screenshotBefore));
      
      // Perform action
      await step.action(page);
      
      // Take screenshot after action
      const screenshotAfter = path.join(OUTPUT_DIR, `${flow.name.replace(/\s+/g, '-')}-step${i+1}-after.png`);
      await page.screenshot({ path: screenshotAfter, fullPage: true });
      screenshots.push(path.relative(OUTPUT_DIR, screenshotAfter));
      
      // Verify expectations
      if (step.expectation.url) {
        const currentUrl = page.url();
        if (!currentUrl.includes(step.expectation.url)) {
          success = false;
          errorMessage = `Expected URL containing "${step.expectation.url}", but got "${currentUrl}"`;
          break;
        }
      }
      
      if (step.expectation.urlPattern) {
        const currentUrl = page.url();
        if (!step.expectation.urlPattern.test(currentUrl)) {
          success = false;
          errorMessage = `URL "${currentUrl}" does not match pattern ${step.expectation.urlPattern}`;
          break;
        }
      }
      
      if (step.expectation.element) {
        const elementExists = await page.$(step.expectation.element) !== null;
        if (!elementExists) {
          success = false;
          errorMessage = `Expected element "${step.expectation.element}" not found`;
          break;
        }
      }
    }
    
    return {
      name: flow.name,
      success,
      errorMessage,
      screenshots
    };
  } catch (error) {
    console.error(chalk.red(`Error testing ${flow.name}:`), error);
    return {
      name: flow.name,
      success: false,
      errorMessage: error.message,
      screenshots
    };
  } finally {
    await page.close();
  }
}

// Main function
async function verifyFormsAndFlows() {
  console.log(chalk.green('Starting Form and Flow Verification'));
  appendToReport('# Form and Flow Verification Results\n');
  
  const browser = await puppeteer.launch({ 
    headless: HEADLESS,
    defaultViewport: { width: 1280, height: 800 }
  });
  
  try {
    // Test all forms
    appendToReport('## Form Testing Results\n');
    
    const formResults = [];
    for (const form of FORMS) {
      const result = await testForm(browser, form);
      formResults.push(result);
      
      appendToReport(`### ${result.name}`);
      appendToReport(`Status: ${result.success ? '✅ PASSED' : '❌ FAILED'}`);
      
      if (!result.success) {
        appendToReport(`Error: ${result.errorMessage}`);
      }
      
      if (result.screenshotBefore && result.screenshotAfter) {
        appendToReport('\nScreenshots:');
        appendToReport(`- [Before Submission](${result.screenshotBefore})`);
        appendToReport(`- [After Submission](${result.screenshotAfter})`);
      }
      
      appendToReport('\n');
    }
    
    // Test all flows
    appendToReport('## Flow Testing Results\n');
    
    const flowResults = [];
    for (const flow of FLOWS) {
      const result = await testFlow(browser, flow);
      flowResults.push(result);
      
      appendToReport(`### ${result.name}`);
      appendToReport(`Status: ${result.success ? '✅ PASSED' : '❌ FAILED'}`);
      
      if (!result.success) {
        appendToReport(`Error: ${result.errorMessage}`);
      }
      
      if (result.screenshots.length > 0) {
        appendToReport('\nScreenshots:');
        for (let i = 0; i < result.screenshots.length; i += 2) {
          const stepNumber = Math.floor(i / 2) + 1;
          appendToReport(`- Step ${stepNumber}:`);
          appendToReport(`  - [Before Action](${result.screenshots[i]})`);
          
          if (i + 1 < result.screenshots.length) {
            appendToReport(`  - [After Action](${result.screenshots[i + 1]})`);
          }
        }
      }
      
      appendToReport('\n');
    }
    
    // Summary
    appendToReport('## Summary\n');
    
    const totalForms = formResults.length;
    const passedForms = formResults.filter(r => r.success).length;
    
    const totalFlows = flowResults.length;
    const passedFlows = flowResults.filter(r => r.success).length;
    
    appendToReport(`Forms: ${passedForms}/${totalForms} passed`);
    appendToReport(`Flows: ${passedFlows}/${totalFlows} passed`);
    
    const allPassed = passedForms === totalForms && passedFlows === totalFlows;
    
    appendToReport(`\nOverall Status: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
    
    if (!allPassed) {
      appendToReport('\n### Failed Tests:');
      
      formResults.filter(r => !r.success).forEach(failure => {
        appendToReport(`- Form: ${failure.name} - ${failure.errorMessage}`);
      });
      
      flowResults.filter(r => !r.success).forEach(failure => {
        appendToReport(`- Flow: ${failure.name} - ${failure.errorMessage}`);
      });
    }
    
    console.log(chalk.blue(`\nVerification complete! Report saved to: ${reportPath}`));
    
    return {
      success: allPassed,
      formsPassed: passedForms,
      formsTotal: totalForms,
      flowsPassed: passedFlows,
      flowsTotal: totalFlows
    };
  } finally {
    await browser.close();
  }
}

// Run the verification
verifyFormsAndFlows().catch(err => {
  console.error(chalk.red('Fatal error in verification:'), err);
  process.exit(1);
});

/*
To run this script:
1. Install puppeteer: npm install puppeteer
2. Set environment variables:
   - VERIFY_URL: Target URL to test (default: http://localhost:3003)
   - HEADLESS: Set to "false" to see browser (default: true)
3. Run script:
   node scripts/verify-forms.js
*/ 