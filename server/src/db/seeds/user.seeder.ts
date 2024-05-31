import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { User } from '../../user/user.entity';
import * as seederData from '../seeder-data.json';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(User);
    await repository.insert(seederData.users);
  }
}
