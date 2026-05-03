import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';
import * as process from 'node:process';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis({
          host: process.env.REDIS_HOST || '127.0.0.1',
          port: parseInt(process.env.REDIS_PORT!) || 6379
        });
      }
    }
  ],
  exports: ['REDIS_CLIENT']
})
export class RedisModule {}
