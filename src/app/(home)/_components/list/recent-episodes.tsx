import { fetchRecentEpisodeList } from "@/actions/action";
import AnimeList from "@/components/anime-cards/AnimeList";
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

  const data = await fetchRecentEpisodeList({ page: Number(page) || 1 });

  if (!data) throw new Error("Failed to fetch (Anime List) data");

  return <AnimeList animeList={data.results} />;
}
