import {
  mysqlTable,
  varchar,
  boolean,
  int,
  mysqlEnum,
  float
} from 'drizzle-orm/mysql-core';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { users } from '../../user/schemas/users';

export const mortgageProfile = mysqlTable('MortgageProfile', {
  id: int('id').primaryKey().autoincrement(),
  userId: varchar('userId', { length: 255 }).references(() => users.tgId, {
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),
  propertyPrice: float('propertyPrice').notNull(),
  propertyType: mysqlEnum('propertyType', [
    'apartment_in_new_building',
    'apartment_in_secondary_building',
    'house',
    'house_with_land_plot',
    'land_plot',
    'other'
  ]).default('apartment_in_new_building'),
  downPaymentAmount: float('downPaymentAmount').notNull(),
  matCapitalAmount: float('matCapitalAmount'),
  matCapitalIncluded: boolean('matCapitalIncluded').default(false).notNull(),
  mortgageTermYears: float('mortgageTermYears').notNull(),
  interestRate: float('interestRate').notNull()
});

export type MortgageProfiles = InferSelectModel<typeof mortgageProfile>;
export type NewMortgageProfile = InferInsertModel<typeof mortgageProfile>;
