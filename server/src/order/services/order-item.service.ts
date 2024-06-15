import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from '../entities/order-item.entity';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    private readonly productService: ProductService,
  ) {}

  async create(productId: string, orderId: string, quantity: number) {
    const orderItem = this.orderItemRepository.create({
      product: { id: productId },
      order: { id: orderId },
      quantity: quantity,
    });
    return await this.orderItemRepository.save(orderItem);
  }
}
