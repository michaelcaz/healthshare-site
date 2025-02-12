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

export function logError(error: Error | AppError | unknown, context: ErrorContext = {}) {
  const errorDetails = {
    timestamp: new Date().toISOString(),
    name: error instanceof Error ? error.name : 'UnknownError',
    message: error instanceof Error ? error.message : 'An unknown error occurred',
    stack: error instanceof Error ? error.stack : undefined,
    context: {
      ...context,
      ...(error instanceof AppError ? error.context : {})
    },
    environment: process.env.NODE_ENV
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.group('🚨 Application Error');
    console.error('Error Details:', errorDetails);
    console.error('Original Error:', error);
    console.groupEnd();
  }

  // In production, you might want to send this to a logging service
  // like Sentry, LogRocket, etc.
  if (process.env.NODE_ENV === 'production') {
    // TODO: Send to logging service
    console.error('Application Error:', errorDetails);
  }

  return errorDetails;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) {
    return error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'An unexpected error occurred. Please try again.';
} 