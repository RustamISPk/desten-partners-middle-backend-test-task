import { mysqlTable, varchar, int, float, text } from 'drizzle-orm/mysql-core';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { users } from '../../user/schemas/users';
import { mortgageProfile } from '../../mortgage-create/schemas/mortgage.profile';

export const mortgageCalculation = mysqlTable('MortgageCalculation', {
  id: int('id').primaryKey().autoincrement(),
  userId: varchar('userId', { length: 255 }).references(() => users.tgId, {
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),
  mortgageProfileId: int('mortgageProfileId').references(
    () => mortgageProfile.id,
    { onDelete: 'cascade', onUpdate: 'cascade' }
  ),
  monthlyPayment: float('monthlyPayment').notNull(),
  totalPayment: float('totalPayment').notNull(),
  totalOverpaymentAmount: float('totalOverpaymentAmount').notNull(),
  possibleTaxDeduction: float('possibleTaxDeduction').notNull(),
  savingsDueMotherCapital: float('savingsDueMotherCapital').notNull(),
  recommendedIncome: float('recommendedIncome').notNull(),
  paymentSchedule: text('paymentSchedule').notNull()
});

export type MortgageCalculations = InferSelectModel<typeof mortgageCalculation>;
export type NewMortgageCalculation = InferInsertModel<
  typeof mortgageCalculation
>;
