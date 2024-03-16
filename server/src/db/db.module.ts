import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../category/category.entity';
import { OrderItem } from '../order/entities/order-item.entity';
import { Order } from '../order/entities/order.entity';
import { Product } from '../product/product.entity';
import { Review } from '../review/review.entity';
import { User } from '../user/user.entity';
import { Image } from '../image/image.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST') || 'db',
        port: configService.get<number>('DB_PORT') || 3306,
        username: configService.get<string>('DB_USERNAME') || 'admin',
        password: configService.get<string>('DB_PASSWORD') || 'password',
        database: configService.get<string>('DB_NAME') || 'ecommerce',
        entities: [Category, User, Product, Review, Order, OrderItem, Image],
        synchronize: true,
      }),
    }),
  ],
})
export class DbModule {}
