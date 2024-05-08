import { z } from "zod";

export const animeTitleSchema = z.object({
  romaji: z.string(),
  english: z.string().optional(),
  native: z.string().optional(),
  userPreferred: z.string().optional(),
});

export const animeSchema = z.object({
  id: z.string(),
  malId: z.number(),
  title: z.object({
    romaji: z.string(),
    english: z.string(),
    native: z.string(),
    userPreferred: z.string(),
  }),
  image: z.string(),
  imageHash: z.string(),
  trailer: z.object({
    thumbnailHash: z.string(),
  }),
  description: z.string(),
  status: z.string(),
  cover: z.string(),
  coverHash: z.string(),
  rating: z.number(),
  releaseDate: z.number(),
  color: z.string().nullable(),
  genres: z.array(z.string()),
  totalEpisodes: z.number(),
  duration: z.number(),
  type: z.string(),
});

export const animeDataSchema = z.object({
  currentPage: z.number(),
  hasNextPage: z.boolean(),
  results: z.array(animeSchema),
});

export const searchAnimeSchema = z.object({
  id: z.string(),
  malId: z.number(),
  title: z.object({
    romaji: z.string(),
    english: z.string(),
    native: z.string(),
    userPreferred: z.string(),
  }),
  status: z.string(),
  image: z.string(),
  imageHash: z.string(),
  cover: z.string(),
  coverHash: z.string(),
  popularity: z.number(),
  totalEpisodes: z.number(),
  currentEpisode: z.number().nullable(),
  countryOfOrigin: z.string(),
  description: z.string(),
  genres: z.array(z.string()),
  rating: z.number(),
  color: z.string().nullable(),
  type: z.string(),
  releaseDate: z.number(),
});

export const searchAnimeDataSchema = z.object({
  currentPage: z.number(),
  hasNextPage: z.boolean(),
  totalPages: z.number(),
  totalResults: z.number(),
  results: z.array(searchAnimeSchema),
});

export const animeInfoSchema = z.object({
  id: z.string(),
  title: z.object({
    romaji: z.string(),
    english: z.string(),
    native: z.string(),
  }),
  malId: z.number(),
  synonyms: z.array(z.string()),
  isLicensed: z.boolean(),
  isAdult: z.boolean(),
  countryOfOrigin: z.string(),
  trailer: z.object({
    id: z.string(),
    site: z.string(),
    thumbnail: z.string(),
    thumbnailHash: z.string(),
  }),
  image: z.string(),
  imageHash: z.string(),
  popularity: z.number(),
  color: z.string(),
  cover: z.string(),
  coverHash: z.string(),
  description: z.string(),
  status: z.string(),
  releaseDate: z.number(),
  startDate: z.object({ year: z.number(), month: z.number(), day: z.number() }),
  endDate: z.object({ year: z.number(), month: z.number(), day: z.number() }),
  totalEpisodes: z.number(),
  currentEpisode: z.number(),
  rating: z.number(),
  duration: z.number(),
  genres: z.array(z.string()),
  season: z.string(),
  studios: z.array(z.string()),
  subOrDub: z.string(),
  type: z.string(),
  recommendations: z.array(
    z.object({
      id: z.number(),
      malId: z.number(),
      title: z.object({
        romaji: z.string(),
        english: z.string(),
        native: z.string(),
        userPreferred: z.string(),
      }),
      status: z.string(),
      episodes: z.number(),
      image: z.string(),
      imageHash: z.string(),
      cover: z.string(),
      coverHash: z.string(),
      rating: z.number(),
      type: z.string(),
    })
  ),
  characters: z.array(
    z.union([
      z.object({
        id: z.number(),
        role: z.string(),
        name: z.object({
          first: z.string(),
          last: z.string(),
          full: z.string(),
          native: z.string(),
          userPreferred: z.string(),
        }),
        image: z.string(),
        imageHash: z.string(),
        voiceActors: z.array(
          z.union([
            z.object({
              id: z.number(),
              language: z.string(),
              name: z.object({
                first: z.string(),
                last: z.string(),
                full: z.string(),
                native: z.string(),
                userPreferred: z.string(),
              }),
              image: z.string(),
              imageHash: z.string(),
            }),
            z.object({
              id: z.number(),
              language: z.string(),
              name: z.object({
                first: z.string(),
                last: z.string(),
                full: z.string(),
                native: z.null(),
                userPreferred: z.string(),
              }),
              image: z.string(),
              imageHash: z.string(),
            }),
          ])
        ),
      }),
      z.object({
        id: z.number(),
        role: z.string(),
        name: z.object({
          first: z.string(),
          last: z.null(),
          full: z.string(),
          native: z.string(),
          userPreferred: z.string(),
        }),
        image: z.string(),
        imageHash: z.string(),
        voiceActors: z.array(
          z.union([
            z.object({
              id: z.number(),
              language: z.string(),
              name: z.object({
                first: z.string(),
                last: z.string(),
                full: z.string(),
                native: z.string(),
                userPreferred: z.string(),
              }),
              image: z.string(),
              imageHash: z.string(),
            }),
            z.object({
              id: z.number(),
              language: z.string(),
              name: z.object({
                first: z.string(),
                last: z.string(),
                full: z.string(),
                native: z.null(),
                userPreferred: z.string(),
              }),
              image: z.string(),
              imageHash: z.string(),
            }),
          ])
        ),
      }),
      z.object({
        id: z.number(),
        role: z.string(),
        name: z.object({
          first: z.string(),
          last: z.null(),
          full: z.string(),
          native: z.string(),
          userPreferred: z.string(),
        }),
        image: z.string(),
        imageHash: z.string(),
        voiceActors: z.array(z.unknown()),
      }),
    ])
  ),
  relations: z.array(
    z.union([
      z.object({
        id: z.number(),
        relationType: z.string(),
        malId: z.number(),
        title: z.object({
          romaji: z.string(),
          english: z.string(),
          native: z.string(),
          userPreferred: z.string(),
        }),
        status: z.string(),
        episodes: z.number(),
        image: z.string(),
        imageHash: z.string(),
        color: z.string(),
        type: z.string(),
        cover: z.string(),
        coverHash: z.string(),
        rating: z.number(),
      }),
      z.object({
        id: z.number(),
        relationType: z.string(),
        malId: z.number(),
        title: z.object({
          romaji: z.string(),
          english: z.string(),
          native: z.string(),
          userPreferred: z.string(),
        }),
        status: z.string(),
        episodes: z.null(),
        image: z.string(),
        imageHash: z.string(),
        color: z.string(),
        type: z.string(),
        cover: z.string(),
        coverHash: z.string(),
        rating: z.number(),
      }),
      z.object({
        id: z.number(),
        relationType: z.string(),
        malId: z.null(),
        title: z.object({
          romaji: z.string(),
          english: z.null(),
          native: z.string(),
          userPreferred: z.string(),
        }),
        status: z.string(),
        episodes: z.number(),
        image: z.string(),
        imageHash: z.string(),
        color: z.string(),
        type: z.string(),
        cover: z.string(),
        coverHash: z.string(),
        rating: z.number(),
      }),
      z.object({
        id: z.number(),
        relationType: z.string(),
        malId: z.number(),
        title: z.object({
          romaji: z.string(),
          english: z.null(),
          native: z.string(),
          userPreferred: z.string(),
        }),
        status: z.string(),
        episodes: z.number(),
        image: z.string(),
        imageHash: z.string(),
        color: z.string(),
        type: z.string(),
        cover: z.string(),
        coverHash: z.string(),
        rating: z.number(),
      }),
    ])
  ),
  mappings: z.array(
    z.object({
      id: z.string(),
      providerId: z.string(),
      similarity: z.number(),
      providerType: z.string(),
    })
  ),
  artwork: z.array(
    z.object({ img: z.string(), type: z.string(), providerId: z.string() })
  ),
  episodes: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.null(),
      number: z.number(),
      image: z.string(),
      imageHash: z.string(),
      airDate: z.null(),
    })
  ),
});
