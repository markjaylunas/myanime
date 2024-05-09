import "server-only";

import { env } from "./env";

const gogoanimeBase = `${env.CONSUMET_API_BASE_URL}/anime/gogoanime`;

export const animeAPIQuery = {
  anime: {
    gogoanime: {
      search: ({ query, page = 1 }: { query: string; page?: number }) =>
        `${gogoanimeBase}/${query}?page=${page}`,
      info: ({ animeId }: { animeId: string }) =>
        `${gogoanimeBase}/info/${animeId}`,
      watch: ({ episodeId }: { episodeId: string }) =>
        `${gogoanimeBase}/watch/${episodeId}`,
    },
  },
};
