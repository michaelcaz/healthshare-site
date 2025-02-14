import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

// Error handling wrapper
export async function withSanityErrorHandling<T>(
  operation: () => Promise<T>,
  context: string
): Promise<T> {
  try {
    return await operation()
  } catch (error) {
    console.error(`Sanity ${context} error:`, error)
    throw new Error(`Failed to ${context}: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Set useCdn to false if you're using ISR or need real-time updates
  useCdn: process.env.NEXT_PUBLIC_VERCEL_ENV === 'production',
})

// Typed query helper
export async function sanityQuery<T>(query: string, params = {}): Promise<T> {
  return withSanityErrorHandling(
    () => client.fetch<T>(query, params),
    'query'
  )
}
