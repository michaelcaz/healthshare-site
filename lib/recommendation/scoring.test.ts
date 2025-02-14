import { describe, it, expect } from 'vitest'
import { calculatePlanScore } from './scoring'
import { providerPlans } from '@/data/provider-plans'
import { healthshareProviders } from '@/types/provider-plans'

describe('calculatePlanScore', () => {
  const sampleQuestionnaire = {
    age: 25,
    household_size: 1,
    coverage_type: 'just_me' as const,
    iua_preference: '1000' as const,
    pregnancy: false,
    pregnancy_planning: 'no' as const,
    medical_conditions: [],
    expense_preference: 'lower_monthly' as const,
    annual_healthcare_spend: 'less_1000' as const,
    pre_existing: false,
    provider_preference: 'any',
    state: 'TX',
    zip: '12345',
    zip_code: '12345'
  }

  const mockQuestionnaire = {
    age: 35,
    household_size: 1,
    coverage_type: 'just_me',
    iua_preference: '1000',
    pregnancy: false,
    pre_existing: false,
    state: 'TX',
    zip: '75001',
    expense_preference: 'lower_monthly',
    pregnancy_planning: 'no',
    medical_conditions: [],
    annual_healthcare_spend: 'less_1000',
    zip_code: '75001'
  } as const;

  it('returns valid score structure', async () => {
    const plan = providerPlans[0]
    const score = await calculatePlanScore(plan, sampleQuestionnaire)

    expect(score).toHaveProperty('plan_id')
    expect(score).toHaveProperty('total_score')
    expect(score).toHaveProperty('explanation')
    expect(score).toHaveProperty('factors')
    expect(score.total_score).toBeGreaterThanOrEqual(0)
    expect(score.total_score).toBeLessThanOrEqual(100)
  })

  it('handles maternity needs correctly', async () => {
    const plan = providerPlans.find(p => {
      const fullPlan = healthshareProviders[p.id.split('-')[0]]?.plans
        .find(plan => plan.id === p.id);
      return fullPlan?.maternity?.coverage?.services?.length ?? 0 > 0;
    });
    if (!plan) throw new Error('No plan with maternity coverage found');

    const pregnancyQuestionnaire = {
      ...sampleQuestionnaire,
      pregnancy: true
    }

    const score = await calculatePlanScore(plan, pregnancyQuestionnaire)
    const maternityFactor = score.factors.find(f => f.factor.includes('Maternity'))
    
    expect(maternityFactor).toBeDefined()
    expect(score.total_score).toBeGreaterThan(0)
  })

  it('penalizes plans without needed coverage', async () => {
    const planWithoutMaternity = providerPlans.find(p => {
      const fullPlan = healthshareProviders[p.id.split('-')[0]]?.plans
        .find(plan => plan.id === p.id);
      return !(fullPlan?.maternity?.coverage?.services?.length ?? 0 > 0);
    })!;
    const pregnancyQuestionnaire = {
      ...sampleQuestionnaire,
      pregnancy: true
    }

    const score = await calculatePlanScore(planWithoutMaternity, pregnancyQuestionnaire)
    expect(score.total_score).toBe(0) // Should be disqualified
  })

  it('considers cost preferences', async () => {
    const plan = providerPlans[0]
    const lowCostQuestionnaire = {
      ...sampleQuestionnaire,
      expense_preference: 'lower_monthly' as const
    }
    const highCostQuestionnaire = {
      ...sampleQuestionnaire,
      expense_preference: 'higher_monthly' as const
    }

    const lowCostScore = await calculatePlanScore(plan, lowCostQuestionnaire)
    const highCostScore = await calculatePlanScore(plan, highCostQuestionnaire)

    expect(lowCostScore.factors).toContainEqual(
      expect.objectContaining({ factor: expect.stringContaining('Monthly Cost') })
    )
    expect(highCostScore.factors).toContainEqual(
      expect.objectContaining({ factor: expect.stringContaining('Incident Cost') })
    )
  })

  describe('expense preference scoring', () => {
    it('favors high IUA plans for lower monthly preference', async () => {
      const questionnaire = {
        ...sampleQuestionnaire,
        expense_preference: 'lower_monthly' as const,
        iua_preference: '5000' as const
      }
      
      const highIUAPlan = providerPlans.find(p => 
        p.planMatrix.some(m => m.costs.some(c => c.initialUnsharedAmount === 5000))
      )
      if (!highIUAPlan) throw new Error('No high IUA plan found')
      
      const score = await calculatePlanScore(highIUAPlan, questionnaire)
      expect(score.total_score).toBeGreaterThan(50)
    })

    it('favors medium IUA plans for balanced preference', async () => {
      const questionnaire = {
        ...sampleQuestionnaire,
        expense_preference: 'balanced' as const,
        iua_preference: '2500' as const
      }
      
      const mediumIUAPlan = providerPlans.find(p => 
        p.planMatrix.some(m => m.costs.some(c => c.initialUnsharedAmount === 2500))
      )
      if (!mediumIUAPlan) throw new Error('No medium IUA plan found')
      
      const score = await calculatePlanScore(mediumIUAPlan, questionnaire)
      expect(score.total_score).toBeGreaterThan(50)
    })

    it('favors low IUA plans for higher monthly preference', async () => {
      const questionnaire = {
        ...sampleQuestionnaire,
        expense_preference: 'higher_monthly' as const,
        iua_preference: '1000' as const
      }
      
      const lowIUAPlan = providerPlans.find(p => 
        p.planMatrix.some(m => m.costs.some(c => c.initialUnsharedAmount === 1000))
      )
      if (!lowIUAPlan) throw new Error('No low IUA plan found')
      
      const score = await calculatePlanScore(lowIUAPlan, questionnaire)
      expect(score.total_score).toBeGreaterThan(50)
    })

    it('adjusts scores based on annual healthcare spend', async () => {
      const highSpendQuestionnaire = {
        ...sampleQuestionnaire,
        annual_healthcare_spend: 'more_5000' as const
      }
      
      const lowIUAPlan = providerPlans.find(p => 
        p.planMatrix.some(m => m.costs.some(c => c.initialUnsharedAmount === 1000))
      )
      if (!lowIUAPlan) throw new Error('No low IUA plan found')
      
      const score = await calculatePlanScore(lowIUAPlan, highSpendQuestionnaire)
      const monthlyFactor = score.factors.find(f => f.factor === 'Monthly Cost')
      expect(monthlyFactor?.score).toBeDefined()
    })
  })
}) 