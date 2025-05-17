const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Function to calculate SHA-256 hash of a file
function calculateFileHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

// Function to verify plan data structure
function verifyPlanStructure(plans) {
  const requiredFields = ['id', 'providerName', 'planName', 'maxCoverage', 'annualUnsharedAmount', 'ageRules', 'planMatrix'];
  const requiredMatrixFields = ['ageBracket', 'householdType', 'costs'];
  const requiredCostFields = ['monthlyPremium', 'initialUnsharedAmount'];

  plans.forEach((plan, planIndex) => {
    // Check required fields
    requiredFields.forEach(field => {
      if (!(field in plan)) {
        throw new Error(`Plan ${planIndex} missing required field: ${field}`);
      }
    });

    // Check plan matrix
    if (!Array.isArray(plan.planMatrix)) {
      throw new Error(`Plan ${planIndex} planMatrix is not an array`);
    }

    plan.planMatrix.forEach((matrix, matrixIndex) => {
      // Check matrix fields
      requiredMatrixFields.forEach(field => {
        if (!(field in matrix)) {
          throw new Error(`Plan ${planIndex} matrix ${matrixIndex} missing required field: ${field}`);
        }
      });

      // Check costs
      if (!Array.isArray(matrix.costs)) {
        throw new Error(`Plan ${planIndex} matrix ${matrixIndex} costs is not an array`);
      }

      matrix.costs.forEach((cost, costIndex) => {
        requiredCostFields.forEach(field => {
          if (!(field in cost)) {
            throw new Error(`Plan ${planIndex} matrix ${matrixIndex} cost ${costIndex} missing required field: ${field}`);
          }
        });

        // Verify numeric values
        if (typeof cost.monthlyPremium !== 'number' || cost.monthlyPremium < 0) {
          throw new Error(`Plan ${planIndex} matrix ${matrixIndex} cost ${costIndex} has invalid monthlyPremium`);
        }
        if (typeof cost.initialUnsharedAmount !== 'number' || cost.initialUnsharedAmount < 0) {
          throw new Error(`Plan ${planIndex} matrix ${matrixIndex} cost ${costIndex} has invalid initialUnsharedAmount`);
        }
      });
    });
  });
}

// Function to verify data consistency
function verifyDataConsistency(plans) {
  const providerPlans = new Map();

  plans.forEach(plan => {
    if (!providerPlans.has(plan.providerName)) {
      providerPlans.set(plan.providerName, new Set());
    }
    providerPlans.get(plan.providerName).add(plan.planName);
  });

  // Check for duplicate plan IDs
  const planIds = new Set();
  plans.forEach(plan => {
    if (planIds.has(plan.id)) {
      throw new Error(`Duplicate plan ID found: ${plan.id}`);
    }
    planIds.add(plan.id);
  });

  // Check for consistent age rules per provider
  const providerAgeRules = new Map();
  plans.forEach(plan => {
    if (!providerAgeRules.has(plan.providerName)) {
      providerAgeRules.set(plan.providerName, plan.ageRules);
    } else if (JSON.stringify(providerAgeRules.get(plan.providerName)) !== JSON.stringify(plan.ageRules)) {
      throw new Error(`Inconsistent age rules for provider: ${plan.providerName}`);
    }
  });
}

async function verifyDataIntegrity() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'provider-plans.ts');
    
    // Check if file exists
    if (!fs.existsSync(dataPath)) {
      throw new Error('Provider plans file not found');
    }

    // Calculate file hash
    const fileHash = calculateFileHash(dataPath);
    console.log('File hash:', fileHash);

    // Read and parse the file
    const fileContent = fs.readFileSync(dataPath, 'utf8');
    const plansMatch = fileContent.match(/export const providerPlans: PricingPlan\[\] = (\[[\s\S]*?\]);/);
    
    if (!plansMatch) {
      throw new Error('Could not find plans data in file');
    }

    const plans = JSON.parse(plansMatch[1]);

    // Verify plan structure
    verifyPlanStructure(plans);
    console.log('Plan structure verification passed');

    // Verify data consistency
    verifyDataConsistency(plans);
    console.log('Data consistency verification passed');

    // Save hash for future comparison
    const hashPath = path.join(process.cwd(), 'data', 'provider-plans.hash');
    fs.writeFileSync(hashPath, fileHash);
    console.log('Hash saved for future comparison');

    return true;
  } catch (error) {
    console.error('Data integrity verification failed:', error.message);
    return false;
  }
}

// Run verification if this file is run directly
if (require.main === module) {
  verifyDataIntegrity()
    .then(success => {
      if (!success) process.exit(1);
    })
    .catch(error => {
      console.error('Verification failed:', error);
      process.exit(1);
    });
}

module.exports = { verifyDataIntegrity }; 