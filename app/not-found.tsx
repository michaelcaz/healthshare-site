import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | Healthshare Plan Finder',
  description: 'The page you are looking for cannot be found.',
};

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md">
        <h1 className="mb-2 text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Page Not Found</h2>
        <p className="mb-8 text-gray-600">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0 justify-center">
          <Button asChild variant="default">
            <Link href="/">
              Go to Homepage
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/questionnaire">
              Find a Healthshare Plan
            </Link>
          </Button>
        </div>
        <div className="mt-8">
          <p className="text-sm text-gray-500">
            Need assistance? <Link href="/contact" className="text-blue-600 hover:text-blue-800 underline">Contact our support team</Link>
          </p>
        </div>
      </div>
    </div>
  );
} 