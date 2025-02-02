import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const tbl_image_hashes = pgTable("tbl_image_hashes", {
  id: uuid("id").notNull().primaryKey().$default(() => sql`gen_random_uuid()`),
  image_hash: text("image_hash").notNull(),
  image_url: text("image_url").notNull(),
  created_at: timestamp("created_at", { mode: "string" }).notNull(),
});

export type ImageHash = typeof tbl_image_hashes.$inferSelect;
export type NewImageHash = typeof tbl_image_hashes.$inferInsert;
