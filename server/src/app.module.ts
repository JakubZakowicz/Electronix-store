import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { Category } from './category/category.entity';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'admin',
      password: 'password',
      database: 'ecommerce',
      entities: [Category, User],
      synchronize: true,
    }),
    CategoryModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
