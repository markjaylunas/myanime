CREATE TABLE IF NOT EXISTS "episode_progress" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"anime_id" text NOT NULL,
	"episode_id" text NOT NULL,
	"episode_number" integer NOT NULL,
	"current_time" real NOT NULL,
	"duration_time" real NOT NULL,
	"is_finished" boolean NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "episode_progress" ADD CONSTRAINT "episode_progress_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
