export interface PersonalInfoFormSchema {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  city: string;
  streetAddress: string;
  postCode: string;
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

interface DataDefaultProps {
  total: number;
  page: number;
  size: number;
  pageCount: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  products: Product[];
}

export interface CategoryData extends DataDefaultProps {
  categories: Category[];
}

export interface Image {
  id: string;
  url: string;
}

export interface Product {
  id: string;
  name: string;
  summary: string;
  images: Image[];
  description: string;
  price: number;
  isFeatured: boolean;
  rating: number;
  slug: string;
  categoryId: string;
  reviews: Review[];
}

export interface ProductData extends DataDefaultProps {
  products: Product[];
}

export interface Review {
  id: string;
  title: string;
  content: string;
  rating: number;
  created_at: string;
  user: User;
}

export interface ReviewData extends DataDefaultProps {
  reviews: Review[];
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  city: string;
  streetAddress: string;
  postCode: string;
  created_at: string;
}

export interface Cart {
  products: CartProduct[];
  subtotal: number;
  shipping: number;
  total: number;
}

export interface CartProduct extends Product {
  quantity: number;
}

export interface AddToCartData {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  status: string;
  orderItems: OrderItem[];
  deliveryPrice: number;
  totalPrice: number;
}

export interface OrderData extends DataDefaultProps {
  orders: Order[];
}

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface StripeConfig {
  publishableKey: string;
}
