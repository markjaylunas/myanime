import { env } from "./env";
import { AnimeProviders } from "./types";

const anilistBase = `${env.CONSUMET_API_BASE_URL}/meta/anilist`;
const gogoanimeBase = `${env.CONSUMET_API_BASE_URL}/anime/gogoanime`;
function createURL(
  base: string,
  path: string,
  params: Record<string, string | number | string[] | boolean>
) {
  const url = new URL(`${base}/${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === "boolean") {
      value = value.toString();
    }
    if (Array.isArray(value)) {
      value.forEach((val) => url.searchParams.append(key, String(val)));
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
      search: (params: {
        query: string;
        page?: number;
        perPage?: number;
        type?: string;
        genres?: string | string[];
        id?: string;
        format?: string;
        sort?: string | string[];
        status?: string;
        year?: number;
        season?: string;
      }) => createURL(anilistBase, `advanced-search`, params),

      data: ({ id }: { id: string }) =>
        createURL(anilistBase, `data/${id}`, {}),

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
    },
  },
};
