ALTER TABLE "tbl_users" ADD COLUMN "email_verified" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "tbl_users" ADD COLUMN "image" text;--> statement-breakpoint
ALTER TABLE "tbl_users" ADD CONSTRAINT "tbl_users_email_unique" UNIQUE("email");