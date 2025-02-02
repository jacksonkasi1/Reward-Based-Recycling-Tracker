import { pgTable, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ** import table
import { tbl_users } from "./tbl_users";

export const tbl_user_fingerprint_logs = pgTable("tbl_user_fingerprint_logs", {
  visitor_id: text("visitor_id").notNull().primaryKey(),
  user_id: text("user_id").notNull().references(() => tbl_users.id, { onDelete: "cascade" }),
  device_info: text("device_info").notNull(),
  ip_address: text("ip_address").notNull(),
  submission_count: integer("submission_count").notNull().default(0),
  last_submission_at: timestamp("last_submission_at", { mode: "string" }).notNull(),
  flagged: boolean("flagged").notNull().default(false),
});

export const tblUserFingerprintLogsRelations = relations(tbl_user_fingerprint_logs, ({ one }) => ({
  user: one(tbl_users, {
    fields: [tbl_user_fingerprint_logs.user_id],
    references: [tbl_users.id],
  }),
}));

export type UserFingerprintLog = typeof tbl_user_fingerprint_logs.$inferSelect;
export type NewUserFingerprintLog = typeof tbl_user_fingerprint_logs.$inferInsert;
