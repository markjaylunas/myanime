"use server";

import { aniwatchAPIQuery } from "@/lib/aniwatch-api";
import {
  aWAnimeInfoDataSchema,
  aWEpisodesDataSchema,
  aWEpisodeServersDataSchema,
  aWEpisodeSourceDataSchema,
  aWHomeDataSchema,
} from "@/lib/aniwatch-validations";

export async function fetchAniwatchHomeData() {
  try {
    const response = await fetch(aniwatchAPIQuery.home({}), {
      next: { revalidate: 3600 },
    });

    const data = await response.json();

    const parsed = aWHomeDataSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error.toString());
      return;
    }

    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchAWAnimeData({ animeId }: { animeId: string }) {
  try {
    const response = await fetch(aniwatchAPIQuery.info({ id: animeId }), {
      next: { revalidate: 3600 },
    });

    const data = await response.json();
    const parsed = aWAnimeInfoDataSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error.toString());
      return;
    }

    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchAWEpisodeData({ animeId }: { animeId: string }) {
  try {
    const response = await fetch(aniwatchAPIQuery.episodes({ animeId }), {
      cache: "no-store",
    });

    const data = await response.json();
    const parsed = aWEpisodesDataSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error.toString());
      return;
    }

    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchAWEpisodeSourceData({
  episodeId,
  category,
  server,
}: {
  episodeId: string;
  category?: string;
  server?: string;
}) {
  try {
    const response = await fetch(
      aniwatchAPIQuery.episodeSource({ id: episodeId, category, server }),
      {
        next: { revalidate: 3600 },
      }
    );

    const data = await response.json();
    const parsed = aWEpisodeSourceDataSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error.toString());
      return;
    }

    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchAWEpisodeServersData({
  episodeId,
}: {
  episodeId: string;
}) {
  try {
    const response = await fetch(
      aniwatchAPIQuery.episodeServers({ episodeId }),
      {
        next: { revalidate: 3600 },
      }
    );

    const data = await response.json();
    const parsed = aWEpisodeServersDataSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error.toString());
      return;
    }

    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
