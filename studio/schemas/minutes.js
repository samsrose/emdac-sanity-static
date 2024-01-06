export const minutes = {
  name: 'minutes',
  title: 'Meeting Minutes',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'venue',
      title: 'Venue',
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
      name: 'minutes',
      title: 'Minutes',
      type: 'file',
      validation: (Rule) => Rule.required(),
    },
    
  ],
}
