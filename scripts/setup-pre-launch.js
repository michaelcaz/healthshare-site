#!/usr/bin/env node

const { execSync } = require('child_process');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

console.log(chalk.blue('=================================='));
console.log(chalk.blue('Pre-Launch Tools Setup'));
console.log(chalk.blue('=================================='));
console.log('');

// Create reports directory
const reportsDir = path.join(__dirname, '..', 'reports');
if (!fs.existsSync(reportsDir)) {
  console.log(chalk.yellow('Creating reports directory...'));
  fs.mkdirSync(reportsDir, { recursive: true });
  console.log(chalk.green('✓ Reports directory created'));
} else {
  console.log(chalk.green('✓ Reports directory already exists'));
}

// Function to execute shell commands safely
function execCommand(command, errorMessage) {
  try {
    console.log(chalk.yellow(`Executing: ${command}`));
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(chalk.red(`Error: ${errorMessage || error.message}`));
    return false;
  }
}

// Install npm dependencies
console.log(chalk.blue('\nInstalling npm dependencies...'));
execCommand('npm install --save-dev puppeteer k6 @axe-core/puppeteer @cypress/safari-webdriver', 'Failed to install puppeteer, k6, and Safari WebDriver');

// Check if Cypress is installed
console.log(chalk.blue('\nVerifying Cypress installation...'));
try {
  execSync('npx cypress verify', { stdio: 'pipe' });
  console.log(chalk.green('✓ Cypress is installed and verified'));
} catch (error) {
  console.log(chalk.yellow('Installing Cypress...'));
  execCommand('npm install --save-dev cypress', 'Failed to install Cypress');
  
  // Try to verify again
  try {
    execSync('npx cypress verify', { stdio: 'pipe' });
    console.log(chalk.green('✓ Cypress is now installed and verified'));
  } catch (cypressError) {
    console.error(chalk.red('⚠ Cypress verification failed. You may need to install it manually.'));
  }
}

// Install global dependencies (k6 for load testing)
console.log(chalk.blue('\nChecking global dependencies...'));

// Check if k6 is installed globally
let k6Installed = false;
try {
  execSync('k6 version', { stdio: 'pipe' });
  console.log(chalk.green('✓ k6 is installed globally'));
  k6Installed = true;
} catch (error) {
  console.log(chalk.yellow('k6 is not installed globally. For load testing, it\'s recommended to install k6.'));
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question(chalk.blue('Would you like to install k6 globally? (y/n): '), (answer) => {
    if (answer.toLowerCase() === 'y') {
      console.log(chalk.yellow('Installing k6 globally...'));
      
      // Determine OS and install k6 accordingly
      const platform = process.platform;
      
      if (platform === 'darwin') {
        // macOS
        execCommand('brew install k6', 'Failed to install k6 via Homebrew. Please install manually: https://k6.io/docs/getting-started/installation/');
      } else if (platform === 'linux') {
        // Linux
        execCommand('sudo apt-get install k6', 'Failed to install k6 via apt. Please install manually: https://k6.io/docs/getting-started/installation/');
      } else if (platform === 'win32') {
        // Windows
        execCommand('choco install k6', 'Failed to install k6 via Chocolatey. Please install manually: https://k6.io/docs/getting-started/installation/');
      } else {
        console.log(chalk.red(`Unsupported platform: ${platform}. Please install k6 manually: https://k6.io/docs/getting-started/installation/`));
      }
    } else {
      console.log(chalk.yellow('Skipping k6 global installation. Load testing may not be available.'));
    }
    
    rl.close();
    finishSetup(k6Installed);
  });
} 

// Setup Safari for testing if on macOS
if (process.platform === 'darwin') {
  console.log(chalk.blue('\nChecking Safari configuration for testing...'));
  try {
    const safariEnabled = execSync('defaults read com.apple.Safari WebKitDeveloperExtrasEnabledPreferenceKey', { stdio: 'pipe' }).toString().trim();
    const remoteAutomationEnabled = execSync('defaults read com.apple.Safari AllowRemoteAutomation', { stdio: 'pipe' }).toString().trim();
    
    if (safariEnabled !== '1') {
      console.log(chalk.yellow('Safari Developer menu needs to be enabled for testing.'));
      console.log('Please follow these steps:');
      console.log('1. Open Safari');
      console.log('2. Go to Safari > Preferences > Advanced');
      console.log('3. Check "Show Develop menu in menu bar"');
    } else {
      console.log(chalk.green('✓ Safari Developer menu is enabled'));
    }
    
    if (remoteAutomationEnabled !== '1') {
      console.log(chalk.yellow('Safari Remote Automation needs to be enabled for testing.'));
      console.log('Please follow these steps:');
      console.log('1. Open Safari');
      console.log('2. Go to Develop > Allow Remote Automation');
    } else {
      console.log(chalk.green('✓ Safari Remote Automation is enabled'));
    }
    
  } catch (error) {
    console.log(chalk.yellow('Could not determine Safari configuration. You may need to configure Safari manually:'));
    console.log('1. Enable Safari Developer menu: Safari > Preferences > Advanced > "Show Develop menu in menu bar"');
    console.log('2. Enable Remote Automation: Develop > Allow Remote Automation');
  }
  
  // Create or update Cypress config for Safari if it doesn't exist
  const cypressConfigPath = path.join(__dirname, '..', 'cypress.config.js');
  if (fs.existsSync(cypressConfigPath)) {
    console.log(chalk.yellow('Checking Cypress config for Safari support...'));
    
    const configContent = fs.readFileSync(cypressConfigPath, 'utf8');
    
    if (!configContent.includes('safari')) {
      console.log(chalk.yellow('Adding Safari browser configuration to cypress.config.js...'));
      
      // Simple string replacement to add Safari to browsers array
      let updatedConfig = configContent;
      
      if (configContent.includes('browsers:')) {
        // If browsers array already exists, add Safari to it
        updatedConfig = configContent.replace(
          /browsers:\s*\[([\s\S]*?)\]/,
          (match, browsersContent) => {
            if (match.includes('safari')) {
              return match; // Safari already configured
            }
            return `browsers: [${browsersContent}${browsersContent.trim().endsWith(',') ? '' : ','} { name: "safari", family: "webkit", channel: "stable" }]`;
          }
        );
      } else if (configContent.includes('e2e:')) {
        // Add browsers array to e2e config
        updatedConfig = configContent.replace(
          /e2e:\s*{/,
          'e2e: {\n    browsers: [{ name: "safari", family: "webkit", channel: "stable" }],'
        );
      }
      
      if (updatedConfig !== configContent) {
        fs.writeFileSync(cypressConfigPath, updatedConfig);
        console.log(chalk.green('✓ Safari added to Cypress configuration'));
      } else {
        console.log(chalk.yellow('Could not automatically update Cypress config. You may need to manually add Safari.'));
      }
    } else {
      console.log(chalk.green('✓ Safari is already configured in Cypress'));
    }
  } else {
    console.log(chalk.yellow('Cypress config not found. Creating a basic configuration with Safari support...'));
    
    const basicConfig = `const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    browsers: [
      { name: "safari", family: "webkit", channel: "stable" }
    ]
  },
});
`;
    
    fs.writeFileSync(cypressConfigPath, basicConfig);
    console.log(chalk.green('✓ Created cypress.config.js with Safari support'));
  }
}

// Setup test directories
function finishSetup(k6Installed) {
  console.log(chalk.blue('\nSetting up test directories...'));
  
  // Ensure Cypress test directories exist
  const cypressDir = path.join(__dirname, '..', 'cypress');
  const cypressE2EDir = path.join(cypressDir, 'e2e');
  
  if (!fs.existsSync(cypressE2EDir)) {
    console.log(chalk.yellow('Creating Cypress E2E test directory...'));
    fs.mkdirSync(cypressE2EDir, { recursive: true });
    console.log(chalk.green('✓ Cypress E2E directory created'));
  } else {
    console.log(chalk.green('✓ Cypress E2E directory already exists'));
  }
  
  // Ensure Cypress support directory exists
  const cypressSupportDir = path.join(cypressDir, 'support');
  if (!fs.existsSync(cypressSupportDir)) {
    console.log(chalk.yellow('Creating Cypress support directory...'));
    fs.mkdirSync(cypressSupportDir, { recursive: true });
    
    // Create basic support file if it doesn't exist
    const supportFile = path.join(cypressSupportDir, 'e2e.js');
    if (!fs.existsSync(supportFile)) {
      fs.writeFileSync(supportFile, `// Cypress support file
// Add custom commands and global configuration here

// Import commands.js
import './commands';

// Add accessibility testing support
import 'cypress-axe';
`);
    }
    
    // Create basic commands file if it doesn't exist
    const commandsFile = path.join(cypressSupportDir, 'commands.js');
    if (!fs.existsSync(commandsFile)) {
      fs.writeFileSync(commandsFile, `// Cypress custom commands
// Add your custom commands here

// Example: Custom command to check accessibility
Cypress.Commands.add('checkA11y', (context, options) => {
  cy.injectAxe();
  cy.checkA11y(context, options);
});
`);
    }
    
    console.log(chalk.green('✓ Cypress support directory and files created'));
  } else {
    console.log(chalk.green('✓ Cypress support directory already exists'));
  }
  
  // Final summary
  console.log('');
  console.log(chalk.blue('=================================='));
  console.log(chalk.green('Pre-Launch Tools Setup Complete'));
  console.log(chalk.blue('=================================='));
  console.log('');
  console.log('You can now run pre-launch verification with:');
  console.log(chalk.cyan('npm run pre-launch'));
  console.log('');
  console.log('Individual verification scripts:');
  console.log(chalk.cyan('npm run test:cross-browser') + ' - Test across browsers');
  console.log(chalk.cyan('npm run test:mobile') + ' - Test mobile responsiveness');
  console.log(chalk.cyan('npm run verify:forms') + ' - Verify forms and user flows');
  console.log(chalk.cyan('npm run verify:tracking') + ' - Check analytics implementation');
  
  if (k6Installed) {
    console.log(chalk.cyan('npm run verify:load') + ' - Run load testing');
  } else {
    console.log(chalk.yellow('npm run verify:load') + ' - Load testing (requires k6 installation)');
  }
  
  console.log('');
  console.log('Refer to ' + chalk.cyan('PRE_LAUNCH_CHECKLIST.md') + ' for a complete verification checklist');
  console.log('');
}

// If k6 is already installed, finish setup directly
if (k6Installed) {
  finishSetup(true);
} 