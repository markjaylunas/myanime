import { env } from "./env";

const gogoanimeBase = `${env.CONSUMET_API_BASE_URL}/anime/gogoanime`;

function createGogoanimeURL(
  path: string,
  params: Record<string, string | number>
) {
  const url = new URL(`${gogoanimeBase}/${path}`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, String(value))
  );
  return url.toString();
}

export const animeAPIQuery = {
  anime: {
    gogoanime: {
      search: ({ query, ...params }: { query: string; page?: number }) =>
        createGogoanimeURL(query, params),
      info: ({ animeId, ...params }: { animeId: string }) =>
        createGogoanimeURL(`info/${animeId}`, params),
      watch: ({ episodeId, ...params }: { episodeId: string }) =>
        createGogoanimeURL(`watch/${episodeId}`, params),

      genreList: (params: { page?: number }) =>
        createGogoanimeURL("genre/list", params),
      genre: ({ genreId, ...params }: { genreId: string; page?: number }) =>
        createGogoanimeURL(`genre/${genreId}`, params),

      recentEpisodes: (params: { page?: number }) =>
        createGogoanimeURL("recent-episodes", params),
      popular: (params: { page?: number }) =>
        createGogoanimeURL("popular", params),
      topAiring: (params: { page?: number }) =>
        createGogoanimeURL("top-airing", params),
      movies: (params: { page?: number }) =>
        createGogoanimeURL("movies", params),
      animeList: (params: { page?: number }) =>
        createGogoanimeURL("anime-list", params),
    },
  },
};
