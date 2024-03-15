import { createClient } from 'redis';
import RedisStore from 'connect-redis';

const redisClient = createClient({ socket: { host: 'redis', port: 6379 } });
redisClient.connect().catch(console.error);

export const redisStore = new RedisStore({
  client: redisClient,
});
