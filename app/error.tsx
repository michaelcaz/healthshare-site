'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

/**
 * Global error page for Next.js server components
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to Sentry
    Sentry.captureException(error);
    
    // Log to console in development
    if (process.env.NODE_ENV !== 'production') {
      console.error('Unhandled server error:', error);
    }
  }, [error]);

  return (
    <html>
      <body className="flex h-screen items-center justify-center bg-gray-50">
        <div className="w-full max-w-xl px-4">
          <div className="rounded-lg bg-white p-8 shadow-lg">
            <h1 className="mb-4 text-2xl font-bold text-gray-900">
              Something went wrong!
            </h1>
            <p className="mb-6 text-gray-600">
              We've encountered an unexpected error. Our team has been notified and we're working to fix the issue.
            </p>
            
            {/* Show error details in development */}
            {process.env.NODE_ENV !== 'production' && (
              <div className="mb-6 rounded bg-red-50 p-4">
                <p className="font-mono text-sm text-red-800">
                  {error.message || 'An unknown error occurred'}
                </p>
                {error.stack && (
                  <pre className="mt-2 max-h-[200px] overflow-auto whitespace-pre-wrap text-xs text-red-700">
                    {error.stack}
                  </pre>
                )}
              </div>
            )}
            
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
              <Button 
                onClick={reset}
                variant="default"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Try again
              </Button>
              <Button 
                asChild
                variant="outline"
                className="border-gray-300 bg-white hover:bg-gray-50"
              >
                <Link href="/">
                  Return to homepage
                </Link>
              </Button>
            </div>
            
            {/* Error ID for support reference */}
            {error.digest && (
              <p className="mt-6 text-xs text-gray-500">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        </div>
      </body>
    </html>
  );
} 