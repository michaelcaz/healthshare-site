export default {
  name: 'educationalContent',
  title: 'Educational Content',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'section',
      title: 'Section',
      type: 'string',
      options: {
        list: [
          { title: 'What is a Healthshare?', value: 'what-is-healthshare' },
          { title: 'Benefits & Considerations', value: 'benefits-considerations' },
          { title: 'Common Misconceptions', value: 'misconceptions' },
          { title: 'How It Works', value: 'how-it-works' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true }
        }
      ],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'displayOrder',
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
