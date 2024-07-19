"use server";

import { animeAPIQuery } from "@/lib/consumet-api";
import {
  animeCharacterSchema,
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
      { next: { revalidate: 3600 } }
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
      { cache: "no-store" }
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
      { next: { revalidate: 3600 } }
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
      { next: { revalidate: 3600 } }
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
      { next: { revalidate: 3600 } }
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
  page,
  perPage,
  provider,
}: {
  page?: number;
  perPage?: number;
  provider?: AnimeProviders;
}) {
  try {
    const response = await fetch(
      animeAPIQuery.meta.anilist.recentEpisodes({ page, perPage, provider }),
      { next: { revalidate: 3600 } }
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
      { next: { revalidate: 3600 } }
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

export async function fetchCharacterData({
  characterId,
}: {
  characterId: string;
}) {
  try {
    const response = await fetch(
      animeAPIQuery.meta.anilist.character({ id: characterId }),
      { next: { revalidate: 3600 } }
    );

    const data = await response.json();

    const parsed = animeCharacterSchema.safeParse(data);

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
