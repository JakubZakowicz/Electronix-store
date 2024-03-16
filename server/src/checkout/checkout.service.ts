import { BadRequestException, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CartInterface } from '../cart/cart.interface';
import { OrderService } from '../order/services/order.service';
import { OrderItemService } from '../order/services/order-item.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CheckoutService {
  private stripe;

  constructor(
    private readonly orderService: OrderService,
    private readonly orderItemService: OrderItemService,
    private readonly configService: ConfigService,
  ) {
    this.stripe = new Stripe(
      configService.get<string>('STRIPE_SECRET_KEY') || '',
      {
        apiVersion: '2023-10-16',
      },
    );
  }

  getConfig() {
    return { publishableKey: this.configService.get('STRIPE_PUBLISHABLE_KEY') };
  }

  createPayment(sum: number) {
    return this.stripe.paymentIntents.create({
      amount: sum,
      currency: 'USD',
      automatic_payment_methods: { enabled: true },
    });
  }

  async addNewOrder(
    clientSecret: string,
    cart: CartInterface,
    userId?: string,
  ) {
    const paymentIntent = await this.stripe.paymentIntents.retrieve(
      clientSecret,
    );

    if (paymentIntent.status !== 'succeeded') return;

    const order = await this.orderService.findOneByPaymentIntentId(
      paymentIntent.id,
    );

    if (order) throw new BadRequestException('Order already exists!');

    const { total, shipping } = cart;

    const newOrder = await this.orderService.create({
      totalPrice: total,
      deliveryPrice: shipping,
      status: 'Received',
      paymentIntentId: paymentIntent.id,
      ...(userId && { user: { id: userId } }),
    });

    await this.getOrderItems(cart, newOrder.id);

    return order;
  }

  getOrderItems(cart: CartInterface, orderId: string) {
    return cart.products.map((product) => {
      const { id, quantity } = product;
      const orderItem = this.orderItemService.create(id, orderId, quantity);
      return orderItem;
    });
  }
}
