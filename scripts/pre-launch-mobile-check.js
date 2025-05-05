#!/usr/bin/env node

/**
 * Pre-Launch Mobile Responsiveness Check Script
 * 
 * This script runs a complete mobile responsiveness check for the Healthshare site
 * and generates a report with issues that need to be fixed before launch.
 */

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// Create output directory for reports
const OUTPUT_DIR = path.join(__dirname, '../mobile-check-report');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function runCommand(command, description) {
  console.log(chalk.blue(`\n🔄 ${description}...\n`));
  try {
    const { stdout, stderr } = await exec(command);
    if (stdout) console.log(stdout);
    if (stderr) console.error(chalk.yellow(stderr));
    console.log(chalk.green(`✅ ${description} completed successfully`));
    return true;
  } catch (error) {
    console.error(chalk.red(`❌ ${description} failed`));
    console.error(chalk.red(error.message));
    return false;
  }
}

async function runMobileChecks() {
  console.log(chalk.blue.bold('\n📱 Starting Pre-Launch Mobile Responsiveness Check\n'));
  
  // 1. Run the screenshot-based check
  const screenshotsSuccess = await runCommand(
    'npm run mobile-check', 
    'Generating mobile screenshots for visual inspection'
  );
  
  // 2. Run Lighthouse mobile audit
  const lighthouseSuccess = await runCommand(
    'npx lighthouse http://localhost:3000 --output-path=./mobile-check-report/lighthouse-report.html --view --preset=mobile',
    'Running Lighthouse mobile audit on homepage'
  );
  
  // 3. Run Cypress mobile tests
  const cypressSuccess = await runCommand(
    'npm run test:e2e -- --spec cypress/e2e/mobile-responsive.cy.js',
    'Running automated mobile responsiveness tests'
  );
  
  // 4. Print checklist reminders
  console.log(chalk.blue.bold('\n📋 Manual Checks Required:\n'));
  console.log(chalk.yellow('Please complete these manual checks:'));
  console.log('1. Review the screenshots in mobile-test-screenshots directory');
  console.log('2. Test on real iOS and Android devices if available');
  console.log('3. Complete all items in scripts/mobile-responsive-checklist.md');
  console.log('4. Check Lighthouse report for mobile-specific issues');
  
  // Generate summary
  console.log(chalk.blue.bold('\n📊 Mobile Check Summary:\n'));
  
  const resultsTable = [
    ['Test', 'Status'],
    ['Screenshot Generation', screenshotsSuccess ? chalk.green('PASSED') : chalk.red('FAILED')],
    ['Lighthouse Audit', lighthouseSuccess ? chalk.green('PASSED') : chalk.red('FAILED')],
    ['Cypress Tests', cypressSuccess ? chalk.green('PASSED') : chalk.red('FAILED')],
    ['Manual Checks', chalk.yellow('PENDING')]
  ];
  
  // Print results table
  const columnWidths = [20, 10];
  resultsTable.forEach((row, index) => {
    if (index === 0) {
      console.log(
        row[0].padEnd(columnWidths[0]) + ' | ' + 
        row[1].padEnd(columnWidths[1])
      );
      console.log('-'.repeat(columnWidths[0] + columnWidths[1] + 3));
    } else {
      console.log(
        row[0].padEnd(columnWidths[0]) + ' | ' + 
        row[1]
      );
    }
  });
  
  // Print overall status
  if (screenshotsSuccess && lighthouseSuccess && cypressSuccess) {
    console.log(chalk.green.bold('\n✅ Automated checks passed! Complete manual checks next.\n'));
  } else {
    console.log(chalk.yellow.bold('\n⚠️ Some automated checks failed. Review issues before proceeding.\n'));
  }
  
  console.log(chalk.blue('📱 Mobile Responsiveness Check Complete'));
}

// Run the check
runMobileChecks().catch(err => {
  console.error(chalk.red('Error running mobile checks:', err));
  process.exit(1);
}); 