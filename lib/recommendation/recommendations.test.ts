import { describe, it, expect } from 'vitest'
import { getRecommendations } from './recommendations'
import { providerPlans } from '@/data/provider-plans'
import { healthshareProviders } from '@/types/provider-plans'

describe('getRecommendations', () => {
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

  it('returns recommendations in correct order', async () => {
    const recommendations = await getRecommendations(providerPlans, sampleQuestionnaire)
    
    expect(recommendations.length).toBeGreaterThan(0)
    expect(recommendations[0].ranking).toBe(1)
    expect(recommendations.every((r, i) => 
      i === 0 || recommendations[i-1].score >= r.score
    )).toBe(true)
  })

  it('filters out non-viable plans', async () => {
    const pregnancyQuestionnaire = {
      ...sampleQuestionnaire,
      pregnancy: true
    }

    const recommendations = await getRecommendations(providerPlans, pregnancyQuestionnaire)
    
    expect(recommendations.every(r => r.score > 0)).toBe(true)
    expect(recommendations.every(r => {
      const fullPlan = healthshareProviders[r.plan.id.split('-')[0]]?.plans
        .find(p => p.id === r.plan.id);
      return fullPlan?.maternity?.coverage?.services?.length ?? 0 > 0;
    })).toBe(true)
  })

  it('includes explanations and factors', async () => {
    const recommendations = await getRecommendations(providerPlans, sampleQuestionnaire)
    
    recommendations.forEach(rec => {
      expect(rec.explanation).toBeDefined()
      expect(rec.explanation.length).toBeGreaterThan(0)
      expect(rec.factors.length).toBeGreaterThan(0)
      expect(rec.factors[0]).toHaveProperty('factor')
      expect(rec.factors[0]).toHaveProperty('impact')
    })
  })
}) 