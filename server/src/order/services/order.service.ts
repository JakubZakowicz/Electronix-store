import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { CreateOrderDto } from '../dto/create-order';
import { UpdateOrderDto } from '../dto/update-order';
import { Pagination } from '../../decorators/pagination-params.decorator';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findAll(paginationParams: Pagination, userId?: string) {
    const { page, limit, size, offset } = paginationParams;

    const [orders, total] = await this.orderRepository.findAndCount({
      where: { user: { id: userId } },
      relations: { orderItems: { product: true } },
      take: limit,
      skip: offset,
    });

    return {
      orderCount: total,
      orders,
      page,
      size,
    };
  }

  async findOneById(id: string) {
    const order = await this.orderRepository.findOneBy({ id });

    if (!order) {
      throw new NotFoundException(`There is no order with id: ${id}`);
    }

    return await order;
  }

  async findOneByPaymentIntentId(paymentIntentId: string) {
    const order = await this.orderRepository.findOne({
      where: { paymentIntentId },
    });

    return order;
  }

  async create(orderData: CreateOrderDto) {
    const newOrder = this.orderRepository.create(orderData);
    return await this.orderRepository.save(newOrder);
  }

  async update(id: string, orderData: UpdateOrderDto) {
    const order = await this.orderRepository.preload({
      id,
      ...orderData,
    });

    if (!order) {
      throw new NotFoundException(`There is no order with id: ${id}`);
    }

    return await this.orderRepository.save(order);
  }

  async delete(id: string) {
    return await this.orderRepository.delete(id);
  }
}
