import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: process.env.NODE_ENV === 'development',

  // Performance Monitoring
  integrations: [
    new Sentry.BrowserTracing({
      // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ['localhost', /^https:\/\/healthshare\.com/],
    }),
    new Sentry.Replay(),
  ],

  // Session Replay
  replaysSessionSampleRate: 0.1, // Sample rate for all sessions (10%)
  replaysOnErrorSampleRate: 1.0, // Sample rate for sessions with errors (100%)

  // Ignore common errors that don't need tracking
  ignoreErrors: [
    'ResizeObserver loop limit exceeded',
    'Non-Error promise rejection captured',
    /^Network request failed/,
  ],
}) 