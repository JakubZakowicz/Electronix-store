import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { OrderItem } from '../../order/entities/order-item.entity';
import * as seederData from '../seeder-data.json';

export default class OrderItemSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(OrderItem);
    await repository.insert(seederData.orderItems);
  }
}
