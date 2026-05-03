import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Inject } from '@nestjs/common';
import { Database } from '../../../database/schema';
import Redis from 'ioredis';
import { MortgagePaymentSchedule } from './types/mortgage.calculate.types';
import { mortgageCalculation } from './schemas/mortgage.calculation';

@Processor('calculations')
export class MortgageCalculateProcessor extends WorkerHost {
  constructor(
    @Inject('DATABASE') private readonly db: Database,
    @Inject('REDIS_CLIENT') private readonly redis: Redis
  ) {
    super();
  }
  public async process(job: Job) {
    const { userId, profiles } = job.data;
    for (const profile of profiles) {
      const {
        id,
        propertyPrice,
        downPaymentAmount,
        matCapitalAmount,
        matCapitalIncluded,
        mortgageTermYears,
        interestRate
      } = profile;

      const matCapital = matCapitalIncluded ? matCapitalAmount : 0;
      const loanAmount = propertyPrice - downPaymentAmount - matCapital;
      const totalMonths = mortgageTermYears * 12;
      const monthlyRate = interestRate / 12 / 100;

      const pow = Math.pow(1 + monthlyRate, totalMonths);
      const monthlyPayment = (loanAmount * (monthlyRate * pow)) / (pow - 1);

      const totalPayment = monthlyPayment * totalMonths;
      const totalOverpaymentAmount = totalPayment - loanAmount;

      const deductionProperty = Math.min(propertyPrice, 2000000) * 0.13;
      const deductionInterest =
        Math.min(totalOverpaymentAmount, 3000000) * 0.13;
      const possibleTaxDeduction = deductionProperty + deductionInterest;

      const recommendedIncome = monthlyPayment / 0.4;

      const mortgagePaymentSchedule: MortgagePaymentSchedule = {};
      let remainingDebt = loanAmount;
      const startDate = new Date();

      for (let i = 0; i < totalMonths; i++) {
        const currentDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth() + i,
          1
        );
        const year = currentDate.getFullYear().toString();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');

        const interest = remainingDebt * monthlyRate;
        const principal = monthlyPayment - interest;
        remainingDebt -= principal;

        if (!mortgagePaymentSchedule[year]) {
          mortgagePaymentSchedule[year] = {};
        }

        mortgagePaymentSchedule[year][month] = {
          totalPayment: monthlyPayment,
          repaymentOfMortgageBody: principal,
          repaymentOfMortgageInterest: interest,
          mortgageBalance: Math.max(0, remainingDebt)
        };
      }

      const calculation = {
        monthlyPayment: monthlyPayment,
        totalPayment: totalPayment,
        totalOverpaymentAmount: totalOverpaymentAmount,
        possibleTaxDeduction: possibleTaxDeduction,
        savingsDueMotherCapital: matCapital,
        recommendedIncome: recommendedIncome,
        mortgagePaymentSchedule
      };
      const recordId = await this.db
        .insert(mortgageCalculation)
        .values({
          userId: userId,
          mortgageProfileId: id,
          monthlyPayment: calculation.monthlyPayment,
          totalPayment: calculation.totalPayment,
          totalOverpaymentAmount: calculation.totalOverpaymentAmount,
          possibleTaxDeduction: calculation.possibleTaxDeduction,
          savingsDueMotherCapital: calculation.savingsDueMotherCapital,
          recommendedIncome: calculation.recommendedIncome,
          paymentSchedule: JSON.stringify(calculation.mortgagePaymentSchedule)
        })
        .$returningId();
      await this.redis.set(
        recordId[0].id.toString(),
        JSON.stringify(calculation)
      );
    }
  }
}
