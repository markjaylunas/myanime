import { Icons } from "@/components/ui/Icons";
import { z } from "zod";
import {
  animeInfoListSchema,
  animeInfoSchema,
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

export type AnimeInfoList = z.infer<typeof animeInfoListSchema>;

export type AnimeInfo = z.infer<typeof animeInfoSchema>;

export type GenreList = z.infer<typeof genreListSchema>;
