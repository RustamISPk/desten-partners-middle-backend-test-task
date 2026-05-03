import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/user/users.module';
import { DatabaseModule } from '../database/database.module';
import { MortgageCreateModule } from './modules/mortgage-create/mortgage-create.module';
import { MortgageCalculateModule } from './modules/mortgage-calculate/mortgage-calculate.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    DatabaseModule,
    UsersModule,
    MortgageCreateModule,
    MortgageCalculateModule
  ]
})
export class AppModule {}
