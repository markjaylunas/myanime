import z from "zod";

// Define reusable schemas
const titleSchema = z.object({
  romaji: z.string(),
  english: z.string().nullable(),
  native: z.string(),
  userPreferred: z.string().nullable().optional(),
});

const imageSchema = z.object({
  image: z.string(),
  imageHash: z.string(),
  cover: z.string().nullable().optional(),
  coverHash: z.string().nullable().optional(),
});

const nameSchema = z.object({
  first: z.string(),
  last: z.string().nullable(),
  full: z.string(),
  native: z.string().nullable(),
  userPreferred: z.string().nullable().optional(),
});

const dateSchema = z.object({
  year: z.number().nullable(),
  month: z.number().nullable(),
  day: z.number().nullable(),
});

// Use the reusable schemas to define more complex schemas
const animeSchema = z.object({
  id: z.number(),
  malId: z.number().nullable(),
  title: titleSchema,
  status: z.string(),
  episodes: z.number().nullable(),
  ...imageSchema.shape,
  rating: z.number().nullable(),
  type: z.string().nullable(),
});

const voiceActorSchema = z.object({
  id: z.number(),
  language: z.string(),
  name: nameSchema,
  ...imageSchema.shape,
});

const characterSchema = z.object({
  id: z.number(),
  role: z.string(),
  name: nameSchema,
  ...imageSchema.shape,
  voiceActors: z.array(voiceActorSchema),
});

// Define the main schema using the reusable schemas
export const animeDataSchema = z.object({
  id: z.string(),
  title: titleSchema,
  malId: z.number().nullable(),
  synonyms: z.array(z.string()),
  isLicensed: z.boolean(),
  isAdult: z.boolean(),
  countryOfOrigin: z.string(),
  ...imageSchema.shape,
  description: z.string(),
  status: z.string(),
  releaseDate: z.number().nullable(),
  nextAiringEpisode: z
    .object({
      airingTime: z.number(),
      timeUntilAiring: z.number(),
      episode: z.number(),
    })
    .nullable()
    .optional(),
  totalEpisodes: z.number().nullable(),
  currentEpisode: z.number(),
  rating: z.number().nullable(),
  duration: z.number(),
  genres: z.array(z.string()),
  studios: z.array(z.string()),
  season: z.string(),
  popularity: z.number(),
  type: z.string().nullable(),
  startDate: dateSchema,
  endDate: dateSchema,
  recommendations: z.array(animeSchema),
  characters: z.array(characterSchema),
  color: z.string().nullable(),
  relations: z.array(animeSchema),
});

// Define the search schemas using the reusable schemas
export const animeSearchSchema = z.object({
  id: z.string(),
  malId: z.number().nullable(),
  title: titleSchema,
  status: z.string(),
  ...imageSchema.shape,
  popularity: z.number(),
  totalEpisodes: z.number().nullable(),
  currentEpisode: z.number().nullable(),
  countryOfOrigin: z.string(),
  description: z.string(),
  genres: z.array(z.string()),
  rating: z.number().nullable(),
  color: z.string().nullable(),
  type: z.string().nullable(),
  releaseDate: z.number().nullable(),
});

export const animeSearchDataSchema = z.object({
  currentPage: z.number(),
  hasNextPage: z.boolean(),
  totalPages: z.number(),
  totalResults: z.number(),
  results: z.array(animeSearchSchema),
});

export const episodeSchema = z.object({
  id: z.string(),
  title: z.string(),
  image: z.string(),
  imageHash: z.string(),
  number: z.number(),
  createdAt: z.string(),
  description: z.null(),
  url: z.string().nullable().optional(),
});

export const episodeDataSchema = z.array(episodeSchema);

export const episodeSourceSchema = z.object({
  url: z.string(),
  quality: z.string(),
  isM3U8: z.boolean(),
});

export const episodeSourceDataSchema = z.object({
  headers: z.object({ Referer: z.string() }).optional().nullable(),
  sources: z.array(episodeSourceSchema).optional().nullable(),
  download: z.string().optional().nullable(),
});
// type definitions
export type TitleSchema = z.infer<typeof titleSchema>;
export type ImageSchema = z.infer<typeof imageSchema>;
export type NameSchema = z.infer<typeof nameSchema>;
export type DateSchema = z.infer<typeof dateSchema>;
export type AnimeSchema = z.infer<typeof animeSchema>;
export type VoiceActorSchema = z.infer<typeof voiceActorSchema>;
export type CharacterSchema = z.infer<typeof characterSchema>;
export type AnimeDataSchema = z.infer<typeof animeDataSchema>;
export type AnimeSearchSchema = z.infer<typeof animeSearchSchema>;
export type AnimeSearchDataSchema = z.infer<typeof animeSearchDataSchema>;
export type EpisodeSchema = z.infer<typeof episodeSchema>;
export type EpisodeDataSchema = z.infer<typeof episodeDataSchema>;
export type EpisodeSourceSchema = z.infer<typeof episodeSourceSchema>;
export type EpisodeSourceDataSchema = z.infer<typeof episodeSourceDataSchema>;
