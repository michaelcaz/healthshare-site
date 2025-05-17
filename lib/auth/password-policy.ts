import { z } from 'zod'

// Password policy schema
export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')

// Password strength checker
export function checkPasswordStrength(password: string): {
  score: number; // 0-4
  feedback: string[];
} {
  const feedback: string[] = []
  let score = 0

  // Length check
  if (password.length >= 8) {
    score++
  } else {
    feedback.push('Password should be at least 8 characters long')
  }

  // Uppercase check
  if (/[A-Z]/.test(password)) {
    score++
  } else {
    feedback.push('Add at least one uppercase letter')
  }

  // Lowercase check
  if (/[a-z]/.test(password)) {
    score++
  } else {
    feedback.push('Add at least one lowercase letter')
  }

  // Number check
  if (/[0-9]/.test(password)) {
    score++
  } else {
    feedback.push('Add at least one number')
  }

  // Special character check
  if (/[^A-Za-z0-9]/.test(password)) {
    score++
  } else {
    feedback.push('Add at least one special character')
  }

  return { score, feedback }
}

// Password validation function
export function validatePassword(password: string): {
  isValid: boolean;
  errors?: string[];
} {
  try {
    passwordSchema.parse(password)
    return { isValid: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        errors: error.errors.map(err => err.message)
      }
    }
    return { isValid: false, errors: ['Invalid password format'] }
  }
} 