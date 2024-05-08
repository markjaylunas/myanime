import { z } from "zod";

export const animeSchema = z.object({
  id: z.string(),
  title: z.string(),
  image: z.string(),
  url: z.string(),
  genres: z.array(z.string()).optional(),
  episodeId: z.string().optional(),
  episodeNumber: z.number().optional(),
  releaseDate: z.string().optional(),
  released: z.string().optional(),
  subOrDub: z.string().optional(),
});

export const animeDataSchema = z.object({
  currentPage: z.number(),
  hasNextPage: z.boolean(),
  results: z.array(animeSchema),
});
