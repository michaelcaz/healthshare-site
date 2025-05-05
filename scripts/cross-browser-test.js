const { exec, execSync } = require('child_process');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const BROWSER_CONFIG = [
  { name: 'chrome', displayName: 'Google Chrome' },
  { name: 'firefox', displayName: 'Mozilla Firefox' },
  { name: 'edge', displayName: 'Microsoft Edge' },
  { name: 'electron', displayName: 'Electron' },
  { name: 'safari', displayName: 'Safari', available: process.platform === 'darwin' }
];

// Mobile viewport presets
const MOBILE_VIEWPORTS = [
  { width: 375, height: 667, name: 'iPhone SE' },
  { width: 390, height: 844, name: 'iPhone 12/13/14' },
  { width: 428, height: 926, name: 'iPhone 12/13/14 Pro Max' },
  { width: 360, height: 800, name: 'Android (Small)' },
  { width: 412, height: 915, name: 'Android (Medium)' },
  { width: 480, height: 1024, name: 'Android (Large)' }
];

// Key pages to test in every browser
const KEY_PAGES = [
  '/',
  '/questionnaire',
  '/plans',
  '/auth/login',
  '/auth/signup',
  '/blog'
];

// Generate a timestamp for reports
const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '-');
const reportDir = path.join(__dirname, '..', 'reports', `cross-browser-${timestamp}`);

// Ensure report directory exists
if (!fs.existsSync(reportDir)) {
  fs.mkdirSync(reportDir, { recursive: true });
}

// Create a summary file
const summaryPath = path.join(reportDir, 'summary.md');
fs.writeFileSync(summaryPath, `# Cross-Browser Testing Summary\nDate: ${new Date().toLocaleString()}\n\n`);

// Helper function to append to summary
function appendToSummary(content) {
  fs.appendFileSync(summaryPath, content + '\n');
  console.log(content);
}

// Function to run Cypress tests with specific configuration
function runCypressTests(browser, viewport = null) {
  return new Promise((resolve, reject) => {
    const browserConfig = BROWSER_CONFIG.find(b => b.name === browser);
    
    // Skip if browser is marked as unavailable (e.g., Safari on non-macOS)
    if (browserConfig.available === false) {
      appendToSummary(`⚠️ Skipping tests on ${browserConfig.displayName}: Browser not available on this platform`);
      resolve({ browser, viewport, success: true, skipped: true });
      return;
    }
    
    let configArgs = `--browser ${browser}`;
    
    // Add viewport config if provided
    if (viewport) {
      configArgs += ` --config viewportWidth=${viewport.width},viewportHeight=${viewport.height}`;
    }
    
    const displayName = viewport 
      ? `${browserConfig.displayName} (${viewport.name})`
      : browserConfig.displayName;
    
    appendToSummary(`\n## Running tests on ${displayName}`);
    
    const command = `npx cypress run ${configArgs}`;
    console.log(chalk.blue(`Running: ${command}`));
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        // Check if this is because the browser isn't installed
        if (stderr && stderr.includes('browser not installed')) {
          appendToSummary(`⚠️ ${displayName} is not installed on this system.`);
          appendToSummary('Please install the browser or run tests on a system with this browser installed.');
          resolve({ browser, viewport, success: false, notInstalled: true });
          return;
        }
        
        appendToSummary(`❌ Error running tests on ${displayName}:`);
        appendToSummary('```');
        appendToSummary(error.message);
        appendToSummary('```');
        resolve({ browser, viewport, success: false, error: error.message });
        return;
      }
      
      appendToSummary(`✅ Tests completed successfully on ${displayName}`);
      appendToSummary('```');
      appendToSummary(stdout);
      appendToSummary('```');
      
      resolve({ browser, viewport, success: true });
    });
  });
}

// Function to test a specific page in a browser
function testSpecificPage(browser, page, viewport = null) {
  return new Promise((resolve, reject) => {
    const browserConfig = BROWSER_CONFIG.find(b => b.name === browser);
    
    // Skip if browser is marked as unavailable
    if (browserConfig.available === false) {
      resolve({ page, browser, viewport, success: true, skipped: true });
      return;
    }
    
    let configArgs = `--browser ${browser} --spec "cypress/e2e/page-tests/${page.replace(/\//g, '-')}.cy.js"`;
    
    if (viewport) {
      configArgs += ` --config viewportWidth=${viewport.width},viewportHeight=${viewport.height}`;
    }
    
    const displayName = viewport 
      ? `${browserConfig.displayName} (${viewport.name})`
      : browserConfig.displayName;
    
    const command = `npx cypress run ${configArgs}`;
    console.log(chalk.yellow(`Testing page ${page} on ${displayName}`));
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        // Check if this is because the browser isn't installed
        if (stderr && stderr.includes('browser not installed')) {
          console.log(chalk.yellow(`⚠️ ${displayName} is not installed on this system.`));
          resolve({ page, browser, viewport, success: false, notInstalled: true });
          return;
        }
        
        console.log(chalk.red(`❌ Error testing ${page} on ${displayName}`));
        resolve({ page, browser, viewport, success: false, error: error.message });
        return;
      }
      
      console.log(chalk.green(`✅ Successfully tested ${page} on ${displayName}`));
      resolve({ page, browser, viewport, success: true });
    });
  });
}

// Function to check if Safari is properly configured for Cypress
async function checkSafariConfiguration() {
  if (process.platform !== 'darwin') {
    console.log(chalk.yellow('Safari testing is only available on macOS.'));
    return false;
  }
  
  try {
    // Check if Safari is available in Cypress
    const stdout = execSync('npx cypress info --browser', { encoding: 'utf8' });
    
    if (!stdout.includes('safari')) {
      console.log(chalk.yellow('Safari not detected in Cypress browsers. Adding Safari configuration...'));
      appendToSummary('\n## Safari Configuration');
      appendToSummary('Safari is not automatically configured with Cypress. Follow these steps to enable Safari testing:');
      appendToSummary('');
      appendToSummary('1. Enable Safari\'s Develop menu:');
      appendToSummary('   - Open Safari');
      appendToSummary('   - Go to Safari > Preferences > Advanced');
      appendToSummary('   - Check "Show Develop menu in menu bar"');
      appendToSummary('');
      appendToSummary('2. Enable Remote Automation:');
      appendToSummary('   - In Safari, select Develop > Allow Remote Automation');
      appendToSummary('');
      appendToSummary('3. Install Cypress Safari driver:');
      appendToSummary('   ```bash');
      appendToSummary('   npm install @cypress/safari-webdriver --save-dev');
      appendToSummary('   ```');
      appendToSummary('');
      appendToSummary('4. Add Safari to cypress.config.js:');
      appendToSummary('   ```javascript');
      appendToSummary('   // Include in e2e configuration');
      appendToSummary('   browsers: [');
      appendToSummary('     { name: "safari", family: "webkit", channel: "stable" }');
      appendToSummary('   ]');
      appendToSummary('   ```');
      
      return false;
    }
    
    return true;
  } catch (error) {
    console.error(chalk.red('Error checking Safari configuration:'), error);
    return false;
  }
}

// Main function to run all tests
async function runAllTests() {
  console.log(chalk.green('Starting Cross-Browser Testing Suite'));
  appendToSummary('# Browser Compatibility Test Results');
  
  // Check Safari configuration on macOS
  if (process.platform === 'darwin') {
    const safariAvailable = await checkSafariConfiguration();
    // Update Safari availability in browser config
    const safariConfig = BROWSER_CONFIG.find(b => b.name === 'safari');
    if (safariConfig) {
      safariConfig.available = safariAvailable;
    }
  }
  
  const results = [];
  
  // Run full test suite on desktop browsers
  for (const browser of BROWSER_CONFIG) {
    try {
      const result = await runCypressTests(browser.name);
      results.push(result);
    } catch (err) {
      console.error(chalk.red(`Error running tests on ${browser.name}:`), err);
    }
  }
  
  // Run mobile viewport tests on Chrome (as it's the most similar to mobile browsers)
  appendToSummary('\n# Mobile Viewport Testing (Chrome)');
  
  for (const viewport of MOBILE_VIEWPORTS) {
    try {
      const result = await runCypressTests('chrome', viewport);
      results.push(result);
    } catch (err) {
      console.error(chalk.red(`Error running tests on mobile viewport ${viewport.name}:`), err);
    }
  }
  
  // Also run iPhone viewport tests on Safari if available (for more accurate iOS testing)
  if (process.platform === 'darwin' && BROWSER_CONFIG.find(b => b.name === 'safari').available) {
    appendToSummary('\n# iOS Safari Viewport Testing');
    
    const iPhoneViewports = MOBILE_VIEWPORTS.filter(v => v.name.includes('iPhone'));
    
    for (const viewport of iPhoneViewports) {
      try {
        const result = await runCypressTests('safari', viewport);
        results.push(result);
      } catch (err) {
        console.error(chalk.red(`Error running tests on Safari mobile viewport ${viewport.name}:`), err);
      }
    }
  }
  
  // Summary 
  appendToSummary('\n# Summary');
  
  const successCount = results.filter(r => r.success && !r.skipped).length;
  const skippedCount = results.filter(r => r.skipped).length;
  const notInstalledCount = results.filter(r => r.notInstalled).length;
  const totalTests = results.length - skippedCount;
  
  appendToSummary(`\nTests completed: ${successCount}/${totalTests} successful`);
  
  if (skippedCount > 0) {
    appendToSummary(`Tests skipped: ${skippedCount} (browser not available on this platform)`);
  }
  
  if (notInstalledCount > 0) {
    appendToSummary(`\n⚠️ ${notInstalledCount} tests could not run because the browser is not installed.`);
  }
  
  if (successCount === totalTests - notInstalledCount) {
    appendToSummary('\n✅ All available browser tests passed successfully!');
  } else {
    appendToSummary('\n⚠️ Some tests failed. Review the logs above for details.');
    
    // List failures
    appendToSummary('\n## Failed Tests:');
    results.filter(r => !r.success && !r.notInstalled && !r.skipped).forEach(failure => {
      const browserName = BROWSER_CONFIG.find(b => b.name === failure.browser)?.displayName || failure.browser;
      const viewportInfo = failure.viewport ? ` (${failure.viewport.name})` : '';
      appendToSummary(`- ${browserName}${viewportInfo}`);
    });
  }
  
  // Safari specific notes if on non-macOS
  if (process.platform !== 'darwin') {
    appendToSummary('\n## Safari Testing');
    appendToSummary('Safari tests were skipped because Safari is only available on macOS.');
    appendToSummary('To test Safari compatibility, run this script on a macOS system.');
  }
  
  console.log(chalk.blue(`\nTesting complete! Report saved to: ${summaryPath}`));
}

// Run the test suite
runAllTests().catch(err => {
  console.error(chalk.red('Fatal error in test runner:'), err);
  process.exit(1);
}); 