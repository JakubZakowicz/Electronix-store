import {
  Controller,
  Delete,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Session,
} from '@nestjs/common';
import { ProductService } from '../product/product.service';
import {
  CartProduct,
  addProduct,
  defaultCart,
  setSubtotalAndTotalPrices,
} from './cart';
import { CartSession } from './cart-session.interface';

@Controller('cart')
export class CartController {
  constructor(private readonly productService: ProductService) {}

  @Post('add/:productId')
  async addProductToCart(
    @Param('productId') productId: string,
    @Query('quantity', ParseIntPipe) quantity: number,
    @Session() session: CartSession,
  ) {
    const product = await this.productService.findOneById(productId);
    const cartProduct: CartProduct = { ...product, quantity: quantity ?? 1 };

    const cart = session.cart ?? defaultCart;

    console.log(cart);

    addProduct(cart, cartProduct);

    session.cart = cart;

    console.log(session.cart);

    return {
      message: 'Product added successfully to cart',
      cart: session.cart,
    };
  }

  @Patch('edit/:productId')
  async editCartProduct(
    @Param('productId') productId: string,
    @Query('quantity') quantity: number,
    @Session() session: CartSession,
  ) {
    const cart = session.cart;

    if (!cart) {
      throw new NotFoundException('There is no cart session');
    }

    const productIndex = cart.products.findIndex(
      (product) => product.id === productId,
    );

    if (productIndex === -1) {
      throw new NotFoundException('There is no product with that id');
    }

    cart.products[productIndex].quantity = quantity;

    setSubtotalAndTotalPrices(cart);

    session.cart = cart;

    return { message: 'Cart updated successfully', cart: session.cart };
  }

  @Delete(':id')
  async deleteProductFromCart(
    @Param('id') productId: string,
    @Session() session: CartSession,
  ) {
    const cart = session.cart;

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

    setSubtotalAndTotalPrices(cart);

    session.cart = cart;

    return {
      message: 'Product deleted successfully from cart',
      cart: session.cart,
    };
  }
}
