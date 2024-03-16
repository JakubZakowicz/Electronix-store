import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './cart/cart.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ImageModule } from './image/image.module';
import { CheckoutModule } from './checkout/checkout.module';
import { RedisModule } from './redis/redis.module';
import { validate } from './config/env.validation';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate }),
    DbModule,
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
