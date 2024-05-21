import { Icons } from "@/components/ui/Icons";
import { z } from "zod";
import {
  ASFormatArray,
  ASGenresArray,
  ASSeasonArray,
  ASSortArray,
  ASStatusArray,
  ASTypeArray,
} from "./constants";
import {
  animeInfoListSchema,
  animeInfoSchema,
  episodeSchema,
  episodeSourceDataSchema,
  episodeSourceSchema,
  genreListSchema,
  searchAnimeDataSchema,
  searchAnimeSchema,
} from "./validations";

export type NavItem = {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
};

export type NavItemWithChildren = NavItem & {
  items: NavItemWithChildren[];
};

export type MainNavItem = NavItem & {};

export type SearchAnime = z.infer<typeof searchAnimeSchema>;

export type SearchAnimeData = z.infer<typeof searchAnimeDataSchema>;

export type SearchParams = { [key: string]: string | string[] | undefined };

export type EpisodeSource = z.infer<typeof episodeSourceSchema>;

export type EpisodeSourceData = z.infer<typeof episodeSourceDataSchema>;

export type AnimeInfoList = z.infer<typeof animeInfoListSchema>;

export type AnimeInfo = z.infer<typeof animeInfoSchema>;

export type GenreList = z.infer<typeof genreListSchema>;

export type Episode = z.infer<typeof episodeSchema>;

// meta

export type AnimeProviders = "gogoanime" | "zoro";

export type OAuthProvider = "google" | "github";

export type AnimeAdvancedSearchParams = {
  query?: string;
  page?: number;
  perPage?: number;
  type?: ASType;
  genres?: ASGenres[];
  id?: string;
  format?: ASFormat;
  sort?: ASSort[];
  status?: ASStatus;
  year?: number;
  season?: ASSeason;
};

export type ASType = (typeof ASTypeArray)[number];
export type ASSeason = (typeof ASSeasonArray)[number];
export type ASFormat = (typeof ASFormatArray)[number];
export type ASSort = (typeof ASSortArray)[number];
export type ASGenres = (typeof ASGenresArray)[number];
export type ASStatus = (typeof ASStatusArray)[number];
