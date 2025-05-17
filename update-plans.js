const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

// Define the standard and custom age rules
const standardAgeRules = {
  type: 'standard'
};

const crowdHealthAgeRules = {
  type: 'custom',
  customBrackets: {
    ranges: [
      { min: 18, max: 54, bracket: '18-54' },
      { min: 55, max: 64, bracket: '55-64' }
    ]
  }
};

// Add these validation functions at the top level
function sanitizeNumber(value) {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const cleaned = value.replace(/[^0-9.]/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? null : num;
  }
  return null;
}

function validatePlanData(plan) {
  // Validate required fields
  if (!plan.id || !plan.providerName) {
    throw new Error(`Invalid plan data: missing required fields for plan ${plan.id || 'unknown'}`);
  }

  // Validate plan ID format
  if (!/^[a-z0-9-]+$/.test(plan.id)) {
    throw new Error(`Invalid plan ID format: ${plan.id}`);
  }

  // Validate provider name
  if (typeof plan.providerName !== 'string' || plan.providerName.length > 100) {
    throw new Error(`Invalid provider name: ${plan.providerName}`);
  }

  // Validate plan name
  if (plan.planName && (typeof plan.planName !== 'string' || plan.planName.length > 100)) {
    throw new Error(`Invalid plan name: ${plan.planName}`);
  }

  // Validate costs
  plan.planMatrix.forEach((matrix, matrixIndex) => {
    matrix.costs.forEach((cost, costIndex) => {
      if (typeof cost.monthlyPremium !== 'number' || cost.monthlyPremium < 0) {
        throw new Error(`Invalid monthly premium at matrix[${matrixIndex}].costs[${costIndex}]`);
      }
      if (typeof cost.initialUnsharedAmount !== 'number' || cost.initialUnsharedAmount < 0) {
        throw new Error(`Invalid initial unshared amount at matrix[${matrixIndex}].costs[${costIndex}]`);
      }
    });
  });
}

// Process Excel file
async function processExcelFile(filePath) {
  try {
    // Validate file exists and is readable
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    // Validate file size (e.g., 10MB limit)
    const stats = fs.statSync(filePath);
    const fileSizeInMB = stats.size / (1024 * 1024);
    if (fileSizeInMB > 10) {
      throw new Error(`File too large: ${fileSizeInMB.toFixed(2)}MB. Maximum size is 10MB.`);
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    
    // Look for the "Cost Matrix" sheet or use the first sheet
    const sheetName = workbook.worksheets.find(sheet => 
      sheet.name.includes("Cost Matrix")
    )?.name || workbook.worksheets[0].name;
    
    console.log(`Using sheet: ${sheetName}`);
    const worksheet = workbook.getWorksheet(sheetName);
    
    // Convert to JSON with validation
    const data = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // Skip header row
      
      const rowData = {};
      row.eachCell((cell, colNumber) => {
        const header = worksheet.getRow(1).getCell(colNumber).value;
        if (header) {
          // Sanitize the value
          let value = cell.value;
          if (typeof value === 'string') {
            value = value.trim();
          }
          rowData[header] = value;
        }
      });
      
      // Only add rows that have at least a provider name
      if (rowData['Provider Name']) {
        data.push(rowData);
      }
    });

    return data;
  } catch (error) {
    console.error('Error processing Excel file:', error.message);
    throw error;
  }
}

// Transform data into provider plans
function transformToProviderPlans(data) {
  const providerPlans = {};
  
  // Track current context for rows without complete information
  let currentProvider = '';
  let currentPlan = '';
  let currentAgeBracket = '';
  let currentHouseholdType = '';
  
  // Helper function to safely get string value
  const safeString = (value) => {
    if (value === undefined || value === null) return '';
    return String(value).trim();
  };
  
  // Process each row
  data.forEach(row => {
    // Update tracking context when values are present
    if (row['Provider Name']) currentProvider = safeString(row['Provider Name']);
    if (row['Plan Name']) currentPlan = safeString(row['Plan Name']);
    if (row['Age Bracket']) currentAgeBracket = safeString(row['Age Bracket']);
    if (row['Household Size']) currentHouseholdType = safeString(row['Household Size']);
    
    // Skip rows with no provider information
    if (!currentProvider) return;
    
    // For providers like CrowdHealth and Knew Health that don't have plan names,
    // use a special internal placeholder
    if (!currentPlan && (currentProvider === 'CrowdHealth' || currentProvider === 'Knew Health')) {
      currentPlan = '_NO_PLAN_NAME_';
    }
    
    // Skip rows with no plan information (after potential placeholder assignment)
    if (!currentPlan) return;
    
    // Create plan ID with additional sanitization
    const sanitizedProvider = currentProvider.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const sanitizedPlan = currentPlan === '_NO_PLAN_NAME_' ? 'basic' : 
      currentPlan.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const planId = `${sanitizedProvider}-${sanitizedPlan}`;
    
    // Initialize plan if needed
    if (!providerPlans[planId]) {
      providerPlans[planId] = {
        id: planId,
        providerName: currentProvider,
        planName: currentPlan === '_NO_PLAN_NAME_' ? '' : currentPlan,
        maxCoverage: safeString(row['Maximum Incident Coverage ($)']) || 'No limit',
        annualUnsharedAmount: safeString(row['Annual Unshared Amount ($)']) || 'Total of paid three IUAs in 12 months',
        sourceUrl: safeString(row['Source URL']) || '',
        ageRules: currentProvider.includes('CrowdHealth') ? crowdHealthAgeRules : standardAgeRules,
        planMatrix: []
      };
    }
    
    // Skip rows with no pricing information
    const monthlyPremiumStr = safeString(row['Monthly Premium ($)']);
    const initialUnsharedAmountStr = safeString(row['Initial Unshared Amount ($)']);
    
    if (!monthlyPremiumStr || !initialUnsharedAmountStr || !currentAgeBracket || !currentHouseholdType) return;
    
    // Clean price strings and convert to numbers with validation
    const monthlyPremium = sanitizeNumber(monthlyPremiumStr);
    const initialUnsharedAmount = sanitizeNumber(initialUnsharedAmountStr);
    
    if (monthlyPremium === null || initialUnsharedAmount === null) {
      console.warn(`Warning: Invalid price format for ${currentProvider} - ${currentPlan}`);
      return;
    }
    
    // Validate and convert age bracket and household type
    const ageBracket = validateAgeBracket(currentAgeBracket);
    const householdType = validateHouseholdType(currentHouseholdType);
    
    if (!ageBracket || !householdType) {
      console.warn(`Warning: Invalid age bracket "${currentAgeBracket}" or household type "${currentHouseholdType}" for ${currentProvider} - ${currentPlan}`);
      return;
    }
    
    // Find or create matrix entry
    let matrixEntry = providerPlans[planId].planMatrix.find(
      entry => entry.ageBracket === ageBracket && entry.householdType === householdType
    );
    
    if (!matrixEntry) {
      matrixEntry = {
        ageBracket,
        householdType,
        costs: []
      };
      providerPlans[planId].planMatrix.push(matrixEntry);
    }
    
    // Add cost if not already present
    const costExists = matrixEntry.costs.some(
      cost => cost.monthlyPremium === monthlyPremium && cost.initialUnsharedAmount === initialUnsharedAmount
    );
    
    if (!costExists) {
      matrixEntry.costs.push({
        monthlyPremium,
        initialUnsharedAmount
      });
    }
  });
  
  // Sort costs by initialUnsharedAmount for each matrix entry
  Object.values(providerPlans).forEach(plan => {
    plan.planMatrix.forEach(entry => {
      entry.costs.sort((a, b) => a.initialUnsharedAmount - b.initialUnsharedAmount);
    });
  });

  // Validate all plans before returning
  const plans = Object.values(providerPlans);
  plans.forEach(validatePlanData);
  
  return plans;
}

// Helper function to validate age bracket
function validateAgeBracket(value) {
  const validAgeBrackets = ['18-29', '30-39', '40-49', '50-64', '18-54', '55-64', '30-49', '50-59', '60-64', '18-55', '30-64', '50-65'];
  return validAgeBrackets.includes(value) ? value : null;
}

// Helper function to validate household type
function validateHouseholdType(value) {
  const validHouseholdTypes = [
    'Member Only', 
    'Member & Spouse', 
    'Member & Spouse ',
    'Member & Child(ren)', 
    'Member & Family',
    'Member & Family (5+)'
  ];
  return validHouseholdTypes.includes(value) ? value : null;
}

// Validate generated plans to catch potential issues
function validatePlans(plans) {
  // Check for plans with no matrix entries
  const emptyMatrixPlans = plans.filter(plan => !plan.planMatrix.length);
  if (emptyMatrixPlans.length) {
    console.warn(`Warning: ${emptyMatrixPlans.length} plans have empty matrices:`, 
      emptyMatrixPlans.map(p => `${p.providerName} - ${p.planName}`).join(', '));
  }
  
  // Check for matrix entries with no costs
  let emptyEntriesCount = 0;
  plans.forEach(plan => {
    const emptyEntries = plan.planMatrix.filter(entry => !entry.costs.length);
    emptyEntriesCount += emptyEntries.length;
    
    if (emptyEntries.length) {
      console.warn(`Warning: ${plan.providerName} - ${plan.planName} has ${emptyEntries.length} matrix entries with no costs`);
    }
  });
  
  if (emptyEntriesCount) {
    console.warn(`Warning: Total of ${emptyEntriesCount} matrix entries with no costs found`);
  }
  
  // Check for CrowdHealth plans to ensure they have the correct age rules
  const crowdHealthPlans = plans.filter(plan => plan.providerName === 'CrowdHealth');
  if (crowdHealthPlans.length) {
    console.log(`Found ${crowdHealthPlans.length} CrowdHealth plans`);
    crowdHealthPlans.forEach(plan => {
      if (plan.ageRules.type !== 'custom') {
        console.warn(`Warning: CrowdHealth plan ${plan.id} has incorrect age rules type: ${plan.ageRules.type}`);
        // Fix the age rules
        plan.ageRules = crowdHealthAgeRules;
      }
    });
  } else {
    console.warn('Warning: No CrowdHealth plans found');
  }
  
  console.log('Validation complete.');
}

// Main function
async function updateProviderPlans(filePath, outputPath) {
  try {
    const data = await processExcelFile(filePath);
    const plans = transformToProviderPlans(data);
    validatePlans(plans);
    
    // Debug output for Sedera ACCESS+ +DPC/VPC
    console.log("\n=== SEDERA ACCESS+ +DPC/VPC DEBUG ===");
    const sederaDpcVpcPlan = plans.find(p => p.id.toLowerCase() === 'sedera-access+-+dpc/vpc');
    
    if (sederaDpcVpcPlan) {
      console.log(`Found plan: ${sederaDpcVpcPlan.id}`);
      console.log(`Matrix entries: ${sederaDpcVpcPlan.planMatrix.length}`);
      
      // Log all matrix entries
      console.log("Matrix entries:");
      sederaDpcVpcPlan.planMatrix.forEach((matrix, index) => {
        console.log(`  ${index + 1}. ${matrix.ageBracket}/${matrix.householdType} - ${matrix.costs.length} cost options`);
      });
      
      // Check specifically for 30-39 age bracket
      const age3039Entries = sederaDpcVpcPlan.planMatrix.filter(m => m.ageBracket === '30-39');
      console.log(`Found ${age3039Entries.length} entries for 30-39 age bracket:`);
      age3039Entries.forEach((matrix, index) => {
        console.log(`  ${index + 1}. ${matrix.householdType} - ${matrix.costs.length} cost options`);
      });
      
      // Check specifically for Member & Family household type
      const familyEntries = sederaDpcVpcPlan.planMatrix.filter(m => m.householdType === 'Member & Family');
      console.log(`Found ${familyEntries.length} entries for Member & Family household type:`);
      familyEntries.forEach((matrix, index) => {
        console.log(`  ${index + 1}. ${matrix.ageBracket} - ${matrix.costs.length} cost options`);
      });
      
      // Look for 30-39/Member & Family specifically
      const specificEntry = sederaDpcVpcPlan.planMatrix.find(
        m => m.ageBracket === '30-39' && m.householdType === 'Member & Family'
      );
      console.log(`Found 30-39/Member & Family entry: ${specificEntry ? 'YES' : 'NO'}`);
      
      // Check raw data for 30-39/Member & Family for Sedera DPC/VPC
      console.log("\nChecking raw data for Sedera ACCESS+ +DPC/VPC with 30-39/Member & Family:");
      const rawData = data.filter(row => {
        return (row['Provider Name'] === 'Sedera' && 
                row['Plan Name'] && row['Plan Name'].includes('+DPC/VPC') &&
                row['Age Bracket'] === '30-39' && 
                row['Household Size'] === 'Member & Family');
      });
      console.log(`Found ${rawData.length} matching raw data rows`);
      if (rawData.length > 0) {
        console.log("Example raw data:", JSON.stringify(rawData[0], null, 2));
      }
    } else {
      console.log("Sedera ACCESS+ +DPC/VPC plan not found!");
    }
    console.log("=== END SEDERA DEBUG ===\n");
    
    // Default output path if not specified
    const finalOutputPath = outputPath || path.join(process.cwd(), 'data', 'provider-plans.ts');
    
    // Generate TypeScript file
    const tsContent = `// Auto-generated on ${new Date().toISOString()}
import { PricingPlan, ProviderAgeRules } from '@/types/provider-plans';

const standardAgeRules: ProviderAgeRules = {
  type: 'standard'
};

const crowdHealthAgeRules: ProviderAgeRules = {
  type: 'custom',
  customBrackets: {
    ranges: [
      { min: 18, max: 54, bracket: '18-54' },
      { min: 55, max: 64, bracket: '55-64' }
    ]
  }
};

export const providerPlans: PricingPlan[] = ${JSON.stringify(plans, null, 2)
  .replace(/"ageRules": {"type": "standard"}/, 'ageRules: standardAgeRules')
  .replace(/"ageRules": {"type": "custom".*?}}/g, 'ageRules: crowdHealthAgeRules')};
`;
    
    // Write the file
    fs.writeFileSync(finalOutputPath, tsContent);
    console.log(`Successfully updated provider plans at ${finalOutputPath}`);
    console.log(`Processed ${plans.length} plans with ${plans.reduce((sum, plan) => sum + plan.planMatrix.length, 0)} matrix entries`);
    
    return plans;
  } catch (error) {
    console.error('Failed to update provider plans:', error);
    throw error;
  }
}

// If this file is run directly
if (require.main === module) {
  const filePath = process.argv[2] || 'healthshare-plans.xlsx';
  const outputPath = process.argv[3] || 'provider-plans.json';
  
  updateProviderPlans(filePath, outputPath)
    .catch(error => {
      console.error('Failed to update plans:', error);
      process.exit(1);
    });
}

module.exports = { updateProviderPlans, processExcelFile }; 