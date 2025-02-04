import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { sql, relations } from "drizzle-orm";

// ** import table
import { tbl_users } from "./tbl_users";
import { tbl_image_hashes } from "./tbl_image_hashes";

export const tbl_recycling_logs = pgTable("tbl_recycling_logs", {
  id: text("id").notNull().primaryKey().$default(() => sql`gen_random_uuid()`),
  user_id: text("user_id").notNull().references(() => tbl_users.id, { onDelete: "cascade" }),
  item_type: text("item_type").notNull(),
  quantity: integer("quantity").default(6),
  image_hash_id: text("image_hash_id").notNull().references(() => tbl_image_hashes.id, { onDelete: "cascade" }),
  exif_timestamp: timestamp("exif_timestamp").notNull(),
  exif_gps_location: text("exif_gps_location").notNull(),
  status: text("status")
    .notNull()
    .default("Pending"),
  created_at: timestamp("created_at").notNull(),
});

export const tblRecyclingLogsRelations = relations(tbl_recycling_logs, ({ one }) => ({
  user: one(tbl_users, {
    fields: [tbl_recycling_logs.user_id],
    references: [tbl_users.id],
  }),
  imageHash: one(tbl_image_hashes, {
    fields: [tbl_recycling_logs.image_hash_id],
    references: [tbl_image_hashes.id],
  }),
}));

export type RecyclingLog = typeof tbl_recycling_logs.$inferSelect;
export type NewRecyclingLog = typeof tbl_recycling_logs.$inferInsert;
