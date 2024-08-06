import z from "zod";

// reusable schemas
const stringOrNull = z.string().optional().nullable();

const episodeSubDubSchema = z
  .object({
    sub: z.number().nullable().optional(),
    dub: z.number().nullable().optional(),
  })
  .nullable()
  .optional();

const characterSchema = z.object({
  id: z.string(),
  poster: z.string(),
  name: z.string(),
  cast: z.string(),
});

const aWAnimeSchema = z.object({
  id: z.string(),
  name: z.string(),
  poster: z.string(),
  jname: stringOrNull,
  description: z.string().nullable().optional(),
  otherInfo: z.array(z.string()).nullable().optional(),
  duration: z.string().nullable().optional(),
  type: z.string().nullable().optional(),
  rating: z.string().nullable().optional(),
  rank: z.number().nullable().optional(),
  episodes: episodeSubDubSchema,
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

export const aWAnimeInfoDataSchema = z.object({
  anime: z.object({
    info: z.object({
      id: z.string(),
      name: z.string(),
      poster: z.string(),
      description: z.string(),

      anilistId: z.coerce.string(),
      malId: z.coerce.string(),

      stats: z.object({
        rating: z.string(),
        quality: z.string(),
        episodes: episodeSubDubSchema,
        type: z.string(),
        duration: z.string(),
      }),

      promotionalVideos: z.array(
        z.object({
          title: stringOrNull,
          source: stringOrNull,
          thumbnail: stringOrNull,
        })
      ),

      charactersVoiceActors: z.array(
        z.object({
          character: characterSchema,
          voiceActor: characterSchema,
        })
      ),
    }),

    moreInfo: z.object({
      japanese: z.string(),
      synonyms: z.string(),
      aired: z.string(),
      premiered: z.string(),
      duration: z.string(),
      status: z.string(),
      malscore: z.string(),
      genres: z.array(z.string()),
      studios: z.string(),
      producers: z.array(z.string()),
    }),
  }),

  mostPopularAnimes: z.array(aWAnimeSchema).optional().nullable(),

  recommendedAnimes: z.array(aWAnimeSchema).optional().nullable(),

  relatedAnimes: z.array(aWAnimeSchema).optional().nullable(),

  seasons: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        title: z.string(),
        poster: z.string(),
        isCurrent: z.boolean(),
      })
    )
    .optional()
    .nullable(),
});

export const aWEpisodesDataSchema = z.object({
  totalEpisodes: z.number(),
  episodes: z.array(
    z.object({
      title: z.string(),
      episodeId: z.string(),
      number: z.number(),
      isFiller: z.boolean(),
    })
  ),
});

// type definitions

export type AWHomeDataSchema = z.infer<typeof aWHomeDataSchema>;
export type AWAnimeSchema = z.infer<typeof aWAnimeSchema>;
export type AWAnimeInfoDataSchema = z.infer<typeof aWAnimeInfoDataSchema>;
export type AWEpisodesDataSchema = z.infer<typeof aWEpisodesDataSchema>;
