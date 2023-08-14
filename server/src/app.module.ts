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
import { Order } from './order/order.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'admin',
      password: 'password',
      database: 'ecommerce',
      entities: [Category, User, Product, Review, Order],
      synchronize: true,
    }),
    CategoryModule,
    UserModule,
    ProductModule,
    ReviewModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
