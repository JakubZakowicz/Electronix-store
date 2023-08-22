import { Session } from 'express-session';
import { CartInterface } from './cart';

export interface CartSession extends Session {
  cart: CartInterface;
}
