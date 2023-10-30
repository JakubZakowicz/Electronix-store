import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class CheckoutService {
  private stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2023-10-16',
    });
  }

  getConfig() {
    return { publishableKey: process.env.STRIPE_PUBLISHABLE_KEY };
  }

  createPayment(sum: number) {
    return this.stripe.paymentIntents.create({
      amount: sum,
      currency: 'USD',
      automatic_payment_methods: { enabled: true },
    });
  }

  async addNewOrder(clientSecret: string) {
    const paymentIntent = await this.stripe.paymentIntents.retrieve(
      clientSecret,
    );
    console.log(paymentIntent);
  }
}
