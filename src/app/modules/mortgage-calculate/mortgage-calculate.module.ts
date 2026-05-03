import { Module } from '@nestjs/common';
import { MortgageCalculateController } from './mortgage-calculate.controller';
import { MortgageCalculateService } from './mortgage-calculate.service';

@Module({
  controllers: [MortgageCalculateController],
  providers: [MortgageCalculateService]
})
export class MortgageCalculateModule {}
