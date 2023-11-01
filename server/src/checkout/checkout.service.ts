import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CartInterface } from '../cart/cart.interface';
import { OrderService } from '../order/services/order.service';
import { OrderItemService } from '../order/services/order-item.service';

@Injectable()
export class CheckoutService {
  private stripe;

  constructor(
    private readonly orderService: OrderService,
    private readonly orderItemService: OrderItemService,
  ) {
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

  async addNewOrder(clientSecret: string, cart: CartInterface) {
    const paymentIntent = await this.stripe.paymentIntents.retrieve(
      clientSecret,
    );

    if (paymentIntent.status !== 'succeeded') return;

    console.log(paymentIntent);

    const { total, shipping } = cart;

    const order = await this.orderService.create({
      totalPrice: total,
      deliveryPrice: shipping,
      status: 'Received',
    });

    const orderItems = await this.getOrderItems(cart, order.id);

    return orderItems;
  }

  getOrderItems(cart: CartInterface, orderId: string) {
    return cart.products.map((product) => {
      const { id, quantity } = product;
      const orderItem = this.orderItemService.create(id, orderId, quantity);
      return orderItem;
    });
  }
}
