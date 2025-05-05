const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Configuration
const VIEWPORTS = [
  { width: 375, height: 667, name: 'mobile' },     // iPhone SE/8
  { width: 768, height: 1024, name: 'tablet' },    // iPad
  { width: 1440, height: 900, name: 'desktop' }    // Desktop
];

const PAGES = [
  { url: '/', name: 'home' },
  { url: '/questionnaire', name: 'questionnaire' },
  { url: '/about', name: 'about' },
  { url: '/recommendations', name: 'recommendations' },
  { url: '/auth/login', name: 'login' },
  { url: '/auth/signup', name: 'signup' },
  // Add more key pages as needed
];

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const SCREENSHOTS_DIR = path.join(__dirname, '../mobile-test-screenshots');

// Ensure screenshots directory exists
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

// Clear previous screenshots
fs.readdirSync(SCREENSHOTS_DIR).forEach(file => {
  fs.unlinkSync(path.join(SCREENSHOTS_DIR, file));
});

async function takeScreenshots() {
  console.log('🔍 Starting mobile responsiveness check...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: null,
  });
  
  const report = ['# Mobile Responsiveness Test Results\n'];
  
  try {
    for (const viewport of VIEWPORTS) {
      report.push(`\n## ${viewport.name.toUpperCase()} (${viewport.width}x${viewport.height})\n`);
      
      for (const page of PAGES) {
        const pageName = page.name;
        const pageUrl = `${BASE_URL}${page.url}`;
        const screenshotPath = path.join(
          SCREENSHOTS_DIR, 
          `${pageName}-${viewport.name}.png`
        );
        
        console.log(`📱 Testing ${pageName} at ${viewport.width}x${viewport.height}`);
        
        const tab = await browser.newPage();
        await tab.setViewport({
          width: viewport.width,
          height: viewport.height
        });
        
        try {
          await tab.goto(pageUrl, { waitUntil: 'networkidle2', timeout: 10000 });
          
          // Take a screenshot of the current viewport
          await tab.screenshot({ path: screenshotPath, fullPage: false });
          
          report.push(`- ✅ [${pageName}](${screenshotPath.replace(/\\/g, '/')})`);
        } catch (err) {
          console.error(`❌ Error testing ${pageName}: ${err.message}`);
          report.push(`- ❌ ${pageName} - Error: ${err.message}`);
        } finally {
          await tab.close();
        }
      }
    }
  } finally {
    await browser.close();
  }
  
  // Write report
  fs.writeFileSync(
    path.join(SCREENSHOTS_DIR, 'responsive-test-report.md'),
    report.join('\n')
  );
  
  console.log(`✅ Mobile testing complete! Check ${SCREENSHOTS_DIR} for results.`);
}

takeScreenshots().catch(console.error); 