export const positions = {
  name: 'positions',
  title: 'Medical Positions',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'position',
      title: 'Position',
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
      name: 'file',
      title: 'File',
      type: 'file',
      validation: (Rule) => Rule.required(),
    },
    
  ],
}
