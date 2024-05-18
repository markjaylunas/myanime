"use server";

import db from "@/db";
import { episodeProgress, EpisodeProgressInsert } from "@/db/schema";
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

export async function upsertEpisodeProgress({
  data,
  pathname,
}: {
  data: EpisodeProgressInsert;
  pathname: string;
}) {
  const res = await db
    .insert(episodeProgress)
    .values(data)
    .onConflictDoUpdate({
      target: episodeProgress.id,
      set: {
        currentTime: data.currentTime,
        isFinished: data.isFinished,
        updatedAt: new Date(),
      },
    });

  if (res) revalidatePath(pathname);
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
      .select()
      .from(episodeProgress)
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
