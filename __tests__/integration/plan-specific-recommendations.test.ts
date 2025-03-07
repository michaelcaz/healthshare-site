import { describe, it, expect } from 'vitest';
import { PlanMatchingService } from '@/lib/services/plan-matching';
import { PlanScoringService } from '@/lib/services/plan-scoring';
import { QuestionnaireResponse } from '@/types/questionnaire';
import { providerPlans } from '@/data/provider-plans';

describe('Plan-Specific Recommendations Tests', () => {
  const planMatcher = new PlanMatchingService(providerPlans);
  const planScorer = new PlanScoringService();
  
  // Default questionnaire values
  const defaultQuestionnaire: Partial<QuestionnaireResponse> = {
    iua_preference: '1000',
    pregnancy: 'false',
    pre_existing: 'false',
    expense_preference: 'lower_monthly',
    zip_code: '12345',
    visit_frequency: 'just_checkups',
    medical_conditions: []
  };

  // Helper function to get top recommendation
  const getTopRecommendation = (response: QuestionnaireResponse) => {
    const eligiblePlans = planMatcher.findEligiblePlans(response);
    if (eligiblePlans.length === 0) return null;
    
    const scoredPlans = planScorer.scorePlans(eligiblePlans, response);
    return scoredPlans.length > 0 ? scoredPlans[0] : null;
  };

  describe('CrowdHealth Recommendations', () => {
    it('should recommend CrowdHealth for young individual with low healthcare needs', () => {
      const response: QuestionnaireResponse = {
        ...defaultQuestionnaire as QuestionnaireResponse,
        age: 28,
        coverage_type: 'just_me',
        visit_frequency: 'just_checkups',
        expense_preference: 'lower_monthly',
        pre_existing: 'false',
        pregnancy: 'false',
        pregnancy_planning: 'no'
      };
      
      const topRecommendation = getTopRecommendation(response);
      console.log('Top recommendation:', topRecommendation?.providerName, topRecommendation?.score);
      
      expect(topRecommendation).not.toBeNull();
      expect(topRecommendation?.providerName).toContain('CrowdHealth');
    });

    it('should recommend CrowdHealth for family with pregnancy planning', () => {
      const response: QuestionnaireResponse = {
        ...defaultQuestionnaire as QuestionnaireResponse,
        age: 32,
        coverage_type: 'family',
        visit_frequency: 'few_months',
        expense_preference: 'higher_monthly',
        pre_existing: 'false',
        pregnancy: 'false',
        pregnancy_planning: 'yes'
      };
      
      const topRecommendation = getTopRecommendation(response);
      console.log('Top recommendation:', topRecommendation?.providerName, topRecommendation?.score);
      
      expect(topRecommendation).not.toBeNull();
      expect(topRecommendation?.providerName).toContain('CrowdHealth');
    });
  });

  describe('Knew Health Recommendations', () => {
    it('should recommend Knew Health for middle-aged individual with pre-existing conditions', () => {
      const response: QuestionnaireResponse = {
        ...defaultQuestionnaire as QuestionnaireResponse,
        age: 48,
        coverage_type: 'just_me',
        visit_frequency: 'few_months',
        expense_preference: 'lower_monthly',
        pre_existing: 'true',
        medical_conditions: ['hypertension', 'high cholesterol'],
        pregnancy: 'false',
        pregnancy_planning: 'no'
      };
      
      const topRecommendation = getTopRecommendation(response);
      console.log('Top recommendation:', topRecommendation?.providerName, topRecommendation?.score);
      
      expect(topRecommendation).not.toBeNull();
      expect(topRecommendation?.providerName).toContain('Knew Health');
    });

    it('should recommend Knew Health for couple with comprehensive maternity needs', () => {
      const response: QuestionnaireResponse = {
        ...defaultQuestionnaire as QuestionnaireResponse,
        age: 32,
        coverage_type: 'me_spouse',
        visit_frequency: 'few_months',
        expense_preference: 'higher_monthly',
        pre_existing: 'false',
        pregnancy: 'false',
        pregnancy_planning: 'yes'
      };
      
      const topRecommendation = getTopRecommendation(response);
      console.log('Top recommendation:', topRecommendation?.providerName, topRecommendation?.score);
      
      expect(topRecommendation).not.toBeNull();
      expect(topRecommendation?.providerName).toContain('Knew Health');
    });
  });

  // Log all recommendations for a given scenario to help debug
  it('should log all recommendations for debugging', () => {
    const response: QuestionnaireResponse = {
      ...defaultQuestionnaire as QuestionnaireResponse,
      age: 32,
      coverage_type: 'me_spouse',
      visit_frequency: 'few_months',
      expense_preference: 'higher_monthly',
      pre_existing: 'false',
      pregnancy: 'false',
      pregnancy_planning: 'yes'
    };
    
    const eligiblePlans = planMatcher.findEligiblePlans(response);
    const scoredPlans = planScorer.scorePlans(eligiblePlans, response);
    
    console.log('All recommendations:');
    scoredPlans.forEach((plan, index) => {
      console.log(`${index + 1}. ${plan.providerName} - Score: ${plan.score}`);
      console.log(`   Factors: ${JSON.stringify(plan.factors)}`);
    });
    
    expect(scoredPlans.length).toBeGreaterThan(0);
  });
}); 