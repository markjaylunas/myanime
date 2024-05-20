import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  real,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import type { AdapterAccountType } from "next-auth/adapters";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

const updatedAt = timestamp("updated_at").defaultNow().notNull();
const createdAt = timestamp("created_at").defaultNow().notNull();
const userIdRef = text("user_id")
  .references(() => users.id)
  .notNull();
const animeIdRef = text("anime_id")
  .references(() => anime.id)
  .notNull();

export const anime = pgTable("anime", {
  id: text("id").primaryKey().notNull(),
  title: text("title").notNull(),
  image: text("image").notNull(),
  cover: text("cover").notNull(),
  updatedAt,
  createdAt,
});

export const episode = pgTable("episode", {
  id: text("id").primaryKey().notNull(),
  animeId: animeIdRef,
  number: integer("number").notNull(),
  title: text("title"),
  image: text("image"),
  durationTime: real("duration_time").notNull(),
  updatedAt,
  createdAt,
});

export const episodeProgress = pgTable("episode_progress", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: userIdRef,
  animeId: animeIdRef,
  episodeId: text("episode_id")
    .references(() => episode.id)
    .notNull(),
  currentTime: real("current_time").notNull(),
  isFinished: boolean("is_finished").notNull(),
  updatedAt,
  createdAt,
});

export const watchStatus = pgEnum("watch_status", [
  "WATCHING",
  "COMPLETED",
  "ON_HOLD",
  "DROPPED",
  "PLAN_TO_WATCH",
]);

export const animeUserStatus = pgTable("anime_user_status", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: userIdRef,
  animeId: animeIdRef,
  status: watchStatus("status").default("WATCHING").notNull(),
  isLiked: boolean("is_liked").default(false).notNull(),
  isFavorite: boolean("is_favorite").default(false).notNull(),
  updatedAt,
  createdAt,
});

export type AnimeInsert = typeof anime.$inferInsert;
export type Anime = typeof anime.$inferSelect;

export type EpisodeInsert = typeof episode.$inferInsert;
export type Episode = typeof episode.$inferSelect;

export type EpisodeProgressInsert = typeof episodeProgress.$inferInsert;
export type EpisodeProgress = typeof episodeProgress.$inferSelect;

export type AnimeUserStatusInsert = typeof animeUserStatus.$inferInsert;
export type AnimeUserStatus = typeof animeUserStatus.$inferSelect;

export type WatchStatus = AnimeUserStatus["status"];
