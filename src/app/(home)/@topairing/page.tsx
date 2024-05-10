import { fetchTopAiringList } from "@/actions/action";
import AnimeCarouselList from "@/components/home/AnimeCarouselList";
import { SearchParams } from "@/lib/types";

export default async function TopAiringListPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const page = typeof searchParams?.page === "string" ? searchParams?.page : "";

  const data = await fetchTopAiringList({ page: Number(page) || 1 });

  if (!data) throw new Error("Failed to fetch (Anime List) data");

  return <AnimeCarouselList animeList={data.results} isRanked />;
}
