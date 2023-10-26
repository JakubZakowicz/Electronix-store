import {
  BadRequestException,
  Body,
  Controller,
  Get,
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
  createPaymentIntent(
    @Body() paymentData: PaymentDto,
    @Res() response: Response,
  ) {
    this.checkoutService
      .createPayment(paymentData.sum)
      .then((res) => response.send({ clientSecret: res.client_secret }))
      .catch((err) => {
        throw new BadRequestException(err);
      });
  }
}
