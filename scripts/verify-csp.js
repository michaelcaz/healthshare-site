/**
 * CSP and Production Verification Script
 * 
 * This script helps identify Content Security Policy issues by opening multiple critical routes
 * and checking for CSP violations, image loading problems, and font rendering issues.
 */

const puppeteer = require('puppeteer');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

// Configuration
const REPORTS_DIR = path.join(__dirname, '..', 'reports');
const BASE_URL = 'http://localhost:3001'; // Use the production testing port
const SCREENSHOT_DIR = path.join(REPORTS_DIR, 'csp-check-screenshots');
const CSP_REPORT_FILE = path.join(REPORTS_DIR, 'csp-violations.json');

// Create directories if they don't exist
if (!fs.existsSync(REPORTS_DIR)) {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

// Important routes to test
const CRITICAL_ROUTES = [
  { path: '/', name: 'Home' },
  { path: '/questionnaire', name: 'Questionnaire Start' },
  { path: '/questionnaire/coverage', name: 'Coverage Step' },
  { path: '/questionnaire/preferences', name: 'Preferences Step' },
  { path: '/questionnaire/results', name: 'Results Page' },
  { path: '/recommendations', name: 'Recommendations' },
  { path: '/plans/comparison', name: 'Plan Comparison' },
  { path: '/about', name: 'About Page' },
  { path: '/contact', name: 'Contact Page' },
];

// Main function
async function checkProductionIssues() {
  console.log(chalk.blue('🔍 Starting production verification checks...'));
  console.log(chalk.yellow('Looking for CSP violations, image issues, and font rendering problems\n'));

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--disable-web-security'] // To capture CSP violations
  });

  let cspViolations = [];
  let imageIssues = [];
  let fontIssues = [];
  const pageLoadTimes = [];

  try {
    const page = await browser.newPage();
    
    // Listen for CSP violations
    page.on('console', (msg) => {
      const text = msg.text();
      if (text.includes('Content Security Policy') || text.includes('CSP')) {
        cspViolations.push({
          message: text,
          location: page.url()
        });
        console.log(chalk.red(`CSP Violation: ${text}`));
      }
    });

    // Check each critical route
    for (const route of CRITICAL_ROUTES) {
      const url = `${BASE_URL}${route.path}`;
      console.log(chalk.blue(`Testing route: ${route.name} (${url})`));
      
      const startTime = Date.now();
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      const loadTime = Date.now() - startTime;
      
      pageLoadTimes.push({
        route: route.name,
        path: route.path,
        loadTime: loadTime
      });
      
      console.log(chalk.green(`  ✓ Page loaded in ${loadTime}ms`));
      
      // Take a screenshot
      const screenshotPath = path.join(SCREENSHOT_DIR, `${route.name.toLowerCase().replace(/\s+/g, '-')}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(chalk.green(`  ✓ Screenshot saved to ${screenshotPath}`));
      
      // Check for broken images
      const brokenImages = await page.evaluate(() => {
        const images = Array.from(document.querySelectorAll('img'));
        return images
          .filter(img => !img.complete || img.naturalWidth === 0)
          .map(img => ({ src: img.src, alt: img.alt }));
      });
      
      if (brokenImages.length > 0) {
        console.log(chalk.red(`  ✗ Found ${brokenImages.length} broken images`));
        imageIssues.push({
          route: route.name,
          brokenImages: brokenImages
        });
      } else {
        console.log(chalk.green('  ✓ All images loaded correctly'));
      }
      
      // Check for font issues (this is a heuristic approach)
      const fontCheck = await page.evaluate(() => {
        const fontElements = document.querySelectorAll('h1, h2, h3, p');
        let issues = [];
        
        fontElements.forEach(el => {
          const style = window.getComputedStyle(el);
          const fontFamily = style.fontFamily;
          const fontSize = style.fontSize;
          
          // Check if fallback fonts are being used (simplified check)
          if (fontFamily.includes('serif') || fontFamily.includes('sans-serif')) {
            issues.push({
              element: el.tagName,
              text: el.innerText.substring(0, 50) + (el.innerText.length > 50 ? '...' : ''),
              fontFamily: fontFamily
            });
          }
        });
        
        return issues;
      });
      
      if (fontCheck.length > 0) {
        console.log(chalk.yellow(`  ⚠️ Possible font rendering issues detected: ${fontCheck.length} elements using fallback fonts`));
        fontIssues.push({
          route: route.name,
          issues: fontCheck
        });
      } else {
        console.log(chalk.green('  ✓ Font rendering looks good'));
      }
      
      console.log(''); // Add space between routes
    }

    // Generate summary report
    const report = {
      timestamp: new Date().toISOString(),
      baseUrl: BASE_URL,
      cspViolations: cspViolations,
      imageIssues: imageIssues,
      fontIssues: fontIssues,
      pageLoadTimes: pageLoadTimes,
      screenshots: fs.readdirSync(SCREENSHOT_DIR).map(file => path.join(SCREENSHOT_DIR, file))
    };
    
    fs.writeFileSync(
      CSP_REPORT_FILE,
      JSON.stringify(report, null, 2)
    );
    
    // Print summary
    console.log(chalk.blue('\n📊 Verification Summary:'));
    console.log(chalk.blue('======================='));
    
    if (cspViolations.length === 0) {
      console.log(chalk.green('✓ No CSP violations detected'));
    } else {
      console.log(chalk.red(`✗ ${cspViolations.length} CSP violations detected`));
    }
    
    if (imageIssues.length === 0) {
      console.log(chalk.green('✓ All images loaded correctly'));
    } else {
      console.log(chalk.red(`✗ Image issues found on ${imageIssues.length} pages`));
    }
    
    if (fontIssues.length === 0) {
      console.log(chalk.green('✓ Fonts rendering correctly'));
    } else {
      console.log(chalk.yellow(`⚠️ Potential font issues on ${fontIssues.length} pages`));
    }
    
    // Load time analysis
    const averageLoadTime = pageLoadTimes.reduce((sum, item) => sum + item.loadTime, 0) / pageLoadTimes.length;
    console.log(chalk.blue(`\nAverage page load time: ${Math.round(averageLoadTime)}ms`));
    
    // Slowest pages
    const slowestPages = [...pageLoadTimes].sort((a, b) => b.loadTime - a.loadTime).slice(0, 3);
    console.log(chalk.yellow('\nSlowest loading pages:'));
    slowestPages.forEach((page, i) => {
      console.log(chalk.yellow(`${i+1}. ${page.route} (${page.loadTime}ms)`));
    });
    
    console.log(chalk.green(`\nDetailed report saved to: ${CSP_REPORT_FILE}`));
    console.log(chalk.green(`Screenshots saved to: ${SCREENSHOT_DIR}`));
    
  } catch (error) {
    console.error(chalk.red('Error during verification:'), error);
  } finally {
    await browser.close();
  }
}

// Run the verification
checkProductionIssues().catch(console.error); 