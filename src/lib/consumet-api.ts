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
    if (key === "perPage" && Number(value) > 40) {
      value = 40;
    }
    if (typeof value === "boolean") {
      value = value.toString();
    }
    if (Array.isArray(value)) {
      const formattedValue = JSON.stringify(value);
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

      characters: ({ id, ...params }: { id: string }) =>
        createURL(anilistBase, `characters/${id}`, params),

      genre: (params: { genres: string[]; page?: number; perPage?: number }) =>
        createURL(anilistBase, `genre`, params),
    },
  },
};
export const ASTypeArray = ["ANIME", "MANGA"] as const;

export const ASSeasonArray = ["WINTER", "SPRING", "SUMMER", "FALL"] as const;

export const ASFormatArray = [
  "TV",
  "TV_SHORT",
  "MOVIE",
  "SPECIAL",
  "OVA",
  "ONA",
  "MUSIC",
] as const;

export const ASSortArray = [
  "POPULARITY_DESC",
  "POPULARITY",
  "TRENDING_DESC",
  "TRENDING",
  "UPDATED_AT_DESC",
  "UPDATED_AT",
  "START_DATE_DESC",
  "START_DATE",
  "END_DATE_DESC",
  "END_DATE",
  "FAVOURITES_DESC",
  "FAVOURITES",
  "SCORE_DESC",
  "SCORE",
  "TITLE_ROMAJI_DESC",
  "TITLE_ROMAJI",
  "TITLE_ENGLISH_DESC",
  "TITLE_ENGLISH",
  "TITLE_NATIVE_DESC",
  "TITLE_NATIVE",
  "EPISODES_DESC",
  "EPISODES",
  "ID",
  "ID_DESC",
] as const;

export const ASGenresArray = [
  "Action",
  "Adventure",
  "Cars",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Mahou Shoujo",
  "Mecha",
  "Music",
  "Mystery",
  "Psychological",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Sports",
  "Supernatural",
  "Thriller",
] as const;

export const ASStatusArray = [
  "RELEASING",
  "NOT_YET_RELEASED",
  "FINISHED",
  "CANCELLED",
  "HIATUS",
] as const;

export type ASType = (typeof ASTypeArray)[number];
export type ASSeason = (typeof ASSeasonArray)[number];
export type ASFormat = (typeof ASFormatArray)[number];
export type ASSort = (typeof ASSortArray)[number];
export type ASGenres = (typeof ASGenresArray)[number];
export type ASStatus = (typeof ASStatusArray)[number];

export type AnimeAdvancedSearchParams = {
  query: string;
  page?: number;
  perPage?: number;
  type?: ASType;
  genres?: ASGenres[];
  id?: string;
  format?: ASFormat;
  sort?: ASSort[];
  status?: ASStatus;
  year?: number;
  season?: ASSeason;
};
