import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Order } from '../../order/entities/order.entity';
import * as seederData from '../seeder-data.json';

export default class OrderSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Order);
    await repository.insert(seederData.orders);
  }
}
