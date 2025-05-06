#!/usr/bin/env node

/**
 * Visual Regression Testing Script
 * 
 * This script uses Puppeteer to take screenshots of pages in development and production
 * environments, then compares them to detect visual differences.
 * 
 * Usage:
 *   node scripts/visual-regression.js
 * 
 * Options:
 *   --env=dev|prod    Environment to capture (default: both)
 *   --url=URL         Base URL for testing (default: dev=http://localhost:3000, prod=[your-prod-url])
 *   --pages=page1,page2  Comma-separated list of pages to test (default: see below)
 *   --delay=2000      Delay in ms before capturing screenshots (default: 2000)
 *   --width=1280      Viewport width (default: 1280)
 *   --height=800      Viewport height (default: 800)
 *   --threshold=0.1   Pixel difference threshold (0-1, default: 0.1)
 */

const puppeteer = require('puppeteer');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// Default configuration
const CONFIG = {
  environments: {
    dev: {
      name: 'Development',
      url: 'http://localhost:3000'
    },
    prod: {
      name: 'Production',
      // Replace with your production URL
      url: process.env.PROD_URL || 'https://your-site.vercel.app'
    }
  },
  // Default pages to test
  pages: [
    '/',
    '/css-test',
    // Add more pages as needed
  ],
  viewports: [
    { width: 1280, height: 800, name: 'desktop' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 375, height: 667, name: 'mobile' }
  ],
  // Wait time before taking screenshot (allow for animations/fonts to load)
  captureDelay: 2000,
  // How sensitive the comparison should be (0-1)
  diffThreshold: 0.1,
  // Directory to save screenshots and diffs
  outputDir: path.join(__dirname, '../visual-regression-results')
};

// Parse command line arguments
const args = process.argv.slice(2).reduce((acc, arg) => {
  const [key, value] = arg.replace('--', '').split('=');
  acc[key] = value;
  return acc;
}, {});

// Override defaults with command line args
if (args.env) {
  CONFIG.envs = args.env.split(',');
} else {
  CONFIG.envs = Object.keys(CONFIG.environments);
}

if (args.pages) {
  CONFIG.pages = args.pages.split(',');
}

if (args.width && args.height) {
  CONFIG.viewports = [{ width: parseInt(args.width), height: parseInt(args.height), name: 'custom' }];
}

if (args.delay) {
  CONFIG.captureDelay = parseInt(args.delay);
}

if (args.threshold) {
  CONFIG.diffThreshold = parseFloat(args.threshold);
}

// Ensure output directory exists
if (!fs.existsSync(CONFIG.outputDir)) {
  fs.mkdirSync(CONFIG.outputDir, { recursive: true });
}

// Setup subdirectories
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const runDir = path.join(CONFIG.outputDir, timestamp);
fs.mkdirSync(runDir, { recursive: true });

// Create a log file
const logFile = path.join(runDir, 'results.log');
fs.writeFileSync(logFile, `Visual Regression Test - ${timestamp}\n\n`, 'utf8');

// Helper to write to log
function log(message) {
  console.log(message);
  fs.appendFileSync(logFile, message + '\n', 'utf8');
}

// Take screenshots for a given environment
async function captureScreenshots(env) {
  const browser = await puppeteer.launch({ headless: 'new' });
  log(chalk.blue(`\n==== Capturing screenshots for ${CONFIG.environments[env].name} ====\n`));
  
  const results = [];
  
  try {
    for (const page of CONFIG.pages) {
      for (const viewport of CONFIG.viewports) {
        const url = `${CONFIG.environments[env].url}${page}`;
        log(chalk.cyan(`Capturing ${page} at ${viewport.width}x${viewport.height} from ${url}`));
        
        const browserPage = await browser.newPage();
        await browserPage.setViewport(viewport);
        
        // Navigate to the page
        await browserPage.goto(url, { waitUntil: 'networkidle2' });
        
        // Wait for any animations to complete
        await browserPage.waitForTimeout(CONFIG.captureDelay);
        
        // Inject helper script to log CSS information
        await browserPage.evaluate(() => {
          const styleSheets = document.styleSheets;
          const cssInfo = {
            styleSheetCount: styleSheets.length,
            inlineStyleElements: document.querySelectorAll('style').length,
            bodyClasses: document.body.className
          };
          console.log('CSS Info:', cssInfo);
          
          // Log computed style of key elements
          const keyElements = ['body', '.container', 'main', 'h1', 'button'];
          keyElements.forEach(selector => {
            const el = document.querySelector(selector);
            if (el) {
              const styles = window.getComputedStyle(el);
              console.log(`Styles for ${selector}:`, {
                fontFamily: styles.fontFamily,
                color: styles.color,
                backgroundColor: styles.backgroundColor,
                padding: styles.padding,
                margin: styles.margin
              });
            }
          });
          
          // Return element count for metrics
          return {
            elements: document.querySelectorAll('*').length,
            cssInfo
          };
        });
        
        // Filename for the screenshot
        const filename = `${env}-${page.replace(/\//g, '-') || 'home'}-${viewport.name}.png`;
        const screenshotPath = path.join(runDir, filename);
        
        // Take the screenshot
        await browserPage.screenshot({ path: screenshotPath, fullPage: true });
        
        results.push({
          env,
          page,
          viewport: viewport.name,
          path: screenshotPath
        });
        
        await browserPage.close();
      }
    }
  } catch (error) {
    log(chalk.red(`Error: ${error.message}`));
  } finally {
    await browser.close();
  }
  
  return results;
}

// Compare two images and generate a diff
function compareImages(img1Path, img2Path, diffPath) {
  try {
    const img1 = PNG.sync.read(fs.readFileSync(img1Path));
    const img2 = PNG.sync.read(fs.readFileSync(img2Path));
    
    // Images must have the same dimensions for comparison
    if (img1.width !== img2.width || img1.height !== img2.height) {
      log(chalk.yellow(`Warning: Cannot compare images with different dimensions: ${img1.width}x${img1.height} vs ${img2.width}x${img2.height}`));
      return {
        match: false,
        diffPixels: Infinity,
        diffPercentage: 100,
        reason: 'different-dimensions'
      };
    }
    
    const { width, height } = img1;
    const diff = new PNG({ width, height });
    
    // Compare images pixel by pixel
    const diffPixels = pixelmatch(
      img1.data,
      img2.data,
      diff.data,
      width,
      height,
      { threshold: CONFIG.diffThreshold }
    );
    
    const diffPercentage = (diffPixels / (width * height)) * 100;
    
    // Write diff image
    fs.writeFileSync(diffPath, PNG.sync.write(diff));
    
    return {
      match: diffPixels === 0,
      diffPixels,
      diffPercentage,
      reason: 'pixel-difference'
    };
  } catch (error) {
    log(chalk.red(`Error comparing images: ${error.message}`));
    return {
      match: false,
      diffPixels: 0,
      diffPercentage: 0,
      reason: 'error',
      error: error.message
    };
  }
}

// Main function to run the tests
async function runVisualRegressionTests() {
  log(chalk.green('=== Starting Visual Regression Tests ==='));
  log(`Timestamp: ${timestamp}`);
  log(`Config: ${JSON.stringify(CONFIG, null, 2)}`);
  
  const results = {};
  
  // Capture screenshots for each environment
  for (const env of CONFIG.envs) {
    results[env] = await captureScreenshots(env);
  }
  
  // Only compare if we have both environments
  if (results.dev && results.prod) {
    log(chalk.green('\n=== Comparing Screenshots ===\n'));
    
    const comparisons = [];
    
    // Match up corresponding screenshots
    for (const devResult of results.dev) {
      const prodResult = results.prod.find(
        r => r.page === devResult.page && r.viewport === devResult.viewport
      );
      
      if (prodResult) {
        const diffFilename = `diff-${devResult.page.replace(/\//g, '-') || 'home'}-${devResult.viewport}.png`;
        const diffPath = path.join(runDir, diffFilename);
        
        log(chalk.cyan(`Comparing ${devResult.page} at ${devResult.viewport}`));
        
        const comparison = compareImages(devResult.path, prodResult.path, diffPath);
        
        comparisons.push({
          page: devResult.page,
          viewport: devResult.viewport,
          devScreenshot: devResult.path,
          prodScreenshot: prodResult.path,
          diffScreenshot: diffPath,
          ...comparison
        });
        
        const status = comparison.match ? 
          chalk.green('✓ Match') : 
          chalk.red(`✗ Difference: ${comparison.diffPercentage.toFixed(2)}%`);
        
        log(`  ${status}`);
      }
    }
    
    // Write summary
    log(chalk.green('\n=== Summary ===\n'));
    
    let matchCount = 0;
    let mismatchCount = 0;
    
    comparisons.forEach(comp => {
      if (comp.match) {
        matchCount++;
      } else {
        mismatchCount++;
      }
    });
    
    log(`Total comparisons: ${comparisons.length}`);
    log(`Matches: ${matchCount}`);
    log(`Mismatches: ${mismatchCount}`);
    
    // Generate HTML report
    const reportPath = path.join(runDir, 'report.html');
    generateHtmlReport(comparisons, reportPath);
    log(chalk.green(`\nReport generated at: ${reportPath}`));
  } else {
    log(chalk.yellow('\nCannot compare - missing one environment.'));
  }
  
  log(chalk.green('\n=== Visual Regression Tests Completed ==='));
}

// Generate an HTML report for easier viewing
function generateHtmlReport(comparisons, reportPath) {
  const pageResults = comparisons.reduce((acc, comp) => {
    if (!acc[comp.page]) {
      acc[comp.page] = [];
    }
    acc[comp.page].push(comp);
    return acc;
  }, {});
  
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Visual Regression Test Report - ${timestamp}</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.5; padding: 20px; max-width: 1200px; margin: 0 auto; }
      header { margin-bottom: 30px; }
      h1 { color: #333; }
      h2 { margin-top: 30px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
      h3 { background-color: #f5f5f5; padding: 10px; border-radius: 4px; }
      .comparison { margin-bottom: 40px; background: #f9f9f9; padding: 20px; border-radius: 8px; }
      .thumbnails { display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px; }
      .thumbnail { flex: 1; min-width: 300px; }
      .thumbnail img { max-width: 100%; border: 1px solid #ddd; }
      .match { color: green; }
      .mismatch { color: red; }
      .metrics { margin: 20px 0; background: #eee; padding: 10px; border-radius: 4px; }
      summary { cursor: pointer; font-weight: bold; }
      details { margin: 10px 0; }
    </style>
  </head>
  <body>
    <header>
      <h1>Visual Regression Test Report</h1>
      <p>Generated: ${new Date(timestamp.replace(/-/g, ':')).toLocaleString()}</p>
      <div class="metrics">
        <p>Total comparisons: ${comparisons.length}</p>
        <p>Matches: ${comparisons.filter(c => c.match).length}</p>
        <p>Mismatches: ${comparisons.filter(c => !c.match).length}</p>
      </div>
    </header>
    
    ${Object.keys(pageResults).map(page => `
      <h2>Page: ${page || 'Home'}</h2>
      
      ${pageResults[page].map(comp => `
        <div class="comparison">
          <h3 class="${comp.match ? 'match' : 'mismatch'}">
            ${comp.match ? '✓' : '✗'} 
            Viewport: ${comp.viewport} 
            ${!comp.match ? `(Difference: ${comp.diffPercentage.toFixed(2)}%)` : ''}
          </h3>
          
          <details>
            <summary>Details</summary>
            <pre>${JSON.stringify({
              page: comp.page,
              viewport: comp.viewport,
              diffPixels: comp.diffPixels,
              diffPercentage: comp.diffPercentage,
              reason: comp.reason
            }, null, 2)}</pre>
          </details>
          
          <div class="thumbnails">
            <div class="thumbnail">
              <h4>Development</h4>
              <img src="${path.relative(runDir, comp.devScreenshot)}" alt="Development screenshot">
            </div>
            
            <div class="thumbnail">
              <h4>Production</h4>
              <img src="${path.relative(runDir, comp.prodScreenshot)}" alt="Production screenshot">
            </div>
            
            ${!comp.match ? `
            <div class="thumbnail">
              <h4>Diff</h4>
              <img src="${path.relative(runDir, comp.diffScreenshot)}" alt="Diff">
            </div>
            ` : ''}
          </div>
        </div>
      `).join('')}
    `).join('')}
  </body>
  </html>
  `;
  
  fs.writeFileSync(reportPath, html);
}

// Run the tests
runVisualRegressionTests().catch(error => {
  log(chalk.red(`Fatal error: ${error.message}`));
  process.exit(1);
}); 