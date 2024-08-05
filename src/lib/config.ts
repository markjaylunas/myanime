import { MainNavItem } from "@/lib/types";

export const siteConfig = {
  name: "My Anime",
  url: "https://myanime.makje.com",
  description:
    "A premier platform for streaming a diverse collection of anime content. We offer high-quality, uninterrupted viewing experiences to anime enthusiasts around the globe.",
  links: {
    github: "https://github.com/markjaylunas",
  },
};

export type SiteConfig = typeof siteConfig;

interface RoutesConfig {
  s1Nav: MainNavItem[];
}

export const routesConfig: RoutesConfig = {
  s1Nav: [
    {
      title: "Home",
      href: "/s1",
    },
    {
      title: "Advanced Search",
      href: "/s1/advanced-search",
    },
    {
      title: "Genres",
      href: "/s1/genre?genres=[Action]",
    },
    {
      title: "My List",
      href: "/my-list",
    },
  ],
};

export const API_BASE_URL = `${process.env.CONSUMET_API_BASE_URL}/meta/anilist`;
