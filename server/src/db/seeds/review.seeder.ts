import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Review } from '../../review/review.entity';
import * as seederData from '../seeder-data.json';

export default class ReviewSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Review);
    await repository.insert(seederData.reviews);
  }
}
