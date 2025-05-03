'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import * as Sentry from '@sentry/nextjs';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * ErrorBoundary component to catch JavaScript errors anywhere in the child component tree,
 * log those errors, and display a fallback UI instead of the component tree that crashed.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to Sentry in production
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureException(error, { extra: { componentStack: errorInfo.componentStack } });
    }
    
    // Update state with error details
    this.setState({ errorInfo });
    
    // Log to console in development
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error caught by ErrorBoundary:', error);
      console.error('Component stack:', errorInfo.componentStack);
    }
  }

  resetErrorBoundary = () => {
    const { onReset } = this.props;
    
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    
    if (onReset) {
      onReset();
    }
  };

  render() {
    const { children, fallback } = this.props;
    const { hasError, error } = this.state;

    if (hasError) {
      // If a custom fallback is provided, use it
      if (fallback) {
        return fallback;
      }

      // Default fallback UI
      return (
        <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-6 space-y-4 text-center">
          <div className="rounded-lg bg-red-50 p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold text-red-800 mb-3">Something went wrong</h2>
            <p className="text-red-700 mb-4">
              We've encountered an unexpected error. Our team has been notified.
            </p>
            {process.env.NODE_ENV !== 'production' && error && (
              <div className="mb-4 p-3 bg-red-100 rounded overflow-auto max-h-[200px] text-left">
                <p className="font-mono text-sm text-red-900">{error.toString()}</p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button 
                onClick={this.resetErrorBoundary} 
                variant="outline"
                className="bg-white hover:bg-gray-50 border-red-300 text-red-700"
              >
                Try again
              </Button>
              <Button 
                onClick={() => window.location.href = '/'}
                variant="default"
                className="bg-red-700 hover:bg-red-800 text-white"
              >
                Go to homepage
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}

export { ErrorBoundary }; 