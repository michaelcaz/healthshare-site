# Pre-Launch Testing Framework

This directory contains scripts for automated pre-launch verification of the Healthshare Plan Finder application.

## Setup

To set up the pre-launch testing framework:

```bash
npm run setup:pre-launch
```

This script will:
- Install required dependencies (puppeteer, k6, cypress-axe, etc.)
- Create necessary directory structure
- Verify installations
- Guide you through global tool installation (if needed)

## Available Scripts

### Main Script

- `pre-launch-checklist.js` - Main script that runs all verification checks and generates a comprehensive report

### Individual Testing Scripts

- `cross-browser-test.js` - Tests the application across multiple browsers (Chrome, Firefox, Edge, and Safari on macOS)
- `mobile-responsive-test.js` - Tests mobile responsiveness across various device sizes
- `verify-forms.js` - Validates all forms and critical user flows
- `verify-tracking.js` - Checks analytics and tracking implementation
- `load-test.js` - Performs load testing (requires k6)
- `verify-production.ts` - Verifies production environment configuration
- `security-scan.js` - Runs security checks
- `backup-monitor.js` - Verifies backup systems

### Setup Scripts

- `setup-pre-launch.js` - Sets up the pre-launch testing environment

## Running Tests

You can run individual tests or the complete pre-launch verification:

```bash
# Run all verification checks
npm run pre-launch

# Run individual checks
npm run test:cross-browser
npm run test:mobile
npm run verify:forms
npm run verify:tracking
npm run verify:load
npm run security-scan
```

## Report Output

All test reports are saved in the `reports/` directory with the following structure:

```
reports/
├── cross-browser-[timestamp]/
│   └── summary.md
├── mobile-responsive-[timestamp]/
│   ├── mobile-responsive-report.md
│   └── screenshots/
├── form-verification/
│   ├── form-verification-report.md
│   └── [screenshots]
├── tracking-verification/
│   ├── tracking-verification-report.md
│   └── [screenshots]
└── pre-launch-[timestamp]/
    └── master-report.md
```

## Configuration

Each script has configurable settings defined at the top of the file:

- Browser configurations
- Mobile device sizes
- URLs to test
- Form selectors
- Tracking events
- Load test parameters

Modify these values as needed for your specific testing requirements.

## Adding New Tests

To add new tests:

1. Create a new script in the `scripts/` directory
2. Add the script to `package.json` under `scripts`
3. Integrate the script into `pre-launch-checklist.js`

## Troubleshooting

Common issues:

- **Cypress Installation Issues**: Run `npx cypress verify` to check the installation
- **Puppeteer Browser Launch Failures**: Ensure all dependencies are installed (`apt-get install -y libgtk-3-0 libnotify-bin libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb`)
- **k6 Not Found**: Install k6 globally (`brew install k6` on macOS, `apt-get install k6` on Linux)
- **Report Directory Missing**: Run `mkdir -p reports` to create it
- **Safari Testing Issues**: 
  - Safari testing is only available on macOS
  - Enable Safari's Developer menu: Safari > Preferences > Advanced > "Show Develop menu"
  - Enable Remote Automation: Develop > Allow Remote Automation
  - Install Safari WebDriver: `npm install --save-dev @cypress/safari-webdriver`

For more help, see the complete documentation in the `PRE_LAUNCH_CHECKLIST.md` file. 