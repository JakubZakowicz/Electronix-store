import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotAcceptableException,
  Param,
  Post,
  Res,
  Session,
} from '@nestjs/common';
import { Response } from 'express';
import { CheckoutService } from './checkout.service';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { CartSession } from '../cart/cart.interface';
import { AddNewOrderDto } from './dto/add-new-order.dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Get('config')
  getConfig() {
    return this.checkoutService.getConfig();
  }

  @Post('create-payment-intent')
  async createPaymentIntent(
    @Body() paymentData: CreatePaymentIntentDto,
    @Res() response: Response,
  ) {
    try {
      const payment = await this.checkoutService.createPayment(paymentData.sum);
      response.send({ clientSecret: payment.client_secret });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post('/add-new-order/:payment_intent_id')
  async addNewOrder(
    @Param('payment_intent_id') clientSecret: string,
    @Body() userData: AddNewOrderDto,
    @Session() session: CartSession,
  ) {
    if (!clientSecret) throw new BadRequestException();

    const cart = session.cart;

    if (!cart) throw new NotAcceptableException('There is no cart session');

    if (cart.products.length === 0) {
      throw new NotAcceptableException('Cart is empty');
    }

    const newOrder = this.checkoutService.addNewOrder(
      clientSecret,
      cart,
      userData?.userId,
    );

    session.cart = { products: [], total: 0, subtotal: 0, shipping: 0 };

    return newOrder;
  }
}
