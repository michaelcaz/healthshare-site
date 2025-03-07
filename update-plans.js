const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

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

// Process Excel file
function processExcelFile(filePath) {
  // Read the Excel file
  const workbook = XLSX.readFile(filePath);
  
  // Look for the "Cost Matrix" sheet or use the first sheet
  const sheetName = workbook.SheetNames.find(name => name.includes("Cost Matrix")) || workbook.SheetNames[0];
  
  console.log(`Using sheet: ${sheetName}`);
  const worksheet = workbook.Sheets[sheetName];
  
  // Convert to JSON
  return XLSX.utils.sheet_to_json(worksheet);
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
    
    // Create plan ID
    const planId = `${currentProvider.toLowerCase().replace(/\s+/g, '-')}-${currentPlan === '_NO_PLAN_NAME_' ? 'basic' : currentPlan.toLowerCase().replace(/\s+/g, '-')}`;
    
    // Initialize plan if needed
    if (!providerPlans[planId]) {
      providerPlans[planId] = {
        id: planId,
        providerName: currentProvider,
        planName: currentPlan === '_NO_PLAN_NAME_' ? '' : currentPlan, // Store empty string for display
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
    
    // Clean price strings and convert to numbers
    const monthlyPremium = parseFloat(monthlyPremiumStr.replace(/[$,]/g, ''));
    const initialUnsharedAmount = parseFloat(initialUnsharedAmountStr.replace(/[$,]/g, ''));
    
    if (isNaN(monthlyPremium) || isNaN(initialUnsharedAmount)) return;
    
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
  
  return Object.values(providerPlans);
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
function updateProviderPlans(filePath, outputPath) {
  try {
    // Process the Excel file
    const data = processExcelFile(filePath);
    console.log(`Processed ${data.length} rows from Excel file`);
    
    // Transform the data into provider plans
    const plans = transformToProviderPlans(data);
    console.log(`Generated ${plans.length} provider plans`);
    
    // Validate plans
    validatePlans(plans);
    
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

// Run the update
updateProviderPlans('healthshare-plans.xlsx'); 