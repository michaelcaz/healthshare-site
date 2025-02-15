import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { apiVersion, dataset, projectId } from '../../sanity/env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
  stega: {
    enabled: process.env.NODE_ENV === 'development',
    studioUrl: '/admin',
  },
})

// Initialize the image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Error handling wrapper for Sanity queries
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

// Preview helper
export const getClient = (preview = false) => {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: !preview,
    perspective: preview ? 'previewDrafts' : 'published',
    token: preview ? process.env.SANITY_API_TOKEN : undefined,
  })
  return client
}

// Helper for typed queries
export async function sanityQuery<T>({
  query,
  params = {},
  preview = false,
}: {
  query: string
  params?: Record<string, unknown>
  preview?: boolean
}): Promise<T> {
  return withSanityErrorHandling(
    async () => {
      const client = getClient(preview)
      return client.fetch<T>(query, params)
    },
    `execute query: ${query}`
  )
} 