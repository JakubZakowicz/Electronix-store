import { Product } from 'src/product/product.entity';

export interface CartProduct extends Product {
  quantity: number;
}

export interface CartInterface {
  products: CartProduct[];
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

export const addProduct = (cart: CartInterface, newProduct: CartProduct) => {
  const existingProductIndex = cart.products.findIndex(
    (product) => product.id === newProduct.id,
  );

  if (existingProductIndex !== -1) {
    cart.products[existingProductIndex].quantity += newProduct.quantity;
  } else {
    cart.products.push(newProduct);
  }

  setSubtotalAndTotalPrices(cart);
};

export const setSubtotalAndTotalPrices = (cart: CartInterface) => {
  cart.products.forEach((product) => {
    cart.subtotal += product.price * product.quantity;
  });
  if (cart.subtotal > 10000) cart.shipping = 0;
  else cart.shipping = 1000;

  cart.total = cart.subtotal + cart.shipping;
};
