import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/recent-episode",
          "/trending",
          "/popular",
          "/continue-watching",
          "/airing-schedule",
          "/about",
          "/sign-in",
          "/advanced-search",
          "/character/*",
          "/genre/*",
          "/info/*",
          "/sitemap.xml",
        ],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
  };
}
