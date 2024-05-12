"use server";

import { animeAPIQuery } from "@/lib/consumet-api";
import {
  animeInfoListSchema,
  animeInfoSchema,
  episodeSourceSchema,
  genreAnimeListSchema,
  genreListSchema,
  searchAnimeDataSchema,
} from "@/lib/validations";

export async function searchAnime({
  query,
  page = 1,
  signal,
}: {
  query: string;
  page?: number;
  signal?: AbortSignal;
}) {
  try {
    const response = await fetch(
      animeAPIQuery.anime.gogoanime.search({ query, page }),
      { signal }
    );

    const data = await response.json();

    const parsed = searchAnimeDataSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error);
      return;
    }
    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchAnimeInfo({ animeId }: { animeId: string }) {
  try {
    const response = await fetch(
      animeAPIQuery.anime.gogoanime.info({ animeId }),
      { next: { tags: [`info_${animeId}`] } }
    );

    const data = await response.json();

    const parsed = animeInfoSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error);
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
      animeAPIQuery.anime.gogoanime.watch({ episodeId }),
      { next: { revalidate: 3600 } }
    );

    const data = await response.json();

    const parsed = episodeSourceSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error);
      return;
    }

    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// ----------------------------

export async function fetchAnimeList({ page }: { page?: number }) {
  try {
    const response = await fetch(
      animeAPIQuery.anime.gogoanime.animeList({ page }),
      {
        next: { revalidate: 3600 },
      }
    );

    const data = await response.json();

    const parsed = animeInfoListSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error);
      return;
    }

    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchMovieList({ page }: { page?: number }) {
  try {
    const response = await fetch(
      animeAPIQuery.anime.gogoanime.movies({ page }),
      {
        next: { revalidate: 3600 },
      }
    );

    const data = await response.json();

    const parsed = animeInfoListSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error);
      return;
    }

    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchPopularList({ page }: { page?: number }) {
  try {
    const response = await fetch(
      animeAPIQuery.anime.gogoanime.popular({ page }),
      {
        next: { revalidate: 3600 },
      }
    );

    const data = await response.json();

    const parsed = animeInfoListSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error);
      return;
    }

    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchRecentEpisodeList({ page }: { page?: number }) {
  try {
    const response = await fetch(
      animeAPIQuery.anime.gogoanime.recentEpisodes({ page }),
      {
        next: { revalidate: 3600 },
      }
    );

    const data = await response.json();

    const parsed = animeInfoListSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error);
      return;
    }

    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchTopAiringList({ page }: { page?: number }) {
  try {
    const response = await fetch(
      animeAPIQuery.anime.gogoanime.topAiring({ page }),
      {
        next: { revalidate: 3600 },
      }
    );

    const data = await response.json();

    const parsed = animeInfoListSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error);
      return;
    }

    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchGenreList({ page }: { page?: number }) {
  try {
    const response = await fetch(
      animeAPIQuery.anime.gogoanime.genreList({ page }),
      {
        next: { revalidate: 3600 },
      }
    );

    const data = await response.json();

    const parsed = genreListSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error);
      return;
    }

    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchGenreAnimeList({
  genreId,
  page,
}: {
  genreId: string;
  page?: number;
}) {
  try {
    const response = await fetch(
      animeAPIQuery.anime.gogoanime.genre({ genreId, page }),
      {
        next: { revalidate: 3600 },
      }
    );

    const data = await response.json();

    const parsed = genreAnimeListSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error);
      return;
    }

    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
