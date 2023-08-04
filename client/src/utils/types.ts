export interface CheckoutFormSchema {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  city: string;
  street: string;
  postalCode: string;
}

export interface SignInFormSchema {
  email: string;
  password: string;
}

export interface SignUpFormSchema {
  email: string;
  password: string;
  confirmPassword: string;
}