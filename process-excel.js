const fs = require('fs');
const XLSX = require('xlsx');

// Read the Excel file
const workbook = XLSX.readFile('healthshare-plans.xlsx');

// Look for the "Cost Matrix" sheet or use the first sheet
const sheetName = workbook.SheetNames.find(name => name.includes("Cost Matrix")) || workbook.SheetNames[0];

console.log(`Using sheet: ${sheetName}`);
const worksheet = workbook.Sheets[sheetName];

// Convert to JSON
const data = XLSX.utils.sheet_to_json(worksheet);

console.log(`Total rows: ${data.length}`);

// Print all unique provider names and plan names
const providerNames = new Set();
const planNames = new Set();
const ageBrackets = new Set();
const householdTypes = new Set();

data.forEach((row) => {
  if (row['Provider Name']) providerNames.add(row['Provider Name']);
  if (row['Plan Name']) planNames.add(row['Plan Name']);
  if (row['Age Bracket']) ageBrackets.add(row['Age Bracket']);
  if (row['Household Size']) householdTypes.add(row['Household Size']);
});

console.log('\nUnique Provider Names:');
console.log(Array.from(providerNames).sort());

console.log('\nUnique Plan Names:');
console.log(Array.from(planNames).sort());

console.log('\nUnique Age Brackets:');
console.log(Array.from(ageBrackets).sort());

console.log('\nUnique Household Types:');
console.log(Array.from(householdTypes).sort());

// Check for 30-39 age bracket
const age3039Entries = data.filter((row) => {
  return row['Age Bracket'] === '30-39';
});

console.log(`\nFound ${age3039Entries.length} entries with age bracket 30-39`);

// Group by provider and plan
const planGroups = {};

data.forEach((row) => {
  const providerName = row['Provider Name'] || 'Unknown';
  const planName = row['Plan Name'] || 'Unknown';
  const key = `${providerName} - ${planName}`;
  
  if (!planGroups[key]) {
    planGroups[key] = {
      ageBrackets: new Set(),
      householdTypes: new Set(),
      rows: []
    };
  }
  
  if (row['Age Bracket']) planGroups[key].ageBrackets.add(row['Age Bracket']);
  if (row['Household Size']) planGroups[key].householdTypes.add(row['Household Size']);
  planGroups[key].rows.push(row);
});

console.log('\nPlans and their coverage:');
Object.entries(planGroups).forEach(([planKey, info]) => {
  console.log(`\n${planKey}:`);
  console.log(`  Age Brackets: ${Array.from(info.ageBrackets).sort().join(', ')}`);
  console.log(`  Household Types: ${Array.from(info.householdTypes).sort().join(', ')}`);
  console.log(`  Total Entries: ${info.rows.length}`);
  
  // Check if this plan has 30-39 age bracket
  const has3039 = info.ageBrackets.has('30-39');
  console.log(`  Has 30-39 Age Bracket: ${has3039 ? 'Yes' : 'No'}`);
}); 