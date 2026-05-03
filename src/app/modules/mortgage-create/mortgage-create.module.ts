import { Module } from '@nestjs/common';
import { MortgageCreateController } from './mortgage-create.controller';
import { MortgageCreateService } from './mortgage-create.service';

@Module({
  controllers: [MortgageCreateController],
  providers: [MortgageCreateService]
})
export class MortgageCreateModule {}
