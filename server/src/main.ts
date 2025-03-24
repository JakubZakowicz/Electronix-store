import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { AppModule } from './app.module';
import { redisStore } from './redis/redisStore';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
  });

  app.use(
    session({
      store: redisStore,
      secret: process.env.SESSION_SECRET || 'secret123',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      },
    }),
  );
  app.use(cookieParser());

  await app.listen(5000);
}
bootstrap();
