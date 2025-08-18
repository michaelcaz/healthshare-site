/**
 * Test utility to validate ZIP code ranges for penalty state detection
 */

import { zipToState, isPenaltyState } from './zip-to-state';

// Test cases to validate our ZIP ranges
const TEST_CASES = {
  // Known penalty state ZIP codes that SHOULD trigger alerts
  shouldTrigger: [
    // Massachusetts
    { zip: '01001', expectedState: 'MA', location: 'Agawam, MA' },
    { zip: '02101', expectedState: 'MA', location: 'Boston, MA' },
    { zip: '02791', expectedState: 'MA', location: 'Westport, MA' },
    { zip: '01201', expectedState: 'MA', location: 'Pittsfield, MA' },
    
    // California  
    { zip: '90001', expectedState: 'CA', location: 'Los Angeles, CA' },
    { zip: '90210', expectedState: 'CA', location: 'Beverly Hills, CA' },
    { zip: '94102', expectedState: 'CA', location: 'San Francisco, CA' },
    { zip: '96162', expectedState: 'CA', location: 'Yuba City, CA' },
    
    // New Jersey
    { zip: '07001', expectedState: 'NJ', location: 'Newark, NJ' },
    { zip: '08989', expectedState: 'NJ', location: 'Trenton area, NJ' },
    { zip: '07302', expectedState: 'NJ', location: 'Jersey City, NJ' },
    
    // Rhode Island
    { zip: '02801', expectedState: 'RI', location: 'Narragansett, RI' },
    { zip: '02940', expectedState: 'RI', location: 'Providence, RI' },
    { zip: '02903', expectedState: 'RI', location: 'Providence, RI' },
    
    // Washington DC
    { zip: '20001', expectedState: 'DC', location: 'Washington, DC' },
    { zip: '20599', expectedState: 'DC', location: 'Washington, DC' },
    { zip: '20002', expectedState: 'DC', location: 'Washington, DC' }
  ],
  
  // ZIP codes that might be MISSED (penalty states outside our ranges)
  potentialMisses: [
    { zip: '01000', location: 'Massachusetts (below range)' },
    { zip: '02792', location: 'Massachusetts (above range)' }, 
    { zip: '01430', location: 'Ashburnham, MA' },
    { zip: '02790', location: 'Westport, MA' },
    { zip: '89999', location: 'California (below range)' },
    { zip: '96163', location: 'California (above range)' },
    { zip: '06999', location: 'New Jersey (below range)' },
    { zip: '08990', location: 'New Jersey (above range)' },
    { zip: '02800', location: 'Rhode Island (below range)' },
    { zip: '02941', location: 'Rhode Island (above range)' },
    { zip: '19999', location: 'DC (below range)' },
    { zip: '20600', location: 'DC (above range)' }
  ],
  
  // ZIP codes that should NOT trigger (non-penalty states)
  shouldNotTrigger: [
    { zip: '10001', location: 'New York, NY' },
    { zip: '60601', location: 'Chicago, IL' },
    { zip: '77001', location: 'Houston, TX' },
    { zip: '33101', location: 'Miami, FL' },
    { zip: '98101', location: 'Seattle, WA' },
    { zip: '30301', location: 'Atlanta, GA' },
    { zip: '80201', location: 'Denver, CO' }
  ],
  
  // Boundary edge cases
  edgeCases: [
    { zip: '01000', location: 'One below MA min' },
    { zip: '02792', location: 'One above MA max' },
    { zip: '89999', location: 'One below CA min' }, 
    { zip: '96163', location: 'One above CA max' },
    { zip: '06999', location: 'One below NJ min' },
    { zip: '08990', location: 'One above NJ max' },
    { zip: '02800', location: 'One below RI min' },
    { zip: '02941', location: 'One above RI max' },
    { zip: '19999', location: 'One below DC min' },
    { zip: '20600', location: 'One above DC max' }
  ]
};

export function runZipCodeTests() {
  console.log('🧪 Testing ZIP Code Range Accuracy...\n');
  
  let totalTests = 0;
  let passedTests = 0;
  let issues: string[] = [];
  
  // Test cases that SHOULD trigger
  console.log('✅ Testing ZIP codes that SHOULD trigger penalty alerts:');
  TEST_CASES.shouldTrigger.forEach(testCase => {
    totalTests++;
    const result = zipToState(testCase.zip);
    const passed = result === testCase.expectedState;
    
    if (passed) {
      passedTests++;
      console.log(`  ✓ ${testCase.zip} (${testCase.location}) → ${result}`);
    } else {
      console.log(`  ✗ ${testCase.zip} (${testCase.location}) → Expected: ${testCase.expectedState}, Got: ${result}`);
      issues.push(`MISS: ${testCase.zip} (${testCase.location}) should trigger ${testCase.expectedState} alert`);
    }
  });
  
  // Test edge cases (potential misses)
  console.log('\n⚠️  Testing potential MISSED penalty state ZIP codes:');
  TEST_CASES.potentialMisses.forEach(testCase => {
    totalTests++;
    const result = zipToState(testCase.zip);
    
    if (result === null) {
      console.log(`  ⚠️  ${testCase.zip} (${testCase.location}) → No alert (potential miss?)`);
      issues.push(`POTENTIAL MISS: ${testCase.zip} (${testCase.location}) might be a penalty state`);
    } else {
      passedTests++;
      console.log(`  ✓ ${testCase.zip} (${testCase.location}) → ${result} (covered)`);
    }
  });
  
  // Test cases that should NOT trigger
  console.log('\n❌ Testing ZIP codes that should NOT trigger alerts:');
  TEST_CASES.shouldNotTrigger.forEach(testCase => {
    totalTests++;
    const result = zipToState(testCase.zip);
    const passed = result === null;
    
    if (passed) {
      passedTests++;
      console.log(`  ✓ ${testCase.zip} (${testCase.location}) → No alert`);
    } else {
      console.log(`  ✗ ${testCase.zip} (${testCase.location}) → Incorrectly triggered: ${result}`);
      issues.push(`FALSE POSITIVE: ${testCase.zip} (${testCase.location}) incorrectly triggers ${result} alert`);
    }
  });
  
  // Summary
  console.log(`\n📊 Test Results: ${passedTests}/${totalTests} passed`);
  
  if (issues.length > 0) {
    console.log('\n🚨 Issues Found:');
    issues.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue}`);
    });
  } else {
    console.log('\n🎉 All tests passed!');
  }
  
  return {
    total: totalTests,
    passed: passedTests,
    issues: issues
  };
}
