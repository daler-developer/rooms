CREATE TABLE IF NOT EXISTS "message_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" varchar(1000),
	"message_id" integer,
	"created_at" timestamp DEFAULT now()
);
