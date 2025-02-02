CREATE TABLE "tbl_image_hashes" (
	"id" uuid PRIMARY KEY NOT NULL,
	"image_hash" text NOT NULL,
	"image_url" text NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tbl_recycling_logs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"item_type" text NOT NULL,
	"quantity" integer DEFAULT 6,
	"image_hash_id" uuid NOT NULL,
	"exif_timestamp" timestamp NOT NULL,
	"exif_gps_location" text NOT NULL,
	"status" text DEFAULT 'Pending' NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tbl_rewards" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"points_required" integer NOT NULL,
	"partner" text NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tbl_user_fingerprint_logs" (
	"visitor_id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"device_info" text NOT NULL,
	"ip_address" text NOT NULL,
	"submission_count" integer DEFAULT 0 NOT NULL,
	"last_submission_at" timestamp NOT NULL,
	"flagged" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tbl_users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"visitor_id" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"points" integer DEFAULT 0 NOT NULL,
	"location" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "tbl_users_visitor_id_unique" UNIQUE("visitor_id")
);
--> statement-breakpoint
ALTER TABLE "tbl_recycling_logs" ADD CONSTRAINT "tbl_recycling_logs_user_id_tbl_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."tbl_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tbl_recycling_logs" ADD CONSTRAINT "tbl_recycling_logs_image_hash_id_tbl_image_hashes_id_fk" FOREIGN KEY ("image_hash_id") REFERENCES "public"."tbl_image_hashes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tbl_user_fingerprint_logs" ADD CONSTRAINT "tbl_user_fingerprint_logs_user_id_tbl_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."tbl_users"("id") ON DELETE cascade ON UPDATE no action;