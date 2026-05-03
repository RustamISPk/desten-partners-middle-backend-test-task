import { Body, Controller, Post } from '@nestjs/common';
import { MortgageCreateService } from './mortgage-create.service';
import { MortgageCreateDto } from './dto/mortgage.create.dto';

@Controller('mortgage')
export class MortgageCreateController {
  constructor(private readonly mortgageService: MortgageCreateService) {}

  @Post('mortgage-profiles')
  public create(@Body() data: MortgageCreateDto) {
    return this.mortgageService.createMortgage(data, 'test');
  }
}
