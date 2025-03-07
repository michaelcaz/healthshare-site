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
    // Get the appropriate age bracket based on the plan's age rules
    const ageBracket = getAgeBracket(response.age, plan.ageRules);
    
    // Get the household type from the coverage type
    const householdType = COVERAGE_TYPE_MAP[response.coverage_type];
    if (!householdType) return null;

    // Find all matching matrix entries
    const eligiblePrices = plan.planMatrix
      .filter(matrix => {
        // Check if the age bracket matches directly or if the age falls within the bracket range
        const bracketMatches = matrix.ageBracket === ageBracket || 
                              isAgeInBracket(response.age, matrix.ageBracket);
        return bracketMatches && matrix.householdType === householdType;
      })
      .flatMap(matrix => matrix.costs)
      .filter(cost => {
        // Special case for plans with fixed IUAs
        if (plan.id.includes('crowdhealth')) {
          return true; // Always include CrowdHealth since it has a fixed IUA
        }
        
        // For other plans, filter by IUA preference if specified
        if (response.iua_preference) {
          return cost.initialUnsharedAmount.toString() === response.iua_preference;
        }
        
        return true; // Include all costs if no IUA preference
      });
    
    // Return the eligible plan if there are matching prices
    return eligiblePrices.length ? {
      id: plan.id,
      providerName: plan.providerName,
      planName: plan.planName,
      maxCoverage: plan.maxCoverage,
      eligiblePrices
    } : null;
  }
}