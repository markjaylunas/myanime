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
import { and, asc, count, desc, eq, ilike, inArray, sql } from "drizzle-orm";
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

  const animeUserStatusData = await db
    .insert(animeUserStatus)
    .values(data)
    .onConflictDoUpdate({
      target: animeUserStatus.id,
      set: {
        status: data.status,
        isLiked: data.isLiked,
        score: data.score,
        updatedAt: new Date(),
      },
    })
    .returning();

  return animeUserStatusData;
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
    score: number;
    updatedAt: Date;
  }[];
  totalCount: number;
};

export type FetchAllWatchStatusSort =
  | "animeTitle"
  | "updatedAt"
  | "status"
  | "score";

type SortOptions = {
  animeTitle: typeof anime.title;
  status: typeof animeUserStatus.status;
  score: typeof animeUserStatus.score;
  updatedAt: typeof animeUserStatus.updatedAt;
};

export async function fetchAllWatchStatus({
  userId,
  limit = DEFAULT_PAGE_LIMIT,
  page = 1,
  status = [],
  query,
  sort = "animeTitle",
  direction = "ascending",
}: {
  userId: string;
  limit?: number;
  page?: number;
  status?: WatchStatus[];
  query?: string;
  sort?: FetchAllWatchStatusSort;
  direction?: "ascending" | "descending";
}): Promise<FetchAllWatchStatusReturnType> {
  const filters = and(
    eq(animeUserStatus.userId, userId),
    status.length > 0 ? inArray(animeUserStatus.status, status) : undefined,
    query ? ilike(anime.title, `%${query}%`) : undefined
  );

  const sortOptions: SortOptions = {
    animeTitle: anime.title,
    status: animeUserStatus.status,
    score: animeUserStatus.score,
    updatedAt: animeUserStatus.updatedAt,
  };

  const orderBy = sort ? sortOptions[sort] : animeUserStatus.updatedAt;
  const directionOrder = direction === "ascending" ? asc : desc;
  const sortQuery = directionOrder(orderBy);

  const [watchListData, totalCount] = await Promise.all([
    db
      .select()
      .from(anime)
      .innerJoin(animeUserStatus, eq(anime.id, animeUserStatus.animeId))
      .where(filters)
      .limit(limit)
      .offset((page - 1) * limit)
      .orderBy(sortQuery),

    db
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
      score: data.anime_user_status.score,
      updatedAt: data.anime_user_status.updatedAt,
    }));

  return {
    watchList,
    totalCount: totalCount[0]?.count || 0,
  };
}
