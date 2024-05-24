export default async function sitemap() {
  const allow = [
    "/recent-episode",
    "/trending",
    "/popular",
    "/continue-watching",
    "/airing-schedule",
    "/about",
    "/sign-in",
    "/advanced-search",
    "/character/",
    "/genre/*",
    "/info/*",
    "/sitemap.xml",
  ];

  return allow.map((path) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}${path}`,
  }));
}
