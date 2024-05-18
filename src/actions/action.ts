"use server";

import db from "@/db";
import { episodeProgress, EpisodeProgressInsert } from "@/db/schema";
import { DEFAULT_PAGE_LIMIT } from "@/lib/constants";
import { and, desc, eq, sql } from "drizzle-orm";
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
  offset = 0,
  filter = "all",
}: {
  userId: string;
  limit?: number;
  offset?: number;
  filter?: "finished" | "unfinished" | "all";
}) {
  return db
    .select()
    .from(episodeProgress)
    .where(
      and(
        eq(episodeProgress.userId, userId),

        filter === "finished"
          ? eq(episodeProgress.isFinished, true)
          : undefined,

        filter === "unfinished"
          ? eq(episodeProgress.isFinished, false)
          : undefined
      )
    )
    .limit(limit)
    .offset(offset)
    .orderBy(desc(episodeProgress.updatedAt));
}
