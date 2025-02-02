import { pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const tbl_rewards = pgTable("tbl_rewards", {
  id: uuid("id").notNull().primaryKey().$default(() => sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  points_required: integer("points_required").notNull(),
  partner: text("partner").notNull(),
  created_at: timestamp("created_at", { mode: "string" }).notNull(),
});

export type Reward = typeof tbl_rewards.$inferSelect;
export type NewReward = typeof tbl_rewards.$inferInsert;
