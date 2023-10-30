import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { PaymentDto } from './dto/payment.dto';
import { Response } from 'express';

@Controller('checkout')
export class CheckoutController {
  constructor(private checkoutService: CheckoutService) {}

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
  async addNewOrder(@Param('payment_intent_id') clientSecret: string) {
    if (!clientSecret) throw new BadRequestException();
    this.checkoutService.addNewOrder(clientSecret);
  }
}
