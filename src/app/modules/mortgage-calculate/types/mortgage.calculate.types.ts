export interface MortgagePayment {
  totalPayment: number;
  repaymentOfMortgageBody: number;
  repaymentOfMortgageInterest: number;
  mortgageBalance: number;
}

export type MonthlyMortgagePayments = Record<string, MortgagePayment>;

export type MortgagePaymentSchedule = Record<string, MonthlyMortgagePayments>;
