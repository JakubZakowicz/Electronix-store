import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './services/order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItemService } from './services/order-item.service';
import { OrderItem } from './entities/order-item.entity';
import { CartService } from '../cart/cart.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
  controllers: [OrderController],
  providers: [OrderService, OrderItemService, CartService],
  exports: [OrderService, OrderItemService],
})
export class OrderModule {}
