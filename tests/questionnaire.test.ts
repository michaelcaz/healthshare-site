import { describe, it, expect } from 'vitest'
import { steps } from '../lib/questionnaire/steps'

describe('Questionnaire Steps', () => {
  it('should have 3 steps', () => {
    expect(steps.length).toBe(3)
  })

  it('should have correct step IDs', () => {
    const stepIds = steps.map(step => step.id)
    expect(stepIds).toEqual(['basic-info', 'health-status', 'preferences'])
  })

  it('should have titles and descriptions for each step', () => {
    steps.forEach(step => {
      expect(step.title).toBeDefined()
      expect(step.description).toBeDefined()
    })
  })
}) 