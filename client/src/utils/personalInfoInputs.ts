export const personalInfoInputs: {
  fieldName:
    | 'firstName'
    | 'lastName'
    | 'email'
    | 'phoneNumber'
    | 'country'
    | 'city'
    | 'streetAddress'
    | 'postCode';
  labelName: string;
  type?: string;
}[] = [
  {
    fieldName: 'firstName',
    labelName: 'First Name',
  },
  {
    fieldName: 'lastName',
    labelName: 'Last Name',
  },
  {
    fieldName: 'email',
    labelName: 'Email address',
    type: 'email',
  },
  {
    fieldName: 'phoneNumber',
    labelName: 'Phone number',
  },
  {
    fieldName: 'country',
    labelName: 'Country',
  },
  {
    fieldName: 'city',
    labelName: 'City',
  },
  {
    fieldName: 'streetAddress',
    labelName: 'Street',
  },
  {
    fieldName: 'postCode',
    labelName: 'Postal dode',
  },
];
