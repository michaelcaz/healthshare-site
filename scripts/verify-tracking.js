const { exec } = require('child_process');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Configuration
const BASE_URL = process.env.VERIFY_URL || 'http://localhost:3003';
const HEADLESS = process.env.HEADLESS !== 'false'; // Default to headless mode
const OUTPUT_DIR = path.join(__dirname, '..', 'reports', 'tracking-verification');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Create report file
const reportPath = path.join(OUTPUT_DIR, 'tracking-verification-report.md');
const timestamp = new Date().toISOString();
fs.writeFileSync(reportPath, `# Tracking & Analytics Verification Report\nDate: ${new Date(timestamp).toLocaleString()}\n\n`);

// Helper to append to report
function appendToReport(content) {
  fs.appendFileSync(reportPath, content + '\n');
  console.log(content);
}

// Tracking systems to verify
const TRACKING_SYSTEMS = [
  {
    name: 'Google Analytics 4',
    detectionMethods: [
      { type: 'script', pattern: /google-analytics\.com\/g\/collect|gtag\.js/ },
      { type: 'object', name: 'dataLayer' },
      { type: 'object', name: 'gtag' }
    ],
    networkRequests: [
      { includes: 'google-analytics.com/g/collect' }
    ],
    eventsToTrigger: [
      { name: 'Page View', action: async (page) => {
        // Page view is automatically triggered
        await page.waitForTimeout(1000);
      }},
      { name: 'Click Tracking', action: async (page) => {
        await page.click('a[href="/plans"]');
        await page.waitForNavigation();
      }},
      { name: 'Form Interaction', action: async (page) => {
        await page.goto(`${BASE_URL}/questionnaire`, { waitUntil: 'networkidle2' });
        await page.click('[data-testid="start-questionnaire-button"]');
        await page.waitForNavigation();
      }}
    ]
  },
  {
    name: 'ConvertKit Integration',
    detectionMethods: [
      { type: 'script', pattern: /convertkit\.com/ },
      { type: 'element', selector: 'form[data-sv-form]' }
    ],
    networkRequests: [
      { includes: 'convertkit.com' }
    ],
    eventsToTrigger: [
      { name: 'Newsletter Signup', action: async (page) => {
        await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
        // Find the newsletter form
        const formExists = await page.$('form[data-testid="newsletter-form"]');
        
        if (formExists) {
          await page.type('input[name="email"]', `test_${Date.now()}@example.com`);
          await page.click('button[data-testid="newsletter-submit"]');
          await page.waitForTimeout(2000);
        } else {
          throw new Error('Newsletter form not found');
        }
      }}
    ]
  },
  {
    name: 'Affiliate Tracking',
    detectionMethods: [
      { type: 'localStorage', key: 'affiliate_id' },
      { type: 'cookie', name: 'affiliate_id' }
    ],
    networkRequests: [
      { includes: '/api/track-affiliate' }
    ],
    eventsToTrigger: [
      { name: 'Affiliate Link Click', action: async (page) => {
        await page.goto(`${BASE_URL}/plans`, { waitUntil: 'networkidle2' });
        // Find and click an affiliate link
        const buttonExists = await page.$('[data-testid="plan-card"] a[data-affiliate="true"]');
        
        if (buttonExists) {
          // Create a new page for the click to avoid navigating away
          const newPagePromise = new Promise(resolve => 
            page.browser().once('targetcreated', target => resolve(target.page()))
          );
          
          await buttonExists.click();
          const newPage = await newPagePromise;
          await newPage.waitForTimeout(1000);
          await newPage.close();
        } else {
          throw new Error('Affiliate link not found');
        }
      }}
    ]
  },
  {
    name: 'Facebook Pixel',
    detectionMethods: [
      { type: 'script', pattern: /connect\.facebook\.net.*fbevents\.js/ },
      { type: 'object', name: 'fbq' },
      { type: 'object', name: '_fbq' }
    ],
    networkRequests: [
      { includes: 'facebook.com/tr' },
      { includes: 'connect.facebook.net' }
    ],
    eventsToTrigger: [
      { name: 'Page View', action: async (page) => {
        // Page view is automatically triggered
        await page.waitForTimeout(1000);
      }},
      { name: 'Questionnaire Start', action: async (page) => {
        await page.goto(`${BASE_URL}/questionnaire`, { waitUntil: 'networkidle2' });
        await page.click('[data-testid="start-questionnaire-button"]');
        await page.waitForTimeout(2000);
      }},
      { name: 'Email Capture', action: async (page) => {
        await page.goto(`${BASE_URL}/questionnaire/email-capture`, { waitUntil: 'networkidle2' });
        const emailInput = await page.$('input[name="email"]');
        if (emailInput) {
          await page.type('input[name="email"]', `test_${Date.now()}@example.com`);
          await page.type('input[name="firstName"]', 'Test');
          await page.type('input[name="phone"]', '5551234567');
          await page.click('input[name="marketingConsent"]');
          await page.waitForTimeout(1000);
        }
      }}
    ]
  }
];

// Function to check if tracking system is implemented
async function verifyTrackingSystem(browser, system) {
  const page = await browser.newPage();
  
  // Setup network request monitoring
  const networkRequests = [];
  page.on('request', request => {
    networkRequests.push(request.url());
  });
  
  // Array to store detection results
  const detectionResults = [];
  
  try {
    console.log(chalk.blue(`Verifying ${system.name}...`));
    
    // Visit homepage first
    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
    
    // Check implementation using detection methods
    for (const method of system.detectionMethods) {
      let detected = false;
      
      if (method.type === 'script') {
        // Check page source for script pattern
        const content = await page.content();
        detected = method.pattern.test(content);
        detectionResults.push({
          method: `Script (${method.pattern})`,
          detected
        });
      } else if (method.type === 'object') {
        // Check for global JavaScript object
        detected = await page.evaluate((objName) => {
          return typeof window[objName] !== 'undefined';
        }, method.name);
        detectionResults.push({
          method: `JavaScript Object (${method.name})`,
          detected
        });
      } else if (method.type === 'element') {
        // Check for DOM element
        detected = await page.$(method.selector) !== null;
        detectionResults.push({
          method: `DOM Element (${method.selector})`,
          detected
        });
      } else if (method.type === 'localStorage') {
        // Check localStorage
        detected = await page.evaluate((key) => {
          return localStorage.getItem(key) !== null;
        }, method.key);
        detectionResults.push({
          method: `localStorage (${method.key})`,
          detected
        });
      } else if (method.type === 'cookie') {
        // Check cookies
        const cookies = await page.cookies();
        detected = cookies.some(cookie => cookie.name === method.name);
        detectionResults.push({
          method: `Cookie (${method.name})`,
          detected
        });
      }
    }
    
    // Test events
    const eventResults = [];
    for (const event of system.eventsToTrigger) {
      try {
        console.log(chalk.blue(`  Testing event: ${event.name}`));
        
        // Clear previous network requests
        networkRequests.length = 0;
        
        // Trigger the event
        await event.action(page);
        
        // Check if any of the expected network requests were made
        const matchingRequests = system.networkRequests.filter(req => 
          networkRequests.some(url => url.includes(req.includes))
        );
        
        const successful = matchingRequests.length > 0;
        
        eventResults.push({
          name: event.name,
          successful,
          matchingRequests: matchingRequests.length
        });
        
        // Take screenshot after event
        const screenshotPath = path.join(OUTPUT_DIR, `${system.name.replace(/\s+/g, '-')}-${event.name.replace(/\s+/g, '-')}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true });
        
      } catch (error) {
        console.error(chalk.red(`  Error testing event ${event.name}:`), error);
        eventResults.push({
          name: event.name,
          successful: false,
          error: error.message
        });
      }
    }
    
    // Determine overall implementation status
    const implementationScore = detectionResults.filter(r => r.detected).length / detectionResults.length;
    const eventsScore = eventResults.filter(r => r.successful).length / eventResults.length;
    
    let implementationStatus;
    if (implementationScore >= 0.8) {
      implementationStatus = 'Fully Implemented';
    } else if (implementationScore >= 0.5) {
      implementationStatus = 'Partially Implemented';
    } else if (implementationScore > 0) {
      implementationStatus = 'Minimally Implemented';
    } else {
      implementationStatus = 'Not Implemented';
    }
    
    let eventsStatus;
    if (eventsScore >= 0.8) {
      eventsStatus = 'Working Correctly';
    } else if (eventsScore >= 0.5) {
      eventsStatus = 'Partially Working';
    } else if (eventsScore > 0) {
      eventsStatus = 'Mostly Broken';
    } else {
      eventsStatus = 'Not Working';
    }
    
    return {
      name: system.name,
      implementationStatus,
      eventsStatus,
      detectionResults,
      eventResults,
      implementationScore,
      eventsScore
    };
  } catch (error) {
    console.error(chalk.red(`Error verifying ${system.name}:`), error);
    return {
      name: system.name,
      implementationStatus: 'Error During Verification',
      eventsStatus: 'Error During Verification',
      detectionResults,
      eventResults: [],
      error: error.message
    };
  } finally {
    await page.close();
  }
}

// Main function
async function verifyTracking() {
  console.log(chalk.green('Starting Tracking & Analytics Verification'));
  appendToReport('# Tracking & Analytics Verification Results\n');
  
  const browser = await puppeteer.launch({ 
    headless: HEADLESS,
    defaultViewport: { width: 1280, height: 800 }
  });
  
  try {
    const results = [];
    
    for (const system of TRACKING_SYSTEMS) {
      const result = await verifyTrackingSystem(browser, system);
      results.push(result);
      
      appendToReport(`## ${result.name}\n`);
      appendToReport(`Implementation Status: **${result.implementationStatus}**`);
      appendToReport(`Events Status: **${result.eventsStatus}**\n`);
      
      if (result.error) {
        appendToReport(`Error: ${result.error}\n`);
      }
      
      appendToReport('### Implementation Detection\n');
      
      appendToReport('| Detection Method | Result |');
      appendToReport('|-----------------|--------|');
      result.detectionResults.forEach(detection => {
        appendToReport(`| ${detection.method} | ${detection.detected ? '✅ Detected' : '❌ Not Detected'} |`);
      });
      
      appendToReport('\n### Event Testing\n');
      
      appendToReport('| Event | Result |');
      appendToReport('|-------|--------|');
      result.eventResults.forEach(event => {
        const resultText = event.error 
          ? `❌ Error: ${event.error}` 
          : (event.successful ? '✅ Working' : '❌ Not Working');
        appendToReport(`| ${event.name} | ${resultText} |`);
      });
      
      appendToReport('\n');
    }
    
    // Overall summary
    appendToReport('## Overall Summary\n');
    
    appendToReport('| System | Implementation | Events |');
    appendToReport('|--------|----------------|--------|');
    results.forEach(result => {
      appendToReport(`| ${result.name} | ${result.implementationStatus} | ${result.eventsStatus} |`);
    });
    
    // Recommendations
    appendToReport('\n## Recommendations\n');
    
    const needsAttention = results.filter(r => 
      r.implementationScore < 0.8 || r.eventsScore < 0.8 || r.error
    );
    
    if (needsAttention.length === 0) {
      appendToReport('✅ All tracking systems appear to be working correctly. No action needed.');
    } else {
      appendToReport('The following tracking systems need attention:');
      
      needsAttention.forEach(system => {
        appendToReport(`\n### ${system.name}\n`);
        
        if (system.error) {
          appendToReport(`⚠️ Error during verification: ${system.error}`);
        }
        
        if (system.implementationScore < 0.8) {
          appendToReport('⚠️ Implementation issues detected:');
          system.detectionResults.filter(d => !d.detected).forEach(detection => {
            appendToReport(`- ${detection.method} was not detected`);
          });
        }
        
        if (system.eventsScore < 0.8) {
          appendToReport('⚠️ Event tracking issues detected:');
          system.eventResults.filter(e => !e.successful).forEach(event => {
            appendToReport(`- "${event.name}" event is not working${event.error ? `: ${event.error}` : ''}`);
          });
        }
      });
    }
    
    console.log(chalk.blue(`\nVerification complete! Report saved to: ${reportPath}`));
    
    return results;
  } finally {
    await browser.close();
  }
}

// Run the verification
verifyTracking().catch(err => {
  console.error(chalk.red('Fatal error in tracking verification:'), err);
  process.exit(1);
});

/*
To run this script:
1. Install puppeteer: npm install puppeteer
2. Set environment variables:
   - VERIFY_URL: Target URL to test (default: http://localhost:3003)
   - HEADLESS: Set to "false" to see browser (default: true)
3. Run script:
   node scripts/verify-tracking.js
*/ 