export const protocols = {
    name: 'protocols',
    title: 'Protocols',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
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
        name: 'location',
        title: 'Location Name',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'venue',
        title: 'Venue Name',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'description',
        title: 'Description of meeting',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'voucherLink',
        title: 'Voucher URL',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'venueLink',
        title: 'Venue URL',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
    ],
  }
  