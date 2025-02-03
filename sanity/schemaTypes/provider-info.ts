export default {
  name: 'providerInfo',
  title: 'Provider Information',
  type: 'document',
  fields: [
    {
      name: 'providerId',
      title: 'Provider ID',
      type: 'string',
      description: 'UUID from Supabase providers table',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'trustScore',
      title: 'Trust Score',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0).max(100)
    },
    {
      name: 'keyFeatures',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule: any) => Rule.required().min(2).max(6)
    },
    {
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule: any) => Rule.required().min(2).max(6)
    },
    {
      name: 'risks',
      title: 'Potential Risks',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule: any) => Rule.required().min(1)
    },
    {
      name: 'whatWeLove',
      title: 'What We Love',
      type: 'array',
      of: [{ type: 'text' }],
      validation: (Rule: any) => Rule.required().min(1).max(3)
    },
    {
      name: 'watchOutFor',
      title: 'Watch Out For',
      type: 'array',
      of: [{ type: 'text' }],
      validation: (Rule: any) => Rule.required().min(1).max(3)
    },
    {
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      initialValue: false
    }
  ]
}
