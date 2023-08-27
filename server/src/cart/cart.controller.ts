import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Session,
} from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { CartProduct, CartSession } from './cart.interface';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly productService: ProductService,
  ) {}

  @Get()
  async getCartData(@Session() session: CartSession) {
    const cart = session.cart ?? this.cartService.defaultCart;

    return cart;
  }

  @Post('add/:productId')
  async addProductToCart(
    @Param('productId') productId: string,
    @Query('quantity', ParseIntPipe) quantity: number,
    @Session() session: CartSession,
  ) {
    const product = await this.productService.findOneById(productId);
    const cartProduct: CartProduct = { ...product, quantity: quantity ?? 1 };

    const cart = session.cart ?? this.cartService.defaultCart;

    session.cart = this.cartService.addProduct(cart, cartProduct);

    return {
      message: 'Product added successfully to cart',
    };
  }

  @Patch('edit/:productId')
  async editCartProduct(
    @Param('productId') productId: string,
    @Query('quantity', ParseIntPipe) quantity: number,
    @Session() session: CartSession,
  ) {
    session.cart = this.cartService.editProduct(
      session.cart,
      productId,
      quantity,
    );

    return { message: 'Cart updated successfully' };
  }

  @Delete(':id')
  async deleteProductFromCart(
    @Param('id') productId: string,
    @Session() session: CartSession,
  ) {
    session.cart = this.cartService.deleteProduct(session.cart, productId);

    return {
      message: 'Product deleted successfully from cart',
    };
  }
}
