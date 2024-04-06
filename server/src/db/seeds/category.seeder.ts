import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Category } from '../../category/category.entity';
import * as seederData from '../seeder-data.json';

export default class CategorySeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Category);
    await repository.insert(seederData.categories);
  }
}
