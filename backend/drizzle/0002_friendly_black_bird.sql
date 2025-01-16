ALTER TABLE "users" RENAME COLUMN "profile_picture" TO "profile_picture_url";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "profile_picture_url" SET DEFAULT null;