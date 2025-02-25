export const documents = {
  name: 'documents',
  title: 'General Documents',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'topic',
      title: 'Topic',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'info',
      title: 'Either "File" or "Link"',
      readonly: true,
      description:'Use either "File" or "Link" fields. Not both.',
      initialValue: {
        title: 'Do not edit this field'
      },
      type: 'string',
      validation: Rule => Rule.max(0).warning(`This field cannot be edited.`)
    },
    {
      name: 'file',
      title: 'File (download)',
      type: 'file',
    },
    {
      name: 'link',
      title: 'Link (external url)',
      type: 'url',
    },
    
  ],
}
