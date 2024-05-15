import { z } from "zod";

export const searchAnimeSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string(),
  image: z.string(),
  releaseDate: z.string(),
  subOrDub: z.string(),
});

export const searchAnimeDataSchema = z.object({
  currentPage: z.string(),
  hasNextPage: z.boolean(),
  results: z.array(searchAnimeSchema),
});

export const animeInfoSchema = z.object({
  id: z.string(),
  title: z.string(),
  image: z.string(),
  url: z.string(),

  // optional
  episodeId: z.string().optional().nullable(),
  episodeNumber: z.number().optional().nullable(),
  genres: z.array(z.string()).optional().nullable(),
  totalEpisodes: z.number().optional().nullable(),
  releaseDate: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  subOrDub: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
  status: z.string().optional().nullable(),
  otherName: z.string().optional().nullable(),
  episodes: z
    .array(
      z.object({
        id: z.string(),
        number: z.number(),
        url: z.string(),
      })
    )
    .optional()
    .nullable(),
});

export const animeInfoListSchema = z.object({
  currentPage: z.string(),
  hasNextPage: z.boolean(),
  results: z.array(animeInfoSchema),
});

export const episodeSourceSchema = z.object({
  url: z.string(),
  isM3U8: z.boolean(),
  quality: z.string(),
});

export const episodeSourceDataSchema = z.object({
  headers: z.object({ Referer: z.string() }).optional().nullable(),
  sources: z.array(episodeSourceSchema).optional().nullable(),
  download: z.string().optional().nullable(),
});

export const genreSchema = z.object({
  id: z.string(),
  title: z.string(),
});

export const genreListSchema = z.array(genreSchema);

export const genreAnimeSchema = z.object({
  id: z.string(),
  title: z.string(),
  image: z.string(),
  url: z.string(),
  released: z.string().optional().nullable(),
});

export const genreAnimeListSchema = z.object({
  currentPage: z.string(),
  hasNextPage: z.boolean(),
  results: z.array(genreAnimeSchema),
});
