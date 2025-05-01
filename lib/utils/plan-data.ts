import { PricingPlan } from '@/types/provider-plans';
import { planDetailsData } from '@/data/plan-details-data';
import { defaultPlanDetailsData, PlanDetailsData } from '@/types/plan-details';

/**
 * Gets the correct plan details data for a given plan, handling special cases like
 * the Sedera Access+ +DPC/VPC plan which might have ID variations.
 * 
 * @param plan The plan object or ID string
 * @returns The matching plan details data or default data if not found
 */
export function getPlanDetailsData(plan: PricingPlan | string): PlanDetailsData {
  const planId = typeof plan === 'string' ? plan : plan.id;
  const planName = typeof plan === 'string' ? '' : plan.planName;
  
  console.log(`getPlanDetailsData called for plan: ${planId} (${planName || 'no name'})`);
  
  // Check if planId exists directly in planDetailsData
  if (planDetailsData[planId]) {
    console.log(`Found exact plan data match for ID: ${planId}`);
    return planDetailsData[planId];
  }
  
  // Try to normalize the plan ID
  console.log(`Plan data not found directly for ID: ${planId}, attempting to find match...`);
  
  // Handle special cases for Sedera plans
  if (planId.toLowerCase().includes('sedera')) {
    console.log(`This is a Sedera plan: ${planId}`);
    
    // Check for Sedera Access+ +DPC/VPC plan with various possible identifiers
    const isDpcVpc = 
      planId.toLowerCase() === 'sedera-access+-+dpc/vpc' || 
      planId.toLowerCase().includes('dpc') || 
      planId.toLowerCase().includes('vpc') || 
      (planName && (
        planName.toLowerCase().includes('dpc') || 
        planName.toLowerCase().includes('vpc')
      ));
    
    if (isDpcVpc) {
      console.log(`This appears to be a Sedera Access+ +DPC/VPC plan: ${planId} (${planName || ''})`);
      
      // Check if the 'sedera-access+-+dpc/vpc' key exists in our plan data
      if (planDetailsData['sedera-access+-+dpc/vpc']) {
        console.log(`Using sedera-access+-+dpc/vpc plan data for ${planId}`);
        return planDetailsData['sedera-access+-+dpc/vpc'];
      }
    } 
    // Regular Sedera Access+ plan (non-DPC/VPC)
    else if (planId.toLowerCase().includes('access+')) {
      console.log(`This appears to be a regular Sedera Access+ plan: ${planId}`);
      
      // Check for regular Sedera Access+ plan data
      if (planDetailsData['sedera-access+']) {
        console.log(`Using sedera-access+ plan data for ${planId}`);
        return planDetailsData['sedera-access+'];
      }
    }
  }
  
  // If we get here, try matching on plan name patterns for additional robustness
  // This catches any case where the ID structure varies but the plan name is indicative
  if (planName) {
    console.log(`Trying to match based on plan name: ${planName}`);
    
    if (planName.toLowerCase().includes('sedera') && 
        planName.toLowerCase().includes('access+')) {
      
      if (planName.toLowerCase().includes('dpc') || 
          planName.toLowerCase().includes('vpc')) {
        console.log(`Plan name suggests this is a Sedera Access+ +DPC/VPC plan`);
        if (planDetailsData['sedera-access+-+dpc/vpc']) {
          return planDetailsData['sedera-access+-+dpc/vpc'];
        }
      } else {
        console.log(`Plan name suggests this is a regular Sedera Access+ plan`);
        if (planDetailsData['sedera-access+']) {
          return planDetailsData['sedera-access+'];
        }
      }
    }
  }
  
  // Add more special cases here if needed
  
  // If no matching plan data found, return default data
  console.log(`No matching plan data found for ${planId}, using default data`);
  return defaultPlanDetailsData;
} 