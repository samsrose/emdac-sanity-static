export const protocols = {
    name: 'protocols',
    title: 'Protocols',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'protocol',
        title: 'Protocol',
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
  