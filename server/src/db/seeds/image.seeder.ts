import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Image } from '../../image/image.entity';
import * as seederData from '../seeder-data.json';

export default class ImageSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Image);
    await repository.insert(seederData.images);
  }
}
