import { type SchemaTypeDefinition } from 'sanity'
import blogPost from './blog-post'
import faq from './faq'
import educationalContent from './educational-content'
import providerInfo from './provider-info'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogPost, faq, educationalContent, providerInfo],
}
