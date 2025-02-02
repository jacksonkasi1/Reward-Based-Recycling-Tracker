import { pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core";
import { sql, relations } from "drizzle-orm";

// ** import table
import { tbl_users } from "./tbl_users";
import { tbl_image_hashes } from "./tbl_image_hashes";

export const tbl_recycling_logs = pgTable("tbl_recycling_logs", {
  id: uuid("id").notNull().primaryKey().$default(() => sql`gen_random_uuid()`),
  // Using uuid type for consistency since tbl_users.id is UUID.
  user_id: uuid("user_id").notNull().references(() => tbl_users.id, { onDelete: "cascade" }),
  item_type: text("item_type").notNull(),
  quantity: integer("quantity").default(6),
  // Likewise, image_hash_id is defined as uuid.
  image_hash_id: uuid("image_hash_id").notNull().references(() => tbl_image_hashes.id, { onDelete: "cascade" }),
  exif_timestamp: timestamp("exif_timestamp", { mode: "string" }).notNull(),
  exif_gps_location: text("exif_gps_location").notNull(),
  status: text("status")
    .notNull()
    .default("Pending"),
  created_at: timestamp("created_at", { mode: "string" }).notNull(),
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
