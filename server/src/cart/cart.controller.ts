import {
  Controller,
  Delete,
  NotFoundException,
  Param,
  Post,
  Session,
} from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { addProduct, defaultCart, setSubtotalAndTotalPrices } from './cart';
import { CartSession } from './cart-session.interface';

@Controller('cart')
export class CartController {
  constructor(private readonly productService: ProductService) {}

  @Post('add/:productId')
  async addProductToCart(
    @Param('productId') productId: string,
    @Session() session: CartSession,
  ) {
    const product = await this.productService.findOneById(productId);

    const cart = session.cart ?? defaultCart;

    console.log(cart);

    addProduct(cart, product);

    session.cart = cart;

    console.log(session.cart);

    return {
      message: 'Product added successfully to cart',
      cart: session.cart,
    };
  }

  @Delete(':id')
  async deleteProductFromCart(
    @Param('id') productId: string,
    @Session() session: CartSession,
  ) {
    const cart = session.cart;
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
