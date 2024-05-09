import { z } from "zod";

export const animeSchema = z.object({
  id: z.string(),
  malId: z.number().optional().nullable(),
  title: z.object({
    romaji: z.string(),
    english: z.string().optional().nullable(),
    native: z.string().optional().nullable(),
  }),
  image: z.string(),
  imageHash: z.string(),
  trailer: z
    .object({
      id: z.string().optional().nullable(),
      site: z.string().optional().nullable(),
      thumbnail: z.string().optional().nullable(),
      thumbnailHash: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
  description: z.string(),
  status: z.string(),
  cover: z.string(),
  coverHash: z.string(),
  rating: z.number(),
  releaseDate: z.number(),
  color: z.string().optional().nullable(),
  genres: z.array(z.string()),
  totalEpisodes: z.number(),
  duration: z.number().optional().nullable(),
  type: z.string().optional().nullable(),
});

export const animeDataSchema = z.object({
  currentPage: z.number(),
  hasNextPage: z.boolean(),
  results: z.array(animeSchema),
});

// ----------------------------

export const animeTitleSchema = z.object({
  romaji: z.string(),
  english: z.string().optional().nullable(),
  native: z.string().optional().nullable(),
  userPreferred: z.string().optional().nullable(),
});

export const searchAnimeSchema = z.object({
  id: z.string(),
  malId: z.number(),
  title: animeTitleSchema,
  status: z.string(),
  image: z.string(),
  imageHash: z.string(),
  cover: z.string(),
  coverHash: z.string(),
  popularity: z.number(),
  totalEpisodes: z.number(),
  currentEpisode: z.number().optional(),
  countryOfOrigin: z.string(),
  description: z.string(),
  genres: z.array(z.string()),
  rating: z.number(),
  color: z.string().optional(),
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

const nextAiringEpisodeSchema = z
  .object({
    airingTime: z.number(),
    timeUntilAiring: z.number(),
    episode: z.number(),
  })
  .optional()
  .nullable();

export const animeDateSchema = z
  .object({
    year: z.number().optional().nullable(),
    month: z.number().optional().nullable(),
    day: z.number().optional().nullable(),
  })
  .optional()
  .nullable();

export const recommendationSchema = z.object({
  id: z.number(),
  malId: z.number(),
  title: animeTitleSchema,
  status: z.string(),
  episodes: z.number().optional().nullable(),
  image: z.string(),
  imageHash: z.string(),
  cover: z.string(),
  coverHash: z.string(),
  rating: z.number(),
  type: z.string(),
});

const characterNameSchema = z.object({
  first: z.string().optional().nullable(),
  last: z.string().optional().nullable(),
  full: z.string(),
  native: z.string().optional().nullable(),
  userPreferred: z.string().optional().nullable(),
});

const voiceActorSchema = z.object({
  id: z.number(),
  language: z.string(),
  name: characterNameSchema,
  image: z.string(),
  imageHash: z.string(),
});

export const characterSchema = z.object({
  id: z.number(),
  role: z.string(),
  name: characterNameSchema,
  image: z.string(),
  imageHash: z.string(),
  voiceActors: z.array(voiceActorSchema),
});

export const relationSchema = z.object({
  id: z.number(),
  malId: z.number().optional().nullable(),
  relationType: z.string(),
  title: animeTitleSchema,
  status: z.string(),
  episodes: z.number().optional().nullable(),
  image: z.string(),
  imageHash: z.string(),
  cover: z.string(),
  coverHash: z.string(),
  rating: z.number().optional().nullable(),
  type: z.string().optional().nullable(),
});

export const animeInfoSchema = z.object({
  id: z.string(),
  title: animeTitleSchema,
  malId: z.number(),
  synonyms: z.array(z.string()),
  isLicensed: z.boolean(),
  isAdult: z.boolean(),
  countryOfOrigin: z.string(),
  image: z.string(),
  imageHash: z.string(),
  cover: z.string(),
  coverHash: z.string(),
  description: z.string(),
  status: z.string(),
  releaseDate: z.number(),
  nextAiringEpisode: nextAiringEpisodeSchema,
  totalEpisodes: z.number(),
  currentEpisode: z.number(),
  rating: z.number(),
  duration: z.number(),
  genres: z.array(z.string()),
  studios: z.array(z.string()),
  season: z.string(),
  popularity: z.number(),
  type: z.string(),
  startDate: animeDateSchema,
  endDate: animeDateSchema,
  recommendations: z.array(recommendationSchema).optional(),
  characters: z.array(characterSchema),
  color: z.string(),
  relations: z.array(relationSchema),
});
