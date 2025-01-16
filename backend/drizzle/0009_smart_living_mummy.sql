CREATE TABLE IF NOT EXISTS "scheduled_messages_count" (
	"user_id" integer,
	"room_id" integer,
	"count" integer DEFAULT 0
);
