import { MainNavItem } from "@/lib/types";
import { env } from "./env";

export const siteConfig = {
  name: "My Anime",
  url: "https://myanime.makje.com",
  description:
    "A premier platform for streaming a diverse collection of anime content. We offer high-quality, uninterrupted viewing experiences to anime enthusiasts around the globe.",
  links: {
    github: "https://github.com/markjaylunas/myanime",
  },
};

export type SiteConfig = typeof siteConfig;

interface RoutesConfig {
  mainNav: MainNavItem[];
}

export const routesConfig: RoutesConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Genres",
      href: "/genre",
    },
    {
      title: "My List",
      href: "/my-list",
    },
  ],
};

export const API_BASE_URL = `${env.CONSUMET_API_BASE_URL}/meta/anilist`;
