export const officers = {
    name: 'officers',
    title: 'Officers Committee',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'role',
        title: 'Role (optional)',
        type: 'string',
      },
      {
        name: 'order',
        title: 'Order (1-10)',
        type: 'number',
      },
    ],
  }
  