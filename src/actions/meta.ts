"use server";

import { animeAPIQuery } from "@/lib/consumet-api";
import {
  animeDataSchema,
  animeSearchDataSchema,
  animeSortedDataSchema,
  episodeDataSchema,
  episodeSourceDataSchema,
} from "@/lib/meta-validations";
import { AnimeAdvancedSearchParams, AnimeProviders } from "@/lib/types";

export async function searchAnime(params: AnimeAdvancedSearchParams) {
  try {
    const response = await fetch(animeAPIQuery.meta.anilist.search(params));

    const data = await response.json();

    const parsed = animeSearchDataSchema.safeParse(data);

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

export async function fetchAnimeData({ animeId }: { animeId: string }) {
  try {
    const response = await fetch(
      animeAPIQuery.meta.anilist.data({ id: animeId }),
      { next: { tags: [`info_${animeId}`], revalidate: 3600 } }
    );

    const data = await response.json();

    const parsed = animeDataSchema.safeParse(data);

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

export async function fetchEpisodeData({
  animeId,
  provider,
}: {
  animeId: string;
  provider?: AnimeProviders;
}) {
  try {
    const response = await fetch(
      animeAPIQuery.meta.anilist.episodes({
        id: animeId,
        provider,
      }),
      { next: { tags: [`episodes_${animeId}`], revalidate: 3600 } }
    );

    const data = await response.json();

    const parsed = episodeDataSchema.safeParse(data);

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

export async function fetchAnimeEpisodeSource({
  episodeId,
}: {
  episodeId: string;
}) {
  try {
    const response = await fetch(
      animeAPIQuery.meta.anilist.watch({ episodeId, provider: "gogoanime" }),
      { next: { revalidate: 3600 } }
    );

    const data = await response.json();

    const parsed = episodeSourceDataSchema.safeParse(data);

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

export async function fetchPopularAnimeData({
  page = 1,
  perPage = 20,
}: {
  page?: number;
  perPage?: number;
}) {
  try {
    const response = await fetch(
      animeAPIQuery.meta.anilist.popular({ page, perPage }),
      { next: { tags: ["anime-sorted-data-schema_popular"], revalidate: 3600 } }
    );

    const data = await response.json();

    const parsed = animeSortedDataSchema.safeParse(data);

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

export async function fetchTrendingAnimeData({
  page = 1,
  perPage = 20,
}: {
  page?: number;
  perPage?: number;
}) {
  try {
    const response = await fetch(
      animeAPIQuery.meta.anilist.trending({ page, perPage }),
      {
        next: { tags: ["anime-sorted-data-schema_trending"], revalidate: 3600 },
      }
    );

    const data = await response.json();

    const parsed = animeSortedDataSchema.safeParse(data);

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

export async function fetchAiringScheduleAnimeData({
  page = 1,
  perPage = 20,
}: {
  page?: number;
  perPage?: number;
}) {
  try {
    const response = await fetch(
      animeAPIQuery.meta.anilist.airingSchedule({ page, perPage }),
      {
        next: {
          tags: ["anime-sorted-data-schema_airing-schedule"],
          revalidate: 3600,
        },
      }
    );

    const data = await response.json();

    const parsed = animeSortedDataSchema.safeParse(data);

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

export async function fetchRecentEpisodesAnimeData({
  page = 1,
  perPage = 20,
  provider,
}: {
  page?: number;
  perPage?: number;
  provider?: AnimeProviders;
}) {
  try {
    const response = await fetch(
      animeAPIQuery.meta.anilist.recentEpisodes({ page, perPage, provider }),
      {
        next: {
          tags: ["anime-sorted-data-schema_recent-episodes"],
          revalidate: 3600,
        },
      }
    );

    const data = await response.json();

    const parsed = animeSortedDataSchema.safeParse(data);

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

export async function fetchGenreAnimeData({
  genres,
  page = 1,
  perPage = 20,
}: {
  genres: string[];
  page?: number;
  perPage?: number;
}) {
  try {
    const response = await fetch(
      animeAPIQuery.meta.anilist.genre({ genres, page, perPage }),
      {
        next: {
          tags: ["anime-sorted-data-schema_recent-episodes"],
          revalidate: 3600,
        },
      }
    );

    const data = await response.json();

    const parsed = animeSortedDataSchema.safeParse(data);

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
