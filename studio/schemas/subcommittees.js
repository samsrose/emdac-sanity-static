export const subcommittees = {
    name: 'subcommittees',
    title: 'Subcommittees',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
    ],
  }
  