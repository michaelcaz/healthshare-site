const fs = require('fs');
const path = require('path');

// List of common mobile viewport sizes to test
const viewportSizes = [
  { width: 320, height: 568, name: 'iPhone SE' },
  { width: 375, height: 667, name: 'iPhone 8' },
  { width: 414, height: 896, name: 'iPhone XR' },
  { width: 768, height: 1024, name: 'iPad' },
];

// List of pages to test
const pages = [
  '/',
  '/plans',
  '/questionnaire',
  '/blog',
  // Add more pages as needed
];

// Generate test cases
const testCases = viewportSizes.flatMap(size => 
  pages.map(page => ({
    name: `${size.name} - ${page}`,
    viewport: size,
    url: page
  }))
);

// Write test cases to a JSON file
fs.writeFileSync(
  path.join(__dirname, '../mobile-test-cases.json'),
  JSON.stringify(testCases, null, 2)
);

console.log('Mobile test cases generated successfully!'); 