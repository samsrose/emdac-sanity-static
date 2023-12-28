export const committees = {
    name: 'committees',
    title: 'Committees',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'subcommittee',
        title: 'Subcommittee',
        type: 'reference',
        to: [{ type: 'subcommittees' }],
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'role',
        title: 'Role',
        type: 'string',
      },
    ],
  }
  