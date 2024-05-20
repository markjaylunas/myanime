ALTER TABLE "anime_user_status" ADD COLUMN "score" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "anime_user_status" DROP COLUMN IF EXISTS "is_favorite";