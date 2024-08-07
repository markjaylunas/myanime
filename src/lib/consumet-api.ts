import { env } from "./env";
import { AnimeAdvancedSearchParams, AnimeProviders } from "./types";

const anilistBase = `${env.CONSUMET_API_BASE_URL}/meta/anilist`;
const gogoanimeBase = `${env.CONSUMET_API_BASE_URL}/anime/gogoanime`;

function createURL(
  base: string,
  path: string,
  params: Record<string, string | number | string[] | boolean | undefined>
) {
  const url = new URL(`${base}/${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) {
      return;
    }
    if (key === "perPage" && Number(value) > 40) {
      value = 40;
    }
    if (typeof value === "boolean") {
      value = value.toString();
    }
    if (Array.isArray(value)) {
      const formattedValue = `[${value.map((v) => `"${value}"`).join(",")}]`;
      url.searchParams.append(key, formattedValue);
    } else {
      url.searchParams.append(key, String(value));
    }
  });
  return url.toString();
}

export const animeAPIQuery = {
  anime: {
    gogoanime: {
      search: ({ query, ...params }: { query: string; page?: number }) =>
        createURL(gogoanimeBase, query, params),
      info: ({ animeId, ...params }: { animeId: string }) =>
        createURL(gogoanimeBase, `info/${animeId}`, params),
      watch: ({ episodeId, ...params }: { episodeId: string }) =>
        createURL(gogoanimeBase, `watch/${episodeId}`, params),

      genreList: (params: { page?: number }) =>
        createURL(gogoanimeBase, "genre/list", params),
      genre: ({ genreId, ...params }: { genreId: string; page?: number }) =>
        createURL(gogoanimeBase, `genre/${genreId}`, params),

      recentEpisodes: (params: { page?: number }) =>
        createURL(gogoanimeBase, "recent-episodes", params),
      popular: (params: { page?: number }) =>
        createURL(gogoanimeBase, "popular", params),
      topAiring: (params: { page?: number }) =>
        createURL(gogoanimeBase, "top-airing", params),
      movies: (params: { page?: number }) =>
        createURL(gogoanimeBase, "movies", params),
      animeList: (params: { page?: number }) =>
        createURL(gogoanimeBase, "anime-list", params),
    },
  },
  meta: {
    anilist: {
      search: (params: AnimeAdvancedSearchParams) =>
        createURL(anilistBase, `advanced-search`, params),

      data: ({ id }: { id: string }) =>
        createURL(anilistBase, `data/${id}`, {}),

      info: ({ id }: { id: string }) =>
        createURL(anilistBase, `info/${id}`, {}),

      episodes: ({
        id,
        ...params
      }: {
        id: string;
        provider?: AnimeProviders;
        fetchFiller?: string | boolean;
        dub?: string | boolean;
        locale?: string;
      }) => createURL(anilistBase, `episodes/${id}`, params),

      watch: ({
        episodeId,
        ...params
      }: {
        episodeId: string;
        provider: AnimeProviders;
      }) => createURL(anilistBase, `watch/${episodeId}`, params),

      trending: (params: { page?: number; perPage?: number }) =>
        createURL(anilistBase, `trending`, params),

      popular: (params: { page?: number; perPage?: number }) =>
        createURL(anilistBase, `popular`, params),

      airingSchedule: (params: { page?: number; perPage?: number }) =>
        createURL(anilistBase, `airing-schedule`, params),

      recentEpisodes: (params: {
        page?: number;
        perPage?: number;
        provider?: AnimeProviders;
      }) => createURL(anilistBase, `recent-episodes`, params),

      character: ({ id, ...params }: { id: string }) =>
        createURL(anilistBase, `character/${id}`, params),

      genre: (params: { genres: string[]; page?: number; perPage?: number }) =>
        createURL(anilistBase, `genre`, params),
    },
  },
};
