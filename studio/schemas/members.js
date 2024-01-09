export const members = {
    name: 'members',
    title: 'Directory Members',
    type: 'document',
    fields: [
      {
        name: 'firstName',
        title: 'First Name',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'lastName',
        title: 'Last Name',
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
        name: 'email',
        title: 'Email',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
    ],
  }
  