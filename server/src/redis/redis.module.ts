import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { redisStore } from './redisStore';
import { redisStore as cacheManagerRedisStore } from 'cache-manager-redis-yet';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: cacheManagerRedisStore,
        socket: {
          host: configService.get<string>('REDIS_HOST') || 'redis',
          port: configService.get<number>('REDIS_PORT') || 6379,
        },
        ttl: 20,
      }),
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
