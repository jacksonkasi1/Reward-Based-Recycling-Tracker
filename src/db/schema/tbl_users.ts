import { pgTable,  text, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const tbl_users = pgTable("tbl_users", {
  id: text("id").notNull().primaryKey().$default(() => sql`gen_random_uuid()`),
  visitor_id: text("visitor_id").notNull().unique(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  password_hash: text('password_hash').notNull(),
  points: integer("points").notNull().default(0),
  location: text("location"),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at").notNull(),
});

// Export types for selection and insertion.
export type User = typeof tbl_users.$inferSelect;
export type NewUser = typeof tbl_users.$inferInsert;
