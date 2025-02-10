import { describe, it, expect } from 'vitest'
import { steps } from '../app/questionnaire/page'

describe('Questionnaire Flow', () => {
  it('should have correct number of steps', () => {
    expect(steps.length).toBe(4)
  })
  
  // ... other tests
}) 