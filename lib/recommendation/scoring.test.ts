import { describe, it, expect } from 'vitest'
import { calculatePlanScore } from './scoring'
import { samplePlans } from '@/data/sample-plans'

describe('calculatePlanScore', () => {
  const sampleQuestionnaire = {
    age: 25,
    household_size: 1,
    iua_preference: '1000' as const,
    pregnancy: false,
    pregnancy_planning: 'no' as const,
    medical_conditions: false,
    expense_preference: 'lower_monthly' as const,
    annual_healthcare_spend: 'less_1000' as const,
    zip_code: '12345'
  }

  it('returns valid score structure', async () => {
    const plan = samplePlans[0] // Crowd Health plan
    const score = await calculatePlanScore(plan, sampleQuestionnaire)

    expect(score).toHaveProperty('plan_id')
    expect(score).toHaveProperty('total_score')
    expect(score).toHaveProperty('explanation')
    expect(score).toHaveProperty('factors')
    expect(score.total_score).toBeGreaterThanOrEqual(0)
    expect(score.total_score).toBeLessThanOrEqual(100)
  })

  it('handles maternity needs correctly', async () => {
    const plan = samplePlans[0]
    const pregnancyQuestionnaire = {
      ...sampleQuestionnaire,
      pregnancy: true
    }

    const score = await calculatePlanScore(plan, pregnancyQuestionnaire)
    const maternityFactor = score.factors.find(f => f.factor.includes('Maternity'))
    
    expect(maternityFactor).toBeDefined()
    expect(score.total_score).toBeGreaterThan(0) // Plan has maternity coverage
  })

  it('penalizes plans without needed coverage', async () => {
    const planWithoutMaternity = samplePlans.find(p => !p.maternity_coverage)!
    const pregnancyQuestionnaire = {
      ...sampleQuestionnaire,
      pregnancy: true
    }

    const score = await calculatePlanScore(planWithoutMaternity, pregnancyQuestionnaire)
    expect(score.total_score).toBe(0) // Should be disqualified
  })

  it('considers cost preferences', async () => {
    const plan = samplePlans[0]
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
}) 