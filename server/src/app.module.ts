import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { Category } from './category/category.entity';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.entity';
import { ReviewModule } from './review/review.module';
import { Review } from './review/review.entity';
import { OrderModule } from './order/order.module';
import { Order } from './order/entities/order.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CartModule } from './cart/cart.module';
import { OrderItem } from './order/entities/order-item.entity';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ImageModule } from './image/image.module';
import { Image } from './image/image.entity';
import { CheckoutModule } from './checkout/checkout.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
    CategoryModule,
    UserModule,
    ProductModule,
    ReviewModule,
    OrderModule,
    AuthModule,
    CartModule,
    CloudinaryModule,
    ImageModule,
    CheckoutModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
