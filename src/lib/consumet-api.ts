import "server-only";

import { env } from "./env";

const gogoanimeBase = `${env.CONSUMET_API_BASE_URL}/anime/gogoanime`;

export const animeAPIQuery = {
  anime: {
    gogoanime: {
      search: ({ query }: { query: string }) => `${gogoanimeBase}/${query}`,
      info: ({ animeId }: { animeId: string }) =>
        `${gogoanimeBase}/info/${animeId}`,
      watch: ({ episode }: { episode: string }) =>
        `${gogoanimeBase}/watch/${episode}`,
    },
  },
};
