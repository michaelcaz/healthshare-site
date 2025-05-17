const fs = require('fs');
const ExcelJS = require('exceljs');

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

    return data;
  } catch (error) {
    console.error('Error processing Excel file:', error.message);
    throw error;
  }
}

// If this file is run directly
if (require.main === module) {
  const filePath = 'healthshare-plans.xlsx';
  processExcelFile(filePath)
    .then(() => console.log('Processing complete'))
    .catch(error => {
      console.error('Failed to process file:', error);
      process.exit(1);
    });
}

module.exports = { processExcelFile }; 