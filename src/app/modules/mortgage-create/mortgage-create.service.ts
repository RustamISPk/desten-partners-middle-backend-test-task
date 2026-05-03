import { Inject, Injectable } from '@nestjs/common';
import { Database } from '../../../database/schema';
import { MortgageCreateDto } from './dto/mortgage.create.dto';
import { mortgageProfile } from './schemas/mortgage.profile';

@Injectable()
export class MortgageCreateService {
  constructor(@Inject('DATABASE') private readonly db: Database) {}

  public async createMortgage(createDto: MortgageCreateDto, userId: string) {
    await this.db.insert(mortgageProfile).values({
      userId: userId,
      propertyPrice: createDto.propertyPrice,
      propertyType: createDto.propertyType,
      downPaymentAmount: createDto.downPaymentAmount,
      matCapitalAmount: createDto.matCapitalAmount,
      matCapitalIncluded: createDto.matCapitalIncluded,
      mortgageTermYears: createDto.mortgageTermYears,
      interestRate: createDto.interestRate
    });
  }
}
