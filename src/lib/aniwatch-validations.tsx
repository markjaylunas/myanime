import z from "zod";

// reusable schemas
const aWAnimeSchema = z.object({
  id: z.string(),
  name: z.string(),
  poster: z.string(),
  jname: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  otherInfo: z.array(z.string()).nullable().optional(),
  duration: z.string().nullable().optional(),
  type: z.string().nullable().optional(),
  rating: z.string().nullable().optional(),
  rank: z.number().nullable().optional(),
  episodes: z
    .object({
      sub: z.number().nullable().optional(),
      dub: z.number().nullable().optional(),
    })
    .nullable()
    .optional(),
});

// aniwatch schemas
export const genreSchema = z.string();

export const top10AnimesSchema = z.object({
  today: z.array(aWAnimeSchema),
  month: z.array(aWAnimeSchema),
  week: z.array(aWAnimeSchema),
});

export const aWHomeDataSchema = z.object({
  genres: z.array(genreSchema),
  latestEpisodeAnimes: z.array(aWAnimeSchema),
  spotlightAnimes: z.array(aWAnimeSchema),
  top10Animes: top10AnimesSchema,
  topAiringAnimes: z.array(aWAnimeSchema),
  topUpcomingAnimes: z.array(aWAnimeSchema),
  trendingAnimes: z.array(aWAnimeSchema),
  mostPopularAnimes: z.array(aWAnimeSchema),
  mostFavoriteAnimes: z.array(aWAnimeSchema),
  latestCompletedAnimes: z.array(aWAnimeSchema),
});

// type definitions

export type AWHomeDataSchema = z.infer<typeof aWHomeDataSchema>;
export type AWAnimeSchema = z.infer<typeof aWAnimeSchema>;
