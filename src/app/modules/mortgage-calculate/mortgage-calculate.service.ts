import { Inject, Injectable } from '@nestjs/common';
import { Database } from '../../../database/schema';
import Redis from 'ioredis';

@Injectable()
export class MortgageCalculateService {
  constructor(
    @Inject('DATABASE') private readonly db: Database,
    @Inject('REDIS_CLIENT') private readonly redis: Redis
  ) {}

  public async getCalculation(id: string) {
    const redisResponse = await this.redis.get(`${id}`);
    if (redisResponse !== null) {
      return redisResponse;
    }
  }
}
