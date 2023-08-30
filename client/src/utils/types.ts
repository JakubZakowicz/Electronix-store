export interface PersonalInfoFormSchema {
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

export interface ForgotPasswordSchema {
  email: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  products: Product[];
}

export interface Product {
  id: string;
  name: string;
  summary: string;
  description: string;
  price: number;
  rating: number;
  slug: string;
  categoryId: string;
  reviews: Review[];
}

export interface Review {
  id: string;
  title: string;
  content: string;
  rating: number;
  user: User;
}

export interface User {
  firstName: string;
  lastName: string;
  created_at: string;
}
