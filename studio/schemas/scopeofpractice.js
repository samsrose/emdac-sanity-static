export const scopeofpractice = {
    name: 'scopeofpractice',
    title: 'Scope of Practice Committee',
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
    ],
  }
  