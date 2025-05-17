const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Sanity packages to monitor
const SANITY_PACKAGES = [
  'sanity',
  '@sanity/vision',
  '@sanity/ui',
  '@sanity/insert-menu',
  '@sanity/image-url',
  '@sanity/block-content-to-react',
  '@sanity/block-editor',
  '@sanity/desk-tool',
  '@sanity/document-internationalization',
  '@sanity/field-visitor',
  '@sanity/form-builder',
  '@sanity/portable-text-editor',
  '@sanity/production-preview',
  '@sanity/vision'
];

// Function to get current package versions
function getCurrentVersions() {
  const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
  const versions = {};
  
  SANITY_PACKAGES.forEach(pkg => {
    const version = packageJson.dependencies[pkg] || packageJson.devDependencies[pkg];
    if (version) {
      versions[pkg] = version.replace(/[\^~]/, '');
    }
  });
  
  return versions;
}

// Function to fetch latest versions from npm
async function getLatestVersions() {
  const versions = {};
  
  for (const pkg of SANITY_PACKAGES) {
    try {
      const response = await new Promise((resolve, reject) => {
        https.get(`https://registry.npmjs.org/${pkg}/latest`, (res) => {
          let data = '';
          res.on('data', (chunk) => data += chunk);
          res.on('end', () => resolve(JSON.parse(data)));
          res.on('error', reject);
        }).on('error', reject);
      });
      
      versions[pkg] = response.version;
    } catch (error) {
      console.error(`Error fetching version for ${pkg}:`, error.message);
    }
  }
  
  return versions;
}

// Function to check for security advisories
async function checkSecurityAdvisories() {
  const advisories = [];
  
  for (const pkg of SANITY_PACKAGES) {
    try {
      const response = await new Promise((resolve, reject) => {
        https.get(`https://registry.npmjs.org/-/npm/v1/security/advisories/${pkg}`, (res) => {
          let data = '';
          res.on('data', (chunk) => data += chunk);
          res.on('end', () => resolve(JSON.parse(data)));
          res.on('error', reject);
        }).on('error', reject);
      });
      
      if (response && response.advisories) {
        advisories.push(...Object.values(response.advisories));
      }
    } catch (error) {
      // Ignore 404 errors (no advisories)
      if (error.message !== '404') {
        console.error(`Error checking advisories for ${pkg}:`, error.message);
      }
    }
  }
  
  return advisories;
}

// Function to save update history
function saveUpdateHistory(updates) {
  const historyPath = path.join(process.cwd(), 'data', 'sanity-updates.json');
  let history = [];
  
  if (fs.existsSync(historyPath)) {
    history = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
  }
  
  history.push({
    timestamp: new Date().toISOString(),
    updates
  });
  
  // Keep only last 10 entries
  if (history.length > 10) {
    history = history.slice(-10);
  }
  
  fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));
}

// Main monitoring function
async function monitorSanityUpdates() {
  try {
    console.log('Checking Sanity.io package updates...\n');
    
    // Get current and latest versions
    const currentVersions = getCurrentVersions();
    const latestVersions = await getLatestVersions();
    
    // Check for updates
    const updates = [];
    for (const [pkg, currentVersion] of Object.entries(currentVersions)) {
      const latestVersion = latestVersions[pkg];
      if (latestVersion && currentVersion !== latestVersion) {
        updates.push({
          package: pkg,
          current: currentVersion,
          latest: latestVersion
        });
      }
    }
    
    // Check for security advisories
    const advisories = await checkSecurityAdvisories();
    
    // Save update history
    saveUpdateHistory({
      updates,
      advisories
    });
    
    // Print results
    if (updates.length > 0) {
      console.log('Updates available:');
      updates.forEach(update => {
        console.log(`\n${update.package}:`);
        console.log(`  Current: ${update.current}`);
        console.log(`  Latest:  ${update.latest}`);
      });
    } else {
      console.log('All packages are up to date.');
    }
    
    if (advisories.length > 0) {
      console.log('\nSecurity Advisories:');
      advisories.forEach(advisory => {
        console.log(`\n${advisory.module_name}:`);
        console.log(`  Severity: ${advisory.severity}`);
        console.log(`  Title: ${advisory.title}`);
        console.log(`  URL: ${advisory.url}`);
      });
    } else {
      console.log('\nNo security advisories found.');
    }
    
    // Print update history
    const historyPath = path.join(process.cwd(), 'data', 'sanity-updates.json');
    if (fs.existsSync(historyPath)) {
      const history = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
      console.log('\nUpdate History:');
      history.forEach(entry => {
        console.log(`\n${new Date(entry.timestamp).toLocaleString()}:`);
        if (entry.updates.length > 0) {
          console.log('  Updates:');
          entry.updates.forEach(update => {
            console.log(`    ${update.package}: ${update.current} -> ${update.latest}`);
          });
        }
        if (entry.advisories.length > 0) {
          console.log('  Advisories:');
          entry.advisories.forEach(advisory => {
            console.log(`    ${advisory.module_name}: ${advisory.severity}`);
          });
        }
      });
    }
    
  } catch (error) {
    console.error('Error monitoring updates:', error);
    process.exit(1);
  }
}

// Run monitoring if this file is run directly
if (require.main === module) {
  monitorSanityUpdates()
    .catch(error => {
      console.error('Monitoring failed:', error);
      process.exit(1);
    });
}

module.exports = { monitorSanityUpdates }; 