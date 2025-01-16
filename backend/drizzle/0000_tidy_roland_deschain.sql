CREATE TABLE IF NOT EXISTS "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" varchar(1000),
	"room_id" integer,
	"sender_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rooms" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"creator_id" integer,
	"created_at" timestamp DEFAULT now(),
	"participants_count" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(256),
	"password" varchar(256),
	"is_blocked" boolean DEFAULT false,
	"is_admin" boolean DEFAULT false,
	"profile_picture" text,
	"invitations_count" integer DEFAULT 0,
	"is_online" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_to_rooms" (
	"user_id" integer NOT NULL,
	"room_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_to_rooms_user_id_room_id_pk" PRIMARY KEY("user_id","room_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_to_rooms_invite" (
	"user_id" integer NOT NULL,
	"roomId" integer NOT NULL,
	"inviter_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_to_rooms_invite_user_id_roomId_pk" PRIMARY KEY("user_id","roomId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_rooms" ADD CONSTRAINT "users_to_rooms_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_rooms" ADD CONSTRAINT "users_to_rooms_room_id_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_rooms_invite" ADD CONSTRAINT "users_to_rooms_invite_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_rooms_invite" ADD CONSTRAINT "users_to_rooms_invite_roomId_rooms_id_fk" FOREIGN KEY ("roomId") REFERENCES "public"."rooms"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
