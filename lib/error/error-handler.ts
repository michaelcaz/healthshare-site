import * as Sentry from '@sentry/nextjs';

/**
 * Error types for categorizing different errors in the application
 */
export enum ErrorType {
  AUTH = 'AUTH',
  API = 'API',
  DATABASE = 'DATABASE',
  VALIDATION = 'VALIDATION',
  NETWORK = 'NETWORK',
  UNEXPECTED = 'UNEXPECTED',
  PAYMENT = 'PAYMENT',
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
}

/**
 * Base application error class
 */
export class AppError extends Error {
  public readonly type: ErrorType;
  public readonly statusCode?: number;
  public readonly context?: Record<string, any>;
  public readonly originalError?: Error;

  constructor({
    message,
    type = ErrorType.UNEXPECTED,
    statusCode,
    context,
    originalError,
  }: {
    message: string;
    type?: ErrorType;
    statusCode?: number;
    context?: Record<string, any>;
    originalError?: Error;
  }) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.statusCode = statusCode;
    this.context = context;
    this.originalError = originalError;
    
    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}

/**
 * Authentication errors
 */
export class AuthError extends AppError {
  constructor({
    message,
    statusCode = 401,
    context,
    originalError,
  }: {
    message: string;
    statusCode?: number;
    context?: Record<string, any>;
    originalError?: Error;
  }) {
    super({
      message,
      type: ErrorType.AUTH,
      statusCode,
      context,
      originalError,
    });
    this.name = 'AuthError';
  }
}

/**
 * Database errors
 */
export class DatabaseError extends AppError {
  constructor({
    message,
    statusCode = 500,
    context,
    originalError,
  }: {
    message: string;
    statusCode?: number;
    context?: Record<string, any>;
    originalError?: Error;
  }) {
    super({
      message,
      type: ErrorType.DATABASE,
      statusCode,
      context,
      originalError,
    });
    this.name = 'DatabaseError';
  }
}

/**
 * API errors (external services)
 */
export class ApiError extends AppError {
  constructor({
    message,
    statusCode = 500,
    context,
    originalError,
  }: {
    message: string;
    statusCode?: number;
    context?: Record<string, any>;
    originalError?: Error;
  }) {
    super({
      message,
      type: ErrorType.API,
      statusCode,
      context,
      originalError,
    });
    this.name = 'ApiError';
  }
}

/**
 * Validation errors
 */
export class ValidationError extends AppError {
  constructor({
    message,
    statusCode = 400,
    context,
    originalError,
  }: {
    message: string;
    statusCode?: number;
    context?: Record<string, any>;
    originalError?: Error;
  }) {
    super({
      message,
      type: ErrorType.VALIDATION,
      statusCode,
      context,
      originalError,
    });
    this.name = 'ValidationError';
  }
}

/**
 * Not found errors
 */
export class NotFoundError extends AppError {
  constructor({
    message,
    context,
    originalError,
  }: {
    message: string;
    context?: Record<string, any>;
    originalError?: Error;
  }) {
    super({
      message,
      type: ErrorType.RESOURCE_NOT_FOUND,
      statusCode: 404,
      context,
      originalError,
    });
    this.name = 'NotFoundError';
  }
}

/**
 * Central error logging and reporting function
 */
export function logError(error: Error, extras?: Record<string, any>) {
  const isAppError = error instanceof AppError;
  const errorContext = isAppError ? error.context || {} : {};
  
  // Combine extra context with error context
  const context = {
    ...errorContext,
    ...extras,
  };
  
  // Production error logging
  if (process.env.NODE_ENV === 'production') {
    try {
      Sentry.captureException(error, {
        extra: context,
      });
    } catch (sentryError) {
      // If Sentry fails, fallback to console
      console.error('[Error Reporting Failed]', sentryError);
    }
  }
  
  // Always log to console in development
  if (process.env.NODE_ENV !== 'production') {
    console.error(`[${isAppError ? error.type : 'UNEXPECTED'}]`, error.message, {
      error,
      context,
    });
  }
  
  return error;
}

/**
 * Safe wrapper for async functions to handle errors gracefully
 */
export async function tryAsync<T>(
  promise: Promise<T>,
  errorMapper?: (error: any) => Error
): Promise<[T | null, Error | null]> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    const mappedError = errorMapper
      ? errorMapper(error)
      : error instanceof Error
        ? error
        : new AppError({
            message: String(error),
            type: ErrorType.UNEXPECTED,
            context: { originalError: error },
          });
    
    logError(mappedError);
    return [null, mappedError];
  }
}

/**
 * Synchronous version of tryAsync
 */
export function tryCatch<T>(
  fn: () => T,
  errorMapper?: (error: any) => Error
): [T | null, Error | null] {
  try {
    const data = fn();
    return [data, null];
  } catch (error) {
    const mappedError = errorMapper
      ? errorMapper(error)
      : error instanceof Error
        ? error
        : new AppError({
            message: String(error),
            type: ErrorType.UNEXPECTED,
            context: { originalError: error },
          });
    
    logError(mappedError);
    return [null, mappedError];
  }
} 