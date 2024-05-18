CREATE TABLE IF NOT EXISTS "episode_progress" (
	"id" uuid DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL,
	"anime_id" text NOT NULL,
	"episode_id" text NOT NULL,
	"episode_number" integer NOT NULL,
	"current_time" real NOT NULL,
	"duration_time" real NOT NULL,
	"is_finished" boolean NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
