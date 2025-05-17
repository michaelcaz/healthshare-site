import { z } from 'zod'

// Basic string sanitization
export function sanitizeString(input: string): string {
  return input.trim().replace(/[<>]/g, '')
}

// Basic HTML sanitization (removes all HTML tags)
export function sanitizeHTML(html: string): string {
  return html.replace(/<[^>]*>/g, '')
}

// Email validation and sanitization
export const emailSchema = z.string().email('Invalid email address')
export function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

// Phone number sanitization
export function sanitizePhone(phone: string): string {
  return phone.replace(/[^0-9+]/g, '')
}

// URL sanitization
export function sanitizeURL(url: string): string {
  try {
    const sanitized = new URL(url).toString()
    return sanitized
  } catch {
    return ''
  }
}

// Form data sanitization
export function sanitizeFormData<T extends Record<string, any>>(
  data: T,
  schema: z.ZodType<T>
): { data: T; errors?: string[] } {
  try {
    // First sanitize all string values
    const sanitizedData = Object.entries(data).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: typeof value === 'string' ? sanitizeString(value) : value
    }), {} as T)

    // Then validate against schema
    const validated = schema.parse(sanitizedData)
    return { data: validated }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        data: data,
        errors: error.errors.map(err => err.message)
      }
    }
    return {
      data: data,
      errors: ['Invalid form data']
    }
  }
} 