import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { Category } from '../category/category.entity';
import { OrderItem } from '../order/entities/order-item.entity';
import { Order } from '../order/entities/order.entity';
import { Product } from '../product/product.entity';
import { Review } from '../review/review.entity';
import { User } from '../user/user.entity';
import { Image } from '../image/image.entity';
import ProductSeeder from './seeds/product.seeder';
import CategorySeeder from './seeds/category.seeder';

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: configService.get<string>('DB_HOST') || 'db',
  port: configService.get<number>('DB_PORT') || 3306,
  username: configService.get<string>('DB_USERNAME') || 'admin',
  password: configService.get<string>('DB_PASSWORD') || 'password',
  database: configService.get<string>('DB_NAME') || 'ecommerce',
  entities: [Category, User, Product, Review, Order, OrderItem, Image],
  synchronize: true,
  seeds: [CategorySeeder, ProductSeeder],
};

export const dataSource = new DataSource(dataSourceOptions);
