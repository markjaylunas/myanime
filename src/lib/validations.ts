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
