import { QuestionnaireResponse } from '@/types/questionnaire';
import { PricingPlan, EligiblePlan, HouseholdType, CoverageType } from '@/types/provider-plans';
import { getAgeBracket } from '../plan-matching/age-brackets';

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
    const ageBracket = getAgeBracket(response.age, plan.ageRules);
    if (!ageBracket) return null;

    const householdType = COVERAGE_TYPE_MAP[response.coverage_type];
    if (!householdType) return null;

    const eligiblePrices = plan.planMatrix
      .filter(matrix => 
        matrix.ageBracket === ageBracket && 
        matrix.householdType === householdType
      )
      .flatMap(matrix => matrix.costs)
      .filter(cost => {
        // Special case for CrowdHealth which has a fixed IUA of 500
        if (plan.id === 'crowdhealth-basic') {
          return true; // Always include CrowdHealth since it has a fixed IUA
        }
        // For other plans, filter by IUA preference
        return cost.initialUnsharedAmount.toString() === response.iua_preference;
      });
    
    return eligiblePrices.length ? {
      id: plan.id,
      providerName: plan.providerName,
      planName: plan.planName,
      maxCoverage: plan.maxCoverage,
      eligiblePrices
    } : null;
  }
}