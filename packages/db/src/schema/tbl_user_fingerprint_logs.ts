import { pgTable, text, integer, timestamp, boolean, json } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ** Import table
import { tbl_users } from "./tbl_users";

export const tbl_user_fingerprint_logs = pgTable("tbl_user_fingerprint_logs", {
  visitor_id: text("visitor_id").notNull().primaryKey(),
  user_id: text("user_id").notNull().references(() => tbl_users.id, { onDelete: "cascade" }),
  ip_address: text("ip_address").notNull(),
  device_info: json("device_info").notNull(), // Storing OS name & version as JSON
  ip_location: json("ip_location"), // Storing full IP location as JSON (optional)
  submission_count: integer("submission_count").notNull().default(0),
  last_submission_at: timestamp("last_submission_at").notNull(),
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
