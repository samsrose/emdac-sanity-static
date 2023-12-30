export const directory = {
    name: 'directory',
    title: 'Directory',
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
      {
        name: 'isAssociate',
        title: 'Toggle on for member, off for associate',
        type: 'boolean',
        initialValue: false,
        validation: (Rule) => Rule.required(),
      },
    ],
  }
  