import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order';
import { UpdateOrderDto } from './dto/update-order';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findAll() {
    return await this.orderRepository.find();
  }

  async findOneById(id: number) {
    const order = await this.orderRepository.findOneBy({ id });

    if (!order) {
      throw new NotFoundException(`There is no order with id: ${id}`);
    }

    return await order;
  }

  async create(orderData: CreateOrderDto) {
    const newOrder = this.orderRepository.create(orderData);
    return await this.orderRepository.save(newOrder);
  }

  async update(id: number, orderData: UpdateOrderDto) {
    const order = await this.orderRepository.preload({
      id,
      ...orderData,
    });

    if (!order) {
      throw new NotFoundException(`There is no order with id: ${id}`);
    }

    return await this.orderRepository.save(order);
  }

  async delete(id: number) {
    return await this.orderRepository.delete(id);
  }
}
