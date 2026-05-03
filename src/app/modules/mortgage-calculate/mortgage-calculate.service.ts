import { Inject, Injectable } from '@nestjs/common';
import { Database } from '../../../database/schema';
import Redis from 'ioredis';
import {
  mortgageProfile,
  MortgageProfiles
} from '../mortgage-create/schemas/mortgage.profile';
import { eq } from 'drizzle-orm';
import { mortgageCalculation } from './schemas/mortgage.calculation';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class MortgageCalculateService {
  constructor(
    @Inject('DATABASE') private readonly db: Database,
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
    @InjectQueue('calculations') private readonly calculationQueue: Queue
  ) {}

  public async getCalculation(id: string) {
    const userId = 'test';
    const redisResponse = await this.redis.get(`${id}`);
    if (redisResponse !== null) {
      return redisResponse;
    }
    await this.createCalculationTask(userId);
    return { message: 'расчет добавлен в очередь, подождите' };
  }

  private async createCalculationTask(userId: string) {
    const calculations = await this.getEmptyCalculationMortgageProfiles(userId);
    if (calculations.length > 0) {
      await this.calculationQueue.add('calculate-mortgages', {
        userId,
        profiles: calculations
      });
    }
  }

  private async getEmptyCalculationMortgageProfiles(userId: string) {
    const emptyCalculations: MortgageProfiles[] = [];
    const mortgageProfilesByUser = await this.db
      .select()
      .from(mortgageProfile)
      .where(eq(mortgageProfile.userId, userId));

    for (const mortgageProfile of mortgageProfilesByUser) {
      const calculation = await this.db
        .select()
        .from(mortgageCalculation)
        .where(eq(mortgageCalculation.mortgageProfileId, mortgageProfile.id))
        .limit(1);
      if (calculation.length > 0) {
        continue;
      }
      emptyCalculations.push(mortgageProfile);
    }
    return emptyCalculations;
  }
}
