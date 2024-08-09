import { fetchRecentEpisodesAnimeData } from "@/actions/meta";
import AnimeList from "@/components/anime-cards-v2/anime-list";
import { metaAnimeObjectMapper } from "@/lib/object-mapper";
import { SearchParams } from "@/lib/types";

export default async function RecentEpisodeListPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const page =
    typeof searchParams?.page === "string"
      ? parseInt(searchParams?.page) || 1
      : 1;

  const data = await fetchRecentEpisodesAnimeData({
    page: Number(page) || 1,
    perPage: 40,
    provider: "gogoanime",
  });

  if (!data) throw new Error("Failed to fetch (Anime List) data");

  const animeList = data.results || [];

  return <AnimeList animeList={metaAnimeObjectMapper(animeList)} />;
}
