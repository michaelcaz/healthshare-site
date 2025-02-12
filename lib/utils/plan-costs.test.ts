import { describe, it, expect } from 'vitest'
import { getPlanCost, getAllPlanCosts } from './plan-costs'
import { providerPlans } from '@/data/provider-plans'

describe('getPlanCost', () => {
  it('returns correct cost for valid inputs', () => {
    const cost = getPlanCost('zion-essential', 25, 1, '1000')
    
    expect(cost).toEqual({
      monthlyPremium: 201,
      initialUnsharedAmount: 1000
    })
  })

  it('handles age bracket transitions correctly', () => {
    const cost29 = getPlanCost('zion-essential', 29, 1, '1000')
    const cost30 = getPlanCost('zion-essential', 30, 1, '1000')
    
    expect(cost29?.monthlyPremium).toBe(201)
    expect(cost30?.monthlyPremium).toBe(279)
  })

  it('returns null for invalid plan ID', () => {
    const cost = getPlanCost('invalid_plan', 25, 1, '1000')
    expect(cost).toBeNull()
  })
})

describe('getAllPlanCosts', () => {
  it('returns costs for all plans', () => {
    const allCosts = getAllPlanCosts(25, 1, '1000')
    
    expect(allCosts.length).toBeGreaterThan(0)
    expect(allCosts[0]).toHaveProperty('plan')
    expect(allCosts[0]).toHaveProperty('cost')
  })

  it('includes plans even if they have no matching cost', () => {
    // Test with invalid IUA level to ensure all plans are still returned
    const allCosts = getAllPlanCosts(25, 1, '9999' as any)
    
    expect(allCosts).toHaveLength(providerPlans.length)
    allCosts.forEach(({ cost }) => {
      expect(cost).toBeNull()
    })
  })
}) 