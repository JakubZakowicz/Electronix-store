import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { redisStore } from './redisStore';
import { redisStore as cacheManagerRedisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    CacheModule.register({
      store: cacheManagerRedisStore,
      socket: {
        host: process.env.REDIS_HOST || 'redis',
        port: process.env.REDIS_PORT || 6379,
      },
    }),
  ],
  providers: [
    {
      provide: 'REDIS',
      useValue: redisStore,
    },
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
  ],
  controllers: [],
  exports: [CacheModule],
})
export class RedisModule {}
