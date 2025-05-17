import * as Sentry from '@sentry/nextjs'

// Types of errors we want to track
type ErrorType = 'validation' | 'authentication' | 'authorization' | 'database' | 'api' | 'unknown'

// Error logging interface
interface ErrorLog {
  type: ErrorType
  message: string
  context?: Record<string, any>
  userId?: string
  timestamp: Date
}

// Sanitize error context to remove sensitive data
function sanitizeContext(context: Record<string, any>): Record<string, any> {
  const sensitiveFields = ['password', 'token', 'key', 'secret', 'authorization']
  const sanitized = { ...context }
  
  for (const field of sensitiveFields) {
    if (field in sanitized) {
      sanitized[field] = '[REDACTED]'
    }
  }
  
  return sanitized
}

// Main error logging function
export async function logError(
  error: Error | unknown,
  type: ErrorType = 'unknown',
  context: Record<string, any> = {},
  userId?: string
): Promise<void> {
  try {
    // Create error log
    const errorLog: ErrorLog = {
      type,
      message: error instanceof Error ? error.message : 'Unknown error',
      context: sanitizeContext(context),
      userId,
      timestamp: new Date()
    }

    // Log to Sentry
    Sentry.withScope((scope) => {
      scope.setTag('error_type', type)
      if (userId) scope.setUser({ id: userId })
      if (errorLog.context) {
        scope.setExtras(errorLog.context)
      }
      
      if (error instanceof Error) {
        Sentry.captureException(error)
      } else {
        Sentry.captureMessage(errorLog.message)
      }
    })

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Log:', errorLog)
    }
  } catch (loggingError) {
    // If error logging fails, at least log to console
    console.error('Error logging failed:', loggingError)
  }
}

// Convenience functions for different error types
export const logValidationError = (error: Error, context = {}) => 
  logError(error, 'validation', context)

export const logAuthError = (error: Error, context = {}, userId?: string) => 
  logError(error, 'authentication', context, userId)

export const logDatabaseError = (error: Error, context = {}) => 
  logError(error, 'database', context)

export const logApiError = (error: Error, context = {}) => 
  logError(error, 'api', context) 