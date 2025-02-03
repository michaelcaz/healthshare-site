export default {
  name: 'faq',
  title: 'FAQ Items',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Plans', value: 'plans' },
          { title: 'Costs', value: 'costs' },
          { title: 'Coverage', value: 'coverage' },
          { title: 'Enrollment', value: 'enrollment' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule: any) => Rule.required().integer().positive()
    },
    {
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      initialValue: false
    }
  ]
}
