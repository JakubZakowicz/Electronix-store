import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Session,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { CartProduct, CartSession } from './cart.interface';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartProductDto } from './dto/update-cart-product.dto';

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

  @UsePipes(new ValidationPipe())
  @Post('add')
  async addProductToCart(
    @Body() cartData: AddToCartDto,
    @Session() session: CartSession,
  ) {
    const { productId, quantity } = cartData;
    const product = await this.productService.findOne(productId);
    const cartProduct: CartProduct = { ...product, quantity: quantity ?? 1 };

    const cart = session.cart ?? this.cartService.defaultCart;

    session.cart = this.cartService.addProduct(cart, cartProduct);

    return {
      message: 'Product added successfully to cart',
    };
  }

  @UsePipes(new ValidationPipe())
  @Patch('edit')
  async editCartProduct(
    @Body() cartData: UpdateCartProductDto,
    @Session() session: CartSession,
  ) {
    const { productId, quantity } = cartData;

    const cart = session.cart;

    session.cart = this.cartService.editProduct(cart, productId, quantity);

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
