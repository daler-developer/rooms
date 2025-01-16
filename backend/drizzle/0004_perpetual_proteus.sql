CREATE TABLE IF NOT EXISTS "message_views" (
	"user_id" integer,
	"message_id" integer
);
--> statement-breakpoint
ALTER TABLE "messages" ADD COLUMN "views_count" integer DEFAULT 0;