import { Icons } from "@/components/ui/Icons";
import { z } from "zod";
import {
  animeDataSchema,
  animeSchema,
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

export type Anime = z.infer<typeof animeSchema>;

export type AnimeData = z.infer<typeof animeDataSchema>;

export type SearchAnime = z.infer<typeof searchAnimeSchema>;

export type SearchAnimeData = z.infer<typeof searchAnimeDataSchema>;
