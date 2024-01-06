export const medicaladvisory = {
    name: 'medicaladvisory',
    title: 'Medical Advisory Committee',
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
  