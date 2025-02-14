import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: process.env.NODE_ENV === 'development',

  // Optional: Set custom environment
  environment: process.env.NODE_ENV,

  // Ignore specific errors
  ignoreErrors: [
    'Error: No response received',
    'Error: socket hang up',
    'Error: connect ETIMEDOUT',
  ],

  // Sampling configuration
  profilesSampleRate: 1.0,
}) 