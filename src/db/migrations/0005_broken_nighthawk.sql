DO $$ BEGIN
 CREATE TYPE "public"."watch_status" AS ENUM('WATCHING', 'COMPLETED', 'ON_HOLD', 'DROPPED', 'PLAN_TO_WATCH');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "anime" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"image" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "anime_user_status" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"anime_id" text NOT NULL,
	"watch_status" "watch_status" DEFAULT 'WATCHING' NOT NULL,
	"is_liked" boolean DEFAULT false NOT NULL,
	"is_favorite" boolean DEFAULT false NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "episode" (
	"id" text PRIMARY KEY NOT NULL,
	"anime_id" text NOT NULL,
	"number" integer NOT NULL,
	"title" text,
	"image" text,
	"duration_time" real NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "anime_user_status" ADD CONSTRAINT "anime_user_status_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "anime_user_status" ADD CONSTRAINT "anime_user_status_anime_id_anime_id_fk" FOREIGN KEY ("anime_id") REFERENCES "public"."anime"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "episode" ADD CONSTRAINT "episode_anime_id_anime_id_fk" FOREIGN KEY ("anime_id") REFERENCES "public"."anime"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "episode_progress" ADD CONSTRAINT "episode_progress_anime_id_anime_id_fk" FOREIGN KEY ("anime_id") REFERENCES "public"."anime"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "episode_progress" ADD CONSTRAINT "episode_progress_episode_id_episode_id_fk" FOREIGN KEY ("episode_id") REFERENCES "public"."episode"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "episode_progress" DROP COLUMN IF EXISTS "anime_title";--> statement-breakpoint
ALTER TABLE "episode_progress" DROP COLUMN IF EXISTS "episode_number";--> statement-breakpoint
ALTER TABLE "episode_progress" DROP COLUMN IF EXISTS "episode_title";--> statement-breakpoint
ALTER TABLE "episode_progress" DROP COLUMN IF EXISTS "episode_image";--> statement-breakpoint
ALTER TABLE "episode_progress" DROP COLUMN IF EXISTS "duration_time";