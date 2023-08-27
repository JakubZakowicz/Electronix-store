import { Injectable, NotFoundException } from '@nestjs/common';
import { CartInterface, CartProduct } from './cart.interface';

@Injectable()
export class CartService {
  defaultCart: CartInterface = {
    products: [],
    subtotal: 0,
    shipping: 0,
    total: 0,
  };

  addProduct(cart: CartInterface, newProduct: CartProduct) {
    const existingProductIndex = cart.products.findIndex(
      (product) => product.id === newProduct.id,
    );

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += newProduct.quantity;
    } else {
      cart.products.push(newProduct);
    }

    this.setSubtotalAndTotalPrices(cart);

    return cart;
  }

  editProduct(cart: CartInterface, productId: string, quantity: number) {
    const productIndex = cart.products.findIndex(
      (product) => product.id === productId,
    );

    if (productIndex === -1) {
      throw new NotFoundException('There is no product with that id');
    }

    cart.products[productIndex].quantity = quantity;

    this.setSubtotalAndTotalPrices(cart);

    return cart;
  }

  deleteProduct(cart: CartInterface, productId: string) {
    if (!cart) {
      throw new NotFoundException('There is no cart session');
    }

    const itemExists = cart.products.find(
      (product) => product.id === productId,
    );

    if (!itemExists) {
      throw new NotFoundException('No cart item found.');
    }

    cart.products = cart.products.filter((product) => product.id !== productId);

    this.setSubtotalAndTotalPrices(cart);

    return cart;
  }

  setSubtotalAndTotalPrices(cart: CartInterface) {
    cart.subtotal = 0;
    cart.total = 0;

    cart.products.forEach((product) => {
      cart.subtotal += product.price * product.quantity;
    });

    if (cart.subtotal > 10000 || cart.subtotal === 0) cart.shipping = 0;
    else cart.shipping = 1000;

    cart.total = cart.subtotal + cart.shipping;
  }
}
