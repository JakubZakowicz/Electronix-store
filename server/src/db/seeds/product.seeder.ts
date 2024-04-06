import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Product } from '../../product/product.entity';

export default class ProductSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const repository = dataSource.getRepository(Product);
    await repository.insert({
      id: '1',
      name: 'Pico 4 128GB',
      summary:
        'Pico 4 128GB is a virtual reality headset developed by ByteDance.',
      description:
        'PICO 4 is a virtual reality headset developed by ByteDance.[6] It is designed for virtual reality games and is only available in Europe and East Asia (China, South Korea, Japan, Malaysia and Singapore).[7][8] It is currently not available in the United States.[9] PICO founder and president Henry Zhou expected to sell more than 1 million units of the headset.[10] PICO 4 is a competitor of Quest 2.[11][12] In November 2023, VRChat was launched on PICO 4.[13',
      price: 425000,
      isFeatured: true,
      rating: 0,
      slug: 'pico-4',
      category: { id: '134' },
    });
  }
}
