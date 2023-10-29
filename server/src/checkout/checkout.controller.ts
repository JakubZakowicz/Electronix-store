import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
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
}
