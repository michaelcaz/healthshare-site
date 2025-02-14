import * as Sentry from '@sentry/nextjs'

type ErrorContext = {
  component?: string;
  action?: string;
  data?: any;
  userId?: string;
}

export class AppError extends Error {
  context: ErrorContext;
  timestamp: string;

  constructor(message: string, context: ErrorContext = {}) {
    super(message);
    this.name = 'AppError';
    this.context = context;
    this.timestamp = new Date().toISOString();
  }
}

interface ErrorWithMessage {
  message: string
  [key: string]: any
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  )
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError

  try {
    return new Error(JSON.stringify(maybeError))
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError))
  }
}

export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message
}

export function logError(
  error: unknown,
  context?: Record<string, any>,
  level: Sentry.SeverityLevel = 'error'
) {
  const errorMessage = getErrorMessage(error)

  // Always log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', errorMessage, '\nContext:', context)
    return
  }

  // Log to Sentry in production
  Sentry.withScope((scope) => {
    // Add additional context
    if (context) {
      Object.entries(context).forEach(([key, value]) => {
        scope.setExtra(key, value)
      })
    }

    // Set the severity level
    scope.setLevel(level)

    // Capture the error
    if (error instanceof Error) {
      Sentry.captureException(error)
    } else {
      Sentry.captureMessage(errorMessage)
    }
  })
}

export function withErrorLogging<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  context?: Record<string, any>
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await fn(...args)
    } catch (error) {
      logError(error, {
        ...context,
        functionName: fn.name,
        arguments: args,
      })
      throw error
    }
  }) as T
} 