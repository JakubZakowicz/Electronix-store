import { Product } from 'src/product/product.entity';

export interface CartInterface {
  products: Product[];
  subtotal: number;
  shipping: number;
  total: number;
}

export const defaultCart: CartInterface = {
  products: [],
  subtotal: 0,
  shipping: 0,
  total: 0,
};

export const addProduct = (cart: CartInterface, product: Product) => {
  cart.products.push(product);
  setSubtotalAndTotalPrices(cart);
};

const setSubtotalAndTotalPrices = (cart: CartInterface) => {
  cart.products.forEach((product) => {
    cart.subtotal += product.price;
  });
  if (cart.subtotal > 10000) cart.shipping = 0;
  else cart.shipping = 1000;

  cart.total = cart.subtotal + cart.shipping;
};
