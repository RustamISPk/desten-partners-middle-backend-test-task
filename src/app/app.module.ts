import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/user/users.module';
import { DatabaseModule } from '../database/database.module';
import { MortgageCreateModule } from './modules/mortgage-create/mortgage-create.module';
import { MortgageCalculateModule } from './modules/mortgage-calculate/mortgage-calculate.module';
import { RedisModule } from '../redis/redis.module';
import { BullModule } from '@nestjs/bullmq';
import * as process from 'node:process';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    DatabaseModule,
    UsersModule,
    MortgageCreateModule,
    MortgageCalculateModule,
    RedisModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        connection: {
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT!) || 6379
        }
      })
    })
  ]
})
export class AppModule {}
