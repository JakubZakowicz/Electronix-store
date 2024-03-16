import { Injectable } from '@nestjs/common';
import { memoryStore } from 'cache-manager';

@Injectable()
export class AppService {
  async getHello() {
    const memoryCache = await memoryStore({ ttl: 25000 });
    await memoryCache.set('cache', 'cache');
    await memoryCache.del('cache');
    await memoryCache.reset();
    return 'Hello World!';
  }
}
