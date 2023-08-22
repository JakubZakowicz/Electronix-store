import { Controller, Param, Post, Session } from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { addProduct, defaultCart } from './cart';
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
}
