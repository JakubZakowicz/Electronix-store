import { Session } from 'express-session';
import { Product } from 'src/product/product.entity';

export interface CartSession extends Session {
  cart: CartInterface;
}

export interface CartProduct extends Product {
  quantity: number;
}

export interface CartInterface {
  products: CartProduct[];
  subtotal: number;
  shipping: number;
  total: number;
}
