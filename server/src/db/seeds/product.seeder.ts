import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Product } from '../../product/product.entity';
import * as seederData from '../seeder-data.json';

export default class ProductSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Product);
    await repository.insert(seederData.products);
  }
}
