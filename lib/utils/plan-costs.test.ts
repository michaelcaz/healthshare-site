import { describe, it, expect } from 'vitest'
import { getPlanCost, getAllPlanCosts } from './plan-costs'
import { samplePlans } from '@/data/sample-plans'

describe('getPlanCost', () => {
  it('returns correct cost for valid inputs', () => {
    const cost = getPlanCost('crowd_standard', 25, 1, '1000')
    
    expect(cost).toEqual({
      age_bracket: '18-29',
      household_size: 1,
      iua_level: '1000',
      monthly_cost: 199,
      incident_cost: 500
    })
  })

  it('handles age bracket transitions correctly', () => {
    const cost29 = getPlanCost('crowd_standard', 29, 1, '1000')
    const cost30 = getPlanCost('crowd_standard', 30, 1, '1000')
    
    expect(cost29?.age_bracket).toBe('18-29')
    expect(cost30?.age_bracket).toBe('30-39')
  })

  it('caps household size at 2', () => {
    const cost = getPlanCost('crowd_standard', 25, 5, '1000')
    expect(cost?.household_size).toBe(2)
  })

  it('returns null for invalid plan ID', () => {
    const cost = getPlanCost('invalid_plan', 25, 1, '1000')
    expect(cost).toBeNull()
  })
})

describe('getAllPlanCosts', () => {
  it('returns costs for all plans', () => {
    const allCosts = getAllPlanCosts(25, 1, '1000')
    
    expect(allCosts).toHaveLength(samplePlans.length)
    expect(allCosts[0]).toHaveProperty('plan')
    expect(allCosts[0]).toHaveProperty('cost')
  })

  it('handles same criteria across all plans', () => {
    const allCosts = getAllPlanCosts(35, 2, '2500')
    
    allCosts.forEach(({ cost }) => {
      expect(cost?.age_bracket).toBe('30-39')
      expect(cost?.household_size).toBe(2)
      expect(cost?.iua_level).toBe('2500')
    })
  })

  it('includes plans even if they have no matching cost', () => {
    // Test with invalid IUA level to ensure all plans are still returned
    const allCosts = getAllPlanCosts(25, 1, '9999' as any)
    
    expect(allCosts).toHaveLength(samplePlans.length)
    allCosts.forEach(({ cost }) => {
      expect(cost).toBeNull()
    })
  })
}) 