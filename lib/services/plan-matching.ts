import { QuestionnaireResponse } from '@/types/questionnaire';
import { PricingPlan, EligiblePlan, HouseholdType } from '@/types/provider-plans';
import { getAgeBracket } from '../plan-matching/age-brackets';

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

    const householdType = this.getHouseholdType(response.household_size);
    const eligiblePrices = plan.planMatrix
      .filter(matrix => 
        matrix.ageBracket === ageBracket && 
        matrix.householdType === householdType
      )
      .flatMap(matrix => matrix.costs);
    
    return eligiblePrices.length ? {
      id: plan.id,
      providerName: plan.providerName,
      planName: plan.planName,
      maxCoverage: plan.maxCoverage,
      eligiblePrices
    } : null;
  }

  private getHouseholdType(size: number): HouseholdType {
    switch (size) {
      case 1: return 'Member Only';
      case 2: return 'Member & Spouse';
      case 3:
      case 4: return 'Member & Child(ren)';
      default: return 'Member & Family';
    }
  }
}