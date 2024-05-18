"use server";

import db from "@/db";
import { episodeProgress, EpisodeProgressInsert } from "@/db/schema";
import { sql } from "drizzle-orm";
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
      set: { currentTime: data.currentTime, isFinished: data.isFinished },
    });

  if (res) revalidatePath(pathname);
}
