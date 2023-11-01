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
import { PaymentDto } from './dto/payment.dto';
import { CartSession } from '../cart/cart.interface';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Get('config')
  getConfig() {
    return this.checkoutService.getConfig();
  }

  @Post('create-payment-intent')
  async createPaymentIntent(
    @Body() paymentData: PaymentDto,
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
    @Session() session: CartSession,
  ) {
    if (!clientSecret) throw new BadRequestException();

    const cart = session.cart;

    console.log(cart);

    if (!cart) throw new NotAcceptableException('There is no cart session');

    if (cart.products.length === 0) {
      throw new NotAcceptableException('Cart is empty');
    }

    this.checkoutService.addNewOrder(clientSecret, cart);
  }
}
