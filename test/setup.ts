import '@testing-library/jest-dom'
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'
import { vi } from 'vitest'

// Extend Vitest's expect method with methods from react-testing-library
expect.extend(matchers)

// Cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})

// Mock environment variables for tests that might need them
process.env.NEXT_PUBLIC_ANALYTICS_ID = 'G-TEST123456'
process.env.CONVERTKIT_API_KEY = 'test-api-key'
process.env.WELCOME_SEQUENCE_ID = '12345'

// Mock next/navigation
vi.mock('next/navigation', () => {
  return {
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
    })),
    usePathname: vi.fn(() => '/'),
    useSearchParams: vi.fn(() => ({ get: vi.fn() })),
  }
})

// Mock next/image - using a string representation to avoid JSX in the setup file
vi.mock('next/image', () => ({
  default: vi.fn(({ src, alt, ...props }) => {
    // Return a plain object rather than JSX
    return { type: 'img', props: { src, alt, ...props } };
  }),
})) 