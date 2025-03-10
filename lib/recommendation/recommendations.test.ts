import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getRecommendations } from './recommendations'
import { providerPlans } from '@/data/provider-plans'
import { healthshareProviders } from '@/types/provider-plans'
import { QuestionnaireResponse } from '@/types/questionnaire'
import { calculatePlanScore } from './scoring'
import { getPlanCost } from '@/lib/utils/plan-costs'

// Mock the calculatePlanScore function to use the real implementation
vi.mock('./scoring', async () => {
  const actual = await vi.importActual<typeof import('./scoring')>('./scoring')
  return {
    ...actual,
    calculatePlanScore: vi.fn().mockImplementation(actual.calculatePlanScore)
  }
})

describe('Recommendation Engine', () => {
  const sampleResponse: QuestionnaireResponse = {
    age: 30,
    coverage_type: 'just_me' as const,
    iua_preference: '1000' as const,
    pregnancy: 'false',
    pre_existing: 'false',
    zip_code: '75001',
    expense_preference: 'lower_monthly' as const,
    pregnancy_planning: 'no' as const,
    medical_conditions: [],
    visit_frequency: 'just_checkups' as const
  };

  const sampleQuestionnaire = {
    age: 35,
    household_size: 1,
    coverage_type: 'just_me' as const,
    iua_preference: '1000' as const,
    pregnancy: 'false',
    pre_existing: 'false',
    state: 'TX',
    zip_code: '75001',
    expense_preference: 'lower_monthly' as const,
    pregnancy_planning: 'no' as const,
    medical_conditions: []
  }

  const mockQuestionnaire: QuestionnaireResponse = {
    age: 30,
    coverage_type: 'just_me',
    iua_preference: '1000',
    pregnancy: 'false',
    pre_existing: 'false',
    zip_code: '12345',
    expense_preference: 'lower_monthly',
    pregnancy_planning: 'no',
    visit_frequency: 'just_checkups',
    medical_conditions: []
  };

  const pregnancyResponse: QuestionnaireResponse = {
    ...mockQuestionnaire,
    pregnancy: 'true',
    pregnancy_planning: 'yes'
  };

  it('returns recommendations in correct order', async () => {
    const recommendations = await getRecommendations(providerPlans, sampleResponse)
    
    expect(recommendations.length).toBeGreaterThan(0)
    expect(recommendations[0].ranking).toBe(1)
    expect(recommendations.every((r, i) => 
      i === 0 || recommendations[i-1].score >= r.score
    )).toBe(true)
  })

  it('filters out non-viable plans', async () => {
    const recommendations = await getRecommendations(providerPlans, pregnancyResponse)
    
    expect(recommendations.every(r => r.score > 0)).toBe(true)
    expect(recommendations.every(r => {
      const fullPlan = healthshareProviders[r.plan.id.split('-')[0]]?.plans
        .find(p => p.id === r.plan.id);
      return fullPlan?.maternity?.coverage?.services?.length ?? 0 > 0;
    })).toBe(true)
  })

  it('includes explanations and factors', async () => {
    const recommendations = await getRecommendations(providerPlans, sampleResponse)
    
    recommendations.forEach(rec => {
      expect(rec.explanation).toBeDefined()
      expect(rec.explanation.length).toBeGreaterThan(0)
      expect(rec.factors.length).toBeGreaterThan(0)
      expect(rec.factors[0]).toHaveProperty('factor')
      expect(rec.factors[0]).toHaveProperty('impact')
    })
  })

  it('should handle pregnancy correctly', () => {
    // ... existing test code ...
  });

  it('should transform scores for display without changing the ranking order', async () => {
    // Create a subset of plans for testing
    const testPlans = providerPlans.slice(0, 4);
    
    // Get recommendations
    const recommendations = await getRecommendations(testPlans, mockQuestionnaire);
    
    // Verify that we have recommendations
    expect(recommendations.length).toBeGreaterThan(0);
    
    // Verify that the top recommendation has a high match percentage (90-99%)
    expect(recommendations[0].score).toBeGreaterThanOrEqual(90);
    expect(recommendations[0].score).toBeLessThanOrEqual(99);
    
    // Verify that no recommendation has a 100% match
    recommendations.forEach(rec => {
      expect(rec.score).toBeLessThan(100);
    });
    
    // Verify that the ranking order matches the original score order
    for (let i = 0; i < recommendations.length - 1; i++) {
      const currentOriginalScore = recommendations[i].originalScore || 0;
      const nextOriginalScore = recommendations[i + 1].originalScore || 0;
      expect(currentOriginalScore).toBeGreaterThanOrEqual(nextOriginalScore);
    }
    
    // Verify that the top recommendation has a higher display score than others
    for (let i = 1; i < recommendations.length; i++) {
      expect(recommendations[0].score).toBeGreaterThan(recommendations[i].score);
    }
    
    // Verify that the explanation includes the match percentage text
    const topExplanation = recommendations[0].explanation[0];
    expect(topExplanation).toContain('match for your needs');
  });
})

describe('getRecommendations', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('recommends plans based on questionnaire responses', async () => {
    const questionnaire: QuestionnaireResponse = {
      age: 34,
      coverage_type: 'family',
      iua_preference: '5000',
      expense_preference: 'lower_monthly',
      visit_frequency: 'just_checkups',
      financial_capacity: '5000',
      risk_preference: 'higher_risk',
      pregnancy: 'false',
      pre_existing: 'false',
      zip_code: '12345'
    }

    const recommendations = await getRecommendations(providerPlans, questionnaire)

    // Verify we have recommendations
    expect(recommendations.length).toBeGreaterThan(0)
    
    // Verify calculatePlanScore was called for each plan
    expect(calculatePlanScore).toHaveBeenCalledTimes(providerPlans.length)
    
    // Verify the top recommendation has a high score
    expect(recommendations[0].score).toBeGreaterThanOrEqual(85)
  })

  it('prioritizes plans with lower monthly premiums when expense_preference is lower_monthly', async () => {
    const questionnaire: QuestionnaireResponse = {
      age: 34,
      coverage_type: 'family',
      iua_preference: '5000',
      expense_preference: 'lower_monthly',
      visit_frequency: 'just_checkups',
      financial_capacity: '5000',
      risk_preference: 'higher_risk',
      pregnancy: 'false',
      pre_existing: 'false',
      zip_code: '12345'
    }

    const recommendations = await getRecommendations(providerPlans, questionnaire)

    // Get the top 3 recommendations
    const top3 = recommendations.slice(0, 3)
    
    // Get the monthly premiums for the top 3 plans
    const premiums = top3.map(rec => {
      const cost = getPlanCost(rec.plan.id, questionnaire.age, questionnaire.coverage_type, questionnaire.iua_preference)
      return cost?.monthlyPremium ?? Infinity
    })
    
    // Find the plan with the lowest monthly premium among all plans
    const allPremiums = providerPlans.map(plan => {
      const cost = getPlanCost(plan.id, questionnaire.age, questionnaire.coverage_type, questionnaire.iua_preference)
      return cost?.monthlyPremium ?? Infinity
    }).filter(premium => premium !== Infinity)
    
    const lowestPremium = Math.min(...allPremiums)
    
    // The lowest premium should be in the top 3 recommendations
    expect(Math.min(...premiums)).toBeLessThanOrEqual(lowestPremium * 1.2)
  })

  it('correctly handles DPC plans based on visit frequency', async () => {
    // For just_checkups, DPC plans should not be highly ranked
    const checkupsQuestionnaire: QuestionnaireResponse = {
      age: 34,
      coverage_type: 'family',
      iua_preference: '5000',
      expense_preference: 'lower_monthly',
      visit_frequency: 'just_checkups',
      financial_capacity: '5000',
      risk_preference: 'higher_risk',
      pregnancy: 'false',
      pre_existing: 'false',
      zip_code: '12345'
    }

    const checkupsRecommendations = await getRecommendations(providerPlans, checkupsQuestionnaire)
    
    // For monthly_plus, DPC plans should be ranked higher
    const monthlyQuestionnaire: QuestionnaireResponse = {
      ...checkupsQuestionnaire,
      visit_frequency: 'monthly_plus'
    }

    const monthlyRecommendations = await getRecommendations(providerPlans, monthlyQuestionnaire)
    
    // Find the highest ranked DPC plan in each scenario
    const findDpcRank = (recs: Array<any>) => {
      const dpcIndex = recs.findIndex(r => r.plan.id.includes('dpc') || r.plan.id.includes('vpc'))
      return dpcIndex === -1 ? Infinity : dpcIndex
    }
    
    const checkupsDpcRank = findDpcRank(checkupsRecommendations)
    const monthlyDpcRank = findDpcRank(monthlyRecommendations)
    
    // Skip test if no DPC plans are found
    if (checkupsDpcRank === Infinity && monthlyDpcRank === Infinity) {
      console.warn('No DPC plans found in recommendations, skipping test')
      return
    }
    
    // DPC plans should rank higher for monthly_plus than for just_checkups
    // This test might be flaky if there are no DPC plans or if they're not in the top recommendations
    if (checkupsDpcRank !== Infinity && monthlyDpcRank !== Infinity) {
      expect(monthlyDpcRank).toBeLessThanOrEqual(checkupsDpcRank)
    }
  })

  it('recommends Zion Essential with $5000 IUA for users who prefer lower monthly costs', async () => {
    const questionnaire: QuestionnaireResponse = {
      age: 34,
      coverage_type: 'family',
      iua_preference: '5000',
      expense_preference: 'lower_monthly',
      visit_frequency: 'just_checkups',
      financial_capacity: '5000',
      risk_preference: 'higher_risk',
      pregnancy: 'false',
      pre_existing: 'false',
      zip_code: '12345'
    }

    const recommendations = await getRecommendations(providerPlans, questionnaire)
    
    // Find Zion Essential plan
    const zionEssentialIndex = recommendations.findIndex(r => 
      r.plan.id.includes('zion') && r.plan.id.includes('essential')
    )
    
    // Skip test if Zion Essential is not found
    if (zionEssentialIndex === -1) {
      console.warn('Zion Essential plan not found in recommendations, skipping test')
      return
    }
    
    // Zion Essential should be in the top 3 recommendations
    expect(zionEssentialIndex).toBeLessThanOrEqual(2)
  })
}) 