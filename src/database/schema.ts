import { users } from '../app/modules/user/schemas/users';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { mortgageProfile } from '../app/modules/mortgage-create/schemas/mortgage.profile';

export const databaseSchema = {
  users,
  mortgageProfile
} as const;

export type Database = MySql2Database<typeof databaseSchema>;
