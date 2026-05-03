import { Controller, Get, Param } from '@nestjs/common';
import { MortgageCalculateService } from './mortgage-calculate.service';

@Controller('mortgage-calculate')
export class MortgageCalculateController {
  constructor(private mortgageCalculateService: MortgageCalculateService) {}

  @Get('mortgage-profiles/:id')
  public async getCalculation(@Param('id') id: string) {
    return await this.mortgageCalculateService.getCalculation(id);
  }
}
