/**
 * Debug utility functions for the recommendation engine
 */
import { QuestionnaireResponse } from '@/types/questionnaire';
import { PricingPlan } from '@/types/provider-plans';

/**
 * Logs detailed information about plan filtering and selection
 * 
 * @param planId The plan ID to debug
 * @param activePlans All active plans before filtering
 * @param filteredPlans Plans after preference filtering
 * @param questionnaire The user's questionnaire response
 */
export function debugPlanSelection(
  planId: string, 
  activePlans: PricingPlan[], 
  filteredPlans: PricingPlan[],
  questionnaire: QuestionnaireResponse
): void {
  console.log(`\n====== DEBUG PLAN SELECTION: ${planId} ======`);
  
  // Check if plan exists in active plans
  const planInActive = activePlans.find(p => 
    p.id.toLowerCase() === planId.toLowerCase() ||
    (p.id.toLowerCase().includes(planId.toLowerCase()) && 
     (p.planName.toLowerCase().includes('dpc') || p.planName.toLowerCase().includes('vpc')))
  );
  
  console.log('1. Plan exists in active plans:', !!planInActive);
  if (planInActive) {
    console.log('   Details:', {
      id: planInActive.id,
      planName: planInActive.planName,
      providerName: planInActive.providerName
    });
  }
  
  // Check if plan was filtered out due to preventative services preference
  if (questionnaire.preventative_services === 'yes') {
    console.log('2. Preventative services preference: YES');
    
    // Check if this is a plan that should be filtered when preventative_services = yes
    const shouldBeFiltered = 
      // For Sedera Access+ +DPC/VPC
      (planId.toLowerCase().includes('sedera') && 
       planId.toLowerCase().includes('access+') &&
       (planId.toLowerCase().includes('dpc') || planId.toLowerCase().includes('vpc'))) ||
      // For Zion Essential
      (planId.toLowerCase().includes('zion') && 
       planId.toLowerCase().includes('essential'));
    
    console.log(`   Plan should be filtered: ${shouldBeFiltered}`);
    
    // Verify if plan was actually filtered out
    const planInFiltered = filteredPlans.find(p => 
      p.id.toLowerCase() === planId.toLowerCase() ||
      (p.id.toLowerCase().includes(planId.toLowerCase()) && 
       (p.planName.toLowerCase().includes('dpc') || p.planName.toLowerCase().includes('vpc')))
    );
    
    console.log(`   Plan present in filtered plans: ${!!planInFiltered}`);
    if (shouldBeFiltered && planInFiltered) {
      console.log('   WARNING: Plan should have been filtered out but is still present!');
    } else if (!shouldBeFiltered && !planInFiltered) {
      console.log('   WARNING: Plan should NOT have been filtered out but is missing!');
    }
  } else {
    console.log('2. Preventative services preference: NO');
    console.log('   All plans should be kept in filtered plans regardless of preventative coverage');
    
    // Verify plan is in filtered plans
    const planInFiltered = filteredPlans.find(p => 
      p.id.toLowerCase() === planId.toLowerCase() ||
      (p.id.toLowerCase().includes(planId.toLowerCase()) && 
       (p.planName.toLowerCase().includes('dpc') || p.planName.toLowerCase().includes('vpc')))
    );
    
    console.log(`   Plan present in filtered plans: ${!!planInFiltered}`);
    if (!planInFiltered) {
      console.log('   WARNING: Plan should be present but is missing from filtered plans!');
    }
  }
  
  console.log(`====== END DEBUG ${planId} ======\n`);
}

/**
 * Checks if the plan matrix has valid costs for the given parameters
 * 
 * @param plan The plan to check
 * @param age User's age
 * @param coverageType User's coverage type
 * @param iuaPreference User's IUA preference
 */
export function debugPlanCosts(
  plan: PricingPlan,
  age: number,
  coverageType: string,
  iuaPreference?: string
): void {
  console.log(`\n====== DEBUG PLAN COSTS: ${plan.id} ======`);
  
  // Log the plan matrix structure
  console.log(`Plan has ${plan.planMatrix?.length || 0} matrices`);
  
  if (!plan.planMatrix || plan.planMatrix.length === 0) {
    console.log('ERROR: Plan matrix is missing or empty!');
    console.log(`====== END DEBUG ${plan.id} ======\n`);
    return;
  }
  
  // Log each matrix and if it matches the age/coverage type
  plan.planMatrix.forEach((matrix, index) => {
    console.log(`Matrix ${index + 1}: ${matrix.ageBracket} / ${matrix.householdType}`);
    console.log(`- Has ${matrix.costs?.length || 0} cost options`);
    
    // Check if this matrix could apply to the user
    const ageParts = matrix.ageBracket.split('-');
    let ageMatches = false;
    
    if (ageParts.length === 2) {
      const minAge = parseInt(ageParts[0]);
      const maxAge = parseInt(ageParts[1]);
      ageMatches = age >= minAge && age <= maxAge;
    }
    
    console.log(`- Age ${age} matches ${matrix.ageBracket}: ${ageMatches}`);
    
    // Check if coverage type matches
    const coverageMatches = matrix.householdType.toLowerCase().includes(
      coverageType.toLowerCase().replace('_', ' ')
    );
    console.log(`- Coverage "${coverageType}" matches "${matrix.householdType}": ${coverageMatches}`);
    
    // Check if IUA preference is available in this matrix
    if (matrix.costs && matrix.costs.length > 0) {
      const availableIUAs = matrix.costs.map(c => c.initialUnsharedAmount);
      console.log(`- Available IUAs: ${availableIUAs.join(', ')}`);
      
      if (iuaPreference) {
        const iuaMatches = availableIUAs.includes(parseInt(iuaPreference));
        console.log(`- IUA preference ${iuaPreference} available: ${iuaMatches}`);
        
        if (!iuaMatches) {
          // Find closest IUA
          const preferredIUA = parseInt(iuaPreference);
          const closestIUA = availableIUAs.reduce((prev, curr) => 
            Math.abs(curr - preferredIUA) < Math.abs(prev - preferredIUA) ? curr : prev
          );
          console.log(`- Closest available IUA: ${closestIUA}`);
        }
      }
    } else {
      console.log('- ERROR: Matrix has no costs!');
    }
  });
  
  console.log(`====== END DEBUG ${plan.id} ======\n`);
} 