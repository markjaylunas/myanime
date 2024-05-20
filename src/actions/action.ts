"use server";

import db from "@/db";
import {
  anime,
  AnimeInsert,
  animeUserStatus,
  AnimeUserStatusInsert,
  episode,
  EpisodeInsert,
  episodeProgress,
  EpisodeProgressInsert,
  WatchStatus,
} from "@/db/schema";
import { DEFAULT_PAGE_LIMIT } from "@/lib/constants";
import { and, count, desc, eq, ilike, inArray, sql } from "drizzle-orm";
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
  const animeInsert = db.insert(anime).values(data.anime).onConflictDoNothing();

  const episodeInsert = db
    .insert(episode)
    .values(data.episode)
    .onConflictDoNothing();

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

export async function upsertWatchStatus({
  animeInsert,
  data,
}: {
  animeInsert: AnimeInsert;
  data: AnimeUserStatusInsert;
}) {
  await db.insert(anime).values(animeInsert).onConflictDoNothing();

  return await db
    .insert(animeUserStatus)
    .values(data)
    .onConflictDoUpdate({
      target: animeUserStatus.id,
      set: {
        status: data.status,
        isLiked: data.isLiked,
        isFavorite: data.isFavorite,
        updatedAt: new Date(),
      },
    })
    .returning();
}

export async function fetchWatchStatus({
  userId,
  animeId,
}: {
  userId: string;
  animeId: string;
}) {
  return db
    .select()
    .from(animeUserStatus)
    .where(
      sql`${animeUserStatus.userId} = ${userId} and ${animeUserStatus.animeId} = ${animeId}`
    )
    .limit(1);
}

export type FetchAllWatchStatusReturnType = {
  watchList: {
    id: string;
    animeId: string;
    animeTitle: string;
    animeImage: string;
    status: WatchStatus;
    isLiked: boolean;
    isFavorite: boolean;
    updatedAt: Date;
  }[];
  totalCount: number;
};

export async function fetchAllWatchStatus({
  userId,
  limit = DEFAULT_PAGE_LIMIT,
  page = 1,
  status = [],
  query,
}: {
  userId: string;
  limit?: number;
  page?: number;
  status?: WatchStatus[];
  query?: string;
}): Promise<FetchAllWatchStatusReturnType> {
  const filters = and(
    eq(animeUserStatus.userId, userId),
    status.length > 0 ? inArray(animeUserStatus.status, status) : undefined,
    query ? ilike(anime.title, `%${query}%`) : undefined
  );

  const [watchListData, totalCount] = await Promise.all([
    await db
      .select()
      .from(anime)
      .innerJoin(animeUserStatus, eq(anime.id, animeUserStatus.animeId))
      .where(filters)
      .limit(limit)
      .offset((page - 1) * limit)
      .orderBy(desc(animeUserStatus.updatedAt)),

    await db
      .select({ count: count() })
      .from(anime)
      .innerJoin(animeUserStatus, eq(anime.id, animeUserStatus.animeId))
      .where(filters),
  ]);

  const watchList: FetchAllWatchStatusReturnType["watchList"] =
    watchListData.map((data) => ({
      id: data.anime_user_status.id,
      animeId: data.anime.id,
      animeTitle: data.anime.title,
      animeImage: data.anime.image,
      status: data.anime_user_status.status,
      isLiked: data.anime_user_status.isLiked,
      isFavorite: data.anime_user_status.isFavorite,
      updatedAt: data.anime_user_status.updatedAt,
    }));

  return {
    watchList,
    totalCount: totalCount[0]?.count || 0,
  };
}
