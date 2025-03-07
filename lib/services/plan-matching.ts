import { QuestionnaireResponse } from '@/types/questionnaire';
import { PricingPlan, EligiblePlan, HouseholdType, CoverageType } from '@/types/provider-plans';
import { getAgeBracket, isAgeInBracket } from '../plan-matching/age-brackets';

const COVERAGE_TYPE_MAP: Record<CoverageType, HouseholdType> = {
  'just_me': 'Member Only',
  'me_spouse': 'Member & Spouse',
  'me_kids': 'Member & Child(ren)',
  'family': 'Member & Family'
} as const;

export class PlanMatchingService {
  constructor(private plans: PricingPlan[]) {}

  findEligiblePlans(response: QuestionnaireResponse): EligiblePlan[] {
    return this.plans
      .map(plan => this.matchPlan(plan, response))
      .filter((plan): plan is EligiblePlan => plan !== null);
  }

  private matchPlan(plan: PricingPlan, response: QuestionnaireResponse) {
    // Special handling for CrowdHealth plans
    if (plan.id.includes('crowdhealth')) {
      console.log(`===== SPECIAL HANDLING FOR CROWDHEALTH PLAN ${plan.id} =====`);
      
      // For CrowdHealth, we'll match based on age range directly rather than using age brackets
      const age = response.age;
      const householdType = COVERAGE_TYPE_MAP[response.coverage_type];
      
      if (!householdType) {
        console.log(`No matching household type for coverage type ${response.coverage_type}`);
        return null;
      }
      
      console.log(`Looking for CrowdHealth matrix entries for age ${age} and household type ${householdType}`);
      
      // Find matching matrix entries
      const matchingMatrices = plan.planMatrix.filter(matrix => {
        // Parse the age bracket to get min and max ages
        const bracketMatch = matrix.ageBracket.match(/^(\d+)-(\d+)$/);
        if (!bracketMatch) {
          console.log(`Invalid age bracket format: ${matrix.ageBracket}`);
          return false;
        }
        
        const minAge = parseInt(bracketMatch[1], 10);
        const maxAge = parseInt(bracketMatch[2], 10);
        const ageMatches = age >= minAge && age <= maxAge;
        const householdMatches = matrix.householdType === householdType;
        
        console.log(`Matrix ${matrix.ageBracket}/${matrix.householdType}: ageMatches=${ageMatches}, householdMatches=${householdMatches}`);
        
        return ageMatches && householdMatches;
      });
      
      console.log(`Found ${matchingMatrices.length} matching matrices for CrowdHealth plan`);
      
      if (matchingMatrices.length === 0) {
        console.log(`No matching matrices found for CrowdHealth plan, returning null`);
        return null;
      }
      
      // Get all costs from matching matrices - for CrowdHealth, we ignore IUA preference
      // since it only offers a single IUA option of 500
      const eligiblePrices = matchingMatrices.flatMap(matrix => matrix.costs);
      console.log(`Found ${eligiblePrices.length} eligible prices for CrowdHealth plan:`, JSON.stringify(eligiblePrices));
      
      if (eligiblePrices.length === 0) {
        console.log(`No eligible prices found for CrowdHealth plan, returning null`);
        return null;
      }
      
      // Return the eligible plan
      const result = {
        id: plan.id,
        providerName: plan.providerName,
        planName: plan.planName,
        maxCoverage: plan.maxCoverage,
        eligiblePrices
      };
      
      console.log(`Successfully matched CrowdHealth plan ${plan.id}`);
      return result;
    }
    
    // Regular handling for other plans
    // Get the appropriate age bracket based on the plan's age rules
    const ageBracket = getAgeBracket(response.age, plan.ageRules);
    
    // Get the household type from the coverage type
    const householdType = COVERAGE_TYPE_MAP[response.coverage_type];
    if (!householdType) return null;

    // Add detailed logging for debugging
    console.log(`===== MATCHING PLAN ${plan.id} =====`);
    console.log(`Age: ${response.age}, Age Bracket: ${ageBracket}`);
    console.log(`Coverage Type: ${response.coverage_type}, Household Type: ${householdType}`);
    console.log(`IUA Preference: ${response.iua_preference}`);
    console.log(`Plan Age Rules:`, JSON.stringify(plan.ageRules));
    console.log(`Plan Matrix:`, JSON.stringify(plan.planMatrix));
    
    // Find all matching matrix entries
    const matchingMatrices = plan.planMatrix.filter(matrix => {
      // Check if the age bracket matches directly or if the age falls within the bracket range
      const bracketMatches = matrix.ageBracket === ageBracket || 
                            isAgeInBracket(response.age, matrix.ageBracket);
      const householdMatches = matrix.householdType === householdType;
      
      console.log(`Matrix ${matrix.ageBracket}/${matrix.householdType}: bracketMatches=${bracketMatches}, householdMatches=${householdMatches}`);
      
      return bracketMatches && householdMatches;
    });
    
    console.log(`Found ${matchingMatrices.length} matching matrices for plan ${plan.id}`);
    
    if (matchingMatrices.length === 0) {
      console.log(`No matching matrices found for plan ${plan.id}, returning null`);
      return null;
    }
    
    const allCosts = matchingMatrices.flatMap(matrix => matrix.costs);
    console.log(`All costs for plan ${plan.id}:`, JSON.stringify(allCosts));
    
    const eligiblePrices = allCosts.filter(cost => {
      // For other plans, filter by IUA preference if specified
      if (response.iua_preference) {
        const matches = cost.initialUnsharedAmount.toString() === response.iua_preference;
        console.log(`Checking IUA preference for plan ${plan.id}: ${cost.initialUnsharedAmount} vs ${response.iua_preference}, matches=${matches}`);
        return matches;
      }
      
      return true; // Include all costs if no IUA preference
    });
    
    console.log(`Found ${eligiblePrices.length} eligible prices for plan ${plan.id}`);
    
    if (eligiblePrices.length === 0) {
      console.log(`No eligible prices found for plan ${plan.id}, returning null`);
      return null;
    }
    
    // Return the eligible plan
    const result = {
      id: plan.id,
      providerName: plan.providerName,
      planName: plan.planName,
      maxCoverage: plan.maxCoverage,
      eligiblePrices
    };
    
    console.log(`Successfully matched plan ${plan.id}`);
    return result;
  }
}