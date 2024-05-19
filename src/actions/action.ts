"use server";

import db from "@/db";
import {
  anime,
  AnimeInsert,
  episode,
  EpisodeInsert,
  episodeProgress,
  EpisodeProgressInsert,
} from "@/db/schema";
import { DEFAULT_PAGE_LIMIT } from "@/lib/constants";
import { and, count, desc, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function fetchEpisodeProgress({
  userId,
  animeId,
  episodeId,
}: {
  userId: string;
  animeId: string;
  episodeId: string;
}) {
  return db
    .select()
    .from(episodeProgress)
    .where(
      sql`${episodeProgress.userId} = ${userId} and ${episodeProgress.animeId} = ${animeId} and ${episodeProgress.episodeId} = ${episodeId}`
    )
    .limit(1);
}

export type UpsertEpisodeProgressData = {
  anime: AnimeInsert;
  episode: EpisodeInsert;
  episodeProgress: EpisodeProgressInsert;
};
export async function upsertEpisodeProgress({
  data,
  pathname,
}: {
  data: UpsertEpisodeProgressData;
  pathname: string;
}) {
  const animeInsert = db
    .insert(anime)
    .values(data.anime)
    .onConflictDoUpdate({
      target: anime.id,
      set: {
        image: data.anime.image,
        updatedAt: new Date(),
      },
    });

  const episodeInsert = db
    .insert(episode)
    .values(data.episode)
    .onConflictDoUpdate({
      target: episode.id,
      set: {
        image: data.anime.image,
        updatedAt: new Date(),
      },
    });

  const episodeProgressInsert = db
    .insert(episodeProgress)
    .values(data.episodeProgress)
    .onConflictDoUpdate({
      target: episodeProgress.id,
      set: {
        currentTime: data.episodeProgress.currentTime,
        isFinished: data.episodeProgress.isFinished,
        updatedAt: new Date(),
      },
    });

  const [_, __, episodeProgressData] = await Promise.all([
    animeInsert,
    episodeInsert,
    episodeProgressInsert,
  ]);

  if (episodeProgressData) revalidatePath(pathname);
}

export async function fetchAllEpisodeProgress({
  userId,
  limit = DEFAULT_PAGE_LIMIT,
  page = 1,
  filter = "all",
}: {
  userId: string;
  limit?: number;
  page?: number;
  filter?: "finished" | "unfinished" | "all";
}) {
  const filters = and(
    eq(episodeProgress.userId, userId),
    filter === "finished" ? eq(episodeProgress.isFinished, true) : undefined,
    filter === "unfinished" ? eq(episodeProgress.isFinished, false) : undefined
  );

  const [episodes, totalCount] = await Promise.all([
    await db
      .select({
        id: episodeProgress.id,
        animeId: anime.id,
        animeTitle: anime.title,
        animeImage: anime.image,
        episodeId: episode.id,
        episodeTitle: episode.title,
        episodeNumber: episode.number,
        episodeImage: episode.image,
        episodeProgressUpdatedAt: episodeProgress.updatedAt,
        currentTime: episodeProgress.currentTime,
        durationTime: episode.durationTime,
      })
      .from(episodeProgress)
      .leftJoin(anime, eq(anime.id, episodeProgress.animeId))
      .leftJoin(episode, eq(episode.id, episodeProgress.episodeId))
      .where(filters)
      .limit(limit)
      .offset((page - 1) * limit)
      .orderBy(desc(episodeProgress.updatedAt)),

    await db.select({ count: count() }).from(episodeProgress).where(filters),
  ]);

  return {
    episodes,
    totalCount: totalCount[0]?.count || 0,
  };
}
