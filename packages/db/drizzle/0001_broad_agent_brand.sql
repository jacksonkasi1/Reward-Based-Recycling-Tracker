ALTER TABLE "tbl_user_fingerprint_logs" ALTER COLUMN "device_info" SET DATA TYPE json;--> statement-breakpoint
ALTER TABLE "tbl_user_fingerprint_logs" ADD COLUMN "ip_location" json;