const { verifyDataIntegrity } = require('./verify-data-integrity');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

async function verifyBuildData() {
  try {
    // Verify data integrity
    const integrityCheck = await verifyDataIntegrity();
    if (!integrityCheck) {
      throw new Error('Data integrity check failed');
    }

    // Verify hash hasn't changed since last build
    const dataPath = path.join(process.cwd(), 'data', 'provider-plans.ts');
    const hashPath = path.join(process.cwd(), 'data', 'provider-plans.hash');
    
    if (!fs.existsSync(hashPath)) {
      console.warn('No previous hash found. This might be the first build.');
      return true;
    }

    const currentHash = crypto.createHash('sha256')
      .update(fs.readFileSync(dataPath))
      .digest('hex');
    
    const previousHash = fs.readFileSync(hashPath, 'utf8').trim();

    if (currentHash !== previousHash) {
      console.warn('Warning: Data hash has changed since last build.');
      console.warn('This might indicate unauthorized changes to the plan data.');
      console.warn('Current hash:', currentHash);
      console.warn('Previous hash:', previousHash);
      
      // Ask for confirmation
      const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      });

      return new Promise((resolve) => {
        readline.question('Do you want to proceed with the build? (y/N) ', (answer) => {
          readline.close();
          if (answer.toLowerCase() === 'y') {
            resolve(true);
          } else {
            console.error('Build cancelled due to data changes.');
            resolve(false);
          }
        });
      });
    }

    return true;
  } catch (error) {
    console.error('Pre-build verification failed:', error);
    return false;
  }
}

// Run verification if this file is run directly
if (require.main === module) {
  verifyBuildData()
    .then(success => {
      if (!success) process.exit(1);
    })
    .catch(error => {
      console.error('Verification failed:', error);
      process.exit(1);
    });
}

module.exports = { verifyBuildData }; 