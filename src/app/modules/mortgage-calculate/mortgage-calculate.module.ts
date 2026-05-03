import { Module } from '@nestjs/common';
import { MortgageCalculateController } from './mortgage-calculate.controller';
import { MortgageCalculateService } from './mortgage-calculate.service';
import { BullModule } from '@nestjs/bullmq';
import { MortgageCalculateProcessor } from './mortgage-calculation.processor';

@Module({
  controllers: [MortgageCalculateController],
  providers: [MortgageCalculateService, MortgageCalculateProcessor],
  imports: [
    BullModule.registerQueue({
      name: 'calculations'
    })
  ]
})
export class MortgageCalculateModule {}
