// ======================================
// Core Modules
// (None in this file)
// ======================================

// ======================================
// Third-Party Libraries
import { pgTable, serial, text, varchar, timestamp } from 'drizzle-orm/pg-core';
// ======================================

// ======================================
// Project Modules
// (None in this file)
// ======================================

/**
 * Defines the "users" table schema.
 */
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).defaultNow()
});
