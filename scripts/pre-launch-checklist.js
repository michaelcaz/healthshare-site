const { exec } = require('child_process');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Configuration
const REPORTS_DIR = path.join(__dirname, '..', 'reports');
const TIMESTAMP = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '-');
const MASTER_REPORT_PATH = path.join(REPORTS_DIR, `pre-launch-${TIMESTAMP}`, 'master-report.md');

// Ensure reports directory exists
if (!fs.existsSync(path.dirname(MASTER_REPORT_PATH))) {
  fs.mkdirSync(path.dirname(MASTER_REPORT_PATH), { recursive: true });
}

// Create report file
fs.writeFileSync(MASTER_REPORT_PATH, `# Pre-Launch Verification Master Report\nDate: ${new Date().toLocaleString()}\n\n`);

// Helper to append to report
function appendToReport(content) {
  fs.appendFileSync(MASTER_REPORT_PATH, content + '\n');
  console.log(content);
}

// Helper to run command and return output
function runCommand(command) {
  return new Promise((resolve, reject) => {
    console.log(chalk.blue(`Running: ${command}`));
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(chalk.red(`Error: ${error.message}`));
        resolve({ success: false, output: stderr || 'Unknown error' });
        return;
      }
      
      resolve({ success: true, output: stdout });
    });
  });
}

// Pre-launch checks to run
const PRE_LAUNCH_CHECKS = [
  {
    name: 'Production Build Verification',
    command: 'npm run verify-production',
    description: 'Verifies that production environment is properly configured.'
  },
  {
    name: 'Cross-Browser Testing',
    command: 'node scripts/cross-browser-test.js',
    description: 'Tests the application across multiple browsers.'
  },
  {
    name: 'Mobile Responsiveness Testing',
    command: 'node scripts/mobile-responsive-test.js',
    description: 'Verifies that the application is responsive on various devices.'
  },
  {
    name: 'Form and Flow Verification',
    command: 'node scripts/verify-forms.js',
    description: 'Checks that all forms and user flows work correctly.'
  },
  {
    name: 'Analytics & Tracking Verification',
    command: 'node scripts/verify-tracking.js',
    description: 'Verifies that analytics and tracking systems are working.'
  },
  {
    name: 'Security Scan',
    command: 'npm run security-scan',
    description: 'Runs security checks on the application.'
  },
  {
    name: 'Backup System Test',
    command: 'npm run backup-monitor',
    description: 'Verifies that backup systems are functioning properly.'
  },
  {
    name: 'Production Build Test',
    command: 'npm run production-build',
    description: 'Builds the application in production mode to verify there are no build errors.'
  },
  {
    name: 'E2E Tests',
    command: 'npm run test:e2e',
    description: 'Runs end-to-end tests to verify critical functionality.'
  }
];

// Create an interactive prompt
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to prompt user
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Main function
async function runPreLaunchChecks() {
  console.log(chalk.green('Starting Pre-Launch Verification Process'));
  console.log(chalk.yellow('This will run multiple verification scripts to ensure the application is ready for production.'));
  console.log(chalk.yellow('Please ensure you have the following:'));
  console.log(chalk.yellow('1. The development server is running (npm run dev)'));
  console.log(chalk.yellow('2. Required dependencies are installed (npm install)'));
  console.log(chalk.yellow('3. Environment variables are properly set (.env.local)'));
  
  const confirmation = await prompt(chalk.blue('Continue with pre-launch verification? (y/n): '));
  
  if (confirmation.toLowerCase() !== 'y') {
    console.log(chalk.yellow('Pre-launch verification cancelled.'));
    rl.close();
    return;
  }
  
  // Initialize report
  appendToReport('# Pre-Launch Verification Summary\n');
  appendToReport(`Verification Date: ${new Date().toLocaleString()}\n`);
  
  // Results collection
  const results = [];
  
  // Run each check
  for (const check of PRE_LAUNCH_CHECKS) {
    appendToReport(`## ${check.name}\n`);
    appendToReport(`Description: ${check.description}\n`);
    appendToReport('```');
    
    console.log(chalk.green(`\nRunning Check: ${check.name}`));
    console.log(chalk.gray(`Description: ${check.description}`));
    
    const startTime = Date.now();
    const result = await runCommand(check.command);
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    appendToReport(result.output);
    appendToReport('```\n');
    
    appendToReport(`Status: ${result.success ? '✅ PASSED' : '❌ FAILED'}`);
    appendToReport(`Duration: ${duration} seconds\n`);
    
    results.push({
      name: check.name,
      success: result.success,
      duration
    });
  }
  
  // Generate summary
  appendToReport('## Final Summary\n');
  
  const passedChecks = results.filter(r => r.success).length;
  const totalChecks = results.length;
  const passRate = Math.round((passedChecks / totalChecks) * 100);
  
  appendToReport(`Total Checks: ${totalChecks}`);
  appendToReport(`Passed: ${passedChecks}`);
  appendToReport(`Failed: ${totalChecks - passedChecks}`);
  appendToReport(`Pass Rate: ${passRate}%\n`);
  
  if (passedChecks === totalChecks) {
    appendToReport('🎉 **ALL CHECKS PASSED** - The application appears ready for production deployment!');
  } else {
    appendToReport('⚠️ **SOME CHECKS FAILED** - Please review the failed checks before proceeding to production.');
    
    appendToReport('\n### Failed Checks:');
    results.filter(r => !r.success).forEach(failure => {
      appendToReport(`- ${failure.name}`);
    });
  }
  
  // Add manual checklist
  appendToReport('\n## Manual Pre-Launch Checklist\n');
  appendToReport('The following items should be verified manually before launch:\n');
  
  const manualChecks = [
    'Verify all content for accuracy and spelling',
    'Check all external links are working',
    'Verify all affiliate tracking links',
    'Test payment flows with real credentials (if applicable)',
    'Verify email delivery for all system emails',
    'Check 404 and error pages',
    'Verify favicon and app icons',
    'Test on real mobile devices (not just emulators)',
    'Verify proper SSL certificate installation',
    'Check DNS settings and redirects',
    'Verify robots.txt and sitemap.xml',
    'Check page load speed in different regions',
    'Verify backup and recovery procedures',
    'Ensure proper monitoring is in place',
    'Review analytics implementation',
    'Verify compliance with legal requirements',
    'Check accessibility compliance'
  ];
  
  manualChecks.forEach((check, index) => {
    appendToReport(`- [ ] ${check}`);
  });
  
  console.log(chalk.green(`\nPre-launch verification complete!`));
  console.log(chalk.blue(`Master report saved to: ${MASTER_REPORT_PATH}`));
  
  console.log(chalk.yellow(`\nSummary: ${passedChecks}/${totalChecks} checks passed (${passRate}%)`));
  
  if (passedChecks === totalChecks) {
    console.log(chalk.green('✅ ALL CHECKS PASSED - The application appears ready for production deployment!'));
  } else {
    console.log(chalk.red('⚠️ SOME CHECKS FAILED - Please review the failed checks before proceeding to production.'));
    
    console.log(chalk.red('\nFailed Checks:'));
    results.filter(r => !r.success).forEach(failure => {
      console.log(chalk.red(`- ${failure.name}`));
    });
  }
  
  rl.close();
}

// Run the pre-launch checks
runPreLaunchChecks().catch(err => {
  console.error(chalk.red('Fatal error in pre-launch verification:'), err);
  rl.close();
  process.exit(1);
});

/*
To run this script:
1. Ensure all individual verification scripts are available
2. Make sure development server is running
3. Run this script:
   node scripts/pre-launch-checklist.js
4. Follow the prompts and review the master report
*/ 