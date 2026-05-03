import { Inject, Injectable } from '@nestjs/common';
import { Database } from '../../../database/schema';

@Injectable()
export class MortgageCreateService {
  constructor(@Inject('DATABASE') private readonly db: Database) {}
}
